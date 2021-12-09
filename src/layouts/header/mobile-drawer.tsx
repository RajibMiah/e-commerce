import React, {useState} from "react";
import {openModal} from "@redq/reuse-modal";
import {FormattedMessage} from "react-intl";
import {Scrollbar} from "components/scrollbar/scrollbar";
import Drawer from "components/drawer/drawer";
import {Button} from "components/button/button";
import NavLink from "components/nav-link/nav-link";
import {CloseIcon} from "assets/icons/CloseIcon";
import AuthenticationForm from "features/authentication-form";
import {
    DrawerBody,
    HamburgerIcon,
    DrawerContentWrapper,
    DrawerClose,
    DrawerProfile,
    LogoutView,
    LoginView,
    UserAvatar,
    UserDetails,
    DrawerMenu,
    DrawerMenuItem,
    UserOptionMenu,
} from "./header.style";
import DefaultAvatar from "assets/images/default-avatar.png";
import {
    MOBILE_DRAWER_MENU,
} from "site-settings/site-navigation";
import {useAppState, useAppDispatch} from "contexts/app/app.provider";
import {useDispatch, useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import {signOut, toggleSignInForm} from "redux/auth/action";
import styled from "styled-components";
import {Divider, IconButton, Typography} from "@material-ui/core";
import WhatsappIcon from "../../assets/icons/whatsapp";
import EmailIcon from "../../assets/icons/Email";
import {FcCallback} from "react-icons/fc";
import {Facebook} from "../../assets/icons/Facebook";
// import useUser from "data/use-user";


const Icon = styled.span`
  width: 8%;
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


type RootState = {
    auth: AuthState;
}

const MobileDrawer: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    const [whatsUpNo, setWhatsUpNo] = useState<number>(1323995987)
    const isDrawerOpen = useAppState("isDrawerOpen");
    const appDispatch = useAppDispatch();
    const toggleHandler = React.useCallback(() => {
        appDispatch({
            type: "TOGGLE_DRAWER",
        });
    }, [appDispatch]);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            dispatch(signOut());
            // Router.push("/");
        }
    };

    const signInOutForm = () => {
        appDispatch({
            type: "TOGGLE_DRAWER",
        });

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

    return (
        <Drawer
            width='316px'
            drawerHandler={
                <HamburgerIcon>
                    <span/>
                    <span/>
                    <span/>
                </HamburgerIcon>
            }
            open={isDrawerOpen}
            toggleHandler={toggleHandler}
            closeButton={
                <DrawerClose>
                    <CloseIcon/>
                </DrawerClose>
            }
        >
            <DrawerBody>
                <Scrollbar className='drawer-scrollbar'>
                    <DrawerContentWrapper>
                        <DrawerProfile>
                            {isAuthenticated ? (
                                <LoginView>
                                    <UserAvatar>
                                        <img src={user?.avatar ?? DefaultAvatar} alt='user_avatar'/>
                                    </UserAvatar>
                                    <UserDetails>
                                        <h3>{user?.first_name} {user?.last_name}</h3>
                                        <span>{user?.email}</span>
                                    </UserDetails>
                                </LoginView>
                            ) : (
                                <LogoutView>
                                    <Button variant='primary' onClick={signInOutForm}>
                                        <FormattedMessage
                                            id='mobileSignInButtonText'
                                            defaultMessage='join'
                                        />
                                    </Button>
                                </LogoutView>
                            )}
                        </DrawerProfile>

                        <DrawerMenu>
                            {MOBILE_DRAWER_MENU.map((item) => (
                                <DrawerMenuItem key={item.id}>
                                    <NavLink
                                        icon={item?.icon}
                                        onClick={toggleHandler}
                                        href={item.href}
                                        label={item.defaultMessage}
                                        intlId={item.id}
                                        className='drawer_menu_item'
                                    />
                                </DrawerMenuItem>
                            ))}
                            {isAuthenticated && (
                                <UserOptionMenu>
                                    <DrawerMenuItem style = {{display:'flex' , paddingLeft:"3rem"}}>
                                        <Icon>
                                            <img
                                                src='/icon-webp/logout.webp'
                                                alt='logout-icon'
                                            />
                                        </Icon>
                                        <div onClick={handleLogout} className='drawer_menu_item'>
                                              <span>
                                                  Logout
                                              </span>
                                        </div>
                                    </DrawerMenuItem>
                                </UserOptionMenu>
                            )}
                        </DrawerMenu>

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
                    </DrawerContentWrapper>
                </Scrollbar>
            </DrawerBody>
        </Drawer>
    );
};

export default MobileDrawer;