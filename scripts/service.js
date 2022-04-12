import { Category } from "./model.js";
import { openPopup } from "./popup.js";

export const getElement = (htmlElement) => document.querySelector(htmlElement);

export const create = (htmlElementName) =>
    document.createElement(htmlElementName);

export const getCell = (data) => {
    let td = create("td");
    td.innerHTML = data;
    return td;
};

export const startUpdate = (note, index) => {
    document.querySelector("#name").value = note.name;
    document.querySelector("#category").value = note.category;
    document.querySelector("#content").value = note.content;
    document.querySelector("#index").value = index;
    openPopup();
};

export const createCategory = (note) => {
    if (note.active) {
        return new Category(note.category, 1, 0);
    }

    return new Category(note.category, 0, 1);
};
