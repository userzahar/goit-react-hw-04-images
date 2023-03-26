import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';

export function Modal({children,modalClose}) {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (showModal) {
            console.log("🤶");
            window.removeEventListener('keydown', handleKeyDown)
            setShowModal(false);
        };
        if (!showModal) {
            window.addEventListener('keydown', handleKeyDown)
            console.log("👳‍♂️")
        };
    }, [showModal])
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            setShowModal(true);   
            modalClose();
        };
    };

    const handleBackdropClick = e => {
        if (e.target.id === "backdrop") {
            setShowModal(true)
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
        modalClose:PropTypes.func
    };