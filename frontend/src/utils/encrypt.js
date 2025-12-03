// Simple base64 encode/decode helpers
export const encrypt = (text) => {
  if (!text) return text;
  return btoa(unescape(encodeURIComponent(text)));
};
export const decrypt = (b64) => {
  if (!b64) return b64;
  return decodeURIComponent(escape(atob(b64)));
};
// Simple base64 encode/decode helpers
export const encrypt = (text) => {
  if (!text) return text;
  return btoa(unescape(encodeURIComponent(text)));
};
export const decrypt = (b64) => {
  if (!b64) return b64;
  return decodeURIComponent(escape(atob(b64)));
};
