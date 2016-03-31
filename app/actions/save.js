
export const TOGGLE_SAVE = 'TOGGLE_SAVE';
export function saveMission() {
  return {
    type: TOGGLE_SAVE,
    saved: true
  };
};

export function unSaveMission() {
  return {
    type: TOGGLE_SAVE,
    saved: false
  };
};
