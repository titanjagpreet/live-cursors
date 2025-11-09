// Source: https://github.com/steveruizok/perfect-cursors

import { PerfectCursor } from "perfect-cursors"
import * as React from "react"

export function usePerfectCursor(cb: (point: number[]) => void) {
  const [pc] = React.useState(() => new PerfectCursor(cb))

  React.useLayoutEffect(() => {
    return () => pc.dispose()
  }, [pc])

  const onPointChange = React.useCallback(
    (point: number[]) => pc.addPoint(point),
    [pc]
  )

  return onPointChange
}