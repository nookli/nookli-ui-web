// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// export const useTabStore = create(persist(
//   (set) => ({
//     tabs: [
//       { id: '1', name: 'Org Space', icon: 'AiOutlineTeam', type: 'Team', members: ['Jane', 'John'] },
//       { id: '2', name: 'Dev Team', icon: 'FaCodeBranch', type: 'Team', members: ['Mike'] },
//     ],
//     activeTabId: '1',
//     setActiveTab: (id) => set({ activeTabId: id }),
//     addTab: (tab) => set((state) => ({ tabs: [...state.tabs, tab] })),
//   }),
//   {
//     name: 'workspace-tabs',
//   }
// ))


// tabStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTabStore = create(persist(
  (set) => ({
    tabs: [
      { id: '1', name: 'Org Space', icon: 'AiOutlineTeam', type: 'Team', members: ['Jane', 'John'], pinned: false },
      { id: '2', name: 'Dev Team', icon: 'FaCodeBranch', type: 'Team', members: ['Mike'], pinned: true },
    ],
    activeTabId: '1',
    setActiveTab: (id) => set({ activeTabId: id }),
    addTab: (tab) => set((state) => ({ tabs: [...state.tabs, tab] })),
    pinTab: (id) =>
      set((state) => ({
        tabs: state.tabs.map((tab) =>
          tab.id === id ? { ...tab, pinned: !tab.pinned } : tab
        ),
      })),
    deleteTab: (id) =>
      set((state) => ({
        tabs: state.tabs.filter((tab) => tab.id !== id),
      })),
  }),
  {
    name: 'workspace-tabs',
  }
))
