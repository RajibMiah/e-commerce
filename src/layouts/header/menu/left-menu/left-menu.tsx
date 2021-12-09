import React from "react";
import { useRouter } from "next/router";
import Logo from "layouts/logo/logo";
import { LeftMenuBox, } from "./left-menu.style";
import Link from 'next/link'
import {useDispatch} from 'react-redux'
import {isChildren} from "redux/category/action";


type Props = {
    logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    return (
        <Link href="/">
            <a>
                <LeftMenuBox>
                    <Logo
                        imageUrl={logo}
                        alt={"Shop Logo"}
                         onClick={() => dispatch(isChildren())}
                    />
                </LeftMenuBox>
            </a>

        </Link>

    );
};
