import React from 'react';
import { Upload, Icon, Form, Input, Select, Button, message } from 'antd';
import {API_ROOT} from "../constants";
import $ from 'jquery';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

class UpdateInfoForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        validateStatus: '',
        validateMessage: '',
    };

    componentDidUpdate() {
        console.log(this.props.info);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.ajax({
                    url: `${API_ROOT}/student/updateStudentProfile.php`,
                    method: 'POST',
                    data: {
                        usertype: this.props.usertype,
                        semail: values.semail,
                        skey: values.skey,
                        sfirstname: values.sfirstname,
                        slastname: values.slastname,
                        sgpa: values.sgpa,
                        sphone: values.sphone,
                        university: values.suniversity,
                        smajor: values.smajor,
                        sresume: values.sresume,
                    }
                }).then((response) => {
                    message.success(response);
                    console.log(response);
                    this.props.closeModal();
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

    render() {
        console.log("render:", this.props.info);
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
            <div className='update-form'>
                <div className='form-wrapper'>
                    <Form onSubmit={this.handleSubmit}>
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
                                initialValue: this.props.username,
                            })(
                                <Input placeholder={this.props.username} disabled/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('sfirstname', {
                                rules: [{ required: true, message: 'Please input your firstname.', whitespace: true }],
                                initialValue: this.props.info.sfirstname,
                            })(
                                <Input placeholder="First Name"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('slastname', {
                                rules: [{ required: true, message: 'Please input your lastname.', whitespace: true }],
                                initialValue: this.props.info.slastname,
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
                                initialValue: this.props.info.sphone,
                            })(
                                <Input placeholder="Phone Number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('suniversity', {
                                initialValue: this.props.info.suniversity,
                            })(
                                <Input placeholder="Univeristy"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('smajor', {
                                initialValue: this.props.info.smajor,
                            })(
                                <Input placeholder="Major" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('sgpa', {
                                initialValue: this.props.info.sgpa,
                            })(
                                <Input placeholder="GPA" />
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
                        <FormItem>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export const UpdateForm = Form.create()(UpdateInfoForm);