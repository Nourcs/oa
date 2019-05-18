import firebase from "../../../Config/firebase";
const FETCH_USER = "fetch_user";

export const fetchUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(function(res) {
    if (res) {
      let { uid, photoURL, displayName } = res;
      dispatch({
        type: FETCH_USER,
        payload: { uid, photoURL, displayName }
      });
    } else {
      return dispatch({ type: FETCH_USER });
    }
  });
};

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
