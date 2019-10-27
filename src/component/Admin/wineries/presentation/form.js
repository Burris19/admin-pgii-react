import React from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../adminLayout'

const LayoutWineForm = ({
    submitted,
    handlerSubmit,
    handlChange,
    actionTitle,
    name,
    code,
    phone,
    address
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
                        required />
                    <div className="invalid-feedback">
                        Nombre es requerido.
                    </div>
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="code">Codigo</label>
                    <input
                        onChange={handlChange}
                        type="text"
                        value={code}
                        className="form-control"
                        id="code"
                        required />
                    <div className="invalid-feedback">
                        Codigo es requerido.
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="phone">Telefono</label>
                    <input
                        onChange={handlChange}
                        type="number"
                        value={phone}
                        className="form-control"
                        id="phone"
                        required />
                    <div className="invalid-feedback">
                        Telefono es requerido.
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="address">Direccion</label>
                    <input
                        onChange={handlChange}
                        type="text"
                        value={address}
                        className="form-control"
                        id="address"
                        required />
                    <div className="invalid-feedback">
                        Direccion es requerida.
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">{actionTitle} Bodega</button>
        </form>
    )

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6 col-sm-6 text-left py-2">
                        <h1 className="h3">{actionTitle} Bodega</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 text-right py-2">
                        <Link
                            className="btn btn-primary"
                            to="/bodegas">
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

export default AdminLayout(LayoutWineForm)