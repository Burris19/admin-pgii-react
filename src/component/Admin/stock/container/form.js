import React, { Component } from 'react';
import LayoutStockList from '../presentation/list'

class StockList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            registers: []
        }
    }

    componentDidMount() {
        this._getProducts()
    }

    _getProducts = () => {
        const url = 'http://34.216.203.194/apiv1/products/cellar';
        fetch(url, {
            method: 'GET',
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
        return <LayoutStockList {...this.state} />
    }
}

export default StockList