import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import { Container, Box, TextField } from '@mui/material'
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid'
import { Event, generateQueryKey, getAllEvents } from '../../../clients'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PageLoadingSpinner } from '../../global-components'

const Events: React.FC = () => {
  const { id } = useParams()
  const { data: events = [], isLoading } = useQuery(generateQueryKey(id), getAllEvents)
  const [eventsMap, setEventsMap] = useState<Record<string, Event[]> | undefined>()
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<Event[] | undefined>()

  useEffect(() => {
    if (!isLoading) {
      const defaultDate = events[0]?.[0]

      if (defaultDate !== undefined) {
        setSelectedDate(dayjs(defaultDate))
      }

      setEventsMap(Object.fromEntries(events))
    }
  }, [events, isLoading])

  useEffect(() => {
    const parsedDate = selectedDate?.format('YYYY-MM-DD')

    if (parsedDate !== undefined && eventsMap !== undefined) {
      setSelectedEvents(eventsMap[parsedDate])
    }

  }, [selectedDate, eventsMap])

  const getNotes = (event: Event): string => {
    if ('task_definition_description' in event) {
      return event.task_definition_description
    }

    if ('note' in event) {
      return event.note
    }

    if ('mood' in event) {
      return `Mood observation: ${event.mood}`
    }

    if ('medication_type' in event) {
      return `Medication: ${event.medication_type}`
    }

    if ('fluid' in event) {
      return `Fluid: ${event.fluid}`
    }

    return event.event_type
  }

  const getColumns = (): GridColDef[] => {
    return [
      {
        field: 'time',
        headerName: 'time',
        flex: 0.2
      },
      {
        field: 'notes',
        headerName: 'notes',
        flex: 0.6
      }
    ]
  }

  const getRow = (event: Event): GridRowModel => {
    const { id, timestamp } = event

    return {
      id,
      time: dayjs(timestamp).format('HH:mm'),
      notes: getNotes(event)
    }
  }

  return (
    <Container disableGutters>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        {isLoading ?
          <PageLoadingSpinner /> : (
            <>
              <Box sx={{ height: 'auto', margin: 1 }}>
                <DatePicker
                  label='select a day'
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Box sx={{ flexGrow: 0.9, width: '90%' }}>
                <DataGrid
                  rows={selectedEvents ? selectedEvents.map(getRow) : []}
                  columns={getColumns()}
                  getRowHeight={() => 'auto'}
                  getRowSpacing={() => ({ top: 2, bottom: 2 })}
                  disableSelectionOnClick
                />
              </Box>
            </>
          )}
      </Box>
    </Container>
  )
}

export default Events