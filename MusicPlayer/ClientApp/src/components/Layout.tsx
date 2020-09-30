import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Container } from 'reactstrap';
import FooterPlayer from './FooterPlayer';
import MediaPlayerAppBar from './MediaPlayerAppBar';
import MusicPlayerDrawer from './MusicPlayerDrawer';
import MuiTheme from '../MuiTheme';
import MuiStyles from '../MuiStyles';

export default (props: { children?: React.ReactNode }) => (

  <React.Fragment>
    <ThemeProvider theme={MuiTheme}>
      <div className={MuiStyles().root}>
        <CssBaseline />
        <MediaPlayerAppBar />
        <main className={MuiStyles().content}>
          <div className={MuiStyles().toolbar} />
          <MusicPlayerDrawer />
          <Container>
            {props.children}
          </Container>
        </main>
        <FooterPlayer />
      </div>
    </ThemeProvider>
  </React.Fragment>
);

