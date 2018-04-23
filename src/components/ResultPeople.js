import { List, Collapse, Button, Avatar } from 'antd';
import React from 'react';
import $ from 'jquery';
import {API_ROOT} from "../constants";

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
            console.log(res);
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

        return (
            <List
                className="item-container"
                itemLayout="vertical"
                size="large"
                pagination={pagination}
                dataSource={this.props.result}
                renderItem={item => (
                    <List.Item
                        key={item.jtitle}
                    >
                        <List.Item.Meta
                            title={
                                <div>
                                    <Avatar
                                        style={{
                                            backgroundColor: colorList[Math.floor(Math.random() * 4)],
                                            verticalAlign: 'middle'
                                        }}
                                        size="middle"
                                    >
                                        {item.sfirstname}
                                    </Avatar>
                                    <span>{` ${item.sfirstname} ${item.slastname}`}</span>
                                </div>
                            }
                            description={
                                <span>
                                    <span>{`${item.suniversity}  |   ${item.smajor}`}</span>
                                    <Button
                                        id={item.semail}
                                        shape="circle"
                                        icon="user-add"
                                        size="large"
                                        onClick={this.handleAddFriend}
                                    />
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    }
}