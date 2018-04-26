import React, { Component } from 'react';
import '../styles/App.css';
import { Header } from './Header';
import { Main } from './Main';
import { TOKEN_KEY } from '../constants';


class App extends Component {
    state = {
        isLoggedIn: true,//!!localStorage.getItem(TOKEN_KEY),//true,//
        username: 'dx1368@nyu.edu',
        //username: 'cz1522@nyu.edu',
        //username: 'qy1449@nyu.edu',
        //username: 'sy1567@nyu.edu',
        //username: 'ZhuYuanZhang'
    }

    handleLogin = (response, username) => {
        //localStorage.setItem(TOKEN_KEY, token);
        console.log(response);
        this.setState({
            isLoggedIn: true,
            username: username,
        });
    }

    handleLogout = () => {
        this.setState({isLoggedIn: false});
        localStorage.removeItem(TOKEN_KEY);
    }

    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} username={this.state.username}/>
            </div>
        );
    }
}

export default App;

