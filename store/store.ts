import { proxy } from "valtio";
import ImageStore, { resetImages, addImageUrl } from "./stores/ImageStore";

import SessionState, {
  updateSession,
  addFollowerToSession,
  removeFollowerFromSession,
} from "./stores/SessionStore";

export const state = proxy({
  ...SessionState,
  ...ImageStore,
});

export {
  updateSession,
  addFollowerToSession,
  removeFollowerFromSession,
  resetImages,
  addImageUrl,
};
