import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';

export function Modal({ children, modalClose }) {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {  
                modalClose();
            };
        };
        console.log("✔");
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            console.log("❌");
        };
    }, []);

    const handleBackdropClick = e => {
        if (e.target.id === "backdrop") {
            modalClose();
        };
    };
    return (
        <DivOverlay id={"backdrop"} onClick={handleBackdropClick}>
            <DivModal>
                {children}
            </DivModal>
        </DivOverlay>
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    modalClose: PropTypes.func
};