import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

export function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const eventSub = AppState.addEventListener('change', event => {
      setAppState(event);
    });

    return () => {
      eventSub.remove();
    };
  }, []);

  return appState;
}
