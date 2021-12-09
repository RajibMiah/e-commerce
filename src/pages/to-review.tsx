import React from "react";
import styled from "styled-components";
import {Modal} from "@redq/reuse-modal";
import {SEO} from "components/seo";
import Footer from "layouts/footer";
import ReviewPanel from 'features/to-review/to-review'
import Accordion from "components/accordion/accordion";
import {NextPage} from "next";
import Unauthenticated from "../components/error-message/unauthenticated";
import {useSelector} from "react-redux";
import {AuthState} from "../redux/auth/reducer";

const accordionData = [
    {
        id: 1,
        intlTitleId: "faqNo1Title",
        intlDetailsId: "faqNo1Desc",
        values: {number1: 7, number2: 2},
    },
    {
        id: 2,
        intlTitleId: "faqNo2Title",
        intlDetailsId: "faqNo2Desc",
    },
    {
        id: 3,
        intlTitleId: "faqNo3Title",
        intlDetailsId: "faqNo3Desc",
    },
    {
        id: 4,
        intlTitleId: "faqNo4Title",
        intlDetailsId: "faqNo4Desc",
    },
];

const Heading = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  width: 100%;
  text-align: center;
`;

const ToReviewPageWrapper = styled.div`
  //background-color: #f7f7f7;
  width: 95%;
  margin: 0 auto;
  position: relative;
  padding: 130px 0 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 989px) {
    padding-top: 70px;
  }
`;

export const ToReviewPageContainer = styled.div`
  background-color: transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  @media (min-width: 990px) {
    width: 870px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 989px) {
    padding: 30px;
  }
`;

type Props = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

type RootState = {
    auth: AuthState;
}

const ToReviewPage: NextPage<Props> = ({deviceType}) => {
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    if(!isAuthenticated) return  <Unauthenticated title={"You must be sign in to view this page"} statusCode={''} deviceType={deviceType}/>
    return (
        <Modal>
            <SEO title="Review-Shatkora" description="review your purchases products"/>
            <ToReviewPageWrapper>
                <ReviewPanel/>
                <Footer/>
            </ToReviewPageWrapper>
        </Modal>
    );
};

export default ToReviewPage;