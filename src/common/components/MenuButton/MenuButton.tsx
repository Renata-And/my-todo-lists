import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type MenuButtonProps = {
  background?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(({ background, theme }) => ({
  minWidth: '110px',
  fontWeight: 'bold',
  borderRadius: '2px',
  textTransform: 'uppercase',
  margin: '0 10px',
  padding: '8px 24px',
  color: theme.palette.primary.contrastText,
  background: background || theme.palette.primary.light,
}))