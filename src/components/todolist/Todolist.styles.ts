import { SxProps } from '@mui/material'

export const titleContainer: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const todolistTitle: SxProps = {
  marginTop: '20px',
  marginBottom: '20px',
  lineHeight: '1',
  textTransform: 'uppercase',
  fontWeight: '500'
}

export const filterButtonsContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: 0,
  justifyContent: 'space-between',
  opacity: isDone ? 0.5 : 1,
})