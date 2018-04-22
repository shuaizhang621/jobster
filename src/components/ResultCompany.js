import { List, Collapse, Button, } from 'antd';
import React from 'react';

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