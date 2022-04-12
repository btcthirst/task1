import { openPopup, closePopup } from "./popup.js";
import { whatToDo, addNote, updateNote, checkNames } from "./dataService.js";

export const handler = (event) => {
    let target = event.target;
    if (event.target.nodeName == "I") {
        target = event.target.parentElement;
    }

    whatToDo(target.dataset.key, target.dataset.crud);
};

export const createHandler = (event) => {
    openPopup();
};

export const formSubmit = (event) => {
    event.preventDefault();

    if (checkNames(event.target[0].value) || event.target[5].value) {
        if (event.target[5].value != "") {
            updateNote(
                event.target[0].value,
                event.target[1].value,
                event.target[2].value,
                event.target[5].value
            );
        } else {
            addNote(
                event.target[0].value,
                event.target[1].value,
                event.target[2].value
            );
        }

        closePopup();
        event.target.reset();
    } else {
        alert("this name is exist");
    }
};
