import React from 'react';

import {NavbarInstance} from '../components/navigation';
import {Home} from '../components/home';
import {AboutMe} from '../components/about';
import {Projects} from '../components/projects';
import {Events} from '../components/events';
import {Contacts} from '../components/contacts'

//import 'bootstrap/dist/css/bootstrap.css';

// let ReactRouter = require('react-router-dom');
// let Router = ReactRouter.BrowserRouter;
// let Route = ReactRouter.Route;
// let Switch = ReactRouter.Switch;

let components = [<Contacts />, <Events />, <Projects />, <AboutMe />, <Home />];

class App extends React.Component {
    constructor() {
        super();
        this.state = {controls: []};
        this.updateControls = this.updateControls.bind(this);
    }

    updateControls() {
        let arr = this.state.controls;
        if (components.length) {
            arr.push(components.pop());
            this.setState({controls: arr});
        } else {
            window.removeEventListener('wheel', this.updateControls);
        }
        //console.log(components);
    }

    componentDidMount() {
        this.updateControls();
        window.addEventListener('wheel', this.updateControls);
    }

    render() {
        return (
            <div>
                <NavbarInstance navigate={this.updateControls} countControls={this.state.controls.length}/>
                <div>
                    {this.state.controls.map(function (control, i) {
                        return (
                            <div key={i}>{control}</div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default App;