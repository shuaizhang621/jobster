import { List, Collapse, Button, } from 'antd';
import React from 'react';
import {ItemContainer} from "./ItemContainer";

const Panel = Collapse.Panel;
const listData = [];

const pagination = {
    pageSize: 10,
    current: 1,
    total: listData.length,
    onChange: (() => {}),
};

export class ResultJob extends React.Component {
    render() {
        return (
            <ItemContainer
                username={this.props.username}
                notification={this.props.result}
            />
        );
    }
}