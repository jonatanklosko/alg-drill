import React from 'react';
import { Typography, Grid, Link } from '@material-ui/core';
import progressImg from './progress.svg';

function About() {
  return (
    <div style={{ padding: 16 }}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h5">{`Seriously, what's that?`}</Typography>
        </Grid>
        <Grid item>
          <img src={progressImg} alt="progress" height="150" />
        </Grid>
        <Grid item>
          <Typography>
            {`This tiny tool aims at helping you to effectively improve recognition
            of newly learnt cubing algorithms, especially during the initial phase.
            There are some cool tools like `}
            <Link
              href="https://bestsiteever.ru/zbll"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
            >
              {`ZBLL trainer`}
            </Link>
            {`, but those require scrambling the cube and are better once you feel relatively
            comfortable with all the algorithms.`}
            {`This tool takes a different approach: you provide list of any algorithms you want
            and then iterate over images in a random order, simultaneously executing them on a cube.
            Each step is measured, so at the end you can analyze which cases take you the most time
            to recognize and work on them.`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
