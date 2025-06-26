import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { AiOutlineTeam } from 'react-icons/ai';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemText } from '@mui/material';
import useSpacesStore from '../redux/useSpacesStore';
import { listSpaces } from '../nookliApi/spacesApi';
import clsx from 'clsx';

const Sidebar = ({ isOpen }) => {
  const { spaces, setSpaces } = useSpacesStore();
  const [openTypes, setOpenTypes] = useState({});
  const location = useLocation();
  const { spaceId } = useParams();

  // ✅ Fetch spaces on mount
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await listSpaces();
        setSpaces(response);
      } catch (error) {
        console.error('Failed to fetch spaces:', error);
      }
    };

    fetchSpaces();
  }, []);

  // ✅ Group spaces by type
  const groupedSpaces = spaces.reduce((acc, space) => {
    const type = space.type || 'General';
    if (!acc[type]) acc[type] = [];
    acc[type].push(space);
    return acc;
  }, {});

  const toggleType = (type) => {
    setOpenTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div
      className={clsx(
        'transition-all duration-300 border-r bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 h-full overflow-y-auto shadow-sm',
        isOpen ? 'w-[270px]' : 'w-0'
      )}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Spaces</h2>

        <List component="nav" disablePadding>
          {Object.entries(groupedSpaces).map(([type, typeSpaces]) => (
            <div key={type}>
              <ListItem
                button
                onClick={() => toggleType(type)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4"
              >
                <ListItemText
                  primary={
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                      {type}
                    </span>
                  }
                />
                {openTypes[type] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={openTypes[type]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {typeSpaces.map((space) => {
                    const isActive = location.pathname.includes(space.space_id);

                    return (
                      <Link key={space.space_id} to={`/dashboard/flows/${space.space_id}`} className="block">
                        <ListItem
                          button
                          className={clsx(
                            'pl-8 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 group',
                            isActive ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white font-semibold' : ''
                          )}
                        >
                          <AiOutlineTeam
                            className={clsx(
                              'mr-2 text-gray-500 group-hover:text-blue-500 dark:text-gray-400',
                              isActive && 'text-blue-600 dark:text-white'
                            )}
                          />
                          <ListItemText
                            primary={
                              <span className={clsx(isActive && 'font-semibold')}>
                                {space.name}
                              </span>
                            }
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
