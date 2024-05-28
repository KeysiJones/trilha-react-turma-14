import styled from 'styled-components'

export const Paragrafo = styled.p`
  font-size: ${(props) => props.fontSize || '20px'};
  color: ${(props) => props.color || 'white'};
  font-weight: ${(props) => props.fontWeight || 'bold'};
`;