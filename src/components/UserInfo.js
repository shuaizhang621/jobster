import React from "react";

export class UserInfo extends React.Component {
    render() {
        return (
            <div className="user-info">Hello, {this.props.username},this is your info</div>
        )

    }
}