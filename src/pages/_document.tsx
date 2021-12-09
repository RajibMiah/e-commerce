import Document, {DocumentContext, Head, Html, Main, NextScript,} from "next/document";
import {ServerStyleSheet} from "styled-components";
import ShatkoraFavicon from "assets/images/shatkora-favicon.svg";

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props: any) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta property="og:title" content="Shatkora" />
                    <meta property="og:description" content="Experience marvelous Online shopping in Sylhet with the free Shatkora Android and iOS app.
                    Shatkora e-commerce service will make your life in Sylhet much easier. We will save your valuable time and let you avoid wasting
                    hours in traffic, bad weather and waiting just to buy basic necessities. We are partnered with your most trusted brand Panshi bazar
                    sylhet to provide you all your home essentials."/>
                    <meta property="og:url" content="https://shatkora.co/grocery" />
                    <meta property="og:image" content="/shatkoraMetaimg.webp" />

                    {/*For twiter meta data */}
                    {/*<meta name="twitter:card"  content="Shatkora"  />*/}
                    {/*<meta name="twitter:title" content="SHOP ONLINE" />*/}
                    {/*<meta*/}
                    {/*    name="twitter:description"*/}
                    {/*    content="Experience marvelous Online shopping in Sylhet with the free Shatkora Android and iOS app.*/}
                    {/*Shatkora e-commerce service will make your life in Sylhet much easier. We will save your valuable time and let you avoid wasting*/}
                    {/*hours in traffic, bad weather and waiting just to buy basic necessities. We are partnered with your most trusted brand Panshi bazar*/}
                    {/*sylhet to provide you all your home essentials."*/}
                    {/*/>*/}
                    {/*<meta property="twitter:url" content="https://shatkora.co/grocery" />*/}
                    {/*<meta property="twitter:image" content="/shatkoraMetaimg.webp" />*/}

                    <link rel="shortcut icon" href={ShatkoraFavicon}/>
                    {/*<title>Shatkora</title>*/}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "http://schema.org/",
                                "@type": "WebSite",
                                "url": "https://shatkora.co/",
                                "name": "Shatkora",
                                "image": "/assets/images/shatkora-favicon.svg",
                                "description": "Experience marvelous Online shopping in Sylhet with the free Shatkora Android and iOS app.\n" +
                                    "                    Shatkora e-commerce service will make your life in Sylhet much easier. We will save your valuable time and let you avoid wasting\n" +
                                    "                    hours in traffic, bad weather and waiting just to buy basic necessities. We are partnered with your most trusted brand Panshi bazar\n" +
                                    "                    sylhet to provide you all your home essentials.",
                                address: {
                                    "@type": "PostalAddress",
                                    addressLocality: "Sylhet",
                                    addressRegion: "Bangladesh",
                                    postalCode: "3100",
                                    streetAddress: "1/3, Tarango, Mojumdari,\n" +
                                        "Airport Road,\n" +
                                        "Sylhet, Bangladesh"
                                },

                                email: "inverseaibd@gmail.com",
                            })
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "http://schema.org/",
                                "@type": "product",
                                "url": "https://shatkora.co/grocery",
                                "name": "grocery",
                                // "image": "/shatkoraMetaimg.webp",
                                "description": "Order grocery and food online with same-day home delivery. Save..",
                            })
                        }}
                    />

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "http://schema.org/",
                                "@type": "product",
                                "url": "https://shatkora.co/offer",
                                "name": "Offers",
                                // "image": "/shatkoraMetaimg.webp",
                                "description": "Shatkora always has fantastic offers on various items. Here you'll ..",
                            })
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "http://schema.org/",
                                "@type": "product",
                                "url": "https://shatkora.co/grocery?category=baby-oral-care",
                                "name": "Baby Care",
                                // "image": "/shatkoraMetaimg.webp",
                                "description": "Fooding - Bath & Skincare - Baby Accessories - Feeders..",
                            })
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "http://schema.org/",
                                "@type": "product",
                                "url": "https://shatkora.co/grocery",
                                "name": "Office Products",
                                // "image": "/shatkoraMetaimg.webp",
                                "description": "Order grocery and food online with same-day home delivery. Save..",
                            })
                        }}


                    />
                </Head>
                <body>
                <Main/>
                <div id="modal-root"/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}
