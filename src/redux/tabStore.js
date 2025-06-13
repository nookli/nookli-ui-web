import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTabStore = create(persist(
  (set) => ({
    tabs: [
      { id: '1', name: 'Org Space', icon: 'AiOutlineTeam', type: 'Team', members: ['Jane', 'John'] },
      { id: '2', name: 'Dev Team', icon: 'FaCodeBranch', type: 'Team', members: ['Mike'] },
    ],
    activeTabId: '1',
    setActiveTab: (id) => set({ activeTabId: id }),
    addTab: (tab) => set((state) => ({ tabs: [...state.tabs, tab] })),
  }),
  {
    name: 'workspace-tabs',
  }
))
