import React from "react";
import { TitleContainer } from "../style/StyleContainer";

const Header = () => {
  return (
    <TitleContainer>
      <div>
        <div>TO-DO</div>
        <div>LIST</div>
      </div>
      <div className="day">
        <div>{new Date().toDateString().toUpperCase()}</div>
        <div>TODOY</div>
      </div>
    </TitleContainer>
  );
};

export default Header;
