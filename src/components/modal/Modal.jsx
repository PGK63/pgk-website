import React from 'react';
import './Modal.css';
import BaseButton from "../BaseButton";

const Modal = ({ handleClose, show, children }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName} onClick={handleClose}>
            <section className="modal-main">
                {children}

                <div style={{
                    width: "100%",
                    alignContent: "center",
                    justifyContent: "center",
                    display: "flex",
                    marginTop: "40px"
                }}>
                    <BaseButton onClick={handleClose}>
                        Закрыть
                    </BaseButton>
                </div>
            </section>
        </div>
    );
};

export default Modal;