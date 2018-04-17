import React from "react";
import { Button } from "antd";

const ButtonGroup = Button.Group;

export class PreRegister extends React.Component {
    render() {
        return(
            <div className="pre-register">
                <div className="pre-register-title">What kind of account you need?</div>
                <div className="pre-register-body">
                    <ButtonGroup>
                        <Button
                            className="preregister-button"
                            onClick={this.props.handleOnClickStudent}
                        >
                            Student
                        </Button>
                        <Button
                            className="preregister-button"
                            onClick={this.props.handleOnClickCompany}
                        >
                            Company
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
