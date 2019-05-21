import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-family: "Roboto";
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default () => <Title>Plant site</Title>;
