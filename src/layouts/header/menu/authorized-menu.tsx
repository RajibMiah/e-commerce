import React from 'react';
import { FormattedMessage } from 'react-intl';
import NavLink from 'components/nav-link/nav-link';
import { AUTHORIZED_MENU_ITEMS } from 'site-settings/site-navigation';
import styled from "styled-components";

type Props = {
  onLogout: () => void;
};
const Icon = styled.span`
  width: 13%;
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Item = {
  id
  href,
  icon,
  alt,
  defaultMessage
}

export const AuthorizedMenu: React.FC<Props> = ({ onLogout }) => {
  return (
    <>
      {AUTHORIZED_MENU_ITEMS.map((item:Item, idx) => (
          <NavLink
              key={idx}
              className='menu-item'
              href={item.href}
              icon={item.icon}
              alt ={item.alt}
              label={item.defaultMessage}
              intlId={item.id}
          />
      ))}
      <div className='menu-item' onClick={onLogout}>
        <a>
          <Icon >
            <img
                src = '/icon-webp/logout.webp'
                alt = 'logout-icon'
            />
          </Icon>
          <span>
            <FormattedMessage id='nav.logout' defaultMessage='Logout' />
          </span>
        </a>
      </div>
    </>
  );
};
