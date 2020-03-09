export default props => {
  if (!props.open) {
    return null;
  } else {
    return props.children;
  }
};
