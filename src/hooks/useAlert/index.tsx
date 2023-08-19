import { createContext, Dispatch, ReactElement, useCallback, useContext, useReducer } from 'react';
import { ActionTypes } from '@/hooks/useAlert/ActionTypes.ts';

interface AlertContextProps {
  alerts: {
    type: 'success' | 'error' | 'info';
    message: string;
    timeout?: number;
    title?: string;
  }[];
  dispatch: Dispatch<AlertAction>;
  handleAlert: (alert: AlertContextProps['alerts'][0]) => void;
}

type AlertAction = { type: ActionTypes.ADD_ALERT; alert: AlertContextProps['alerts'][0] } | { type: ActionTypes.REMOVE_ALERT };

export const AlertContext = createContext<AlertContextProps>({
  dispatch(value: AlertAction) {
    console.log("AlertContext's dispatch function is not initialized", value);
  },
  handleAlert(value: AlertContextProps['alerts'][0]) {
    console.log("AlertContext's handleAlert function is not initialized", value);
  },
  alerts: [],
});

function alertReducer(state: AlertContextProps['alerts'], action: AlertAction) {
  switch (action.type) {
    case ActionTypes.ADD_ALERT:
      return [...state, action.alert];
    case ActionTypes.REMOVE_ALERT:
      return state.slice(1);
    default:
      return state;
  }
}
interface AlertProviderProps {
  children: ReactElement | ReactElement[];
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, dispatch] = useReducer(alertReducer, []);

  const handleAlert = useCallback((alert: AlertContextProps['alerts'][0]) => {
    dispatch({ type: ActionTypes.ADD_ALERT, alert });
    setTimeout(() => {
      dispatch({ type: ActionTypes.REMOVE_ALERT });
    }, alert.timeout || 3000);
  }, []);

  return <AlertContext.Provider value={{ alerts, dispatch, handleAlert }}>{children}</AlertContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const Alert = useContext(AlertContext);
  if (!Alert) {
    throw Error('index needs to be inside inside AlertProvider');
  }
  return Alert;
};
