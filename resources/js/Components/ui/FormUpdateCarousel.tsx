// @ts-ignore
// @ts-nocheck
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { FormEventHandler, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import PrimaryButton from '../PrimaryButton';
import InputError from '../InputError';
import TextInput from '../TextInput';
import NoteLabel from '../NoteLabel';
import InputLabel from '../InputLabel';
// import { EditorSta, ContentState } from "draft-js";
import JoditEditor, { Jodit } from 'jodit-react';
import 'jodit/es2021/jodit.min.css';
import 'jodit/es2021/jodit.fat.min.js';
// import 'jodit/build/jodit.min.css'
// import "jodit/build/jodit.min.css";
import 'jodit/esm/plugins/all.js';

export default function FormUpdateCarousel({ dataCarousel }: any) {
    const [previewCarousel, setPreviewCarousel] = useState<any>(null);
    const editor = useRef(null);
    const [content, setContent] = useState<string>('');
    const [errorInput, setError] = useState({})
        const [isLoading, setLoading] = useState(false);

    const config = {
        readonly: false,
        height: 400,
        toolbarButtonSize: 'middle',
        uploader: {
            insertImageAsBase64URI: true,
        },
        readonly: false,
        toolbar: true,
        spellcheck: true,
        language: 'en',
        toolbarButtonSize: 'medium',
        // toolbarAdaptive: false,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
    };
    const { data, setData, post, processing, errors, reset } = useForm({

        nama_file: dataCarousel.nama_file,
        file: dataCarousel.file,
    });
    const onUpdateCarousel: FormEventHandler = (e) => {
        e.preventDefault();

        axios
            .post(
                `/api/carousel/${dataCarousel.slug}`,
                {
                    _method: "PUT",
                    nama_file: data.nama_file,
                    file: data.file,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file uploads
                    },
                }
            )
            .then(function (response) {
                // console.log(response);
                Swal.fire({
                    title: "Sukses",
                    text: "Data Berhasil Diubah !",
                    icon: "success",
                    timer: 2000,
                });
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

            );;
    };
    function onPreviewCarousel(e: any) {
        let dataimages = e.target.files[0];
        if (dataimages) {
            setData("file", dataimages);
            setPreviewCarousel(URL.createObjectURL(dataimages));
        }
    }
    return (
        <div>
            <div className="bg-white shadow-xl p-5 rounded-lg ">
                <form
                    action=""
                    onSubmit={onUpdateCarousel}
                >
                    <div className="mt-4  block p-4">
                        <label htmlFor="imageCarousel">
                            <p className="block text-sm text-gray-700 font-bold">
                                Gambar
                            </p>
                            <NoteLabel value="Untuk resolusi yang baik dapat menggunakan resolusi 1920 x 1080 px, Format Gambar : JPG,JPEG" />
                                        {errorInput.file_carousel && (<p className='mt-1 text-sm text-red-500 tracking-normal'>{errorInput.file_carousel[0]}</p>)}

                            <img
                                src={
                                    previewCarousel ? previewCarousel : `/storage/image/carousel/${dataCarousel.file}`
                                }
                                style={{
                                    objectFit:
                                        "fill",
                                }}
                                className="w-full h-72 mx-auto cursor-pointer"
                            />
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
                            htmlFor="nama_file"
                            value="Judul Carousel"
                            className="font-bold"
                        />
                        <NoteLabel value="Masukkan Alamat Perusahaan" />
                        <TextInput
                            id="nama_file"
                            type="text"
                            name="nama_file"
                            value={
                                data.nama_file
                            }
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData(
                                    "nama_file",
                                    e.target.value
                                )
                            }
                        />


                    </div>




                    {/* </div> */}
                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton
                            className="ms-4"
                            disabled={processing}
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
                </form>
            </div>
        </div>
    )
}
