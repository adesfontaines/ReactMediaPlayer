﻿import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as MusicTracksStore from '../../store/MusicTracks';
import { Grid, Card, Typography, CardMedia, CardContent, CardActionArea, Link } from '@material-ui/core/';

type MusicTracksProps =
  MusicTracksStore.MusicTracksState // ... state we've requested from the Redux store
  & typeof MusicTracksStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ folderPath: string }>; // ... plus incoming routing parameters

class MusicAlbums extends React.PureComponent<MusicTracksProps> {

  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  private ensureDataFetched() {
    this.props.requestMusicTracks("C:\\Users\\ADE\\Music");
  }
  render() {
    return (
      <div>
        <h2>Albums</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                <Grid item>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        className="albumCardMedia"
                        image="https://via.placeholder.com/256"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5">
                          Name
                    </Typography>
                        <Link href="google.com" color="textSecondary">
                          Artist
                    </Link>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>);
  }

  private renderPagination() {
    return (
      <div className="d-flex justify-content-between">
        {this.props.isLoading && <span>Loading...</span>}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.musicTracks,
  MusicTracksStore.actionCreators
)(MusicAlbums as any);