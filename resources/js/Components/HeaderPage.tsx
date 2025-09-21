import React from 'react'

export default function HeaderPage({pageName,link,linkName}:any) {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="flex justify-between ">
                <div className="">
                    {pageName ? pageName : ""}
                </div>
                <div className="">
                    <a href={link} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">

                        {linkName ? linkName : "Tambah Data"}
                    </a>
                </div>
            </div>
        </div>
    )
}
