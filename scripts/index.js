import dataFromStorage from "./dataStorage.js";
import { createHandler, formSubmit } from "./handlers.js";
import { initPopup } from "./popup.js";
import {
    buttonIcons,
    getCategory,
    getElement,
    writeCategoryTable,
    writeNotesTable,
} from "./service.js";

window.addEventListener("load", init);

function init() {
    const notes = [...dataFromStorage];
    const icons = [...buttonIcons];

    const createButton = getElement("#create");
    const notesTbody = getElement("#tbn>tbody");
    const categoryTbody = getElement("#tbc>tbody");
    const form = getElement("#create-note");

    form.addEventListener("submit", formSubmit);

    createButton.addEventListener("click", createHandler);

    writeNotesTable(notesTbody, notes, icons);
    const category = [...getCategory()];
    writeCategoryTable(categoryTbody, category);
    initPopup();
}
