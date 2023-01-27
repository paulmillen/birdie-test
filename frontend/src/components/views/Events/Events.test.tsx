import { fireEvent, render, screen } from '@testing-library/react';
import Events from './Events';
import { TestWrapper } from '../../global-components'
import * as ReactQuery from 'react-query'

describe('Events', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('when events are loaded', () => {
    beforeEach(() => {
      jest.spyOn(ReactQuery, 'useQuery')
        .mockReturnValue({ data: mockEvents, isLoading: false, error: {} } as ReactQuery.UseQueryResult)
    })

    it("renders a table with the most recent day's events", () => {
      render(
        <TestWrapper>
          <Events />
        </TestWrapper>
      );

      const firstRowNotes = screen.getByText('Mood observation: happy');
      const firstRowTime = screen.getByText('17:00');

      expect(firstRowNotes).toBeInTheDocument();
      expect(firstRowTime).toBeInTheDocument();
    })
  })

  describe('when a different populated date is selected', () => {
    beforeEach(() => {
      jest.spyOn(ReactQuery, 'useQuery')
        .mockReturnValue({ data: mockEvents, isLoading: false, error: {} } as ReactQuery.UseQueryResult)
    })

    it("renders a table with the selected day's events", () => {
      render(
        <TestWrapper>
          <Events />
        </TestWrapper>
      );

      const datePickerInput = screen.getByLabelText('select a day')
      fireEvent.change(datePickerInput, { target: { value: "13/01/2023" } })

      const firstRowNotes = screen.getByText('Fluid: tea with sugar');
      const firstRowTime = screen.getByText('08:00');

      expect(firstRowNotes).toBeInTheDocument();
      expect(firstRowTime).toBeInTheDocument();
    })
  })
});

const mockEvents = [
  [
    '2023-01-10', [
      { id: 1, 'mood': 'happy', timestamp: '2023-01-10T17:00:53.049Z' },
      { id: 2, event_type: 'check_in', timestamp: '2023-01-10T18:00:53.049Z' }
    ]
  ],
  ['2023-01-11', [{ id: 3, 'medication_type': 'ibuprofen', timestamp: '2023-01-11T14:00:53.049Z' }]],
  ['2023-01-12', [{ id: 4, 'note': 'watched TV together', timestamp: '2023-01-12T07:00:53.049Z' }]],
  ['2023-01-13', [{ id: 5, 'fluid': 'tea with sugar', timestamp: '2023-01-13T08:00:53.049Z' }]]
]