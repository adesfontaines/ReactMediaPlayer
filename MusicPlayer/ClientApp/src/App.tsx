import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import MusicPlayer from './components/MediaPlayerApplication';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path={["/music", "/albums", "/tracks", "/playlists"]} component={MusicPlayer} />
  </Layout>
);
