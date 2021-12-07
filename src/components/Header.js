import { Fragment, useEffect, useState, useContext } from 'react'
import { AppContext } from '../context/Provider';
import { Menu, Transition } from '@headlessui/react';

import { firebaseApp } from '../firebase/credenciales'
import { getAuth, signOut } from 'firebase/auth'
import { getInfo } from '../firebase/functions';

import { Modal } from './Modal';

import iso from '../assets/img/iso.png'

const auth = getAuth(firebaseApp);

export const Header = () => {
  const [modal, setModal] = useState(false)
  const [mostrar, setMostrar] = useState(false)
  const [usuarioGlobal, setUsuarioGlobal] = useContext(AppContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (usuarioGlobal !== null) {
      getProfile(usuarioGlobal);
    }
  }, [usuarioGlobal]);

  const getProfile = async () => {
    const profile = await getInfo('usuarios', usuarioGlobal.uid);
    if (profile) {
      setProfile(profile)
    }
  }

  const handleModal = (data) => {
    setModal(data)
  }

  if(!profile) {
    return false;
  }

  return (
    <>
    <nav className="bg-white sticky top-0 z-50 w-full shadow-md">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="flex items-center bg-indigo-100 rounded-md border border-transparent shadow-sm px-3 text-base font-bold text-indigo-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm">
                  <img src={iso} className="w-10 mr-2 bg-transparent" alt="La lista de regalos" /><span>Mi lista para Papá Noel</span></a>
                </div>
              </div>
              <div className="absolute z-20 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>

                      <span className="sr-only">Open user menu</span>
                      {usuarioGlobal ?
                      <Menu.Button>
                        <span className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-100 text-base font-medium text-indigo-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">Hola, {profile.nombre}</span>
                      </Menu.Button>

                      :

                    <button onClick={() => setModal(!modal)}>
                        <span className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">Iniciar sesión</span>
                        </button>
                      }

                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                      {usuarioGlobal ?

                        <Menu.Item>
                          {({ active }) => (
                            <button onClick={() => signOut(auth)} className="block px-4 py-2 text-sm text-gray-700">Cerrar sesión</button>
                          )}
                        </Menu.Item>
                        :
                        ''
                      }

                      {usuarioGlobal ?
                        ''
                        :
                        <Menu.Item>
                          {({ active }) => (
                            <button className="block px-4 py-2 text-sm text-gray-700">Login</button>
                          )}
                        </Menu.Item>
                      }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
    </nav>
    <Modal modal={handleModal} show={modal} />
    </>
  )
}
