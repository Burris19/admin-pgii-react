import React, { Component } from 'react';

import { _showAlert } from '../../../../helper';
import LayoutCellarForm from '../presentation/form'

export class CellarDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hallways: [],
            actionTitle: 'ELIMINAR',
            loadingButton: false,
            submitted: false,
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this._getRegisterById(id)
            .then(() => this._getWineries())
            .then(() => this._setWineries())
    }

    _setWineries = () => {
        const { allHallways, hall_id } = this.state
        const findWine = allHallways.reduce((accumulator, currentValue) => {
            const wine = currentValue.find(({ id }) => id === parseInt(hall_id));
            if (wine) {
                accumulator.push(wine)
            }
            return accumulator
        }, [])

        if (findWine.length > 0) {
            this.setState({
                cellar_id: findWine[0]['idWineries']
            })
            this._fillHallways(findWine[0]['idWineries'])
        }
    }

    _getRegisterById = (id) => {
        const url = `http://34.216.203.194/apiv1/shelves/${id}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                this.setState({ ...data });
            });
    }

    _getWineries = () => {
        const url = 'http://34.216.203.194/apiv1/wineries';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                const { data = [] } = response
                const wineries = data.map(({ id, name }) => ({ id, name }))
                const allHallways = data.map(shelves => {
                    const { hallways = [] } = shelves
                    const data = hallways.map(({ id, code }) => {
                        const data = {
                            idWineries: shelves.id,
                            id,
                            code
                        }
                        return data
                    })
                    return data
                })
                this.setState({ wineries, allHallways });
            });
    }

    _fillHallways = (id) => {
        const { allHallways } = this.state
        const hallways = allHallways.filter((element) => {
            const findHallway = element.filter(({ idWineries }) => idWineries === parseInt(id))
            return findHallway.length > 0 ? true : false
        })
        const newHallways = hallways.length > 0 ? hallways[0] : []
        this.setState({
            hallways: newHallways
        })
    }

    _handlerSubmit = (e) => {
        e.preventDefault()
        this.setState({
            submitted: true,
            loadingButton: true
        })
        const { id } = this.props.match.params;
        this._deleteRegister(id);
    }

    _deleteRegister(id) {
        const url = `http://34.216.203.194/apiv1/shelves/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => this._showMessages(response));
    }

    _showMessages = (response) => {
        this.setState({ loadingButton: false });
        if (response === null || response.error) {
            const title = `Whoops!: No se pudo ELIMINAR el Registro`;
            _showAlert(title, 'error');
        } else {
            const title = `Registro ELIMINADO correctamente!`;
            _showAlert(title, 'ok')
                .then(() => {
                    this.props.history.push('/estanterias')
                });
        }
    }

    render() {
        return <LayoutCellarForm
            {...this.state}
            handlChange={this._handlerChange}
            handlerSubmit={this._handlerSubmit} />
    }
}

export default CellarDelete