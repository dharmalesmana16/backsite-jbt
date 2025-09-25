import HeaderPage from "@/Components/HeaderPage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NoteLabel from "@/Components/NoteLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function FormStaticContentBerita({ dataTender }: any) {
    const [previewCoverTender, setPreviewCoverTender] = useState<any>(null);
    const { data, setData, processing, errors } = useForm({
        cover: "",
        text_header: dataTender.text_header,
        text_sub_header: dataTender.text_sub_header,
        bg_color: dataTender.bg_color,
        // bg_warna_berita: "",
        // bg_warna_layanan: "",
    });
    // console.log(dataTender);
    function onUpdateCoverBerita(e: any) {
        e.preventDefault();
        axios
            .post(
                `/api/staticcontent/${dataTender.judul_static_content}`,
                {
                    _method: "PUT",
                    cover: data.cover,
                    text_header: data.text_header,
                    text_sub_header: data.text_sub_header,
                    bg_color: data.bg_color,
                    judul_static_content: "informasi-tender",
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
                    window.location.href = "/staticcontent";
                }, 1000);
            });
    }

    function onPreviewCoverTender(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            setData("cover", dataImage);
            setPreviewCoverTender(URL.createObjectURL(dataImage));
        }
    }
    return (
        <div>
                <div className="bg-white p-5 shadow-xl rounded-xl col-span-2 mt-4">
                    <p className="font-bold text-md leading-normal">
                        Informasi Tender (Halaman Home Tender)
                    </p>
                    <div className="judul">
                        <div className="">
                            <form action="" onSubmit={onUpdateCoverBerita}>
                                <input
                                    type="hidden"
                                    name="judul_static_content"
                                // value={}
                                />
                                <div className="mt-4  block p-4">
                                    <label htmlFor="imageTender">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Gambar
                                        </p>

                                        <img
                                            src={
                                                previewCoverTender
                                                    ? previewCoverTender
                                                    : `/storage/image/static/${dataTender.cover}`
                                            }
                                            style={{
                                                objectFit: "fill",
                                            }}
                                            className="w-full h-96 mx-auto cursor-pointer"
                                        />
                                    </label>
                                    {/* <input type="file" name="" id="" /> */}
                                    <input
                                        type="file"
                                        name="previewImgCoverTender"
                                        id="imageTender"
                                        onChange={onPreviewCoverTender}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="nama_file_carousel"
                                        value="Text Header"
                                        className="font-bold"
                                    />
                                    <NoteLabel value="Background Color" />
                                    <TextInput
                                        id="color"
                                        type="color"
                                        name="color"
                                        value={data.bg_color}
                                        className="mt-1 block w-8 h-8"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "bg_color",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.bg_color}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="">
                                        <InputLabel
                                            htmlFor="nama_file_carousel"
                                            value="Text Header"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Judul Cover" />
                                        <TextInput
                                            id="text_header"
                                            type="text"
                                            name="text_header"
                                            value={data.text_header}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "text_header",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.text_header}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="">
                                        <InputLabel
                                            htmlFor="text_sub_header"
                                            value="Text Right (Sub Header)"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Sub Judul (Sub Header)" />
                                        <TextInput
                                            id="text_sub_header"
                                            type="text"
                                            name="text_sub_header"
                                            value={
                                                data.text_sub_header
                                            }
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "text_sub_header",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.text_sub_header}
                                            className="mt-2"
                                        />
                                    </div>
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
                </div>
        </div>
    );
}
