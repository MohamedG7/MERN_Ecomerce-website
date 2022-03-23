import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { userRequest } from '../App/Request';

const Charges = ({ country, region, phone, address }) => {
  const cart = useSelector(state => state.cart);
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useSelector((state) => state.user);


  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [paid , setPaid] = useState(false);

  const createOrder = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    await userRequest.post("/orders/", {
      userId: currentUser._id,
      phone,
      products: cart.products,
      amount: cart.quantity,
      address: {
        country,
        region,
        address
      }
    }).then((res) => {
      if (!error) {
        userRequest.post("/stripe/charge", {
          token: token.id,
          currency: "usd",
          price: cart.total*100,
        }).then((res) => {
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          setPaid(!paid);
        })
      }
    }).catch((error) => console.log("error:----->", error.message))
  };

  const handleChange = event => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

    return (
        <div>
           <form onSubmit={createOrder}>
               <CardElement onChange = {handleChange} />
               <div 
                  style = {{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "center",
                   justifyContent: "center"
                  }}
                >
                 <button style = {{
                  color: '#fff',
                  backgroundColor: '#111',
                  width: '200px',
                  borderRadius: "12px",
                  padding: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                 }} disabled = {processing || disabled || succeeded} type = "submit"><span>
                    {
                        processing ? <p> processing </p> : "BUY NOW"
                    }
                 </span></button>
                 {error && <div>{error}</div>}
                 { paid ? (<h1 style = {{
                   color: "lightgreen"
                 }}>SUCCESSED</h1>) : (<span></span>)}
               </div>
           </form>
        </div>
    )
}

export default Charges
