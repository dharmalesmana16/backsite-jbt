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
import React, { useEffect, useState } from 'react'
import { FormEventHandler } from 'react';
import Swal from 'sweetalert2'

export default function Create({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [gambar, setGambar] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        warna: '',
        logo: '',
        jumlah_saham: '',
        jumlah: '',
        kepemilikan: '',
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        axios.post("/api/saham", {
            nama: data.nama,
            warna: data.warna,
            logo: data.logo,
            jumlah_saham: data.jumlah_saham,
            jumlah: data.jumlah,
            kepemilikan: data.kepemilikan,
        }, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        }).then(function (response) {
            console.log(response);
            Swal.fire({
                title: "Sukses",
                text: "Data Berhasi Dibuat !",
                icon: "success",
                timer: 2000
            });
            setTimeout(() => {
                window.location.href = "/pemegangsaham"
            }, 1000);
        })
    };

    return (
        <div>
            <DashboardLayout>
                <HeaderPage link="/pemegangsaham" linkName="Kembali" />
                <div className="py-8 max-w-5xl mx-auto">
                    <div className="bg-white shadow-xl p-5 rounded-lg ">
                        <form onSubmit={submit}>
                            <div className='mt-4 block'>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="">
                                        <InputLabel htmlFor="nama" value="Nama Perusahaan" className='font-bold' />
                                        <NoteLabel value="Masukkan Nama Perusahaan Pemegang Saham" />
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="nama"
                                            value={data.nama}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('nama', e.target.value)}
                                        />

                                        <InputError message={errors.nama} className="mt-2" />
                                    </div>
                                    <div className="">
                                        <InputLabel htmlFor="warna" value="Identitas Warna" className='font-bold' />
                                        <NoteLabel value="Masukkan Warna" />
                                        <TextInput
                                            id="warna"
                                            type="color"
                                            name="warna"
                                            value={data.warna}
                                            className="mt-1 block w-14 h-10 rounded-xl"
                                            autoComplete="username"
                                            isFocused={true}

                                            onChange={(e) => setData('warna', e.target.value)}

                                        />
                                        {/* <input type="color" className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="hs-color-input" value="#2563eb" title="Choose your color"/> */}

                                        <InputError message={errors.warna} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 block'>
                                    <div className="">
                                        <InputLabel htmlFor="jumlah_saham" value="Jumlah Saham (Lembar)" className='font-bold' />
                                        <NoteLabel value="Masukkan Jumlah Kepemilikan Saham " />
                                        <TextInput
                                            id="jumlah_saham"
                                            type="number"
                                            name="jumlah_saham"
                                            value={data.jumlah_saham}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('jumlah_saham', e.target.value)}
                                        />

                                        <InputError message={errors.nama} className="mt-2" />
                                    </div>

                            </div>
                            <div className='mt-4 block'>
                                        <InputLabel htmlFor="jumlah" value="Jumlah (Rp)" className='font-bold' />
                                        <NoteLabel value="Masukkan Jumlah Saham Dalam Satuan Rupiah" />
                                        <TextInput
                                            id="jumlah"
                                            type="number"
                                            name="jumlah"
                                            value={data.jumlah}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('jumlah', e.target.value)}
                                        />

                                        <InputError message={errors.nama} className="mt-2" />

                            </div>
                            <div className='mt-4 block'>
                                        <InputLabel htmlFor="jumlah" value="Kepemilikan (%)" className='font-bold' />
                                        <NoteLabel value="Masukkan Jumlah Saham Dalam Satuan Rupiah" />
                                        <TextInput
                                            id="kepemilikan"
                                            type="number"
                                            name="kepemilikan"
                                            value={data.kepemilikan}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('kepemilikan', e.target.value)}
                                        />

                                        <InputError message={errors.nama} className="mt-2" />

                            </div>



                            <div className="mt-4 flex items-center justify-end">


                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Tambah Data
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}
