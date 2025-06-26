import nookliAPI from './nookliApiInstance';

// POST /spaces - Create a new space
export const createSpace = async (data) => {
  try {
    const response = await nookliAPI.post('/spaces', data);
    return response.data;
  } catch (error) {
    console.error('Create space error:', error);
    throw error;
  }
};

// GET /spaces - List all spaces
export const listSpaces = async () => {
  try {
    const response = await nookliAPI.get('/spaces');
    return response.data;
  } catch (error) {
    console.error('List spaces error:', error);
    throw error;
  }
};

// GET /spaces/{space_id} - Get a single space by ID
export const getSpaceById = async (spaceId) => {
  try {
    const response = await nookliAPI.get(`/spaces/${spaceId}`);
    return response.data;
  } catch (error) {
    console.error('Get space error:', error);
    throw error;
  }
};

// Put /spaces/{space_id} - update a single space by ID
export const updateSpace = async (spaceId, data) => {
  try {
    const response = await nookliAPI.put(`/spaces/${spaceId}`, data);
    return response.data;
  } catch (error) {
    console.error('Get space error:', error);
    throw error;
  }
};

// DELETE /spaces/{space_id} - Delete a single space by ID
export const deleteSpace = async (spaceId) => {
  try {
    const response = await nookliAPI.delete(`/spaces/${spaceId}`);
    return response.data;
  } catch (error) {
    console.error('Get space error:', error);
    throw error;
  }
};