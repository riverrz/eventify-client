import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
`;

export default props => {
  if (!props.open) {
    return null;
  } else {
    return <Div>{props.children}</Div>;
  }
};
