import React from 'react'
import AdminLayout from '../../adminLayout'

const LayoutStockList = (props) => {

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
        <div>
            <div className="container-left">
                <div className="row">
                    <div className="col-md-6 col-sm-6 text-left py-2">
                        <h1 className="h3">Listado de Productos</h1>
                    </div>
                </div>
            </div>

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
    )
}

export default AdminLayout(LayoutStockList)