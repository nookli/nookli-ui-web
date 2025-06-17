import React from "react";
import { useTabStore } from "../../redux/tabStore";
import { AiOutlineTeam, AiFillPushpin, AiOutlinePushpin, AiFillDelete } from "react-icons/ai";
import { FaCodeBranch } from "react-icons/fa";

const iconMap = {
  AiOutlineTeam: <AiOutlineTeam size={24} />,
  FaCodeBranch: <FaCodeBranch size={24} />,
};

const AllSpaces = () => {
  const { tabs, pinTab, deleteTab } = useTabStore();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">All Workspaces</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 relative"
          >
            <div className="absolute top-3 right-3 flex gap-3">
              <button
                onClick={() => pinTab(tab.id)}
                className="text-gray-500 hover:text-yellow-500"
                title={tab.pinned ? "Unpin" : "Pin"}
              >
                {tab.pinned ? <AiFillPushpin size={20} /> : <AiOutlinePushpin size={20} />}
              </button>
              <button
                onClick={() => deleteTab(tab.id)}
                className="text-gray-500 hover:text-red-500"
                title="Delete"
              >
                <AiFillDelete size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-500">{iconMap[tab.icon]}</div>
              <div>
                <h2 className="text-xl font-semibold">{tab.name}</h2>
                <p className="text-sm text-gray-500">{tab.type}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Members:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {tab.members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSpaces;
