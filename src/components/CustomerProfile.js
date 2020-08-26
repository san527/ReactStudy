import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

class CustomerProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <img src={this.props.image} alt="profile"></img>
                <h2>
                    {this.props.name}({this.props.id})
                </h2>
            </div>
        );
    }
}

CustomerProfile.propTypes = propTypes;
CustomerProfile.defaultProps = defaultProps;

export default CustomerProfile;
