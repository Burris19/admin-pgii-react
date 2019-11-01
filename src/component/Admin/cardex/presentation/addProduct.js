import React from 'react'

import {
    _renderDefaultOptions,
    _renderOptions
} from '../../../../helper';

const AddProduct = (props) => {
    return (

        <div className="card">
            <div className="card-header">
                Ingreso de Producto
            </div>
            <div className="card-body">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="idProductEntrada">Selecciona un producto</label>
                        <select
                            id="idProductEntrada"
                            value={props.idProductEntrada}
                            onChange={props.handlChange}
                            className="form-control"
                            required>
                            {_renderDefaultOptions('Seleccione una opcion')}
                            {_renderDefaultOptions('Nuevo Producto', 'newProduct')}
                            {_renderOptions(props.products)}
                        </select>
                        <div className="invalid-feedback">
                            Debe Seleccionar una opcion.
                </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="codeProductEntrada">Codigo de Producto</label>
                        <input
                            onChange={props.handlChange}
                            type="text"
                            value={props.codeProductEntrada}
                            className="form-control"
                            id="codeProductEntrada"
                            required />
                        <div className="invalid-feedback">
                            Codigo es requerido.
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="descriptionProductEntrada">Descripcion</label>
                        <input
                            onChange={props.handlChange}
                            type="text"
                            value={props.descriptionProductEntrada}
                            className="form-control"
                            id="descriptionProductEntrada"
                            required />
                        <div className="invalid-feedback">
                            Descripcion es requerida.
                    </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="costProducEntrada">Precio</label>
                        <input
                            onChange={props.handlChange}
                            type="number"
                            value={props.costProducEntrada}
                            className="form-control"
                            id="costProducEntrada"
                            required />
                        <div className="invalid-feedback">
                            Descripcion es requerida.
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="idCategoryEntrada">Selecciona un producto</label>
                        <select
                            id="idCategoryEntrada"
                            value={props.idCategoryEntrada}
                            onChange={props.handlChange}
                            className="form-control"
                            required>
                            {_renderDefaultOptions('Seleccione una categoria')}
                            {_renderOptions(props.allCategories)}
                        </select>
                        <div className="invalid-feedback">
                            Debe Seleccionar una categoria.
                    </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="amountProduct">Cantidad a Registrar</label>
                        <input
                            onChange={props.handlChange}
                            type="text"
                            value={props.amountProduct}
                            className="form-control"
                            id="amountProduct"
                            required />
                        <div className="invalid-feedback">
                            Cantidad es requerida.
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct