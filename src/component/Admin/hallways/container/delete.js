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
        this._getWineries()
        this._getRegisterById(id);
    }

    _getWineries = () => {
        const url = 'http://34.216.203.194/apiv1/wineries';
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

    _getRegisterById = (id) => {
        const url = `http://34.216.203.194/apiv1/hallways/${id}`;
        fetch(url, {
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
        const url = `http://34.216.203.194/apiv1/hallways/${id}`;
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
                    this.props.history.push('/pasillos')
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