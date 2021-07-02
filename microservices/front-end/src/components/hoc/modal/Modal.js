import React, { useRef, useEffect, useCallback } from 'react';
// import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import './Modal.css'
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow:auto;
`;

const ModalWrapper = styled.div`
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    position: relative;
    border-radius: 10px;
    padding: 10px;
`;


const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    margin-top: 10px;
    div {
        margin-bottom: 3px;
    }
`;

export const Modal = ({setShowModal,showModal,message,history}) => {
    const modalRef = useRef();

    //   const animation = useSpring({
    //     config: {
    //       duration: 250
    //     },
    //     opacity: showModal ? 1 : 0,
    //     transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    //   });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    const AuthHandler= signin =>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('loggedUsername');
        (signin) ? history.push('/signin') : history.push('/signup')
    }

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    {/* <animated.div style={animation}> */}
                    <ModalWrapper showModal={showModal}>
                        <div
                            className='gg-close'
                            onClick={() => setShowModal(prev => !prev)}
                        />
                        <ModalContent>
                            <div>{message}</div>
                            <div>Either you are not logged in or your session has expired.</div>
                            <div>
                                Please {" "}
                                <bdi className = 'question-item-username-link' onClick={()=>AuthHandler(1)}>Sign In</bdi>
                                {" "} 
                                / 
                                {" "}
                                <bdi className = 'question-item-username-link' onClick={()=>AuthHandler(0)} > Sign Up </bdi>
                            </div>
                        </ModalContent>

                    </ModalWrapper>
                    {/* </animated.div> */}
                </Background>
            ) : null}
        </>
    );
};