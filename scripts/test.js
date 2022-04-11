import data from "./dataStorage.js";
import { getElement, create } from "./service.js";

const butt = [
    '<i class="bi bi-pen-fill">',
    '<i class="bi bi-file-zip-fill"></i>',
    '<i class="bi bi-trash-fill"></i>',
];
const notes = [...data];

window.addEventListener("load", init);

function init() {
    const createButton = getElement("#create");
    createButton.addEventListener("click", edit);

    writeTables();
}

function writeTables() {
    const tbody = getElement("#tb1>tbody");
    tbody.addEventListener("click", handler);
    for (let element in notes) {
        let tr = create("tr");
        for (let elem in notes[element]) {
            tr.append(getTd(notes[element][elem]));
        }
        for (let el of butt) {
            let btn = getButton(el, element);
            let td = create("td");
            td.append(btn);
            tr.append(td);
        }
        if (element == 0) {
            tbody.innerHTML = "";
        }
        tbody.append(tr);
    }
}

function handler() {}

function edit() {
    console.log(notes);
    notes.splice(3, 1);
    console.log(notes);
}

function getTd(inner) {
    let td = create("td");
    td.innerHTML = inner;
    return td;
}

function getButton(text, id) {
    let button = create("button");
    button.setAttribute("class", "btn btn-light");
    button.innerHTML = text;
    return button;
}

function getNoteById() {}

function createNote(name, category, content) {}

function upgradeNote() {}

function deleteNote() {}
