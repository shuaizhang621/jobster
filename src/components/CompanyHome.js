import React from 'react';

export class CompanyHome extends React.Component {
    render() {
        return (
            <div>
                Hello, {this.props.username}, this is company home.
            </div>
        )
    }
}