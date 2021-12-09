import React from 'react';
import {Box, SelectedItem, Flag, MenuItem, PlayStore} from './language-switcher.style';
import Popover from 'components/popover/popover';
import {FormattedMessage} from 'react-intl';
import * as flagIcons from 'assets/icons/flags';
import {useLocale} from 'contexts/language/language.provider';
import {LANGUAGE_MENU} from 'site-settings/site-navigation';
import {
    isIOS,
    isAndroid,
    isBrowser,
    isSafari
} from 'mobile-device-detect';


const FlagIcon = ({name}) => {
    const TagName = flagIcons[name];
    return !!TagName ? <TagName/> : <p>Invalid icon {name}</p>;
};

const LanguageMenu = ({onClick}) => {
    return (
        <>
            {LANGUAGE_MENU.map((item) => (
                <MenuItem onClick={onClick} key={item.id} value={item.id}>
          <span>
            <FlagIcon name={item.icon}/>
          </span>
                    <FormattedMessage id={item.id} defaultMessage={item.defaultMessage}/>
                </MenuItem>
            ))}
        </>
    );
};


const LanguageSwitcher: React.FC<{}> = () => {
    const {locale, changeLanguage} = useLocale();
    const selectedLanguage = LANGUAGE_MENU.find((x) => x.id === locale);
    const languageChangeHandler = (e) => {
        changeLanguage(e.target.value);
    };


    const handleAppOpen = () => {
        if (isAndroid || (isBrowser && !isSafari)) {
            let now = new Date().valueOf();
            /*
            * handle people returning to the browser after launching the app - that the setTimeout function will run
            *  whenever they do.
            * */
            setTimeout(function () {
                if (new Date().valueOf() - now > 100) return;
                console.log('play store init')
                // @ts-ignore
                window.location = process.env["NEXT_PUBLIC_APP_PLAYSTORE_LINK"]
            }, 25);
            // @ts-ignore
            window.location = process.env["NEXT_PUBLIC_APP_IOS_INTENT "]
        } else if (isIOS || isSafari) {
            let now = new Date().valueOf();
            setTimeout(function () {
                if (new Date().valueOf() - now > 100) return;
                // @ts-ignore
                window.location = process.env["NEXT_PUBLIC_APP_IOS_LINK"]
            }, 25);
            // @ts-ignore
            window.location = process.env["NEXT_PUBLIC_APP_IOS_INTENT"]
        }
    }

    return (
        <>
            <PlayStore>
                <div onClick={handleAppOpen}>
                    <img
                        src={ isAndroid || (isBrowser && !isSafari) ? '/play-store.png' : '/app-store.svg'}
                        alt='play store icon'
                    />
                </div>
            </PlayStore>
            <Box>
                <Popover
                    className="right"
                    handler={
                        <SelectedItem>
                            <Flag>
                                <FlagIcon name={selectedLanguage?.icon}/>
                            </Flag>
                            <span>
                      <FormattedMessage
                          id={selectedLanguage?.id}
                          defaultMessage={selectedLanguage?.defaultMessage}
                      />
                    </span>
                        </SelectedItem>
                    }
                    content={<LanguageMenu onClick={languageChangeHandler}/>}
                />
            </Box>
        </>
    )
        ;
}

export default LanguageSwitcher;
