import React from "react";
import {useRouter} from "next/router";
import Router from 'next/router';
import { openModal } from "@redq/reuse-modal";
import AuthenticationForm from "features/authentication-form";
import { RightMenu } from "./menu/right-menu/right-menu";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper from "./header.style";
import LogoImage from "assets/images/shatkora-logo.svg";
import DefaultAvatar from "assets/images/default-avatar.png";
import { isCategoryPage } from "../is-home-page";
import Search from "features/search/search";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "redux/auth/reducer";
import { signOut, toggleSignInForm } from "redux/auth/action";

type RootState = {
    auth: AuthState;
}

type Props = {
    className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const { pathname, query} = useRouter();
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            Router.push('/').then()
            dispatch(signOut());
        }
    };

    const handleJoin = () => {
        dispatch(toggleSignInForm());

        openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: true,
            component: AuthenticationForm,
            closeComponent: "",
            config: {
                enableResizing: false,
                disableDragging: true,
                className: "quick-view-modal",
                width: 458,
                height: "auto",
            },
        });
    };

    const showSearch =
        isCategoryPage(query.type) ||
        pathname === "/furniture-two" ||
        pathname === "/grocery-two" ||
        pathname === "/bakery";
    return (

        <HeaderWrapper className={className} id="layout-header">
            <LeftMenu logo={LogoImage}/>
            <Search minimal={false} className="headerSearch"/>
            {/*{showSearch && <Search minimal={true} className="headerSearch"/>}*/}

            <RightMenu
                isAuthenticated={isAuthenticated}
                onJoin={handleJoin}
                onLogout={handleLogout}
                avatar={user?.avatar ?? DefaultAvatar}
            />
        </HeaderWrapper>
    );
};

export default Header;