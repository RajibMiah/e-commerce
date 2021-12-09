import styled from "styled-components";
import {Button} from "../button/button";
import {themeGet} from "@styled-system/theme-get";

export const CardWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  border-radius: ${themeGet('radii.base', '6px')};
  background-color: ${themeGet('colors.gray.200', '#F7F7F7')};
  border: 1px solid ${({isActive}: { isActive?: boolean }) => isActive ? '#F7F7F7' : "#ff3131"};
  text-align: center;
  padding: 15px 20px;
  margin-bottom: 15px;
  margin-right: 15px;
  position: relative;
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  line-height: 24px;
  max-width: 240px;
  cursor: pointer;
  width: 100%;
  transition: all 0.25s ease;

  &.active {
    border: 1px solid ${themeGet('colors.primary.regular', '#009E7F')};
    background-color: ${themeGet('colors.primary.regular', '#37b063')};
    // background-color:
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.item-has-title {
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    padding: 15px;
  }

  &:last-child {
    margin-right: 0;
  }

  input[type='radio'] {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover {
    .button-wrapper {
      opacity: 1;
      visibility: visible;
    }
  }
`;
export const CardTitle = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.sm', '13')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  line-height: 1.2;
  margin-bottom: 5px;
  text-transform: capitalize;
`;


export const CardContent = styled.span`
  word-wrap: break-word;
  width: inherit;
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.medium', '#424561')};
`;

export const CardButtons = styled.span`
  display: block;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s ease-in-out;
`;

export const ActionButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 5px;
  cursor: pointer;
  outline: 0;
  padding: 0;
  color: ${themeGet('colors.secondary.regular.dark', '#000000FF')};

  &.edit-btn {
    background-color: ${themeGet('colors.primary.regular.light', '#ffff')};
  }

  &.delete-btn {
    background-color: ${themeGet('colors.secondary.regular', '#ff5b60')};
  }

  svg {
    display: block;
    width: 8px;
    height: auto;
  }
`;

export const CardInfo = styled.div`
  position: absolute;
  right: 13px;
`

export const CardBadge = styled.span`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  font-size: 10px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.white', '#ffffff')};
  line-height: 24px;
  background-color: #D01E6A;
    // background-color: ${themeGet('colors.primary.regular', '#D01E6A')};
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  position: absolute;
  top: -10px;
  right: 10px;
  z-index: 2;
`;


export const InfoPopupContainer = styled.div`
  padding: 1.5rem;
`



export const InfoPopupWrapper = styled.div``

export const InfoPopupTitle = styled.div`
  font-size: 27px;
  font-weight: bold;
  padding: 3px 0;
`
export const InfoPopupSubtitle = styled.div`
  font-size: 19px;
  font-weight: bold;
  color: #00000078;
  padding: 3px 0;
`

export const InactiveVariantContainer = styled.div`
  padding: 13px 0;
`

export const InactiveVariantWrapper = styled.div`
  padding: 7px 0;
`

export const InactiveVariantTitle = styled.div`
  font-size: 19px;
  font-weight: bold;
`

export const InactiveMessage = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #00000078;
`

export const BtnContainer = styled.div`
  padding: 17px 0;

`

export const BtnWrapper = styled(Button)`
  width: 80%;
  margin: 0 auto;
`
