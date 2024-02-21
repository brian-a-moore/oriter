import { Grid, styled } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Form({ children }: Props) {
  return (
    <_Form>
      <Grid container spacing="1rem">
        {children}
      </Grid>
    </_Form>
  );
}

const _Form = styled('form')({
  marginTop: '1rem',
});
