import React from 'react';
import { Input, Tabs } from 'antd';
import { API_ROOT, GEO_OPTIONS, AUTH_PREFIX, TOKEN_KEY, POS_KEY } from "../constants";
import $ from 'jquery';
import { ItemContainer } from "./ItemContainer";
import { UserInfo } from "./UserInfo";
import { FriendsList } from "./FriendsList";

const Search = Input.Search;
const TabPane = Tabs.TabPane;

export class Home extends React.Component {

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
                                <Search
                                    className="search"
                                    placeholder="input search text"
                                    onSearch={value => console.log(value)}
                                    enterButton
                                />
                                <ItemContainer/>
                            </TabPane>
                        </Tabs>
                    </div>
                    <FriendsList/>
                </div>

            </div>

        );
    }
}