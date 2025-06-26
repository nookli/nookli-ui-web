// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// const useSpacesStore = create(persist(
//     (set) => ({
//         spaces: [
//             {
//                 space_id: 1,
//                 name: 'Marketing Space',
//                 icon: 'MdOutlineWorkspaces',
//                 type: 'Team',
//                 members: ['Alice', 'Bob'],
//                 pinned: false,
//             },
//         ],
//         activeSpaceId: '1',

//         setActiveSpace: (id) => set({ activeSpaceId: id }),

//         addSpace: (space) =>
//             set((state) => ({
//                 spaces: [...state.spaces, space],
//             })),

//         pinSpace: (id) =>
//             set((state) => ({
//                 spaces: state.spaces.map((space) =>
//                     space.id === id ? { ...space, pinned: !space.pinned } : space
//                 ),
//             })),

//         updateSpaceInStore: (id, updatedFields) =>
//             set((state) => ({
//                 spaces: state.spaces.map((space) =>
//                     space.space_id === id ? { ...space, ...updatedFields } : space
//                 ),
//             })),

//         deleteSpace: (id) =>
//             set((state) => ({
//                 spaces: state.spaces.filter((space) => space.id !== id),
//             })),

//         overwriteSpaces: (spaces) => set({ spaces }),
//     }),
//     {
//         name: 'workspace-spaces',
//     }
// ));

// export default useSpacesStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSpacesStore = create(persist(
    (set,get) => ({
        spaces: [
            {
                space_id: 1,
                name: 'Marketing Space',
                icon: 'MdOutlineWorkspaces',
                type: 'Team',
                members: ['Alice', 'Bob'],
                pinned: false,
            },
        ],
        activeSpaceId: '1',
        spaceTabs: {},

        setTabForSpace: (spaceId, tab) =>
            set((state) => ({
                spaceTabs: {
                    ...state.spaceTabs,
                    [spaceId]: tab,
                },
            })),

        getTabForSpace: (spaceId) => {
            const { spaceTabs } = get();
            return spaceTabs[spaceId] || 'overview'; // Default to overview
        },
        setActiveSpace: (id) => set({ activeSpaceId: id }),

        addSpace: (space) =>
            set((state) => ({
                spaces: [...state.spaces, space],
            })),

        pinSpace: (id) =>
            set((state) => ({
                spaces: state.spaces.map((space) =>
                    space.space_id === id ? { ...space, pinned: !space.pinned } : space
                ),
            })),

        updateSpaceInStore: (id, updatedFields) =>
            set((state) => ({
                spaces: state.spaces.map((space) =>
                    space.space_id === id ? { ...space, ...updatedFields } : space
                ),
            })),

        deleteSpace: (id) =>
            set((state) => ({
                spaces: state.spaces.filter((space) => space.space_id !== id),
            })),

        overwriteSpaces: (spaces) => set({ spaces }),
    }),
    {
        name: 'workspace-spaces',
    }
));

export default useSpacesStore;
