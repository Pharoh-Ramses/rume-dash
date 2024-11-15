'use client'

import Image from 'next/image'
import { Stepper } from '@kit/ui/stepper';
import IndividualRegistrationForm from "~/components/forms/individual-registration-form";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-1/2 h-full z-[1]">
                <video
                    className="w-full h-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="https://utfs.io/f/dpqwr3JUtI3eKO7bXcRSvgDq5x8XW07IyAZ9UN4Moi2eOwYV"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5)_0%,white_70%)]" />
            </div>
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-[2]">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            Welcome Jet setters, your next trip starts here!
                        </h1>
                        <p className="text-xl text-gray-500">
                            Start planning your next trip today.
                        </p>
                        <IndividualRegistrationForm />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/3 aspect-square z-[2]">
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