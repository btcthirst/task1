export class Note {
    name;
    created;
    category;
    content;
    dates;
    active;
    constructor(name, category, content) {
        this.name = name;
        this.created = new Date().toLocaleDateString();
        this.category = category;
        this.content = content;
        this.dates = "";
        this.active = true;
    }
}

export class Category {
    constructor(name, active, archived) {
        this.name = name;
        this.active = active;
        this.archived = archived;
    }
}
