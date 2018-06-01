import { List, Button, Avatar, message, Switch, Tooltip, Modal } from 'antd';
import React from 'react';
import $ from 'jquery';
import {API_ROOT, COLOR_LIST, TOKEN_KEY} from '../constants';

export class ResultPeople extends React.Component {
    state = {
        visiable: false,
        item: {},
    }

    showModal = (e) => {
        console.log(e.target.id);
        let item;
        for (let i = 0; i < this.props.result.length; i++) {
            if (this.props.result[i].semail == e.target.id) {
                item = this.props.result[i];
            }
        }
        this.setState({
            visible: true,
            item: item,
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

    handleAddFriend = (e) => {
        let receiver = e.target.id;
        console.log(e.target.id);
        $.ajax({
            url: `${API_ROOT}/student/sendFriend.php`,
            method: 'POST',
            data: {
                semail: this.props.username,
                send: this.props.username,
                receive: receiver,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            let res = JSON.parse(response);
            console.log(response.length);
            if (response.length === 38) {
                message.warning(`Your request to ${receiver} is still being pending.`);
            }
            if (response.length === 36) {
                message.success(`${receiver} has received your request.`);
            }
            if (response.length === 26) {
                message.warning("You guys are already friends.");
            }
            console.log(res);
        }, (error) => {
            console.log(error);
        })
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
                {item.sfirstname}
            </Avatar>
        );

        const title = (item) => (
            <a href="https://www.linkedin.com/in/shuaizhang621">
                {item.sfirstname} {item.slastname} {item.semail == this.props.username && " <-- You"}
            </a>
        );

        const description = (item) => (
            <span>
                <span>{`${item.suniversity}  |   ${item.smajor}`}</span>
                {this.props.usertype == 'company' &&
                    <div>
                        <Switch
                            className="add-friend-button"
                            defaultChecked
                            onChange={(checked) => this.props.handleChooseStudent(item.semail, checked)}
                        />
                        <Tooltip placement="top" title="More Information">
                            <Button
                                className="add-friend-button"
                                id={item.semail}
                                shape="circle"
                                icon="file"
                                style = {{marginRight: 55}}
                                onClick={this.showModal}
                            />
                            <Modal
                                title={`${this.state.item.sfirstname} ${this.state.item.slastname}`}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <p>School: {this.state.item.suniversity}</p>
                                <p>Major: {this.state.item.smajor}</p>
                                <p>GPA: {this.state.item.sgpa}</p>
                                <p>Phone: {this.state.item.sphone}</p>
                                <p>Email: {this.state.item.semail}</p>
                                <Button
                                    onClick={() =>
                                        window.open(`${API_ROOT}/student/${this.state.item.sresume}`, '_blank')
                                    }
                                >
                                    View Resume
                                </Button>
                            </Modal>
                        </Tooltip>
                    </div>
                }
                {this.props.usertype== 'student' &&
                    <div>
                        <Button
                            className="add-friend-button"
                            id={item.semail}
                            shape="circle"
                            icon="user-add"
                            size="large"
                            onClick={this.handleAddFriend}
                            disabled={item.semail == this.props.username}
                        />
                        <Tooltip placement="top" title="More Information">
                            <Button
                                className="add-friend-button"
                                id={item.semail}
                                shape="circle"
                                size="large"
                                icon="file"
                                style = {{marginRight: 10}}
                                onClick={this.showModal}
                            />
                            <Modal
                                title={`${this.state.item.sfirstname} ${this.state.item.slastname}`}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <p>School: {this.state.item.suniversity}</p>
                                <p>Major: {this.state.item.smajor}</p>
                                <p>GPA: {this.state.item.sgpa}</p>
                                <p>Phone: {this.state.item.sphone}</p>
                                <p>Email: {this.state.item.semail}</p>
                                <Button
                                    onClick={() =>
                                        window.open(`${API_ROOT}/student/${this.state.item.sresume}`, '_blank')
                                    }
                                >
                                    View Resume
                                </Button>
                            </Modal>
                        </Tooltip>
                    </div>
                }
            </span>
        );

        let index = 0;

        return (
            <div className="result-people">
                <List
                    className="item-container"
                    grid={{ column: 2, gutter: 20, }}
                    size="large"
                    dataSource={this.props.result}
                    renderItem={item => {
                        item.key = index;
                        index += 1;
                        return (
                            <List.Item
                                key={item.semail}
                            >
                                <List.Item.Meta
                                    avatar={avatar(item)}
                                    title={title(item)}
                                    description={description(item)}
                                />
                            </List.Item>
                        )
                    }}
                />
                {
                    this.props.usertype == 'company' &&
                        <Button
                            className='company-forward-button'
                            onClick={this.props.handleForward}
                        >
                            Forward to student
                        </Button>
                }
            </div>

        );
    }
}