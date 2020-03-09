export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("eventifyState");
    if (!serializedState) {
      return null;
    }
    const state = JSON.parse(serializedState);
    return state;
  } catch (error) {
    return null;
  }
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
