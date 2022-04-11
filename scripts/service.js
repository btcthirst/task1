import { handler } from "./handlers.js";
import { Category, Note } from "./model.js";
import { closePopup, openPopup } from "./popup.js";

let activeNote = [];

export const getElement = (htmlElement) => document.querySelector(htmlElement);

export const create = (htmlElementName) =>
    document.createElement(htmlElementName);

export const buttonIcons = [
    '<i class="bi bi-pen-fill">',
    '<i class="bi bi-file-zip-fill"></i>',
    '<i class="bi bi-trash-fill"></i>',
];

export const crud = ["update", "archive", "remove"];

export const getCell = (data) => {
    let td = create("td");
    td.innerHTML = data;
    return td;
};

export const getButton = (index, id) => {
    let button = create("button");
    button.setAttribute("class", "btn btn-light");
    button.dataset.key = id;
    button.dataset.crud = crud[index];
    button.innerHTML = buttonIcons[index];
    button.addEventListener("click", handler);
    return button;
};

export const writeCategoryTable = (tbody, array) => {
    let dataArray = [...array];
    console.log("dataArray", dataArray);
    for (let index in dataArray) {
        let tr = create("tr");

        if (index == 0) tbody.innerHTML = "";

        for (let fieldName in dataArray[index]) {
            console.log(index);
            tr.append(getCell(dataArray[index][fieldName]));
        }

        tbody.append(tr);
    }
};

export const writeNotesTable = (tbody, dataArr, icons = null) => {
    activeNote = [...dataArr];
    let dataArray = dataArr.filter((el) => el.active);
    tbody.innerHTML = "";

    for (let index in dataArray) {
        let tr = create("tr");

        for (let fieldName in dataArray[index]) {
            if (fieldName == "active") continue;
            tr.append(getCell(dataArray[index][fieldName]));
        }
        if (icons) {
            for (let el in icons) {
                let btn = getButton(el, index);
                let td = create("td");

                td.append(btn);
                tr.append(td);
            }
        }

        tbody.append(tr);
    }
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
    activeNote.push(NEW_NOTE);

    const notesTbody = getElement("#tbn>tbody");
    writeNotesTable(notesTbody, activeNote, buttonIcons);

    const categoryTbody = getElement("#tbc>tbody");
    const category1 = [...getCategory()];
    writeCategoryTable(categoryTbody, category1);
};

export const updateNote = (name, category, content, index) => {
    let myArr = [...activeNote];
    myArr[index].name = name;
    myArr[index].category = category;
    if (myArr[index].content) {
        ///check for date in text
    }
    myArr[index].content = content;
    activeNote = [...myArr];
    const notesTbody = getElement("#tbn>tbody");
    writeNotesTable(notesTbody, activeNote, buttonIcons);
};

export const archiveNote = (dataArr, index) => {
    const myArr = [...dataArr];
    myArr[index].active = false;

    return myArr;
};

export const whatToDo = (index, operation, note = null) => {
    if (
        operation == "remove" &&
        confirm("Do you realy whant to delete a note?")
    )
        activeNote = [...deleteNote(activeNote, index)];

    if (
        operation == "archive" &&
        confirm("Do you realy whant to archive a note?")
    ) {
        activeNote = [...archiveNote(activeNote, index)];
        const categoryTbody = getElement("#tbc>tbody");
        const category1 = [...getCategory()];
        writeCategoryTable(categoryTbody, category1);
    }

    if (operation == "update") startUpdate(activeNote, index);

    console.log(activeNote);
    const notesTbody = getElement("#tbn>tbody");
    writeNotesTable(notesTbody, activeNote, buttonIcons);
};

const startUpdate = (dataArray, index) => {
    document.querySelector("#name").value = dataArray[index].name;
    document.querySelector("#category").value = dataArray[index].category;
    document.querySelector("#content").value = dataArray[index].content;
    document.querySelector("#index").value = index;
    openPopup();
};

export const getCategory = () => {
    let category = [];
    activeNote.map((element) => {
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

const createCategory = (note) => {
    if (note.active) {
        return new Category(note.category, 1, 0);
    }

    return new Category(note.category, 0, 1);
};
