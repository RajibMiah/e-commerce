import React from 'react';
import Carousel from 'react-multi-carousel';
import styled from 'styled-components';
import {themeGet} from '@styled-system/theme-get';
import {ArrowNext} from 'assets/icons/ArrowNext';
import {ArrowPrev} from 'assets/icons/ArrowPrev';
import {useLocale} from 'contexts/language/language.provider';
import {useRouter} from "next/router";
import {useOffer} from 'data/use-offer'

const ButtonPrev = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet('colors.white', '#ffffff')};
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet('shadows.base', '0 3px 6px rgba(0, 0, 0, 0.16)')};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: 10px;
  z-index: 99;
  @media (max-width: 990px) {
    margin-top: -17px !important;
  }
`;

const ButtonNext = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet('shadows.base', '0 3px 6px rgba(0, 0, 0, 0.16)')};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: 10px;
  z-index: 99;
  @media (max-width: 990px) {
    margin-top: -17px !important;
  }
`;

const ButtonGroupWrapper = styled('div')``;

const PrevButton = ({onClick, children}: any) => {
    return (
        <ButtonPrev
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className='prevButton'
        >
            {children}
        </ButtonPrev>
    );
};
const NextButton = ({onClick, children}: any) => {
    return (
        <ButtonNext
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className='nextButton'
        >
            {children}
        </ButtonNext>
    );
};

const ButtonGroup = ({next, previous}: any) => {
    const {isRtl}: any = useLocale();

    return (
        <ButtonGroupWrapper>
            {isRtl ? (
                <>
                    <NextButton onClick={() => next()} className='rtl'>
                        <ArrowPrev/>
                    </NextButton>
                    <PrevButton onClick={() => previous()}>
                        <ArrowNext/>
                    </PrevButton>
                </>
            ) : (
                <>
                    <PrevButton onClick={() => previous()}>
                        <ArrowPrev/>
                    </PrevButton>
                    <NextButton onClick={() => next()}>
                        <ArrowNext/>
                    </NextButton>
                </>
            )}

            {/* if prop isRtl true swap prev and next btn */}
        </ButtonGroupWrapper>
    );
};

type Props = {
    data: any[] | undefined;
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    props?: any;
    component?: any;
    autoPlay?: boolean;
    infinite?: boolean;
    isRtl?: boolean;
    customLeftArrow?: React.ReactElement;
    customRightArrow?: React.ReactElement;
    itemClass?: string;
};
const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3,
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2,
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
    },
};
export default function CustomCarousel({
                                           data,
                                           deviceType: {mobile, tablet, desktop},
                                           component,
                                           autoPlay = true,
                                           infinite = true,
                                           customLeftArrow,
                                           customRightArrow,
                                           itemClass,
                                           isRtl,
                                           ...props
                                       }: Props) {

    const router = useRouter()
    const {pathname, query} = router;
    const [countLimit, setCountLimit] = React.useState<number>(2)
    const {loading, error, offer} = useOffer()
    const handleOnClick = (categories) => {
        const {type, ...rest} = query;
        if (categories.length > 1) {
            router.push({
                    pathname,
                    query: {categories: categories},
                },
                {
                    pathname: `/${type}`,
                    query: {categories},
                });

        } else {
            router.push({
                    pathname,
                    query: {category_id: categories},
                },
                {
                    pathname: `/${type}`,
                    query: {category_id: categories},
                });

        }
    }

    if (loading) return <h1>...</h1>
    if (error) return <h1>{error}</h1>
    return (
        <div dir='ltr'>
            {
                offer.count > countLimit ?
                    <Carousel
                        arrows={false}
                        responsive={responsive}
                        showDots={false}
                        slidesToSlide={1}
                        infinite={infinite}
                        containerClass='container-with-dots'
                        itemClass={itemClass}
                        autoPlay={autoPlay}
                        autoPlaySpeed={3000}
                        renderButtonGroupOutside={true}
                        additionalTransfrom={0}
                        customButtonGroup={<ButtonGroup/>}
                        {...props}
                        // use dir ltr when rtl true
                    >
                        {offer.results.map((result: any, index: number) => {
                            if (component) return component(result);
                            return (
                                <div style={{padding: '0 15px', overflow: 'hidden'}} key={index}>
                                    <a
                                        href={result.link}
                                        style={{display: 'flex', cursor: 'pointer'}}
                                    >
                                        <img
                                            key={result.id}
                                            src={result.featured_image}
                                            alt={result.alt}
                                            onClick={() => {
                                                handleOnClick(result.categories);
                                            }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'block',
                                                position: 'relative',
                                            }}
                                        />
                                    </a>
                                </div>
                            );
                        })}
                    </Carousel>
                    :
                    null
            }
        </div>
    );
}
