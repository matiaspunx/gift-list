import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { firebaseApp } from '../firebase/credenciales';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { AppContext } from '../context/Provider';
import { getInfo, saveRegalo } from '../firebase/functions'

const storage = getStorage(firebaseApp);

export const AgregarRegalo = () => {
  const [usuarioGlobal, setUsuarioGlobal] = useContext(AppContext);
  const [uid, setUid] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)

  const urlParams = useParams();
  const regaloParam = urlParams.regalo;
  const [regalo, setRegalo] = useState([])

  const regaloDefault = [
    {
      regalo: '',
      url: '',
      img: ''
    }
  ]

  useEffect(() => {
    if (regaloParam && usuarioGlobal!==null) {
      getRegalo(regaloParam, usuarioGlobal.uid)
    }
  }, [regaloParam, usuarioGlobal]);

  const getRegalo = async (regaloParam, uid) => {
    setRegalo([]);
    const regalin = await getInfo(`usuarios/${uid}/regalos`, regaloParam);
    if (regalin) {
      console.log('hay puto regalin???')
      setRegalo(regalin)
      setImageSrc(regalin.img)
      console.log(regalo)
    } else {
      setRegalo(regaloDefault)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const regalo = e.target.regalo.value
    const url = e.target.url.value
    const img = imageSrc
    let id;
    if (regaloParam) {
      id = regaloParam;
    }else{
      id = 'nuevo'
    }
    if(regalo && url && img) {
      console.log('save?')
      await saveRegalo(usuarioGlobal.uid, regalo, url, img, id);
    }else{
      console.log('no se pudo agregar el regalo')
    }

    e.target.reset();
    setRegalo([]);
    setImageSrc(null)
  }

  async function fileHandler(e) {
    const archivoLocal = e.target.files[0];

    const archivoRef = ref(storage, `images/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);

    setImageSrc(await getDownloadURL(archivoRef))
  }

  if(!usuarioGlobal || !regalo) {
    return false
  }

  return (
      <div className="flex justify-center">
        <div className="w-full py-6 px-8 bg-green-200 bg-opacity-50 rounded-2xl shadow-xl">
          {regalo ?
          <h1 className="mb-3 text-md font-bold text-green-600">Editando {regalo.regalo}</h1>
          :
          <h1 className="mb-3 text-md font-bold text-green-600">Agregar un nuevo regalo</h1>
          }
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="regalo" className="block text-green-600 text-sm font-medium">Regalo</label>
            <input type="text" name="regalo" id="regalo" placeholder="Regalo" className="w-full border border-green-300 p-2 rounded mt-2 text-sm placeholder-green-300 text-green-500 focus:outline-none focus:ring-green-400 focus:border-green-400 focus:z-10" autoComplete="off" defaultValue={regalo.regalo} />
            </div>

            <div className="mb-4">
              <label htmlFor="url" className="block text-green-600 text-sm font-medium">Enlace al regalo</label>
            <input type="text" name="url" id="url" placeholder="http://..." className="w-full border border-green-300 p-2 rounded mt-2 text-sm placeholder-green-300 text-green-500 focus:outline-none focus:ring-green-400 focus:border-green-400 focus:z-10" autoComplete="off" defaultValue={regalo.url} />
            </div>

          <div>
            <label className="block text-sm font-medium text-green-600">Imagen del regalo</label>
            <div className="mt-1 mb-4 flex justify-center px-6 pt-5 pb-6 border-2 border-green-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="flex justify-center">
                  {imageSrc ?
                    <img src={imageSrc} key={imageSrc} alt="" className="h-16 w-16 object-center object-cover rounded-md mx-2" />
                    :
                    ''
                  }
                </div>


                {imageSrc ?
                  ''
                  :
                  <svg
                    className="mx-auto h-12 w-12 text-green-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }

                <div className="flex justify-center text-sm text-gray-600">
                  <label
                    htmlFor="img"
                    className="relative cursor-pointer bg-white rounded-md py-1 px-1 font-medium text-green-500 hover:text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-400"
                  >
                    {imageSrc ?
                      <span>Click acá para cambiar la imagen</span>
                      :
                      <span>Click acá para subir una imagen</span>
                    }

                    <input id="img" name="img" type="file" className="sr-only" onChange={fileHandler} />
                  </label>
                </div>
                <p className="text-xs text-green-500">PNG, JPG, GIF hasta 1MB</p>
              </div>
            </div>

          </div>



            <button className="cursor-pointer py-2 px-4 block bg-green-600 text-white font-bold w-full text-center rounded">Guardar regalo</button>
          </form>
        </div>
      </div>
  )
}
