import { Link } from "@inertiajs/react";
import React from "react";

export type propsBerita = {
    judul: string;
    tanggal?: string;
    deskripsi: any;
    cover?: string;
    published_on?: string;
    slug?: string;
    onDelete: any;
    urlUpdate: any;
};

export default function CardBerita(props: propsBerita) {

    return (
        <div className="flex flex-col md:w-full w-full  mx-auto">
            <div className={props.cover ? "" : "bg-main"}>
                <img
                    src={
                        props.cover
                            ? `/storage/image/berita/${props.cover}`
                            : "/images/berita.png"
                    }
                    className={
                        props.cover
                            ? "rounded-3xl w-full h-[200px] md:h-[250px]"
                            : "w-48 h-48 bg-main rounded-3xl p-3 mx-auto"
                    }
                    alt=""
                    srcSet=""
                />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between mt-5">
                <div className="bg-second p-2 rounded-xl w-42 text-center">
                    <p className='text-gray-950 font-normal text-sm tracking-normal'>{props.tanggal != null ? new Date(props.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }):"05 Oktober 2025"}</p>
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
                {props.judul
                    ? props.judul.length > 100
                        ? `${props.judul.substring(0, 95) + "..."}`
                        : props.judul
                    : props.judul}
            </h1>
             <div dangerouslySetInnerHTML={{ __html: props.judul
                    ? props.deskripsi.length > 100
                        ? `${props.deskripsi.substring(0, 95) + "..."}`
                        : props.deskripsi
                    : props.deskripsi }} />
            <div className="py-5">
                <form onSubmit={props.onDelete} method="POST">
                    <input type="hidden" name="slug" value={props.slug} />
                    <button
                        type="submit"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Hapus
                    </button>

                    <a
                        href={props.urlUpdate ? props.urlUpdate : "#"}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Edit
                    </a>
                </form>
                {/* <a
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
                </a> */}
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
