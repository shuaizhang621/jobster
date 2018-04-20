import React from 'react';
import { Input, Tabs, message } from 'antd';
import { API_ROOT, GEO_OPTIONS, AUTH_PREFIX, TOKEN_KEY, POS_KEY } from "../constants";
import $ from 'jquery';
import { ItemContainer } from "./ItemContainer";
import { UserInfo } from "./UserInfo";
import { FriendsList } from "./FriendsList";
import { MessageContainer} from "./MessageContainer";
import {SearchContainer} from "./SearchContainer";

const Search = Input.Search;
const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/student/init.php`,
            data: {
                semail: this.props.username,
            },
        }).then((response) => {
            this.setState({
                data: JSON.parse(response),
            });
            console.log(this.state.data);
        }, (error) => {
            message.error(error.responseText);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="home">
                <div className="home-main">
                    <UserInfo username={this.props.username}/>
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
                                <SearchContainer/>
                            </TabPane>
                            <TabPane className="tabpane" tab="Message" key="3">
                                <MessageContainer/>
                            </TabPane>
                        </Tabs>
                    </div>
                    <FriendsList/>
                </div>

            </div>

        );
    }
}