import React from 'react';
import cl from './MainModal.css';

const MainModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.mainModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.mainModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MainModal;