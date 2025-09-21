import CardDireksi from '@/Components/CardVertical'
import CardHorizontal from '@/Components/CardHorizontal'
import HeaderPage from '@/Components/HeaderPage'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Link } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Page() {
    const [dataTarif, setDataTarif] = useState([])
    useEffect(() => {
        axios.get('/api/tarif').then(function (response) {
            console.log(response.data.data);
            setDataTarif(response.data.data)
        })

    }, [])
    function onDeleteSubmit(e: any) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const slug = formData.get('slug');
        console.log(slug)
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus Data !',
            cancelButtonText: 'Tidak, Jangan Dulu !'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/tarif/${slug}`).then(function () {
                    setTimeout(function () {
                        Swal.fire({
                            title: "Data Terhapus !",
                            text: "Data Berhasil Dihapus!",
                            icon: "success"
                        }).then(function () {
                            window.location.href = "/tarif";
                        });
                    }, 1000);
                })



                // Perform "Yes" action here
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
                // Perform "No" action here
            }
        });
    }
    return (
        <div>
            <DashboardLayout>
                <HeaderPage pageName="Halaman Tarif Tol" link="/tarif/create" />
                <div className="py-8 ">

                    <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            dataTarif.map((res: any, idx) => (
                                <div className="bg-main rounded-3xl shadow-xl p-5 h-full  ">

                                    <div className="text-center flex flex-col">

                                        <div className="pb-2">
                                            <h1 className='tracking-wide text-3xl font-bold text-white pb-1'>{res.nama}</h1>
                                        </div>
                                        <div className="pb-5">
                                            <h1 className="text-md md:text-2xl text-second font-bold py-3">
                                                {`Rp${res?.harga.toLocaleString('id-ID')}`}
                                                {/* Rp5.000 */}
                                            </h1>
                                        </div>

                                        <div className="pb-5">
                                            <h1 className='tracking-wide text-md text-white font-medium pb-1'>Deskripsi:</h1>
                                            <p className='tracking-wide text-gray-200'>{res.deskripsi}</p>
                                        </div>

                                        <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-4 text-center">
                                            {
                                                res.gambar_first && <div className="bg-second p-5 md:p-3 rounded-full justify-center text-center mx-auto">
                                                    <img src={`/storage/image/tarif/${res.gambar_first}`} className=" object-contain  w-28 h-28 mx-auto" alt="" srcSet="" />
                                                </div>
                                            }
                                            {
                                                res.gambar_second && <div className="bg-second p-5 md:p-3 rounded-full justify-center text-center mx-auto">
                                                    <img src={`/storage/image/tarif/${res.gambar_second}`} className=" object-contain  w-28 h-28" alt="" srcSet="" />
                                                </div>
                                            }
                                            {
                                                res.gambar_third && <div className="bg-second p-5 md:p-3 rounded-full justify-center text-center mx-auto">
                                                    <img src={`/storage/image/tarif/${res.gambar_third}`} className=" object-contain  w-28 h-28" alt="" srcSet="" />
                                                </div>
                                            }
                                            {
                                                res.gambar_fourth && <div className="bg-second p-5 md:p-3 rounded-full justify-center text-center mx-auto">
                                                    <img src={`/storage/image/tarif/${res.gambar_fourth}`} className=" object-contain  w-28 h-28" alt="" srcSet="" />
                                                </div>
                                            }



                                        </div>
                                        <div className="flex flex-row  justify-end mt-4 ">
                                            <div className="">
                                                <form onSubmit={onDeleteSubmit} method="POST">
                                                    <input type="hidden" name="slug" value={res.slug} />
                                                    <button type="submit" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Hapus</button>
                                                </form>
                                            </div>
                                            <div className="">

                                                <a href={`/tarif/update/${res.slug}`} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}
