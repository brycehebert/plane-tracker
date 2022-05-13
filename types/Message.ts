import { AddStringIndex } from "./UtilTypes";

class Message {
  hex: string;
  now: number;
  callSign: string;
  alt: number;
  speed: number;
  lat: number;
  lon: number;
  lastPos: LastPos;
  pushed: boolean;
  flightId?: string;
  [key: string]: string | number | boolean | Object | undefined;

  constructor(
    hex: string,
    now: number,
    callSign: string,
    alt: number,
    speed: number,
    lat: number,
    lon: number,
    lastPos: LastPos
  ) {
    this.hex = hex;
    this.callSign = callSign.toUpperCase();
    this.alt = alt;
    this.speed = parseInt(speed.toString());
    this.lat = lat;
    this.lon = lon;
    this.now = now;
    this.pushed = false;
    this.lastPos = lastPos;
  }
}

interface LastPos {
  lat: number;
  lon: number;
  alt: number;
}

type MessagesObj = AddStringIndex<Message>;

interface HTTPData {
  hex: string;
  alt_baro?: number;
  gs?: number;
  flight?: string;
  lat?: number;
  lon?: number;
}

export { Message };
export type { MessagesObj, HTTPData, LastPos };
