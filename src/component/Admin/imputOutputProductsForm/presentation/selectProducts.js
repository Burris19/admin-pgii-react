import React from 'react'

const SelectProducts = (props) => {
    const _addRow = (data) => (
        <div className="form-group col-md-2">{data}</div>
    )

    const _checkbox = ({ id, code, name, sale_price, description }) => (
        <>
            <div class="card" style={{ width: '18rem', textAlign: 'left' }}>
                <div class="card-body">
                    <p class="card-title"><strong>Codigo: </strong>{code}</p>
                    <p class="card-title"><strong>Nombre: </strong> {name}</p>
                    <p class="card-title"><strong>Precio:</strong> {sale_price}</p>
                    <p class="card-text"><strong>Descripcion:</strong> {description}</p>
                    <input
                        style={{
                            marginLeft: '50px',
                            paddingLeft: '50px'
                        }}
                        onChange={props.handlChange}
                        id="selectProduct"
                        type="checkbox"
                        name="addPermission"
                        value={id} />
                </div>
            </div>
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
                Seleccionar Productos
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