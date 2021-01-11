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

const ProjectsList = ({ projects }) => {

  const handleDelete = (id) => {
    console.log(`delete project: ${id}`);
  };

  return (
    <div className={'projects-list'}>
      <List
        component='div'
        subheader={
          <ListSubheader component='div'>
            PROJECTS
          </ListSubheader>
        }
      >
        {
          projects
            ? projects.map(project => (
              <ListItemLink key={project.id} button href={`/project/${project.id}`}>
                <ListItemText primary={project.name} secondary={formatDateString(project.created)}/>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleDelete(project.id)} edge='end'>
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

export default WithSpinner(ProjectsList);
