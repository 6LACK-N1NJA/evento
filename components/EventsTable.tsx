'use client'
import { EVENT_STATUS_COLOR_MAP } from '@/utils/constants'
import { Event } from '@/utils/events'
import snakeCaseToTitle from '@/utils/snakeCaseToTitle'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import Link from 'next/link'
import { useCallback } from 'react'

export default function EventsTable({
  events,
  displayedColumns,
}: {
  events: Event[]
  displayedColumns: string[]
}) {
  const columns = displayedColumns.map((v) => ({
    key: v,
    label: snakeCaseToTitle(v),
  }))

  const renderCell = useCallback((event: Event, key: keyof Event) => {
    const cellValue = event[key]

    switch (key) {
      case 'name':
        return (
          <Link
            className="hover:text-blue-200"
            href={`/dashboard/events/${event.id}`}
          >
            {cellValue}
          </Link>
        )
      case 'isPrivate':
        return <span className="text-lg">{cellValue ? '🔒' : '📢'}</span>
      case 'status':
        return (
          <Chip size="sm" color={EVENT_STATUS_COLOR_MAP[cellValue as string]}>
            {cellValue}
          </Chip>
        )
      default:
        return cellValue
    }
  }, [])
  return (
    <Table isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={events}>
        {(event) => (
          <TableRow key={event.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(event, columnKey as keyof Event)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
