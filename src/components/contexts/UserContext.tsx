import { createContext, ReactNode, useContext, useReducer } from 'react';
import { User } from 'firebase/auth';
import { useEffect } from 'react';

type AuthActions =
  | { type: 'SIGN_IN'; payload: { user: User } }
  | { type: 'SIGN_OUT' }
  | { type: 'UNKNOWN' };

export type AuthState =
  | {
      state: 'SIGNED_IN';
      currentUser: User;
    }
  | {
      state: 'SIGNED_OUT';
    }
  | {
      state: 'UNKNOWN';
    };

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        state: 'SIGNED_IN',
        currentUser: action.payload.user
      };

    case 'SIGN_OUT':
      return {
        state: 'SIGNED_OUT'
      };

    case 'UNKNOWN':
      return {
        state: 'UNKNOWN'
      };

    default:
      return state;
  }
};

type AuthContextProps = {
  state: AuthState;
  dispatch: (value: AuthActions) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  state: { state: 'UNKNOWN' },
  dispatch: (val) => {}
});

function loadFromLocalStorage() {
  const ls = localStorage.getItem('user');
  return ls ? JSON.parse(ls) : null;
}

function createInitialState(): AuthState {
  const user = loadFromLocalStorage();
  if (user) {
    return {
      state: 'SIGNED_IN',
      currentUser: user
    };
  }

  return {
    state: 'UNKNOWN'
  };
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, createInitialState());

  useEffect(() => {
    if (state.state === 'SIGNED_IN') {
      window.localStorage.setItem('user', JSON.stringify(state.currentUser));
    } else if (state.state === 'SIGNED_OUT') {
      window.localStorage.removeItem('user');
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => {
  const { state } = useContext(AuthContext);

  return {
    user: state.state === 'SIGNED_IN' ? state.currentUser : null
  };
};

const useSignIn = () => {
  const { dispatch } = useContext(AuthContext);
  return {
    signIn: (user: User) => {
      dispatch({ type: 'SIGN_IN', payload: { user } });
    }
  };
};

const useSignOut = () => {
  const { dispatch } = useContext(AuthContext);
  return {
    signOut: () => {
      dispatch({ type: 'SIGN_OUT' });
    }
  };
};

export { useAuthState, useSignIn, useSignOut, AuthProvider };
