import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';

const customers = [
    {
        id: 1,
        image: 'https://placeimg.com/64/64/any1',
        name: '홍길동',
        birthday: '961222',
        gender: '남자',
        job: '대학생',
    },
    {
        id: 2,
        image: 'https://placeimg.com/64/64/any2',
        name: '장길산',
        birthday: '990000',
        gender: '남자',
        job: '의적',
    },
    {
        id: 3,
        image: 'https://placeimg.com/64/64/any3',
        name: '최봉학',
        birthday: '690720',
        gender: '여자',
        job: '집콕',
    },
];

class App extends Component {
    render() {
        return (
            <div>
                {customers.map(customer => {
                    return (
                        <Customer
                            key={customer.id}
                            id={customer.id}
                            image={customer.image}
                            name={customer.name}
                            birthday={customer.birthday}
                            gender={customer.gender}
                            job={customer.job}></Customer>
                    );
                })}
            </div>
        );
    }
}

export default App;
