// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { getStackById } from '../../../nookliApi/stacksApi';
// import { getAllPaths, createPath, deletePath } from '../../../nookliApi/pathsApi';

// const StackDetailTab = () => {
//   const { spaceId, stackId } = useParams();
//   const [stack, setStack] = useState(null);
//   const [paths, setPaths] = useState([]);
//   const [newPathName, setNewPathName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const stackData = await getStackById(spaceId, stackId);
//         const pathData = await getAllPaths(spaceId, stackId);
//         setStack(stackData);
//         setPaths(pathData || []);
//       } catch (err) {
//         console.error('Failed to load stack or paths', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [spaceId, stackId]);

//   const handleCreatePath = async () => {
//     if (!newPathName) return;
//     try {
//       const res = await createPath(spaceId, stackId, { name: newPathName });
//       setPaths([...paths, res]);
//       setNewPathName('');
//     } catch (err) {
//       console.error('Failed to create path', err);
//     }
//   };

//   const handleDeletePath = async (pathId) => {
//     try {
//       await deletePath(spaceId, stackId, pathId);
//       setPaths(paths.filter((p) => p.id !== pathId));
//     } catch (err) {
//       console.error('Failed to delete path', err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!stack) return <p>Stack not found</p>;

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4">Stack: {stack.name}</h1>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="New path name"
//           value={newPathName}
//           onChange={(e) => setNewPathName(e.target.value)}
//           className="border px-2 py-1 mr-2"
//         />
//         <button
//           onClick={handleCreatePath}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Add Path
//         </button>
//       </div>

//       <ul className="space-y-2">
//         {paths.map((path) => (
//           <li
//             key={path.id}
//             className="border px-4 py-2 flex justify-between items-center"
//           >
//             <div>
//               <p className="font-medium">{path.name}</p>
//               <Link
//                 to={`paths/${path.id}`}
//                 className="text-blue-600 text-sm underline"
//               >
//                 View Path
//               </Link>
//             </div>
//             <button
//               onClick={() => handleDeletePath(path.id)}
//               className="text-red-500 text-sm"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StackDetailTab;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getStackById } from '../../../nookliApi/stacksApi';
// import {
//   getAllPaths,
//   createPath,
//   deletePath,
//   // Placeholder APIs to be implemented
//   createUnit,
//   deleteUnit,
// } from '../../../nookliApi/pathsApi';
// import { FaPlus, FaTrash, FaPencilAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';

// const StackDetailTab = () => {
//   const { spaceId, stackId } = useParams();
//   const [stack, setStack] = useState(null);
//   const [paths, setPaths] = useState([]);
//   const [expandedPathId, setExpandedPathId] = useState(null);
//   const [newPathName, setNewPathName] = useState('');
//   const [unitInputs, setUnitInputs] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const stackData = await getStackById(spaceId, stackId);
//         const pathData = await getAllPaths(spaceId, stackId);
//         setStack(stackData);
//         setPaths(pathData || []);
//       } catch (err) {
//         console.error('Failed to load stack or paths', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [spaceId, stackId]);

//   const handleCreatePath = async () => {
//     if (!newPathName.trim()) return;
//     try {
//       const res = await createPath(spaceId, stackId, { name: newPathName });
//       setPaths((prev) => [...prev, { ...res, units: [] }]);
//       setNewPathName('');
//     } catch (err) {
//       console.error('Failed to create path', err);
//     }
//   };

//   const handleDeletePath = async (pathId) => {
//     try {
//       await deletePath(spaceId, stackId, pathId);
//       setPaths((prev) => prev.filter((p) => p.id !== pathId));
//     } catch (err) {
//       console.error('Failed to delete path', err);
//     }
//   };

//   const togglePath = (id) => {
//     setExpandedPathId((prev) => (prev === id ? null : id));
//   };

//   const handleAddUnit = async (pathId) => {
//     const name = unitInputs[pathId];
//     if (!name?.trim()) return;

//     try {
//       const res = await createUnit(spaceId, stackId, pathId, { name });
//       console.log(res, paths)
//       setPaths((prev) =>
//         prev.map((p) =>
//           p.id === pathId ? { ...p, units: [...(p.units || []), res] } : p
//         )
//       );
//       setUnitInputs((prev) => ({ ...prev, [pathId]: '' }));
//     } catch (err) {
//       console.error('Failed to add unit', err);
//     }
//   };

//   const handleDeleteUnit = async (pathId, unitId) => {
//     try {
//       await deleteUnit(spaceId, stackId, pathId, unitId);
//       setPaths((prev) =>
//         prev.map((p) =>
//           p.id === pathId
//             ? { ...p, units: (p.units || []).filter((u) => u.id !== unitId) }
//             : p
//         )
//       );
//     } catch (err) {
//       console.error('Failed to delete unit', err);
//     }
//   };

//   if (loading) return <p className="text-gray-600 text-lg">Loading...</p>;
//   if (!stack) return <p className="text-red-600">Stack not found</p>;

//   return (
//     <div className="p-4 text-gray-800">
//       <h1 className="text-2xl font-semibold mb-6 text-blue-800">Stack: {stack.name}</h1>

//       <div className="mb-6 flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="New path name"
//           value={newPathName}
//           onChange={(e) => setNewPathName(e.target.value)}
//           className="border rounded px-3 py-2 w-64"
//         />
//         <button
//           onClick={handleCreatePath}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Path
//         </button>
//       </div>

//       <div className="space-y-4">
//         {paths?.map((path, index) => (
//           <div key={path.id} className="border rounded-lg shadow-sm bg-white">
//             <div
//               className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
//               onClick={() => togglePath(path.id)}
//             >
//               <div className="flex items-center gap-2">
//                 {expandedPathId === path.id ? (
//                   <FaChevronDown className="w-5 h-5 text-gray-600" />
//                 ) : (
//                   <FaChevronRight className="w-5 h-5 text-gray-600" />
//                 )}
//                 <h2 className="font-medium text-lg text-gray-800">
//                   Path {index + 1}: {path.name}
//                 </h2>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaPencilAlt className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
//                 <FaTrash
//                   className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeletePath(path.id);
//                   }}
//                 />
//               </div>
//             </div>

//             {expandedPathId === path.id && (
//               <div className="bg-gray-50 px-6 py-4 space-y-4">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     placeholder="New unit name"
//                     value={unitInputs[path.id] || ''}
//                     onChange={(e) =>
//                       setUnitInputs({ ...unitInputs, [path.id]: e.target.value })
//                     }
//                     className="border px-3 py-2 rounded w-64"
//                   />
//                   <button
//                     onClick={() => handleAddUnit(path.id)}
//                     className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
//                   >
//                     Add Unit
//                   </button>
//                 </div>

//                 <ul className="space-y-2">
//                   {(path.units || []).map((unit, idx) => (
//                     <li
//                       key={unit.id}
//                       className="bg-white border rounded p-3 flex justify-between items-center"
//                     >
//                       <span>
//                         Unit {idx + 1}: {unit.name}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <FaPencilAlt className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
//                         <FaTrash
//                           className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
//                           onClick={() => handleDeleteUnit(path.id, unit.id)}
//                         />
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StackDetailTab;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaPlus, FaTrash, FaPencilAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
// import { getStackById } from '../../../nookliApi/stacksApi';
// import { createPath, deletePath, createUnit, deleteUnit } from '../../../nookliApi/pathsApi';

// const StackDetailTab = () => {
//   const { spaceId, stackId } = useParams();
//   const [stack, setStack] = useState(null);
//   const [expandedPathId, setExpandedPathId] = useState(null);
//   const [newPathName, setNewPathName] = useState('');
//   const [unitInputs, setUnitInputs] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const stackData = await getStackById(spaceId, stackId);
//         setStack(stackData);
//         console.log('Stack data loaded:', stackData);
//       } catch (err) {
//         console.error('Failed to load stack', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [spaceId, stackId]);

//   const togglePath = (id) => {
//     setExpandedPathId(prev => (prev === id ? null : id));
//   };

//   const handleCreatePath = async () => {
//     if (!newPathName.trim()) return;
//     try {
//       const res = await createPath(spaceId, stackId, { name: newPathName });
//       setStack(prev => ({
//         ...prev,
//         paths: [...(prev.paths || []), { ...res, units: [] }],
//       }));
//       setNewPathName('');
//     } catch (err) {
//       console.error('Failed to create path', err);
//     }
//   };

//   const handleDeletePath = async (pathId) => {
//     try {
//       await deletePath(spaceId, stackId, pathId);
//       setStack(prev => ({
//         ...prev,
//         paths: prev.paths.filter(p => p.id !== pathId),
//       }));
//     } catch (err) {
//       console.error('Failed to delete path', err);
//     }
//   };

//   const handleAddUnit = async (pathId) => {
//     const name = unitInputs[pathId];
//     if (!name?.trim()) return;
//     try {
//       const res = await createUnit(spaceId, stackId, pathId, { name });
//       setStack(prev => ({
//         ...prev,
//         paths: prev.paths.map(path =>
//           path.id === pathId
//             ? { ...path, units: [...(path.units || []), res] }
//             : path
//         ),
//       }));
//       setUnitInputs(prev => ({ ...prev, [pathId]: '' }));
//     } catch (err) {
//       console.error('Failed to add unit', err);
//     }
//   };

//   const handleDeleteUnit = async (pathId, unitId) => {
//     try {
//       await deleteUnit(spaceId, stackId, pathId, unitId);
//       setStack(prev => ({
//         ...prev,
//         paths: prev.paths.map(path =>
//           path.id === pathId
//             ? { ...path, units: path.units.filter(unit => unit.id !== unitId) }
//             : path
//         ),
//       }));
//     } catch (err) {
//       console.error('Failed to delete unit', err);
//     }
//   };

//   if (loading) return <p className="text-gray-600 text-lg">Loading...</p>;
//   if (!stack) return <p className="text-red-600">Stack not found</p>;

//   return (
//     <div className="p-4 text-gray-800">
//       <h1 className="text-2xl font-semibold mb-6 text-blue-800">Stack: {stack.name}</h1>

//       <div className="mb-6 flex gap-2 items-center">
//         <input
//           type="text"
//           placeholder="New path name"
//           value={newPathName}
//           onChange={(e) => setNewPathName(e.target.value)}
//           className="border rounded px-3 py-2 w-64"
//         />
//         <button
//           onClick={handleCreatePath}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Path
//         </button>
//       </div>

//       <div className="space-y-4">
//         {(stack.paths || []).map((path, index) => (
//           <div key={path.id} className="border rounded-lg shadow-sm bg-white">
//             <div
//               className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
//               onClick={() => togglePath(path.id)}
//             >
//               <div className="flex items-center gap-2">
//                 {expandedPathId === path.id ? (
//                   <FaChevronDown className="w-5 h-5 text-gray-600" />
//                 ) : (
//                   <FaChevronRight className="w-5 h-5 text-gray-600" />
//                 )}
//                 <h2 className="font-medium text-lg text-gray-800">
//                   Path {index + 1}: {path.name}
//                 </h2>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaPencilAlt className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
//                 <FaTrash
//                   className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeletePath(path.id);
//                   }}
//                 />
//               </div>
//             </div>

//             {expandedPathId === path.id && (
//               <div className="bg-gray-50 px-6 py-4 space-y-4">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     placeholder="New unit name"
//                     value={unitInputs[path.id] || ''}
//                     onChange={(e) =>
//                       setUnitInputs({ ...unitInputs, [path.id]: e.target.value })
//                     }
//                     className="border px-3 py-2 rounded w-64"
//                   />
//                   <button
//                     onClick={() => handleAddUnit(path.id)}
//                     className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
//                   >
//                     Add Unit
//                   </button>
//                 </div>

//                 <ul className="space-y-2">
//                   {(path.units || []).map((unit, idx) => (
//                     <li
//                       key={unit.id}
//                       className="bg-white border rounded p-3 flex justify-between items-center"
//                     >
//                       <span>
//                         Unit {idx + 1}: {unit.name}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <FaPencilAlt className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
//                         <FaTrash
//                           className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
//                           onClick={() => handleDeleteUnit(path.id, unit.id)}
//                         />
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StackDetailTab;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaPlus,
  FaTrash,
  FaPencilAlt,
  FaChevronDown,
  FaChevronRight,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import {
  createPath,
  deletePath,
  createUnit,
  deleteUnit,
  // updatePath,
  // updateUnit,
} from '../../../nookliApi/pathsApi';
import {
  getStackById,
} from '../../../nookliApi/stacksApi';

const StackDetailTab = () => {
  const { spaceId, stackId } = useParams();
  const [stack, setStack] = useState(null);
  const [expandedPathId, setExpandedPathId] = useState(null);
  const [newPathName, setNewPathName] = useState('');
  const [unitInputs, setUnitInputs] = useState({});
  const [editingPathId, setEditingPathId] = useState(null);
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [editingPathName, setEditingPathName] = useState('');
  const [editingUnitName, setEditingUnitName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stackData = await getStackById(spaceId, stackId);
        setStack(stackData);
      } catch (err) {
        console.error('Failed to load stack', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [spaceId, stackId]);

  const togglePath = (id) => {
    setExpandedPathId((prev) => (prev === id ? null : id));
  };

  const handleCreatePath = async () => {
    if (!newPathName.trim()) return;
    try {
      const res = await createPath(spaceId, stackId, { name: newPathName });
      setStack((prev) => ({
        ...prev,
        paths: [...(prev.paths || []), { ...res, units: [] }],
      }));
      setNewPathName('');
    } catch (err) {
      console.error('Failed to create path', err);
    }
  };

  const handleDeletePath = async (pathId) => {
    try {
      await deletePath(spaceId, stackId, pathId);
      setStack((prev) => ({
        ...prev,
        paths: prev.paths.filter((p) => p.id !== pathId),
      }));
    } catch (err) {
      console.error('Failed to delete path', err);
    }
  };

  // const handleEditPath = async (pathId) => {
  //   try {
  //     await updatePath(spaceId, stackId, pathId, { name: editingPathName });
  //     setStack((prev) => ({
  //       ...prev,
  //       paths: prev.paths.map((p) =>
  //         p.id === pathId ? { ...p, name: editingPathName } : p
  //       ),
  //     }));
  //     setEditingPathId(null);
  //   } catch (err) {
  //     console.error('Failed to update path', err);
  //   }
  // };

  const handleAddUnit = async (pathId) => {
    const name = unitInputs[pathId];
    if (!name?.trim()) return;
    try {
      const res = await createUnit(spaceId, stackId, pathId, { name });
      setStack((prev) => ({
        ...prev,
        paths: prev.paths.map((path) =>
          path.id === pathId
            ? { ...path, units: [...(path.units || []), res] }
            : path
        ),
      }));
      setUnitInputs((prev) => ({ ...prev, [pathId]: '' }));
    } catch (err) {
      console.error('Failed to add unit', err);
    }
  };

  const handleDeleteUnit = async (pathId, unitId) => {
    try {
      await deleteUnit(spaceId, stackId, pathId, unitId);
      setStack((prev) => ({
        ...prev,
        paths: prev.paths.map((path) =>
          path.id === pathId
            ? {
              ...path,
              units: path.units.filter((unit) => unit.id !== unitId),
            }
            : path
        ),
      }));
    } catch (err) {
      console.error('Failed to delete unit', err);
    }
  };

  // const handleEditUnit = async (pathId, unitId) => {
  //   try {
  //     await updateUnit(spaceId, stackId, pathId, unitId, {
  //       name: editingUnitName,
  //     });
  //     setStack((prev) => ({
  //       ...prev,
  //       paths: prev.paths.map((path) =>
  //         path.id === pathId
  //           ? {
  //               ...path,
  //               units: path.units.map((u) =>
  //                 u.id === unitId ? { ...u, name: editingUnitName } : u
  //               ),
  //             }
  //           : path
  //       ),
  //     }));
  //     setEditingUnitId(null);
  //   } catch (err) {
  //     console.error('Failed to update unit', err);
  //   }
  // };

  if (loading) return <p className="text-gray-600 text-lg">Loading...</p>;
  if (!stack) return <p className="text-red-600">Stack not found</p>;

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Stack: <span className="italic text-gray-700">{stack.name}</span></h1>

      {/* Add Path */}
      <div className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          placeholder="New path name"
          value={newPathName}
          onChange={(e) => setNewPathName(e.target.value)}
          className="border rounded px-3 py-2 w-64 shadow-sm"
        />
        <button
          onClick={handleCreatePath}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md"
        >
          <FaPlus className="inline mr-2" /> Add Path
        </button>
      </div>

      <div className="space-y-6">
        {(stack.paths || []).map((path, index) => (
          <div key={path.id} className="border rounded-lg shadow-md bg-white">
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => togglePath(path.id)}
            >
              <div className="flex items-center gap-3">
                {expandedPathId === path.id ? <FaChevronDown /> : <FaChevronRight />}
                {editingPathId === path.id ? (
                  <input
                    value={editingPathName}
                    onChange={(e) => setEditingPathName(e.target.value)}
                    className="border rounded px-2 py-1 w-64"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="mb-2">
                    <h2 className="text-lg italic text-gray-700">
                      Path {index + 1}:{' '}
                      <span className="not-italic font-semibold text-[#F53E47] capitalize">{path.name}</span>
                    </h2>
                  </div>

                )}
              </div>
              <div className="flex items-center gap-2">
                {editingPathId === path.id ? (
                  <>
                    <FaCheck
                      className="text-green-600 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleEditPath(path.id);
                      }}
                    />
                    <FaTimes
                      className="text-gray-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPathId(null);
                      }}
                    />
                  </>
                ) : (
                  <FaPencilAlt
                    className="text-gray-500 hover:text-blue-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPathId(path.id);
                      setEditingPathName(path.name);
                    }}
                  />
                )}
                <FaTrash
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePath(path.id);
                  }}
                />
              </div>
            </div>

            {expandedPathId === path.id && (
              <div className="bg-gray-50 px-6 py-4 space-y-4">
                {/* Add Unit */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="New unit name"
                    value={unitInputs[path.id] || ''}
                    onChange={(e) =>
                      setUnitInputs({ ...unitInputs, [path.id]: e.target.value })
                    }
                    className="border px-3 py-2 rounded w-64 shadow-sm"
                  />
                  <button
                    onClick={() => handleAddUnit(path.id)}
                    className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 shadow-md"
                  >
                    Add Unit
                  </button>
                </div>

                {/* Unit List */}
                <ul className="space-y-2">
                  {(path.units || []).map((unit, idx) => (
                    <li
                      key={unit.id}
                      className="bg-white border rounded p-3 flex justify-between items-center shadow-md"
                    >
                      <div>
                        <i className="text-grey-700">Unit {idx + 1}:</i>{' '}
                        {editingUnitId === unit.id ? (
                          <input
                            value={editingUnitName}
                            onChange={(e) => setEditingUnitName(e.target.value)}
                            className="border px-2 py-1 rounded w-48"
                          />
                        ) : (
                          <strong className="text-blue-800 capitalize">{unit.name}</strong>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {editingUnitId === unit.id ? (
                          <>
                            <FaCheck
                              className="text-green-600 cursor-pointer"
                            // onClick={() => handleEditUnit(path.id, unit.id)}
                            />
                            <FaTimes
                              className="text-gray-500 cursor-pointer"
                              onClick={() => setEditingUnitId(null)}
                            />
                          </>
                        ) : (
                          <FaPencilAlt
                            className="text-gray-500 hover:text-blue-600 cursor-pointer"
                            onClick={() => {
                              setEditingUnitId(unit.id);
                              setEditingUnitName(unit.name);
                            }}
                          />
                        )}
                        <FaTrash
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => handleDeleteUnit(path.id, unit.id)}
                        />
                      </div>
                    </li>

                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackDetailTab;
