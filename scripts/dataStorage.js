const date = new Date();

const notes = [
    {
        name: "shoping list",
        created: date.toLocaleDateString(),
        category: "Task",
        content: "tomatoes,bread",
        dates: "",
        active: true,
    },
    {
        name: "sport",
        created: date.toLocaleDateString(),
        category: "Task",
        content: "to go to the football",
        dates: "",
        active: true,
    },
    {
        name: "note",
        created: date.toLocaleDateString(),
        category: "Idea",
        content: "create web-app Note to 12/04/2022",
        dates: "",
        active: true,
    },
    {
        name: "books",
        created: date.toLocaleDateString(),
        category: "Task",
        content: "The Lean Startup",
        dates: "",
        active: false,
    },
    {
        name: "bicycle",
        created: date.toLocaleDateString(),
        category: "Idea",
        content: "create a bike with 5 wheels",
        dates: "",
        active: true,
    },
    {
        name: "ukraine",
        created: date.toLocaleDateString(),
        category: "Random thought",
        content: "everything will be Ukraine",
        dates: "",
        active: true,
    },
    {
        name: "war",
        created: date.toLocaleDateString(),
        category: "Random thought",
        content: "coding is my life, coding is my war",
        dates: "",
        active: true,
    },
];

export default notes;
