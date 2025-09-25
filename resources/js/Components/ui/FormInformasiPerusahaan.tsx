import React, { FormEventHandler, useState } from 'react'
import PrimaryButton from '../PrimaryButton'
import HeaderPage from "@/Components/HeaderPage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NoteLabel from "@/Components/NoteLabel";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";
export default function FormInformasiPerusahaan({ dataPerusahaan }: any) {
    const [previewLogo, setPreviewLogo] = useState<any>(null);


    // const { dataVideo, setDataVideo } = useForm({
    //     video: '',
    // });

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_perusahaan: dataPerusahaan.nama_perusahaan,
        alamat_perusahaan: dataPerusahaan.alamat_perusahaan,
        email_perusahaan: dataPerusahaan.email_perusahaan,
        logo: dataPerusahaan.logo,
        deskripsi: dataPerusahaan.deskripsi,
        url_maps: dataPerusahaan.url_maps,
        telp_kantor: dataPerusahaan.no_telp,
        call_center: dataPerusahaan.call_center,
    });
     function onPreviewLogo(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("logo", dataImage);
            setPreviewLogo(URL.createObjectURL(dataImage));
        }
    }
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
    return (
        <div>
            <div className="bg-white p-5 shadow-xl rounded-xl h-full">
                <div className="judul">
                    <p className="font-bold text-md leading-normal">
                        Informasi Perusahaan
                    </p>
                    <div className="">
                        <form
                            action={`/api/informasiperusahaan/${dataPerusahaan.id}`}
                            method="post"
                            onSubmit={onUpdateResourceCompany}
                        >
                            <div className="mt-4  block p-4">
                                <label htmlFor="firstImage">
                                    <p className="block text-sm text-gray-700 font-bold">
                                        Logo Perusahaan
                                    </p>

                                    <img
                                        src={
                                            previewLogo
                                                ? previewLogo
                                                : `/storage/image/resourcecompany/${dataPerusahaan.logo}`
                                        }
                                        style={{
                                            objectFit: "fill",
                                        }}
                                        className="w-25 h-25 mx-auto cursor-pointer"
                                    />
                                </label>
                                {/* <input type="file" name="" id="" /> */}
                                <input
                                    type="file"
                                    name="previewImg1"
                                    id="firstImage"
                                    style={{ display: "none" }}
                                    onChange={onPreviewLogo}
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="nama_perusahaan"
                                    value="Nama Perusahaan"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Alamat Perusahaan" />
                                <TextInput
                                    id="nama_perusahaan"
                                    type="text"
                                    name="nama_perusahaan"
                                    value={data.nama_perusahaan}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "nama_perusahaan",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        errors.nama_perusahaan
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="deskripsi"
                                    value="Deskripsi"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Deskripsi Perusahaan" />
                                <TextInput
                                    id="deskripsi"
                                    type="text"
                                    name="deskripsi"
                                    value={data.deskripsi}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "deskripsi",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.deskripsi}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="alamat_perusahaan"
                                    value="Alamat Perusahaan"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Alamat Perusahaan" />
                                <TextInput
                                    id="alamat_perusahaan"
                                    type="text"
                                    name="alamat_perusahaan"
                                    value={
                                        data.alamat_perusahaan
                                    }
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "alamat_perusahaan",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        errors.alamat_perusahaan
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="telp_kantor"
                                    value="Telp Kantor"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Telp Kantor" />
                                <TextInput
                                    id="telp_kantor"
                                    type="text"
                                    name="telp_kantor"
                                    value={data.telp_kantor}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "telp_kantor",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.telp_kantor}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="call_center"
                                    value="Call Center"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Telp Kantor" />
                                <TextInput
                                    id="call_center"
                                    type="text"
                                    name="call_center"
                                    value={data.call_center}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "call_center",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.call_center}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="email_perusahaan"
                                    value="Email Perusahaan"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Alamat Perusahaan" />
                                <TextInput
                                    id="email_perusahaan"
                                    type="text"
                                    name="email_perusahaan"
                                    value={
                                        data.email_perusahaan
                                    }
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "email_perusahaan",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        errors.email_perusahaan
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="url_maps"
                                    value="Link Maps"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Link Maps" />
                                <TextInput
                                    id="url_maps"
                                    type="text"
                                    name="url_maps"
                                    value={data.url_maps}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "url_maps",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.url_maps}
                                    className="mt-2"
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
        </div>
    )
}
