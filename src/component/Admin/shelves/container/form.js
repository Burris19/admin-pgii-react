import React, { Component } from 'react';

import {
    _actionForm,
    _alertTitle,
    _isEdit,
    _isFormValid,
    _showAlert,
} from '../../../../helper';

import LayoutRackForm from '../presentation/form'

export class RackForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            description: '',
            cellar_id: '',
            hall_id: '',
            wineries: [],
            hallways: [],
            allHallways: [],
            alertTitle: _alertTitle(this.props.match.params.id),
            isEdit: _isEdit(this.props.match.params.id),
            actionTitle: _actionForm(this.props.match.params.id),
            loadingButton: false,
            submitted: false,
        }
    }

    componentDidMount() {
        const { isEdit } = this.state;
        const { id } = this.props.match.params;
        if (isEdit) {
            this._getRegisterById(id)
                .then(() => this._getWineries())
                .then(() => this._setWineries())
        } else {
            this._getWineries()
        }
    }

    _getWineries = () => {
        const url = 'http://pgii.test/apiv1/wineries';
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

    _handlerChange = (e) => {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });

        if (id === 'cellar_id') {
            this._fillHallways(value)
            this.setState({
                hall_id: ''
            })
        }
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

    _getRegisterById = (id) => {
        const url = `http://pgii.test/apiv1/shelves/${id}`;
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

    _handlerSubmit = (e) => {
        e.preventDefault()
        this.setState({ submitted: true })
        const {
            code,
            description,
            hall_id,
            isEdit
        } = this.state
        const data = {
            code,
            description,
            hall_id
        }
        if (_isFormValid(data)) {
            this.setState({ loadingButton: true })
            if (isEdit) {
                const { id } = this.props.match.params;
                this._editRegister(data, id);
            } else {
                this._saveRegiser(data);
            }
        }
    }

    _saveRegiser(data) {
        const url = 'http://pgii.test/apiv1/shelves';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => this._showMessages(response));
    }

    _editRegister(data, register_id) {
        const url = `http://pgii.test/apiv1/shelves/${register_id}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => this._showMessages(response));
    }

    _showMessages = (response, isDelete = false) => {
        this.setState({ loadingButton: false });
        const {
            alertTitle,
            actionTitle
        } = this.state;

        const errorTitle = isDelete ? 'ELIMINAR' : actionTitle;
        const successTitle = isDelete ? 'ELIMINADO' : alertTitle;

        if (response === null || response.error) {
            const title = `Whoops!: No se pudo ${errorTitle} el Registro`;
            _showAlert(title, 'error');
        } else {
            const title = `Registro ${successTitle} correctamente!`;
            _showAlert(title, 'ok')
                .then(() => {
                    this.props.history.push('/estanterias')
                });
        }
    }

    render() {
        return <LayoutRackForm
            {...this.state}
            handlChange={this._handlerChange}
            handlerSubmit={this._handlerSubmit} />
    }
}

export default RackForm