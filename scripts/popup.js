import { getElement } from "./service.js";

export const initPopup = () => {
    const popupClose = getElement(".popup_close");
    popupClose.addEventListener("click", closePopup);
};

export const closePopup = () => {
    const popup = getElement("#popup");
    popup.setAttribute("class", "popup close");
};

export const openPopup = () => {
    const popup = getElement("#popup");
    popup.setAttribute("class", "popup open");
};
