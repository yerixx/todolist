import styled from "styled-components";
//common
export const Wrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Inner = styled.section`
  width: 100%;
  max-width: 360px;
`;

export const Info = styled.div`
  width: 360px;
  font-size: 12px;
  margin-top: -20px;
  padding: 10px 10px;
  color: #999;
`;

//title
export const TitleContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  width: 360px;
  font-size: 20px;
  .day {
    text-align: end;
  }
`;

//TabContainer
export const TabContainer = styled.section`
  position: relative;
  .postBtn {
    width: 50%;
    border-bottom: 1px solid #999;
    margin: 30px 0 20px;
    padding: 20px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
  }
  .underline {
    position: absolute;
    z-index: 1;
    width: 50%;
    bottom: 20px;
    height: 4px;
    border-bottom: 1px solid #fff;
  }
`;

//CreateTodo
export const Createform = styled.form`
  display: flex;
  align-items: center;
  margin: 20px 0 30px;
  padding: 14px 20px;
  border: 1px solid #999;
  border-radius: 20px;
  input[type="text"] {
    font-size: 16px;
    color: #fff;
  }
  div {
    font-size: 16px;
    cursor: pointer;
  }
`;
//TodoList
export const ListContainer = styled.section`
  margin: 20px 0;
  &:first-child {
    margin-top: 0;
  }
`;
export const List = styled.article`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  border-radius: 20px;
  background: #333;
  ${(props) =>
    props.isDone &&
    `
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
    }
  `}
`;
export const ListText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  .todo {
    font-size: 18px;
  }
  .date {
    font-size: 14px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.isDone ? "rgba(255,255,255,0.4)" : "#000")};
    width: 60px;
    height: 28px;
    background: ${(props) => (props.isDone ? "rgba(0,0,0,0.2)" : "#fff")};
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
  }
`;
