import { Link } from "@inertiajs/react";
import React from "react";

export default function CardHorizontal({
    slug,
    onDelete,
    className = "",
    nama = "",
    tahun,
    ext,
    size,
    urlUpdate,
    urlDelete,
    cardFor,
    srcImage,
}: any) {
    return (
        <>
            <div className="flex flex-col bg-white border p-2 border-gray-200 rounded-lg shadow-sm md:flex-row md:w-full hover:bg-gray-100 ">
                <img
                    className="w-full p-4 rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={srcImage}
                    alt=""
                />
                <div className="flex flex-col leading-normal">
                    <div className="">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                            {nama ? nama : "Laporan / Penghargaan"}
                        </h5>
                        <p className="mb-2 text-md font-normal text-gray-700 ">
                            Tahun : {tahun ? tahun : "2024"}
                        </p>
                        <p className="mb-2 text-md font-normal text-gray-700 ">
                            Ext : {ext ? ext : "JPG"}
                        </p>
                        <p className="mb-2 text-md font-normal text-gray-700 ">
                            Ukuran File : {size ? size : "4"} MB
                        </p>
                    </div>
                    <div className="flex flex-row mt-4">
                        <form onSubmit={onDelete} method="POST">
                            <input type="hidden" name="slug" value={slug} />
                            <button
                                type="submit"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Hapus
                            </button>

                            <a
                                href={urlUpdate ? urlUpdate : "#"}
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Edit
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
