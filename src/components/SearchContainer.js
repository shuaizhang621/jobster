import React from 'react';
import { Icon, Input, AutoComplete, Radio} from 'antd';
import $ from 'jquery';
import { API_ROOT } from "../constants";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;

export class SearchContainer extends React.Component {
    state = {
        searched: false,
        searchFor: 'student',
        data: [],
    };


    handleSearch = (value) => {
        console.log(value);
        console.log(this.state.searchFor);
        // $.ajax({
        //     url:`${ API_ROOT }/student/search/${ this.state.searchFor }`,
        //     method: 'POST',
        //     data: {
        //         keyword: value,
        //     },
        // }).then((response) => {
        //     console.log(response);
        // }, (error) => {
        //     console.log(response);
        // });
    };

    handleChange = (e) => {
        this.setState({
            searchFor: e.target.value,
        })
    };

    render() {
        return (
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
        );
    }
}
