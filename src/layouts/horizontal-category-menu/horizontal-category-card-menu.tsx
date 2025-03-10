import React from 'react';
import { useRouter } from 'next/router';
import ErrorMessage from 'components/error-message/error-message';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'components/image/image';
import { ArrowNext } from 'assets/icons/ArrowNext';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import {
  CategoryWrapper,
  CategoryInner,
  ItemCard,
  ImageWrapper,
  Title,
  SliderNav,
} from './horizontal-category-card-menu.style';
import useCategory from 'data/use-category';

SwiperCore.use([Navigation]);

interface Props {
  type: string;
  initData:[]
}
 const HorizontalCategoryCardMenu = ({ type}: Props) => {
  const router = useRouter();
  const { data, error } = useCategory({});

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;
  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    router.push({
      pathname,
      query: { ...query, category: slug },
    });
  };

  const breakpoints = {
    320: {
      slidesPerView: 2,
    },

    440: {
      slidesPerView: 3,
    },

    620: {
      slidesPerView: 4,
    },

    820: {
      slidesPerView: 5,
    },

    1100: {
      slidesPerView: 6,
    },

    1280: {
      slidesPerView: 7,
    },
  };

  return (
    <CategoryWrapper>
      <CategoryInner>
        <Swiper
          id="category-card-menu"
          navigation={{
            nextEl: '.banner-slider-next',
            prevEl: '.banner-slider-prev',
          }}
          breakpoints={breakpoints}
          slidesPerView={7}
          spaceBetween={10}
        >
          {data.map((category, idx) => (
            <SwiperSlide key={idx}>
              <ItemCard
                role="button"
                onClick={() => onCategoryClick(category.slug)}
                active={selectedQueries === category.slug}
              >
                <ImageWrapper>
                  <Image url={category.icon} alt={category.title} />
                </ImageWrapper>
                <Title>{category.title}</Title>
              </ItemCard>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderNav className="banner-slider-next">
          <ArrowNext />
        </SliderNav>
        <SliderNav className="banner-slider-prev">
          <ArrowPrev />
        </SliderNav>
      </CategoryInner>
    </CategoryWrapper>
  );
};


export default HorizontalCategoryCardMenu;