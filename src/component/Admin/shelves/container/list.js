import React, { Component } from 'react';

import LayoutRackList from '../presentation/list'

export class RackList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            registers: []
        }
    }

    componentDidMount() {
        const url = 'http://pgii.test/apiv1/shelves';
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
        return <LayoutRackList
            {...this.state} />
    }
}

export default RackList