import React from 'react';

import WithSpinner from '../with-spinner/with-spinner.component';
import ListItemLink from '../list-item-link/list-item-link.component';

import { formatDateString } from '../../common/functions';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './results-list.styles.scss';

const ResultsList = ({ results }) => {

  const sortedResults = results.sort((a, b) => a.created < b.created);
  const lastResults = sortedResults.length >= 6 ? sortedResults.slice(0, 6) : sortedResults;

  const handleDelete = (id) => {
    console.log(`delete test: ${id}`);
  };

  return (
    <div className={'results-list'}>
      <List
        component={'div'}
        subheader={
          <ListSubheader component={'div'}>
            LATEST SINGLE TEST RESULTS
          </ListSubheader>
        }
      >
        {
          lastResults.length
            ? lastResults.map(r => (
              <ListItemLink key={r.id} button href={`/single-results/${r.id}`}>
                <ListItemText primary={`${r.webPage.name} - ${r.webPage.url}`} secondary={formatDateString(r.created)}/>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleDelete(r.id)} edge="end">
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemLink>
            ))
            : null
        }
      </List>
    </div>
  );
};

export default WithSpinner(ResultsList);
