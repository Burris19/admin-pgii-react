import React, { Component } from 'react';

import {
    _actionForm,
    _alertTitle,
    _isEdit,
    _isFormValid,
    _showAlert,
} from '../../../../helper';

import LayoutWineForm from '../presentation/form'

export class WineForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            name: '',
            address: '',
            phone: '',
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
            this._getRegisterById(id);
        }
    }

    _handlerChange = (e) => {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    _getRegisterById = (id) => {
        const url = `http://pgii.test/apiv1/wineries/${id}`;
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
        this.setState({ submitted: true })
        const {
            code,
            name,
            address,
            phone,
            isEdit
        } = this.state
        const data = {
            code,
            name,
            address,
            phone
        }
        if (_isFormValid(data)) {
            if (isEdit) {
                const { id } = this.props.match.params;
                this._editRegister(data, id);
            } else {
                this._saveRegiser(data);
            }
        }
    }

    _saveRegiser(data) {
        const url = 'http://pgii.test/apiv1/wineries';
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
        const url = `http://pgii.test/apiv1/wineries/${register_id}`;
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

export default WineForm