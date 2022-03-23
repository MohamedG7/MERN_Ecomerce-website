import React from 'react';
import Home from '../Pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Cart from '../Pages/Cart';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Product from '../Pages/Product';
import ForgotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';
import ProducyList from '../Pages/ProductList';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from "react-redux";


const promise = loadStripe("pk_test_51JQKA1FVshOTkhC97ZXUNFcvOv1LuJgH0O5YaWo8rgNmTfE65Z5dvcJel1pvdsFBlxV1WPrEf2i0sFcrE2saRj4Q000bmXUYxD");

const EComm = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <div>
            <Router>
               <Switch>
                  <Route path = "/cart">
                    <Elements stripe = {promise}>
                       <Cart />
                    </Elements>
                  </Route>
                  <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
                  <Route path = "/register">{user ? <Redirect to="/" /> : <Register />}</Route>
                  <Route path = "/products/:category" component = {ProducyList} />
                  <Route path = "/product/:id" component = {Product} />
                  <Route exact path = "/forgotpassword" component = {ForgotPassword} />
                  <Route exact path = "/passwordreset/:resetToken" component = {ResetPassword} />
                  <Route path = "/" component = {Home} />
               </Switch>
            </Router>
        </div>
    )
}

export default EComm
