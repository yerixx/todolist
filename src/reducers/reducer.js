const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.data;

    case "CREATE":
      return [action.newItem, ...state];

    case "EDIT":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, title: action.newTitle } : item
      );

    case "ISDONE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );

    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);

    default:
      return state;
  }
};

export default reducer;
