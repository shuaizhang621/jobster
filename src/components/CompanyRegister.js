import React from 'react';
import { Upload, Icon, Form, Input, Select, Button, message } from 'antd';
import {API_ROOT} from "../constants";
import $ from 'jquery';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        validateStatus: '',
        validateMessage: '',
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.ajax({
                    url: `${API_ROOT}/register.php`,
                    method: 'POST',
                    data: {
                        usertype: this.props.usertype,
                        cname: values.cname,
                        ckey: values.ckey,
                        cemail: values.cemail,
                        cphone: values.cphone,
                        clocation: values.clocation,
                        cindustry: values.cindustry,
                        cdescription: values.cdescription,
                    }
                }).then((response) => {
                    message.success(response);
                    console.log(response);
                    _this.props.history.push("/login");
                }, (response) => {
                    console.log(response);
                    message.error(response.responseText);
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                console.log(err);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('ckey')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    checkCompanyName = (rule, value, callback) => {
        if (value === '') {
            console.log('checkempty', value);
            this.setState({
                validateStatus:'error',
            });
            callback('Please input your company name.')
        } else {
            this.setState({
                validateStatus:'validating',
            });
            console.log(value);
            console.log('usertype:', this.props.usertype);
            $.ajax({
                url: `${API_ROOT}/emailvalidation.php`,
                method: 'POST',
                data: {
                    usertype: this.props.usertype,
                    cname: value,
                },
            }).then((response) => {
                console.log(response);
                this.setState({
                    validateStatus:'success',
                    validateMessage: '',
                });
                callback();
            }, (response) => {
                this.setState({
                    validateStatus:'warning',
                });
                callback('This name has been used.');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="1">+1</Option>
            </Select>
        );
        return (
            <div>
                <div className="form-title"> Your answer is here </div>
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <FormItem
                        hasFeedback
                        validateStatus={this.state.validateStatus}
                    >
                        {getFieldDecorator('cname', {
                            rules: [{
                                required: true,
                                message: this.state.validateMessage,
                                whitespace: true,
                                validator: this.checkCompanyName,
                            }],
                        })(
                            <Input placeholder="Company Name"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('ckey', {
                            rules: [{
                                required: true, message: 'Please input your password.',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input placeholder="Password" type="password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password.',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input placeholder="Confirm Password" type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('cemail', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail.',
                            }, {
                                required: true, message: 'Please input your E-mail.',
                            }],
                        })(
                            <Input placeholder="E-mail"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('cphone', {
                            rules: [{ required: true, message: 'Please input your phone number.' }],
                        })(
                            <Input placeholder="Phone Number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('clocation', {
                            rules: [{ required: true, message: 'Please input your location.', whitespace: true }],
                        })(
                            <Input placeholder="Address"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('cindusty')(
                            <Input placeholder="Industry"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('cdescription')(
                            <Input placeholder="Description"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Register</Button>
                        <p>I already have an account, go back to <Link to="/login">login</Link></p>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export const CompanyRegister = Form.create()(RegistrationForm);