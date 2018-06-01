import React from 'react';
import { Input, Radio, Slider} from 'antd';
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY} from "../constants";
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
        forwardList: [],
    };

    handleSearch = (value) => {
        console.log(value);
        this.setState({
            searched: true,
        });
        $.ajax({
            url:`${ API_ROOT }/company/search.php`,
            method: 'POST',
            data: {
                cname: this.props.username,
                keyword: value,
                sgpalower: this.state.gpaLow,
                sgpahigh: this.state.gpaHigh,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            let res = JSON.parse(response);
            console.log(res);
            this.setState({
                data: res == null ? [] : res,
            })
            let friendListTemp = [];
            if (res != null) {
                for (let i = 0; i < res.length; i++) {
                    friendListTemp.push(res[i].semail);
                }
            }
            this.setState({forwardList: friendListTemp});
        }, (error) => {
            console.log(error);
        });
    };

    onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
        this.setState({
            gpaLow: value[0],
            gpaHigh: value[1],
        })
    }

    handleChooseStudent = (email, checked) => {
        let array = this.state.forwardList;
        if (checked) {
            array.push(email)
        } else {
            if (array != null) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == email) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
        }
        console.log(array);
        this.setState({forwardList: array});
    }

    handleForward = () => {
        if (this.props.jobList != null) {
            for (let i = 0; i < this.props.jobList.length; i++) {
                console.log(this.props.username, this.state.forwardList, this.props.jobList[i].jid);
                $.ajax({
                    url:`${ API_ROOT }/company/selectStudentPost.php`,
                    method: 'POST',
                    data: {
                        cname: this.props.username,
                        student_array: this.state.forwardList,
                        jid: this.props.jobList[i].jid,
                        token: localStorage.getItem(TOKEN_KEY),
                    },
                }).then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
            }
        }
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
                        handleChooseStudent={this.handleChooseStudent}
                        handleForward={this.handleForward}
                        usertype='company'
                    />
                }
            </div>


        );
    }
}
