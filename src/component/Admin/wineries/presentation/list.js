import React from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../adminLayout'

const LayoutWineList = (props) => {

    const _renderTableBody = () => {
        const { registers } = props
        return registers.map((element, index) => {
            const {
                id,
                code,
                name,
                address,
                phone
            } = element
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{phone}</td>
                    <td>
                        <Link
                            className="btn btn-info btn-sm mr-2"
                            to={`/admin/user/${id}`}>
                            Editar
                        </Link>
                        <Link
                            className="btn btn-danger btn-sm"
                            to={`/admin/user/delete/${id}`}>
                            Eliminar
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <div className="container-left">
                <div className="row">
                    <div className="col-md-6 col-sm-6 text-left py-2">
                        <h1 className="h3">Listado de Bodegas</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 text-right py-2">
                        <Link
                            className="btn btn-primary"
                            to='/admin/user/new'>
                            Nueva Bodega
                            </Link>
                    </div>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Acciones</th>
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

export default AdminLayout(LayoutWineList)