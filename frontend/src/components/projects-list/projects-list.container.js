import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from "reselect";

import { deleteProjectStart } from '../../redux/project/project.actions';
import { selectIsDeletingProject } from "../../redux/project/project.selectors";

import ProjectsList from './projects-list.component';
import WithSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isDeleting: selectIsDeletingProject,
});

const mapDispatchToProps = dispatch => ({
  deleteProject: project => dispatch(deleteProjectStart(project)),
})

const ProjectsListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithSpinner
)(ProjectsList);

export default ProjectsListContainer;
