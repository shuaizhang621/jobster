import React from 'react';
import { Input, Radio, Slider} from 'antd';
import $ from 'jquery';
import { API_ROOT } from "../constants";
import {ResultPeople} from "./ResultPeople";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;

export class CompanySearch extends React.Component {
    state = {
        searched: false,
        data: [],
        gpaLow: 3.3,
        gpaHigh: 4.0,
    };


    handleSearch = (value) => {
        console.log(value);
        console.log(this.state.searchFor);
        this.setState({
            searched: true,
        });
        $.ajax({
            url:`${ API_ROOT }/student/search/student.php`,
            method: 'POST',
            data: {
                keyword: value,
                //sgpalower: this.state.gpaLow,
                //sgpahigh: this.state.gpaHigh,
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


    onChange = (value) => {
        console.log('onChange: ', value);
    }

    onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
    }

    render() {
        const marks = {
            0: '0',
            1: '1.0',
            2: '2.0',
            3: '3.0',
            4: {
                style: {
                    color: '#f50',
                },
                label: <strong>4.0</strong>,
            },
        };

        return (
            <div className="search">
                <div className="search-bar">
                    <div className="search-selection">
                        <span className="search-for">Search for candidates:</span>
                    </div>


                    <Search
                        placeholder="input search text"
                        onSearch={this.handleSearch}
                        style={{ width: 620, marginTop: 10 }}
                    />
                    <div className='gpa-bar'>
                        <div className='gpa-label'>GPA range: </div>
                        <div className='gpa-slider'>
                            <Slider
                                range step={0.1}
                                defaultValue={[3.3, 4.0]}
                                min={0}
                                max={4.0}
                                marks={marks}
                                onChange={this.onChange}
                                onAfterChange={this.onAfterChange}
                            />
                        </div>
                    </div>
                </div>
                {
                    this.state.searched
                    &&
                    <ResultPeople
                        result={this.state.data}
                        username={this.props.username}
                    />
                }
            </div>


        );
    }
}
