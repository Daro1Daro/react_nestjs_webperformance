import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ResultsTableContainer from '../../components/results-table/results-table.container';

import { selectSingleResults, selectIsFetchingSingleResults } from '../../redux/results/results.selectors';

import './project-page.styles.scss';

class ProjectPage extends Component {
  render() {
    const { currentResults, isLoading, match } = this.props;

    const projectResults = currentResults
      .filter(r => r.webPage.project.id === parseInt(match.params.projectId))
      .sort((a, b) => a.created < b.created);

    return (
      <div>
        <ResultsTableContainer
          isLoading={isLoading}
          rows={projectResults}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentResults: selectSingleResults,
  isLoading: selectIsFetchingSingleResults,
});

export default connect(mapStateToProps)(ProjectPage);
