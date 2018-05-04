import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router'
import { Home } from './Home';
import { PreRegister } from "./PreRegister";
import { CompanyRegister } from "./CompanyRegister";
import { CompanyHome} from "./CompanyHome";
import { USER_TYPE } from "../constants";

export class Main extends React.Component {
    state = {
        usertype: '',
    };

    setUserType = () => {
        localStorage.removeItem(USER_TYPE);
        this.setState({
            usertype: "",
        });
    };

    handleOnClickStudent = () => {
        localStorage.setItem(USER_TYPE, 'student');
        this.setState({
            usertype: "student",
        });
    };

    handleOnClickCompany = () => {
        localStorage.setItem(USER_TYPE, 'company');
        this.setState({
            usertype: "company",
        })
    };

    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> :
            <Login
                handleLogin={this.props.handleLogin}
                handleOnClickStudent={this.handleOnClickStudent}
                handleOnClickCompany={this.handleOnClickCompany}
                setUserType={this.setUserType}
            />;
    };

    getHome = () => {
        return this.props.isLoggedIn ?
            (
                localStorage.getItem(USER_TYPE)  == "student" ?
                <Home username={this.props.username}/> : <CompanyHome username={this.props.username}/>
            )
            : <Redirect to="/login"/>;
    };

    getRegister = () => {
        if (localStorage.getItem(USER_TYPE) == "student") {
            return <Register usertype={this.state.usertype}/>
        } else if (localStorage.getItem(USER_TYPE) == "company") {
            return <CompanyRegister usertype={this.state.usertype}/>
        } else {
            return <PreRegister
                usertype={localStorage.getItem(USER_TYPE)}
                handleOnClickStudent={this.handleOnClickStudent}
                handleOnClickCompany={this.handleOnClickCompany}
            />
        }
    };

    getRoot = () => {
        return <Redirect to="/login"/>;
    };


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