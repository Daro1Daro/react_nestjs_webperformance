import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectSingleResultsById } from '../../redux/results/results.selectors';

import './single-results-page.styles.scss';

class SingleResultsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentResults } = this.props;
    return (
      <div>
        <p>SINGLE PAGE</p>
        {
          currentResults
            ? JSON.stringify(currentResults)
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentResults: selectSingleResultsById(parseInt(ownProps.match.params.resultsId))(state),
});

export default connect(mapStateToProps)(SingleResultsPage);
