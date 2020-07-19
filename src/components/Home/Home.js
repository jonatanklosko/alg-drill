import React from 'react';
import { Paper, LinearProgress } from '@material-ui/core';
import { getDrills } from '../../lib/database';
import { useAsync } from '../../hooks/useAsync';
import DrillList from '../DrillList/DrillList';

function Home() {
  const { pending, value: drills, error, refresh } = useAsync(getDrills);

  if (pending || !drills) return <LinearProgress />;
  if (error) return error.message;

  return (
    <div style={{ padding: 16 }}>
      <Paper>
        <DrillList drills={drills} onDeleted={() => refresh()} />
      </Paper>
    </div>
  );
}

export default Home;
