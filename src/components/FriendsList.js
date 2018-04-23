import React from "react";
import { List, Avatar, Popover, Button} from 'antd';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export class FriendsList extends React.Component {



    render() {

        return (
            <div className="friend-list">
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.friends}
                    renderItem={item => (
                        <List.Item
                            key={item.index}
                        >
                            <List.Item.Meta
                                avatar={
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
                                                style={{ backgroundColor: colorList[Math.floor(Math.random() * 4)], verticalAlign: 'middle' }}
                                                size="middle"
                                            >
                                                {item.sfirstname}
                                            </Avatar>
                                        </div>
                                    </Popover>

                                }
                                description={item.semail}
                                title={<a href="https://www.linkedin.com/in/shuaizhang621">{item.sfirstname} {item.slastname}</a>}
                            />
                        </List.Item>
                    )}
                />
            </div>

        )
    }
}