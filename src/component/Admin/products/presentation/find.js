import React from 'react'
import AdminLayout from '../../adminLayout'

const LayoutFindProduct = (props) => {

    const _renderTableBody = () => {
        const { registers } = props
        return registers.map((element, index) => {
            const {
                code,
                name,
                cost_price,
                sale_price
            } = element.product
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>{sale_price}</td>
                    <td>{cost_price}</td>
                    <td>{element.stock}</td>
                    <td>{element.product.rack.hall.cellar.name}</td>
                    <td>{element.product.rack.hall.code}</td>
                    <td>{element.product.rack.code}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-8 mx-auto">
                        <div className="bg-white p-5 rounded shadow">
                            <h1 className="font-weight-light">Buscar Productos</h1>
                            <form className={'needs-validation' + (props.submitted ? ' was-validated' : '')} noValidate onSubmit={props.handlerSubmit}>
                                <div className="row mb-4">
                                    <div className="form-group col-md-9">
                                        <input
                                            onChange={props.handlChange}
                                            value={props.search}
                                            required
                                            id="search"
                                            type="text"
                                            placeholder="Escribe CODIGO o NOMBRE del producto"
                                            className="form-control form-control-underlined" />
                                        <div className="invalid-feedback">
                                            Ingrese un nombre o codigo de producto.
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary rounded-pill btn-block shadow-sm">Buscar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Codigo</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio Venta</th>
                                <th scope="col">Precio Costo</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Nombre Bodega</th>
                                <th scope="col">Codigo Pasillo</th>
                                <th scope="col">Codigo Estanteria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _renderTableBody()
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>
                {`
                .form-control:focus {
                    box-shadow: none;
                  }
                  .form-control-underlined {
                    border-width: 0;
                    border-bottom-width: 1px;
                    border-radius: 0;
                    padding-left: 0;
                  }
                  `}
            </style>
        </>
    )
}

export default AdminLayout(LayoutFindProduct)