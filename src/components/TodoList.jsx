import React, { useContext, useState } from "react";
import {
  Inner,
  ListContainer,
  List,
  ListText,
  Buttons,
} from "../style/StyleContainer";
import { TodoContext } from "../Root";

const TodoList = () => {
  const {
    todo = [],
    handleEditTodo,
    handleToggleDone,
    handleDeleteTodo,
    selectedTab,
  } = useContext(TodoContext);

  const colors = ["#2B2B2B", "#E96C73", "#BBBC52", "#95BEC4"];
  const reversedColors = [...colors].reverse();

  const [editingId, setEditingId] = useState(null); // 수정 중인 항목 ID
  const [newTitle, setNewTitle] = useState(""); // 수정 중인 제목
  const [isSaving, setIsSaving] = useState(false); // 중복 호출 방지 상태

  const filteredTodos =
    selectedTab === 0
      ? todo.filter((todo) => !todo.isDone)
      : todo.filter((todo) => todo.isDone);

  const startEditing = (id, title) => {
    setEditingId(id); // 수정 중인 ID 설정
    setNewTitle(title); // 기존 제목으로 초기화
  };

  const saveEdit = () => {
    if (isSaving) return; // 중복 호출 방지
    setIsSaving(true); // 저장 중 상태 설정

    if (!newTitle.trim() || editingId === null) {
      setIsSaving(false); // 유효하지 않으면 상태 초기화
      return;
    }

    handleEditTodo(editingId, newTitle.trim()); // 수정 내용 저장
    setEditingId(null); // 수정 종료
    setNewTitle(""); // 상태 초기화
    setIsSaving(false); // 저장 완료 상태 초기화
  };

  const handleInputChange = (e) => {
    setNewTitle(e.target.value); // 제목 업데이트
  };

  const handleBlur = () => {
    if (!isSaving) saveEdit(); // 저장 중이 아닐 때만 저장
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작 방지
      saveEdit(); // Enter 키로 저장
    }
  };
  return (
    <Inner>
      {filteredTodos.map((todo, index) => {
        return (
          <ListContainer key={todo.id}>
            <List
              isDone={todo.isDone}
              style={{ background: reversedColors[index % colors.length] }}
            >
              <ListText isDone={todo.isDone}>
                {editingId === todo.id ? (
                  <input
                    className="todo"
                    type="text"
                    value={newTitle} // 수정된 제목
                    onChange={handleInputChange} // 제목 입력 변경
                    onBlur={handleBlur} // 포커스 아웃 시 저장
                    onKeyDown={handleKeyDown} // 엔터 키로 저장
                    autoFocus // 자동 포커스
                  />
                ) : (
                  <div
                    className="todo"
                    onDoubleClick={() => startEditing(todo.id, todo.title)} // 더블 클릭 시 수정 시작
                  >
                    {todo.title}
                  </div>
                )}
                <div className="date">{todo.date}</div>
              </ListText>
              <Buttons isDone={todo.isDone}>
                <div
                  onClick={() => handleToggleDone(todo.id)}
                  className="button"
                >
                  {todo.isDone ? "취소" : "완료"}
                </div>
                <div
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="button"
                >
                  삭제
                </div>
              </Buttons>
            </List>
          </ListContainer>
        );
      })}
    </Inner>
  );
};

export default TodoList;
