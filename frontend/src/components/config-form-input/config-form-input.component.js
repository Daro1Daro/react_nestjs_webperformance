import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './config-form-input.styles.scss';

const ConfigFormInput = ({ handleChange, config, disabled }) => {
  const { connectivity, browser, runs, isMobile } = config;
  return (
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
          onChange={handleChange}
          disabled={disabled}
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
          onChange={handleChange}
          disabled={disabled}
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
          onChange={handleChange}
          disabled={disabled}
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
          onChange={handleChange}
          disabled={disabled}
        >
          <MenuItem value={false}>Desktop</MenuItem>
          <MenuItem value={true}>Mobile</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ConfigFormInput;