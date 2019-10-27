import React from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../adminLayout'

import LoadingButton from '../../../shares/loading-button';
import {
    _isDisabled,
    _classButton
} from '../../../../helper';

const LayoutCellarForm = ({
    loadingButton,
    submitted,
    handlerSubmit,
    handlChange,
    actionTitle,
    code,
    description,
    cellar_id,
    hallways
}) => {

    const _renderDefaultOptions = (label) => {
        return (
            <option value="">
                {label}
            </option>
        );
    }

    const _renderOptions = (data = []) => {
        return data.map((element, index) => {
            return (
                <option key={index} value={element.id}>
                    {element.name}
                </option>
            );
        });
    }

    const _renderForm = () => (
        <form className={'needs-validation' + (submitted ? ' was-validated' : '')} noValidate onSubmit={handlerSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="code">Codigo</label>
                    <input
                        onChange={handlChange}
                        type="text"
                        value={code}
                        className="form-control"
                        id="code"
                        required
                        disabled={_isDisabled(actionTitle)} />
                    <div className="invalid-feedback">
                        Codigo es requerido.
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="cellar_id">Selecciona una Bodega</label>
                    <select
                        id="cellar_id"
                        value={cellar_id}
                        onChange={handlChange}
                        className="form-control"
                        required
                        disabled={_isDisabled(actionTitle)}>
                        {_renderDefaultOptions('Seleccionar bodega')}
                        {_renderOptions(hallways)}
                    </select>
                    <div className="invalid-feedback">
                        Debe Seleccionar una bodega.
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="description">Descripcion</label>
                    <textarea
                        disabled={_isDisabled(actionTitle)}
                        required
                        id="description"
                        className="form-control"
                        name="description"
                        onChange={handlChange}
                        value={description}
                        rows="3"
                        cols="50">
                    </textarea>
                    <div className="invalid-feedback">
                        Descripcion es requerida.
                    </div>
                </div>
            </div>
            {
                loadingButton ?
                    <LoadingButton
                        classButton={_classButton(actionTitle)} /> :
                    <button className={_classButton(actionTitle)}>{actionTitle} Pasillo</button>
            }
        </form>
    )

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 col-sm-6 text-left py-2">
                        <h1 className="h3">{actionTitle} Pasillo</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 text-right py-2">
                        <Link
                            className="btn btn-primary"
                            to="/pasillos">
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

export default AdminLayout(LayoutCellarForm)