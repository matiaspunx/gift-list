import { firebaseApp } from "./credenciales";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  deleteDoc
} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

export async function getInfo(path, id) {
  let docu = [];
  console.log(path)
  console.log(id)
  const docRef = doc(firestore, path, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //docSnap.data()
    docu = docSnap.data();
  } else {
    console.log("no existe el documento...");
  }

  return docu;
}

export async function deleteRegalo(uid, id) {
  if (window.confirm("¿Estás seguro que querés borrar el regalo?")) {
    await deleteDoc(doc(firestore, `usuarios/${uid}/regalos`, id));
  }
}

export async function saveRegalo(uid, regalo, url, img, id) {
  let ref;
  const timestamp = Date.now();

  // la cosa acá es que si el regalo es nuevo, voy a generar un nuevo documento en Firebase con un id autogenerado...
  if (id === 'nuevo') {
    ref = doc(collection(firestore, "usuarios", uid, "regalos"));
    id = ref.id;
  // pero si el regalo ya existe no lo voy a crear solo lo voy a actualizar...
  } else {
    ref = doc(firestore, `usuarios/${uid}/regalos`, id);
  }

  await setDoc(ref, {
    regalo: regalo,
    url: url,
    img: img,
    id: id,
    date: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(timestamp)
  });

}