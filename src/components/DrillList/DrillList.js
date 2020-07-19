import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useConfirm } from 'material-ui-confirm';
import { deleteDrill } from '../../lib/database';

function DrillList({ drills, onDeleted }) {
  const confirm = useConfirm();

  function handleDeleteClick(drill) {
    confirm({ description: 'This will permanently remove the drill.' })
      .then(() => deleteDrill(drill.id))
      .then(() => onDeleted(drill));
  }

  return (
    <List>
      {drills.map((drill) => (
        <ListItem button component={RouterLink} to={`/drills/${drill.id}`}>
          <ListItemText
            primary={drill.name}
            secondary={`${drill.algs.length} algs`}
          />
          <ListItemSecondaryAction>
            <IconButton component={RouterLink} to={`/drills/${drill.id}/edit`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(drill)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default DrillList;
