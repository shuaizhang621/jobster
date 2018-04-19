import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import {ItemContainer} from "./ItemContainer";
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

export class SearchContainer extends React.Component {
    state = {
        searched: false,
        searchPeople: false,
        searchJob: false,
        searchCompany: false,
        searchAll: false,
        search: '',
    }

    renderTitle = (title) => {
        return (
            <span>{title}</span>
        );
    };

    handleSelect = (value) => {
        console.log(value);
        if (value == 'companies') {
            this.setState({
                searched: true,
                search: value,
            });
        } else if (value == 'people') {
            this.setState({
                searched: true,
                search: value,
            });
        } else if (value == 'jobs'){
            this.setState({
                searched: true,
                search: value,
            });
        }
    };

    renderSearchContent = () => {
        if (this.state.searched === false) {
            return null;
        } else if (this.state.searchAll === true) {
            return (
                <div>
                    <span>People result:</span>
                    <ItemContainer/>
                    <span>Job result:</span>
                    <ItemContainer/>
                    <span>Company result:</span>
                    <ItemContainer/>
                </div>
            )
        } else if (this.state.searchPeople === true) {
            return (
                <div>
                    <span>People result:</span>
                    <ItemContainer/>
                </div>
            )
        } else if (this.state.searchJob === true) {
            return (
                <div>
                    <span>Job result:</span>
                    <ItemContainer/>
                </div>
            )
        } else if (this.state.searchCompany === true) {
            return (
                <div>
                    <span>Company result:</span>
                    <ItemContainer/>
                </div>
            )
        }
    };

    render() {
        const dataSource = [{
            title: 'Search for',
            children: [{
                title: 'People',
                type: 'team',
            }, {
                title: 'Jobs',
                type: 'red-envelope',
            }, {
                title: 'Companies',
                type: 'shop',
            }],
        }];

        const options = dataSource.map(group => (
            <OptGroup
                key={group.title}
                label={this.renderTitle(group.title)}
            >
                {group.children.map(opt => (
                    <Option
                        key={opt.title}
                        value={opt.title}
                    >
                        <span>
                            <Icon type={opt.type} style={{ marginRight: 5}}/>
                            {opt.title}
                        </span>
                    </Option>
                ))}
            </OptGroup>
        ));

        return (
        <div className="certain-category-search-wrapper" style={{ width: 650 }}>
            <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size="large"
                style={{ width: '100%' }}
                dataSource={options}
                placeholder="input here"
                optionLabelProp="value"
                onSelect={this.handleSelect}
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
            {this.renderSearchContent}
        </div>
        );
    }
}
