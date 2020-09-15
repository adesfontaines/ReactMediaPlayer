import { ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { Container } from 'reactstrap';
import MuiTheme from '../MuiTheme';
import FooterPlayer from './FooterPlayer';
import NavMenu from './NavMenu';
import SideMenu from './SideMenu';

export default (props: { children?: React.ReactNode }) => (
  <React.Fragment>
    <ThemeProvider theme={MuiTheme}>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
      <FooterPlayer />
    </ThemeProvider>
  </React.Fragment>
);
