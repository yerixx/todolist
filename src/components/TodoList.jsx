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

  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const filteredTodos =
    selectedTab === 0
      ? todo.filter((todo) => !todo.isDone)
      : todo.filter((todo) => todo.isDone);

  const startEditing = (id, title) => {
    setEditingId(id);
    setNewTitle(title);
  };

  const saveEdit = () => {
    if (isSaving) return;
    setIsSaving(true);

    if (!newTitle.trim() || editingId === null) {
      setIsSaving(false);
      return;
    }

    handleEditTodo(editingId, newTitle.trim());
    setEditingId(null);
    setNewTitle("");
    setIsSaving(false);
  };

  const handleInputChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    if (!isSaving) saveEdit();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
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
                    value={newTitle}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  <div
                    className="todo"
                    onDoubleClick={() => startEditing(todo.id, todo.title)}
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
