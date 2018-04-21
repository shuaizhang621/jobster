import React from "react";
import { List, Avatar, Modal, } from 'antd';

const text = 'Are you sure delete this task?';

const data = [
    {
        firstname: 'Harry',
    },
    {
        firstname: 'Potter',
    },
    {
        firstname: 'LaBi',
    },
    {
        firstname: 'XiaoXin',
    },
    {
        firstname: 'Harry',
    },
    {
        firstname: 'Potter',
    },
    {
        firstname: 'LaBi',
    },
    {
        firstname: 'XiaoXin',
    },
];

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];


export class FriendsList extends React.Component {
    state = { visible: false }

    handleOnClickAvatar = () => {
        this.setState({
            visible: true,
        });
    }

    render() {

        return (
            <div className="friend-list">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            key={item.index}
                        >
                            <List.Item.Meta
                                avatar={
                                    <div onClick={this.handleOnClickAvatar}>
                                        <Avatar
                                            style={{ backgroundColor: colorList[Math.floor(Math.random() * 4)], verticalAlign: 'middle' }}
                                            size="middle"
                                        >
                                            {item.firstname}
                                        </Avatar>
                                    </div>

                                }
                                description="sz1950@nyu.edu"
                                title={<a href="https://ant.design">{item.firstname}</a>}
                            />
                        </List.Item>
                    )}
                />
            </div>

        )
    }
}