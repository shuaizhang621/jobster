import React from "react";
import { Avatar, Button, notification } from 'antd';

const ButtonGroup = Button.Group;


export class UserInfo extends React.Component {

    close = () => {
        console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
    };

    openRequest = () => {
        this.props.request.map((req, index) => {
            const key = index;
            const btn = (
                <ButtonGroup>
                    <Button onClick={() => notification.close(key)}>Decline</Button>
                    <Button onClick={() => notification.close(key)}>Accept</Button>
                </ButtonGroup>
            );
            notification.open({
                message: 'New Friend Request',
                description: `${req.semailsend} wants to add you as friend.`,
                btn,
                key,
                onClose: this.close,
                duration: 0,
            });
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
                <div>
                    <Button type="primary" onClick={this.openRequest}>
                        Open the notification box
                    </Button>
                </div>
            </div>
        )

    }
}