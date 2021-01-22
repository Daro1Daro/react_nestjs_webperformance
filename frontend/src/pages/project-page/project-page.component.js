import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResultsTableContainer from '../../components/results-table/results-table.container';

import CustomButton from '../../components/custom-button/custom-button.component';
import RunTestDialog from '../../components/run-test-dialog/run-test-dialog.component';

import { selectProjectById, selectOpenRunTestDialog } from '../../redux/project/project.selectors';
import { selectSingleResults, selectIsFetchingSingleResults } from '../../redux/results/results.selectors';
import { openRunTestDialog, closeRunTestDialog } from '../../redux/project/project.actions';

import './project-page.styles.scss';

class ProjectPage extends Component {
  render() {
    const { currentResults, isLoading, project, open, match } = this.props;
    const { openDialog, closeDialog } = this.props;

    const projectResults = currentResults
      .filter(r => r.webPage.project.id === parseInt(match.params.projectId))
      .sort((a, b) => a.created < b.created);

    return (
      <div className={'project-page-container'}>
        <h2 className={'page-title'}>Project: {project.name}</h2>
        <div className={'table-header'}>
          <h3 className={'table-title'}>Single Tests</h3>
          <CustomButton type={'button'} onClick={openDialog}> RUN NEW TEST </CustomButton>
        </div>
        <ResultsTableContainer
          isLoading={isLoading}
          rows={projectResults}
        />
        <RunTestDialog
          open={open}
          handleClose={closeDialog}
          projectId={project.id}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentResults: selectSingleResults(state),
  isLoading: selectIsFetchingSingleResults(state),
  project: selectProjectById(parseInt(ownProps.match.params.projectId))(state),
  open: selectOpenRunTestDialog(state),
});

const mapDispatchToProps = dispatch => ({
  openDialog: () => dispatch(openRunTestDialog()),
  closeDialog: () => dispatch(closeRunTestDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
