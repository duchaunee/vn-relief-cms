// export const saveAccessTokenToLocal = (access_token: string) => {
//   localStorage.setItem("AccessToken", access_token);
// };
// export const clearAccessTokenToLocal = () => {
//   localStorage.removeItem("AccessToken");
// };
// export const getAccessTokenToLocal = () =>
//   localStorage.getItem("AccessToken") || "";

// ============================

export const saveNaturalDisasterToLocal = (naturalDisaster: string) => {
  if (typeof localStorage !== "undefined")
    localStorage.setItem("NaturalDisaster", naturalDisaster);
};
export const clearNaturalDisasterToLocal = () => {
  if (typeof localStorage !== "undefined")
    localStorage.removeItem("NaturalDisaster");
};
export const getNaturalDisasterToLocal = () => {
  if (typeof localStorage !== "undefined")
    localStorage.getItem("NaturalDisaster") || "";
};
