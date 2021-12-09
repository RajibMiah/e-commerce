import React from "react";
import {ThemeProvider} from "styled-components";
import {defaultTheme} from "site-settings/site-theme/default";
import {AppProvider} from "contexts/app/app.provider";
import {AuthProvider} from "contexts/auth/auth.provider";
import {LanguageProvider} from "contexts/language/language.provider";
import {CartProvider} from "contexts/cart/use-cart";
import {useMedia} from "utils/use-media";
import AppLayout from "layouts/app-layout";
import {Modal} from "@redq/reuse-modal";
import {ThemeProvider as MuThemeProvider} from '@material-ui/core';
import Theme from 'site-settings/meterial-ui-theme/Theme';
import Router from "next/router";

// External CSS import here
import "swiper/swiper-bundle.min.css";
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-multi-carousel/lib/styles.css";
import "components/multi-carousel/multi-carousel.style.css";
import "react-spring-modal/dist/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/scrollbar/scrollbar.css";
import "@redq/reuse-modal/lib/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {GlobalStyle} from "assets/styles/global.style";

// Language translation messages
import {messages} from "site-settings/site-translation/messages";

// need to provide types
import "typeface-lato";
import "typeface-poppins";
import {AppProps} from "next/app";
import {wrapper} from "redux/store";
import {PersistGate} from "redux-persist/integration/react";
import { useStore} from "react-redux";

import OrderReviewProvider from "features/order-review-provider/order-review-provider";


function FacebookPixel() {
    React.useEffect(() => {
        import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init('447187903015064');
                ReactPixel.pageView();

                Router.events.on("routeChangeComplete", () => {
                    ReactPixel.pageView();
                });
            });
    });
    return null;
}



const WrappedApp = ({Component, pageProps}: AppProps) => {
    const mobile = useMedia("(max-width: 580px)");
    const tablet = useMedia("(max-width: 991px)");
    const desktop = useMedia("(min-width: 992px)");
    const store: any = useStore();

    return (
        <MuThemeProvider theme={Theme}>
            <ThemeProvider theme={defaultTheme}>
                <PersistGate loading={null} persistor={store.__persistor}>
                    <LanguageProvider messages={messages}>
                            <CartProvider>
                                <AppProvider>
                                    <AuthProvider>
                                        <AppLayout>
                                            <FacebookPixel/>
                                            <Component
                                                {...pageProps}
                                                deviceType={{mobile, tablet, desktop}}
                                            />
                                            <Modal/>
                                            <OrderReviewProvider/>
                                        </AppLayout>
                                        <GlobalStyle/>
                                    </AuthProvider>
                                </AppProvider>
                            </CartProvider>
                    </LanguageProvider>
                </PersistGate>
            </ThemeProvider>
        </MuThemeProvider>
    );
};

export default wrapper.withRedux(WrappedApp);
