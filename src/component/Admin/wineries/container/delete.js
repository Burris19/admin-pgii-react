import React, { Component } from 'react';

import { _showAlert } from '../../../../helper';
import LayoutWineForm from '../presentation/form'

export class WineDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actionTitle: 'ELIMINAR',
            loadingButton: false,
            submitted: false,
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this._getRegisterById(id);
    }

    _getRegisterById = (id) => {
        const url = `http://34.216.203.194/apiv1/wineries/${id}`;
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
        const url = `http://34.216.203.194/apiv1/wineries/${id}`;
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
                    this.props.history.push('/bodegas')
                });
        }
    }

    render() {
        return <LayoutWineForm
            {...this.state}
            handlChange={this._handlerChange}
            handlerSubmit={this._handlerSubmit} />
    }
}

export default WineDelete