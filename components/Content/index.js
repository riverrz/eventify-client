import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  text-align: center;
  @media only screen and (min-width: 768px) {
    padding: 1rem;
    margin-left: 5rem;
  }
`;

export default props => {
  if (!props.open) {
    return null;
  } else {
    return <Div>{props.children}</Div>;
  }
};
