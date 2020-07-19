import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { getDrill, updateDrill } from '../../lib/database';
import DrillForm from '../DrillForm/DrillForm';
import { useAsync } from '../../hooks/useAsync';

function EditDrill() {
  const history = useHistory();
  const params = useParams();
  const id = +params.id;
  const { pending, value: drill, error } = useAsync(getDrill, [id]);

  function handleSubmit(attrs) {
    updateDrill(drill.id, attrs).then(() => {
      history.push(`/`);
    });
  }

  if (pending || !drill) return <LinearProgress />;
  if (error) return error.message;

  return (
    <DrillForm onSubmit={handleSubmit} initial={drill} title="Edit drill" />
  );
}

export default EditDrill;
