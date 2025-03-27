const userDetails = {
    Name: "Sai Arun",
    Email: "arunsai63@gmail.com"
}

const techStack = {
    Frontend: [
        "HTML", "CSS", "SASS/SCSS", "Bootstrap",
        "javascript", "ReactJs"
    ],
    Backend: [
        "C", "C++", "C#", "Java", "NodeJs", "Php", "Python"
    ],
    Frameworks: [
        "Django", "Bottle",
        ".NET", ".NET core", "ASP.NET", "Web API", "ADO.NET", "Entity Framework",
        "Express.js"
    ],
    Database: [
        "SQL Server", "PostgreSQL", "Oracle", "MySql",
        "MongoDb", "SQlite"
    ]
}

const projects = [
    {
        name: "Handwritten Character Recognition",
        url: "https://github.com/arunsai63/character-recognition",
        stack: ["Python", "Bottle", "ML", "OCR", "KNN", "Neural Network", "HTML", "CSS"],
        info: "Handwritten Character Recognition"
    },
    {
        name: "Three Tier Architecture",
        url: "https://github.com/arunsai63/ThreeTierArchitechure",
        stack: ["C#", ".NET", "Entity FrameWork", "ORM", "SQL Server", "CLI"],
        info: "Three Tier Architecture"
    },
    {
        name: "Image Store API",
        url: "https://github.com/arunsai63/imageAPI",
        stack: ["C#", ".NET", "CLI", "Web API"],
        info: "Image Store API"
    }
]

export default userDetails
export { techStack, projects }