import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';
import ConfigFormInput from '../config-form-input/config-form-input.component';

import { runTestStart } from '../../redux/project/project.actions';
import { selectIsCreatingNewTest } from '../../redux/project/project.selectors';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './run-test-dialog.styles.scss';

class RunTestDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      webPage: {
        name: '',
        url: '',
      },
      config: {
        connectivity: 'FIOS',
        browser: 'Chrome',
        runs: 1,
        isMobile: false,
      },
    };
  }

  handleSubmit = () => {
    const { runTest, projectId } = this.props;
    const { webPage, config } = this.state;

    runTest({projectId, webPage, config});
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

  handleConfigChange = (event) => {
    const { value, name } = event.target;
    this.setState(prevState => ({
        config: {
          ...prevState.config,
          [name]: value,
        },
      }),
    );
  };

  render() {
    const { open, handleClose, isCreating } = this.props;
    const { config } = this.state;

    return (
      <Dialog className={'create-project-dialog'} open={open} onClose={handleClose}>
        <DialogTitle className={'title'}>RUN NEW TEST</DialogTitle>
        <DialogContent className={'create-project-dialog-content'}>
          <div className={'subheader'}>SINGLE TEST DATA</div>
          <TextField
            id={'webPageName'}
            name={'name'}
            label={'WebPage Name'}
            type={'text'}
            onChange={this.handleWebPageChange}
            fullWidth
            required
          />
          <TextField
            id={'url'}
            name={'url'}
            label={'URL'}
            type={'url'}
            onChange={this.handleWebPageChange}
            fullWidth
            required
          />
          <div className={'subheader'}>TEST CONFIG</div>
          <ConfigFormInput
            handleChange={this.handleConfigChange}
            config={config}
            disabled={false}
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
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCreating: selectIsCreatingNewTest,
});

const mapDispatchToProps = dispatch => ({
  runTest: testData => dispatch(runTestStart(testData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunTestDialog);