import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Container, CircularProgress } from '@mui/material'
import { generateQueryKey, getAllEvents } from '../../clients'

const Events = () => {

  const { id } = useParams()
  const { data: events, isLoading } = useQuery(generateQueryKey(id), getAllEvents)

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Container>
      <div>{events}</div>
    </Container>
  )
}

export default Events