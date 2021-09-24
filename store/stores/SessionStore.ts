import { Follower, Session } from "../../domains/session";
import { state } from "../store";

type SessionStateType = {
  session: Session | undefined;
};

export const SessionState: SessionStateType = {
  session: undefined,
};

export const updateSession = (session: Session | undefined) => {
  state.session = session;
};

export const addFollowerToSession = (follower: Follower) => {
  state.session?.following.push(follower);
};

export const removeFollowerFromSession = (username: string) => {
  if (state.session) {
    state.session.following = state.session.following.filter(
      (follower) => follower.username !== username
    );
  }
};

export default SessionState;
