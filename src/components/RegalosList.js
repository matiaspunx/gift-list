import React from 'react'
import { deleteRegalo } from '../firebase/functions';

export const RegalosList = ({regalo, edit, profile}) => {
  return (
    <li className="py-4 mb-2 flex bg-white bg-opacity-50 border border-gray-100 rounded-md">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-100 rounded-md overflow-hidden">
        <img
          src={regalo.img}
          alt={regalo.regalo}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-xl font-medium text-gray-600">
            <h3>
              <a href={regalo.url}>{regalo.regalo}</a>
            </h3>
          </div>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-300 hover:text-indigo-400"
              onClick={() => edit(regalo.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              className="font-medium text-red-300 hover:text-red-400 ml-2"
              onClick={() => deleteRegalo(profile.uid, regalo.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
