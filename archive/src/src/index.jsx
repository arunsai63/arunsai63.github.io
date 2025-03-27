import React from 'react'
import ReactDOM from 'react-dom'
import userDetails, { techStack, projects } from './data'

class Main extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {

    //     }
    // }

    render() {
        return (<div>
            <pre>var UserDetails - {JSON.stringify(userDetails, null, 4)}</pre>
            <pre>var techStack - {JSON.stringify(techStack, null, 4)}</pre>
            <pre>var projects - {JSON.stringify(projects, null, 4)}</pre>
        </div>)
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
