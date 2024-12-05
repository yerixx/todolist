import React, { useContext, useState } from "react";
import { Inner, Createform } from "../style/StyleContainer";
import { TodoContext } from "../Root";
import { FaPlus } from "react-icons/fa6";

const CreateTodo = () => {
  const { handleCreate } = useContext(TodoContext);
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("할일을 입력해 주세요");
    }
    if (title.trim()) {
      handleCreate(title);
      setTitle("");
    }
  };

  return (
    <Inner>
      <Createform onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Add Todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div onClick={onSubmit}>
          <FaPlus />
        </div>
      </Createform>
    </Inner>
  );
};

export default CreateTodo;
