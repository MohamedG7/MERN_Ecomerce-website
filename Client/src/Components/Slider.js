import React, { useState } from 'react';
import { sliderItems } from '../Data/Data';
import * as Slider from '../Styles/sliderComps';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';


const SliderUI = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
          setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
          setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };
    return (
        <Slider.Container>
            <Slider.Arrow direction = "left" onClick = {() => handleClick("left")}>
               <ArrowBackIosNewOutlinedIcon />
            </Slider.Arrow>
            <Slider.Wrapper slideIndex = {slideIndex}>
                {sliderItems.map(item => (
                   <Slider.Slide bg = {item.bg} id = {item.id} key = {item.id}>
                      <Slider.ImgContainer>
                          <Slider.Image src = {item.img} />
                      </Slider.ImgContainer>
                      <Slider.InfoContainer>
                          <Slider.Title>{item.title}</Slider.Title>
                          <Slider.Desc>{item.desc}</Slider.Desc>
                          <Slider.Button>SHOW NOW</Slider.Button>
                      </Slider.InfoContainer>
                   </Slider.Slide>
                ))}
            </Slider.Wrapper>
            <Slider.Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowForwardIosOutlinedIcon />
            </Slider.Arrow>
        </Slider.Container>
    )
}

export default SliderUI
