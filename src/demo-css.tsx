import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

// demo of how to use material ui component's with styles-component
export default styled(({ color, ...otherProps }) => (
    <Button {...otherProps} />
))`
color: ${props => props.color};

& .label {
      background-color: purple;
  }

&.disabled {
     color: black;
     background-color: orange;
.label {
    background-color: green;
}
}
`;