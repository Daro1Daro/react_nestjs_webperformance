import React from 'react';

import ListItemLink from '../list-item-link/list-item-link.component';

import { formatDateString } from '../../common/functions';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import './results-list.styles.scss';

const PENDING = 'pending';

const ResultsList = ({ results, isDeleting, deleteResults }) => {
  const sortedResults = results.sort((a, b) => a.created < b.created);
  const lastResults = sortedResults.length >= 6 ? sortedResults.slice(0, 6) : sortedResults;

  const handleDelete = (results) => {
    deleteResults(results);
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
                  {
                    r.status === PENDING
                      ? <CircularProgress/>
                      : <IconButton onClick={() => handleDelete({ id: r.id })} edge="end" disabled={isDeleting}>
                          <DeleteIcon/>
                        </IconButton>
                  }
                </ListItemSecondaryAction>
              </ListItemLink>
            ))
            : null
        }
      </List>
    </div>
  );
};

export default ResultsList;
