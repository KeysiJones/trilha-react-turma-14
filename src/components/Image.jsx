import styled, { keyframes } from 'styled-components';
const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  animation: ${rotate} 5s linear infinite;
`;
