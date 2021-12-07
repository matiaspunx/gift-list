export const Home = () => {


  return (
    <div className="flex flex-col justify-center sm:py-4">
        <div className="relative sm:max-w-4xl sm:mx-auto">
          <div className="relative px-4 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-6 bg-clip-padding bg-opacity-50 border border-gray-200 blur-bg">
            <div className="max-w-4xl mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-base leading-6 space-y-4 text-gray-700 pr-8 sm:text-lg sm:leading-7">
                    <h1 className="mb-3 text-3xl font-bold text-gray-700">Mi lista de regalos</h1>
                    <p className="text-md leading-6 text-gray-900">Hey, bienvenidos a <strong>Mi lista de regalos</strong>, acá vas a poder crear y compartir tu lista de regalos con tus amigos para que puedan ver que querés para navidad.</p>
                    <p className="text-md leading-6 text-gray-900">Registrate con tu email o iniciá sesión para empezar a crear tu lista de regalos!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
