import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';

import { createProjectStart } from '../../redux/project/project.actions';
import { selectIsCreatingProject } from '../../redux/project/project.selectors';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        isCyclical: false,
      },
    };
  }

  handleSubmit = () => {
    const { createProject } = this.props;
    const { project } = this.state;
    createProject(project);
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

  render() {
    const { open, handleClose, isCreating } = this.props;
    console.log(isCreating);
    return (
      <div>
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
          </DialogContent>
          <DialogActions>
            <CustomButton onClick={handleClose}>
              CANCEL
            </CustomButton>
            <CustomButton inverted onClick={this.handleSubmit} disabled={isCreating}>
              CREATE
            </CustomButton>
          </DialogActions>
          {
            isCreating
              ? <div>CREATING</div>
              : null
          }
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCreating: selectIsCreatingProject,
});

const mapDispatchToProps = dispatch => ({
  createProject: (data) => dispatch(createProjectStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectDialog);