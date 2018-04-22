import { List, Icon, Collapse, Button, } from 'antd';
import React from 'react';
import {UserInfo} from "./UserInfo";

const Panel = Collapse.Panel;
const listData = [];

const pagination = {
    pageSize: 10,
    current: 1,
    total: listData.length,
    onChange: (() => {}),
};

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    marginRight: 20,
    border: 0,
    overflow: 'hidden',
};

export class PeopleResult extends React.Component {
    render() {
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
                        actions={[<Button>Forword</Button>, <Button>Apply</Button>]}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.jtitle}</a>}
                            description='dscripasfaslf'
                        />
                        <div>{JSON.stringify(item)}</div>
                    </List.Item>
                )}
            />
        );
    }
}