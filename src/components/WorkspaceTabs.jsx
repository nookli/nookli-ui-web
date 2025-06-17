import React from 'react'
import { useTabStore } from '../redux/tabStore.js'
import { IconContext } from 'react-icons'
import {
  AiOutlineTeam,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai'

import {
  FaCodeBranch,
  FaUsers,
  FaLaptopCode,
  FaPaintBrush,
  FaBuilding,
  FaBriefcase,
  FaChartLine,
  FaUserTie,
} from 'react-icons/fa'


const ICONS = {
  AiOutlineTeam: AiOutlineTeam,
  AiOutlineUsergroupAdd: AiOutlineUsergroupAdd,
  FaCodeBranch: FaCodeBranch,
  FaUsers: FaUsers,
  FaLaptopCode: FaLaptopCode,
  FaPaintBrush: FaPaintBrush,
  FaBuilding: FaBuilding,
  FaBriefcase: FaBriefcase,
  FaChartLine: FaChartLine,
  FaUserTie: FaUserTie,
};

const WorkspaceTabs = () => {
  const { tabs, activeTabId, setActiveTab } = useTabStore()
 const pinnedTabs = tabs.filter(tab => tab.pinned)
  return (
    <div className="flex gap-4 border-b border-gray-300 pb-2">
      <IconContext.Provider value={{ size: '20' }}>
        {pinnedTabs.map((tab) => {
          const Icon = ICONS[tab.icon] || AiOutlineTeam 
          const isActive = tab.id === activeTabId
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-4 py-2 rounded-t-md flex items-center gap-2 text-sm
                ${isActive ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}
              `}
            >
              <Icon />
              <span>{tab.name}</span>
            </div>
          )
        })}
      </IconContext.Provider>
    </div>
  )
}

export default WorkspaceTabs