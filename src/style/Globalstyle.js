import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const Globalstyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing:border-box;
}
ul,li{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;

}
input{    
  width: 100%;
  background: inherit;
  border: none;
  &:focus{
    outline:none;
  }
}
button{
  border:none;
  background:inherit;
}
body{
  background: #000;
  color:#fff;
}
`;

export default Globalstyle;

export const Wrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0 30px;
  }
`;
