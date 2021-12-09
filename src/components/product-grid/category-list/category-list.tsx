import React  from "react";
import dynamic from "next/dynamic";
import {
    VariantCardWrapper,
    VariantCol,
    VariantsRow,
} from "./category-list.style";
import Fade from "react-reveal/Fade";
import { ProductVariant } from "types/product-variant";
const CategoryCard = dynamic(
    import("components/product-grid/category-list/category-card/category-card")
);


interface VariantsProps {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    item?:any;

}


export const Variants = ({deviceType, item}) => {

    const renderCard = (variant: ProductVariant) => {
        if (variant) {
            return (
                <CategoryCard
                    id = {variant.id}
                    title={variant.title}
                    image={variant.image}
                    is_leaf = {variant.is_leaf}
                    data={variant}
                    slug={variant.slug}
                    deviceType={deviceType}
                />
            );
        }
    }

    return (
        <>
            <VariantsRow>
                {item?.map((item: ProductVariant, index: number) => {
                    return(
                        <VariantCol
                            key={index}
                        >
                            <VariantCardWrapper>
                                <Fade
                                    duration={800}
                                    delay={index * 10}
                                    style={{ height: "100%" }}
                                >
                                    {renderCard(item)}
                                </Fade>
                            </VariantCardWrapper>
                        </VariantCol>
                    )
                 }
                )}
            </VariantsRow>
        </>
    );
};
export default Variants;