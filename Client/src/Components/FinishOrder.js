import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";

import { AiFillCloseCircle } from 'react-icons/ai';
import Checkout from './Checkout';

const FormContainer = styled.div`
  height: 200vh;
  width: 100.2vw;
  z-index: 1001;
  position: absolute;
  transform: translate(-74vw, -90vh);
  display: flex;
  justify-content: center;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
      center;
`;

const FormWrapper = styled.div`
  transform: translateY(70px);
`;

const FinishOrder = () => {
    const [ checkout, setCkeckout ] = useState(false);
    const [ active, setActive ] = useState(false);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if(cart.total === 0) {
            setActive(true);
        }
    }, [cart.total]);
    
    const handlePay = () => {
        setCkeckout(!checkout);
    };

    return (
        <>
            { checkout && <FormContainer>
                  <FormWrapper>
                      <AiFillCloseCircle style = {{
                          borderRightColor: "#fff",
                          height: "30px",
                          width: "30px",
                          cursor: "pointer"
                      }} onClick = {
                          handlePay
                      } />
                      <Checkout />
                  </FormWrapper>
                </FormContainer> }
            <div style = {{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <button style = {{
                    color: '#fff',
                    backgroundColor: '#111',
                    width: '200px',
                    borderRadius: "12px",
                    padding: "10px",
                    textAlign: "center",
                    cursor: "pointer"
                }} onClick = {handlePay} disabled = {active}> Checkout </button>
            </div>
        </>
    )
}

export default FinishOrder
