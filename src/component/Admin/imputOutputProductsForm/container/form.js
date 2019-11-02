import React, { Component } from 'react';
import LayoutCardexForm from '../presentation/form'

import {
    _isFormValid,
    _showAlert
} from '../../../../helper'
export class CardexForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameProductEntrada: '',
            amountProduct: '',
            idCategoryEntrada: '',
            idProductEntrada: '',
            codeProductEntrada: '',
            descriptionProductEntrada: 'Nuevo Producto',
            priceProducEntrada: '',
            priceSaleEntrada: '',
            showCellarFrom: false,
            cellar_to_id: '',
            cellar_from_id: '',
            action: '',
            type: '',
            actions: [
                {
                    id: 'ENTRADA',
                    name: 'Ingreso de Productos'
                },
                {
                    id: 'SALIDA',
                    name: 'Salida de Productos'
                }
            ],
            types: [
                {
                    id: 'BODEGA',
                    name: 'Movimiento entre Bodegas'
                },
                {
                    id: 'DEVOLUCION',
                    name: 'Por Devolucion'
                },
                {
                    id: 'MUESTRA',
                    name: 'Por Muestra'
                },
                {
                    id: 'PROVEEDOR',
                    name: 'Por Proveedor'
                }
            ],
            hallways: [],
            allProductsByCellar: [],
            allProducts: [],
            allCategories: [],
            selectedProducts: [],
            loadingButton: false,
            submitted: false,
            allRackByHallFromId: [],
            allHallByCellarFromId: [],
            idHallSelected: '',
            idRackSelected: ''
        }
    }

    componentDidMount() {
        this._getData()
    }

    _getData = () => {
        this._getWineries()
        this._getAllProducts()
        this._getAllCategories()
    }

    _getAllRackByHallFromId = (id) => {
        const url = `http://pgii.test/apiv1/shelves/hall/${id}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                const allRackByHallFromId = data.map(({ id, code }) => ({ id, code }))
                this.setState({ allRackByHallFromId });
            });
    }

    _getAllHallByCellarFromId = (id) => {
        const url = `http://pgii.test/apiv1/hallways/cellar/${id}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                const allHallByCellarFromId = data.map(({ id, code }) => ({ id, code }))
                this.setState({ allHallByCellarFromId });
            });
    }

    _getAllCategories = () => {
        const url = 'http://pgii.test/apiv1/categories';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                const allCategories = data.map(({ id, name }) => ({ id, name }))
                this.setState({ allCategories });
            });
    }

    _getWineries = () => {
        const url = 'http://pgii.test/apiv1/wineries';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                const hallways = data.map(({ id, name }) => ({ id, name }))
                this.setState({ hallways });
            });
    }

    _getAllProducts = () => {
        const url = 'http://pgii.test/apiv1/products';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                this.setState({
                    allProducts: data
                })
            });
    }

    _getProductsByCellar = (idCellar) => {
        const url = `http://pgii.test/apiv1/products/cellar/${idCellar}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                this.setState({
                    allProductsByCellar: data
                })
            });
    }

    _handlerChange = (e) => {
        const { id, value } = e.target;

        this.setState({
            [id]: value
        });

        if (id === 'type') {
            let setShowCellarFrom = false
            if (value === 'BODEGA') {
                setShowCellarFrom = true
            }
            this.setState({
                showCellarFrom: setShowCellarFrom
            })
        }

        if (id === 'cellar_to_id') {
            this._getProductsByCellar(value)
        }

        if (id === 'selectProduct') {
            const { selectedProducts } = this.state;
            let newSelectedProducts = selectedProducts
            newSelectedProducts.push(value)
            this.setState({
                selectedProducts: newSelectedProducts
            })
        }

        if (id === 'cellar_from_id') {
            this._getAllHallByCellarFromId(value)
        }

        if (id === 'idHallSelected') {
            this._getAllRackByHallFromId(value)
        }

        if (id === 'idProductEntrada') {
            if (value !== 'newProduct' && value !== 'empty') {
                const findProduct = this.state.allProducts.filter(({ id }) => id === parseInt(value))

                if (findProduct.length > 0) {
                    const product = findProduct[0];
                    this.setState({
                        codeProductEntrada: product.code,
                        idCategoryEntrada: product.category_id,
                        nameProductEntrada: product.name,
                        priceProducEntrada: product.cost_price,
                        priceSaleEntrada: product.sale_price

                    })
                } else {
                    this.setState({
                        codeProductEntrada: '',
                        priceProducEntrada: '',
                        priceSaleEntrada: '',
                        idCategoryEntrada: '',
                        nameProductEntrada: ''
                    })
                }
            }
        }

    }

    _handlerSubmit = (e) => {
        e.preventDefault()
        this.setState({ submitted: true })

        const {
            action,
            type,
            cellar_to_id,
            cellar_from_id,
            selectedProducts,
            idRackSelected
        } = this.state

        let data = {
            action,
            type,
            cellar_to_id
        }

        if (action === 'SALIDA' && type !== 'BODEGA') {
            //Salida de productos pero no entre bodegas 
            data['products'] = selectedProducts
            if (_isFormValid(data) && selectedProducts.length > 0) {
                this.setState({
                    loadingButton: true
                })
                this._sendTranssaction(data)
                    .then(response => this._showMessages(response));
            }
        }

        if (type === 'BODEGA') {
            //Salida de productos entre bodegas 
            data['products'] = selectedProducts
            data['cellar_from_id'] = cellar_from_id
            data['rack_id'] = idRackSelected
            if (_isFormValid(data) && selectedProducts.length > 0 && (cellar_from_id !== cellar_to_id)) {
                this.setState({
                    loadingButton: true
                })
                this._sendTranssaction(data)
                    .then(response => this._showMessages(response));
            }
        }

        if (action === 'ENTRADA' && type !== 'BODEGA') {
            const {
                codeProductEntrada,
                priceProducEntrada,
                priceSaleEntrada,
                idCategoryEntrada,
                nameProductEntrada,
                amountProduct
            } = this.state

            const product = {
                code: codeProductEntrada,
                description: 'Nuevo Producto',
                cost_price: priceProducEntrada,
                sale_price: priceSaleEntrada,
                category_id: idCategoryEntrada,
                name: nameProductEntrada,
            }

            data['amountProduct'] = amountProduct
            data['products'] = [product]
            data['rack_id'] = idRackSelected
            data['cellar_to_id'] = cellar_from_id

            if (_isFormValid(data)) {
                this.setState({
                    loadingButton: true
                })
                this._sendTranssaction(data)
                    .then(response => this._showMessages(response));
            }

        }
    }

    _sendTranssaction = (data) => {
        const url = 'http://pgii.test/apiv1/cardex/product';
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }

    _showMessages = (response) => {
        this.setState({ loadingButton: false });
        if (response.code !== 201) {
            const title = `Whoops!: No se pudo COMPLETAR la transaccion`;
            _showAlert(title, 'error');
        } else {
            const title = `Transaccion COMPLETADA correctamente!`;
            _showAlert(title, 'ok')
                .then(() => {
                    this._clearInputs()
                });
        }
    }

    _clearInputs = () => {
        this.setState({
            priceProducEntrada: '',
            priceSaleEntrada: '',
            nameProductEntrada: '',
            amountProduct: '',
            idCategoryEntrada: '',
            idProductEntrada: '',
            codeProductEntrada: '',
            descriptionProductEntrada: '',
            costProducEntrada: '',
            showCellarFrom: false,
            cellar_to_id: '',
            cellar_from_id: '',
            action: '',
            type: '',
            hallways: [],
            allProductsByCellar: [],
            allProducts: [],
            allCategories: [],
            selectedProducts: [],
            loadingButton: false,
            submitted: false,
        })
        this._getData();
    }

    render() {
        return <LayoutCardexForm
            {...this.state}
            handlChange={this._handlerChange}
            handlerSubmit={this._handlerSubmit} />
    }
}

export default CardexForm