import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(
    ${({ cols }) => (cols ? cols : "auto-fill")},
    minmax(250px, 1fr)
  );
`;
