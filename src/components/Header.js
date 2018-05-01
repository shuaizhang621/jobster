import React from 'react';
import lobster from '../assets/image/lobster.svg';
import icon from '../assets/image/jobster.png';
import { Icon } from 'antd';
//"https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y"

export class Header extends React.Component {

    render() {
        const linkedin = "https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y";
        const jobster = "https://localjobster.com/images/sites/localjobster.com/camelus/logo-170x24-white-retina.png";
        return (
            <header className="App-header">
                <div className="valid-header">
                    {/*<div className="App-logo">JOBSTER</div>*/}
                    <img src={icon} className="App-logo" alt="logo" />
                    {this.props.isLoggedIn ?
                        <a className = "logout" onClick={this.props.handleLogout}>
                            <Icon type="logout" />{' '}Logout
                        </a>
                        : null}
                </div>

            </header>
        );
    }
}
