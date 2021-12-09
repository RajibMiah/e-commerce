export const HOME_PAGE = "/";
export const GROCERY_PAGE = "/grocery";
export const GROCERY_PAGE_TWO = "/grocery-two";
export const MAKEUP_PAGE = "/makeup";
export const CLOTHING_PAGE = "/clothing";
export const BAGS_PAGE = "/bags";
export const BAKERY_PAGE = "/bakery";
export const BOOK_PAGE = "/book";
export const FURNITURE_PAGE = "/furniture";
export const FURNITURE_PAGE_TWO = "/furniture-two";
export const MEDICINE_PAGE = "/medicine";
export const RESTAURANT_PAGE = "/restaurant";
export const REQUEST_MEDICINE_PAGE = "/request-medicine";
export const CHECKOUT_PAGE = "/checkout";
export const CHECKOUT_PAGE_TWO = "/checkout-alternative";
export const PROFILE_PAGE = "/profile?find=setting";
export const REFER = "/profile?find=refer";
export const MY_WALLET = '/profile?find=my-wallet'
export const TO_REVIEW_PAGE = "/to-review";
export const YOUR_ORDER_PAGE = "/order";
export const ORDER_RECEIVED_PAGE = "/order-received";
export const OFFER_PAGE = "/offer";
export const HELP_PAGE = "/help";
export const TERMS_AND_SERVICES_PAGE = "/terms";
export const PRIVACY_POLICY_PAGE = "/privacy";


export const HOME_MENU_ITEM = {
    id: "nav.home",
    defaultMessage: "Home",
    href: HOME_PAGE,
    icon: '/icon-webp/home.webp',
    alt: 'home-icon'
};

export const HELP_MENU_ITEM = {
    id: "nav.help",
    defaultMessage: "Help",
    href: HELP_PAGE,
    icon: '/icon-webp/question.webp',
    alt: 'question-icon',
};
export const OFFER_MENU_ITEM = {
    id: "nav.offer",
    defaultMessage: "Offer",
    icon: '/icon-webp/offer.webp',
    alt: 'offer-icon',
    href: OFFER_PAGE,
};
export const ORDER_MENU_ITEM = {
    id: "nav.order",
    href: YOUR_ORDER_PAGE,
    defaultMessage: "Order",
    icon: '/icon-webp/order.webp',
    alt: 'order-icon'
};
export const PROFILE_MENU_ITEM =
    {
        id: "nav.profile",
        defaultMessage: "Profile",
        href: PROFILE_PAGE,
        icon: "/icon-webp/user.webp",
        alt: 'profile-icon'
    }

export const REFER_MENU_ITEM =
    {
        id: "nav.refer",
        defaultMessage: "Refer",
        href: REFER,
        icon: '/icon-webp/refericon.webp',
        alt: 'wallet-icon'
    }

export const MY_WALLET_MENU_ITEM =
    {
        id: "nav.my_wallet",
        defaultMessage: "My Wallet",
        href: MY_WALLET,
        icon: '/icon-webp/wallet.webp',
        alt: 'wallet-icon'
    }

// export const WALLET_MENU_ITEM = {
//     id: "nav.profile",
//     defaultMessage: "Wallet",
//     href: WALLET_PAGE,
//     icon: "icon-webp/user.webp",
//     alt: 'wallet-icon'
// };

export const TO_REVIEW_MENU_ITEM = {
    id: "nav.to_review",
    defaultMessage: "To Review",
    href: TO_REVIEW_PAGE,
    icon: '/icon-webp/review.webp'
};
export const LOG_OUT = {
    id: "nav.to_review",
    defaultMessage: "Logout",
    href: '/',
    icon: '/icon-webp/logout.webp',
    alt: 'logout-icon'
}

export const AUTHORIZED_MENU_ITEMS = [
    {
        id: "nav.profile",
        defaultMessage: "Profile",
        href: PROFILE_PAGE,
        icon: "/icon-webp/user.webp",
        alt: 'profile-icon'
    },
    MY_WALLET_MENU_ITEM,
    REFER_MENU_ITEM,
    {
        id: "nav.checkout",
        defaultMessage: "Checkout",
        href: CHECKOUT_PAGE,
        icon: '/icon-webp/checkout.webp',
        alt: 'checkout-icon'
    },
    TO_REVIEW_MENU_ITEM,
    ORDER_MENU_ITEM,
    {
        id: "nav.terms_and_services",
        defaultMessage: "Terms and Services",
        href: TERMS_AND_SERVICES_PAGE,
        icon: '/icon-webp/terms.webp',
        alt: 'terms-policy'
    },
    {
        id: "nav.privacy_policy",
        defaultMessage: "Privacy Policy",
        href: PRIVACY_POLICY_PAGE,
        icon: '/icon-webp/privacy.webp',
        alt: 'privacy-policy'
    },
];

export const MOBILE_DRAWER_MENU = [
    HOME_MENU_ITEM,
    ...AUTHORIZED_MENU_ITEMS,
    HELP_MENU_ITEM,
    OFFER_MENU_ITEM,
];

export const PROFILE_SIDEBAR_BOTTOM_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM, TO_REVIEW_MENU_ITEM];
export const PROFILE_SIDEBAR_TOP_MENU = [PROFILE_MENU_ITEM , MY_WALLET_MENU_ITEM, REFER_MENU_ITEM];

export const LANGUAGE_MENU = [
    {
        id: "en",
        defaultMessage: "English",
        icon: "USFlag",
    },
    {
        id: "bn",
        defaultMessage: "বাংলা",
        icon: "BDFlag",
    }
];


export const filter_menu = [
    {
        id: "0",
        defaultMessage: "Default",
        icon: "USFlag",
        href: "default"
    },
    {
        id: "1",
        defaultMessage: "Price - Low to High",
        icon: "USFlag",
        href: "original_price"
    },
    {
        id: "2",
        defaultMessage: "Price - High to Low",
        icon: "USFlag",
        href: "-original_price"
    },
    {
        id: "3",
        defaultMessage: "Rating - High to Low",
        icon: "USFlag",
        href: "-rating"
    },

];