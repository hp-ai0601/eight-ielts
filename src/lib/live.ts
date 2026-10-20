"use client";

import { mqttConnect, type Lite } from "./mqttLite";
import type { Report } from "./report";

export const LIVE_ZANG = "eight/ielts/v2/zang";
export const LIVE_GRADE = "eight/ielts/v2/grade";

const BROKERS = ["wss://broker.emqx.io:8084/mqtt", "wss://broker.hivemq.com:8884/mqtt"];

type Grade = {
  at: number;
  paperAt?: number;
  speakAt?: number;
  ta?: number;
  cc?: number;
  lr?: number;
  gra?: number;
  fc?: number;
  pron?: number;
  band: number;
  note: string;
  kind: "write" | "speak" | "sentence";
};

let lite: Lite | null = null;
let connecting: Promise<Lite | null> | null = null;
const listeners = new Set<(r: Report) => void>();
const gradeListeners = new Set<(g: Grade) => void>();

async function connect(): Promise<Lite | null> {
  if (lite) return lite;
  if (connecting) return connecting;
  connecting = (async () => {
    const id = `eight-${Math.random().toString(36).slice(2, 10)}`;
    for (const url of BROKERS) {
      try {
        const c = await mqttConnect(url, id, (topic, payload) => {
          try {
            const data = JSON.parse(payload);
            if (topic === LIVE_ZANG) listeners.forEach((fn) => fn(data as Report));
            if (topic === LIVE_GRADE) gradeListeners.forEach((fn) => fn(data as Grade));
          } catch {
            /* */
          }
        });
        c.subscribe(LIVE_ZANG);
        c.subscribe(LIVE_GRADE);
        lite = c;
        return c;
      } catch {
        /* next broker */
      }
    }
    return null;
  })();
  const got = await connecting;
  connecting = null;
  return got;
}

export async function livePush(report: Report) {
  const c = await connect();
  if (!c) return false;
  try {
    c.publish(LIVE_ZANG, JSON.stringify(report), true);
    return true;
  } catch {
    return false;
  }
}

export async function liveGrade(g: Grade) {
  const c = await connect();
  if (!c) return false;
  try {
    c.publish(LIVE_GRADE, JSON.stringify(g), true);
    return true;
  } catch {
    return false;
  }
}

export function onLive(fn: (r: Report) => void) {
  listeners.add(fn);
  void connect();
  return () => {
    listeners.delete(fn);
  };
}

export function onGrade(fn: (g: Grade) => void) {
  gradeListeners.add(fn);
  void connect();
  return () => {
    gradeListeners.delete(fn);
  };
}

export type { Grade };
