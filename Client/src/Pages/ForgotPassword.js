import React, {useState} from 'react';
import styled from "styled-components";
import { mobile } from "../Styles/responsive";
import { Link } from "react-router-dom";
import { forgotPassword } from "../Redux/API_Actions";
import { useDispatch, useSelector } from "react-redux";



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

const Links = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ErrorSet = styled.span`
  color: red;
`;

const SuccessSet = styled.span`
  color: lightgreen;
`;

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState("");
    const [ processing, setProcessing ] = useState(false);
    const { isFetching, error, errorMsg, success, successMsg } = useSelector((state) => state.user);

    const forgotUserPasswrd = async (e) => {
      e.preventDefault();
      forgotPassword(dispatch, {email});
      setProcessing(isFetching);
      if(error) {
        setEmail("");
      };
    };
    return (
        <Container>
        <Wrapper>
          <Title>FORGOT YOUR PASSWORD</Title>
          <Form onSubmit = {forgotUserPasswrd}>
            <Input
              placeholder="email"
              required
              type = "email"
              value = {email}
              onChange = { e => setEmail(e.target.value) }
            />
            <Button disabled = {processing} type = "submit">Send Email</Button>
            <Links><Link to = "/register">CREATE A NEW ACCOUNT</Link></Links>
            { error && <ErrorSet>{errorMsg}</ErrorSet> }
            { success && <SuccessSet>{successMsg}</SuccessSet> }
          </Form>
        </Wrapper>
      </Container>
    )
}

export default ForgotPassword
