export const randomString = (length: number) => {
  const buffer = window.crypto.getRandomValues(new Uint8Array(length));
  const charactes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const s = Array.from(buffer).map((e) => charactes[e % charactes.length]).join("");
  return s;
}
