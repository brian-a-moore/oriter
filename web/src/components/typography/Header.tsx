import { Add } from '@mui/icons-material';
import { Grid, IconButton, styled } from '@mui/material';

type Props = {
  title: string;
  disabled?: boolean;
  addFn?: () => void;
};

export default function Header({ title, disabled = false, addFn }: Props) {
  return (
    <Grid
      item
      xs={12}
      style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Title style={addFn ? { height: '34px', lineHeight: '34px' } : {}}>
        {title}
      </Title>
      {addFn && (
        <IconButton size="small" onClick={addFn} disabled={disabled}>
          <Add />
        </IconButton>
      )}
    </Grid>
  );
}

const Title = styled('h1')({
  display: 'inline',
  fontWeight: 600,
  color: '#9FB7FE',
});
