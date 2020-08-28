import React, { Component } from 'react';
import { post } from 'axios';
// import e from 'express';

const propTypes = {};

const defaultProps = {};

class CustomerAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
        };
    }

    handleFormSubmit = evn => {
        evn.preventDefault();
        this.addCustomer().then(res => {
            console.log(res.data);
            this.prors.stateRefresh();
        });
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
        });
    };

    handleFileChange = evn => {
        this.setState({
            file: evn.target.files[0],
            fileName: evn.target.value,
        });
    };

    handleValueChange = evn => {
        let nextState = {};
        nextState[evn.target.name] = evn.target.value;
        this.setState(nextState);
    };

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        return post(url, formData, config);
    };

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필이미지:
                <input
                    type="file"
                    name="file"
                    file={this.state.file}
                    value={this.state.fileName}
                    onChange={this.handleFileChange}></input>
                <br></br>
                이름:
                <input
                    type="text"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleValueChange}></input>{' '}
                <br></br>
                생년월일:
                <input
                    type="text"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.handleValueChange}></input>
                <br></br>
                성별:
                <input
                    type="text"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleValueChange}></input>{' '}
                <br></br>
                직업:<input
                    type="text"
                    name="job"
                    value={this.state.job}
                    onChange={this.handleValueChange}></input>{' '}
                <br></br>
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

CustomerAdd.propTypes = propTypes;
CustomerAdd.defaultProps = defaultProps;

export default CustomerAdd;
