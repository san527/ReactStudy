import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomerProfile from './CustomerProfile';
import CustomerInfo from './CustomerInfo';

const propTypes = {};

const defaultProps = {};

class Customer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <CustomerProfile id={this.props.id} name={this.props.name} image={this.props.image}></CustomerProfile>
                <CustomerInfo
                    birthday={this.props.birthday}
                    gender={this.props.gender}
                    job={this.props.job}></CustomerInfo>
            </div>
        );
    }
}

Customer.propTypes = propTypes;
Customer.defaultProps = defaultProps;

export default Customer;
