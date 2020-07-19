import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { getDrill } from '../../lib/database';
import DrillCore from './DrillCore';

function Drill() {
  const params = useParams();
  const id = +params.id;
  const [drill, setDrill] = useState(null);

  useEffect(() => {
    getDrill(id).then(setDrill);
  }, [id]);

  if (!drill) return <LinearProgress />;

  return <DrillCore drill={drill} />;
}

export default Drill;
