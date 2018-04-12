import React from 'react';
import $ from 'jquery';
import { Form, Icon, Input, Button, message } from 'antd';
import { API_ROOT } from '../constants';
import { Link } from 'react-router-dom'


const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //this.props.handleLogin("fake token");
                // $.ajax({
                //     url: `${API_ROOT}/login`,
                //     method: 'POST',
                //     data: JSON.stringify({
                //         username: values.username,
                //         password: values.password,
                //     }),
                // }).then((response) => {
                //     this.props.handleLogin(response);  //response is a token;
                // }, (error) => {
                //     message.error(error.responseText);
                // }).catch((error) => {
                //     console.log(error);
                // });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="login-title">Discover your future</div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   placeholder="Username"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock"
                                                 style={{ color: 'rgba(0,0,0,.25)' }}
                                           />}
                                   type="password" placeholder="Password"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </FormItem>
                </Form>
                <div id="page-tail">tail</div>
            </div>
        );
    }
}

export const Login = Form.create()(NormalLoginForm);