import React, { useEffect, useReducer, useState } from "react";
import Title from "./components/Title";
import Globalstyle, { Wrapper } from "./style/Globalstyle";
import { Info } from "./style/StyleContainer";
import TodoList from "./components/TodoList";
import TabsMenu from "./components/TabsMenu";
import CreateTodo from "./components/CreateTodo";
import reducer from "./reducers/reducer";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase-config";

export const TodoContext = React.createContext();

const Root = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [selectedTab, setSelectedTab] = useState(0);

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "create"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().date).toLocaleDateString(), // UI용 포맷
        }));
        dispatch({ type: "SET_DATA", data });
      } catch (err) {
        console.error("Error getting documents: ", err);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (title) => {
    if (title.trim() === "") return alert("할 일을 입력해주세요");

    const now = new Date();
    const newItem = {
      title,
      isDone: false,
      date: now.toISOString(), // Firestore에는 ISO 형식으로 저장
    };

    try {
      const docRef = await addDoc(collection(db, "create"), newItem);
      newItem.id = docRef.id;

      // UI 상태에서는 toLocaleDateString으로 변환
      dispatch({
        type: "CREATE",
        newItem: {
          ...newItem,
          date: now.toLocaleDateString(), // UI용 포맷
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 할 일 수정
  const handleEditTodo = async (targetId, newTitle) => {
    try {
      const docRef = doc(db, "create", targetId);
      await updateDoc(docRef, { title: newTitle }); // Firestore에서 업데이트
      dispatch({ type: "EDIT", targetId, newTitle });
    } catch (err) {
      console.error(err);
    }
  };

  // 할 일 완료 상태 토글
  const handleToggleDone = async (targetId) => {
    try {
      const targetTodo = state.find((todo) => todo.id === targetId);
      if (!targetTodo) return;

      const docRef = doc(db, "create", targetId);
      await updateDoc(docRef, { isDone: !targetTodo.isDone }); // Firestore에서 업데이트
      dispatch({ type: "ISDONE", targetId });
    } catch (err) {
      console.error(err);
    }
  };

  // 할 일 삭제
  const handleDeleteTodo = async (targetId) => {
    try {
      const docRef = doc(db, "create", targetId);
      await deleteDoc(docRef); // Firestore에서 삭제
      dispatch({ type: "DELETE", targetId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Globalstyle />
      <Title />
      <TodoContext.Provider
        value={{
          todo: state,
          dispatch,
          handleCreate,
          handleEditTodo,
          handleDeleteTodo,
          handleToggleDone,
          selectedTab,
          setSelectedTab,
        }}
      >
        <TabsMenu />
        <CreateTodo />
        <Info>
          <p>*할 일을 더블클릭하면 수정할 수 있어요</p>
        </Info>
        <TodoList />
      </TodoContext.Provider>
    </Wrapper>
  );
};

export default Root;
