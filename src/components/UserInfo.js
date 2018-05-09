import React from "react";
import { Avatar, Button, notification, Badge, Modal, Switch } from 'antd';
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY} from "../constants";
import {UpdateForm} from "./UpdateInfoForm";

const ButtonGroup = Button.Group;

export class UserInfo extends React.Component {
    state = {
        visible: false,
        publicProfile: this.props.info.sprivacy,
    };

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
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/student/dealFriends.php`,
            data: {
                semail: this.props.username,
                send: sender,
                receive: this.props.username,
                choice: choice,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    };


    openRequest = () => {
        this.props.request.map((req, index) => {
            const key = `${index}`;
            const btn = (
                <ButtonGroup>
                    <Button onClick={() => this.handleDecline(key, req.semail)}>Decline</Button>
                    <Button onClick={() => this.handleAccept(key, req.semail)}>Accept</Button>
                </ButtonGroup>
            );
            console.log(req);
            if (req != null) {
                notification.open({
                    message: 'New Friend Request',
                    description: `New friend request from ${req.semail}.`,
                    btn,
                    key,
                    onClose: this.close,
                    duration: 5,
                });
            }
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    judgeCheck = (checked) => {
        let privacy;
        if (checked) {
            privacy = 1;
        } else {
            privacy = 0;
        }
        return privacy;
    }

    judgeprivacy = (sp) => {
        if (sp == 1) {
            return false;
        } else {
            return true;
        }
    }

    onChange = (checked) => {
        let privacy = this.judgeCheck(checked);
        $.ajax({
            url: `${API_ROOT}/student/updateStudentPrivacy.php`,
            method: 'POST',
            data: {
                sprivacy: privacy,
                semail: this.props.username,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            console.log(response);
            this.setState({
                publicProfile: !checked,
            })
        }, (error) => {
            console.log(error);
        });
    }

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
                    <div className='info-tools'>
                        <Button onClick={this.openRequest} className='request-button'>
                            Friend Request
                        </Button>
                        <Badge count={this.props.requestNum} className="request-badge">
                            <a className="head-example" />
                        </Badge>
                    </div>

                    <div className='info-tools'>
                        <Button onClick={this.showModal} className='request-button'>
                            Update Profile
                        </Button>
                        <Modal
                            title="Update Profile"
                            visible={this.state.visible}
                            footer={null}
                            onCancel={this.handleCancel}
                        >
                            <UpdateForm
                                username={this.props.username}
                                info={this.props.info}
                                closeModal={this.handleCancel}
                            />
                        </Modal>
                    </div>
                    <div className='info-tools'>
                        {"Open to public:  "}
                        <Switch
                            className='switch'
                            defaultChecked
                            checked={this.judgeprivacy(this.state.publicProfile)}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        )

    }
}