import * as ReactQuery from 'react-query';
import { when } from 'jest-when';
import { fireEvent, render, screen } from '@testing-library/react';
import Events from './Events';
import { TestWrapper } from '../../global-components'
import { generateQueryKey, getEvents, Event as EventPayload } from '../../../clients'

describe('Events', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('when events are loaded', () => {
    beforeEach(() => {
      jest.spyOn(ReactQuery, 'useQuery')
        .mockReturnValue({ data: mockPayload1, isLoading: false, error: {} } as ReactQuery.UseQueryResult)
    })

    it("renders a table with the most recent day's events", () => {
      render(
        <TestWrapper>
          <Events />
        </TestWrapper>
      );

      const firstRowNotes = screen.getByText('Mood observation: happy');
      const firstRowTime = screen.getByText('17:00');

      const secondRowNotes = screen.getByText('check in');
      const secondRowTime = screen.getByText('18:00');

      expect(firstRowNotes).toBeInTheDocument();
      expect(firstRowTime).toBeInTheDocument();

      expect(secondRowNotes).toBeInTheDocument();
      expect(secondRowTime).toBeInTheDocument();
    })
  })

  describe('when a different date is selected', () => {
    beforeEach(() => {
      jest.spyOn(ReactQuery, 'useQuery')
        .mockReturnValue({ data: mockPayload1, isLoading: false, error: {} } as ReactQuery.UseQueryResult)
    })

    it.only("renders a table with the selected day's events", () => {
      when(jest.spyOn(ReactQuery, 'useQuery'))
        .calledWith(generateQueryKey(undefined, '2023-01-13'), getEvents as any)
        .mockReturnValue({ data: mockPayload2, isLoading: false, error: {} } as ReactQuery.UseQueryResult)

      render(
        <TestWrapper>
          <Events />
        </TestWrapper>
      );

      const datePickerInput = screen.getByLabelText('select a day')
      fireEvent.change(datePickerInput, { target: { value: "13/01/2023" } })

      const firstRowNotes = screen.getByText('Medication: ibuprofen');
      const firstRowTime = screen.getByText('06:00');

      const secondRowNotes = screen.getByText('watched TV together');
      const secondRowTime = screen.getByText('07:00');

      const thirdRowNotes = screen.getByText('Fluid: tea with sugar');
      const thirdRowTime = screen.getByText('08:00');

      expect(firstRowNotes).toBeInTheDocument();
      expect(firstRowTime).toBeInTheDocument();

      expect(secondRowNotes).toBeInTheDocument();
      expect(secondRowTime).toBeInTheDocument();

      expect(thirdRowNotes).toBeInTheDocument();
      expect(thirdRowTime).toBeInTheDocument();
    })
  })
});

const mockPayload1 = [
  { id: 1, 'mood': 'happy', timestamp: '2023-01-10T17:00:53.049Z' },
  { id: 2, event_type: 'check_in', timestamp: '2023-01-10T18:00:53.049Z' }
] as unknown as EventPayload[]

const mockPayload2 = [
  { id: 3, 'medication_type': 'ibuprofen', timestamp: '2023-01-11T06:00:53.049Z' },
  { id: 4, 'note': 'watched TV together', timestamp: '2023-01-12T07:00:53.049Z' },
  { id: 5, 'fluid': 'tea with sugar', timestamp: '2023-01-13T08:00:53.049Z' }
]