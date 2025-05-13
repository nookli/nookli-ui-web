import React, { useState } from 'react';
import {
    Box,
    InputBase,
    Typography
} from '@mui/material';
import { FaFileAlt, FaFolder, FaLayerGroup, FaUser, FaSearch } from 'react-icons/fa';
import clsx from 'clsx';

const TABS = ['All', 'Blocks', 'Stacks', 'Workspaces'];

const searchResults = [
    {
        title: 'Project Brief – Q3 Marketing Strategy',
        tag: 'Block',
        icon: <FaFileAlt size={20} className="text-white" />,
    },
    {
        title: 'Project Bravo Workspace',
        tag: 'Workspace',
        icon: <FaFolder size={20} className="text-white" />,
    },
    {
        title: 'Project Bravo Onboarding',
        tag: 'Stack',
        icon: <FaLayerGroup size={20} className="text-white" />,
    },
    {
        title: 'Neo Smith',
        tag: null,
        icon: <FaUser size={20} className="text-white" />,
    },
];

const SearchPopup = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [query, setQuery] = useState('');

    const filteredResults = searchResults.filter((item) => {
        const matchTab =
            activeTab === 'All' || item.tag?.toLowerCase() === activeTab.toLowerCase();
        const matchQuery = item.title.toLowerCase().includes(query.toLowerCase());
        return matchTab && matchQuery;
    });

    return (
        <>
            {/* Search Input */}
            <Box sx={{ mt: 5, mb: 3, position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', color: '#aaa' }} />
                <InputBase
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    fullWidth
                    sx={{
                        pl: 4,
                        py: 1,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        fontSize: 14
                    }}
                />
            </Box>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            'px-4 py-2 rounded-full text-sm font-medium transition',
                            activeTab === tab
                                ? 'bg-[#F53E47] text-white'
                                : 'bg-red-100 text-[#F53E47] hover:bg-[#F53E47] hover:text-white'
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search Results */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {filteredResults.length > 0 ? (
                    filteredResults.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 2,
                                mb: 1,
                                backgroundColor: '#f8f8f8',
                                borderRadius: 2,
                                '&:hover': { backgroundColor: '#f0f0f0' }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    p: 1.2,
                                    borderRadius: '50%',
                                    backgroundColor: '#F53E47',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {item.icon}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#2563EB', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: 12, color: '#777' }}>
                                        Last updated by Amira Khan • 2 days ago • Google Docs
                                    </Typography>
                                </Box>
                            </Box>
                            {item.tag && (
                                <Box sx={{
                                    backgroundColor: '#333',
                                    color: 'white',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 20,
                                    fontSize: 12,
                                }}>
                                    {item.tag}
                                </Box>
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', mt: 5, color: '#999' }}>
                        No results found.
                    </Typography>
                )}
            </Box>

            {/* Footer */}
            <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Typography
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                        color: '#F53E47',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    Open search page
                </Typography>
            </Box>
        </>
    );
};

export default SearchPopup;
