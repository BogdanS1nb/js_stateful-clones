'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Клонируем исходный объект
  const history = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    if (type === 'clear') {
      currentState = {};
    } else if (type === 'addProperties') {
      Object.assign(currentState, extraData);
    } else if (type === 'removeProperties') {
      if (keysToRemove) {
        for (let j = 0; j < keysToRemove.length; j++) {
          delete currentState[keysToRemove[j]];
        }
      }
    }
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
