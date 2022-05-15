import axios from "axios";
import { createFlight, updateFlight, upsertAirplane, createNewMessage } from "./prismaPlaneTracking";
import { HTTPData, Message, LastPos, MessagesObj } from "../types/Message";
import { prisma } from "./prisma";

let messages: MessagesObj = {};
let pushing = false;

const getAirplaneData = async () => {
  try {
    let res = await axios.get(`http://192.168.1.96/skyaware/data/aircraft.json`);
    let { data } = res;
    return data;
  } catch (e) {
    return Promise.reject(e)
  }
};

const processData = (data: { aircraft: HTTPData[] }) => {
  if (data.aircraft) {
    let { aircraft } = data;
    let now = Date.now();
    for (let msg of aircraft) {
      if (isComplete(msg)) {
        let { flight: callSign, lat, lon, gs: speed, alt_baro: alt } = msg;
        let hex = msg.hex.toUpperCase();

        // @ts-expect-error - We are in this if statement because these values are not undefined
        let newMessage = new Message(hex, now, callSign, alt, speed, lat, lon, { lat, lon, alt });

        if (newMessage.hex in messages) {
          if (hasNewPosition(newMessage.lastPos, messages[hex].lastPos)) {
            updateMessage(newMessage, messages[hex]);
            messages[hex] = newMessage;
          }
        } else {
          messages[hex] = newMessage;
        }
      }
    }
  }
};

const updateMessage = (newMsg: Message, oldMsg: Message) => {
  let { lat, lon, alt, flightId } = oldMsg;
  newMsg.lastPos = { lat, lon, alt };

  if (flightId) newMsg.flightId = flightId;
};

const hasNewPosition = (newMsg: LastPos, oldMsg: LastPos): boolean => {
  return !!(newMsg.lon !== oldMsg.lon || newMsg.lat !== oldMsg.lat || newMsg.alt !== oldMsg.alt);
};

const isComplete = (msg: HTTPData): boolean => {
  if (msg.flight) {
    msg.flight = msg.flight.trim();
  } else {
    return false;
  }

  return !!(msg.hex && msg.flight && msg.lat && msg.lon && msg.gs && msg.alt_baro);
};

const pushMessages = async () => {
  for (let k in messages) {
    let msg = messages[k];
    if (!msg.pushed) {
      let planeRes = await upsertAirplane({ hex: msg.hex, now: msg.now });

      if (planeRes?.icao === msg.hex) {
        if (!msg.flightId) {
          let flightRes = await createFlight({ hex: msg.hex, now: msg.now });
          if (flightRes?.id) {
            msg.flightId = flightRes.id;
          }
        }

        let msgRes = await createNewMessage(msg);
        if (msgRes?.id) {
          msg.pushed = true;
        }
      }
    }
  }
};

const endFlight = async (msg: Message) => {
  if (msg.flightId) {
    let res = await updateFlight({ flightId: msg.flightId!, now: msg.now });
    if (res?.id === msg.flightId) {
      delete messages[msg.hex];
    }
    return res;
  }
};

const purgeOldMessages = async () => {
  let now = Date.now();

  for (let k in messages) {
    let curr = messages[k];
    if (curr.flightId && curr.pushed && now - curr.now > 10 * 60 * 1000) {
      let res = await endFlight(curr);
      return res;
    }
  }
};

const saveOnExit = async () => {
  console.log("CTRL-C command received.");

  if (Object.keys(messages).length === 0) {
    console.log("No messages to process. Exiting.")
    await prisma.$disconnect();
    process.exit(0);
  }

  do {
    if (!pushing) {
      pushing = true;
      console.log(`Pushing ${Object.values(messages).filter((el) => !el.pushed).length} remaining messages...`);
      await pushMessages();
      console.log("Done.");
      console.log("Ending all flights...");
      for (let k in messages) {
        await endFlight(messages[k]);
      }
      console.log("Done.");
      await prisma.$disconnect();
      pushing = false;
      process.exit(0);
    }
  } while (pushing);
};

const start = async () => {
  let pushInterval = 5 * 1000;
  let time = Date.now();
  prisma.$connect();

  setInterval(async () => {
    if (!pushing) {
      let data = await getAirplaneData().catch(e => console.log("Error fetching data from Flight Aware: \n", e));
      if (data) {
        processData(data);
      }
    }

    if (Date.now() - time >= pushInterval && Object.keys(messages).length > 0) {
      time = Date.now();
      pushing = true;
      console.log(`Pushing ${Object.values(messages).filter((el) => !el.pushed).length} Messages...`);
      await pushMessages().catch(e => console.log("Error while pushing messages: \n", e));
      await purgeOldMessages().catch(e => console.log("Error while clearing old messages: \n", e));
      pushing = false;
    }
  }, 1 * 1000);
};

process.on("SIGINT", saveOnExit);

export default start;
