import React from 'react';

const LoadingButton = ({ classButton, style = {} }) => {
    return (
        <button className={classButton} style={style} disabled>
            <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true">
            </span> Procesando Solicitud...
        </button>
    );
};

export default LoadingButton;
