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

    checkDate() {
        const pattern = new RegExp(
            "(([0-9]{1,2}/[0-9]{1,2}/[0-9]{4})|([0-9]{1,2}.[0-9]{1,2}.[0-9]{4})|([0-9]{1,2}-[0-9]{1,2}-[0-9]{4}))"
        );
        let result = "";
        if (pattern.test(this.content)) {
            let arr = this.content.split(" ");

            for (let el of arr) {
                let res = el.match(pattern);
                if (res) {
                    result =
                        result == "" ? `${res[0]}` : `${result} \\ ${res[0]}`;
                }
            }
        }

        return result;
    }
}

export class Category {
    constructor(name, active, archived) {
        this.name = name;
        this.active = active;
        this.archived = archived;
    }
}
