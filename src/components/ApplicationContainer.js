import { List, Button, Avatar, Modal, Switch } from 'antd';
import React from 'react';
import $ from 'jquery';
import { COLOR_LIST, API_ROOT } from '../constants';
import {FriendsList} from "./FriendsList";

export class ApplicationContainer extends React.Component {
    acceptApplication = (e) => {
        this.responseApplication('Accepted', e.target.id)
    };

    declineApplication = (e) => {
        this.responseApplication('Declined', e.target.id)
    };

    responseApplication = (decision, aid) => {
        $.ajax({
            url: `${API_ROOT}/company/responseApplication.php`,
            method: 'POST',
            data: {
                status: decision,
                aid: aid,
            },
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        const aid = 1;
        const avatar = (item) => (
            <Avatar
                style={{
                    backgroundColor: COLOR_LIST[Math.floor(Math.random() * 7)],
                    verticalAlign: 'middle',
                    lineHeight: '50'
                }}
                size="large"
            >
                {item.jid}
            </Avatar>
        );

        const description = (item) => (
            <span>
                <span>{`Google  |   ${item.jid}`}</span>
                <Button
                    className="add-friend-button"
                    id={aid}
                    shape="circle"
                    size="large"
                    icon="check"
                    onClick={this.acceptApplication}
                />
                <Button
                    className="add-friend-button"
                    id={aid}
                    shape="circle"
                    icon="close"
                    size="large"
                    style = {{marginRight: 10}}
                    onClick={this.declineApplication}
                />
            </span>
        );

        const content = (item) => (
            <div className='job-detail'>
                <p>{item.jid}</p>
                <p>{item.semail}</p>
                <p>{item.status}</p>
                <p>{item.applytime}</p>
            </div>
        );

        return (
            <List
                className="item-container"
                itemLayout="horizon"
                size="large"
                dataSource={this.props.application}
                renderItem={item => (
                    <List.Item
                        key={item.applytime}
                    >
                        <List.Item.Meta
                            avatar={avatar(item)}
                            title={
                                <a href="https://www.linkedin.com/in/shuaizhang621">
                                    {item.semail}
                                </a>
                            }
                            description={description(item)}
                        />
                        {content(item)}
                    </List.Item>
                )}
            />
        );
    }
}