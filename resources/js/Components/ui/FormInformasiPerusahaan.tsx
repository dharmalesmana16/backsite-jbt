import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import InputError from "../InputError";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import NoteLabel from "../NoteLabel";

export type iProps = {
    nama_perusahaan: string;
    alamat_perusahaan?: string;
    deskripsi: any;
    no_telp?: string;
    call_center?: string;
    url_maps?: string;
    slug: any;
    onUpdate: any;
    onPreviewLogo: any;
    previewLogo: any;
    logo: any;
    setValue: any;
};

export default function FormInformasiPerusahaan(props: iProps) {
    function onPreviewLogo(e: any) {
        let dataImage = e.target.files[0];
        if (dataImage) {
            // setData("logo", dataImage);
            setPreviewLogo(URL.createObjectURL(dataImage));
        }
    }
    return (
        <div>
            <div className="bg-white p-5 shadow-xl rounded-xl h-full">
                <div className="judul">
                    <p className="font-bold text-md leading-normal">
                        Informasi Perusahaan
                    </p>
                    <div className="">
                        <form
                            action={`/api/informasiperusahaan/${props.slug}`}
                            method="post"
                            onSubmit={props.onUpdate}
                        >
                            <div className="mt-4  block p-4">
                                <label htmlFor="firstImage">
                                    <p className="block text-sm text-gray-700 font-bold">
                                        Logo Perusahaan
                                    </p>

                                    <img
                                        src={
                                            props.previewLogo
                                                ? props.previewLogo
                                                : `/storage/image/resourcecompany/${props.logo}`
                                        }
                                        style={{
                                            objectFit: "fill",
                                        }}
                                        className="w-25 h-25 mx-auto cursor-pointer"
                                    />
                                </label>
                                {/* <input type="file" name="" id="" /> */}
                                <input
                                    type="file"
                                    name="previewImg1"
                                    id="firstImage"
                                    style={{ display: "none" }}
                                    onChange={props.onPreviewLogo}
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="nama_perusahaan"
                                    value="Nama Perusahaan"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Alamat Perusahaan" />
                                <TextInput
                                    id="nama_perusahaan"
                                    type="text"
                                    name="nama_perusahaan"
                                    value={props.nama_perusahaan}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={props.setValue}
                                />

                                <InputError
                                    message={errors.nama_perusahaan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="deskripsi"
                                    value="Deskripsi"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Deskripsi Perusahaan" />
                                <TextInput
                                    id="deskripsi"
                                    type="text"
                                    name="deskripsi"
                                    value={props.deskripsi}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={props.setValue}
                                />

                                <InputError
                                    message={errors.deskripsi}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="alamat_perusahaan"
                                    value="Alamat Perusahaan"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Alamat Perusahaan" />
                                <TextInput
                                    id="alamat_perusahaan"
                                    type="text"
                                    name="alamat_perusahaan"
                                    value={props.alamat_perusahaan}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={props.setValue}
                                />

                                <InputError
                                    message={errors.alamat_perusahaan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="telp_kantor"
                                    value="Telp Kantor"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Telp Kantor" />
                                <TextInput
                                    id="telp_kantor"
                                    type="text"
                                    name="telp_kantor"
                                    value={props.no_telp}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={props.no_telp}
                                />

                                <InputError
                                    message={errors.telp_kantor}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="call_center"
                                    value="Call Center"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Telp Kantor" />
                                <TextInput
                                    id="call_center"
                                    type="text"
                                    name="call_center"
                                    value={data.call_center}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("call_center", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.call_center}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="email_perusahaan"
                                    value="Email Perusahaan"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Alamat Perusahaan" />
                                <TextInput
                                    id="email_perusahaan"
                                    type="text"
                                    name="email_perusahaan"
                                    value={data.email_perusahaan}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "email_perusahaan",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.email_perusahaan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 block">
                                <InputLabel
                                    htmlFor="url_maps"
                                    value="Link Maps"
                                    className="font-bold"
                                />
                                <NoteLabel value="Masukkan Link Maps" />
                                <TextInput
                                    id="url_maps"
                                    type="text"
                                    name="url_maps"
                                    value={data.url_maps}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("url_maps", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.url_maps}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Update Data
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
