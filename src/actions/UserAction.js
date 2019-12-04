import { ActionTypes } from 'const';

class UserAction {

  static setUser({ name}) {
    return {
      type: ActionTypes.SET_USER,
      name,      // User name
    }
  }

}

export default UserAction;
