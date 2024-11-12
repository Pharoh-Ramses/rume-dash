import Image from "next/image"

export default function FourImageSection() {
    const images = [
        { src: "/images/WinterTravel-2020-GettyImages-899427986-1024x576.webp?height=300&width=400", alt: "Destination 1" },
        { src: "/images/The-Best-Beach-Vacations-Close-to-the-US-Just-A-Few-Hours-From-Home-1024x683.jpg?height=300&width=400", alt: "Destination 2" },
        { src: "/images/Franey-sunrise-hike-1920x1080-1.jpg?height=300&width=400", alt: "Destination 3" },
        { src: "/images/newFile-6-1024x683.png?height=300&width=400", alt: "Destination 4" },
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left column with image grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right column with heading and text */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Take on Travel Healthcare
                        </h2>
                        <p className="text-lg text-gray-500">
                            We are a travel health company that provides consulting services concerning medication and vaccination recommendations for your next trip! Discuss with one of our licensed physicians to finalize a health plan that gives you the peace of mind and protections you need to enjoy your travel endeavors.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}