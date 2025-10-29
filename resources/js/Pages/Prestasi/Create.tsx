// @ts-ignore
// @ts-nocheck
import Checkbox from "@/Components/Checkbox";
import HeaderPage from "@/Components/HeaderPage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NoteLabel from "@/Components/NoteLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { parse } from "path";
import React, { useEffect, useState } from "react";
import { FormEventHandler } from "react";
import { Datepicker } from "flowbite-react";
import { formatDate } from "date-fns";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

export default function Create({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [gambar, setGambar] = useState(null);
    const [previewImg, setPreview] = useState<any>(null);
    const [isLoading, setLoading] = useState(false);
    const [errorInput, setError] = useState<any>({})

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        tanggal: new Date,
        file: "",
        deskripsi: "",
    });

    const handleDateChange = (date: any) => {
        setData("tanggal", new Date(date)); // Update the state with the new date

    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
  setLoading(true);
        axios
            .post(
                "/api/prestasi",
                {
                    nama: data.nama,
                    tanggal: data.tanggal,
                    deskripsi: data.deskripsi,
                    file: data.file,
                    // spesifikasi: data.file_spesifikasi
                },
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                }
            )
            .then(function (response) {
                // console.log(response);
                Swal.fire({
                    title: "Sukses",
                    text: "Data Berhasil Dibuat !",
                    icon: "success",
                    timer: 2000,
                });
                  setLoading(false);
                setTimeout(() => {
                    window.location.href = "/prestasi";
                }, 1000);
            }).catch(function (error) {
                            Swal.fire({
                                title: "Ada Yang Salah ",
                                text: "Periksa Input Datanya !",
                                icon: "error",
                                showConfirmButton: true,
                                // timer: 1500,
                            })
                            console.log(error.response.data)
                            setError(error.response.data)
                            setLoading(false)
                            // console.log(error.response.data.id_principle[0])
                            // console.log()
                        }

                        );;
    };
    function preview(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("file", dataImage);
            setPreview(URL.createObjectURL(dataImage));
        }
    }

    return (
        <div>
            <DashboardLayout>
                <HeaderPage link="/tarif" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2">
                                {/* Input Gambar */}
                                <div className="mt-4  block p-4">
                                    <label htmlFor="firstImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Gambar Prestasi
                                        </p>
                                        {errorInput.file && (<p className='mt-1 text-sm text-red-500 tracking-normal'>{errorInput.file[0]}</p>)}

                                        {previewImg == null ? (
                                            <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer w-full h-[375px]">
                                                <p className="text-gray-500 text-lg text-center mx-auto my-auto">
                                                    + Img
                                                </p>
                                            </div>
                                        ) : (
                                            <img
                                                src={previewImg}
                                                style={{ objectFit: "fill" }}
                                                className="w-full h-[375px] mx-auto"
                                            />
                                        )}
                                    </label>
                                    {/* <input type="file" name="" id="" /> */}
                                    <input
                                        type="file"
                                        name="previewImg1"
                                        id="firstImage"
                                        style={{ display: "none" }}
                                        onChange={preview}
                                    />
                                </div>
                                {/* Input Nama */}
                                <div className="">
                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="Nama Penghargaan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Nama Penghargaan / Prestasi" />
                                        {errorInput.nama && (<p className='mt-1 text-sm text-red-500 tracking-normal'>{errorInput.nama[0]}</p>)}

                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="nama"
                                            value={data.nama}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => {
                                                setData("nama", e.target.value);
                                                console.log(data.tanggal);
                                            }}
                                        />

                                        <InputError
                                            message={errors.nama}
                                            className="mt-2"
                                        />
                                    </div>
                                        {/* Input Tanggal */}
                                    <div className="mt-4 block">
                                        <div className="">
                                            <InputLabel
                                                htmlFor="tanggal"
                                                value="Tanggal Penerimaan "
                                                className="font-bold"
                                            />
                                            <NoteLabel value="Masukkan Tanggal Penerimaan Penghargaan (Opsional)" />

                                            <Datepicker
                                                onChange={handleDateChange}
                                                className="text-gray-900"
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                }}
                                            />
                                            <InputError
                                                message={errors.tanggal}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                                {/* Input Deskripsi */}
                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="Deskripsi"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Deskripsi (Opsional)" />
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                                            <div className="px-2 py-2 bg-white rounded-b-lg ">

                                                <textarea
                                                    onChange={(e) =>
                                                        setData(
                                                            "deskripsi",
                                                            e.target.value
                                                        )
                                                    }
                                                    id="editor"
                                                    rows={8}
                                                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 "
                                                    placeholder="..."
                                                ></textarea>
                                            </div>
                                        </div>

                                        <InputError
                                            message={errors.deskripsi}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-end">
                                        <PrimaryButton
                                            className="ms-4 bg-main"
                                            disabled={processing}
                                        >
                                            {
                                                isLoading == false ? (
                                                    "Tambah Data"
                                                ) : (

                                                    <FaSpinner className="fa-spin animate-spin" size={15} color="white" />
                                                )
                                            }
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}
