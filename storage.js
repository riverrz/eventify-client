export const loadState = () => {
  const serializedState = localStorage.getItem("eventifyState");
  if (!serializedState) {
    return null;
  }
  const state = JSON.parse(serializedState);
  return state;
};

export const saveState = state => {
  if (state && typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("eventifyState", serializedState);
    } catch (error) {
      console.log(error);
    }
  }
};
