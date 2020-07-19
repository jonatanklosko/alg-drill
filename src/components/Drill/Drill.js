import React from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { getDrill } from '../../lib/database';
import DrillCore from './DrillCore';
import { useAsync } from '../../hooks/useAsync';

function Drill() {
  const params = useParams();
  const id = +params.id;
  const { pending, value: drill, error } = useAsync(getDrill, [id]);

  if (pending || !drill) return <LinearProgress />;
  if (error) return error.message;

  return <DrillCore drill={drill} />;
}

export default Drill;
