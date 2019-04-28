import React, { Component } from 'react';
import { RiseLoader } from 'react-spinners';

export default class Loading extends Component {
    render() {
        return (
            <div className='overlay'>
                <div className='spinner'>
                    <RiseLoader color={'#fff'} loading={this.props.loading} />
                </div>
            </div>
        );
    }
}