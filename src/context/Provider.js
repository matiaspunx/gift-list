import { createContext, useState } from 'react';

import { firebaseApp } from "../firebase/credenciales"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(firebaseApp);

export const Provider = ({ children }) => {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuarioGlobal(usuarioFirebase);
    } else {
      setUsuarioGlobal(null);
    }
  })

  //const [state, setState] = useState({});
  return (
    <AppContext.Provider value={[usuarioGlobal, setUsuarioGlobal]}>
      {children}
    </AppContext.Provider>
  );
}

export const AppContext = createContext();