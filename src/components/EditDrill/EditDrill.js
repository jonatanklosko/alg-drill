import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { getDrill, updateDrill } from '../../lib/database';
import DrillForm from '../DrillForm/DrillForm';

function EditDrill() {
  const history = useHistory();
  const params = useParams();
  const id = +params.id;
  const [drill, setDrill] = useState(null);

  useEffect(() => {
    getDrill(id).then(setDrill);
  }, [id]);

  function handleSubmit(attrs) {
    updateDrill(drill.id, attrs).then(() => {
      history.push(`/`);
    });
  }

  if (!drill) return <LinearProgress />;

  return (
    <DrillForm onSubmit={handleSubmit} initial={drill} />
  );
}

export default EditDrill;
