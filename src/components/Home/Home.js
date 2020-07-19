import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItemText, ListItem, Paper, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useConfirm } from 'material-ui-confirm';
import { getDrills, deleteDrill } from '../../lib/database';

function Home() {
  const confirm = useConfirm();
  const [drills, setDrills] = useState([]);

  useEffect(() => {
    getDrills().then(setDrills);
  }, []);

  function handleDeleteClick(drill) {
    confirm({ description: 'This will permanently remove the drill.' }).then(() => {
      deleteDrill(drill.id);
      setDrills(
        drills.filter(({ id }) => id !== drill.id)
      );
    });
  }

  return (
    <div style={{ padding: 16 }}>
      <Paper>
        <List>
          {drills.map(drill => (
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
      </Paper>
    </div>
  );
}

export default Home;
