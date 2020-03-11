import styled from 'styled-components';

export default styled.button`
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    color: #fff;
    background-color: ${({ theme }) => theme.secondaryDark};
    outline: none;
    border: none;
    cursor: pointer;
`;