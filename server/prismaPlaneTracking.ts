import { prisma } from "./prisma";
import { Message } from "../types/Message";

const upsertAirplane = async ({ hex, now }: { hex: string; now: number }) => {
  try {
    let result = prisma.airplane.upsert({
      where: { icao: hex },
      create: {
        icao: hex,
        lastSeen: new Date(now).toISOString()
      },
      update: {
        lastSeen: new Date(now).toISOString()
      }
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

const createNewMessage = async (message: Message) => {
  try {
    let result = await prisma.message.create({
      data: {
        planeId: message.hex,
        lat: message.lat,
        lon: message.lon,
        alt: message.alt,
        speed: message.speed,
        callSign: message.callSign,
        time: new Date(message.now).toISOString(),
        flightId: message.flightId!
      }
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

const createFlight = async ({ hex, now }: { hex: string; now: number }) => {
  try {
    let result = prisma.flight.create({
      data: {
        timeStarted: new Date(now).toISOString(),
        planeId: hex
      }
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

const updateFlight = async ({ flightId, now }: { flightId: string; now: number }) => {
  try {
    let result = prisma.flight.update({
      where: { id: flightId },
      data: {
        timeEnded: new Date(now).toISOString()
      }
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export { createFlight, updateFlight, upsertAirplane, createNewMessage };
