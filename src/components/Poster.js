import React from 'react';
import { Input, Avatar, Button, Form } from 'antd';
import {API_ROOT, COLOR_LIST} from "../constants";
import $ from "jquery";
import {message} from "antd/lib/index";

const FormItem = Form.Item;
const { TextArea } = Input;

const DetailForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            jtitle: Form.createFormField({
                ...props.jtitle,
                value: props.jtitle.value,
            }),
            jlocation: Form.createFormField({
                    ...props.jlocation,
                    value: props.jlocation.value,
            }),
            jsalary: Form.createFormField({
                    ...props.jsalary,
                    value: props.jsalary.value,
            }),
            jreq_diploma: Form.createFormField({
                    ...props.jreq_diploma,
                    value: props.jreq_diploma.value,
            }),
            jreq_experience: Form.createFormField({
                    ...props.jreq_experience,
                    value: props.jreq_experience.value,
            }),
            jreq_skills: Form.createFormField({
                    ...props.jreq_skills,
                    value: props.jreq_skills.value,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline">
            <FormItem>
                {getFieldDecorator('jtitle', {
                    rules: [{ required: true, message: '' }],
                })(<Input placeholder="Job title"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('jlocation', {
                    rules: [{ required: true, message: '' }],
                })(<Input placeholder="Job location"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('jreq_diploma', {
                    rules: [{ required: true, message: '' }],
                })(<Input placeholder="required diploma"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('jreq_experience', {
                    rules: [{ required: true, message: '' }],
                })(<Input placeholder="required experience"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('jreq_skills', {
                    rules: [{ required: true, message: '' }],
                })(<Input placeholder="required skills"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('jsalary', {
                    rules: [{ required: true, message: '' }],
                })(<Input placeholder="Job salary"/>)}
            </FormItem>
        </Form>
    );
});

export class Poster extends React.Component {
    state = {
        jdescription: '',
        fields: {
            jtitle: {
                value: '',
            },
            jlocation: {
                value: '',
            },
            jsalary: {
                value: '',
            },
            jreq_diploma: {
                value: '',
            },
            jreq_experience: {
                value: '',
            },
            jreq_skills: {
                value: '',
            },
        },
        hiddenDetail: true,
    };

    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    }

    handleHide = () => {
        this.setState({
            hiddenDetail: !this.state.hiddenDetail,
        });
    }

    handlePost = () => {
        console.log(this.state);
        $.ajax({
            method: 'POST',
            url: `${API_ROOT}/company/post.php`,
            data: {
                cname: this.props.info.cname,
                jdescription: this.state.jdescription,
                jtitle: this.state.fields.jtitle.value,
                jlocation: this.state.fields.jlocation.value,
                jsalary: this.state.fields.jsalary.value,
                jreq_diploma: this.state.fields.jreq_diploma.value,
                jreq_experience: this.state.fields.jreq_experience.value,
                jskills: this.state.fields.jreq_skills.value,
            },
        }).then((response) => {
            console.log(response);
        }, (error) => {
            message.error(error.responseText);
        });
    }


    render() {

        const fields = this.state.fields;

        return(
            <div className="poster">
                <div className='title'>
                    <Avatar
                        style={{
                            backgroundColor: COLOR_LIST[Math.floor(Math.random() * 7)],
                            verticalAlign: 'middle',
                            lineHeight: '50'
                        }}
                        size="large"
                    >
                        {this.props.info.cname}
                    </Avatar>
                    <div className='title-text'>
                        <div className='main-title'>
                            {this.props.info.cname}
                        </div>
                        <div className='sub-title'>
                            {this.props.info.cindustry}
                        </div>
                    </div>
                </div>
                <TextArea
                    rows={2}
                    placeholder="Description"
                    onBlur={(e) => this.setState({jdescription: e.target.value})}
                />
                {!this.state.hiddenDetail && <div className="detail">
                    <DetailForm {...fields} onChange={this.handleFormChange} />
                </div>}
                <div className='poster-button'>
                    <Button onClick={this.handleHide}>Detail</Button>
                    <Button type="primary" onClick={this.handlePost} className='post-button'>Post</Button>
                </div>

            </div>
        );
    }
}