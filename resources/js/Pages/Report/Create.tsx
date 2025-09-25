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

export default function Create({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [gambar, setGambar] = useState(null);
    const [previewImg, setPreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_file: "",
        deskripsi: "",
        tahun: "",
        gambar: "",
        file: "",
    });

    const handleDateChange = (date: any) => {
        let newDateFormat = formatDate(date, "yyyy-MM-dd");
        setData("tgl_lahir", newDateFormat); // Update the state with the new date
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // console.log(data.nama)
        // post(route('login'), {
        //     onFinish: () => reset('stok'),
        // });
        axios
            .post(
                "/api/report",
                {
                    nama: data.nama_file,
                    deskripsi: data.deskripsi,
                    file: data.file,
                    tahun: data.tahun,
                    gambar: data.gambar,
                },
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then(function (response) {
                console.log(response);
            });
    };
    function preview(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("gambar", dataImage);
            setPreview(URL.createObjectURL(dataImage));
        }
    }

    return (
        <div>
            <DashboardLayout>
                <HeaderPage link="/report" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2">
                                <div className="mt-4  block p-4">
                                    <label htmlFor="firstImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Cover Laporan
                                        </p>
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
                                        <NoteLabel value="Masukkan Nama Laporan" />

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
                                                console.log(data.tgl_lahir);
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
                                            htmlFor="file"
                                            value="File Laporan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Nama Jabatan" />
                                        <TextInput
                                            id="file"
                                            type="file"
                                            name="file"
                                            value={data.file}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "file",
                                                    e.target.files[0]
                                                )
                                            }
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
                                            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-600 border-gray-200">
                                                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                                                    <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 12 20"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Attach file
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 16 20"
                                                            >
                                                                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Embed map
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 16 20"
                                                            >
                                                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Upload image
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 16 20"
                                                            >
                                                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                                                <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Format code
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Add emoji
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 21 18"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    stroke-width="2"
                                                                    d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Add list
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Settings
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                                                                <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Timeline
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                                                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                                            </svg>
                                                            <span className="sr-only">
                                                                Download
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div
                                                    id="tooltip-fullscreen"
                                                    role="tooltip"
                                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                                                >
                                                    Show full screen
                                                    <div
                                                        className="tooltip-arrow"
                                                        data-popper-arrow
                                                    ></div>
                                                </div>
                                            </div>
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
                                                    placeholder="Write an article..."
                                                    required
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
                                            disabled={processing}
                                        >
                                            Tambah Data
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
