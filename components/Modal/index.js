import React, { useRef } from 'react';
import styled from 'styled-components';

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

const Div = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    min-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Modal = ({children, showModal, closeModal}) => {
    const ref = useRef(null);
    const clickOnBaseModal = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      closeModal();
    }
    if(!showModal) return null;
    return (
        
        <BaseModal
            onClick={clickOnBaseModal}
        >
            <Div
                ref={ref}
            >
              <button onClick={closeModal}>X</button>
              {children}
            </Div>
        </BaseModal>
    );
};

export default Modal;