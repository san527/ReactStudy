import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomerProfile from './CustomerProfile';
import CustomerInfo from './CustomerInfo';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const propTypes = {};

const defaultProps = {};

class Customer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>
                    <img src={this.props.image} alt="profile"></img>
                </TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
        );
    }
}

Customer.propTypes = propTypes;
Customer.defaultProps = defaultProps;

export default Customer;
