import CardDireksi from '@/Components/CardVertical'
import CardHorizontal from '@/Components/CardHorizontal'
import HeaderPage from '@/Components/HeaderPage'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Link } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { TbRectangleFilled } from 'react-icons/tb'

export default function Page() {
    const [dataCarouosel, setDataCarousel] = useState([])
    const [totalSaham,setTotalSaham] = useState("")
    useEffect(() => {
        axios.get('/api/carousel').then(function (response) {
            console.log(response.data.data);
            setDataCarousel(response.data.data)

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
                axios.delete(`/api/carousel/${slug}`).then(function () {
                    setTimeout(function () {
                        Swal.fire({
                            title: "Data Terhapus !",
                            text: "Data Berhasil Dihapus!",
                            icon: "success"
                        }).then(function () {
                            window.location.href = "/carousel";
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
                <HeaderPage pageName="Halaman Carousel" link="/carousel/create" />
                <div className="py-8 ">

                    <div className=" max-w-7xl mx-auto">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-md text-white uppercase bg-main-500 dark:bg-main-500 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Judul Carousel
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ukuran (Mb)
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Extension
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Cover
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Manage
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataCarouosel.map((res: any, idx: number) => (
                                            <tr key={idx} className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    {res.id}
                                                </th>


                                                <td className="px-6 py-4">
                                                    {res.nama_file}
                                                    {/* {`Rp${res.jumlah.toLocaleString("id-ID")}`} */}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {res.size}
                                                    {/* {`Rp${res.jumlah.toLocaleString("id-ID")}`} */}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {res.ext}
                                                    {/* {`Rp${res.jumlah.toLocaleString("id-ID")}`} */}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <img src='' className='h-12 w-12 ' alt={res.nama_file}/>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex flex-row mt-4">
                                                        <form onSubmit={onDeleteSubmit} method="POST" >
                                                            <input type="hidden" name="slug" value={res.slug} />
                                                            <button type="submit" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Hapus</button>

                                                            <a href={`/pemegangsaham/update/${res.slug}`} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</a>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>))
                                    }

                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}
