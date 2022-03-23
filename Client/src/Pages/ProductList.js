import styled from "styled-components";
import NavBar from "../Components/NavBar";
import Announcement from "../Components/Announcement";
import Products from "../Components/Products";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import { mobile } from "../Styles/responsive";
import React, { useState } from 'react';
import { useLocation } from "react-router";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const Location = useLocation();
  const cat = Location.pathname.split("/")[2];
  const [ filters, setFilter ] = useState({});
  const [ sort, setSort ] = useState("newest");

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filters,
      [e.target.name]: value
    })
  };
    return (
        <Container>
        <NavBar />
        <Announcement />
        <Title>{cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name = "color" onChange = {handleFilter}>
              <Option disabled>
                Color
              </Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
            </Select>
            <Select name = "size" onChange = {handleFilter}>
              <Option disabled>
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange = {e => setSort(e.target.value)}>
              <Option value = "newest">Newest</Option>
              <Option value = "asc">Price (asc)</Option>
              <Option value = "desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat = {cat} sort = {sort} filters = {filters} />
        <NewsLetter />
        <Footer />
      </Container>
    )
}

export default ProductList
