import Head from "next/head";
import { useRouter} from "next/router";
import React, { useEffect } from "react";

// the redirect will only happen on the client-side. This is by design,
const IndexPage: React.FC<{}> = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace("/[type]", "/grocery").then();
    }, []);

    return (
        <Head>
            <meta name="robots" content="noindex, nofollow"/>
        </Head>
    );
};

export default IndexPage;