import React from "react";
import { Avatar, Button } from 'antd';

export class UserInfo extends React.Component {
    render() {
        const userInfo = {
            firstname: 'Shuai',
            lastname: 'Zhang',

        }
        return (
            <div className="user-info">
                <img className="user-info-img" src="http://i.dailymail.co.uk/i/newpix/2018/02/20/21/4969ADD700000578-0-image-a-28_1519161511462.jpg"/>
                <div className="user-avatar">
                    <Avatar className="user-avatar-content"
                            style={{backgroundColor: '#7265e6', verticalAlign: 'middle', lineHeight: '50'}}
                            size="large">
                        {userInfo.firstname}
                    </Avatar>
                </div>
                <div className="user-info-detail">
                    <p className="user-info-name">{`${userInfo.firstname} ${userInfo.lastname}`}</p>
                    <p>Seeking for Full-time Software Engineer Position</p>
                </div>

            </div>
        )

    }
}