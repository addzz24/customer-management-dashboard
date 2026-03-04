import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals'

import { initialDashboardState } from './dashboard.state'
import { dashboardComputed } from './dashboard.computed'
import { dashboardMethods } from './dashboard.methods'

export const DashboardStore = signalStore(
  { providedIn: 'root' },
  withState(initialDashboardState),
  withComputed(dashboardComputed),
  withMethods(dashboardMethods)
)
