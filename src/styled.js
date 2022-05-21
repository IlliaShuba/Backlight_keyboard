import styled from "styled-components";

export const Button = styled.button`
  height: 50%;
  width: 50%;
  background-color: rgb(${props => props.color.r},${props => props.color.g},${props => props.color.b});
  
`
export const Logo = styled.div`
  text-align: center;
  margin-top: 15px;
  font-size: 30px;
`