import Checkbox from '@/Components/Checkbox'
import HeaderPage from '@/Components/HeaderPage'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import NoteLabel from '@/Components/NoteLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { useForm } from '@inertiajs/react'
import axios from 'axios'
import { parse } from 'path'
import React, { useEffect, useRef, useState } from 'react'
import { FormEventHandler } from 'react';
import { Datepicker } from "flowbite-react";
import { formatDate } from 'date-fns'
import Swal from 'sweetalert2'
import { FaSpinner } from 'react-icons/fa6'
import JoditEditor from 'jodit-react'

export default function Create({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [gambar, setGambar] = useState(null);
    const [previewImg, setPreview] = useState<any>(null);
    const [isLoading, setLoading] = useState(false);
    const [content, setContent] = useState<string>('');
    const editor = useRef(null);
    const configs = {
        readonly: false,
        height: 400,

        // toolbarButtonSize: 'middle',
        buttons: ['bold', 'italic', 'underline', 'link', 'source', 'font'],

    };
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        tempat_lahir: '',
        tgl_lahir: '',
        harga: '',
        file: '',
        jabatan: '',
        deskripsi: '',
        tipe_direksi: '',
        remember: false as boolean,
    });

    // const handleDateChange = (date: any) => {
    //     let newDateFormat = formatDate(date, 'yyyy-MM-dd')
    //     setData("tgl_lahir", newDateFormat); // Update the state with the new date

    // };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoading(false)
        axios.post("/api/direksi", {
            nama: data.nama,
            tempat_lahir: data.tempat_lahir,
            tgl_lahir: data.tgl_lahir,
            jabatan: data.jabatan,
            tipe_direksi: data.tipe_direksi,
            deskripsi: data.deskripsi,
            file: data.file,
            // spesifikasi: data.file_spesifikasi
        }, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        }).then(function (response) {
            console.log(response);
            Swal.fire({
                title: "Sukses",
                text: "Data Berhasil Dibuat !",
                icon: "success",
                timer: 2000
            });
            setLoading(true)

            setTimeout(() => {
                window.location.href = "/direksi"
            }, 1000);
        })
    };
    function preview(e: any) {
        let dataImage = e.target.files[0]
        if (dataImage) {
            setData("file", dataImage);
            setPreview(URL.createObjectURL(dataImage));
        }

    }

    return (
        <div>
            <DashboardLayout>
                <HeaderPage link="/direksi" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2">
                                <div className="mt-4  block p-4">

                                    <label htmlFor="firstImage">
                                        <p className='block text-sm text-gray-700 font-bold'>Gambar Direksi</p>
                                        {previewImg == null ? (
                                            <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer w-full h-[375px]">
                                                <p className='text-gray-500 text-lg text-center mx-auto my-auto'>+ Img</p>
                                            </div>
                                        ) : (
                                            <img src={previewImg} style={{ objectFit: "fill" }} className='w-[275px] h-[375px] mx-auto' />
                                        )}
                                    </label>
                                    {/* <input type="file" name="" id="" /> */}
                                    <input type="file" name='previewImg1' id='firstImage' style={{ display: "none" }} onChange={preview} />
                                </div>
                                <div className="">
                                    <div className='mt-4 block'>
                                        <InputLabel htmlFor="nama" value="Nama Direksi" className='font-bold' />
                                        <NoteLabel value="Masukkan Nama Direksi" />
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="nama"
                                            value={data.nama}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => { setData('nama', e.target.value); console.log(data.tgl_lahir) }}
                                        />

                                        <InputError message={errors.nama} className="mt-2" />

                                    </div>
                                    <div className="mt-4 block">
                                        <InputLabel htmlFor="jabatan" value="Jabatan" className='font-bold' />
                                        <NoteLabel value="Masukkan Nama Jabatan" />
                                        <TextInput
                                            id="jabatan"
                                            type="text"
                                            name="jabatan"
                                            value={data.jabatan}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('jabatan', e.target.value)}
                                        />
                                        <InputError message={errors.jabatan} className="mt-2" />
                                    </div>
                                    <div className='mt-4 block'>
                                        {/* <div className="grid grid-cols-2 gap-4">
                                            <div className="">
                                                <InputLabel htmlFor="nama" value="Tempat Lahir" className='font-bold' />
                                                <NoteLabel value="Masukkan Tempat Lahir (Opsional)" />
                                                <TextInput
                                                    id="tempat_lahir"
                                                    type="text"
                                                    name="tempat_lahir"
                                                    value={data.tempat_lahir}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    isFocused={true}
                                                    onChange={(e) => setData('tempat_lahir', e.target.value)}
                                                />

                                                <InputError message={errors.tempat_lahir} className="mt-2" />
                                            </div>
                                            <div className="">
                                                <InputLabel htmlFor="jabatan" value="Tanggal Lahir" className='font-bold' />
                                                <NoteLabel value="Masukkan Tanggal Lahir (Opsional)" />


                                                <Datepicker onChange={handleDateChange} />




                                                <InputError message={errors.tgl_lahir} className="mt-2" />
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="mt-4 block">
                                        <InputLabel htmlFor="jabatan" value="Tipe Direksi" className='font-bold' />
                                        <NoteLabel value="Pilih Tipe Direksi (Dewan Direksi / Dewan Komisaris)" />
                                        <select onChange={(e) => setData('tipe_direksi', e.target.value)} id="tipe_direksi" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option defaultValue={"d_direksi"} selected>Pilih Salah Satu</option>
                                            <option value={"d_komisaris"} >Dewan Komisaris</option>
                                            <option value={"d_direksi"} >Dewan Direksi</option>
                                            {/* {
                                                supplier.map((item: any) => (
                                                    <option value={item.id}>{item.nama_supplier}</option>
                                                ))
                                            } */}
                                        </select>
                                    </div>
                                    <div className="mt-4 block">
                                        <InputLabel htmlFor="nama" value="Deskripsi" className='font-bold' />
                                        <NoteLabel value="Masukkan Deskripsi (Opsional)" />
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={configs}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={(newContent: string) => setContent(newContent)}
                                            onChange={(newContent: string) => { console.log(content) }}
                                        />


                                    </div>
                                    <div className="mt-4 block">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        'remember',
                                                        (e.target.checked || false) as false,
                                                    )
                                                }
                                            />
                                            <span className="ms-2 text-sm text-gray-600">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mt-4 flex items-center justify-end">


                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            {
                                                isLoading == false ? (
                                                    "Tambah Data"
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
    )
}
