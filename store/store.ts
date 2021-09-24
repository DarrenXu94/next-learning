import { proxy } from "valtio";

import SessionState, {
  updateSession,
  addFollowerToSession,
  removeFollowerFromSession,
} from "./stores/SessionStore";

export const state = proxy({
  ...SessionState,
});

export { updateSession, addFollowerToSession, removeFollowerFromSession };
