import { eventStatuses } from '@/db/schema'

export const COOKIE_NAME = 'pardy-token'

type EventStatus = (typeof eventStatuses)[number]
type EventStatusMap = { [key in EventStatus]: string }
export const EVENT_STATUS_COLOR_MAP: EventStatusMap = {
  draft: 'warning',
  live: 'success',
  started: 'primary',
  ended: 'disabled',
  cancel: 'danger',
}

export const RSVPS_STATUS_COLOR_MAP = {
  going: 'success',
  'not-going': 'disabled',
  maybe: 'warning',
}
