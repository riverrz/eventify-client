import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  justify-content: ${({ justify }) => justify || 'initial'};
  align-items: ${({ align }) => align || 'initial'};
`;