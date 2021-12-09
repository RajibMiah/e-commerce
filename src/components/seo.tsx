import React from 'react';
import Head from 'next/head';
import {Helmet} from "react-helmet";

type SeoProps = {
    title: string;
    description: string;
    canonical?: string;
    css?: string;
    js?: string;
    image?: string;
    url?: string
};

export const SEO: React.FC<SeoProps> = ({
                                            title,
                                            description,
                                            canonical,
                                            css,
                                            js,
                                            image,
                                            url
                                        }) => (
    <Helmet>
        {/*{console.log('title' , title ,"description" , description,  'image' , image , 'url' , url)}*/}
        <meta charSet="utf-8" />
        <title>{title ? title : 'Shatkora-Online Grocery Shop' }</title>
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width,maximum-scale=1,initial-scale=1"/>


        <meta property="og:type" content="website"/>
        <meta name="og:title" property="og:title" content={title}/>
        <meta name="og:description" property="og:description" content={description}/>
        <meta property="og:site_name" content={title}/>
        <meta property="og:url" content={url}/>
        <meta property="og:image" content={image}/>
        {/*<meta property="og:url" content={`${canonical}`}/>*/}
        {css && <link rel="stylesheet" href={`${css}`}/>}
        {/*{image ? (*/}
        {/*    <meta property="og:image" content={`${image}`}/>*/}
        {/*) : (*/}
        {/*    <meta*/}
        {/*        property="og:image"*/}
        {/*        content={url}*/}
        {/*    />*/}
        {/*)}*/}


        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:site" content="@propernounco"/>
        <meta name="twitter:creator" content="@propernounco"/>
        {image && <meta name="twitter:image" content={`${image}`}/>}
        {canonical && <link rel="canonical" href={`${canonical}`}/>}
        {js && <script type="text/javascript" src={`${js}`}></script>}
    </Helmet>
);
