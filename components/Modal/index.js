import React, { useRef } from 'react';
import styled from 'styled-components';
import { Div, CloseButton } from '../../styledComps';


const BaseModal = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = ({children, showModal, closeModal}) => {
    const ref = useRef(null);

    const clickOnBaseModal = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      closeModal();
    };

    if(!showModal) return null;

    return (
        
        <BaseModal
            onClick={clickOnBaseModal}
        >
            <Div  maxH="90%" col back="white" borderR="10px" pad="0 0 0 10px" minW="50%" just="center" align="center"
                ref={ref}
            >
                <Div w="100%" just="flex-end" mgR="20px">
                    <CloseButton pad="5px" onClick={closeModal}>+</CloseButton>
                </Div>
              {children}
            </Div>
        </BaseModal>
    );
};

export default Modal;