import { when } from 'jest-when'
import { getEvents } from './events'
import axios from 'axios'

describe('getEvents', () => {
  it('returns an empty array when id is undefined', async () => {
    const actual = await getEvents({ queryKey: ['getEvents', undefined, undefined], meta: {} })

    expect(actual).toEqual([])
  })

  it('calls fetch correctly when timestamp is undefined', async () => {
    when(jest.spyOn(axios, 'get'))
      .calledWith('/api/care-recipients/some-id/events')
      .mockResolvedValue({ data: [{ test: 'response' }] } as any)

    const actual = await getEvents({ queryKey: ['getEvents', 'some-id', undefined], meta: {} })

    expect(actual).toEqual([{ test: 'response' }])
  })

  it('calls fetch correctly when timestamp is present', async () => {
    when(jest.spyOn(axios, 'get'))
      .calledWith('/api/care-recipients/some-id/events?date=2020-01-01')
      .mockResolvedValue({ data: [{ test: 'response' }] } as any)

    const actual = await getEvents({ queryKey: ['getEvents', 'some-id', '2020-01-01'], meta: {} })

    expect(actual).toEqual([{ test: 'response' }])
  })
})