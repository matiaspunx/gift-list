import { useEffect, useState } from "react"
import regalosList from "./data/regalos.json"

export const App = () => {
  const [regalos, setRegalos] = useState([])

  useEffect(() => {
    setRegalos(regalosList)
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 big-bg">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-50 border border-gray-200 blur-bg">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                  <div>
                    <h1 className="mb-4 text-xl font-bold text-gray-700">Lista de regalos</h1>
                    <div className="flex flex-col max-w-sm py-4 mx-auto">
                      <ul className="-mx-4">

                        {regalos.map((regalo) => (
                          <li key={regalo.item} className="flex items-center mt-3 mb-3">
                            <img
                            src={regalo.img}
                            alt={regalo.item} className="object-cover w-10 h-10 mx-4 rounded-full" />
                            <p><a href={regalo.url} className="mx-1 font-bold text-gray-700 hover:underline">{regalo.item}</a></p>
                          </li>
                        ))}

                      </ul>
                    </div>
                  </div>


                  <p className="text-sm leading-6 text-gray-900">Si queres me podes regalar cualquier de estos regalos</p>
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
