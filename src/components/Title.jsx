import styled from 'styled-components';

export const Title = styled.h1`
    color: ${props => props.color || 'black'};
    font-size: ${props => props.size || '20px'};
`