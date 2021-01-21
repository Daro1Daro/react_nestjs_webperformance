import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { formatDateString } from '../../common/functions';
import { TestStatus } from '../../common/consts';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import './results-list.styles.scss';

const ResultsList = ({ results, isDeleting, deleteResults, pollResults }) => {
  const history = useHistory();

  const sortedResults = results.sort((a, b) => a.created < b.created);
  const lastResults = sortedResults.length >= 6 ? sortedResults.slice(0, 6) : sortedResults;

  useEffect(() => {
    for (const r of results) {
      if (r.status === TestStatus.PENDING) pollResults(r.id);
    }
  }, [results, pollResults]);

  const handleDelete = (event, results) => {
    event.stopPropagation();
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
              <ListItem key={r.id} button onClick={() => history.push(`/single-results/${r.id}`)}>
                <ListItemText primary={`${r.webPage.name} - ${r.webPage.url}`} secondary={formatDateString(r.created)}/>
                <ListItemSecondaryAction>
                  {
                    r.status === TestStatus.PENDING
                      ? <CircularProgress/>
                      : <IconButton onClick={(event) => handleDelete(event, { id: r.id })} edge="end" disabled={isDeleting}>
                          <DeleteIcon/>
                        </IconButton>
                  }
                </ListItemSecondaryAction>
              </ListItem>
            ))
            : null
        }
      </List>
    </div>
  );
};

export default ResultsList;
