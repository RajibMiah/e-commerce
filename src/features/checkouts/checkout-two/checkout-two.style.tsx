import styled from "styled-components";
import {themeGet} from "@styled-system/theme-get";
import {TextField} from "@material-ui/core";
import {Button} from "../../../components/button/button";

const CheckoutWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 130px 60px 60px;
  position: relative;
  margin-top: 2rem;

  @media (max-width: 1100px) {
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 990px) {
    width: 100%;
    padding-top: 60px;
  }

  @media (min-width: 990px) {
    width: 65%;
    padding-top: 60px;
  }
`;

export const CheckoutContainer = styled.div`
  width: 100%;
  display: flex;
  counter-reset: section-counter;

  @media (max-width: 990px) {
    width: 70%;//871px;
    //margin-left: auto;
    //margin-right: auto;
  }

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const CheckoutInformation = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  padding: 20px;

  @media (max-width: 990px) {
    margin-right: 10px;
  }

  @media (max-width: 767px) {
    order: 1;
    margin-right: 0;
  }
  @media (width: 320px) {
    padding: 2px;
  }
`;

export const Heading = styled.h3`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  line-height: 1.4;
  margin-bottom: 35px;
  position: relative;
  width: calc(100% - 100px);
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: ${themeGet("fontSizes.md", "19")}px;
  }
`;

export const InformationBox = styled.div<any>`
  background-color: ${themeGet("colors.white", "#ffffff")};
  border: ${({error}) => (error ? "1px solid #37b063" : "1px solid red")};
  padding: 30px 30px 20px;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);

  @media (max-width: 767px) {
    padding: 20px;
  }
`;

export const TotalProduct = styled.div`
  flex-grow: 1;
  text-align: right;
  padding-right: 60px;
`;

export const TotalPrice = styled.div`
  flex-grow: 1;
  text-align: left;
  padding-left: 60px;
`;

export const DeliverySchedule = styled.div`
  .radioGroup {
    justify-content: space-between;

    > label {
      margin-right: 0;
      flex: calc(33.3333333333% - 10px);
      max-width: calc(33.3333333333% - 10px);
      padding: 11px 15px;

      @media (max-width: 900px) and (min-width: 768px) {
        flex: calc(50% - 10px);
        max-width: calc(50% - 10px);
      }

      @media (max-width: 480px) {
        flex: 100%;
        max-width: 100%;
        margin-right: 0;
      }
    }
  }
`;

export const CheckoutSubmit = styled.div`
  margin-top: 25px;

  .reuse-core__button {
    width: 100%;
  }
`;

export const InfoText = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const CouponBoxWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 50px;

  .couponCodeText {
    margin-right: auto;
  }
`;

export const CouponCode = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;

  span {
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.primary.regular", "#009e7f")};
    margin-left: 10px;
  }
`;

export const RemoveCoupon = styled.button`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.xs", "12")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.secondary.regular", "#ff5b60")};
  width: auto;
  height: auto;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  margin-left: 5px;
`;

export const CouponInputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    .reuse-core__button {
      padding-right: 30px !important;
      flex-shrink: 0;
    }
  }
`;

export const HaveCoupon = styled.button`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
  width: auto;
  height: auto;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
`;

export const ErrorMsg = styled("span")`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.xs", "12")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.secondary.hover", "#FF282F")};
  padding-top: 10px;
  display: flex;
  margin-left: 20px;
`;

export const TermConditionText = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.smm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  line-height: 1.5;
  margin-top: 30px;
  display: block;
`;

export const TermConditionLink = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.smm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.secondary.regular", "#ff5b60")};
  margin-left: 5px;
  cursor: pointer;
  line-height: 1.5;
`;

export const CartWrapper = styled.div`
  width: 270px;
  flex-shrink: 0;
  padding-top: 20px;

  @media (min-width: 768px) and (max-width: 1200px) {
    width: 260px;
  }

  @media (max-width: 767px) {
    order: 0;
    width: 100%;
    padding: 40px 15px 30px;
    position: relative !important;
  }

  .checkout-scrollbar {
    height: 100%;
    max-height: 390px;
    padding-right: 15px;
  }
`;

export const OrderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) and (max-width: 990px) {
    padding-right: 15px;
  }
`;

export const Title = styled.h3`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  text-align: center;
  margin-bottom: 40px;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

export const CalculationWrapper = styled.div`
  border-top: 1px solid ${themeGet("colors.gray.700", "#e6e6e6")};
  padding: 20px 15px 0;
  margin-top: 20px;
`;

export const Items = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Quantity = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
`;

export const Multiplier = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin: 0 12px;
`;

export const ItemInfo = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin-right: 15px;
`;

export const Price = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin-left: auto;
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Text = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
`;

export const Bold = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
`;

export const Small = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: 11px;
`;

export const NoProductMsg = styled.h3`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  line-height: 1.2;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
`;

export const NoProductImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 140px;
    height: auto;
  }
`;

export const TextFiledContainer = styled.div`

`

export const TextFieldWrapper = styled(TextField)`
  width: 100%;

  .MuiOutlinedInput-notchedOutline {
    border-color: ${themeGet("colors.primary.regular", "#37B063")};
  }
`

export default CheckoutWrapper;


///place order error style


export const Container = styled.div`

`
export const ErrorPopupWrapper = styled.div`
  padding: 17px;
`

export const CheckoutErrorTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  padding: 9px;
  line-height: 33px;
  text-align: center;
  color: #000000;
`

export const RemovedTextContainer = styled.div`
  color: #ff5b60;
`

export const CheckoutErrorBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  
  .back-btn{
    background: #ff5b60;
    &:hover{
      background: #ff5b60c7;
    }
  }
`
export const CheckoutErrorBtnWrapper = styled(Button)`
  margin: 13px;
  width: 9rem;
`