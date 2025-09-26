import HeaderPage from '@/Components/HeaderPage'
import FormCreateCarousel from '@/Components/ui/FormCreateCarousel'
import FormUpdateCarousel from '@/Components/ui/FormUpdateCarousel'
import DashboardLayout from '@/Layouts/DashboardLayout'
import React from 'react'

export default function Update({dataCarousel}:any) {
    return (

        <div>
            <DashboardLayout>

            <HeaderPage link="/" linkName="Kembali" />
            <div className="py-8 max-w-5xl mx-auto">
                <FormUpdateCarousel dataCarousel={dataCarousel}/>
            </div>
            </DashboardLayout>
        </div>
    )
}
