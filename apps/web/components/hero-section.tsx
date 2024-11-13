'use client'

import Image from 'next/image'

export default function HeroSection() {

    return (
        <section className="relative min-h-screen flex items-center overflow:hidden">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left column with form */}
                    <div className="space-y-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            Welcome Jet setters, your next trip starts here!
                        </h1>
                        <p className="text-xl text-gray-500">
                            Start planning your next trip.
                        </p>
                    </div>

                    {/* Right column (empty) */}
                    <div className="hidden lg:block">
                        {/* This column is intentionally left empty */}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/3 aspect-square">
                <Image
                    className="object-contain"
                    src="/images/luggage-bottom-right.webp"
                    alt="An image of travel luggage"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                />
            </div>


        </section>
    )
}