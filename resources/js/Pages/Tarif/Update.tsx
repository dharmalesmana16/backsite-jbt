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
import Swal from "sweetalert2";

export default function Update({slug}:any) {
    const [gambar, setGambar] = useState(null);
    const [previewImg, setPreview] = useState<any>(null);
    const [secondPreviewImg, setSecondPreview] = useState<any>(null);
    const [thirdPreviewImg, setThirdPreview] = useState<any>(null);
    const [fourthPreviewImg, setFourthPreview] = useState<any>(null);
    const [isLoading,setLoading] = useState(false);

    const { data, setData, post, processing, reset,errors } = useForm({
        nama_golongan: slug.nama,
        harga: slug.harga,
        deskripsi: slug.deskripsi,
        gambar: "",
        gambar_kedua: "",
        gambar_ketiga: "",
        gambar_keempat: "",
        // remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // console.log(data.nama)
        // post(route('login'), {
        //     onFinish: () => reset('stok'),
        // });
        axios
            .post(
                "/api/tarif",
                {
                    nama_golongan: data.nama_golongan,
                    harga: data.harga,
                    gambar_first: data.gambar,
                    gambar_second: data.gambar_kedua,
                    gambar_third: data.gambar_ketiga,
                    gambar_fourth: data.gambar_keempat,
                    deskripsi: data.deskripsi,
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
                    text: "Data Berhasi Dibuat !",
                    icon: "success",
                    timer: 2000,
                });
                setTimeout(() => {
                    window.location.href = "/tarif";
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
    function secondPreview(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("gambar_kedua", dataImage);
            setSecondPreview(URL.createObjectURL(dataImage));
        }
    }
    function thirdPreview(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("gambar_ketiga", dataImage);
            setThirdPreview(URL.createObjectURL(dataImage));
        }
    }
    function fourthPreview(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("gambar_keempat", dataImage);
            setFourthPreview(URL.createObjectURL(dataImage));
        }
    }
    return (
        <div>
            <DashboardLayout>
                <HeaderPage link="/tarif" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={submit}>
                            <div className="mt-4 grid grid-cols-4 gap-4">
                                <div className="">
                                    <label htmlFor="firstImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Gambar
                                        </p>
                                        {slug.gambar_first == null ? (
                                            <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer">
                                                <p className="text-gray-500 text-lg text-center">
                                                    + Img
                                                </p>
                                            </div>
                                        ) : (
                                            <img
                                                src={previewImg ? previewImg : `http://202.46.152.202:8001/storage/image/tarif/${slug.gambar_first}`}
                                                style={{ objectFit: "fill" }}
                                                className="w-36 h-36 mx-auto  cursor-pointer"
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
                                    <label htmlFor="secondImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Gambar
                                        </p>
                                        {secondPreviewImg == null ? (
                                            <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer">
                                                <p className="text-gray-500 text-lg text-center">
                                                    + Img
                                                </p>
                                            </div>
                                        ) : (
                                            <img
                                                src={secondPreviewImg}
                                                style={{ objectFit: "fill" }}
                                                className="w-36 h-36 cursor-pointer"
                                            />
                                        )}
                                    </label>
                                    {/* <input type="file" name="" id="" /> */}
                                    <input
                                        disabled={
                                            previewImg == null ? true : false
                                        }
                                        type="file"
                                        name="previewImg1"
                                        id="secondImage"
                                        style={{ display: "none" }}
                                        onChange={secondPreview}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="thirdImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Gambar
                                        </p>
                                        {thirdPreviewImg == null ? (
                                            <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer">
                                                <p className="text-gray-500 text-lg text-center">
                                                    + Img
                                                </p>
                                            </div>
                                        ) : (
                                            <img
                                                src={thirdPreviewImg}
                                                style={{ objectFit: "fill" }}
                                                className="w-36 h-36 cursor-pointer"
                                            />
                                        )}
                                    </label>
                                    {/* <input type="file" name="" id="" /> */}
                                    <input
                                        disabled={
                                            secondPreviewImg == null
                                                ? true
                                                : false
                                        }
                                        type="file"
                                        name="previewImg1"
                                        id="thirdImage"
                                        style={{ display: "none" }}
                                        onChange={thirdPreview}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="fourthImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Gambar
                                        </p>
                                        {fourthPreviewImg == null ? (
                                            <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer">
                                                <p className="text-gray-500 text-lg text-center">
                                                    + Img
                                                </p>
                                            </div>
                                        ) : (
                                            <img
                                                src={fourthPreviewImg}
                                                style={{ objectFit: "fill" }}
                                                className="w-36 h-36 cursor-pointer"
                                            />
                                        )}
                                    </label>
                                    {/* <input type="file" name="" id="" /> */}
                                    <input
                                        disabled={
                                            thirdPreviewImg == null
                                                ? true
                                                : false
                                        }
                                        name="previewImg1"
                                        id="fourthImage"
                                        style={{ display: "none" }}
                                        onChange={fourthPreview}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 block">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="">
                                        <InputLabel
                                            htmlFor="nama_golongan"
                                            value="Nama Golongan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Nama Golongan" />

                                        <TextInput
                                            id="nama_golongan"
                                            type="text"
                                            name="nama_golongan"
                                            value={data.nama_golongan}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_golongan",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.nama_golongan}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="Tarif Golongan"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Harga / Tarif sesuai Golongan" />
                                        <TextInput
                                            id="harga"
                                            type="text"
                                            name="harga"
                                            value={data.harga}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("harga", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.harga}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="nama"
                                    value="Deskripsi"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Deskripsi (Opsional)" />
                                <TextInput
                                    id="deskripsi"
                                    type="text"
                                    name="deskripsi"
                                    value={data.deskripsi}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("deskripsi", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.harga}
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
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}
