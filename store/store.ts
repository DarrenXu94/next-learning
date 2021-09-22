import { proxy } from "valtio";

import SessionState, { updateSession } from "./stores/SessionStore";

export const state = proxy({
  ...SessionState,
});

export { updateSession };
