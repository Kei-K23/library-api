import crypto from "crypto";

export function randomHash(): string {
  return crypto.randomBytes(225).toString("base64");
}

export function authentication(salt: string, password: string) {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.MY_SECRET as string)
    .digest("base64");
}

export function expireDate(d: number): Date {
  const expire = d * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + expire);
}
