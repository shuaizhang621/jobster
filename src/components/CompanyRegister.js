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
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                message.success("success registered");
                this.props.history.push("/login");
                // $.ajax({
                //     url: `${API_ROOT}/signup`,
                //     method: 'POST',
                //     data: JSON.stringify({
                //         username: values.username,
                //         password: values.password
                //     })
                // }).then((response) => {
                //     message.success(response);
                //     this.props.history.push("/login");
                // }, (response) => {
                //     message.error(response.responseText);
                // }).catch((error) => {
                //     console.log(error);
                // });
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

        const formItemLayout = {
            // labelCol: {
            //     xs: { span: 24 },
            //     sm: { span: 0 },
            // },
            // wrapperCol: {
            //     xs: { span: 24 },
            //     sm: { span: 16 },
            // },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
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
            <div>
                <div className="form-title"> Your answer is here </div>
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('cname', {
                            rules: [{ required: true, message: 'Please input your company name.', whitespace: true }],
                        })(
                            <Input placeholder="Company Name"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                    >
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
                    <FormItem
                        {...formItemLayout}
                    >
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
                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('cphone', {
                            rules: [{ required: true, message: 'Please input your phone number.' }],
                        })(
                            <Input placeholder="Phone Number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('clocation', {
                            rules: [{ required: true, message: 'Please input your location.', whitespace: true }],
                        })(
                            <Input placeholder="Address"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('cindusty')(
                            <Input placeholder="Industry"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('cdescription')(
                            <Input placeholder="Description"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                        <p>I already have an account, go back to <Link to="/login">login</Link></p>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export const CompanyRegister = Form.create()(RegistrationForm);