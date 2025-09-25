import HeaderPage from '@/Components/HeaderPage'
import FormCreateCarousel from '@/Components/ui/FormCreateCarousel'
import DashboardLayout from '@/Layouts/DashboardLayout'
import React from 'react'

export default function Create() {
    return (

        <div>
            <DashboardLayout>

            <HeaderPage link="/" linkName="Kembali" />
            <div className="py-8 max-w-5xl mx-auto">
                <FormCreateCarousel/>
            </div>
            </DashboardLayout>
        </div>
    )
}
