import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Provider";
import { useParams, useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  query,
  limit,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { deleteRegalo, getInfo } from "../firebase/functions";
import { AgregarRegalo } from "../components/AgregarRegalo";
import { RegalosList } from "../components/RegalosList";

export const Profile = () => {
  const [usuarioGlobal, setUsuarioGlobal] = useContext(AppContext);
  const [profile, setProfile] = useState();
  const urlParams = useParams();
  const usernameParam = urlParams.user;
  const [loc, setLoc] = useState(usernameParam);

  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioGlobal !== null) getProfile(usuarioGlobal);
  }, [usuarioGlobal])

  const getProfile = async () => {
    const profile = await getInfo("usuarios", usuarioGlobal.uid);
    if (profile) {
      setProfile(profile);
    }
  }

  const editRegalo = (id) => {
    setTimeout(() => {
      navigate(`/${profile.nombre}/${id}`, { replace: true });
    }, 100);
  }

  const messagesRef = profile
    ? collection(getFirestore(firebaseApp), "usuarios", profile.uid, "regalos")
    : collection(getFirestore(firebaseApp), "usuarios");

  const q = query(messagesRef, limit(25));
  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  if (!usuarioGlobal && !profile) {
    return false;
  }

  return (
    <div className="flex flex-col justify-center sm:py-4">
      <div className="relative sm:max-w-4xl sm:mx-auto">
        <div className="relative px-4 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-6 bg-clip-padding bg-opacity-50 border border-gray-200 blur-bg">
          <div className="max-w-4xl mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="flex justify-between">
                <div className="text-base leading-6 space-y-4 text-gray-500 pr-8 sm:text-lg sm:leading-7">
                  <h1 className="text-xl font-bold text-gray-500">
                    Lista de regalos de {profile && profile.nombre}
                  </h1>
                  <p className="mb-3 text-sm leading-6 text-gray-900">
                    Hola, si querés me podés regalar cualquiera de los siguientes regalos.
                  </p>

                  <div className="flex flex-col max-w-md mx-auto">
                    <ul className="my-2">
                      {value &&
                        value.docs.map((doc) => (
                          <RegalosList key={doc.id} regalo={doc.data()} edit={editRegalo} profile={profile} />
                        ))}
                    </ul>
                  </div>
                </div>

                <AgregarRegalo />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
