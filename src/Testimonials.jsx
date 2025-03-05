import { useState, useEffect } from "react";

const Testimonials = () => {
    // Array of testimonial objects with image, quote, and author details
    const testimonies = [
        { img: "https://avatar.iran.liara.run/public/boy?username=John", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", author: "John Doe" },
        { img: "https://avatar.iran.liara.run/public/girl?username=Mary", quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", author: "Mary Doe" },
        { img: "https://avatar.iran.liara.run/public/boy?username=Raymond", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", author: "Ray Lucas" },
        { img: "https://avatar.iran.liara.run/public/boy?username=Luke", quote: "Lorem ipsum dolor sit amet.", author: "Luke Pierce" },
        { img: "https://avatar.iran.liara.run/public/girl?username=Virginia", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", author: "Virginia Powell" },
        { img: "https://avatar.iran.liara.run/public/girl?username=Sara", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", author: "Sara George" },
        { img: "https://avatar.iran.liara.run/public/boy?username=Nick", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", author: "Nick Damon" },
        { img: "https://avatar.iran.liara.run/public/boy?username=Michael", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", author: "Mike Longbottom" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current index of displayed testimonials
    const [itemsPerPage, setItemsPerPage] = useState(1); // Tracks how many testimonials to display at a time
    const [preloadedImages, setPreloadedImages] = useState({}); // Stores preloaded images

    // Effect to update the number of testimonials shown based on screen size
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3); // Large screens (lg): Show 3 testimonials
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2); // Medium screens (md): Show 2 testimonials
            } else {
                setItemsPerPage(1); // Small screens (sm): Show 1 testimonial
            }
        };

        updateItemsPerPage(); // Initial setup based on current screen size
        window.addEventListener("resize", updateItemsPerPage); // Update on window resize
        return () => window.removeEventListener("resize", updateItemsPerPage); // Cleanup event listener on component unmount
    }, []);

    // Preload images when component mounts
    useEffect(() => {
        const loadImages = async () => {
            const images = {};
            for (const testimony of testimonies) {
                const img = new Image();
                img.src = testimony.img;
                await img.decode(); // Ensures image is loaded before saving
                images[testimony.img] = img.src;
            }
            setPreloadedImages(images);
        };

        loadImages();
    }, []);

    // Function to navigate to the previous set of testimonials
    const previousTestimony = () => {
        setCurrentIndex((prev) => (prev - itemsPerPage < 0 ? testimonies.length - itemsPerPage : prev - itemsPerPage));
    };

    // Function to navigate to the next set of testimonials
    const nextTestimony = () => {
        setCurrentIndex((prev) => (prev + itemsPerPage >= testimonies.length ? 0 : prev + itemsPerPage));
    };

    return (
        <section className="bg-[#e2dfd2] h-auto w-10/12 rounded-xl flex flex-col justify-center items-center gap-2 p-5">
            <div className="w-full flex flex-col justify-center items-center gap-3">
                {/* Testimonials Grid */}
                <section className={`grid gap-3 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
                    {testimonies.slice(currentIndex, currentIndex + itemsPerPage).map((testimony, index) => (
                        <section key={index} className="bg-[#b9c0b2] p-4 rounded-sm shadow-xl flex flex-col gap-3">
                            <img
                                className="size-20 mx-auto"
                                src={preloadedImages[testimony.img] || testimony.img}
                                alt={testimony.author}
                                loading="lazy"
                            />
                            <p>{testimony.quote}</p>
                            <p className="text-right font-semibold">— {testimony.author}</p>
                        </section>
                    ))}
                </section>

                {/* Navigation Buttons */}
                <section className="flex w-full justify-between gap-3">
                    <button onClick={previousTestimony} className="bg-[#2f4858] text-white py-2 px-6 rounded-md">
                        Previous
                    </button>
                    <button onClick={nextTestimony} className="bg-[#2f4858] text-white py-2 px-6 rounded-md">
                        Next
                    </button>
                </section>
            </div>
        </section>
    );
};

export default Testimonials;
