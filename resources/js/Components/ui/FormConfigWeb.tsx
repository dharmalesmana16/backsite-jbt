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
export default function FormConfigWeb({dataConfig}:any) {
     const [previewCoverBerita, setPreviewCoverBerita] = useState<any>(null);
    const { data, setData, processing, errors } = useForm({
        bg_color_nav: dataConfig.bg_color_nav,
        bg_color_footer: dataConfig.bg_color_footer,
        text_color_nav: dataConfig.text_color_nav,
        text_color_footer: dataConfig.text_color_footer,
        // bg_warna_berita: "",
        // bg_warna_layanan: "",
    });
    // console.log(dataBerita);
    function onUpdateCoverBerita(e: any) {
        e.preventDefault();
        axios
            .post(
                `/api/config/${dataConfig.slug}`,
                {
                    _method: "PUT",
                    bg_color_nav: dataConfig.cover,
                    bg_color_footer: dataConfig.bg_color_footer,
                    text_color_nav: dataConfig.bg_color_nav,
                    text_color_footer: "informasi-berita",
                    // bg_color: dataConfig.bg_color,
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
                    window.location.href = "/";
                }, 1000);
            });
    }


  return (
    <div>
        <div className="bg-white p-5 shadow-xl rounded-xl col-span-2">
                            <p className="font-bold text-md leading-normal">
                                Informasi Berita (Halaman Home Berita)
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

                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="bg_color_nav"
                                                value="Text Header"
                                                className="font-bold"
                                            />
                                            <NoteLabel value="Background Color" />
                                            <TextInput
                                                id="color"
                                                type="color"
                                                name="color"
                                                value={data.bg_color_nav}
                                                className="mt-1 block w-8 h-8"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "bg_color_nav",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.bg_color_nav}
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
                                                    id="bg_color_footer"
                                                    type="text"
                                                    name="bg_color_footer"
                                                    value={data.bg_color_footer}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    isFocused={true}
                                                    onChange={(e) =>
                                                        setData(
                                                            "bg_color_footer",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={errors.bg_color_footer}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="">
                                                <InputLabel
                                                    htmlFor="text_color_nav"
                                                    value="Text Right (Sub Header)"
                                                    className="font-bold"
                                                />
                                                <NoteLabel value="Masukkan Sub Judul (Sub Header)" />
                                                <TextInput
                                                    id="text_color_nav"
                                                    type="color"
                                                    name="text_color_nav"
                                                    value={
                                                        data.text_color_nav
                                                    }
                                                    className="mt-1  block w-8 h-8"
                                                    autoComplete="username"
                                                    isFocused={true}
                                                    onChange={(e) =>
                                                        setData(
                                                            "text_color_nav",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    message={errors.text_color_nav}
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
  )
}
