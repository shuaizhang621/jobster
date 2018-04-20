import React from 'react';
import { Input, Tabs, message } from 'antd';
import { API_ROOT } from "../constants";
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
        requestNum: 0,
        friend_request: [],
        notification: [],
        personal_info: [{
            semail: "",
            skey: "",
            sphone: "",
            sfirstname: "",
            slastname: "",
        }]

    };

    handleUpdateRequest = (key) => {
        let requstList = this.state.friend_request;
        requstList[key] = null;
        this.setState({
            friend_request: requstList,
        });
    }

    countRequest = (request) => {
        let count = 0;
        if (request != null) {
            for (let i = 0; i < request.length; i++) {
                if (request[i] != null) {
                    count += 1;
                }
            }
        }
        console.log("count", count);
        return count;
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(this.state);
        let num = this.countRequest(this.state.friend_request);

        console.log('prev:',prevState.requestNum);
        console.log('this time:', num);

        console.log(prevState.requestNum != num);
        if (prevState.requestNum != num) {
            this.setState({
                requestNum: num,
            });
        }
    }

    componentDidUpdate() {
        console.log(this.state);

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
                friend_request: res.friend_request,
                notification: res.notification,
                personal_info: res.personal_info,
                requestNum: this.countRequest(res.friend_request),
            });
        }, (error) => {
            message.error(error.responseText);
        });
    }

    render() {
        return (
            <div className="home">
                <div className="home-main">
                    <UserInfo
                        username={this.props.username}
                        info={this.state.personal_info[0]}
                        request={this.state.friend_request}
                        update={this.handleUpdateRequest}
                        requestNum={this.state.requestNum}
                    />
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