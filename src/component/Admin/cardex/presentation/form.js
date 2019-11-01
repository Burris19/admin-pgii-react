import React from 'react'
import AdminLayout from '../../adminLayout'

import LoadingButton from '../../../shares/loading-button';
import {
    _classButton,
    _renderDefaultOptions,
    _renderOptions
} from '../../../../helper';

import AddProduct from './addProduct'
import SelectProducts from './selectProducts'

const LayoutCardexForm = (prop) => {

    const _templateError = (text) => {
        return (
            <div className="alert alert-danger" role="alert">
                {text}
            </div>
        )
    }

    const _showErrors = () => {
        const {
            cellar_to_id,
            allProductsByCellar,
            cellar_from_id
        } = prop
        if (parseInt(cellar_to_id) > 0 && allProductsByCellar.length === 0) {
            return _templateError('La Bodega de ORIGEN seleccionada no posee productos')
        }

        if (parseInt(cellar_to_id) === parseInt(cellar_from_id)) {
            return _templateError('Debe seleccionar una bodega diferente a la de ORIGEN')
        }
    }


    const _renderForm = () => (
        <form
            className={'needs-validation' + (prop.submitted ? ' was-validated' : '')}
            noValidate
            onSubmit={prop.handlerSubmit}>
            {
                _showErrors()
            }
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="action">Que desea hacer ?</label>
                    <select
                        id="action"
                        value={prop.action}
                        onChange={prop.handlChange}
                        className="form-control"
                        required>
                        {_renderDefaultOptions('Seleccionar Accion')}
                        {_renderOptions(prop.actions)}
                    </select>
                    <div className="invalid-feedback">
                        Debe Seleccionar una opcion.
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="type">Motivo de la accion ?</label>
                    <select
                        id="type"
                        value={prop.type}
                        onChange={prop.handlChange}
                        className="form-control"
                        required>
                        {_renderDefaultOptions('Seleccionar Tipo')}
                        {_renderOptions(prop.types)}
                    </select>
                    <div className="invalid-feedback">
                        Debe Seleccionar una opcion.
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="cellar_to_id">Selecione la Bodega de Origen</label>
                    <select
                        id="cellar_to_id"
                        value={prop.cellar_to_id}
                        onChange={prop.handlChange}
                        className="form-control"
                        required>
                        {_renderDefaultOptions('Seleccionar bodega')}
                        {_renderOptions(prop.hallways)}
                    </select>
                    <div className="invalid-feedback">
                        Debe Seleccionar una bodega.
                    </div>
                </div>
                {
                    prop.showCellarFrom ? (
                        <div className="form-group col-md-6">
                            <label htmlFor="cellar_from_id">Seleccione la bodega de Destino</label>
                            <select
                                id="cellar_from_id"
                                value={prop.cellar_from_id}
                                onChange={prop.handlChange}
                                className="form-control"
                                required>
                                {_renderDefaultOptions('Seleccionar bodega')}
                                {_renderOptions(prop.hallways)}
                            </select>
                            <div className="invalid-feedback">
                                Debe Seleccionar una bodega.
                        </div>
                        </div>
                    ) :
                        null
                }
            </div>

            {
                prop.type === 'BODEGA' && prop.action === 'SALIDA' ?
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="idHallSelected">Seleccionar Pasillo en la Bodega de destino</label>
                            <select
                                id="idHallSelected"
                                value={prop.idHallSelected}
                                onChange={prop.handlChange}
                                className="form-control"
                                required>
                                {_renderDefaultOptions('Seleccione una opcion')}
                                {_renderOptions(prop.allHallByCellarFromId, 'code')}
                            </select>
                            <div className="invalid-feedback">
                                Debe Seleccionar una opcion.
                     </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="idRackSelected">Seleccionar Estanteria en la Bodega de destino</label>
                            <select
                                id="idRackSelected"
                                value={prop.idRackSelected}
                                onChange={prop.handlChange}
                                className="form-control"
                                required>
                                {_renderDefaultOptions('Seleccionar una opcion')}
                                {_renderOptions(prop.allRackByHallFromId, 'code')}
                            </select>
                            <div className="invalid-feedback">
                                Debe Seleccionar una opcion.
                        </div>
                        </div>
                    </div> :
                    null
            }

            {
                prop.type === 'BODEGA' || prop.action === 'SALIDA' ?
                    <SelectProducts
                        {...prop} /> :
                    null
            }
            {
                prop.type !== 'BODEGA' && prop.action === 'ENTRADA' ?
                    <AddProduct
                        {...prop} /> :
                    null
            }
            <br />
            <br />
            {
                prop.loadingButton ?
                    <LoadingButton
                        classButton={_classButton(prop.actionTitle)} /> :
                    <button className={_classButton(prop.actionTitle)}>Realizar Transaccion</button>
            }

        </form>
    )

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 col-sm-6 text-left py-2">
                        <h1 className="h3">Entradas/Salidas</h1>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {_renderForm()}
            </div>
        </div>
    )
}

export default AdminLayout(LayoutCardexForm)