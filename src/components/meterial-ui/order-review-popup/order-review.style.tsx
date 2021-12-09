import styled from "styled-components";
import {Button} from "../../button/button";
import Slider from "react-slick";
import {Divider, Paper} from "@material-ui/core";

export const  OrderReviewContainer =  styled.div`
  margin: 2.54rem;
  
`

export const SliderContainer = styled(Slider)`
  .slick-prev:before{
    color:green;
  }
  .slick-next:before{
    color: green;
  }
`
export const Container = styled.div`
  padding: 13px 0;
`

export const PaperContainer = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 6rem;
  margin: 13px 0;
`

export const OrderReviewWrapper = styled.div`
  text-align: center;
  padding: 9px;

  .MuiFormControl-root{
    width: 100%;
  }
  .MuiFilledInput-input{
    min-height: 3rem;
  }
  //#delivery_timeline_rating{
  // font-size: 2.5rem; 
  //}
  .textfield_title{
    font-size: 17px;
  }
  #title{
    font-size: 17px;
  }
`

export const MuiDivider = styled(Divider)`
  margin: 13px !important;
  .MuiDivider-root{
    height: 2px;
  }
`

export const OrderReviewTitleText = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 33px;
  text-align: center;
  color: #000000;
 
`

export const RiderText  = styled.span`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 16px;
  color: #000000;
`

export const DontShowContainer = styled.div`
    display: flex;
    padding: 9px;
    justify-content: center;
    align-items: center;
`
export const CheckBoxContainer = styled.div``

export const CheckBoxMessage = styled.span``

export const SubmitButtonContainer = styled.div`
  padding: 9px;
`

export const SubmitButton = styled(Button)`
  width: 100%;
`