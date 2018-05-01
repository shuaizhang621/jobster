import { List, Button, Avatar, message, Switch } from 'antd';
import React from 'react';
import $ from 'jquery';
import {API_ROOT, COLOR_LIST } from '../constants';

export class ResultPeople extends React.Component {
    handleAddFriend = (e) => {
        let receiver = e.target.id;
        console.log(e.target.id);
        $.ajax({
            url: `${API_ROOT}/student/sendFriend.php`,
            method: 'POST',
            data: {
                send: this.props.username,
                receive: receiver,
            }
        }).then((response) => {
            let res = JSON.parse(response);
            console.log(response.length);
            if (response.length === 38) {
                message.warning(`${receiver} has not accepted your request yet.`);
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
                <Switch
                    className="add-friend-button"
                    defaultChecked
                    onChange={(checked) => this.props.handleChooseStudent(item.semail, checked)}
                />}
                {this.props.usertype== 'student' && <Button
                    className="add-friend-button"
                    id={item.semail}
                    shape="circle"
                    icon="user-add"
                    size="large"
                    onClick={this.handleAddFriend}
                    disabled={item.semail == this.props.username}
                />}
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