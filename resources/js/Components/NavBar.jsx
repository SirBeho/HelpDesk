import React from 'react'
// import Image from 'next/image'
import logo from "/public/assets/whiteLogo.png"
import Dropdown from './Dropdown'

export default function NavBar({user}) {
  return (
    <header className='flex items-center w-full bg-nav fixed z-10'>

      <div className='flex items-center w-3/4'>
        <img className='p-4' src={logo} width={120} height={120} alt='logo' />


        <div className='flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-white'>

          <label htmlFor="upload" className='cursor-pointer'>Cargar documento</label>
          <input type="file" name='upload' id='upload' className='hidden' />
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>

          </span>
        </div>

        <div className='flex bg-darkgray mx-5 px-2 gap-2 rounded-3xl text-white items-center'>
          <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </span>

          <input type="text" name="search" id="search" placeholder='Buscar documento' className='outline-transparent border-none bg bg-transparent placeholder:text-gray-400' />

        </div>
      </div>

      <div className='flex justify-end px-10 text-gray-300 '>
        <span className='relative cursor-pointer'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className='absolute bg-red-600 rounded-full w-5 h-5 text-center text-xs font-semibold text-gray-50 flex items-center justify-center top-[15px] right-[-10px]'>
            1
          </span>
        </span>
      </div>

      <div className="hidden sm:flex sm:items-center sm:ml-6">
        <div className="ml-3 relative">
          <Dropdown>
            <Dropdown.Trigger>
              <span className="inline-flex rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-200   hover:text-gray-400 focus:outline-none transition ease-in-out duration-150"
                >
                  {user.name}

                  <svg
                    className="ml-2 -mr-0.5 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
              <Dropdown.Link href={route('logout')} method="post" as="button">
                Log Out
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>


    </header>
  )
}
