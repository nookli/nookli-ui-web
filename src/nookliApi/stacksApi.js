import nookliAPI from './nookliApiInstance';

// POST /spaces/{space_id}/stacks - Create a new stack
export const createStack = async (spaceId, data) => {
  try {
    const response = await nookliAPI.post(`/spaces/${spaceId}/stacks`, data);
    return response.data;
  } catch (error) {
    console.error('Create stack error:', error);
    throw error;
  }
};

// GET /spaces/{space_id}/stacks - List all stacks in a space
export const listStacks = async (spaceId) => {
  try {
    const response = await nookliAPI.get(`/spaces/${spaceId}/stacks`);
    return response.data;
  } catch (error) {
    console.error('List stacks error:', error);
    throw error;
  }
};

// GET /spaces/{space_id}/stacks/{stack_id} - Get a specific stack
export const getStackById = async (spaceId, stackId) => {
  try {
    const response = await nookliAPI.get(`/spaces/${spaceId}/stacks/${stackId}`);
    return response.data;
  } catch (error) {
    console.error('Get stack error:', error);
    throw error;
  }
};

// PUT /spaces/{space_id}/stacks/{stack_id} - Rename or update a stack
export const updateStack = async (spaceId, stackId, data) => {
  try {
    const response = await nookliAPI.put(`/spaces/${spaceId}/stacks/${stackId}`, data);
    return response.data;
  } catch (error) {
    console.error('Update stack error:', error);
    throw error;
  }
};
