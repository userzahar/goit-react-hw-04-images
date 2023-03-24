import PropTypes from 'prop-types';
import { DivOverlay, DivModal } from './Modal.styled';

export function Modal({children,modalClose}) {

    const componentDidMount=()=> {
        window.addEventListener('keydown', handleKeyDown);
        console.log("ok")
    };
    
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            modalClose();
            window.removeEventListener('keydown', handleKeyDown);
        };
    };

    const handleBackdropClick = e => {
        if(e.target.id === "backdrop") {
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