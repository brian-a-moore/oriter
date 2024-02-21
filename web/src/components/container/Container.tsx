import { Grid, Container as _Container } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <_Container maxWidth="md" style={{ padding: '1rem' }}>
      <Grid container spacing="1rem">
        {children}
      </Grid>
    </_Container>
  );
}
