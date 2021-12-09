import React, {useState} from "react";
import {useRouter} from "next/router";
import Sticky from "react-stickynode";
import {Scrollbar} from "components/scrollbar/scrollbar";
import {useLocale} from "contexts/language/language.provider";
import {useAppState} from "contexts/app/app.provider";
import {SidebarLoader, SidebarMobileLoader,} from "components/placeholder/placeholder";
import {CategoryWrapper, PopoverWrapper, SidebarWrapper, TreeWrapper,} from "./sidebar.style";
import {TreeMenu} from "components/tree-menu/tree-menu";
import CategoryWalker from "components/category-walker/category-walker";
import {isChildren} from "../../redux/category/action";
import {useDispatch} from "react-redux";
import {NextPage} from "next";

type SidebarCategoryProps = {
    deviceType: {
        mobile: string;
        tablet: string;
        desktop: boolean;
    };
    type: string;
    data:any
};

export const SidebarCategory: NextPage<SidebarCategoryProps>  = ({
                                                             deviceType: {mobile, tablet, desktop},
                                                             data
                                                         }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [isOpen, setOpen] = useState<boolean>(false)
    // if (error) return <ErrorMessage message={error.message}/>;
    const {pathname, query} = router;
    const selectedQueries = query.category;
    const {isRtl} = useLocale();

    const onCategoryClick = (slug: string, parentSlug: string) => {
        const {type, ...rest} = query;
        if (type && slug && !parentSlug) {
            dispatch(isChildren())
            router.push(
                {
                    pathname,
                    query: {category: slug},
                },
                {
                    pathname: `/${type}`,
                    query: {category: slug},
                }
            ).then();
        } else if (parentSlug) {
            router.push(
                {
                    pathname,
                    query: {parent__slug: parentSlug},
                },
                {
                    pathname: `/${type}`,
                    query: {parent__slug: parentSlug},
                }
            ).then();
        }
    };
    const isSidebarSticky = useAppState("isSidebarSticky");

    if (!data) {
        if (mobile || tablet) {
            return <SidebarMobileLoader/>;
        }
        return <SidebarLoader/>;
    }
    return (
        <CategoryWrapper>
            {
                mobile ?
                    <PopoverWrapper>
                        {/*isopen and setOpn is for mobile drawer dropdown*/}
                        <CategoryWalker isOpen={isOpen} setOpen={setOpen}>
                            <TreeMenu
                                setMobilePopup={setOpen}
                                data={data}
                                onClick={onCategoryClick}
                                active={selectedQueries}
                            />
                        </CategoryWalker>
                    </PopoverWrapper>
                    :
                    <SidebarWrapper style={{paddingTop: 45}}>
                        <Sticky enabled={isSidebarSticky} top={110}>
                            <Scrollbar className='sidebar-scrollbar'>
                                <TreeWrapper>
                                    <TreeMenu
                                        data={data}
                                        setMobilePopup={setOpen}
                                        onClick={onCategoryClick}
                                        active={selectedQueries}
                                    />
                                </TreeWrapper>
                            </Scrollbar>
                        </Sticky>
                    </SidebarWrapper>
            }
        </CategoryWrapper>
    );
};
export default SidebarCategory;
