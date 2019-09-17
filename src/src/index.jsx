import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
    render() {
        const details = {
            "Name": "Sai Arun Veneno",
            "Email": "arunsai63@gmail.com",
            "projects": [
                "project1",
                "project2",
                "project3"
            ],
        }
        return <pre>{JSON.stringify(details, null, 4)}</pre>
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
