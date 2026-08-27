const SESSION_SECRET = process.env.SESSION_SECRET || "phulam-dev-secret";

async function getHmacKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bufferToHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes.buffer;
}

export async function signSession(userId: string, role: string): Promise<string> {
  const key = await getHmacKey();
  const data = new TextEncoder().encode(`${userId}:${role}`);
  const signature = await crypto.subtle.sign("HMAC", key, data);
  return bufferToHex(signature);
}

export async function verifySession(
  userId: string,
  role: string,
  signature: string,
): Promise<boolean> {
  if (!userId || !role || !signature) return false;

  try {
    const key = await getHmacKey();
    const data = new TextEncoder().encode(`${userId}:${role}`);
    return crypto.subtle.verify("HMAC", key, hexToBuffer(signature), data);
  } catch {
    return false;
  }
}
