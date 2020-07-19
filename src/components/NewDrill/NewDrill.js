import React from 'react';
import { useHistory } from 'react-router-dom';
import { createDrill } from '../../lib/database';
import DrillForm from '../DrillForm/DrillForm';

function NewDrill() {
  const history = useHistory();

  function handleSubmit(attrs) {
    createDrill(attrs).then(() => {
      history.push(`/`);
    });
  }

  return <DrillForm onSubmit={handleSubmit} />;
}

export default NewDrill;
