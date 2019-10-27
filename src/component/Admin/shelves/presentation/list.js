import React from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../adminLayout'

const LayoutRackList = (props) => {

    const _renderTableBody = () => {
        const { registers } = props
        return registers.map((element, index) => {
            const {
                id,
                code,
                description,
                hall
            } = element

            const codeHall = hall && hall.code ? hall.code : ''
            const nameCellar = hall && hall.cellar ? hall.cellar.name : ''

            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{code}</td>
                    <td>{description}</td>
                    <td>{codeHall}</td>
                    <td>{nameCellar}</td>
                    <td>
                        <Link
                            className="btn btn-info btn-sm mr-2"
                            to={`/estanterias/${id}`}>
                            Editar
                        </Link>
                        <Link
                            className="btn btn-danger btn-sm"
                            to={`/estanterias/delete/${id}`}>
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
                        <h1 className="h3">Listado de Estanterias</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 text-right py-2">
                        <Link
                            className="btn btn-primary"
                            to='/estanterias/new'>
                            Nueva Estanteria
                            </Link>
                    </div>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">description</th>
                        <th scope="col">Codigo Pasillo</th>
                        <th scope="col">Bodega</th>
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

export default AdminLayout(LayoutRackList)