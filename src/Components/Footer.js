import React from 'react'
import { Link } from 'react-router-dom';
import map from "../map.png";

function Footer() {
  return (
    <div className='flex items-center justify-center w-full p-6 px-16 space-x-4 bg-blue-800 '>

      <footer class="p-2 bg-white rounded-lg shadow md:flex md:items-center space-x-4 md:justify-between md:p-6 ">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#" class="hover:underline"></a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap  items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <Link to= "/us">
          <li>
            About Us
          </li>
          </Link>
          <Link to= "/feedback">
          <li className='ml-4'>
            Contact
          </li>
          </Link>
          
        </ul>
      </footer>

    </div>
  )
}

export default Footer