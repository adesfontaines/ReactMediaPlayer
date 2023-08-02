import * as React from 'react';
import { connect } from 'react-redux';

function Home() {
  return (
    <div>
      <h1>Music Player</h1>
      <p>Click on the left navigation to find your content</p>
    </div>
  );
}

export default connect()(Home);
