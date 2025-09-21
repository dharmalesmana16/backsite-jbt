import CardHorizontal from '@/Components/CardHorizontal'
import HeaderPage from '@/Components/HeaderPage'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Page() {
    const [dataPrestasi, setDataPrestasi] = useState([])
    useEffect(() => {
        axios.get('/api/prestasi').then(function (response) {
            console.log(response.data.data);
            setDataPrestasi(response.data.data)
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
                axios.delete(`/api/prestasi/${slug}`).then(function () {
                    setTimeout(function () {
                        Swal.fire({
                            title: "Data Terhapus !",
                            text: "Data Berhasil Dihapus!",
                            icon: "success"
                        }).then(function () {
                            window.location.href = "/prestasi";
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
                <HeaderPage pageName="Halaman Prestasi" link="/prestasi/create" />
                <div className="py-8 ">
                    <div className=" max-w-7xl mx-auto ">
                        <div className="grid grid-cols-2 gap-4">
                            {
                                dataPrestasi.map((res: any, idx) => (
                                    <CardHorizontal urlUpdate={`/prestasi/update/${res.slug}`} onDelete={onDeleteSubmit} slug={res.slug} nama={res.nama} size={res.size} ext={res.ext} srcImage={res.file ? `/storage/image/prestasi/${res.file}` : "/images/person.png"} urlDelete={`/api/prestasi/${res.slug}`} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}
