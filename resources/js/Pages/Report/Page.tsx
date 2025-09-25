import CardHorizontal from "@/Components/CardHorizontal";
import HeaderPage from "@/Components/HeaderPage";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [dataLaporanTahunan, setDataLaporanTahunan] = useState<any>([]);
    useEffect(() => {
        axios.get("/api/report/yearly").then(function (response) {
            // setDataLaporanTahunan(response.data.data.data);
        });
    });
    return (
        <div>
            <DashboardLayout>
                <HeaderPage
                    pageName="Halaman Laporan Tahunan"
                    link="/report/create"
                />
                <div className="py-8 ">
                    <div className=" max-w-7xl mx-auto ">
                        <div className="grid grid-cols-2 gap-4">
                            {dataLaporanTahunan.map((res: any) => (
                                <CardHorizontal />
                            ))}
                            {/* <CardHorizontal /> */}
                            {/* <CardHorizontal /> */}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}
