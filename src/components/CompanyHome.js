import React from 'react';
import $ from "jquery";
import {Input, Tabs, message, Icon} from "antd/lib/index";
import {API_ROOT, TOKEN_KEY} from "../constants";
import {CompanyInfo} from "./CompanyInfo";
import {ApplicationContainer} from "./ApplicationContainer";
import {SearchContainer} from "./SearchContainer";
import {Poster} from "./Poster";
import {CompanySearch} from "./CompanySearch";

const Search = Input.Search;
const TabPane = Tabs.TabPane;

export class CompanyHome extends React.Component {
    state = {
        companyInfo: {
            cdescription: "",
            cemail: "",
            clocation: "",
            cname: "",
            cphone: "",
        },
        studentApplicationInfo: [],
        jobList: [],
    }

    componentWillMount() {
        console.log("username: ", this.props.username);
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/company/init.php`,
            data: {
                cname: this.props.username,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            let res = JSON.parse(response);
            console.log(res);
            let jobListTemp = [];
            if (res != null && res.studentApplicationInfo != null) {
                for (let i = 0; i < res.studentApplicationInfo.length; i++) {
                    jobListTemp.push({jid: res.studentApplicationInfo[i].jid});
                }
            }

            this.setState({
                companyInfo: res.companyInfo,
                studentApplicationInfo: res.studentApplicationInfo,
                jobList: jobListTemp,
            });
        }, (error) => {
            message.error(error.responseText);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
        // $.ajax({
        //     method: 'POST',
        //     url: `${API_ROOT}/company/init.php`,
        //     data: {
        //         cname: this.props.username,
        //     },
        // }).then((response) => {
        //     let res = JSON.parse(response);
        //     if (res != null && res.studentApplicationInfo!= null) {
        //         if (prevState.studentApplicationInfo.length != res.studentApplicationInfo.length) {
        //             this.setState({
        //                 studentApplicationInfo: res.studentApplicationInfo,
        //             });
        //         }
        //     }
        // }, (error) => {
        //     message.error(error.responseText);
        // });

    }


    render() {
        return (
            <div>
                <div className='background-image'></div>
                <div className='company-home'>
                    <div className="home-main">
                        <CompanyInfo
                            info={this.state.companyInfo}
                            username={this.props.username}
                        />
                        <div className="home-tab">
                            <Tabs
                                className="tab"
                                type="card"
                                tabPosition="top"
                            >
                                <TabPane className="tabpane"
                                         tab=
                                             {
                                                 <div>
                                                     <Icon type="home" style={{ fontSize: 18, color: 'white' }} />
                                                     <span style={{float: 'bottom'}}>Home</span>
                                                 </div>

                                             }
                                         key="1"
                                >
                                    <Poster info={this.state.companyInfo}/>
                                    <ApplicationContainer
                                        application={this.state.studentApplicationInfo}
                                        username={this.props.username}
                                    />
                                </TabPane>
                                <TabPane className="tabpane"
                                         tab=
                                             {
                                                 <div>
                                                     <Icon type="search" style={{ fontSize: 18, color: 'white' }} />
                                                     <span style={{float: 'bottom'}}>Search</span>
                                                 </div>

                                             }
                                         key="2"
                                >
                                    <CompanySearch
                                        username={this.props.username}
                                        friends={this.state.friends}
                                        jobList={this.state.jobList}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

