import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import FetchTracks from './components/Lists/MusicTracks';
import './custom.css'
import MusicPlayer from './components/MusicPlayer';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/music' component={MusicPlayer} />
  </Layout>
);
