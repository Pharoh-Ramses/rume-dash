import { Button } from "@kit/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ClosingCTA() {
    return (
        <section className="relative py-16 text-white overflow-hidden">
            <Image
                src="/images/hero-image.png?height=1080&width=1920"
                alt="Travel background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute inset-0 z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Ready to Travel with Confidence?
                    </h2>
                    <p className="text-xl mb-8">
                        Get personalized travel health recommendations and start your journey worry-free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="text-white hover:text-primary-foreground"
                        >
                            Start Self-Serve Process
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                        >
                            Book Concierge Service
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}