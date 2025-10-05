// @ts-ignore
// @ts-nocheck
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { FormEventHandler, useState } from 'react'
import Swal from 'sweetalert2';
import PrimaryButton from '../PrimaryButton';
import InputError from '../InputError';
import TextInput from '../TextInput';
import NoteLabel from '../NoteLabel';
import InputLabel from '../InputLabel';
import { FaSpinner } from 'react-icons/fa';

export default function FormCreateCarousel() {
    const [previewCarousel, setPreviewCarousel] = useState<any>(null);
        const [isLoading, setLoading] = useState(false);
    const [errorInput, setError] = useState({})

    const { data, setData, post, processing, errors, reset } = useForm({

        nama_file_carousel: "",
        file_carousel: "",
    });
    const onCreateCarousel: FormEventHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(
                `/api/carousel`,
                {
                    nama_file: data.nama_file_carousel,
                    file_carousel: data.file_carousel,
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
                        setLoading(false);
                setTimeout(() => {
                    window.location.href = "/carousel";
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
    function onPreviewCarousel(e: any) {
        let dataimages = e.target.files[0];
        if (dataimages) {
            setData("file_carousel", dataimages);
            setPreviewCarousel(URL.createObjectURL(dataimages));
        }
    }
    return (
        <div>
            <div className="bg-white shadow-xl p-5 rounded-lg ">
                <form
                    action=""
                    onSubmit={onCreateCarousel}
                >
                    <div className="mt-4  block p-4">
                        <label htmlFor="imageCarousel">
                            <p className="block text-sm text-gray-700 font-bold">
                                Gambar
                            </p>
                            <NoteLabel value="Untuk resolusi yang baik dapat menggunakan resolusi 1920 x 1080 px, Format Gambar : JPG,JPEG" />
                                        {errorInput.file_carousel && (<p className='mt-1 text-sm text-red-500 tracking-normal'>{errorInput.file_carousel[0]}</p>)}

                            {previewCarousel == null ? (
                                <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer w-full h-72">
                                    <p className="text-gray-500 text-lg text-center mx-auto my-auto">
                                        + Img
                                    </p>
                                </div>
                            ) : (
                                <img
                                    src={
                                        previewCarousel
                                    }
                                    style={{
                                        objectFit:
                                            "fill",
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
                            onChange={onPreviewCarousel}
                        />
                    </div>
                    <div className="">
                        <InputLabel
                            htmlFor="nama_file_carousel"
                            value="Judul Carousel"
                            className="font-bold"
                        />
                        <NoteLabel value="Masukkan Alamat Perusahaan" />
                        <TextInput
                            id="nama_file_carousel"
                            type="text"
                            name="nama_file_carousel"
                            value={
                                data.nama_file_carousel
                            }
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData(
                                    "nama_file_carousel",
                                    e.target.value
                                )
                            }
                        />

                        <InputError
                            message={
                                errors.nama_file_carousel
                            }
                            className="mt-2"
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
    )
}
