import HeaderPage from '@/Components/HeaderPage';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import NoteLabel from '@/Components/NoteLabel';
import TextInput from '@/Components/TextInput';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ children }: any) {
    const [previewLogo, setPreviewLogo] = useState<any>(null);
    const [previewStrukturOrganisasi, setPreviewStrukturOrganisasi] = useState<any>(null);
    function onPreviewLogo(e: any) {
        let dataImage = e.target.files[0]
        if (dataImage) {
            setData("logo", dataImage);
            setPreviewLogo(URL.createObjectURL(dataImage));
        }

    }
    function onPreviewStruktur(e: any) {
        let dataimages = e.target.files[0]
        if (dataimages) {
            setData("file_struktur_organisasi", dataimages);
            setPreviewStrukturOrganisasi(URL.createObjectURL(dataimages));
        }

    }
    // const { dataVideo, setDataVideo } = useForm({
    //     video: '',
    // });
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_perusahaan: '',
        alamat_perusahaan: '',
        logo: '',
        deskripsi: '',
        url_maps: '',
        telp_kantor: '',
        call_center: '',
        video: '',
        file_struktur_organisasi: '',
    });

    return (
        <>
            <Head title="Home" />

            <DashboardLayout>
                <div className="py-8 ">
                    <div className=" w-full mx-auto ">
                        <div className="md:grid md:grid-cols-3 gap-4">
                            {/* Informasi Perusahaan */}
                            <div className="bg-white p-5 shadow-xl rounded-xl h-full">
                                <div className="judul">
                                    <p className='font-bold text-md leading-normal'>Informasi Perusahaan</p>
                                    <div className="">
                                        <div className="mt-4  block p-4">

                                            <label htmlFor="firstImage">
                                                <p className='block text-sm text-gray-700 font-bold'>Gambar Direksi</p>
                                                {previewLogo == null ? (
                                                    <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer w-25 h-12">
                                                        <p className='text-gray-500 text-lg text-center mx-auto my-auto'>+ Logo</p>
                                                    </div>
                                                ) : (
                                                    <img src={previewLogo} style={{ objectFit: "fill" }} className='w-25 h-25 mx-auto cursor-pointer' />
                                                )}
                                            </label>
                                            {/* <input type="file" name="" id="" /> */}
                                            <input type="file" name='previewImg1' id='firstImage' style={{ display: "none" }} onChange={onPreviewLogo} />
                                        </div>
                                        <div className="mt-4 block">
                                            <InputLabel htmlFor="nama_perusahaan" value="Nama Perusahaan" className='font-bold' />
                                            <NoteLabel value="Masukkan Alamat Perusahaan" />
                                            <TextInput
                                                id="nama_perusahaan"
                                                type="text"
                                                name="nama_perusahaan"
                                                value={data.nama_perusahaan}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('nama_perusahaan', e.target.value)}
                                            />

                                            <InputError message={errors.nama_perusahaan} className="mt-2" />
                                        </div>
                                        <div className="mt-4 block">
                                            <InputLabel htmlFor="deskripsi" value="Deskripsi" className='font-bold' />
                                            <NoteLabel value="Masukkan Deskripsi Perusahaan" />
                                            <TextInput
                                                id="deskripsi"
                                                type="text"
                                                name="deskripsi"
                                                value={data.deskripsi}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('deskripsi', e.target.value)}
                                            />

                                            <InputError message={errors.deskripsi} className="mt-2" />
                                        </div>
                                        <div className="mt-4 block">
                                            <InputLabel htmlFor="alamat_perusahaan" value="Alamat Perusahaan" className='font-bold' />
                                            <NoteLabel value="Masukkan Alamat Perusahaan" />
                                            <TextInput
                                                id="alamat_perusahaan"
                                                type="text"
                                                name="alamat_perusahaan"
                                                value={data.alamat_perusahaan}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('alamat_perusahaan', e.target.value)}
                                            />

                                            <InputError message={errors.alamat_perusahaan} className="mt-2" />
                                        </div>
                                        <div className="mt-4 block">
                                            <InputLabel htmlFor="alamat_perusahaan" value="Link Maps" className='font-bold' />
                                            <NoteLabel value="Masukkan Link Maps" />
                                            <TextInput
                                                id="alamat_perusahaan"
                                                type="text"
                                                name="alamat_perusahaan"
                                                value={data.alamat_perusahaan}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('alamat_perusahaan', e.target.value)}
                                            />

                                            <InputError message={errors.alamat_perusahaan} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* End Informasi Perusahaan */}
                            {/* Informasi Carousel */}
                            <div className="col-span-2">


                                <div className="bg-white p-5 shadow-xl rounded-xl">
                                    <div className="judul">
                                        <p className='font-bold text-md leading-normal'>Informasi Video</p>
                                        <div className="">
                                            <div className="">
                                                <video
                                                    src="/video/videojbt.mp4"
                                                    className=" min-h-full w-full  rounded-lg"
                                                    autoPlay={
                                                        true
                                                    }
                                                    loop
                                                    muted></video>

                                            </div>


                                            <div className="mt-4 block">
                                                <InputLabel htmlFor="video" value="Video" className='font-bold' />
                                                <NoteLabel value="Ganti File Video" />
                                                <TextInput
                                                    id="video"
                                                    type="file"
                                                    name="video"
                                                    value={data.video}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    isFocused={true}
                                                    onChange={(e) => setData('video', e.target.files[0])}
                                                />

                                                <InputError message={errors.alamat_perusahaan} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="md:grid md:grid-cols-3 gap-4 py-5">
                            {/* Informasi Perusahaan */}
                            <div className="bg-white p-5 shadow-xl rounded-xl">
                                <div className="judul">
                                    <p className='font-bold text-md leading-normal'>Struktur Organisasi</p>
                                    <div className="">
                                        <div className="mt-4  block p-4">

                                            <label htmlFor="imageSo">
                                                <p className='block text-sm text-gray-700 font-bold'>Gambar</p>
                                                {previewStrukturOrganisasi == null ? (
                                                    <div className="p-20 border-2 border-gray-200 border-dashed cursor-pointer w-25 h-12">
                                                        <p className='text-gray-500 text-lg text-center mx-auto my-auto'>+ Logo</p>
                                                    </div>
                                                ) : (
                                                    <img src={previewStrukturOrganisasi} style={{ objectFit: "fill" }} className='w-25 h-25 mx-auto cursor-pointer' />
                                                )}
                                            </label>
                                            {/* <input type="file" name="" id="" /> */}
                                            <input type="file" name='previewImgStrukturOrganisasi' id='imageSo' style={{ display: "none" }} onChange={onPreviewStruktur} />
                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* End Informasi Perusahaan */}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
