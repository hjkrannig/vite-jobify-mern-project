import { createContext, useContext } from 'react'

// DashboardContext wurde ursprünglich in DashboardLayout
// angelegt. useDashboardContext auch dort exportiert.
// In vite soll aber jede component nur einen
// default export haben. Deshalb ist dieses Modul erforderlich.
// DashboardContext wird von DashboardLayout importiert, wo dann
// der DashboardContext.Provider mit den props definiert wird.
// useDashboardContext von allen components, die die props
// benötigen importiert.
// Da der DashboardContext.Provider alle weiteren childs von
// DashboardLayout einschließt, sind die context.props auch von
// allen DashboardLayout-childs=Outlet erreichbar

const DashboardContext = createContext()
const useDashboardContext = () => useContext(DashboardContext)

const AllJobsContext = createContext()
const useAllJobsContext = () => useContext(AllJobsContext)

export { DashboardContext, useDashboardContext, AllJobsContext, useAllJobsContext }
