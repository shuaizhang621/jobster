import React from 'react';
import {ItemContainer} from "./ItemContainer";

export class ResultJob extends React.Component {
    render() {
        return (
            <ItemContainer
                handleFollowCompany={this.props.handleFollowCompany}
                username={this.props.username}
                notification={this.props.result}
                friends={this.props.friends}
            />
        );
    }
}