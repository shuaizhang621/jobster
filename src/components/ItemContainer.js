import { List, Icon, Collapse, Button, } from 'antd';
import React from 'react';

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

export class ItemContainer extends React.Component {
    render() {
        return (
            <List
                className="item-container"
                itemLayout="vertical"
                size="large"
                pagination={pagination}
                dataSource={this.props.notification}
                renderItem={item => (
                    <List.Item
                        key={item.jtitle}
                        actions={[<Button>Forword</Button>, <Button>Apply</Button>]}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.jtitle}</a>}
                            description={item.jlocation}
                        />
                        <p>Salary: {item.jsalary}</p>
                        <p>Requirements:</p>
                        <ul>
                            <li>Diploma: {item.jreq_diploma}</li>
                            <li>Experience: {item.jreq_experience}</li>
                            <li>Skills: {item.jreq_skills}</li>
                        </ul>
                        <Collapse bordered={false}>
                            <Panel header="Description" key="1" style={customPanelStyle}>
                                <p>{item.jdescription}</p>
                            </Panel>
                        </Collapse>
                    </List.Item>
                )}
            />
        );
    }
}