import React from 'react';
import { List, Button, Avatar } from 'antd';
import { COLOR_LIST } from '../constants';

export class ResultCompany extends React.Component {
    render() {
        const avatar = (item) => (
            <Avatar
                style={{
                    backgroundColor: COLOR_LIST[Math.floor(Math.random() * 7)],
                    verticalAlign: 'middle',
                    lineHeight: '50'
                }}
                size="large"
            >
                {item.cname}
            </Avatar>
        );

        const title = (item) => (
            <a href="https://www.linkedin.com/in/shuaizhang621">
                {item.cname}
            </a>
        );

        const description = (item) => (
            <span>
                <span>{`${item.cindustry}  |   ${item.clocation}`}</span>
                <Button
                    className="add-friend-button"
                    id={item.cname}
                    shape="circle"
                    icon="heart-o"
                    size="large"
                    onClick={() => this.props.handleFollowCompany(item)}
                />
            </span>
        );

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
                                avatar = {avatar(item)}
                                title={title(item)}
                                description={description(item)}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}