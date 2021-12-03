import { useEffect, useState } from "react"
import regalosList from "./data/regalos.json"

export const App = () => {
  const [regalos, setRegalos] = useState([])

  useEffect(() => {
    setRegalos(regalosList)
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    const newItem = {
      item: e.target.item.value,
      url: e.target.url.value,
      img: e.target.img.value
    }

    setRegalos(prevState => {
      return [...prevState, newItem];
    });

    e.target.reset();
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-4 big-bg">
        <div className="relative sm:max-w-4xl sm:mx-auto">
          <div className="relative px-4 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-6 bg-clip-padding bg-opacity-50 border border-gray-200 blur-bg">
            <div className="max-w-4xl mx-auto">
              <div className="divide-y divide-gray-200">

                <div className="flex items-center justify-between">

                  <div className="text-base leading-6 space-y-4 text-gray-700 pr-8 sm:text-lg sm:leading-7">
                    <h1 className="mb-3 text-xl font-bold text-gray-700">Mi lista de regalos</h1>
                    <p className="text-sm leading-6 text-gray-900">Me podés regalar cualquiera de los siguientes regalos</p>

                    <div className="flex flex-col max-w-md mx-auto">
                      <ul className="-mx-4">

                        {regalos.map((regalo) => (
                          <li key={regalo.item} className="flex items-center mt-4 mb-4">
                            <img
                              src={regalo.img}
                              alt={regalo.item} className="object-cover w-10 h-10 mx-4 rounded-full" />
                            <p><a href={regalo.url} className="mx-1 font-bold text-gray-700 hover:underline">{regalo.item}</a></p>
                          </li>
                        ))}

                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-full py-6 px-8 bg-white bg-opacity-50 rounded-2xl shadow-xl">
                      <h1 className="mb-3 text-md font-bold text-green-600">Agregar un nuevo regalo</h1>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="item" className="block text-gray-500 text-sm font-medium">Regalo</label>
                          <input type="text" name="item" id="item" placeholder="Regalo" className="w-full border border-gray-300 p-2 rounded mt-2 text-sm placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10" />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="url" className="block text-gray-500 text-sm font-medium">Enlace al regalo</label>
                          <input type="text" name="url" id="url" placeholder="http://..." className="w-full border border-gray-300 p-2 rounded mt-2 text-sm placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10" />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="img" className="block text-gray-500 text-sm font-medium">Enlace a la imagen</label>
                          <input type="text" name="img" id="img" placeholder="http://..." className="w-full border border-gray-300 p-2 rounded mt-2 text-sm placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10" />
                        </div>

                        <button className="cursor-pointer py-2 px-4 block bg-green-600 text-white font-bold w-full text-center rounded">Guardar regalo</button>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
