import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../../components/custom-button/custom-button.component';
import ProjectsList from '../../components/projects-list/projects-list.component';
import ResultsList from '../../components/results-list/results-list.component';
import CreateProjectDialog from '../../components/create-project-dialog/create-project-dialog.component';

import { fetchProjectsStart } from '../../redux/project/project.actions';
import { selectProjects, selectIsFetchingProjects } from '../../redux/project/project.selectors';
import { fetchSingleResultsStart } from '../../redux/results/results.actions';
import { selectSingleResults, selectIsFetchingSingleResults } from '../../redux/results/results.selectors';

import './dashboard.styles.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openProjectDialog: false,
    };
  }

  componentDidMount() {
    const { fetchProjects, fetchSingleResults } = this.props;
    fetchProjects();
    fetchSingleResults();
  }

  handleOpenProjectDialog = () => {
    this.setState({ openProjectDialog: true });
  };

  handleCloseProjectDialog = () => {
    this.setState({ openProjectDialog: false });
  };

  render() {
    const { openProjectDialog } = this.state;
    const { singleResults, projects, projectAreLoading, singleResultsAreLoading } = this.props;

    return (
      <div className={'dashboard'}>
        <div className={'title'}>Dashboard</div>
        <div className={'container'}>
          <div className={'column'}>
            <ProjectsList
              isLoading={projectAreLoading}
              projects={projects}
            />
            <div className={'buttons'}>
              <CustomButton type={'button'} onClick={this.handleOpenProjectDialog}> CREATE NEW PROJECT </CustomButton>
            </div>
          </div>
          <div className={'column'}>
            <ResultsList
              isLoading={singleResultsAreLoading}
              results={singleResults}
            />
          </div>
        </div>
        <CreateProjectDialog open={openProjectDialog} handleClose={this.handleCloseProjectDialog}/>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  singleResults: selectSingleResults,
  projects: selectProjects,
  projectAreLoading: selectIsFetchingProjects,
  singleResultsAreLoading: selectIsFetchingSingleResults,
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsStart()),
  fetchSingleResults: () => dispatch(fetchSingleResultsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);