import nookliAPI from './nookliApiInstance';

// POST /spaces/{space_id}/stacks/{stack_id}/paths - Create a new path
export const createPath = async (spaceId, stackId, data) => {
    try {
        const response = await nookliAPI.post(`/spaces/${spaceId}/stacks/${stackId}/paths`, data);
        return response.data;
    } catch (error) {
        console.error('Create path error:', error);
        throw error;
    }
};

// GET /spaces/{space_id}/stacks/{stack_id}/paths - List all paths in a stack
export const getAllPaths = async (spaceId, stackId) => {
    try {
        const response = await nookliAPI.get(`/spaces/${spaceId}/stacks/${stackId}/paths`);
        return response.data;
    } catch (error) {
        console.error('List paths error:', error);
        throw error;
    }
};

// GET /spaces/{space_id}/stacks/{stack_id}/paths/{path_id} - Get a specific path
export const getPathById = async (spaceId, stackId, pathId) => {
    try {
        const response = await nookliAPI.get(`/spaces/${spaceId}/stacks/${stackId}/paths/${pathId}`);
        return response.data;
    } catch (error) {
        console.error('Get path error:', error);
        throw error;
    }
};

// DELETE /spaces/{space_id}/stacks/{stack_id}/paths/{path_id} - Delete a path
export const deletePath = async (spaceId, stackId, pathId) => {
    try {
        const response = await nookliAPI.delete(`/spaces/${spaceId}/stacks/${stackId}/paths/${pathId}`);
        return response.data;
    } catch (error) {
        console.error('Delete path error:', error);
        throw error;
    }
};


// **** UNIT ****

// POST /spaces/{space_id}/stacks/{stack_id}/paths - Create a new path
export const createUnit = async (spaceId, stackId, path_id, data) => {
    try {
        const response = await nookliAPI.post(`/spaces/${spaceId}/stacks/${stackId}/paths/${path_id}/units`, data);
        return response.data;

    } catch (error) {
        console.error('Create path error:', error);
        throw error;
    }
};

// DELETE /spaces/{space_id}/stacks/{stack_id}/paths/{path_id}/units/unit_id - Delete a unit
export const deleteUnit = async (spaceId, stackId, unitId, pathId) => {
    try {
        const response = await nookliAPI.delete(`/spaces/${spaceId}/stacks/${stackId}/paths/${pathId}/unit/${unitId}`);
        return response.data;
    } catch (error) {
        console.error('Delete path error:', error);
        throw error;
    }
};