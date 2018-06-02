import React from 'react';
import { Upload, Icon, Form, Input, Select, Button, message } from 'antd';
import {API_ROOT, TOKEN_KEY} from "../constants";
import $ from 'jquery';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

class UpdateCompanyForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        validateStatus: '',
        validateMessage: '',
        fileList: [],
        uploading: false,
    };


    componentDidUpdate() {
        console.log(this.props.info);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.ajax({
                    url: `${API_ROOT}/company/updateCompanyProfile.php`,
                    method: 'POST',
                    data: {
                        usertype: this.props.usertype,
                        cemail: values.cemail,
                        ckey: values.ckey,
                        cname: values.cname,
                        cphone: values.cphone,
                        cindustry: values.cindustry,
                        cdescription: values.cdescription,
                        clocation: values.clocation,
                        token: localStorage.getItem(TOKEN_KEY),
                    },
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


    render() {
        console.log("render:", this.props.info);
        const { getFieldDecorator } = this.props.form;

        const { uploading } = this.state;
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
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
                            {getFieldDecorator('cname', {
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
                            {getFieldDecorator('cemail', {initialValue: this.props.info.cemail})(
                                <Input placeholder="Email"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('cphone', {
                                rules: [{ required: true, message: 'Please input your phone number.' }],
                                initialValue: this.props.info.cphone
                            })(
                                <Input placeholder="Phone Number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('clocation', {
                                rules: [{ required: true, message: 'Please input your location.', whitespace: true }],
                                initialValue: this.props.info.clocation
                            })(
                                <Input placeholder="Address"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('cindusty', {initialValue: this.props.info.cindustry,})(
                                <Input placeholder="Industry"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('cdescription', {initialValue: this.props.info.cdescription})(
                                <Input placeholder="Description"/>
                            )}
                        </FormItem>


                        <FormItem>
                            <Button className="update-button" type="primary" htmlType="submit">Update</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export const UpdateCompany = Form.create()(UpdateCompanyForm);