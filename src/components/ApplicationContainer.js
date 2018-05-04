import { List, Button, Avatar, Modal, Switch, Collapse, Tooltip } from 'antd';
import React from 'react';
import $ from 'jquery';
import {COLOR_LIST, API_ROOT, TOKEN_KEY} from '../constants';
import {FriendsList} from "./FriendsList";

const Panel = Collapse.Panel;

export class ApplicationContainer extends React.Component {
    state = {
        visiable: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    acceptApplication = (e) => {
        this.responseApplication('Accepted', e.target.id)
    };

    declineApplication = (e) => {
        this.responseApplication('Declined', e.target.id)
    };

    responseApplication = (decision, aid) => {
        console.log(aid);
        $.ajax({
            url: `${API_ROOT}/company/responseApplication.php`,
            method: 'POST',
            data: {
                cname: this.props.username,
                status: decision,
                aid: aid,
            },
            headers: {
                Authorization: localStorage.getItem(TOKEN_KEY)
            }
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        const avatar = (item) => (
            <Avatar
                style={{
                    backgroundColor: COLOR_LIST[item.key % 10],
                    verticalAlign: 'middle',
                    lineHeight: '50'
                }}
                size="large"
            >
                {item.jtitle.substr(0, 1)}
            </Avatar>
        );

        const avatarApplicant = (item) => (
            <Avatar
                style={{
                    backgroundColor: COLOR_LIST[(item.key + 3) % 10],
                    verticalAlign: 'middle',
                    lineHeight: '50'
                }}
                size="large"
            >
                {item.sfirstname}
            </Avatar>
        );

        const titleApplicant = (item) => (
            <a href="https://www.linkedin.com/in/shuaizhang621">
                {item.sfirstname} {item.slastname} {item.semail == this.props.username && " <-- You"}
            </a>
        );

        const description = (item) => (
            <span>{`${item.cname}  |   ${item.jlocation}`}</span>
        );

        const descriptionApplicant = (item) => (
            <span>
                <span>{`${item.suniversity} | ${item.smajor} | GPA:${item.sgpa}`}</span>
                <Tooltip placement="top" title="Accept">
                    <Button
                        className="add-friend-button"
                        id={item.aid}
                        shape="circle"
                        size="large"
                        icon="check"
                        onClick={this.acceptApplication}
                    />
                </Tooltip>
                <Tooltip placement="top" title="Decline">
                    <Button
                        className="add-friend-button"
                        id={item.aid}
                        type="danger"
                        shape="circle"
                        icon="close"
                        size="large"
                        style = {{marginRight: 10}}
                        onClick={this.declineApplication}
                    />
                </Tooltip>
                <Tooltip placement="top" title="More Information">
                    <Button
                        className="add-friend-button"
                        id={item.aid}
                        type="primary"
                        shape="circle"
                        size="large"
                        icon="file"
                        style = {{marginRight: 10}}
                        onClick={this.showModal}
                    />
                     <Modal
                         title={`${item.sfirstname} ${item.slastname}`}
                         visible={this.state.visible}
                         onOk={this.handleOk}
                         onCancel={this.handleCancel}
                     >
                         <p>School: {item.suniversity}</p>
                         <p>Major: {item.smajor}</p>
                         <p>GPA: {item.sgpa}</p>
                         <p>Phone: {item.sphone}</p>
                         <p>Email: {item.semail}</p>
                         <p><a href="file:///Users/shuaizhang/Desktop/student.pdf">resume</a></p>
                    </Modal>
                </Tooltip>
            </span>
        );

        const content = (item) => (
            <div className='job-detail'>
                <p>Required diploma: {item.jreq_diploma}</p>
                <p>Required skills: {item.jreq_skills}</p>
                <p>Required experience: {item.jreq_experience}</p>
                <p>Job salary: {item.jsalary}</p>
                <p>Description: <br/>{item.jdescription}</p>
            </div>
        );

        const applicants = (data) => {
            let index = 0;
            return (
                <Collapse className='applicants' bordered={false}>
                    <Panel header="Applicants" key="1">
                        <List
                            className='applicants-list'
                            itemLayout="horizontal"
                            dataSource={data.student_applied}
                            renderItem={item => {
                                item.key = index;
                                index += 1;
                                return (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={avatarApplicant(item)}
                                        title={titleApplicant(item)}
                                        description={descriptionApplicant(item)}
                                    />
                                </List.Item>
                            )}}
                        />
                    </Panel>
                </Collapse>
            )
        };

        let index = 0;

        return (
            <List
                className="item-container"
                itemLayout="horizon"
                size="large"
                dataSource={this.props.application}
                renderItem={item => {
                    item.key = index;
                    index += 1;
                    return (
                        <List.Item
                            key={item.applytime}
                        >
                            <List.Item.Meta
                                avatar={avatar(item)}
                                title={
                                    <a href="https://www.linkedin.com/in/shuaizhang621">
                                        {item.jtitle}
                                    </a>
                                }
                                description={description(item)}
                            />
                            {content(item)}
                            {applicants(item)}
                        </List.Item>
                    )
                }}
            />
        );
    }
}