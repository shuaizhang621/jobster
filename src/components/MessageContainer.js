import React from 'react';
import { List, Button, Input, Avatar } from 'antd';
import $ from "jquery";
import {API_ROOT, COLOR_LIST } from "../constants";

const { TextArea } = Input;

export class MessageContainer extends React.Component {
    state = {
        newMessage: "",
    }

    handleSent = (e) => {
        e.target.value = "";
        console.log(this.state.newMessage, this.props.receiver);
        $.ajax({
            url: `${API_ROOT}/student/message.php`,
            method: 'POST',
            data: {
                semailsend: this.props.username,
                semailreceive: this.props.receiver,
                content: this.state.newMessage,
            }
        }).then((response) => {
            console.log(response);
            this.props.handleGetMessage(this.props.receiver, this.props.receiverName);
        }, (error) => {
            console.log(error);
        });
    }

    componentDidUpdate() {
        console.log("message props", this.props.message);
    }

    render() {
        return (
            <div className='message-container'>
                <div>
                    <div className="header">
                        <Avatar
                            style={{ backgroundColor: COLOR_LIST[4], verticalAlign: 'middle' }}
                            size="middle"
                        >
                            {this.props.receiver}
                        </Avatar>
                        <h3 className="header-name">{this.props.receiverName}</h3>
                    </div>
                    <div className="chat-message">
                        <List
                            size="small"
                            dataSource={this.props.message}
                            renderItem={item => {
                                console.log("message item: ", item);
                                if (item.seamilsend == this.props.username) {
                                    return (
                                        <div>
                                            <div className="sender-pop">
                                                {item.content}
                                            </div>
                                        </div>

                                    )
                                } else {
                                    return (
                                        <div>
                                            <div className="receiver-pop">
                                                {item.content}
                                            </div>
                                        </div>

                                    )
                                }

                            }}
                        />
                    </div>

                </div>
                <div className="chat-poster">
                    <TextArea
                        placeHolder="Press Enter to Send..."
                        autosize={{ minRows: 5, maxRows: 5 }}
                        onChange={(e) => {
                            this.setState({newMessage: e.target.value});
                        }}
                        onPressEnter={(e) => this.handleSent(e)}
                    />
                </div>
            </div>
        );
    }
}