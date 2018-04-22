import React from 'react';
import { Icon, Input, Radio} from 'antd';
import $ from 'jquery';
import { API_ROOT } from "../constants";
import {ItemContainer} from "./ItemContainer";
import {PeopleResult} from "./PeopleResult";

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
        } else if (this.state.search == "company") {
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
                keyword: value,
            },
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
            <div>
                <div className="search-bar">
                    <div className="search-selection">
                        <span className="search-for">Search for:</span>
                        <RadioGroup className="search-radio" defaultValue="student" onChange={this.handleChange}>
                            <RadioButton style={{ width: 175 }} value="student">
                                <Icon type="shop" />
                                People
                            </RadioButton>
                            <RadioButton style={{ width: 175 }} value="job">
                                <Icon type="red-envelope" />
                                Jobs
                            </RadioButton>
                            <RadioButton style={{ width: 175 }} value="company">
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
                {this.state.show === 1 && <PeopleResult result={this.state.data} />}
                {this.state.show === 2 && <ItemContainer />}
                {this.state.show === 3 && <ItemContainer />}
            </div>


        );
    }
}
