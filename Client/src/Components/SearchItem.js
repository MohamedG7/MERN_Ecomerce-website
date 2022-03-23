import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 10px;
  margin: 2px;
  border: 1px solid lightgray;
  border-radius: 3px;
  display: flex;
`;
const ProductImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 3px;
`;
const ProductLink = styled(Link)`
  text-decoration: none;
  margin-left: 20px;
  color: #111;
`;

const SearchItem = ({ item }) => {
  const scrollHandle = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
    return (
        <Container>
           <ProductImg src = {item.img} />
           <ProductLink to = {`/product/${item._id}`} onClick = {scrollHandle}>{item.title}</ProductLink>
        </Container>
    )
}

export default SearchItem
