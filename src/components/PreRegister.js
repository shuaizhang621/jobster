import React from "react";
import { Button } from "antd";

export class PreRegister extends React.Component {
    render() {
        return(
            <div className="pre-register">
                <div className="pre-register-title">What kind of account you need?</div>
                <div className="pre-register-body">
                    <Button
                        onClick={this.props.handleOnClickStudent}
                    >Student</Button>
                    <Button
                        onClick={this.props.handleOnClickCompany}
                    >Company</Button>
                </div>
            </div>
        );
    }
}
