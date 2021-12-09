import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Box = styled.div`
  margin-right: 20px;
  @media (max-width: 990px) {
    margin-left: auto;
  }

  .popover-wrapper.right {
    .popover-content {
      padding: 15px 0;
    }
  }

  @media (max-width: 767px) {
    margin-right: 3.7rem;
  }
`;

export const SelectedItem = styled.button`
  width:100%;
  min-width: max-content;
  height: 38px;
  display: flex;
  align-items: center;
  border: 1px solid ${themeGet('colors.regular.primary', '#37b063')};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: ${themeGet('radii.base', '6px')};
  outline: 0;
  cursor: pointer;

  @media (max-width: 767px) {
    //border: 0;
    padding: 0;
    width: 3rem;
    justify-content: center;
  }
  
  
  span {
    display: flex;
    align-items: center;
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: ${themeGet('fontSizes.xs', '12')}px;
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.primary.regular', '#009e7f')};
    text-decoration: none;

    /* @media (max-width: 990px) {
      display: none;
    } */

    @media (max-width: 767px) {
      display: none;
    }

    &:first-child {
      margin-right: auto;
    }
  }
`;

export const Flag = styled.div`
  margin-right: 7px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  overflow: hidden;
  svg {
    width: 20px;
    height: auto;
    color: ${themeGet('colors.regular.primary', '#37B063')};
  }

  @media (max-width: 767px) {
    margin-right: 0;
  }

  /* @media (max-width: 990px) {
    margin-right: 0;
  } */
`;

export const MenuItem = styled.button`
  width: 100%;
  font-size: ${themeGet('fontSizes.xs', '12')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  line-height: 1.2em;
  display: block;
  padding: 15px 30px;
  border-radius: ${themeGet('radii.base', '6px')};
  transition: 0.15s ease-in-out;
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  border-radius: 0;
  background-color: transparent;
  outline: 0;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 1400px) {
    margin-right: 10px;
    font-size: ${themeGet('fontSizes.xs', '15')}px;
  }

  @media only screen and (min-width: 991px) and (max-width: 1200px) {
    padding: 15px 30px;
  }

  span {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 15px;

    svg {
      display: block;
      width: 20px;
      height: auto;
      color: ${themeGet('colors.regular.primary', '#37B063')};
    }
  }
`;

export const DropIconStyle = styled.span`
  display: flex !important;
  @media only screen and (max-width: 1400px)  {
    display: none !important;
  }
  
`

export const PlayStore = styled.div`
  margin-top: 4px;
  width: 24px;
  left: 29%;
  position: relative;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
   left: 9%;
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    width: 24px;
    left: 21%;
    display: inline;
  }
  @media only screen and (min-width: 992px)  {
    display: none;
  }
  
`;


