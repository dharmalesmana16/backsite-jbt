import CardHorizontal from '@/Components/CardHorizontal'
import HeaderPage from '@/Components/HeaderPage'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function Page() {
    return (
        <div>
            <DashboardLayout>
                <HeaderPage pageName="Halaman Laporan Tahunan" link="/report/create" />
                <div className="py-8 ">
                    <div className=" max-w-7xl mx-auto ">
                        <div className="grid grid-cols-2 gap-4">

                        <CardHorizontal />
                        <CardHorizontal />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}
