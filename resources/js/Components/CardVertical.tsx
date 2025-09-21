import { Link } from '@inertiajs/react'
import React from 'react'

export default function CardDireksi({ onDelete, slug, className = '', nama = '', srcImage, tipe_direksi, jabatan, harga, urlUpdate, urlDelete, cardFor }: any) {
    return (


        <div className="flex flex-col  pt-4 pl-4 pr-4 pb-2 border-1 h-[350px] md:h-[400px] lg:h-[475px] border-gray-200 shadow-lg hover:border-main  bg-white  rounded-3xl overflow-hidden l">
            <div className="flex justify-end items-end">
                <div className="">
                    <form onSubmit={onDelete} method="POST">
                        <input type="hidden" name="slug" value={slug} />

                        <button type="submit" className=" top-2.5 right-2.5 h-6 w-6 bg-red-600 text-white rounded justify-center items-center flex pb-0.5">&times;</button>
                    </form>
                </div>
                {/* <Link
                    className=" top-2.5 right-2.5 h-6 w-6 bg-red-600 text-white rounded justify-center items-center flex pb-0.5"
                    href={urlDelete}
                >
                    &times;
                    <span className="sr-only">Close Modal</span>
                </Link> */}
            </div>
            <div className="">
                <img src={`${srcImage}`} className=' mx-auto w-full' alt="" srcSet="" />
            </div>
            <div className="hover:text-main text-left">
                <h1 className='text-gray-900  text-md md:text-md lg:text-lg font-semibold tracking-normal '> {nama}</h1>
                {cardFor == "tarif" && <p className='text-sm text-gray-500'>Harga: {harga ? `Rp ${harga.toLocaleString("id-ID")}` : ""}</p>}
                {cardFor == "direksi" && <p className='text-xs text-gray-500'>{tipe_direksi ? tipe_direksi : "Dewan Direksi"}</p>}
                {cardFor == "direksi" && <p className='text-xs text-gray-500'>{jabatan ? jabatan : ""}</p>}
            </div>
            <div className=" text-end">
                <a href={urlUpdate ? urlUpdate : "#"} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</a>

            </div>
        </div>
    )
}
