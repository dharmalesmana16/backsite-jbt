import CardHorizontal from "@/Components/CardHorizontal";
import HeaderPage from "@/Components/HeaderPage";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
    const [dataLaporanTahunan, setDataLaporanTahunan] = useState<any>([]);
    useEffect(() => {
        axios.get("/api/report/yearly").then(function (response) {
            setDataLaporanTahunan(response.data.data);
        });
    });
     function onDeleteSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const slug = formData.get("slug");
        console.log(slug);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus Data !",
            cancelButtonText: "Tidak, Jangan Dulu !",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/report/yearly/${slug}`).then(function () {
                    setTimeout(function () {
                        Swal.fire({
                            title: "Data Terhapus !",
                            text: "Data Berhasil Dihapus!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(function () {
                            window.location.href = "/report";
                        });
                    }, 1000);
                });

                // Perform "Yes" action here
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    "Cancelled",
                    "Your imaginary file is safe :)",
                    "error"
                );
                // Perform "No" action here
            }
        });
    }
    return (
        <div>
            <DashboardLayout>
                <HeaderPage
                    pageName="Halaman Laporan Tahunan"
                    link="/report/create"
                />
                <div className="py-8 ">
                    <div className=" max-w-7xl mx-auto ">
                        <div className="grid grid-cols-2 gap-4">
                            {dataLaporanTahunan.map((res: any,idx:any) => (
                                <CardHorizontal key={idx} nama={res.nama_file} tahun={res.tahun} ext={"PDF"} srcImage={res.gambar} onDelete={onDeleteSubmit} slug={res.slug} urlUpdate={`/report/update/${res.slug}`} />
                            ))}
                            {/* <CardHorizontal /> */}
                            {/* <CardHorizontal /> */}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}
