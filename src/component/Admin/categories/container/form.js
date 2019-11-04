import React, { Component } from 'react';

import {
    _actionForm,
    _alertTitle,
    _isEdit,
    _isFormValid,
    _showAlert,
} from '../../../../helper';

import LayoutWineForm from '../presentation/form'

export class CategoryForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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
        const url = `http://34.216.203.194/apiv1/categories/${id}`;
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
            name,
            isEdit
        } = this.state
        const data = {
            name
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
        const url = 'http://34.216.203.194/apiv1/categories';
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
        const url = `http://34.216.203.194/apiv1/categories/${register_id}`;
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
                    this.props.history.push('/categorias')
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

export default CategoryForm