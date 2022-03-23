import React, { useState, useEffect } from 'react';
import * as Nav from '../Styles/NavComps';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../Styles/Brand.css';
import { Badge } from "@material-ui/core";
import { Link } from 'react-router-dom';
import useStyles from '../Styles/MUIStyles';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAuth } from '../Redux/userReducer';
import { signOut } from '@firebase/auth';
import { auth } from '../App/firebaseSetup';
import { useHistory } from 'react-router-dom';
import { DropDownSearch } from '../Styles/NavComps';
import { publicRequest } from '../App/Request';
import SearchItem from './SearchItem';

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ dataSearch, setDataSearch ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const quantity = useSelector(state => state.cart.quantity);
  const { currentUser } = useSelector((state) => state.user);
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setTimeout(() => {
      setFocused(false)
    }, 500);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await publicRequest.get("/products");
      setDataSearch(data);
    };
    getAllProducts();
  }, []);
  const logUserOut = () => {
    dispatch(logoutAuth());
    signOut(auth).then(() =>{
      history.push("/");
    })
  };

  const searchText = e => {
    setFilter(e.target.value)
  };

  let filteredData = dataSearch.filter(item => {
    return Object.keys(item).some(key =>
         item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )
  });
  return (
    <Nav.Container>
      <Nav.Wrapper>
          <Nav.Logo>
            <h3><Link to = "/"  className = 'brand'>SMART</Link></h3>
          </Nav.Logo>
          {
            focused && 
            <DropDownSearch>
              {filteredData.map((item) => <SearchItem item = {item} />)}
            </DropDownSearch>
          }
          <Nav.Left>
            <Nav.SearchContainer>
              <Nav.Language>EN</Nav.Language>
              <Nav.Input
                placeholder = "Search" 
                value = {filter}
                onChange = {searchText.bind(this)}
                onFocus = {onFocus}
                onBlur = {onBlur}
              />
              <SearchIcon style={{ color: "gray", fontSize: 16 }} />
            </Nav.SearchContainer>
          </Nav.Left>
          <Nav.Right>
            <Nav.MenuItem>
              { currentUser 
                ? ( <Nav.signOut>
                      hello, {currentUser.username}
                      <Nav.DropDown onClick = {logUserOut}><span>SIGN OUT</span></Nav.DropDown>
                    </Nav.signOut> ) 
                : ( <Link to = "/login" className = {classes.link}>
                      <h3>LOGIN</h3>
                    </Link> )}
            </Nav.MenuItem>
            <Nav.MenuItem>
              <Link to = "/register" className = {classes.link}>
                <h3>REGISTER</h3>
              </Link>
            </Nav.MenuItem>
            <Nav.MenuItem>
              <Link to = "/cart">
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </Link>
            </Nav.MenuItem>
          </Nav.Right>
      </Nav.Wrapper>
    </Nav.Container>
  )
}

export default NavBar
