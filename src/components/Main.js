import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router'
import { Home } from './Home';
import { PreRegister } from "./PreRegister";
import { CompanyRegister } from "./CompanyRegister";

export class Main extends React.Component {
    state = {
        usertype: "",
    }
    handleOnClickStudent = () => {
        console.log(this.state);
        this.setState({
            usertype: "student",
        })
    }

    handleOnClickCompany = () => {
        console.log(this.state);
        this.setState({
            usertype: "company",
        })
    }

    getLogin = () => {
        console.log(this.state);
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

    getRegister = () => {
        if (this.state.usertype == "student") {
            console.log("student");
            return <Register usertype={this.state.usertype}/>
        } else if (this.state.usertype == "company") {
            return <CompanyRegister usertype={this.state.usertype}/>
        } else {
            console.log("else");
            return <PreRegister
                usertype={this.state.usertype}
                handleOnClickStudent={this.handleOnClickStudent}
                handleOnClickCompany={this.handleOnClickCompany}
            />
        }
    }

    getRoot = () => {
        return <Redirect to="/login"/>;
    }

    componentDidMount() {
        this.setState({usertype: ""});
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" render={this.getRegister}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        )
    }
}