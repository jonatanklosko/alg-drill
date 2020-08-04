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
import { makeStyles } from '@material-ui/core/styles';
import { parseAlgsText } from '../../lib/alg';
import masks from '../../lib/masks';
import CubeImage from '../CubeImage/CubeImage';
import { toggleElement } from '../../lib/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    maxWidth: 700,
  },
}));

const DEFAULT_INITIAL = {
  name: '',
  algs: [],
  planView: false,
  colorNeutral: false,
  angles: [''],
  mask: null,
};

function DrillForm({ onSubmit, initial = {}, title = 'Drill' }) {
  initial = { ...DEFAULT_INITIAL, ...initial };

  const classes = useStyles();

  const [name, setName] = useState(initial.name);
  const [algsText, setAlgsText] = useState(initial.algs.join('\n'));
  const [planView, setPlanView] = useState(initial.planView);
  const [colorNeutral, setColorNeutral] = useState(initial.colorNeutral);
  const [angles, setAngles] = useState(initial.angles);
  const [mask, setMask] = useState(initial.mask);

  function isValid() {
    if (!name) return false;
    const algs = parseAlgsText(algsText);
    if (algs.length === 0) return false;
    if (angles.length === 0) return false;
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
      angles,
    };
    onSubmit(drill);
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
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
              Angles
            </Typography>
            <Typography variant="body2">
              Every alg will be shown from either of the selected angles
              (randomly). Use this to easily translate all the algs to a
              different angle or even train recognition from regardless the
              angle.
            </Typography>
          </Grid>
          <Grid item>
            {[
              { label: '0°', value: '' },
              { label: '90° (y)', value: 'y' },
              { label: "-90° (y')", value: "y'" },
              { label: '180° (y2)', value: 'y2' },
            ].map(({ label, value }) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={angles.includes(value)}
                    onChange={(event) =>
                      setAngles(toggleElement(angles, value))
                    }
                  />
                }
                label={label}
              />
            ))}
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" gutterBottom>
              Cube preview
            </Typography>
            <Typography variant="body2">
              Customize how the algs are be displayed.
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
