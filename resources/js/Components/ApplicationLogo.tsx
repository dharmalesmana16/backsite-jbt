import { SVGAttributes } from 'react';

export default function ApplicationLogo({className}:any) {
    return (
        <img src='/images/logo-aplikasi.png' alt='logo-perusahaan' className={className ? className : `w-full h-12`} />


    );
}
