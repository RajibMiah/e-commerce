import React from "react";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@redq/reuse-modal";
import MobileDrawer from "./mobile-drawer";
import {
    DrawerWrapper,
    LogoWrapper,
    MobileHeaderInnerWrapper,
    MobileHeaderWrapper,
    SearchModalClose,
    SearchModalWrapper,
    SearchWrapper,
} from "./header.style";
import Search from "features/search/search";
import LogoImage from "assets/images/shatkora-logo.svg";

import { SearchIcon } from "assets/icons/SearchIcon";
import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import Logo from "layouts/logo/logo";
import LanguageSwitcher from "layouts/header/menu/language-switcher/language-switcher";
import { isCategoryPage } from "../is-home-page";
import useDimensions from "utils/useComponentSize";
import {sitePages} from "site-settings/site-pages";
import {useMedia} from "utils/use-media";

type MobileHeaderProps = {
    deviceType?: {
        mobile: string;
        tablet: string;
        desktop: boolean;
    };
    className?: string;
    closeSearch?: any;
};

const SearchModal: React.FC<{}> = () => {
    const onSubmit = () => {
        closeModal();
    };
    return (
        <SearchModalWrapper>
            <SearchModalClose type="submit" onClick={() => closeModal()}>
                <LongArrowLeft/>
            </SearchModalClose>
            <Search
                className="header-modal-search"
                showButtonText={false}
                onSubmit={onSubmit}
            />
        </SearchModalWrapper>
    );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({  className}) => {
    const { pathname, query } = useRouter();
    const mobile = useMedia("(max-width: 580px)");
    const tablet = useMedia("(max-width: 991px)");
    const desktop = useMedia("(min-width: 992px)");
    const [mobileHeaderRef, dimensions] = useDimensions();

    const handleSearchModal = () => {
        openModal({
            show: true,
            config: {
                enableResizing: false,
                disableDragging: true,
                className: "search-modal-mobile",
                width: "100%",
                height: "100%",
            },
            closeOnClickOutside: false,
            component: SearchModal,
            closeComponent: () => <div/>,
        });
    };
    const type = pathname === "/restaurant" ? "restaurant" : query.type;
    const PAGE_TYPE = "grocery";
    const page = sitePages[PAGE_TYPE];
    const isHomePage = isCategoryPage(type);

    return (
        <MobileHeaderWrapper>
            <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
                <DrawerWrapper>
                    <MobileDrawer/>
                </DrawerWrapper>


                <LogoWrapper>
                    <Logo imageUrl={LogoImage} alt="shop logo"/>
                </LogoWrapper>

                {/*<VariantFilter/>*/}
                <LanguageSwitcher/>

                {isHomePage ? (
                    <SearchWrapper
                        onClick={handleSearchModal}
                        className="searchIconWrapper"
                    >
                        <SearchIcon/>
                    </SearchWrapper>
                ) : null}
            </MobileHeaderInnerWrapper>
        </MobileHeaderWrapper>
    );
};

export default MobileHeader;