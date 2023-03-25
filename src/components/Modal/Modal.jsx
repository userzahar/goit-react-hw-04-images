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
    }, [showModal])
    
    const componentDidMount = () => {
        if (!showModal) {
            window.addEventListener('keydown', handleKeyDown)
            console.log("👳‍♂️")
        };
    };
    
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
    componentDidMount();
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