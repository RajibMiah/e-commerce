import React from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Footer from "layouts/footer";
import Accordion from "components/accordion/accordion";
import { NextPage } from "next";

const accordionData = [
    {
        id: 1,
        intlTitleId: "faqNo1Title",
        intlDetailsId: "faqNo1Desc",
        values: { number1: 7, number2: 2 },
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
    {
        id: 5,
        intlTitleId: "faqNo5Title",
        intlDetailsId: "faqNo5Desc",
    },
    {
        id: 6,
        intlTitleId: "faqNo6Title",
        intlDetailsId: "faqNo6Desc",
    },
    {
        id: 7,
        intlTitleId: "faqNo7Title",
        intlDetailsId: "faqNo7Desc",
    },
    {
        id: 9,
        intlTitleId: "faqNo9Title",
        intlDetailsId: "faqNo9Desc",
    },
    {
        id: 10,
        intlTitleId: "faqNo10Title",
        intlDetailsId: "faqNo10Desc",
    },
    {
        id: 11,
        intlTitleId: "faqNo11Title",
        intlDetailsId: "faqNo11Desc",
    },
    {
        id: 12,
        intlTitleId: "faqNo12Title",
        intlDetailsId: "faqNo12Desc",
    },
    {
        id: 13,
        intlTitleId: "faqNo13Title",
        intlDetailsId: "faqNo13Desc",
    },
    {
        id: 14,
        intlTitleId: "faqNo14Title",
        intlDetailsId: "faqNo14Desc",
    },
    {
        id: 15,
        intlTitleId: "faqNo15Title",
        intlDetailsId: "faqNo15Desc",
    },
    {
        id: 16,
        intlTitleId: "faqNo16Title",
        intlDetailsId: "faqNo16Desc",
    },
    {
        id: 17,
        intlTitleId: "faqNo17Title",
        intlDetailsId: "faqNo17Desc",
    },
    {
        id: 18,
        intlTitleId: "faqNo18Title",
        intlDetailsId: "faqNo18Desc",
    },
    {
        id: 19,
        intlTitleId: "faqNo19Title",
        intlDetailsId: "faqNo19Desc",
    },
    {
        id: 20,
        intlTitleId: "faqNo20Title",
        intlDetailsId: "faqNo20Desc",
    },
    {
        id: 21,
        intlTitleId: "faqNo21Title",
        intlDetailsId: "faqNo21Desc",
    },
    {
        id: 22,
        intlTitleId: "faqNo22Title",
        intlDetailsId: "faqNo22Desc",
    },
    {
        id: 23,
        intlTitleId: "faqNo23Title",
        intlDetailsId: "faqNo23Desc",
    },
    {
        id: 24,
        intlTitleId: "faqNo24Title",
        intlDetailsId: "faqNo24Desc",
    },
    {
        id: 25,
        intlTitleId: "faqNo25Title",
        intlDetailsId: "faqNo25Desc",
    },
    {
        id:26 ,
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

const HelpPageWrapper = styled.div`
  background-color: #f7f7f7;
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

export const HelpPageContainer = styled.div`
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

const HelpPage: NextPage = () => {
    return (
        <Modal>
            <SEO title="F.A.Q - Shatkora" description="F.A.Q Details" image={'/'} url={'https://shatkora.co/help'}/>
            <HelpPageWrapper>
                <HelpPageContainer>
                    <Heading>F.A.Q</Heading>
                    <Accordion items={accordionData}/>
                </HelpPageContainer>

                <Footer/>
            </HelpPageWrapper>
        </Modal>
    );
};

export default HelpPage;