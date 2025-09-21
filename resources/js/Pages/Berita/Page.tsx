import CardDireksi from "@/Components/CardVertical";
import CardHorizontal from "@/Components/CardHorizontal";
import HeaderPage from "@/Components/HeaderPage";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CardBerita from "@/Components/CardBerita";

export default function Page() {
    const [dataBerita, setDataBerita] = useState([]);
    useEffect(() => {
        axios.get("/api/tarif").then(function (response) {
            console.log(response.data.data);
            setDataBerita(response.data.data);
        });
    }, []);
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
                axios.delete(`/api/berita/${slug}`).then(function () {
                    setTimeout(function () {
                        Swal.fire({
                            title: "Data Terhapus !",
                            text: "Data Berhasil Dihapus!",
                            icon: "success",
                        }).then(function () {
                            window.location.href = "/berita";
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
                <HeaderPage pageName="Halaman Berita" link="/berita/create" />
                <div className="py-8 ">
                    <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
                        <CardBerita
                            judul="Berita Dalsfindo dan Nuansa Inti Persada"
                            deskripsi={"Lorem Ipsum "}
                        />
                        <CardBerita
                            judul="Berita Dalsfindo dan Nuansa Inti Persada"
                            deskripsi={"Lorem Ipsum "}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}
