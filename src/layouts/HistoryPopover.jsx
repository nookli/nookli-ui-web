import { FaCalendarAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const HistoryPopover = () => {

  const historyItems = [
    {
      id: 1,
      type: "Flow",
      title: "Project roadmap template",
      date: "Feb 7, 2025, 1:03pm",
    },
    {
      id: 2,
      type: "Flow",
      title: "Project roadmap template",
      date: "Feb 7, 2025, 1:03pm",
    },
    {
      id: 3,
      type: "Flow",
      title: "Project roadmap template",
      date: "Feb 7, 2025, 1:03pm",
    },
    {
      id: 4,
      type: "Flow",
      title: "Project roadmap template",
      date: "Feb 7, 2025, 1:03pm",
    },
    // Add more items here as needed...
  ];

  return (
    <div
      className="w-[300px] bg-white rounded-lg shadow-lg z-50 border p-2"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-red-500">History of Search</h2>
        <button className="text-xs text-red-500 hover:underline">See All</button>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[450px]">
        {historyItems.map((item) => (
          <div key={item.id} className="flex justify-between items-start gap-2 hover:bg-gray-100 p-2 rounded">
            <div className="flex items-start gap-2">
              <div>
                <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded-full">{item.type}</span>
                <p className="text-sm font-medium mt-1">{item.title}</p>
                <div className="flex items-center text-xs text-gray-400 gap-1 mt-1">
                  <FaCalendarAlt className="text-gray-400 text-xs" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <button className="text-xs text-red-500 hover:underline">Restore</button>
              <HiDotsVertical className="text-gray-500 mt-1 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPopover;
