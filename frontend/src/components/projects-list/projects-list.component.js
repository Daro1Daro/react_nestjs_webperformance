import React from 'react';

import ListItemLink from '../list-item-link/list-item-link.component';

import { formatDateString } from '../../common/functions';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './projects-list.component.scss';

const ProjectsList = ({ projects, isDeleting, deleteProject }) => {

  const handleDelete = (project) => {
    deleteProject(project);
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
                  <IconButton onClick={() => handleDelete({ id: project.id })} edge='end' disabled={isDeleting}>
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

export default ProjectsList;
