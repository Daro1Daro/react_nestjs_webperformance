import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';

import { createProjectStart, createProjectAndRunTest } from '../../redux/project/project.actions';
import { selectIsCreatingProject } from '../../redux/project/project.selectors';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class CreateProjectDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {
        name: '',
        description: '',
      },
      webPage: {
        name: '',
        url: '',
      },
      config: {
        connectivity: '',
        browser: '',
        runs: 1,
        isMobile: false,
      },
      isCyclical: false,
      runNow: false,
    };
  }

  handleSubmit = () => {
    const { createProject, createProjectAndRunTest } = this.props;
    const { project, webPage, config, runNow } = this.state;

    // tutaj obsługa różnych przypadków
    if (runNow) {
      createProjectAndRunTest({ project, webPage, config });
    } else {
      createProject(project);
    }
  };

  handleProjectChange = (event) => {
    const { value, name } = event.target;
    this.setState(prevState => ({
        project: {
          ...prevState.project,
          [name]: value,
        },
      }),
    );
  };

  handleWebPageChange = (event) => {
    const { value, name } = event.target;
    this.setState(prevState => ({
        webPage: {
          ...prevState.webPage,
          [name]: value,
        },
      }),
    );
  };

  handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    this.setState({ [name]: checked });
  };

  render() {
    const { open, handleClose, isCreating } = this.props;
    const { isCyclical, runNow } = this.state;

    return (
      <div className={'create-project-dialog'}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">NEW PROJECT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tekst
            </DialogContentText>
            <TextField
              autoFocus
              id={'name'}
              name={'name'}
              label={'Project name'}
              type={'text'}
              onChange={this.handleProjectChange}
              fullWidth
            />
            <TextField
              id={'description'}
              name={'description'}
              label={'Description'}
              type={'text'}
              onChange={this.handleProjectChange}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCyclical}
                  onChange={this.handleCheckboxChange}
                  name={'isCyclical'}
                  color={'primary'}
                />
              }
              label={'Cyclical testing'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={runNow}
                  onChange={this.handleCheckboxChange}
                  name={'runNow'}
                  color={'primary'}
                />
              }
              label={'Run single test'}
            />
            <Divider className={'divider'}/>
            <TextField
              id={'webPageName'}
              name={'name'}
              label={'WebPage Name'}
              type={'text'}
              onChange={this.handleWebPageChange}
              disabled={!runNow}
              fullWidth
            />
            <TextField
              id={'url'}
              name={'url'}
              label={'URL'}
              type={'url'}
              onChange={this.handleWebPageChange}
              disabled={!runNow}
              fullWidth
            />
            <Divider className={'divider'}/>

          </DialogContent>
          <DialogActions>
            <CustomButton onClick={handleClose}>
              CANCEL
            </CustomButton>
            <CustomButton inverted onClick={this.handleSubmit} disabled={isCreating}>
              CREATE
            </CustomButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCreating: selectIsCreatingProject,
});

const mapDispatchToProps = dispatch => ({
  createProject: (project) => dispatch(createProjectStart(project)),
  createProjectAndRunTest: (data) => dispatch(createProjectAndRunTest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectDialog);