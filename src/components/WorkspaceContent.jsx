import { useTabStore } from '../redux/tabStore.js'

const WorkspaceContent = () => {
  const { tabs, activeTabId } = useTabStore()
  const activeTab = tabs.find(t => t.id === activeTabId)

  return (
    <div className="mt-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">{activeTab?.name}</h2>
      <p>Type: {activeTab?.type}</p>
      <p>Members: {activeTab?.members?.join(', ')}</p>
    </div>
  )
}

export default WorkspaceContent
