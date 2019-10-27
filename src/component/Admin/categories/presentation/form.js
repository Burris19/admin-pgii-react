import React from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../adminLayout'

import LoadingButton from '../../../shares/loading-button';
import {
    _isDisabled,
    _classButton
} from '../../../../helper';

const LayoutCategoryForm = ({
    loadingButton,
    submitted,
    handlerSubmit,
    handlChange,
    actionTitle,
    name
}) => {

    const _renderForm = () => (
        <form className={'needs-validation' + (submitted ? ' was-validated' : '')} noValidate onSubmit={handlerSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="name">Nombre</label>
                    <input
                        onChange={handlChange}
                        type="text"
                        value={name}
                        className="form-control"
                        id="name"
                        required
                        disabled={_isDisabled(actionTitle)} />
                    <div className="invalid-feedback">
                        Nombre es requerido.
                    </div>
                </div>
            </div>
            {
                loadingButton ?
                    <LoadingButton
                        classButton={_classButton(actionTitle)} /> :
                    <button className={_classButton(actionTitle)}>{actionTitle} Categoria</button>
            }
        </form>
    )

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 col-sm-6 text-left py-2">
                        <h1 className="h3">{actionTitle} Categoria</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 text-right py-2">
                        <Link
                            className="btn btn-primary"
                            to="/categorias">
                            Regresar
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {_renderForm()}
            </div>
        </div>
    )
}

export default AdminLayout(LayoutCategoryForm)