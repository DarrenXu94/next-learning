import { Session } from "../../domains/session";
import { state } from "../store";

type SessionStateType = {
  session: Session | undefined;
};

export const SessionState: SessionStateType = {
  session: undefined,
};

export const updateSession = (session: Session) => {
  state.session = session;
};

export default SessionState;
