import { Link } from 'react-router'
import { PATH } from 'common/routing/Routing'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid2'

const faq = [
  {
    question: 'How can I create todolist?',
    answer: 'You need to enter the name of the todolist in the input field and click the plus button',
    id: 1,
  },
  {
    question: 'How can I remove todolist?',
    answer: 'You need to click on the trash can icon.',
    id: 2,
  },
  {
    question: 'How can I rename the todolist?',
    answer:
      'You can rename the todolist by double-clicking on it, entering a new title, and clicking anywhere in the application.',
    id: 3,
  },
]

export const Faq = () => {
  return (
    <Grid container justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={'20px'}>
      <Grid>
        <Typography variant="h1" sx={{ textTransform: 'uppercase', fontSize: '36px' }}>
          frequently asked question
        </Typography>
      </Grid>
      <Grid>
        {faq.map((el) => {
          return (
            <Accordion key={el.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                <Typography component="span" sx={{ fontWeight: '600' }}>
                  {el.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>{el.answer} </AccordionDetails>
            </Accordion>
          )
        })}
      </Grid>
      <Grid>
        <Button component={Link} to={PATH.MAIN} variant={'contained'} color={'secondary'}>
          Main page
        </Button>
      </Grid>
    </Grid>
  )
}
