import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import firebase from 'utils/firebase/firebase-config'
import {useRouter} from "next/router";
import Carousel from "components/carousel/carousel";
import {MobileBanner} from "components/banner/mobile-banner";
import {
    ContentSection,
    MainContentArea,
    MobileCarouselDropdown,
    OfferSection,
    SidebarSection,
} from "assets/styles/pages.style";
// Static Data Import Here
import {siteOffers} from "site-settings/site-offers";
import {sitePages} from "site-settings/site-pages";
import {SEO} from "components/seo";
import {useRefScroll} from "utils/use-ref-scroll";
import {ModalProvider} from "contexts/modal/modal.provider";
import {useDispatch, useSelector} from 'react-redux'
import CategoryCard from "components/product-grid/category-list/category-list";
import useCategoryParent from 'data/use-category-parent'
import {storeChildrenByNetworkCall} from "redux/category/action";
import {grocery_seo_data} from "../seo-page-data/grocery-seo-data";
import VariantFilter from "../layouts/header/menu/variants-order-sort/variant-filter";
import {getStaticCategories} from "../data/use-category";
import Notification from "components/meterial-ui/Notification-message";


//dynamic import
const Sidebar = dynamic(() => import("layouts/sidebar/sidebar"), {
    ssr: false,
});
const Variants = dynamic(() =>
    import("components/product-grid/product-list/variant-list")
);
const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
    ssr: false,
});


type RootState = {
    subcategories: any;
    child: any;
    auth: {
        isAuthenticated,
        referralInfo: {
            total_referee: number
        }
    }

}

const CategoryPage: React.FC<any> = ({deviceType , data}) => {
    const {query} = useRouter();
    const dispatch = useDispatch()
    let hasChildren = useSelector((state: RootState) => state.subcategories.hasChildren);
    const childSelector = useSelector((state: RootState) => state.subcategories.child);
    const {parentCategories} = useCategoryParent({parentSlug: query.parent__slug || null})

   // for spacial notification
    const [notify, setNotify] = React.useState({
        open: false,
        title: '',
        msg: 'ঈদুল আযহার  কারণে সাতকরা গ্রোসারি ডেলিভারি সার্ভিস ২৫ জুলাই থেকে পুনরায় চালু হবে। সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত!'
    })

    const {elRef: targetRef, scroll} = useRefScroll({
        percentOfElement: 0,
        percentOfContainer: 0,
        offsetPX: -110,
    });
    useEffect(() => {
        firebase.analytics().logEvent("homepage_visited");
    }, [])

    useEffect(() => {
        if (query.text || query.category) {
            scroll();
        }
        if (parentCategories && query.parent__slug)
            dispatch(storeChildrenByNetworkCall(parentCategories.results))

    }, [query.text, query.category, childSelector, parentCategories]);


    const PAGE_TYPE = "grocery";
    const page = sitePages[PAGE_TYPE];
    if (!page) return null;

    return (
        <>
            <SEO
                title={grocery_seo_data.title}
                description={grocery_seo_data.description}
                image={grocery_seo_data.image}
                url={grocery_seo_data.url}
            />
            <ModalProvider>
                <MobileBanner intlTitleId={page?.banner_title_id} type={PAGE_TYPE}/>
                <OfferSection>
                    <div style={{margin: "3rem -10px"}}>
                        <Carousel  deviceType={deviceType} data={siteOffers}/>
                    </div>
                </OfferSection>
                {
                    deviceType.mobile &&
                    <div style={{display: "flex"}}>
                        <MobileCarouselDropdown>
                            <Sidebar data = {data} type={PAGE_TYPE} deviceType={deviceType}/>
                        </MobileCarouselDropdown>

                        {/*mobile view variant filter component*/}

                        <VariantFilter/>
                    </div>
                }

                <MainContentArea>
                    {
                        deviceType.desktop &&
                        <SidebarSection>
                            <Sidebar data = {data} type={PAGE_TYPE} deviceType={deviceType}/>
                        </SidebarSection>
                    }
                    <ContentSection>
                        <div ref={targetRef}>
                            {
                                hasChildren ?
                                    <>
                                        {deviceType.desktop && <VariantFilter/>}
                                        <Variants
                                            type={PAGE_TYPE}
                                            deviceType={deviceType}
                                            fetchLimit={10}
                                        />
                                    </>

                                    :
                                    <CategoryCard
                                        item={parentCategories.results || childSelector}
                                        deviceType={deviceType}
                                    />
                            }
                        </div>
                    </ContentSection>
                </MainContentArea>
                <CartPopUp deviceType={deviceType}/>
            </ModalProvider>
            <Notification
                confirmDialog={notify}
                setConfimDialog={setNotify}
            />
        </>
    );
};

export async function getStaticPaths() {
    return {
        paths: [
            '/grocery',
        ],
        fallback: true,
    }
}

export async function getStaticProps() {
    const data = await getStaticCategories();
    return {
        props: {
            data,
        },
    }
}

export default CategoryPage;
