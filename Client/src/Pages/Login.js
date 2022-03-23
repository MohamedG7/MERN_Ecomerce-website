import styled from "styled-components";
import {mobile} from "../Styles/responsive";
import { login, loginWithGoogle } from "../Redux/API_Actions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, onAuthStateChanged } from '@firebase/auth';
import { auth, provider } from '../App/firebaseSetup';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://cdn.pixabay.com/photo/2015/06/22/08/38/children-817368_960_720.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const history = useHistory();
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ processing, setProcessing ] = useState(false);
  const [ verifyAdmin, setVerifyAdmin ] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error, errorMsg, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        loginWithGoogle(dispatch, user);
        history.push("/");
      }
    });
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(isFetching);
    login(dispatch, { username, password })
  };
  const handleGoogleAuth = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((result) => {
      loginWithGoogle(dispatch, result.user, verifyAdmin);
    }).catch((error) => {
      alert(error.message)
    })
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit = {handleSubmit}>
          <Input
            placeholder="username" 
            onChange = {e => setUsername(e.target.value)}
          />
          <Input
            placeholder="password" 
            onChange = {e => setPassword(e.target.value)}
            type = "password"
          />
          <div style = {{
            display: "flex",
            justifyContent: "space-around"
          }}>
            <Button disabled = {processing}>LOGIN</Button>
            <Button disabled = {processing} onClick = {handleGoogleAuth}>LOGIN WITH GOOGLE</Button>
          </div>
          {error && <Error>{errorMsg}</Error>}
          <Link href = "/forgotpassword">DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href = "/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;