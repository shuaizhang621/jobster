import { List, Avatar, Icon, Collapse, Button, Col } from 'antd';
import React from 'react';

const Panel = Collapse.Panel;
const listData = [];

for (let i = 0; i < 2; i++) {
    listData.push({
        href: 'http://ant.design',
        jtitle: `Software Engineer ${i}`,
        jsalary: '100k-150k',
        jreq_diploma: "Master of Science",
        jreq_experience: "1 year +",
        jreq_skills: "Java, Python, PHP",
        jlocation: '5 MetroTech，Brooklyn, NY, 11201',
        jdescription: 'We’re searching for a Software Engineering Manager ' +
        'to lead a team of product engineers. The software and ' +
        'services built by this team will be supporting the transformation ' +
        'of digital products culture with WGSN and building a base to allow ' +
        'the business to drive rapid improvement and create innovative new offerings. ' +
        'It’s an exciting time for WGSN and we will need the right talent to continue working in smart, multidisciplinary teams tackling big problems. ' +
        'This role will join our in-house engineering team based in our WGSN New York office. ',
    });
}

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
                dataSource={listData}
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