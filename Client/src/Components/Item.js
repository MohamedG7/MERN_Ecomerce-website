import React from 'react';
import * as Cat from '../Styles/CatiComps';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
    return (
        <Cat.Container>
            <Link to = {`/products/${item.cat}`}>
               <Cat.Image src = {item.img} />
               <Cat.Info>
                  <Cat.Title>{item.title}</Cat.Title>
                  <Cat.Button> SHOP NOW </Cat.Button>
               </Cat.Info>
            </Link>
        </Cat.Container>
    )
}

export default Item
