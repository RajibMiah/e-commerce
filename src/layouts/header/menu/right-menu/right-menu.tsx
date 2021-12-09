import React from "react";
import dynamic from "next/dynamic";
import NavLink from "components/nav-link/nav-link";
import { HELP_MENU_ITEM, OFFER_MENU_ITEM } from "site-settings/site-navigation";
import LanguageSwitcher from "../language-switcher/language-switcher";
import { RightMenuBox } from "./right-menu.style";
import{PlaystoreDesktop} from "../../header.style";
import Link from "next/link";
const AuthMenu = dynamic(() => import("../auth-menu"), { ssr: false });

type Props = {
    onLogout: () => void;
    onJoin: () => void;
    avatar: string;
    isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
    onLogout,
    avatar,
    isAuthenticated,
    onJoin,
}) => {
    return (
        <RightMenuBox>

            <PlaystoreDesktop>
                <Link href={process.env.NEXT_PUBLIC_APP_PLAYSTORE_LINK}>
                    <a>
                        <img
                            src={'/playstore.webp'}
                            alt = 'play store icon'
                        />
                    </a>

                </Link>
            </PlaystoreDesktop>

            {/* will be visible when there is a offer */}
            {/* <NavLink
                className="menu-item"
                href={OFFER_MENU_ITEM.href}
                label={OFFER_MENU_ITEM.defaultMessage}
                intlId={OFFER_MENU_ITEM.id}
            /> */}
            <NavLink
                className="menu-item"
                href={HELP_MENU_ITEM.href}
                label={HELP_MENU_ITEM.defaultMessage}
                intlId={HELP_MENU_ITEM.id}
                iconClass="menu-icon"
                icon={'/icon-webp/question.webp'}
                alt={'help'}
            />
            <LanguageSwitcher/>

            <AuthMenu
                avatar={avatar}
                onJoin={onJoin}
                onLogout={onLogout}
                isAuthenticated={isAuthenticated}
            />
        </RightMenuBox>
    );
};