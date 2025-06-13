import WorkspaceTabs from '../../components/WorkspaceTabs.jsx'
import TabCreateModal from '../../components/TabCreateModal.jsx'
import WorkspaceContent from '../../components/WorkspaceContent.jsx'

export default function Home() {
  return (
    <div className="p-6">
      <WorkspaceTabs />
      <TabCreateModal />
      <WorkspaceContent />
    </div>
  )
}
