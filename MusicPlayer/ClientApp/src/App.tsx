import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import MusicPlayer from './components/MediaPlayerApplication';
import AppSettings from './components/AppSettings';
import ImportMedia from './components/ImportMedia';
import AppInitialize from './components/AppInitialize';
import * as MusicPlayerStore from './store/MusicPlayer';
import { ApplicationState } from './store';
import { connect } from 'react-redux';

type MediaPlayerProps =
    MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
    & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested

function MediaPlayerApplication(props: MediaPlayerProps) {
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

export default connect(
    (state: ApplicationState) => state.navigation,
    MusicPlayerStore.actionCreators)(MediaPlayerApplication);
