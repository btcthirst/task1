import dataFromStorage from "./dataStorage.js";
import { createHandler, formSubmit, handler } from "./handlers.js";
import { initPopup } from "./popup.js";
import {
    createCategory,
    getCell,
    getElement,
    create,
    startUpdate,
} from "./service.js";
import { Note } from "./model.js";

const dataService = {
    activeNotes: [],
    allNotes: [],
    buttonIcons: [
        '<i class="bi bi-pen-fill">',
        '<i class="bi bi-file-zip-fill"></i>',
        '<i class="bi bi-trash-fill"></i>',
    ],
    operations: ["update", "archive", "remove"],

    isArchivedVisible: true,
};

export const checkNames = (name) => {
    let index = dataService.allNotes.findIndex((el) => el.name == name);

    if (index == -1) {
        return true;
    }

    return false;
};

export const initNotes = () => {
    dataService.allNotes = [...dataFromStorage];
};

export const initHtmlElements = () => {
    dataService.category = [...getCategory()];
    dataService.createButton = getElement("#create");
    dataService.notesTbody = getElement("#tbn>tbody");
    dataService.categoryTbody = getElement("#tbc>tbody");
    dataService.form = getElement("#create-note");
    dataService.archived = getElement("#archived");

    dataService.form.addEventListener("submit", formSubmit);
    dataService.createButton.addEventListener("click", createHandler);
    dataService.archived.addEventListener("click", archiveToggler);

    writeNotesTable();

    writeCategoryTable();
    initPopup();
};

export const archiveToggler = () => {
    dataService.isArchivedVisible = !dataService.isArchivedVisible;
    writeNotesTable();
};

export const writeCategoryTable = () => {
    let dataArray = [...dataService.category];
    dataService.categoryTbody.innerHTML = "";
    for (let index in dataArray) {
        let tr = create("tr");

        for (let fieldName in dataArray[index]) {
            tr.append(getCell(dataArray[index][fieldName]));
        }

        dataService.categoryTbody.append(tr);
    }
};

export const writeNotesTable = () => {
    dataService.activeNotes = dataService.allNotes.filter(
        (el) => el.active == dataService.isArchivedVisible
    );
    dataService.notesTbody.innerHTML = "";

    for (let index in dataService.activeNotes) {
        let tr = create("tr");

        for (let fieldName in dataService.activeNotes[index]) {
            if (fieldName == "active") continue;
            tr.append(getCell(dataService.activeNotes[index][fieldName]));
        }
        if (dataService.buttonIcons) {
            for (let el in dataService.buttonIcons) {
                let btn = getButton(el, index);
                let td = create("td");

                td.append(btn);
                tr.append(td);
            }
        }

        dataService.notesTbody.append(tr);
    }
};

export const getCategory = () => {
    let category = [];
    dataService.allNotes.map((element) => {
        if (category.length > 0) {
            let index = category.findIndex((el) => el.name == element.category);
            if (index < 0) {
                category.push(createCategory(element));
            } else {
                if (element.active) {
                    category[index].active++;
                } else {
                    category[index].archived++;
                }
            }
        } else {
            category.push(createCategory(element));
        }
    });

    return category;
};

export const deleteNote = (dataArr, index) => {
    let myArr = [...dataArr];
    if (myArr.length > 1) {
        myArr.splice(index, 1);
    } else {
        console.log("in");
        myArr = [];
    }
    console.log(myArr);
    return myArr;
};

export const addNote = (name, category, content) => {
    const NEW_NOTE = new Note(name, category, content);
    NEW_NOTE.dates = NEW_NOTE.checkDate();
    dataService.allNotes.push(NEW_NOTE);

    const notesTbody = getElement("#tbn>tbody");
    writeNotesTable();

    const categoryTbody = getElement("#tbc>tbody");
    dataService.category = [...getCategory()];
    writeCategoryTable();
};

export const updateNote = (name, category, content, index) => {
    let myArr = [...dataService.allNotes];
    myArr[index].name = name;
    myArr[index].category = category;
    myArr[index].content = content;
    myArr[index].dates = myArr[index].checkDate();
    dataService.allNotes = [...myArr];

    writeNotesTable();
};

export const archiveNote = (dataArr, index) => {
    const myArr = [...dataArr];
    myArr[index].active = false;

    return myArr;
};

export const whatToDo = (index, operation, note = null) => {
    let indexInAll = dataService.allNotes.findIndex(
        (el) => el.name == dataService.activeNotes[index].name
    );
    if (
        operation == "remove" &&
        confirm("Do you realy whant to delete a note?")
    )
        dataService.allNotes = [
            ...deleteNote(dataService.allNotes, indexInAll),
        ];

    if (
        operation == "archive" &&
        confirm("Do you realy whant to archive a note?")
    ) {
        dataService.allNotes = [
            ...archiveNote(dataService.allNotes, indexInAll),
        ];

        dataService.category = [...getCategory()];
        writeCategoryTable();
    }

    if (operation == "update")
        startUpdate(dataService.allNotes[indexInAll], indexInAll);

    writeNotesTable();
};

export const getButton = (index, id) => {
    let button = create("button");
    button.setAttribute("class", "btn btn-light");
    button.dataset.key = id;
    button.dataset.crud = dataService.operations[index];
    button.innerHTML = dataService.buttonIcons[index];
    button.addEventListener("click", handler);
    return button;
};
