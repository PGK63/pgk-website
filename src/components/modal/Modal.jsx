import React from 'react';
import './Modal.css';
import BaseButton from "../BaseButton";

const Modal = ({ handleClose, show, children, showButtonClose = true}) => {
    return (
        <>
            {show && (
                <div className={"modal display-block"}>
                    <section className="modal-main" onClick={() => {}}>
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
            )}
        </>
    );
};

export default Modal;