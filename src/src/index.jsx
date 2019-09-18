import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
    render() {
        const details = {
            "Name": "Sai Arun Veneno",
            "Email": "arunsai63@gmail.com",
            "projects": [
                "Handwritten Character Recognition",
                "Three Tier Architecture",
                "Image Store API",
                "..."
            ],
            "Frontend": [
                "HTML", "CSS", "SASS/SCSS", "Bootstrap",
                "ReactJs"
            ],
            "Backend": [
                "C", "C++", "C#", "Java", "NodeJs", "Php", "Python"
            ],
            "frameworks": [
                "Django", "Bottle",
                ".NET", ".NET core", "ASP.NET", "Web API", "ADO.NET", "Entity Framework",
                "Express"
            ],
            "Database": [
                "SQL Server", "PostgreSQL", "Oracle", "MySql",
                "MongoDb",
                "SQlite"
            ]
        }
        return <pre>{JSON.stringify(details, null, 4)}</pre>
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
