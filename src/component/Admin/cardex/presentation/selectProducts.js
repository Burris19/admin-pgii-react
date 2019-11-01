import React from 'react'

const SelectProducts = (props) => {
    const _addRow = (data) => (
        <div className="form-group col-md-2">{data}</div>
    )

    const _checkbox = ({ id, code, name, sale_price }) => (
        <>
            <input
                onChange={props.handlChange}
                id="selectProduct"
                type="checkbox"
                name="addPermission"
                value={id} />
            <br />
            <strong>Codigo: </strong>{code} <br />
            <strong>Nombre: </strong>{name} <br />
            <strong>Precio: </strong>{sale_price} <br />
            <br />
        </>
    )

    const reduceData = props.allProductsByCellar.reduce((acc, cur, index) => {
        if (props.allProductsByCellar.length === (index + 1) || acc.temp.length >= 14) {
            acc.temp.push(_checkbox(cur));
            acc.data.push(_addRow(acc.temp));
            acc.temp = [];
        } else {
            acc.temp.push(_checkbox(cur));
        }
        return acc;
    }, {
        temp: [],
        data: []
    });

    const body = reduceData.data.map((item) => {
        return item;
    });

    return (
        <div className="card">
            <div className="card-header">
                Salida de Productos
        </div>
            <div className="card-body">
                {
                    body
                }
            </div>
        </div >
    )
}

export default SelectProducts