import React from 'react';
import { Icon, Input, AutoComplete, Radio} from 'antd';
import {ItemContainer} from "./ItemContainer";
import { Select } from 'antd';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const Search = Input.Search;

export class SearchContainer extends React.Component {
    state = {
        searched: false,
        searchFor: 'people',
    }

    renderTitle = (title) => {
        return (
            <span>{title}</span>
        );
    };

    // handleSelect = (value) => {
    //     console.log(value);
    //     if (value == 'companies') {
    //         this.setState({
    //             searched: true,
    //             search: value,
    //         });
    //     } else if (value == 'people') {
    //         this.setState({
    //             searched: true,
    //             search: value,
    //         });
    //     } else if (value == 'jobs'){
    //         this.setState({
    //             searched: true,
    //             search: value,
    //         });
    //     }
    // };
    //
    // renderSearchContent = () => {
    //     if (this.state.searched === false) {
    //         return null;
    //     } else if (this.state.searchAll === true) {
    //         return (
    //             <div>
    //                 <span>People result:</span>
    //                 <ItemContainer/>
    //                 <span>Job result:</span>
    //                 <ItemContainer/>
    //                 <span>Company result:</span>
    //                 <ItemContainer/>
    //             </div>
    //         )
    //     } else if (this.state.searchPeople === true) {
    //         return (
    //             <div>
    //                 <span>People result:</span>
    //                 <ItemContainer/>
    //             </div>
    //         )
    //     } else if (this.state.searchJob === true) {
    //         return (
    //             <div>
    //                 <span>Job result:</span>
    //                 <ItemContainer/>
    //             </div>
    //         )
    //     } else if (this.state.searchCompany === true) {
    //         return (
    //             <div>
    //                 <span>Company result:</span>
    //                 <ItemContainer/>
    //             </div>
    //         )
    //     }
    // };

    handleSearch = (value) => {
        console.log(value);
    }

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
            <div className="search-bar">
                <div className="search-selection">
                    <span class="search-for">Search for:</span>
                    <Radio.Group className="search-radio" value="people" onChange={this.handleSearch}>
                        <Radio.Button style={{ width: 175 }} value="large">
                            <Icon type="team" />People
                        </Radio.Button>
                        <Radio.Button style={{ width: 175 }} value="default">
                            <Icon type="red-envelope" />Jobs
                        </Radio.Button>
                        <Radio.Button style={{ width: 175 }} value="small">
                            <Icon type="shop" />Companies
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 620 }}
                />
            </div>
        );
    }
}
