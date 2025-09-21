import { Link } from "@inertiajs/react";
import React from "react";

export type propsBerita = {
    id: number;
    judul: string;
    tanggal?: string;
    deskripsi: any;
    gambar?: string;
    published_on?: string;
    slug?: string;
};

export default function CardBerita(props: propsBerita) {
    return (
        <div className="flex flex-col md:w-full w-full  mx-auto">
            <div className={props.gambar ? "" : "bg-main"}>
                <img
                    src={props.gambar ? props.gambar : "/images/berita.png"}
                    className={
                        props.gambar
                            ? "rounded-3xl w-full h-[200px] md:h-[250px]"
                            : "w-48 h-48 bg-main rounded-3xl p-3 mx-auto"
                    }
                    alt=""
                    srcSet=""
                />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between mt-5">
                <div className="bg-second p-1 rounded-xl w-42 text-center">
                    <p className="text-gray-950 font-normal text-md tracking-normal">
                        {props.tanggal}
                    </p>
                </div>
                {props.published_on != null ? (
                    <div className="">
                        <Link
                            className="text-main font-normal tracking-light text-md"
                            href="#"
                        >
                            {props.published_on}
                        </Link>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <h1 className="mt-5 text-md md:text-xl tracking-wide font-semibold dark:text-gray-900">
                {props.judul.length > 100
                    ? `${props.judul.substring(0, 95) + "..."}`
                    : props.judul}
            </h1>
            <div className="py-5">
                <a
                    href={`/berita/${props.slug}`}
                    className="inline-flex items-center  text-sm font-medium  text-main  rounded-lg hover:text-blue-900   "
                >
                    Selengkapnya
                    <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </a>
            </div>
        </div>
        // <div  className="flex flex-col max-w-sm p-6 h-72 content-end  bg-[url('/image/sekilas-layanan.jpg')] bg-gray-400 bg-blend-multiply bg-cover bg-no-repeat rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        // 	<div className="">
        // 		<div>
        // 			<h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-white">
        // 				{props.nama}
        // 			</h5>
        // 		</div>

        // 		<div className="flex justify-between ">
        // 			<div className="">
        // 				<p className='text-white font-normal text-md tracking-normal'>{props.tanggal}</p>
        // 			</div>
        // 			{
        // 				props.link_published != null ? (
        // 					<div className="">
        // 						<Link className='text-white font-normal tracking-light text-md' href="#">{props.link_published}</Link>
        // 					</div>
        // 				) : ""
        // 			}

        // 		</div>
        // 		<div className=" mt-5">
        // 			<Link href={`/berita/${props.slug}`}
        // 				className="inline-flex items-center  text-sm font-medium py-2 px-3 bg-main text-white hover:bg-blue-950  rounded-lg hover:text-white   ">
        // 				Selengkapnya
        // 				<svg
        // 					className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        // 					aria-hidden="true"
        // 					xmlns="http://www.w3.org/2000/svg"
        // 					fill="none"
        // 					viewBox="0 0 14 10">
        // 					<path
        // 						stroke="currentColor"
        // 						strokeLinecap="round"
        // 						strokeLinejoin="round"
        // 						strokeWidth="2"
        // 						d="M1 5h12m0 0L9 1m4 4L9 9"
        // 					/>
        // 				</svg>
        // 			</Link>
        // 		</div>
        // 	</div>
        // </div>
    );
}
