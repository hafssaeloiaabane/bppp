import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          Copyright © 2017 Groupe Banque Populaire - Mentions légales 
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
