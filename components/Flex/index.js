import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  justify-content: ${({ justify }) => justify || "initial"};
  align-items: ${({ align }) => align || "initial"};
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
`;

export const ResponsiveFlex = styled(Flex)`
  flex-wrap: wrap;
  @media only screen and (max-width: ${({ width }) =>
      width ? width : "768px"}) {
    flex-direction: column;
  }
`;

export default Flex;
