import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Button,
    Modal,
    TextField,
    Box
} from '@mui/material';
import {
    listStacks,
    createStack,
    getStackById,
    updateStack
} from '../../../nookliApi/stacksApi';
import { FaEdit, FaPlus } from 'react-icons/fa';

const StacksTab = () => {
    const { spaceId } = useParams();
    const navigate = useNavigate();

    const [stacks, setStacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedStack, setSelectedStack] = useState(null);
    const [stackName, setStackName] = useState('');

    // 📥 Fetch stacks
    const fetchStacks = async () => {
        setLoading(true);
        try {
            const response = await listStacks(spaceId);
            setStacks(response);
        } catch (err) {
            console.error('Failed to fetch stacks:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStacks();
    }, [spaceId]);

    // ➕ Create or ✏️ Edit stack
    const handleSave = async () => {
        try {
            if (editMode && selectedStack) {
                await updateStack(spaceId, selectedStack.id, { name: stackName });
            } else {
                await createStack(spaceId, { name: stackName });
            }
            await fetchStacks();
            setOpenModal(false);
            setStackName('');
            setEditMode(false);
            setSelectedStack(null);
        } catch (error) {
            console.error('Save stack error:', error);
        }
    };

    // ✏️ Open modal to edit
    const handleEdit = (stack) => {
        setEditMode(true);
        setSelectedStack(stack);
        setStackName(stack.name);
        setOpenModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <Typography variant="h5" className="font-semibold">
                    Stacks in Space
                </Typography>
                <Button
                    startIcon={<FaPlus />}
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                >
                    Add New Stack
                </Button>
            </div>

            {loading ? (
                <Typography>Loading stacks...</Typography>
            ) : stacks.length === 0 ? (
                <div className="text-center mt-20">
                    <Typography variant="h6" color="textSecondary">
                        No stacks available in this space.
                    </Typography>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stacks.map((stack) => (
                        <Card
                            key={stack.id}
                            className="cursor-pointer hover:shadow-lg border border-gray-200"
                            sx={{
                                background: '#fdfdfd',
                                borderRadius: '10px',
                                transition: '0.2s ease-in-out'
                            }}
                        >
                            <CardContent className="relative">
                                <Typography variant="h6" className="mb-2 font-semibold text-indigo-700">
                                    📘 {stack.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Stack ID: {stack.id}
                                </Typography>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(stack);
                                    }}
                                    className="absolute top-2 right-2"
                                >
                                    <FaEdit fontSize="small" />
                                </IconButton>
                                <Link to={`/dashboard/spaces/${spaceId}/stacks/${stack.id}`}
                                    className="mt-2 text-sm text-blue-500 underline block"
                                >
                                    Open Space
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    className="bg-white rounded-md p-6 shadow-lg w-[90%] sm:w-[400px] mx-auto mt-40"
                >
                    <Typography variant="h6" gutterBottom>
                        {editMode ? 'Edit Stack' : 'Create New Stack'}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Stack Name"
                        value={stackName}
                        onChange={(e) => setStackName(e.target.value)}
                        className="mt-4"
                    />
                    <div className="flex justify-end gap-2 mt-6">
                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default StacksTab;
