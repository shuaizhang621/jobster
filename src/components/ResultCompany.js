import React from 'react';
import { List, Button, Avatar, Collapse, Tooltip, Modal, Switch } from 'antd';
import {API_ROOT, COLOR_LIST, TOKEN_KEY} from '../constants';
import $ from "jquery";
import {ItemContainer} from "./ItemContainer";

const Panel = Collapse.Panel;

export class ResultCompany extends React.Component {

    state = {
        receiver: [],
        visible: false,
        jid: 0,
    }

    componentDidUpdate(prevProps, prevState) {
        // let companyListTemp = this.props.result;
        // if (this.props.result != null) {
        //     for (let i = 0; i < this.props.result.length; i++) {
        //         companyListTemp[i].visiable = false;
        //     }
        // }
        // if (prevState.companyList.length !== this.state.companyList.length) {
        //     this.setState({companyList: companyListTemp});
        // }

        // console.log("state company list: ", this.state.companyList);
    }

    showJobs = (cname) => {
        console.log(cname);
        $.ajax({
            url:`${ API_ROOT }/student/jobOfCompany.php`,
            method: 'POST',
            data: {
                cname: cname,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            let res = JSON.parse(response);
            console.log("show jobs", res);
            let companyListTemp = this.state.companyList;
            for (let i = 0; i < this.state.companyList.length; i++) {
                if (companyListTemp[i].cname == cname) {
                    companyListTemp[i].jobs = res;
                    companyListTemp[i].visiable = true;
                }
            }
            this.setState({companyList: companyListTemp});
        }, (error) => {
            console.log(error);
        });
    }

    showModal = (e) => {
        this.setState({
            visible: true,
            jid: e.target.id,
        });
    }
    handleOk = (e) => {
        $.ajax({
            url: `${API_ROOT}/student/forward.php`,
            method: 'POST',
            data: {
                semail: this.props.username,
                semailreceive: this.state.receiver,
                jid: this.state.jid,
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            console.log("backend response: ", response);
        }, (error) => {
            console.log(error);
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    addReceiver = (receiver) => {
        let list = this.state.receiver;
        let hasReceiver = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].semail === receiver) {
                hasReceiver = true;
            }
        }
        if (!hasReceiver) {
            list.push({semail: receiver});
            this.setState({receiver: list});
        }
    };

    removeReceiver = (receiver) => {
        let list = this.state.receiver;
        let receiverIndex = -1;
        for (let i = 0; i < list.length; i++) {
            if (list[i].semail === receiver) {
                receiverIndex = i;
            }
        }
        if (receiverIndex >= 0) {
            list.splice(receiverIndex, 1);
            this.setState({receiver: list});
        }
    };

    handleApply = (item) => {
        console.log(item);
        $.ajax({
            url: `${API_ROOT}/student/apply.php`,
            method: 'POST',
            data: {
                semail: this.props.username,
                jid: item.jid,
                cname: 'ZhuYuanzhang',
                token: localStorage.getItem(TOKEN_KEY),
            },
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        const avatar = (item) => (
            <Avatar
                style={{
                    backgroundColor: COLOR_LIST[item.key % 10],
                    verticalAlign: 'middle',
                    lineHeight: '50'
                }}
                size="large"
                onClick={() => this.showJobs(item.cname)}
            >
                {item.cname != null ? item.cname.substr(0, 1) : ""}
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

        const avatarJobs = (item) => (
            <Avatar
                style={{
                    backgroundColor: COLOR_LIST[(item.key + 7) % 10],
                    verticalAlign: 'middle',
                    lineHeight: '50'
                }}
                size="large"
            >
                {item.jtitle.substr(0, 1)}
            </Avatar>
        );

        const descriptionJobs = (item) => {
            let index = 0;
            return (
            <span>
                <span>{`${item.cname}  |   ${item.jlocation}`}</span>
                <div>
                    <Button
                        className="add-friend-button"
                        id={item.jid}
                        shape="circle"
                        size="large"
                        icon="share-alt"
                        onClick={this.showModal}
                    />
                    <Modal
                        className='modal-friend-list'
                        title="Forward to friends:"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
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
                                                    <Avatar
                                                        style={{
                                                            backgroundColor: COLOR_LIST[item.key],
                                                            verticalAlign: 'middle'
                                                        }}
                                                        size="middle"
                                                    >
                                                        {item.sfirstname.substr(0, 1)}
                                                    </Avatar>
                                                </div>
                                            }
                                            description={item.semail}
                                            title={
                                                <div>
                                                    <a href="https://www.linkedin.com/in/shuaizhang621">
                                                        {item.sfirstname} {item.slastname}
                                                    </a>
                                                    <Switch
                                                        id={item.semail}
                                                        className="switch"
                                                        defaultChecked={false}
                                                        onChange={(checked) => {
                                                            if (checked) {
                                                                this.addReceiver(item.semail);
                                                            } else {
                                                                this.removeReceiver(item.semail);
                                                            }
                                                            console.log(item.semail);
                                                        }}
                                                    />
                                                </div>

                                            }
                                        />
                                    </List.Item>
                                )}
                            }
                        />
                    </Modal>
                </div>
                <Button
                    className="apply-button"
                    id={item}
                    size="large"
                    style = {{marginRight: 10}}
                    onClick={() => this.handleApply(item)}
                >Apply</Button>
            </span>
        )};

        const content = (item) => (
            <div className='job-detail'>
                <p>Salary: {item.jsalary}</p>
                <p>Requirements:</p>
                <ul>
                    <li>Diploma: {item.jreq_diploma}</li>
                    <li>Experience: {item.jreq_experience} years</li>
                    <li>Skills: {item.jreq_skills}</li>
                    <li>Description: {item.jdescription}</li>
                </ul>
            </div>
        );

        const jobs = (data) => {
            let index = 0;
            return (
                <Collapse className='company-jobs' bordered={false}>
                    <Panel header="See job openings" key="1">
                        <List
                            className='applicants-list'
                            itemLayout="horizontal"
                            dataSource={data.jobs}
                            renderItem={item => {
                                item.key = index;
                                index += 1;
                                return (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={avatarJobs(item)}
                                            title={
                                                <a href="https://www.linkedin.com/in/shuaizhang621">
                                                    {item.jtitle}
                                                </a>
                                            }
                                            description={descriptionJobs(item)}

                                        />
                                        {content(item)}
                                    </List.Item>
                            )}}
                        />
                    </Panel>
                </Collapse>
        )};

        let index = 0;

        return (
            <div className="result-company">
                <List
                    className="item-container"
                    size="large"
                    dataSource={this.props.result}
                    renderItem={item => {
                        item.key = index;
                        index += 1;
                        return (
                            <List.Item
                                key={item.cname}
                            >
                                <List.Item.Meta
                                    avatar = {avatar(item)}
                                    title={title(item)}
                                    description={description(item)}
                                />
                                {jobs(item)}
                            </List.Item>
                        )
                    }}
                />
            </div>
        );
    }
}