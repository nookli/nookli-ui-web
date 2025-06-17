// import { useTabStore } from '../redux/tabStore.js'

// const WorkspaceContent = () => {
//   const { tabs, activeTabId } = useTabStore()
//   const activeTab = tabs.find(t => t.id === activeTabId)

//   return (
//     <div className="mt-4 p-4 bg-white shadow rounded">
//       <h2 className="text-lg font-bold">{activeTab?.name}</h2>
//       <p>Type: {activeTab?.type}</p>
//       <p>Members: {activeTab?.members?.join(', ')}</p>
//     </div>
//   )
// }

// export default WorkspaceContent
import { useTabStore } from '../redux/tabStore.js'

const WorkspaceContent = () => {
  const { tabs, activeTabId } = useTabStore()

  const pinnedTabs = tabs.filter(t => t.pinned)
  const activeTab = pinnedTabs.find(t => t.id === activeTabId)

  if (!tabs.length || !pinnedTabs.length) {
    return (
      <div className="mt-4 p-4 bg-white shadow rounded text-center text-gray-500">
        <p className="text-md font-semibold">You don’t have any workspaces yet.</p>
        <p className="text-sm">Please create or pin a workspace to get started.</p>
      </div>
    )
  }

  if (!activeTab) {
    return (
      <div className="mt-4 p-4 bg-white shadow rounded text-center text-gray-500">
        <p className="text-md font-semibold">No pinned workspace is selected.</p>
        <p className="text-sm">Please pin and select a workspace to continue.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">{activeTab?.name}</h2>
      <p>Type: {activeTab?.type}</p>
      <p>Members: {activeTab?.members?.join(', ')}</p>
    </div>
  )
}

export default WorkspaceContent
