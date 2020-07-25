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
import masks from '../../lib/masks';
import CubeImage from '../CubeImage/CubeImage';

const DEFAULT_INITIAL = {
  name: '',
  algs: [],
  planView: false,
  colorNeutral: false,
  mask: null,
};

function DrillForm({ onSubmit, initial = {}, title = 'Drill' }) {
  initial = { ...DEFAULT_INITIAL, ...initial };
  const [name, setName] = useState(initial.name);
  const [algsText, setAlgsText] = useState(initial.algs.join('\n'));
  const [planView, setPlanView] = useState(initial.planView);
  const [colorNeutral, setColorNeutral] = useState(initial.colorNeutral);
  const [mask, setMask] = useState(initial.mask);

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
      planView,
      mask,
      colorNeutral,
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
              spellCheck={false}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={colorNeutral}
                  onChange={(event) => setColorNeutral(event.target.checked)}
                />
              }
              label="Color neutral"
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" gutterBottom>
              Cube preview
            </Typography>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel htmlFor="mask">Mask</InputLabel>
              <Select
                value={mask === null ? 'none' : mask}
                onChange={(event) => {
                  const value = event.target.value;
                  setMask(value === 'none' ? null : value);
                }}
              >
                <MenuItem value="none">None</MenuItem>
                {masks.map(({ id, name }) => (
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
                  checked={planView}
                  onChange={(event) => setPlanView(event.target.checked)}
                />
              }
              label="Plan view"
            />
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <CubeImage planView={planView} mask={mask} />
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
