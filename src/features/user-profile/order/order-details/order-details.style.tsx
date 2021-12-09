import styled from 'styled-components';
import {themeGet} from '@styled-system/theme-get';
import {Button} from "@material-ui/core";

export const OrderDetailsWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${themeGet('colors.white', '#ffffff')};
`;

export const DeliveryInfo = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  border-bottom: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
`;

export const DeliveryAddress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  padding: 20px;

  h3 {
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: ${themeGet('fontSizes.base', '15')}px;
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.text.bold', '#0D1136')};
    margin-bottom: 10px;
  }
`;

export const Address = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.regular', '#77798c')};
  line-height: 1.5;
`;

export const CostCalculation = styled.div`
  width: 235px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 20px;

  @media only screen and (min-width: 768px) and (max-width: 990px) {
    width: 220px;
  }
`;

export const CheckoutCostCalculation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 20px;


`;

export const PriceRow = styled.div`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.regular', '#77798c')};
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }

  &.grandTotal {
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.text.bold', '#0D1136')};
  }
`;

export const Price = styled.div`
  color: ${themeGet('colors.text.bold', '#0D1136')};
`;
export const DiscountPrice = styled.div`
  color: ${themeGet('', '#ff5b60')};
`;
export const HeadingSection = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const Title = styled('h3')`
  font-family: ${themeGet('fonts.heading', 'sans-serif')};
  font-size: ${themeGet('fontSizes.lg', '21')}px;
  font-weight: ${themeGet('fontWeights.semiBold', '600')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
`;

export const ProgressSection = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProgressWrapper = styled('div')`
  width: 100%;
  display: flex;
  padding: 30px 25px;
  border-bottom: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
`;

export const OrderTable = styled('table')`
  && {
    border-collapse: collapse;

    thead {
      th {
        padding: 8px 20px;
        font-family: ${themeGet('fonts.body', 'Lato')};
        font-size: ${themeGet('fontSizes.sm', '13')}px;
        font-weight: ${themeGet('fontWeights.bold', '700')};
        color: ${themeGet('colors.text.bold', '#0D1136')};
        border: none;

        &:first-child {
          padding-left: 110px;
          text-align: left;
        }
      }
    }

    tr {
      &:hover {
        background-color: inherit;
      }

      td {
        padding: 20px;
        font-family: ${themeGet('fonts.body', 'Lato')};
        font-size: ${themeGet('fontSizes.base', '15')}px;
        font-weight: ${themeGet('fontWeights.regular', '400')};
        color: ${themeGet('colors.text.bold', '#0D1136')};
        border-bottom: 0;
        border: none;
      }
    }
  }
`;

export const OrderEditOptionContainer = styled.div`
  display: flex;
  margin: 15px;
  justify-content: flex-end;
  @media only screen and (max-width: 600px) {
    justify-content: space-around;
  }
  .update-btn-container{
    justify-content: center;
  }
`
export const OrderEditOptionBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 13px;
  
  .text{
    display: none;
    @media only screen and (min-width: 1700px) {
      display: flex;
    }
  }
  .update-btn{
    @media only screen and (max-width: 600px) {
      font-size: 9px;
    }
  }
  .edit-btn {
    display: flex;
    align-items: center;
    background-color: #ff5b60;
    color: white;
    margin: 3px;
    @media (width: 320px) {
      font-size: 8px;
    }

    :hover {
      background-color: #ff5b60a6;
    }
  }
  
  @media only screen and (max-width: 600px) {
    padding: 0 0;
  }

  .MuiButton-root {
    text-transform: none;
  }

  .edit-btn {
    display: flex;
    align-items: center;
    background-color: #ff5b60;
    color: white;
    margin: 3px;
    @media only screen and (max-width: 600px) {
      font-size: 9px;
    }
    @media (width: 320px) {
      font-size: 8px;
    }

    :hover {
      background-color: #ff5b60a6;
    }
  }

  .add-more-btn {
    @media only screen and (max-width: 600px) {
      font-size: 9px;
    }
    @media (width: 320px) {
      font-size: 8px;
    }
  }

  .btn-icon {
    font-size: 17px;
    margin: 5px;
  }

`

export const EditBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .MuiButton-root{
    background-color: #ff5b60;
    height: 2rem;
    &:hover{
      background: #ff5b60b5;
    }
  }
  .btn-icon{
    color: white;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export const OrderTableWrapper = styled.div`
  .rc-table-content {
    border: 0;
  }
`;

export const UpdateBtnWrapper = styled.div`
  display: flex;
  margin: 15px;
  justify-content: center;
  align-items: center;

`

export const UpdateBtnContainer = styled.div`
  .MuiButton-root {
    text-transform: none;
  }
  .edit-btn {
    display: flex;
    align-items: center;
    background-color: #ff5b60;
    color: white;
    margin: 7px;
    @media (width: 320px) {
      font-size: 11px;
    }

    :hover {
      background-color: #ff5b60a6;
    }
    .btn-icon{
      margin: 6px;
    }
  }
  
  .update-btn {
    display: flex;
    align-items: center;
    @media (width: 320px) {
      font-size: 11px;
    }

    :hover {
     
    }
  }

  .update-icon {
    font-size: 16px;
    margin: 5px;
  }
`

export const NewItemTextContainer = styled.div`
  border: 1px solid #00000014;
  text-align: center;
  padding: 13px;
`


export const Cancelation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;

`;

export const MuiButton = styled(({...otherProps}) => (
    <Button
        {...otherProps}

    /> //classes=
))`
    //background-color: ${props => props.theme.palette.error};
  width: auto;
`;
