import React from 'react';
import { useHistory } from 'react-router-dom';

import { formatDateString } from '../../common/functions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './projects-list.component.scss';

const ProjectsList = ({ projects, isDeleting, deleteProject }) => {
  const history = useHistory();

  const handleDelete = (event, project) => {
    event.stopPropagation();
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
              <ListItem key={project.id} button onClick={() => history.push(`/project/${project.id}`)}>
                <ListItemText primary={project.name} secondary={formatDateString(project.created)}/>
                <ListItemSecondaryAction>
                  <IconButton onClick={(event) => handleDelete(event, { id: project.id })} edge='end' disabled={isDeleting}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
            : null
        }
      </List>
    </div>
  );
};

export default ProjectsList;
