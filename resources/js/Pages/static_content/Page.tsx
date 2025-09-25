import HeaderPage from "@/Components/HeaderPage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NoteLabel from "@/Components/NoteLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import FormStaticContentBerita from "@/Components/ui/FormStaticContentBerita";
import FormStaticContentTender from "@/Components/ui/FormStaticContentTender";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function page({ dataBerita,dataTender }: any) {
    const [previewCoverBerita, setPreviewCoverBerita] = useState<any>(null);
    const { data, setData, processing, errors } = useForm({
        cover: "",
        text_header: "",
        text_sub_header: "",
        bg_color: "",
        // bg_warna_berita: "",
        // bg_warna_layanan: "",
    });
    // console.log(dataBerita);



    return (
        <div>
            <DashboardLayout>
                <HeaderPage pageName="Halaman Static Content" />
                <div className="py-8 max-w-5xl mx-auto">
                   <FormStaticContentBerita dataBerita={dataBerita}/>
                   <FormStaticContentTender dataTender={dataTender}/>
                </div>
            </DashboardLayout>
        </div>
    );
}
