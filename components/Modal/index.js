import React, { useRef } from 'react';
import styled from 'styled-components';
import { Div, CloseButton } from '../../styledComps';


const ModalWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    borde-radius: 10px;
    padding: 0 0 0 10px;
    min-width: 50%;
    max-height: 50%
    justify-content: center;
    align-items: center;
    z-index: 2;
`;


const Modal = ({children, showModal, closeModal}) => {
    const ref = useRef(null);

    const clickOnmodalWrapper = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      closeModal();
    };

    if(!showModal) return null;

    return (
        
        <ModalWrapper
            onClick={clickOnmodalWrapper}
        >
            <ModalBody
                ref={ref}
            >
                <Div w="100%" just="flex-end" mgR="20px">
                    <CloseButton pad="5px" onClick={closeModal}>+</CloseButton>
                </Div>
              {children}
            </ModalBody>
        </ModalWrapper>
    );
};

export default Modal;