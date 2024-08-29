import StatusIndicator from '@cloudscape-design/components/status-indicator'

// eslint-disable-next-line
type TODO = any

const STATUS_ICON_MAP: TODO = {
  NotStarted: 'stopped',
  NotSupported: 'error',
  Completed: 'success',
  Scripted: 'success',
  Error: 'error',
  Pending: 'pending',
  Loading: 'loading',
  Parsing: 'loading',
  Uploading: 'loading',
  Scripting: 'loading',
  InProgress: 'loading',
  Processing: 'loading',
}

const STATUS_LABEL_MAP: TODO = {
  NotStarted: 'Not Started',
  NotSupported: 'Not Supported',
  InProgress: 'In progress',
}

interface StatusIndicatorInput {
  status: string
  label?: string
}

export default function Status({ status, label }: StatusIndicatorInput) {
  return (
    <StatusIndicator type={STATUS_ICON_MAP[status || 'Pending'] || STATUS_ICON_MAP.NotStarted}>
      {label ?? (STATUS_LABEL_MAP[status || 'Pending'] || status)}
    </StatusIndicator>
  )
}
