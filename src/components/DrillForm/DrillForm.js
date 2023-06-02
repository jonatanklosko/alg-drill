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
  lefty: false,
  allowedOrientations: [''],
  angles: [''],
  randomizeAuf: true,
  mask: null,
};

function DrillForm({ onSubmit, initial = {}, title = 'Drill' }) {
  initial = { ...DEFAULT_INITIAL, ...initial };

  const classes = useStyles();

  const [name, setName] = useState(initial.name);
  const [algsText, setAlgsText] = useState(initial.algs.join('\n'));
  const [planView, setPlanView] = useState(initial.planView);
  const [lefty, setLefty] = useState(initial.lefty);
  const [allowedOrientations, setAllowedOrientations] = useState(
    initial.allowedOrientations
  );
  const [angles, setAngles] = useState(initial.angles);
  const [randomizeAuf, setRandomizeAuf] = useState(initial.randomizeAuf);
  const [mask, setMask] = useState(initial.mask);

  function isValid() {
    if (!name) return false;
    const algs = parseAlgsText(algsText);
    if (algs.length === 0) return false;
    if (allowedOrientations.length === 0) return false;
    if (angles.length === 0) return false;
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const drill = {
      name,
      algs: parseAlgsText(algsText),
      planView,
      lefty,
      mask,
      allowedOrientations,
      angles,
      randomizeAuf,
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
            <Typography variant="subtitle2" gutterBottom>
              Allowed orientations
            </Typography>
            <Typography variant="body2" gutterBottom>
              Every alg will be shown with either of the selected centers on the
              top (randomly). Use this to practice color neutral or color
              specific recognition.
            </Typography>
            {[
              { label: 'Yellow', value: '' },
              { label: 'White', value: 'z2' },
              { label: 'Green', value: "x'" },
              { label: 'Blue', value: 'x' },
              { label: 'Red', value: "z'" },
              { label: 'Orange', value: 'z' },
            ].map(({ label, value }) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={allowedOrientations.includes(value)}
                    onChange={(event) =>
                      setAllowedOrientations(
                        toggleElement(allowedOrientations, value)
                      )
                    }
                  />
                }
                label={label}
              />
            ))}
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" gutterBottom>
              Angles
            </Typography>
            <Typography variant="body2" gutterBottom>
              Every alg will be shown from either of the selected angles
              (randomly). Use this to easily translate all the algs to a
              different angle or even practice recognition regardless the angle.
            </Typography>
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
              AUF
            </Typography>
            <Typography variant="body2" gutterBottom>
              Customize AUF behaviour.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={randomizeAuf}
                  onChange={(event) => setRandomizeAuf(!randomizeAuf)}
                />
              }
              label={'Randomize AUF'}
            />
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={lefty}
                  onChange={(event) => setLefty(event.target.checked)}
                />
              }
              label="Left-handed"
            />
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <CubeImage planView={planView} mask={mask} lefty={lefty} />
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
