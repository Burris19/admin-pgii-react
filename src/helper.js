import React from 'react'

import swal from '@sweetalert/with-react';

export const _isFormValid = (data) => {
    const evaluateData = Object.keys(data)
        .reduce((countErrors, currentKey) => {
            countErrors = !data[currentKey] && data[currentKey] !== 0 ? countErrors + 1 : countErrors;
            // countErrors = !data[currentKey] ? countErrors + 1 : countErrors
            return countErrors;
        }, 0);

    return evaluateData === 0 ? true : false;
}

export const _alertTitle = (id) => id === 'new' ? 'CREADO' : 'EDITADO';

export const _actionForm = (id) => id === 'new' ? 'CREAR' : 'EDITAR';

export const _isEdit = (id) => id === 'new' ? false : true;

export const _isDisabled = (actionTitle = '') => actionTitle.toLowerCase() === 'eliminar' ? true : false;

export const _classButton = (actionTitle = '') => actionTitle.toLowerCase() === 'eliminar' ? 'btn btn-danger' : 'btn btn-primary';

export const _showAlert = (title, type) => {
    const icon = type === 'ok' ? 'success' : 'error';
    return swal({
        title,
        icon,
        button: "Cerrar",
    });
};

export const _renderDefaultOptions = (label, value = "") => {
    return (
        <option value={value}>
            {label}
        </option>
    );
}

export const _renderOptions = (data = [], name = 'name') => {
    return data.map((element, index) => {
        return (
            <option key={index} value={element.id}>
                {element[name]}
            </option>
        );
    });
}