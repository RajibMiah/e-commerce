import {Modal} from "@redq/reuse-modal";
import {openModal} from "@redq/reuse-modal";
import {SEO} from "components/seo";
import {ProfileProvider} from "contexts/profile/profile.provider";
import useUser from "data/use-user";
import Sidebar from "features/user-profile/sidebar/sidebar";
import {ContentBox, PageWrapper, SidebarSection,} from "features/user-profile/user-profile.style";
import Footer from "layouts/footer";
import {NextPage} from "next";
import Error from "next/error";
import React, {useEffect} from "react";
import Loader from "components/loader/loader";
import {LoaderBox} from "components/loader/loader.style";
import SettingsContent from "features/user-profile/settings/settings";
import WalletContent from 'features/user-profile/Wallet/wallet'
import ReferContent from 'features/user-profile/refer/refere'
import {useDispatch, useSelector} from "react-redux";
import {toggleSignInForm} from "../redux/auth/action";
import AuthenticationForm from "../features/authentication-form";
import {AuthState} from "../redux/auth/reducer";
import Unauthenticated from "components/error-message/unauthenticated";
import {Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import {useReferral} from "../data/use-referral";
import {ReferContainer} from "../features/user-profile/Wallet/wallet.style";


type Props = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

type RootState = {
    auth: AuthState;
}
const ProfilePage: NextPage<Props> = ({deviceType}) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const {query} = router
    const handleJoin = () => {
        dispatch(toggleSignInForm());

        openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: true,
            component: AuthenticationForm,
            //closeComponent: "",
            config: {
                enableResizing: true,
                disableDragging: true,
                className: "quick-view-modal",
                width: 458,
                height: "auto",
                animationFrom: {opacity: "0"}, // react-spring <Spring from={}> props value
                animationTo: {opacity: "1"}, //  react-spring <Spring to={}> props value
                transition: {
                    delay: 500,
                },
                withRnd: false,
            },
        });
    };

    useEffect((): any => {
        // if (!isAuthenticated) handleJoin();
        if (isAuthenticated) {
            if (error) return <Error message={error.message} statusCode={error.status}/>;
            if (!user) return <LoaderBox><Loader/></LoaderBox>;
        }
    }, [isAuthenticated]);

    const {user, error} = useUser();


    return isAuthenticated ? (
        <>
            <SEO title="Profile - Shatkora" description="Profile Details"/>
            <ProfileProvider user={user}>
                <Modal>
                    <PageWrapper>
                        <Grid container>
                            <Grid item lg={4} style={{display: 'flex', justifyContent: 'center'}}>
                                <SidebarSection>
                                    <Sidebar/>
                                </SidebarSection>
                            </Grid>
                            <Grid item xs/>
                            <Grid item xs={12} md={12} lg={8}>
                                <ContentBox>
                                    {(query.find === 'my-wallet') && <WalletContent/>}
                                    {(query.find === 'refer') && <ReferContainer><ReferContent/></ReferContainer>}
                                    {(query.find === 'setting' || !query.find) &&
                                    <SettingsContent deviceType={deviceType}/>}
                                </ContentBox>
                            </Grid>
                        </Grid>

                        <Footer/>
                    </PageWrapper>
                </Modal>
            </ProfileProvider>
        </>
    ) : (
        <Unauthenticated title={"You must be sign in to view this page"} statusCode={''} deviceType={deviceType}/>
    );
};

export default ProfilePage;
