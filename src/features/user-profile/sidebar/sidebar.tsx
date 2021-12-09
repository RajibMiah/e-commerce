import React, {useContext, useState} from 'react';
import Router from 'next/router';
import {AuthContext} from 'contexts/auth/auth.context';
import {
    SidebarWrapper,
    SidebarTop,
    SidebarBottom,
    SidebarMenu,
    LogoutButton,
} from './sidebar.style';
import {FormattedMessage} from 'react-intl';
import {
    PROFILE_SIDEBAR_TOP_MENU,
    PROFILE_SIDEBAR_BOTTOM_MENU,
} from 'site-settings/site-navigation';
import {signOut} from "redux/auth/action";
import {useDispatch} from "react-redux";
import {Divider, IconButton, Typography} from "@material-ui/core";
import {FcCallback} from 'react-icons/fc'
import {AiFillFacebook} from 'react-icons/ai'
import WhatsappIcon from "assets/icons/whatsapp";
import EmailIcon from "assets/icons/Email";
import {Facebook} from "assets/icons/Facebook";


const SidebarCategory: React.FC<{}> = () => {
    const {authDispatch} = useContext<any>(AuthContext);
    const [whatsUpNo, setWhatsUpNo] = useState<number>(1323995987)
    const dispatch = useDispatch()
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            dispatch(signOut());
            Router.push("/").then();
        }
    };
    return (
        <>
            <SidebarWrapper>
                <SidebarBottom>
                    {PROFILE_SIDEBAR_TOP_MENU.map((item, index) => (
                        <SidebarMenu key = {index} href={item.href}  intlId={item.id}  />
                    ))}
                </SidebarBottom>
                <SidebarTop>
                    {PROFILE_SIDEBAR_BOTTOM_MENU.map((item, index) => (
                        <SidebarMenu key = {index} href={item.href}  intlId={item.id}  />
                    ))}
                    <LogoutButton type="button" onClick={handleLogout}>
                        <FormattedMessage id="nav.logout" defaultMessage="Logout"/>
                    </LogoutButton>
                </SidebarTop>

                <Divider/>
                <div style={{display: 'flex', justifyContent: "center", marginTop:'13px'}}>
                    <Typography
                        variant='body1'
                    >
                        Contact us
                    </Typography>
                </div>
                <div style={{display: 'flex', justifyContent: "center"}}>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                            window !== undefined && window.open('https://api.whatsapp.com/send?phone=+880' + whatsUpNo)
                        }}
                    >
                        <WhatsappIcon/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                            window !== undefined && window.open('mailto: shathkora.ec@gmail.com')
                        }}
                    >
                        <EmailIcon/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        style = {{fontSize:'21px'}}
                        onClick={() => {
                            window !== undefined && window.open('tel:01323995987')
                        }}
                    >
                        <FcCallback/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                            window !== undefined && window.open('https://www.facebook.com/shatkoraInverseai/')
                        }}
                    >
                        <Facebook/>
                    </IconButton>

                </div>

            </SidebarWrapper>
        </>
    );
};

export default SidebarCategory;
