import React, { useState } from 'react';
import styled from "styled-components";
import { mobile } from "../Styles/responsive";
import { Link } from "react-router-dom";
import { resetUserPassword } from "../Redux/API_Actions";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Links = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const ErrorSet = styled.span`
  color: red;
`;

const SuccessSet = styled.span`
  color: lightgreen;
`;

const ResetPassword = ({ match }) => {
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const { isFetching, error, errorMsg, success, successMsg } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [ processing, setProcessing ] = useState(false);
    const [ passError, setPassError ] = useState("");

    const resetPassword = async (e) => {
      e.preventDefault();

      if(password !== confirmPassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setPassError("");
        }, 5000);
        return setPassError("Passwords do not match");
      };

      resetUserPassword(dispatch, {password}, match);
      setProcessing(isFetching);

      if(error) {
        setPassword("");
        setConfirmPassword("");
      };
    };
    return (
        <Container>
        <Wrapper>
          <Title>ResetPassword</Title>
          <Form onSubmit = {resetPassword}>
            <Input
              placeholder="password"
              required
              type = "password"
              value = {password}
              onChange = { e => setPassword(e.target.value) }
            />
            <Input
              placeholder="confirm password"
              required
              type = "password"
              value = {confirmPassword}
              onChange = { e => setConfirmPassword(e.target.value) }
            />
            <Button type = "submit" disabled = {processing}>SUBMIT</Button>
            <Link to = "/forgotpassword">DO NOT YOU REMEMBER THE PASSWORD?</Link>
            <Links href = "/register">CREATE A NEW ACCOUNT</Links>
            { passError && <ErrorSet>{passError}</ErrorSet> }
            { success && <SuccessSet>{successMsg}</SuccessSet> }
            { error && <ErrorSet>{errorMsg}</ErrorSet> }
          </Form>
        </Wrapper>
      </Container>
    )
}

export default ResetPassword
