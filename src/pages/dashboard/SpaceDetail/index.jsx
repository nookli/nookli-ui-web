import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Overview from './Overview';
import Flows from './Flows';
import Stacks from './Stacks';
import Settings from './Settings';
import Trash from './Trash';
import LinkedSpaces from './LinkedSpaces';
import { getSpaceById } from '../../../nookliApi/spacesApi';
import useSpacesStore from '../../../redux/useSpacesStore';

const tabs = ['overview', 'flows', 'stacks', 'settings', 'trash', 'linked-spaces'];

const index = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);

  const {
    setActiveSpace,
    setTabForSpace,
    getTabForSpace,
  } = useSpacesStore();

  const currentTab = getTabForSpace(spaceId);

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

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview': return <Overview space={space} />;
      case 'flows': return <Flows space={space} />;
      case 'stacks': return <Stacks space={space} />;
      case 'settings': return <Settings space={space} />;
      case 'trash': return <Trash space={space} />;
      case 'linked-spaces': return <LinkedSpaces space={space} />;
      default: return <Overview space={space} />;
    }
  };

  const handleTabClick = (tab) => {
    setTabForSpace(spaceId, tab);
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
            className={`pb-2 capitalize ${currentTab === tab ? 'border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default index;
