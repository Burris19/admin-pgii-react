import React from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../adminLayout'

import LoadingButton from '../../../shares/loading-button';
import {
    _isDisabled,
    _classButton
} from '../../../../helper';

const LayoutRackForm = ({
    loadingButton,
    submitted,
    handlerSubmit,
    handlChange,
    actionTitle,
    code,
    description,
    cellar_id,
    hall_id,
    wineries,
    hallways
}) => {

    const _renderDefaultOptions = (label) => {
        return (
            <option value="">
                {label}
            </option>
        );
    }

    const _renderOptions = (data = [], nameKey = 'name') => {
        return data.map((element, index) => {
            return (
                <option key={index} value={element.id}>
                    {element[nameKey]}
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
                        {_renderOptions(wineries)}
                    </select>
                    <div className="invalid-feedback">
                        Debe Seleccionar una bodega.
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="hall_id">Selecciona un Pasillo</label>
                    <select
                        id="hall_id"
                        value={hall_id}
                        onChange={handlChange}
                        className="form-control"
                        required
                        disabled={_isDisabled(actionTitle)}>
                        {_renderDefaultOptions('Seleccionar un pasillo')}
                        {_renderOptions(hallways, 'code')}
                    </select>
                    <div className="invalid-feedback">
                        Debe Seleccionar un pasillo.
                    </div>
                </div>
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
                    <button className={_classButton(actionTitle)}>{actionTitle} Estanteria</button>
            }
        </form>
    )

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 col-sm-6 text-left py-2">
                        <h1 className="h3">{actionTitle} Estanteria</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 text-right py-2">
                        <Link
                            className="btn btn-primary"
                            to="/estanterias">
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

export default AdminLayout(LayoutRackForm)