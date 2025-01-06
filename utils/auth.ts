import Cookies from "js-cookie";

export const saveNaturalDisasterToCookies = (naturalDisaster: string) => {
  Cookies.set("natural-disaster", naturalDisaster);
};
export const clearNaturalDisasterFromCookies = () => {
  Cookies.remove("natural-disaster");
};
export const getNaturalDisasterFromCookies = () =>
  Cookies.get("natural-disaster")
    ? JSON.parse(Cookies.get("natural-disaster"))
    : {};
