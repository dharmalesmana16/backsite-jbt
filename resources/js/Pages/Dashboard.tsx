import HeaderCard from "@/Components/HeaderCard";
import HeaderPage from "@/Components/HeaderPage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NoteLabel from "@/Components/NoteLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import DataCarousel from "@/Components/ui/DataCarousel";
import FormInformasiPerusahaan from "@/Components/ui/FormInformasiPerusahaan";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard({ dataPerusahaan }: any) {
    const [previewLogo, setPreviewLogo] = useState<any>(null);
    const [previewStrukturOrganisasi, setPreviewStrukturOrganisasi] =
        useState<any>(null);
    const [previewCarousel, setPreviewCarousel] = useState<any>(null);

    function onPreviewStruktur(e: any) {
        let dataimages = e.target.files[0];
        if (dataimages) {
            setData("file_struktur_organisasi", dataimages);
            setPreviewStrukturOrganisasi(URL.createObjectURL(dataimages));
        }
    }
    function onPreviewCarousel(e: any) {
        let dataimages = e.target.files[0];
        if (dataimages) {
            setData("file_carousel", dataimages);
            setPreviewCarousel(URL.createObjectURL(dataimages));
        }
    }
    // const { dataVideo, setDataVideo } = useForm({
    //     video: '',
    // });
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_perusahaan: dataPerusahaan.nama_perusahaan,
        alamat_perusahaan: dataPerusahaan.alamat_perusahaan,
        email_perusahaan: dataPerusahaan.email_perusahaan,
        logo: "",
        deskripsi: dataPerusahaan.deskripsi,
        url_maps: dataPerusahaan.url_maps,
        telp_kantor: dataPerusahaan.no_telp,
        call_center: dataPerusahaan.call_center,
        video: "",
        file_struktur_organisasi: "",
        nama_file_carousel: "",
        file_carousel: "",
    });
    // console.log(data.nama_perusahaan);

    const onUpdateResourceCompany: FormEventHandler = (e) => {
        e.preventDefault();

        axios
            .post(
                `/api/informasiperusahaan/${dataPerusahaan.id}`,
                {
                    _method: "PUT",
                    nama_perusahaan: data.nama_perusahaan,
                    alamat_perusahaan: data.alamat_perusahaan,
                    deskripsi: data.deskripsi,
                    logo: data.logo !== null && data.logo,
                    email_perusahaan: data.email_perusahaan,
                    no_telp: data.telp_kantor,
                    call_center: data.call_center,
                    url_maps: data.url_maps,
                    file_struktur_organisasi:
                        data.file_struktur_organisasi !== null &&
                        data.file_struktur_organisasi,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file uploads
                    },
                }
            )
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    title: "Sukses",
                    text: "Data Berhasil Diubah !",
                    icon: "success",
                    timer: 2000,
                });
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            });
    };
    const onCreateCarousel: FormEventHandler = (e) => {
        e.preventDefault();

        axios
            .post(
                `/api/carousel`,
                {
                    nama_file: data.nama_file_carousel,
                    file_carousel: data.file_carousel,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file uploads
                    },
                }
            )
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    title: "Sukses",
                    text: "Data Berhasil Diubah !",
                    icon: "success",
                    timer: 2000,
                });
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            });
    };
    function onPreviewLogo(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("logo", dataImage);
            setPreviewLogo(URL.createObjectURL(dataImage));
        }
    }
    return (
        <>
            <Head title="Home" />
            <DashboardLayout>
                <div className="py-8 ">
                    <div className=" w-full mx-auto ">
                        <div className="md:grid md:grid-cols-3 gap-4">
                            {/* Informasi Perusahaan */}
                            <FormInformasiPerusahaan dataPerusahaan={dataPerusahaan}/>

                            {/* End Informasi Perusahaan */}
                            {/* Informasi Carousel */}
                            <div className="col-span-2 gap-4">
                                <div className="bg-white p-5 shadow-xl rounded-xl">
                                    <div className="judul">
                                        <p className="font-bold text-md leading-normal">
                                            Informasi Video
                                        </p>
                                        <div className="">
                                            <div className="">
                                                <video
                                                    src="/video/videojbt.mp4"
                                                    className=" min-h-full w-full  rounded-lg"
                                                    autoPlay={true}
                                                    loop
                                                    muted
                                                ></video>
                                            </div>

                                            <div className="mt-4 block">
                                                <InputLabel
                                                    htmlFor="video"
                                                    value="Video"
                                                    className="font-bold"
                                                />
                                                <NoteLabel value="Ganti File Video" />
                                                <TextInput
                                                    id="video"
                                                    type="file"
                                                    name="video"
                                                    value={data.video}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    isFocused={true}
                                                    // onChange={(e) =>
                                                    //     setData(
                                                    //         "video",
                                                    //         e.target.files[0]
                                                    //     )
                                                    // }
                                                />


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-5 ">
                            {/* Informasi Carousel */}

                            <div className="bg-white p-5 shadow-xl rounded-xl mt-2">
                                <div className="judul">
                                    <p className="font-bold text-md leading-normal">
                                        Struktur Organisasi
                                    </p>
                                    <div className="">
                                        <form
                                            action=""
                                            onSubmit={
                                                onUpdateResourceCompany
                                            }
                                        >
                                            <div className="mt-4  block p-4">
                                                <label htmlFor="imageSo">
                                                    <p className="block text-sm text-gray-700 font-bold">
                                                        Gambar
                                                    </p>
                                                    <img
                                                        src={
                                                            previewStrukturOrganisasi
                                                                ? previewStrukturOrganisasi
                                                                : `/storage/image/resourcecompany/${dataPerusahaan.struktur_organisasi}`
                                                        }
                                                        className="w-full h-[275px] mx-auto cursor-pointer"
                                                    />
                                                </label>
                                                {/* <input type="file" name="" id="" /> */}
                                                <input
                                                    type="file"
                                                    name="previewImgStrukturOrganisasi"
                                                    id="imageSo"
                                                    style={{
                                                        display: "none",
                                                    }}
                                                    onChange={
                                                        onPreviewStruktur
                                                    }
                                                />
                                            </div>
                                            <div className="mt-4 flex items-center justify-end">
                                                <PrimaryButton
                                                    className="ms-4"
                                                    disabled={processing}
                                                >
                                                    Update Data
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                             <div className="bg-white p-5 shadow-xl rounded-xl ">
                                <HeaderCard pageName="Informasi Carousel" link="/carousel" linkName="Edit Carousel" />

                                    <DataCarousel />

                            </div>
                            {/* End Informasi Perusahaan */}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
