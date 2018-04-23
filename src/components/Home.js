import React from 'react';
import { Input, Tabs, message, Icon } from 'antd';
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
        friends: [],
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
        let requestList = this.state.friend_request;
        requestList[key] = null;
        this.setState({
            friend_request: requestList,
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

    componentWillMount() {
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/student/init.php`,
            data: {
                semail: this.props.username,
            },
        }).then((response) => {
            let res = JSON.parse(response);
            console.log(res);

            this.setState({
                friend_request: res.friend_request == null ? [] : res.friend_request,
                friends: res.friends == null ? [] : res.friends,
                notification: res.notification == null ? [] : res.notification,
                personal_info: res.personal_info == null ? [] : res.personal_info,
                requestNum: this.countRequest(res.friend_request),
            });
        }, (error) => {
            message.error(error.responseText);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
        let num = this.countRequest(this.state.friend_request);
        if (prevState.requestNum != num) {
            this.setState({
                requestNum: num,
            });
        }
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/student/init.php`,
            data: {
                semail: this.props.username,
            },
        }).then((response) => {
            let res = JSON.parse(response);
            if (res != null && res.friends != null) {
                if (prevState.friends.length != res.friends.length) {
                    this.setState({
                        friends: res.friends,
                    });
                }
            }

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
                            <TabPane className="tabpane"
                                     tab=
                                         {
                                             <div>
                                                 <Icon type="home" style={{ fontSize: 20, color: 'white' }} />
                                                 <span style={{float: 'bottom'}}>Home</span>
                                             </div>

                                         }
                                     key="1"
                            >
                                <ItemContainer notification={this.state.notification}/>
                            </TabPane>
                            <TabPane className="tabpane"
                                     tab=
                                         {
                                             <div>
                                                 <Icon type="search" style={{ fontSize: 20, color: 'white' }} />
                                                 <span style={{float: 'bottom'}}>Home</span>
                                             </div>

                                         }
                                     key="2"
                            >
                                <SearchContainer username={this.props.username}/>
                            </TabPane>
                            <TabPane className="tabpane"
                                     tab=
                                         {
                                             <div>
                                                 <Icon type="mail" style={{ fontSize: 20, color: 'white' }} />
                                                 <span style={{float: 'bottom'}}>Home</span>
                                             </div>

                                         }
                                     key="3"
                            >
                                <MessageContainer username={this.props.username}/>
                            </TabPane>
                        </Tabs>
                    </div>
                    <FriendsList friends={this.state.friends}/>
                </div>

            </div>

        );
    }
}