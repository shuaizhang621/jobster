import React from "react";
import { Avatar } from 'antd';

export class UserInfo extends React.Component {
    render() {

        return (
            <div className="user-info">
                <img
                    className="user-info-img"
                    src="http://i.dailymail.co.uk/i/newpix/2018/02/20/21/4969ADD700000578-0-image-a-28_1519161511462.jpg"
                />
                <div className="user-avatar">
                    <Avatar className="user-avatar-content"
                            style={{backgroundColor: '#7265e6', verticalAlign: 'middle', lineHeight: '50'}}
                            size="large">
                        {this.props.info.sfirstname}
                    </Avatar>
                </div>
                <div className="user-info-detail">
                    <p className="user-info-name">
                        {`${this.props.info.sfirstname} ${this.props.info.slastname}`}
                    </p>
                    <p>Seeking for Full-time Software Engineer Position</p>
                </div>

            </div>
        )

    }
}