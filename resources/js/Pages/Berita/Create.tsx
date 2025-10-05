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
import { Datepicker } from "flowbite-react";
import { parse } from "path";
import React, { useEffect, useRef, useState } from "react";
import { FormEventHandler } from "react";
import Swal from "sweetalert2";
import { FaImage, FaSpinner } from "react-icons/fa6";
import JoditEditor from "jodit-react";
export default function Create({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [published, setPublished] = useState<any>("-");
    const [dangerPublished, setDangerPublished] = useState<boolean>(false);
    const [gambar, setGambar] = useState<any>(null);
    const [previewImg, setPreview] = useState<any>(null);
    const [secondPreviewImg, setSecondPreview] = useState<any>(null);
    const [content, setContent] = useState<string>('');
    const [isLoading, setLoading] = useState(false);

    const [errorInput, setError] = useState({})

    const editor = useRef(null);
    const configs = {
        readonly: false,
        height: 400,

        toolbarButtonSize: 'middle',
        buttons: ['bold', 'italic', 'underline', 'link', 'unlink', 'source', 'font'],
        uploader: {
            insertImageAsBase64URI: true,
        },
    };
    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        tanggal: "",
        deskripsi: "" as any,
        published_on: "",
        gambar: "",
        gambar_kedua: "",

        // remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(data.nama)
        // post(route('login'), {
        //     onFinish: () => reset('stok'),
        // });
        axios
            .post(
                "/api/berita",
                {
                    judul: data.judul,
                    tanggal: data.tanggal,
                    cover: data.gambar,
                    gambar_kedua: data.gambar_kedua,
                    published_on: data.published_on,
                    deskripsi: content,
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
                    text: "Data Berhasi Dibuat !",
                    icon: "success",
                    timer: 2000,
                });
                setLoading(false);
                setTimeout(() => {
                    window.location.href = "/berita";
                }, 1000);
            }).catch(function (error) {
                Swal.fire({
                    title: "Ada Yang Salah ",
                    text: "Periksa Input Datanya !",
                    icon: "error",
                    showConfirmButton: true,
                    // timer: 1500,
                })
                setError(error.response.data)
                setLoading(false)
                // console.log(error.response.data.id_principle[0])
                // console.log()
            }

            );
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
    const handleDateChange = (date: any) => {
        setData("tanggal", new Date(date)); // Update the state with the new date

    };
    return (
        <div>
            <DashboardLayout>
                <HeaderPage link="/berita" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={submit}>
                            <div className="mt-4 grid grid-cols-1 gap-4">
                                <div className="">
                                    <label htmlFor="firstImage">
                                        <p className="block text-sm text-gray-700 font-bold">
                                            Cover Berita
                                        </p>
                                        <NoteLabel value="Untuk resolusi yang baik dapat menggunakan resolusi 1920 x 1080 px, Format Gambar : JPG,JPEG" />
                                        {errorInput.cover && (<p className='mt-1 text-sm text-red-500 tracking-normal'>{errorInput.cover[0]}</p>)}

                                        {previewImg == null ? (
                                            <div className="p-20 border-2 h-96 border-gray-200 border-dashed cursor-pointer">
                                                <div className="flex justify-center items-center content-center">
                                                    <FaImage className="text-gray-500 text-xl text-center" />
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={previewImg}
                                                style={{ objectFit: "fill" }}
                                                className="w-full h-96 cursor-pointer"
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
                            </div>
                            <div className="mt-4 block">
                                <div className="">
                                    <div className="">
                                        <InputLabel
                                            htmlFor="judul"
                                            value="Judul Berita"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan Judul Berita" />

                                        <TextInput
                                            id="judul"
                                            type="text"
                                            name="judul"
                                            value={data.judul}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("judul", e.target.value)
                                            }
                                        />

                                        {errorInput.judul && (<p className='mt-1 text-sm text-red-500 tracking-normal'>{errorInput.judul[0]}</p>)}

                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="nama"
                                    value="Tanggal"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Tanggal Berita" />
                                <Datepicker onChange={handleDateChange}
                                    className="text-gray-900 "
                                    style={{
                                        backgroundColor: "white",
                                        color: "black",
                                        cursor: "pointer",
                                    }} />
                                {errorInput.tanggal && (<p className='mt-1 text-sm text-red-500 tracking-normal'>{errorInput.tanggal[0]}</p>)}

                            </div>
                            <div className="mt-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <InputLabel
                                            htmlFor="jabatan"
                                            value="Publikasi Berita"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Sudah Pernah Terpublish di Sumber Berita Lain ? " />
                                        <select
                                            onChange={(e) =>
                                                setPublished(e.target.value)
                                            }
                                            id="published"
                                            className={
                                                "block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " +
                                                (dangerPublished == true
                                                    ? "bg-red-400"
                                                    : "")
                                            }
                                        >
                                            <option value={"Belum"} selected>
                                                Pilih Salah Satu
                                            </option>
                                            <option value={"Sudah"}>
                                                Sudah
                                            </option>
                                            <option value={"Belum"}>
                                                Belum
                                            </option>
                                            {/* {
                                                supplier.map((item: any) => (
                                                    <option value={item.id}>{item.nama_supplier}</option>
                                                ))
                                            } */}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel
                                            htmlFor="nama"
                                            value="URL Dipublish"
                                            className="font-bold"
                                        />
                                        <NoteLabel value="Masukkan URL / Link Berita Terpublish" />
                                        <TextInput
                                            id="published_on"
                                            type="text"
                                            name="published_on"
                                            value={data.published_on}
                                            disabled={
                                                published == "-" ||
                                                    published == "Belum"
                                                    ? true
                                                    : false
                                            }
                                            onClick={() => {
                                                published == "Belum"
                                                    ? setDangerPublished(true)
                                                    : setDangerPublished(false);
                                            }}
                                            className={
                                                "mt-1 block w-full " +
                                                (published == "-" ||
                                                    published == "Belum"
                                                    ? "bg-gray-300"
                                                    : "")
                                            }
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "published_on",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.deskripsi}
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
                                <NoteLabel value="Baiknya deskripsi bisa dibuat di word terlebih dahulu kemudian di copy isinya ke input disini sehingga format akan mengikuti yang ada di word, kemudian pilih Font : Arial pada opsi" />
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={configs}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={(newContent: string) => setContent(newContent)}
                                    onChange={(newContent: string) => { console.log(content) }}
                                />


                            </div>


                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton
                                    className="ms-4"
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
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}
