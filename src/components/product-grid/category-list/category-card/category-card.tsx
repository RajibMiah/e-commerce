import React from 'react';
import {useRouter} from 'next/router';
import Image from 'components/image/image';
import {
    ProductCardWrapper,
    ProductImageWrapper,
    ProductInfo,
} from './category-card.style';
import {isChildren, storeChildren} from "../../../../redux/category/action";
import {useDispatch} from "react-redux";
import {SEO} from "../../../seo";
import {grocery_seo_data} from "../../../../seo-page-data/grocery-seo-data";


type ProductCardProps = {
    title: string;
    image: any;
    value?: any;
    deviceType?: any;
    data?: any;
    id: number;
    slug: string;
    is_leaf?: boolean
};

const ProductCard: React.FC<ProductCardProps> = ({
                                                     is_leaf,
                                                     id,
                                                     data,
                                                     slug,
                                                     image,
                                                     title,
                                                     deviceType,
                                                 }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const {pathname, query} = router;
    const {type, ...rest} = query;
    React.useEffect(() => {
    }, [])

    const handleAddClick = (e) => {
        e.stopPropagation();
    };
    const handleRemoveClick = (e) => {
        e.stopPropagation();

    };
    const handleQuickViewModal = () => {

        if (!is_leaf) {
            router.push(
                {
                    pathname,
                    query: {parent__slug: slug},
                },
                {
                    pathname: `/${type}`,
                    query: {parent__slug: slug},
                }
            );
        } else {
            dispatch(isChildren())
            router.push(
                {
                    pathname,
                    query: {category: data.slug},
                },
                {
                    pathname: `/${type}`,
                    query: {category: data.slug},
                }
            );
        }
    };

    return (
        <>
            <SEO
                title={query.parent__slug as string}
                description={grocery_seo_data.description}
                image={image}
                url={`https://shatkora.co/?parent__slug=${query.parent__slug}`}
            />
            <ProductCardWrapper onClick={handleQuickViewModal} className="product-card">
                <ProductImageWrapper>
                    <Image
                        url={image}
                        className="product-image"
                        style={{position: 'relative'}}
                        alt={title}
                    />
                </ProductImageWrapper>
                <ProductInfo>
                    <h3 className="product-title">{title}</h3>
                </ProductInfo>
            </ProductCardWrapper>
        </>
    );
}
// @ts-ignore
export default ProductCard