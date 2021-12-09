import styled from 'styled-components';
import {themeGet} from '@styled-system/theme-get';

const PopoverWrapper = styled.div`
  position: relative;
  cursor: pointer;
  text-align: end;
  .popover-handler {
    width: 17% !important;
    min-width: 13% !important;
    display: inline-block;
    cursor: pointer;
    margin: 1rem;
    @media only screen and (max-width: 600px) {
      margin: 0 !important;
    },
   

  }

  .popover-content {
    right: 25px;
    top: calc(100% + -7px);
    display: block;
    min-width: 17rem;
    padding: 15px 20px;
    position: absolute;
    border-radius: ${themeGet('radii.base', '6px')};
    background-color: ${themeGet('colors.white', '#ffffff')};
    box-shadow: 0 3px 20px rgb(142 142 142 / 50%);;
    z-index: 99;

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 9px 8px;
      border-color: transparent transparent ${themeGet('colors.white', '#ffffff')} transparent;
      top: -8px;
      right: 0;
      box-shadow: -4px -4px 8px -3px rgba(142, 142, 142, 0.14);
      pointer-events: none;
    }

    @media only screen and (max-width: 600px) {
      width: 5px;
      left: -11.5rem !important;
      top: calc(100% + 11px);
    }
  }

  /* If direction prop set to right */

  &.right {
    .popover-content {
      //left: auto;
      right: 25px;
      &:before {
        right: 24px;
        @media only screen and (max-width: 600px) {
          right: 1rem !important;
        }
      }
    }
  }
`;

export default PopoverWrapper;
