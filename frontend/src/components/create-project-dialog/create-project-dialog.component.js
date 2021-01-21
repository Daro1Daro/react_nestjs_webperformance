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
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import './create-project-dialog.styles.scss';

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
        connectivity: 'FIOS',
        browser: 'Chrome',
        runs: 1,
        isMobile: false,
      },
      runNow: false,
    };
  }

  handleSubmit = () => {
    const { createProject, createProjectAndRunTest } = this.props;
    const { project, webPage, config, runNow } = this.state;

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

  handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    this.setState({ [name]: checked });
  };

  render() {
    const { open, handleClose, isCreating } = this.props;
    const { runNow } = this.state;
    const { config: { connectivity, browser, runs, isMobile } } = this.state;

    return (
      <Dialog className={'create-project-dialog'} open={open} onClose={handleClose}>
        <DialogTitle className={'title'}>NEW PROJECT</DialogTitle>
        <DialogContent className={'create-project-dialog-content'}>
          <div className={'subheader'}>PROJECT DATA</div>
          <TextField
            autoFocus
            id={'name'}
            name={'name'}
            label={'Project name'}
            type={'text'}
            onChange={this.handleProjectChange}
            fullWidth
            required
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
            className={'checkbox'}
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
          <div className={'subheader'}>SINGLE TEST DATA</div>
          <TextField
            id={'webPageName'}
            name={'name'}
            label={'WebPage Name'}
            type={'text'}
            onChange={this.handleWebPageChange}
            disabled={!runNow}
            fullWidth
            required={runNow}
          />
          <TextField
            id={'url'}
            name={'url'}
            label={'URL'}
            type={'url'}
            onChange={this.handleWebPageChange}
            disabled={!runNow}
            fullWidth
            required={runNow}
          />
          <div className={'subheader'}>TEST CONFIG</div>
          <div className={'config-inputs'}>
            <FormControl className={'form-control'}>
              <InputLabel shrink id={'connectivity-label'}>
                Connectivity
              </InputLabel>
              <Select
                labelId={'connectivity-label'}
                id={'connectivity-select'}
                name={'connectivity'}
                value={connectivity}
                onChange={this.handleConfigChange}
                disabled={!runNow}
              >
                <MenuItem value={'Cable'}>Cable</MenuItem>
                <MenuItem value={'DSL'}>DSL</MenuItem>
                <MenuItem value={'FIOS'}>FIOS</MenuItem>
                <MenuItem value={'Dial'}>Dial</MenuItem>
                <MenuItem value={'3G'}>3G</MenuItem>
                <MenuItem value={'3GFast'}>3GFast</MenuItem>
                <MenuItem value={'Native'}>Native</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={'form-control'}>
              <InputLabel shrink id={'browser-label'}>
                Browser
              </InputLabel>
              <Select
                labelId={'browser-label'}
                id={'browser-select'}
                name={'browser'}
                value={browser}
                onChange={this.handleConfigChange}
                disabled={!runNow}
              >
                <MenuItem value={'Chrome'}>Chrome</MenuItem>
                <MenuItem value={'Firefox'}>Firefox</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={'form-control'}>
              <InputLabel shrink id={'runs-label'}>
                Runs
              </InputLabel>
              <Select
                labelId={'runs-label'}
                id={'runs-select'}
                name={'runs'}
                value={runs}
                onChange={this.handleConfigChange}
                disabled={!runNow}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={'form-control'}>
              <InputLabel shrink id={'platform-label'}>
                Platform
              </InputLabel>
              <Select
                labelId={'platform-label'}
                id={'platform-select'}
                name={'isMobile'}
                value={isMobile}
                onChange={this.handleConfigChange}
                disabled={!runNow}
              >
                <MenuItem value={false}>Desktop</MenuItem>
                <MenuItem value={true}>Mobile</MenuItem>
              </Select>
            </FormControl>
          </div>
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
  isCreating: selectIsCreatingProject,
});

const mapDispatchToProps = dispatch => ({
  createProject: (project) => dispatch(createProjectStart(project)),
  createProjectAndRunTest: (data) => dispatch(createProjectAndRunTest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectDialog);