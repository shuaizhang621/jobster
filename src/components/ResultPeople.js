import { List, Collapse, Button, Avatar, message } from 'antd';
import React from 'react';
import $ from 'jquery';
import {API_ROOT, colorList } from "../constants";

const Panel = Collapse.Panel;
const listData = [];

const pagination = {
    pageSize: 10,
    current: 1,
    total: listData.length,
    onChange: (() => {}),
};

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
                message.warning(response.substring(1,37));
            }
            if (response.length === 36) {
                message.success(response.substring(1, 35));
            }
            console.log(res);
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="result-people">
                <List
                    className="item-container"
                    grid={{ column: 2, gutter: 20, }}
                    size="large"
                    dataSource={this.props.result}
                    renderItem={item => (
                        <List.Item
                            key={item.semial}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        style={{
                                            backgroundColor: colorList[Math.floor(Math.random() * 4)],
                                            verticalAlign: 'middle',
                                            lineHeight: '50'
                                        }}
                                        size="large"
                                    >
                                        {item.sfirstname}
                                    </Avatar>
                                }
                                title={
                                    <a href="https://www.linkedin.com/in/shuaizhang621">
                                        {item.sfirstname} {item.slastname} {item.semail == this.props.username && " <-- You"}
                                        </a>
                                }
                                description={
                                    <span>
                                    <span>{`${item.suniversity}  |   ${item.smajor}`}</span>
                                    <Button
                                        className="add-friend-button"
                                        id={item.semail}
                                        shape="circle"
                                        icon="user-add"
                                        size="large"
                                        onClick={this.handleAddFriend}
                                        disabled={item.semail == this.props.username}
                                    />
                                </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>

        );
    }
}