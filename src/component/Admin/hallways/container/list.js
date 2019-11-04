import React, { Component } from 'react';

import LayoutCellarList from '../presentation/list'

export class CellarList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            registers: []
        }
    }

    componentDidMount() {
        const url = 'http://34.216.203.194/apiv1/hallways';
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
        return <LayoutCellarList
            {...this.state} />
    }
}

export default CellarList