/**
 * @file Vuex related utility functions.
 * @author Mark Conway-Greenslade
 */

 /**
  * Sets a property within a state store.
  */
export const set = property => (state, payload) => (state[property] = payload)

/**
 * Toggles the value of a boolean property within a state store.
 */
export const toggle = property => state => (state[property] = !state[property])
