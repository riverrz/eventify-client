import styled from "styled-components";
import theme from "theme";

function Card({ active, disabled, ...props}) {
  return <div {...props}>{props.children}</div>;
}

export default styled(Card)`
  background-color: #eee;
  padding: 2% 5%;
  transition: all 0.3s;
  cursor: pointer;
  text-align: center;
  ${({ disabled }) => {
    if (disabled) {
      return `
      cursor: not-allowed;
      background-color: #ddd;
      color: #bbb;
      `;
    } else {
      return `
      :hover {
        background-color: ${theme.primaryDark};
        color: #fff;
      }
      `;
    }
  }}
  ${({ active }) => {
    if (active) {
      return `
      background-color: ${theme.primaryDark};
      color: #fff;
      `;
    }
  }}
`;
