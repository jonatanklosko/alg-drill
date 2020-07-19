import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Paper,
  LinearProgress,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import { getDrills } from '../../lib/database';
import { useAsync } from '../../hooks/useAsync';
import DrillList from '../DrillList/DrillList';
import welcomeImg from './welcome.svg';

function Home() {
  const { pending, value: drills, error, refresh } = useAsync(getDrills);

  if (pending || !drills) return <LinearProgress />;
  if (error) return error.message;

  return (
    <div style={{ padding: 16 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <img
            src={welcomeImg}
            alt="Welcome"
            height="150"
            style={{ display: 'block', margin: 'auto' }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            {`Your drills`}
          </Typography>
          <Paper>
            {drills.length > 0 && (
              <DrillList drills={drills} onDeleted={() => refresh()} />
            )}
          </Paper>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/drills/new"
          >
            New drill
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
