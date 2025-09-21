import CardDireksi from '@/Components/CardVertical'
import HeaderPage from '@/Components/HeaderPage'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Page() {
    const [dataDireksi,setDataDireksi] = useState([])
    useEffect(() => {
        axios.get('/api/direksi').then(function(response){
            // console.log(response.data.data);
            setDataDireksi(response.data.data)
        })

    }, [])
    // function onDelete(e){
    //     e.preventDefault();
    //     axios.delete('/api/direksi')
    // }
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
                axios.delete(`/api/direksi/${slug}`).then(function () {
                    setTimeout(function () {
                        Swal.fire({
                            title: "Data Terhapus !",
                            text: "Data Berhasil Dihapus!",
                            icon: "success",
                            showConfirmButton: false,
                            timer:1500
                        }).then(function () {
                            window.location.href = "/direksi";
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
                <HeaderPage pageName="Halaman Direksi" link="/direksi/create" />
                <div className="py-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-5 gap-4">
                        {
                            dataDireksi.map((res:any,idx)=>(
                                <CardDireksi slug={res.slug} onDelete={onDeleteSubmit} cardFor="direksi" jabatan={res.jabatan} nama={res.nama} srcImage={res.file ? `/storage/image/direksi/${res.file}` : "/images/person.png"} urlDelete={`/api/direksi/${res.slug}`} urlUpdate={`/direksi/update/${res.slug}`} />
                            ))
                        }
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}
