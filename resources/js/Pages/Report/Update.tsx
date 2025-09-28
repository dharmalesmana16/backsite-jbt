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

export default function Update({slug}:any) {
    const [gambar, setGambar] = useState(null);
    const [previewImg, setPreview] = useState<any>(null);
    const [isLoading, setLoading] = useState<any>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_file: slug.nama_file,
        deskripsi: slug.deskripsi,
        tahun: slug.tahun,
        gambar: slug.gambar,
        url: slug.url,
        file: slug.file,
    });

    const handleDateChange = (date: any) => {
        let newDateFormat = formatDate(date, "yyyy-MM-dd");
        setData("tgl_lahir", newDateFormat); // Update the state with the new date
    };
    const onCreate: FormEventHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(
                `/api/report/yearly/${slug.slug}`,
                {
                    _method:"PUT",
                    nama_file: data.nama_file,
                    deskripsi: data.deskripsi,
                    file: data.file,
                    tahun: data.tahun,
                    cover: data.gambar,
                    url: data.url,
                },
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                        // Authorization:
                        //     "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    title: "Sukses",
                    text: "Data Berhasi Diubah !",
                    icon: "success",
                    timer: 2000,
                });
                setLoading(false);
                setTimeout(() => {
                    window.location.href = "/report";
                }, 1000);
            });
    };
    function preview(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("gambar", dataImage);
            setPreview(URL.createObjectURL(dataImage));
        }
    }
    function onFileChange(e: any) {
        let dataFile = e.target.files[0];
        if (dataFile) {
            setData("file", dataFile);
            // setPreview(URL.createObjectURL(dataFile));
        }
    }

    return (
        <div>
            <DashboardLayout>
                <HeaderPage link="/report" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={onCreate}>
                            <div className="grid grid-cols-2">
                                <div className="mt-4  block p-4">
                                    <label htmlFor="firstImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Cover Laporan
                                        </p>
                                        {slug.gambar == null ? (
                                            <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer w-full h-[375px]">
                                                <p className="text-gray-500 text-lg text-center mx-auto my-auto">
                                                    + Img
                                                </p>
                                            </div>
                                        ) : (
                                            <img
                                                src={previewImg ? previewImg :`/storage/image/report/${slug.gambar}`}
                                                style={{ objectFit: "fill" }}
                                                className="w-[full] h-[550px] mx-auto"
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
                                <div className="">
                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="Nama Laporan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Judul Laporan" />

                                        <TextInput
                                            id="nama_file"
                                            type="text"
                                            name="nama_file"
                                            value={data.nama_file}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => {
                                                setData(
                                                    "nama_file",
                                                    e.target.value
                                                );
                                                // console.log(data.tgl_lahir);
                                            }}
                                        />

                                        <InputError
                                            message={errors.nama_file}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="tahun"
                                            value="Tahun Laporan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Tahun Laporan" />
                                        <TextInput
                                            id="tahun"
                                            type="text"
                                            name="tahun"
                                            value={data.tahun}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("tahun", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.tahun}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="url"
                                            value="Url Laporan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Url Laporan" />
                                        <TextInput
                                            id="url"
                                            type="text"
                                            name="url"
                                            value={data.url}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("url", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.url}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="file"
                                            value="File Laporan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan File Laporan (Opsional, laporan bisa diberikan link*)" />
                                        <TextInput
                                            id="file"
                                            type="file"
                                            name="file"
                                            value={data.file}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={onFileChange}
                                        />

                                        <InputError
                                            message={errors.file}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="Deskripsi"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Deskripsi (Opsional)" />
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">

                                            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                                <label
                                                    htmlFor="editor"
                                                    className="sr-only"
                                                >
                                                    Publish post
                                                </label>
                                                <textarea
                                                    onChange={(e) =>
                                                        setData(
                                                            "deskripsi",
                                                            e.target.value
                                                        )
                                                    }
                                                    id="editor"
                                                    rows={8}
                                                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
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
                                            className="ms-4"
                                        // disabled={processing}
                                        >
                                            {
                                                isLoading == false ? (
                                                    "Update Data"
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
