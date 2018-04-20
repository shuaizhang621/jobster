import React from 'react';
import { Input, Tabs, message } from 'antd';
import { API_ROOT, GEO_OPTIONS, AUTH_PREFIX, TOKEN_KEY, POS_KEY } from "../constants";
import $ from 'jquery';
import { ItemContainer } from "./ItemContainer";
import { UserInfo } from "./UserInfo";
import { FriendsList } from "./FriendsList";
import { MessageContainer} from "./MessageContainer";
import {SearchContainer} from "./SearchContainer";
import { reqwest } from 'reqwest';


const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const Search = Input.Search;
const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        userInfo: {
            personal_info: [{
                semail: null,
                skey: "12345678",
                sphone: "9998886666",
                sfirstname: "Cong",
                slastname: "Zhang"
            }]
        }
    }

    componentWillMount() {
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/student/init.php`,
            data: {
                semail: this.props.username,
            },
        }).then((response) => {
            let res = JSON.parse(response);
            this.setState({
                userInfo: res,
            });
        }, (error) => {
            message.error(error.responseText);
        });
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="home">
                <div className="home-main">
                    <UserInfo username={this.props.username} info={this.state.userInfo.personal_info[0]}/>
                    <div className="home-tab">
                        <Tabs
                            className="tab"
                            type="card"
                            tabPosition="top"
                        >
                            <TabPane className="tabpane" tab="Home" key="1">
                                <ItemContainer/>
                            </TabPane>
                            <TabPane className="tabpane" tab="Search" key="2">
                                <SearchContainer username={this.props.username}/>
                            </TabPane>
                            <TabPane className="tabpane" tab="Message" key="3">
                                <MessageContainer username={this.props.username}/>
                            </TabPane>
                        </Tabs>
                    </div>
                    <FriendsList/>
                </div>

            </div>

        );
    }
}