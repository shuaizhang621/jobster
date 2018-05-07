import { List, Button, Avatar, Modal, Switch, message } from 'antd';
import React from 'react';
import $ from 'jquery';
import {COLOR_LIST, API_ROOT, TOKEN_KEY} from '../constants';

export class ItemContainer extends React.Component {
    state = {
        receiver: [],
        visible: false,
        jid: 0,
    }

    showModal = (e) => {
        this.setState({
            visible: true,
            jid: e.target.id,
        });
    }
    handleOk = (e) => {
        $.ajax({
            url: `${API_ROOT}/student/forward.php`,
            method: 'POST',
            data: {
                semail: this.props.username,
                semailreceive: this.state.receiver,
                jid: this.state.jid,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            message.success(response);
            console.log("backend response: ", response);
        }, (error) => {
            console.log(error);
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    addReceiver = (receiver) => {
        let list = this.state.receiver;
        let hasReceiver = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].semail === receiver) {
                hasReceiver = true;
            }
        }
        if (!hasReceiver) {
            list.push({semail: receiver});
            this.setState({receiver: list});
        }
    };

    removeReceiver = (receiver) => {
        let list = this.state.receiver;
        let receiverIndex = -1;
        for (let i = 0; i < list.length; i++) {
            if (list[i].semail === receiver) {
                receiverIndex = i;
            }
        }
        if (receiverIndex >= 0) {
            list.splice(receiverIndex, 1);
            this.setState({receiver: list});
        }
    };

    handleApply = (item) => {
        console.log(item);
        $.ajax({
            url: `${API_ROOT}/student/apply.php`,
            method: 'POST',
            data: {
                semail: this.props.username,
                jid: item.jid,
                cname: 'ZhuYuanzhang',
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            message.success(response);
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        const avatar = (item) => (
            <Avatar
                style={{
                    backgroundColor: COLOR_LIST[item.key % 10],
                    verticalAlign: 'middle',
                    lineHeight: '50'
                }}
                size="large"
            >
                {item.jtitle == null ? "" : item.jtitle.substr(0, 1)}
            </Avatar>
        );

        const description = (item) => {
            let index = 0;
            return (
                <span>
                    <span>{`${item.cname}  |   ${item.jlocation}`}</span>
                    <div>
                        <Button
                            className="add-friend-button"
                            id={item.jid}
                            shape="circle"
                            size="large"
                            icon="share-alt"
                            onClick={this.showModal}
                        />
                        <Modal
                            className='modal-friend-list'
                            title="Forward to friends:"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={this.props.friends}
                                renderItem={item => {
                                    item.key = index;
                                    index += 1;
                                    return (
                                            <List.Item
                                                key={item.index}
                                            >
                                                <List.Item.Meta
                                                    avatar={
                                                        <div>
                                                            <Avatar
                                                                style={{
                                                                    backgroundColor: COLOR_LIST[item.key % 10],
                                                                    verticalAlign: 'middle'
                                                                }}
                                                                size="middle"
                                                            >
                                                                {item.sfirstname}
                                                            </Avatar>
                                                        </div>
                                                    }
                                                    description={item.semail}
                                                    title={
                                                        <div>
                                                            <a href="https://www.linkedin.com/in/shuaizhang621">
                                                                {item.sfirstname} {item.slastname}
                                                            </a>
                                                            <Switch
                                                                id={item.semail}
                                                                className="switch"
                                                                defaultChecked={false}
                                                                onChange={(checked) => {
                                                                    if (checked) {
                                                                        this.addReceiver(item.semail);
                                                                    } else {
                                                                        this.removeReceiver(item.semail);
                                                                    }
                                                                    console.log(item.semail);
                                                                }}
                                                            />
                                                        </div>

                                                    }
                                                />
                                            </List.Item>
                                        )

                                }}
                            />
                        </Modal>
                    </div>
                    <Button
                        className="add-friend-button"
                        id={item.jid}
                        shape="circle"
                        icon="heart-o"
                        size="large"
                        style = {{marginRight: 10}}
                        onClick={() => {this.props.handleFollowCompany(item)}}
                    />
                    <Button
                        className="apply-button"
                        id={item}
                        size="large"
                        style = {{marginRight: 10}}
                        onClick={() => this.handleApply(item)}
                    >Apply</Button>
                </span>
            )
        };

        const content = (item) => (
            <div className='job-detail'>
                <p>Salary: {item.jsalary}</p>
                <p>Requirements:</p>
                <ul>
                    <li>Diploma: {item.jreq_diploma}</li>
                    <li>Experience: {item.jreq_experience} years</li>
                    <li>Skills: {item.jreq_skills}</li>
                    <li>Description: {item.jdescription}</li>
                </ul>
            </div>
        );

        let index = 0;

        return (
            <List
                className="item-container"
                itemLayout="horizon"
                size="large"
                dataSource={this.props.notification}
                renderItem={item => {
                    item.key = index;
                    index += 1;
                    return (
                        <List.Item
                            key={item.jtitle}
                        >
                            <List.Item.Meta
                                avatar={avatar(item)}
                                title={
                                    <a href="https://www.linkedin.com/in/shuaizhang621">
                                        {item.jtitle}
                                    </a>
                                }
                                description={description(item)}
                            />
                            {content(item)}
                        </List.Item>
                )}}
            />
        );
    }
}