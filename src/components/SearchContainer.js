import React from 'react';
import { Icon, Input, Radio} from 'antd';
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY} from "../constants";
import {ResultPeople} from "./ResultPeople";
import {ResultCompany} from "./ResultCompany";
import {ResultJob} from "./ResultJob";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;

export class SearchContainer extends React.Component {
    state = {
        searched: false,
        searchFor: 'student',
        data: [],
        show: 0,
    };


    handleSearch = (value) => {
        console.log(value);
        console.log(this.state.searchFor);
        if (this.state.searchFor == "job") {
            this.setState({
                show: 2,
            })
        } else if (this.state.searchFor == "company") {
            this.setState({
                show: 3,
            })
        } else {
            this.setState({
                show: 1,
            })
        }
        $.ajax({
            url:`${ API_ROOT }/student/search/${ this.state.searchFor }.php`,
            method: 'POST',
            data: {
                semail: this.props.username,
                keyword: value,
            },
            headers: {
                Authorization: localStorage.getItem(TOKEN_KEY)
            }
        }).then((response) => {
            let res = JSON.parse(response)
            console.log(res);
            this.setState({
                data: res == null ? [] : res,
            })
        }, (error) => {
            console.log(error);
        });
    };

    handleChange = (e) => {
        this.setState({
            searchFor: e.target.value,
        })
    };

    render() {
        return (
            <div className="search">
                <div className="search-bar">
                    <div className="search-selection">
                        <span className="search-for">Search for:</span>
                        <RadioGroup className="search-radio" defaultValue="student" onChange={this.handleChange}>
                            <RadioButton style={{ width: 170 }} value="student">
                                <Icon type="shop" />
                                People
                            </RadioButton>
                            <RadioButton style={{ width: 170 }} value="job">
                                <Icon type="red-envelope" />
                                Jobs
                            </RadioButton>
                            <RadioButton style={{ width: 170 }} value="company">
                                <Icon type="team" />
                                Companies
                            </RadioButton>
                        </RadioGroup>
                    </div>
                    <Search
                        placeholder="input search text"
                        onSearch={this.handleSearch}
                        style={{ width: 620 }}
                    />
                </div>
                {
                    this.state.show === 1
                    &&
                    <ResultPeople
                        usertype="student"
                        result={this.state.data}
                        username={this.props.username}
                    />
                } {
                    this.state.show === 2
                    &&
                    <ResultJob
                        result={this.state.data}
                        username={this.props.username}
                        friends={this.props.friends}
                        handleFollowCompany={this.props.handleFollowCompany}
                    />
                } {
                    this.state.show === 3
                    &&
                    <ResultCompany
                        result={this.state.data}
                        username={this.props.username}
                        friends={this.props.friends}
                        handleFollowCompany={this.props.handleFollowCompany}
                    />
                }
            </div>


        );
    }
}
