import React, { useState } from 'react';
import styled from "styled-components";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Charges from "./Charges";

const Container = styled.div`
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid lightgray;
  box-shadow: 3px 3px 3px rgba(0, 0 ,0 ,0.5);
  height: 500px;
  width: fit-content;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.h4`
  margin: 20px;
  margin-bottom: -10px;
  display: flex;
  padding: 10px;
  justify-content: flex-start;
`;

const PayItem =  styled.div`
  margin: 20px;
  margin-bottom: -10px;
  display: flex;
  padding: 10px;
  justify-content: center;
`;

const Brand = styled.h2`
  text-align: center;
`;

const Checkout = () => {
  const [ country, setCountry ] = useState('');
  const [ region, setRegion ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ address, setAddress ] = useState('');

  const theCountry = (val) => {
    setCountry(val);
  };

  const theRegion = (val) => {
    setRegion(val);
  };
  return (
    <Container>
      <Brand>SMART</Brand>
      <hr />
      <Wrapper>
        <Item>
          <span style = {{ margin: "10px" }}>Country:</span>
          <CountryDropdown
            value = {country}
            onChange = {(val) => theCountry(val)}
          />
        </Item>
        <Item>
          <span style = {{ margin: "10px" }}>Region:</span>
          <RegionDropdown
            country = {country}
            value = {region}
            onChange = {(val) => theRegion(val)}
            blankOptionLabel="No country selected"
            defaultOptionLabel="Now select a region"
          />
        </Item>
        <Item>
          <span style = {{ margin: "10px" }}>Your phone number:</span>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
            style = {{
              padding: "10px"
            }}
          />
        </Item>
        <Item>
          <span style = {{ margin: "10px" }}>Your phone number:</span>
          <input 
            placeholder = "put your full address her"
            value = {address}
            onChange = {e => setAddress(e.target.value)}
            style = {{
              padding: "10px"
            }}
          />
        </Item>
        <PayItem>
          <Charges country = {country} phone = {phone} address = {address} region = {region} />
        </PayItem>
      </Wrapper>
    </Container>
  )
}

export default Checkout
