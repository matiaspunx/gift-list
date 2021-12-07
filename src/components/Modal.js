import { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AppContext } from "../context/Provider";
import { firebaseApp } from "../firebase/credenciales"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

export const Modal = ({modal, show}) => {
  const [open, setOpen] = useState(false)
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [usuarioGlobal, setUsuarioGlobal] = useContext(AppContext);

  useEffect(() => {
    setOpen(show)
  }, [show]);

  useEffect(() => {
    modal(open)
  }, [open]);


  const loginHandler = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    let nombre = ''
    if(isRegistrando===true) {
      nombre = e.target.nombre.value
    }
    console.log('login??')
    LoginUSer(nombre, email, password)
  }


  const LoginUSer = async (nombre, email, password) => {
    if (isRegistrando) {
      const usuario = await createUserWithEmailAndPassword(auth, email, password);
      if (usuario) {
        const ref = doc(firestore, `usuarios/${usuario.user.uid}`);
        setDoc(ref, { nombre: nombre, correo: email, uid: usuario.user.uid})
      }
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={loginHandler}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    {isRegistrando ?
                      <h3 className="mb-3 text-center text-2xl font-bold text-indigo-500">Registrate con tu email</h3>
                      :
                      <h3 className="mb-3 text-center text-2xl font-bold text-indigo-500">Iniciar sesión</h3>
                    }
                    {isRegistrando
                    ?
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Nombre de usuario
                        </label>
                        <input
                          id="nombre-usuario"
                          name="nombre"
                          type="nombre"
                          autoComplete="nombre"
                          required
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 mb-2 sm:text-sm"
                          placeholder="Nombre de usuario"
                        />
                      </div>
                    :
                    ''
                    }

                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 mb-2 sm:text-sm"
                        placeholder="Dirección de Email"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Contraseña"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 mb-4">
                  <button
                    type="submit"
                    className="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                    Iniciar sesión
                  </button>
                </div>
              </form>
              <div className="w-full pb-4 text-center text-2xl font-bold text-indigo-400">
                {isRegistrando
                ?
                  <p>Si, ya tenés cuenta <button onClick={() => setIsRegistrando(false)}>Iniciá sesión</button></p>
                :
                  <p>¿No tenés cuenta? <button onClick={() => setIsRegistrando(true)}>¡Creá una ahora!</button></p>
                }
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
