import React, { Component } from 'react';

import LayoutWineList from '../presentation/list'

export class WineList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            registers: []
        }
    }

    componentDidMount() {
        const url = 'http://pgii.test/apiv1/wineries';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                this.setState({ registers: data });
            });
    }

    render() {
        return <LayoutWineList
            {...this.state} />
    }
}

export default WineList