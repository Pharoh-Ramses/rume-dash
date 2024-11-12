'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from "@kit/ui/button"
import { Card, CardContent } from "@kit/ui/card"
import {Pill} from "@kit/ui/marketing"
const products = [
    { id: 1, name: "Azithromycin (Traveler’s Diarrhea)", price: 24.99, rating: 4.5, image: "/images/treatment-bottle.webp?height=200&width=200" },
    { id: 2, name: "Cefixme (STI Prevention Chlamydia)", price: 24.99, rating: 4.7, image: "/images/treatment-bottle.webp?height=200&width=200" },
    { id: 3, name: "Cefixme (STI Prevention Gonorrhea)", price: 121.00, rating: 4.8, image: "/images/treatment-bottle.webp?height=200&width=200" },
    { id: 4, name: "Ciprofloxacin" + "\n(Pink Eye)", price: 10.99, rating: 4.6, image: "/images/treatment-bottle.webp?height=200&width=200" },
    { id: 5, name: "Ciprofloxacin Hydrochloride (Swimmer’s Ear)", price: 10.99, rating: 4.9, image: "/images/treatment-bottle.webp?height=200&width=200" },
    { id: 6, name: "Deep Vein Thrombosis & Pulmonary Embolism", price: 20.95, rating: 4.4, image: "/images/treatment-bottle.webp?height=200&width=200" },
]

export default function PopularProductsSlider() {
    const [scrollPosition, setScrollPosition] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    const handleScroll = (direction: 'left' | 'right') => {
        const slider = sliderRef.current
        if (slider) {
            const scrollAmount = direction === 'left' ? -slider.offsetWidth : slider.offsetWidth
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const slider = sliderRef.current
        if (slider) {
            const handleScrollEvent = () => {
                setScrollPosition(slider.scrollLeft)
            }
            slider.addEventListener('scroll', handleScrollEvent)
            return () => slider.removeEventListener('scroll', handleScrollEvent)
        }
    }, [])

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Pill label={"Sale"} >
                    <span>Get them while they're hot!</span>
                </Pill>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                    Popular Treatments
                </h2>
                <div className="relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product) => (
                            <Card key={product.id} className="flex-none w-64">
                                <CardContent className="p-4">
                                    <div className="relative h-48 w-full mb-4">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-md"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md"
                        onClick={() => handleScroll('left')}
                        disabled={scrollPosition === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Scroll left</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md"
                        onClick={() => handleScroll('right')}
                        // @ts-ignore
                        disabled={scrollPosition === sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Scroll right</span>
                    </Button>
                </div>
            </div>
        </section>
    )
}