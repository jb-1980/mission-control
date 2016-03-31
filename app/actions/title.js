import uuid from 'node-uuid';

export const CREATE_TITLE = 'CREATE_TITLE';
export function createTitle(title) {
  return {
    type: CREATE_TITLE,
    ...title
  };
};
