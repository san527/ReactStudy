import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

class CustomerInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        );
    }
}

CustomerInfo.propTypes = propTypes;
CustomerInfo.defaultProps = defaultProps;

export default CustomerInfo;
