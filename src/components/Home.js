import React from 'react';
import { Input, Tabs, message, Icon } from 'antd';
import { API_ROOT, TOKEN_KEY } from "../constants";
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
        }],
        message: [],
        receiver: "",
        receiverName: "",

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
        this.getDate();
    }

    getDate = () => {
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/student/init.php`,
            data: {
                semail: this.props.username,
            },
            headers: {
                Authorization: localStorage.getItem(TOKEN_KEY)
            }
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
            if (res.friends !== null && res.friends.length >= 1) {
                this.setState ({
                    receiverName: res.friends[0].sfirstname,
                    receiver: res.friends[0].semail,
                });
                this.handleGetMessage(res.friends[0].semail, res.friends[0].sfirstname);
            }
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

    handleGetMessage = (receiver, receiverName) => {
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/student/messageLoad.php`,
            data: {
                semail: this.props.username,
                semailreceive: receiver,
            },
        }).then((response) => {
            let res = JSON.parse(response);
            console.log(res);
            this.setState({
                message: res,
                receiver: receiver,
                receiverName: receiverName,
            });
        }, (error) => {
            message.error(error.responseText);
        });
    }

    handleFollowCompany = (item) => {
        console.log(item);
        $.ajax({
            url: `${API_ROOT}/student/studentFollow.php`,
            method: 'POST',
            data: {
                semail: this.props.username,
                cname: item.cname,
            }
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <div>
                <div className='background-image'></div>
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
                                onTabClick={this.getData}
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
                                    <ItemContainer
                                        username={this.props.username}
                                        notification={this.state.notification}
                                        friends={this.state.friends}
                                        handleFollowCompany={this.handleFollowCompany}
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
                                    <SearchContainer
                                        username={this.props.username}
                                        friends={this.state.friends}
                                        handleFollowCompany={this.handleFollowCompany}
                                    />
                                </TabPane>
                                <TabPane className="tabpane"
                                         tab=
                                             {
                                                 <div>
                                                     <Icon type="mail" style={{ fontSize: 18, color: 'white' }} />
                                                     <span style={{float: 'bottom'}}>Message</span>
                                                 </div>

                                             }
                                         key="3"
                                >
                                    <MessageContainer
                                        className='message-container'
                                        username={this.props.username}
                                        message={this.state.message}
                                        receiver={this.state.receiver}
                                        receiverName={this.state.receiverName}
                                        handleGetMessage={this.handleGetMessage}

                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                        <FriendsList
                            friends={this.state.friends}
                            handleGetMessage={this.handleGetMessage}
                        />
                    </div>

                </div>
            </div>


        );
    }
}