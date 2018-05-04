import React from "react";
import { List, Avatar, Popover, Button} from 'antd';
import {COLOR_LIST} from "../constants";

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export class FriendsList extends React.Component {



    render() {
        let index = 0;
        return (
            <div className="friend-list">
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
                                            <Popover
                                                placement="leftTop"
                                                content={
                                                    <div>
                                                        <p>{item.sfirstname} {item.slastname}</p>
                                                        <p>{item.suniversity}</p>
                                                        <p>{item.smajor}</p>
                                                        <p>{item.sphone}</p>
                                                        <p>{item.semail}</p>
                                                        <Button>Message</Button>
                                                    </div>
                                                }
                                                trigger="click"
                                            >
                                                <div>
                                                    <Avatar
                                                        style={{ backgroundColor: COLOR_LIST[item.key], verticalAlign: 'middle' }}
                                                        size="middle"
                                                    >
                                                        {item.sfirstname}
                                                    </Avatar>
                                                </div>
                                            </Popover>
                                        </div>
                                    }
                                    description={item.semail}
                                    title={
                                        <div>
                                            <a href="https://www.linkedin.com/in/shuaizhang621">{item.sfirstname} {item.slastname}</a>
                                            <Button
                                                ghost icon="mail"
                                                className='message-button'
                                                onClick={() => this.props.handleGetMessage(item.semail, item.sfirstname)}
                                            />
                                        </div>
                                    }
                                />
                            </List.Item>
                        )
                    }}
                />
            </div>

        )
    }
}