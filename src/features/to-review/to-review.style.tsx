import styled from "styled-components";
import {Grid} from "@material-ui/core";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    padding: 23px;
    justify-content: space-between;
  }
  
`

export const HeaderTextContainer = styled.div`
  .MuiTypography-root{
    font-weight: bold;
    margin-left: 2rem;
    @media only screen and (max-width: 600px) {
       margin-left: 0;
    }
  }
`
export const ReviewFilterContainer = styled.div`

`

export const GridContainer = styled(Grid)`
    padding: 1rem;
  @media only screen and (max-width: 600px) {
    padding: 0.5rem;
  }
`