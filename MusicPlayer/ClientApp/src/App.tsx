import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import MusicPlayer from './components/MediaPlayerApplication';
import AppSettings from './components/AppSettings';
import ImportMedia from './components/ImportMedia';
import AppInitialize from './components/AppInitialize';

export default function App() {
    if (false) {
        return AppInitialize();
    }
    else {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path={["/music", "/albums", "/tracks", "/playlists"]} component={MusicPlayer} />
                <Route path={["/settings"]} component={AppSettings} />
                <Route path={["/import"]} component={ImportMedia} />
            </Layout>
        );
    }
}
