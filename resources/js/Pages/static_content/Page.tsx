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

export default function page() {
    const [previewCoverBerita, setPreviewCoverBerita] = useState<any>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        cover_tender: "",
        cover_berita: "",
        cover_layanan: "",
        bg_warna_tender: "",
        bg_warna_berita: "",
        bg_warna_layanan: "",
    });
    function onUpdateCoverBerita(e: any) {
        e.preventDefault();
        axios.put(`/api/staticcontent/${data.bg_warna_berita}`, {
            _method: "PUT",
            cover_berita: "",
            cover_layanan: "",
        });
    }
    return (
        <div>
            <DashboardLayout>
                <HeaderPage pageName="Halaman Static Content" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white p-5 shadow-xl rounded-xl col-span-2">
                        <p className="font-bold text-md leading-normal">
                            Informasi Carousel (Tampilan Dibawah Tarif pada Web)
                        </p>

                        <div className="judul">
                            <div className="">
                                <form action="" onSubmit={onUpdateCoverBerita}>
                                    <div className="mt-4  block p-4">
                                        <label htmlFor="imageCarousel">
                                            <p className="block text-sm text-gray-700 font-bold">
                                                Gambar
                                            </p>
                                            {previewCoverBerita == null ? (
                                                <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer w-full h-72">
                                                    <p className="text-gray-500 text-lg text-center mx-auto my-auto">
                                                        + Img
                                                    </p>
                                                </div>
                                            ) : (
                                                <img
                                                    src={previewCoverBerita}
                                                    style={{
                                                        objectFit: "fill",
                                                    }}
                                                    className="w-full h-72 mx-auto cursor-pointer"
                                                />
                                            )}
                                        </label>
                                        {/* <input type="file" name="" id="" /> */}
                                        <input
                                            type="file"
                                            name="previewImgStrukturOrganisasi"
                                            id="imageCarousel"
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    <div className="">
                                        <InputLabel
                                            htmlFor="nama_file_carousel"
                                            value="Nama / Identitas Carousel"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Alamat Perusahaan" />
                                        <TextInput
                                            id="bg_warna-berita"
                                            type="color"
                                            name="bg_warna-berita"
                                            value={data.bg_warna_berita}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "bg_warna_berita",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.bg_warna_berita}
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
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}
