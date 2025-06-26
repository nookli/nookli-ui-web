// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Overview from './OverviewTab';
// import Flows from './FlowsTab';
// import Stacks from './StacksTab';
// import Settings from './SettingsTab';
// import Trash from './TrashTab';
// import LinkedSpaces from './LinkedSpacesTab';
// import { getSpaceById } from '../../../nookliApi/spacesApi';
// import useSpacesStore from '../../../redux/useSpacesStore';

// const tabs = ['overview', 'flows', 'stacks', 'settings', 'trash', 'linked-spaces'];

// const index = () => {
//   const { spaceId } = useParams();
//   const navigate = useNavigate();
//   const [space, setSpace] = useState(null);

//   const {
//     setActiveSpace,
//     setTabForSpace,
//     getTabForSpace,
//   } = useSpacesStore();

//   const currentTab = getTabForSpace(spaceId);

//   useEffect(() => {
//     const fetchSpace = async () => {
//       try {
//         const data = await getSpaceById(spaceId);
//         setSpace(data);
//         setActiveSpace(spaceId);
//       } catch (err) {
//         console.error('Failed to fetch space', err);
//       }
//     };

//     fetchSpace();
//   }, [spaceId]);

//   const renderTabContent = () => {
//     switch (currentTab) {
//       case 'overview': return <Overview space={space} />;
//       case 'flows': return <Flows space={space} />;
//       case 'stacks': return <Stacks space={space} />;
//       case 'settings': return <Settings space={space} />;
//       case 'trash': return <Trash space={space} />;
//       case 'linked-spaces': return <LinkedSpaces space={space} />;
//       default: return <Overview space={space} />;
//     }
//   };

//   const handleTabClick = (tab) => {
//     setTabForSpace(spaceId, tab);
//   };

//   if (!space) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{space.name}</h1>

//       <div className="flex space-x-4 border-b mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => handleTabClick(tab)}
//             className={`pb-2 capitalize ${currentTab === tab ? 'border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
//           >
//             {tab.replace('-', ' ')}
//           </button>
//         ))}
//       </div>

//       <div>{renderTabContent()}</div>
//     </div>
//   );
// };

// export default index;
import { Outlet, useParams, useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSpaceById } from '../../../nookliApi/spacesApi';
import useSpacesStore from '../../../redux/useSpacesStore';


const tabs = ['overview', 'flows', 'stacks', 'settings', 'trash', 'linked-spaces'];

const SpaceDetail = () => {
  const { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const { setActiveSpace } = useSpacesStore();
    const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const data = await getSpaceById(spaceId);
        setSpace(data);
        setActiveSpace(spaceId);
      } catch (err) {
        console.error('Failed to fetch space', err);
      }
    };

    fetchSpace();
  }, [spaceId]);

    useEffect(() => {
    const savedTab = getTabForSpace(spaceId);
    const currentPath = location.pathname.split('/').pop();
    
    // If user is just on /spaces/:spaceId without tab, redirect
    if (spaceId && !tabs.includes(currentPath)) {
      navigate(`/dashboard/spaces/${spaceId}/${savedTab || 'overview'}`, { replace: true });
    }
  }, [spaceId, location.pathname]);

  const handleTabClick = (tab) => {
    setTabForSpace(spaceId, tab);
    navigate(`/dashboard/spaces/${spaceId}/${tab}`);
  };

  if (!space) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{space.name}</h1>

      <div className="flex space-x-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`pb-2 capitalize ${location.pathname.includes(tab) ? 'border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <Outlet context={{ space }} />
    </div>
  );
};

export default SpaceDetail;
