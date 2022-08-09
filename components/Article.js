import React from 'react'
import styled from 'styled-components';

const Article = (props) => {
  return (
    <Artico {...props}>
        {props.children}
    </Artico>
  )
}


export default Article

const Artico = styled.article`

    width: 250px;
    height: 450px;
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom:5px;
    color: black;
    

`
