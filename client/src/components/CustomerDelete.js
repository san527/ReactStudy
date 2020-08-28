import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

class CustomerDelete extends Component {
    constructor(props) {
        super(props);
    }

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE',
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <button
                onClick={evn => {
                    this.deleteCustomer(this.props.id);
                }}>
                삭제
            </button>
        );
    }
}

CustomerDelete.propTypes = propTypes;
CustomerDelete.defaultProps = defaultProps;

export default CustomerDelete;
