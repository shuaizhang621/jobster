import React from "react";
import { Avatar, Button, Modal } from 'antd';
import { UpdateCompany } from "./UpdateCompany";


const ButtonGroup = Button.Group;

export class CompanyInfo extends React.Component {
    state = {
        visible: false,
        publicProfile: this.props.info.sprivacy,
    };

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

    render() {
        return (
            <div className="company-info">
                <img
                    className="user-info-img"
                    src="http://i.dailymail.co.uk/i/newpix/2018/02/20/21/4969ADD700000578-0-image-a-28_1519161511462.jpg"
                />
                <div className="user-avatar">
                    <Avatar className="user-avatar-content"
                            style={{backgroundColor: '#7265e6', verticalAlign: 'middle', lineHeight: '50'}}
                            size="large">
                        {this.props.username}
                    </Avatar>
                </div>
                <div className="user-info-detail">
                    <p className="user-info-name">
                        {`${this.props.username}`}
                    </p>
                    <p>{this.props.info.cemail}</p>
                    <p>{this.props.info.cphone}</p>
                    <p>{this.props.info.clocation}</p>
                    <p>{this.props.info.cindustry}</p>
                </div>
                <div className='info-tools'>
                    <Button onClick={this.showModal} className='request-button'>
                        Update Profile
                    </Button>
                    <Modal
                        title="Update Profile"
                        visible={this.state.visible}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <UpdateCompany
                            username={this.props.username}
                            info={this.props.info}
                            closeModal={this.handleCancel}
                        />
                    </Modal>
                </div>
            </div>
        )

    }
}