import React from "react";
import { Avatar, Button, notification, Badge } from 'antd';
import $ from 'jquery';
import {API_ROOT} from "../constants";

const ButtonGroup = Button.Group;

export class UserInfo extends React.Component {

    close = () => {
        console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
    };

    handleAccept = (key, sender) => {
        this.sendFeed('Accepted', sender);
        notification.close(key);
        this.props.update(Number(key));
    };

    handleDecline = (key, sender) => {
        this.sendFeed('Denied', sender);
        notification.close(key);
        this.props.update(Number(key));
    };

    sendFeed = (choice, sender) => {
        // $.ajax({
        //     method: 'POST',
        //     url: `${API_ROOT}/student/dealFriends.php`,
        //     data: {
        //         send: sender,
        //         receive: this.props.username,
        //         choice: choice,
        //     }
        // }).then((response) => {
        //     console.log(response);
        // }, (error) => {
        //     console.log(error);
        // });
    };


    openRequest = () => {
        this.props.request.map((req, index) => {
            const key = `${index}`;
            const btn = (
                <ButtonGroup>
                    <Button onClick={() => this.handleDecline(key, req.semailsend)}>Decline</Button>
                    <Button onClick={() => this.handleAccept(key, req.semailsend)}>Accept</Button>
                </ButtonGroup>
            );
            if (req != null) {
                notification.open({
                    message: 'New Friend Request',
                    description: `${req.semailsend} wants to add you as friend.`,
                    btn,
                    key,
                    onClose: this.close,
                    duration: 5,
                });
            }
        });
    };

    render() {
        return (
            <div className="user-info">
                <img
                    className="user-info-img"
                    src="http://i.dailymail.co.uk/i/newpix/2018/02/20/21/4969ADD700000578-0-image-a-28_1519161511462.jpg"
                />
                <div className="user-avatar">
                    <Avatar className="user-avatar-content"
                            style={{backgroundColor: '#7265e6', verticalAlign: 'middle', lineHeight: '50'}}
                            size="large">
                        {this.props.info.sfirstname}
                    </Avatar>
                </div>
                <div className="user-info-detail">
                    <p className="user-info-name">
                        {`${this.props.info.sfirstname} ${this.props.info.slastname}`}
                    </p>
                    <p>{this.props.info.suniversity}</p>
                    <p>{this.props.info.smajor}</p>
                </div>
                <div className='info-tools'>
                    <Button onClick={this.openRequest} className='request-button'>
                        Friend Requset
                    </Button>
                    <Badge count={this.props.requestNum} className="request-badge">
                        <a className="head-example" />
                    </Badge>
                </div>
            </div>
        )

    }
}