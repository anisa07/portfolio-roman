import { Navbar, Nav, NavItem } from 'react-bootstrap';
var Link = require('react-router-dom').Link;
//var NavLink = require('react-router-dom').NavLink;
import {/*BrowserRouter, Route, Link,*/ NavLink } from 'react-router-dom';

class NavbarInstance extends React.Component {

    constructor(props) {
        super(props);
        this.openComponent = this.openComponent.bind(this);
    }

    openComponent(event) {
        let item = event.target.dataset.item;
        let count = this.props.countControls;
        // //5
        // console.log(item)
        // console.log(this.props.countControls)
        if (item > count) {
            // console.log(this.props.navigate)
            for (let i = 0; i < (item - count); i++) {
                this.props.navigate();
            }
        }
    }

    // componentDidMount() {
    //     window.location.hash = window.decodeURIComponent(window.location.hash);
    //     const scrollToAnchor = () => {
    //         const hashParts = window.location.hash.split('#');
    //         if (hashParts.length > 2) {
    //             const hash = hashParts.slice(-1)[0];
    //             document.querySelector(`#${hash}`).scrollIntoView();
    //         }
    //     };
    //     scrollToAnchor();
    //     window.onhashchange = scrollToAnchor;
    // }

    render() {
        return (
                 <div id="custom_navigation">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Portfolio page</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight onClick={this.openComponent}>
                            <li><a href="#home" data-item="1">Home</a></li>
                            <li><a href="#aboutme" data-item="2">About me</a></li>
                            <li><a href="#projects" data-item="3">Projects</a></li>
                            <li><a href="#events" data-item="4">Events</a></li>
                            <li><a href="#contacts" data-item="5">Contacts</a></li>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
};

export { NavbarInstance };

//navigate={this.updateControls} countControls={this.state.controls.length}