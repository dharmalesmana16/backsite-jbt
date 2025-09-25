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

export default function Update({ slug }: any) {
    // const [gambar, setGambar] = useState<any>(null);
    const [previewImg, setPreview] = useState<any>(null);
    // console.log(slug);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: slug.nama as string,
        tanggal: "",
        file: "",
        deskripsi: slug.deskripsi as string,
    });

    const handleDateChange = (date: any) => {
        let newDateFormat = formatDate(date, "yyyy-MM-dd");
        setData("tanggal", newDateFormat); // Update the state with the new date
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        axios
            .put(
                "/api/prestasi",
                {
                    _method: "PUT",
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
                console.log(response);
                Swal.fire({
                    title: "Sukses",
                    text: "Data Berhasil Diubah !",
                    icon: "success",
                    timer: 2000,
                });
                setTimeout(() => {
                    window.location.href = "/prestasi";
                }, 1000);
            });
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
                <HeaderPage link="/prestasi" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2">
                                <div className="mt-4  block p-4">
                                    <label htmlFor="firstImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Gambar Prestasi
                                        </p>

                                        <img
                                            src={
                                                previewImg
                                                    ? previewImg
                                                    : `/storage/image/prestasi/${slug.file}`
                                            }
                                            style={{ objectFit: "fill" }}
                                            className="w-[275px] h-[350px] mx-auto"
                                        />
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
                                            value="Judul Penghargaan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Nama Prestasi" />

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
                                                // console.log(data.tanggal);
                                            }}
                                        />

                                        {/* <InputError message={errors.a} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4 block">
                                        <div className="">
                                            <InputLabel
                                                htmlFor="jabatan"
                                                value="Tanggal Terima Penerimaan "
                                                className="font-bold"
                                            />
                                            <NoteLabel value="Masukkan Tanggal Penerimaan Penghargaan (Opsional)" />

                                            <Datepicker
                                                // value={new Date(data.tanggal)}
                                                onChange={handleDateChange}
                                                className="text-gray-900"
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                }}
                                            />
                                            {/* <InputError message={errors.tanggal} className="mt-2" /> */}
                                        </div>
                                    </div>

                                    <div className="mt-4 block">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="Deskripsi"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Deskripsi (Opsional)" />
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                                            <div className="px-2 py-2 bg-white rounded-b-lg ">
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
                                                    className="block w-full px-0 text-sm text-gray-800 border-0 "
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
