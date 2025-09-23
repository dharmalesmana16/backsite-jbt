"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
export default function DataCarousel() {
    const [dataCarousel, setDataCarousel] = useState([]);
    useEffect(() => {
        axios.get("/api/carousel").then(function (response) {
            setDataCarousel(response.data.data);
        });
    }, []);
    return (
        <Carousel
            showArrows={true}
            autoPlay
            infiniteLoop
            showIndicators={true}
            showThumbs={false}
            showStatus={true}
        >
            {dataCarousel.map((res: any, idx: any) => (
                <div className="">
                    <img
                        src={`/storage/image/carousel/${res.file}`}
                        className="h-[300px] md:h-[350px] rounded-3xl"
                    />
                </div>
            ))}
        </Carousel>
    );
}
