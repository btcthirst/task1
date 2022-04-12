import { initHtmlElements, initNotes } from "./dataService.js";

window.addEventListener("load", init);

function init() {
    initNotes();
    initHtmlElements();
}
