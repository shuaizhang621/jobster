import { List, Collapse, Button, Avatar } from 'antd';
import React from 'react';
import { colorList } from "../constants";

const Panel = Collapse.Panel;
const listData = [];

const pagination = {
    pageSize: 10,
    current: 1,
    total: listData.length,
    onChange: (() => {}),
};

export class ResultCompany extends React.Component {

    render() {
        return (
            <div className="result-company">
                <List
                    className="item-container"
                    size="large"
                    dataSource={this.props.result}
                    renderItem={item => (
                        <List.Item
                            key={item.cname}
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
                                        {item.cname}
                                    </Avatar>
                                }
                                title={
                                    <a href="https://www.linkedin.com/in/shuaizhang621">
                                        {item.cname}
                                    </a>
                                }
                                description={
                                    <span>
                                    <span>{`${item.cindustry}  |   ${item.clocation}`}</span>
                                    <Button
                                        className="add-friend-button"
                                        id={item.cname}
                                        shape="circle"
                                        icon="heart-o"
                                        size="large"
                                        onClick={this.handleFollowCompany}
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