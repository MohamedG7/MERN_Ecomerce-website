import styled from 'styled-components';
import { media, Colors } from './StyledComp';
import { mobile } from './responsive' ;

export const Container = styled.div`
  height: fit-content;
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
  box-shadow: 5px 0px 5px black;
  ${mobile({ height: "120px", marginBottom: "20px" })}
`;

export const DropDown = styled.div`
  position: absolute;
  top: 30px;
  right: 200px;
  background-color: #fff;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  color: #111;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

export const signOut = styled.h3`
 &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ padding: "10px 0px", flexDirection: "column" })}
`;

export const Left = styled.div`
  display: flex;
  flex: 0.8;
  align-items: center;
`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 5px;
  ${mobile({ marginRight: "20px" })}
`;

export const DropDownSearch = styled.div`
  position: absolute;
  top: 95px;
  left: 170px;
  background-color: #fff;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  color: #111;
  font-size: 14px;
  letter-spacing: 3px;
  width: 45vw;
  height: fit-content;
  opacity: 1;
  z-index: 1000;
  ${mobile({
    top: "150px",
    left: "auto",
    width: "100%"
  })}
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width : 44vw;
  &::focus{
    background-color: green;
  }
  ${mobile({ width: "300px" })}
`;

export const Logo = styled.div`
  flex: 0.1;
  text-align: left;
`;

export const Right = styled.div`
  flex: 0.1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: 800;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin: 5px;
  ${mobile({ display: "none" })}
`;
