import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import {Popover} from "@material-ui/core";
import {FaFilter} from 'react-icons/fa';

export const FilterRootContainer = styled.div`
  padding-right: 23px;
  @media only screen and (max-width: 600px) {
    padding-right: 0;
  }
  .MuiButton-label{
    text-transform: capitalize;
  }
`
export const PopoverContainer = styled(Popover)`
   margin-top: 12px;
`

export const FilterContainer = styled.div`
  width: 12rem;
  height: 3rem;
  font-size: 12px;
  font-weight: 700;
  color: #0D1136;
  line-height: 1.2em;
  padding: 15px 30px;
  transition: 0.15s ease-in-out;
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 1px solid #f1f1f1;
  border-radius: 0;
  background-color: transparent;
  outline: 0;
  cursor: pointer;
`
export const FilterIcon = styled(FaFilter)`
  margin-right: 7px;
  color: #37b063;
  font-size: 17px;
`

export const FilterText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  cursor: pointer;
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  color: rgba(0, 0, 0, 0.75);
`