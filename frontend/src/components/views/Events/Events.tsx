import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import { Container, Box, TextField } from '@mui/material'
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Event, generateQueryKey, getEvents } from '../../../clients'

const Events: React.FC = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: events = [], isLoading } = useQuery(generateQueryKey(id, searchParams.get('date') ?? undefined), getEvents)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)

  useEffect(() => {
    if (!isLoading) {
      const defaultDate = events[0]?.timestamp

      if (defaultDate !== undefined) {
        setSelectedDate(dayjs(defaultDate))
      }
    }
  }, [events, isLoading])

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue !== null) {
      setSelectedDate(newValue)
      setSearchParams({ date: newValue.format().slice(0, 10) })
    }
  }

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

    return event.event_type.replace(/_/g, " ");
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <Box sx={{ height: 'auto', margin: 1 }}>
          <DatePicker
            label='select a day'
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{ flexGrow: 0.9, width: '90%' }}>
          <DataGrid
            rows={events.map(getRow)}
            columns={getColumns()}
            getRowHeight={() => 'auto'}
            getRowSpacing={() => ({ top: 2, bottom: 2 })}
            disableSelectionOnClick
            loading={isLoading}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Events