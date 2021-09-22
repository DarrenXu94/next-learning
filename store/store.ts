import { proxy } from "valtio";

import UserState, { updateUser } from "./stores/UserStore";

export const state = proxy({
  ...UserState,
});

export { updateUser };
