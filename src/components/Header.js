import React from 'react';
import lobster from '../assets/image/lobster.svg';
import { Icon } from 'antd';


export class Header extends React.Component {

    render() {
        const linkedin = "https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y";
        return (
            <header className="App-header">
                <img src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y" className="App-logo" alt="logo" />
                {this.props.isLoggedIn ?
                    <a className = "logout" onClick={this.props.handleLogout}>
                        <Icon type="logout" />{' '}Logout
                    </a>
                    : null}
            </header>
        );
    }
}
