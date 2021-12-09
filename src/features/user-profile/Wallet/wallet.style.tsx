import styled from 'styled-components';
import {themeGet} from '@styled-system/theme-get';

const AddReferCodeText = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  @media only screen and (max-width: 600px) {
    font-size: 13px;
  }

`
const AddReferCodeBtn = styled.span`
  font-family: Poppins;
  font-style: normal;
  padding-left: 13px;
  cursor: pointer;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-decoration-line: underline;
  color: ${themeGet('primary.regular', '#50B152')};
`

const BalanceContainer = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  margin-top: 19px;
  width: 100%;
  min-height: 177px;
`
const CurrentBalanceText = styled.div`
  font-family: Poppins;
  font-style: normal;
  padding: 1.5rem;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #000000;

`

const CurrentBalance = styled.div`
  font-family: Poppins;
  font-style: normal;
  padding: 1.5vmin;
  font-weight: 500;
  font-size: 48px;
  line-height: 22px;
  color: #000000;

`

const EarnMore = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  color: #0D1136;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`

const ReferContainer =  styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37rem;
`

export {
    AddReferCodeText,
    AddReferCodeBtn,
    BalanceContainer,
    EarnMore,
    CurrentBalanceText,
    CurrentBalance,
    ReferContainer
};
