import React from 'react';
import { Upload, Icon, Form, Input, Select, Button, message } from 'antd';
import {API_ROOT} from "../constants";
import $ from 'jquery';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

export class RegistrationForm extends React.Component {
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
                        semail: values.semail,
                        skey: values.skey,
                        sfirstname: values.sfirstname,
                        slastname: values.slastname,
                        sgpa: values.sgpa,
                        sphone: values.sphone,
                        suniversity: values.suniversity,
                        smajor: values.smajor,
                        sresume: values.sresume,
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
            }
        });
    }



    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('skey')) {
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

    checkEmail = (rule, value, callback) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value === '') {
            console.log('checkempty', value);
            this.setState({
                validateStatus:'error',
                validateMessage: 'Please input your email.'
            });
            callback('Please input your email.')
        } else if (!re.test(value)) {
            console.log("valid email");
            this.setState({
                validateStatus:'warning',
                validateMessage: 'Please input a valid email.'
            });
            callback('Please input a valid email.')
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
                    semail: value,
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
                    validateMessage: 'This email has been used.'
                });
                callback('This email has been used.');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const upProps = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="1">+1</Option>
            </Select>
        );
        return (
            <div className='login-register'>
                <div className='form-wrapper'>
                    <div className="form-title"> Be great at what you do </div>
                    <div className='student-register-form-wrapper'>
                        <Form onSubmit={this.handleSubmit} className="register-form">
                            <div className='form-content'>
                                <FormItem
                                    hasFeedback
                                    validateStatus={this.state.validateStatus}
                                >
                                    {getFieldDecorator('semail', {
                                        rules: [{
                                            required: true,
                                            message: this.state.validateMessage,
                                            whitespace: true,
                                            validator: this.checkEmail,
                                        }],
                                    })(
                                        <Input placeholder="Email"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('sfirstname', {
                                        rules: [{ required: true, message: 'Please input your firstname.', whitespace: true }],
                                    })(
                                        <Input placeholder="First Name"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('slastname', {
                                        rules: [{ required: true, message: 'Please input your lastname.', whitespace: true }],
                                    })(
                                        <Input placeholder="Last Name"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('skey', {
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
                                    {getFieldDecorator('sphone', {
                                        rules: [{ required: true, message: 'Please input your phone number.' }],
                                    })(
                                        <Input placeholder="Phone Number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('suniversity')(
                                        <Input placeholder="Univeristy"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('smajor')(
                                        <Input placeholder="Major"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('sgpa')(
                                        <Input placeholder="GPA"/>
                                    )}
                                </FormItem>
                                <FormItem>  /* upload url... later...*/
                                    {getFieldDecorator('sresume')(
                                        <Dragger {...upProps}>
                                            <p className="ant-upload-drag-icon">
                                                <Icon type="inbox" />
                                            </p>
                                            <p className="ant-upload-text">Put your resume here to upload</p>
                                        </Dragger>
                                    )}
                                </FormItem>
                            </div>
                            <FormItem>
                                <Button type="primary" htmlType="submit">Register</Button>
                                <p>I already have an account, go back to <Link to="/login">login</Link></p>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export const Register = Form.create()(RegistrationForm);