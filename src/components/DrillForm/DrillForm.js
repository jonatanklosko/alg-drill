import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { parseAlgsText } from '../../lib/alg';
import stages from '../../lib/stages';
import CubeImage from '../CubeImage/CubeImage';

const DEFAULT_INITIAL = {
  name: '',
  algs: [],
  topView: false,
  stage: 'full',
};

function DrillForm({ onSubmit, initial = DEFAULT_INITIAL, title = 'Drill' }) {
  const [name, setName] = useState(initial.name);
  const [algsText, setAlgsText] = useState(initial.algs.join('\n'));
  const [topView, setTopView] = useState(initial.topView);
  const [stage, setStage] = useState(initial.stage);

  function isValid() {
    if (!name) return false;
    const algs = parseAlgsText(algsText);
    if (algs.length === 0) return false;
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const drill = {
      name,
      algs: parseAlgsText(algsText),
      topView,
      stage,
    };
    onSubmit(drill);
  }

  return (
    <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ minWidth: 500 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              multiline
              rowsMax={10}
              label="Algs"
              helperText="List of all the algorithms, each in a separate line."
              value={algsText}
              onChange={(event) => setAlgsText(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" gutterBottom>
              Cube preview
            </Typography>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel htmlFor="stage">Stage</InputLabel>
              <Select
                value={stage}
                onChange={(event) => setStage(event.target.value)}
              >
                {stages.map(({ id, name }) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={topView}
                  onChange={(event) => setTopView(event.target.checked)}
                />
              }
              label="Top view"
            />
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <CubeImage topView={topView} stage={stage} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={!isValid()}
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default DrillForm;
