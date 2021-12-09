import React from "react";
import styled, { keyframes } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 4px solid ${themeGet("colors.white", "#ffffff")};
  border-top: 3px solid ${(props) =>
          props.color
                  ? props.color
                  : themeGet("colors.primary.regular", "#009e7f")};
  border-radius: 50%;
  transition-property: transform;
  animation-name: ${rotate};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;


export const LoaderBox = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1199px) {
    width: 100%;
    padding: 0 20px;
  }
`;