/** Tiny MQTT 3.1.1 over WebSocket. Browser only. */

function rem(n: number) {
  const o: number[] = [];
  do {
    let b = n % 128;
    n = Math.floor(n / 128);
    if (n) b |= 0x80;
    o.push(b);
  } while (n);
  return o;
}

function str(s: string) {
  const u = new TextEncoder().encode(s);
  return Uint8Array.from([u.length >> 8, u.length & 255, ...u]);
}

function pack(first: number, vh: Uint8Array) {
  return Uint8Array.from([first, ...rem(vh.length), ...vh]);
}

function cat(...parts: Uint8Array[]) {
  const n = parts.reduce((a, p) => a + p.length, 0);
  const o = new Uint8Array(n);
  let i = 0;
  for (const p of parts) {
    o.set(p, i);
    i += p.length;
  }
  return o;
}

export type Lite = {
  publish: (topic: string, payload: string, retain?: boolean) => void;
  subscribe: (topic: string) => void;
  close: () => void;
};

export function mqttConnect(url: string, clientId: string, onMsg: (topic: string, payload: string) => void): Promise<Lite> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url, ["mqtt"]);
    ws.binaryType = "arraybuffer";
    let open = false;
    let ping: ReturnType<typeof setInterval> | undefined;
    const wait: Uint8Array[] = [];

    const send = (b: Uint8Array) => {
      if (ws.readyState === WebSocket.OPEN) ws.send(b);
      else wait.push(b);
    };

    ws.onopen = () => {
      const id = str(clientId);
      const proto = str("MQTT");
      send(pack(0x10, cat(proto, Uint8Array.of(4, 2, 0, 45), id)));
    };
    ws.onerror = () => {
      if (!open) reject(new Error("mqtt ws"));
    };
    ws.onclose = () => {
      if (ping) clearInterval(ping);
      if (!open) reject(new Error("mqtt closed"));
    };
    ws.onmessage = (ev) => {
      const buf = new Uint8Array(ev.data as ArrayBuffer);
      let i = 0;
      while (i < buf.length) {
        const type = buf[i] >> 4;
        const flags = buf[i] & 0x0f;
        let mul = 1;
        let len = 0;
        i += 1;
        for (;;) {
          const b = buf[i++];
          len += (b & 127) * mul;
          mul *= 128;
          if ((b & 128) === 0) break;
        }
        const body = buf.subarray(i, i + len);
        i += len;
        if (type === 2) {
          open = true;
          wait.forEach((x) => ws.send(x));
          wait.length = 0;
          ping = setInterval(() => send(Uint8Array.of(0xc0, 0)), 25000);
          resolve({
            publish(topic, payload, retain = true) {
              const t = str(topic);
              const p = new TextEncoder().encode(payload);
              send(pack(retain ? 0x31 : 0x30, cat(t, p)));
            },
            subscribe(topic) {
              send(pack(0x82, cat(Uint8Array.of(0, 1), str(topic), Uint8Array.of(0))));
            },
            close() {
              if (ping) clearInterval(ping);
              try {
                ws.close();
              } catch {
                /* */
              }
            },
          });
        } else if (type === 3) {
          const tl = (body[0] << 8) | body[1];
          const topic = new TextDecoder().decode(body.subarray(2, 2 + tl));
          const qos = (flags >> 1) & 3;
          const start = 2 + tl + (qos ? 2 : 0);
          onMsg(topic, new TextDecoder().decode(body.subarray(start)));
        }
      }
    };
  });
}
