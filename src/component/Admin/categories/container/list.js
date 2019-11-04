import React, { Component } from 'react';

import LayoutCategoryList from '../presentation/list'

export class CategoryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            registers: []
        }
    }

    componentDidMount() {
        const url = 'http://34.216.203.194/apiv1/categories';
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
        return <LayoutCategoryList
            {...this.state} />
    }
}

export default CategoryList