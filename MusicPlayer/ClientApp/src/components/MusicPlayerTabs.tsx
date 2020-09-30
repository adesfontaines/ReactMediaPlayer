import * as React from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink, Container } from 'reactstrap';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as MusicPlayerStore from '../store/MusicPlayer';

function MusicPlayerTabs() {
  return (
    <ul className="nav justify-content-center">
      <NavItem>
        <NavLink tag={Link} className="nav-link active" to="/playlists">Playlists</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="nav-link active" to="/tracks">Tracks</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="nav-link active" to="/albums">Albums</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="nav-link active" to="/artists">Artists</NavLink>
      </NavItem>
    </ul>)
}

export default connect()(MusicPlayerTabs as any);
