import { Delete } from '@mui/icons-material';
import { Grid, IconButton, styled } from '@mui/material';

type Props = {
  title: string;
  removeFn?: () => void;
};

export default function SubHeader({ title, removeFn }: Props) {
  return (
    <Grid
      item
      xs={12}
      style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Title style={removeFn ? { height: '34px', lineHeight: '34px' } : {}}>{title}</Title>
      {removeFn && (
        <IconButton size="small" color='error' onClick={removeFn}>
          <Delete fontSize='small' />
        </IconButton>
      )}
    </Grid>
  );
}

const Title = styled('h2')({
  display: 'inline',
  color: '#D7E1FF',
  fontSize: '0.8rem'
});
