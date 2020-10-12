import * as React from 'react';
import { connect } from 'react-redux';
import { Paper } from "@material-ui/core"

function ImportMedia() {
  return (
    <div>
      <h2>Import media</h2>
      <p>Drag content here to import</p>
    </div>
  )
}

export default connect()(ImportMedia as any);
