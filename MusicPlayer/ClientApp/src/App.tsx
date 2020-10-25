import * as React from 'react';
import { Route, Switch } from 'react-router';
import AlbumDetails from './components/Album/AlbumDetails';
import AppInitialize from './components/AppInitialize';
import AppSettings from './components/AppSettings';
import ArtistDetails from './components/Artist/ArtistDetails';
import Home from './components/Home';
import ImportMedia from './components/ImportMedia';
import Layout from './components/Layout';
import MediaBaseLists from './components/Lists/MediaBaseLists';
import './custom.css';
import { Container } from 'reactstrap';
import MuiStyles from './MuiStyles';
import TracksList from './components/Lists/TracksList';

export default function App() {
  if (false) {
    return AppInitialize();
  }
  else {
    return (
      <Layout>
          <Route path={["/music", "/tracks", "/albums", "/artists", "/playlists"]} component={MediaBaseLists} />
          <Container className={MuiStyles().subContainer}>
            <Route exact path='/' component={Home} />
            <Route path="/album/:albumName" component={AlbumDetails} />
            <Route path="/artist/:artistName" component={ArtistDetails} />
            <Route path="/settings" component={AppSettings} />
            <Route path="/import" component={ImportMedia} />
          </Container>
      </Layout>
    );
  }
}
