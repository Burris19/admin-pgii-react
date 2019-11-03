import React, { Component } from 'react';

import {
    _actionForm,
    _alertTitle,
    _isEdit,
    _isFormValid,
    _showAlert,
} from '../../../../helper';

import LayoutFindProduct from '../presentation/find'

class FindProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            registers: []
        }
    }

    _handlerChange = (e) => {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    _handlerSubmit = (e) => {
        e.preventDefault()
        this.setState({
            submitted: true
        })
        const {
            search
        } = this.state;

        const data = {
            search
        }

        if (_isFormValid(data)) {
            this._searchProduct(data);
        }
    }

    _searchProduct = (data) => {
        const url = 'http://pgii.test/apiv1/product/search';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                const registers = data.reduce((accumulate, current) => {
                    const findProduct = accumulate.findIndex(element =>
                        element.product.code === current.code &&
                        element.product.name === current.name &&
                        element.product.rack_id === current.rack_id);

                    if (findProduct !== -1) {
                        accumulate[findProduct]['stock'] = accumulate[findProduct]['stock'] + 1;
                    } else {
                        const returnItem = {
                            product: current,
                            stock: 1
                        }
                        accumulate.push(returnItem)
                    }

                    return accumulate;
                }, [])
                this.setState({ registers });
            });
    }

    render() {
        return <LayoutFindProduct
            handlChange={this._handlerChange}
            handlerSubmit={this._handlerSubmit}
            {...this.state} />
    }
}

export default FindProduct