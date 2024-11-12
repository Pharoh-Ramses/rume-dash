import { Card, CardContent, CardHeader, CardTitle } from "@kit/ui/card"
import { CheckCircle } from "lucide-react"

export default function AboutUsSection() {
    const features = [
        "Exclusive travel deals",
        "24/7 customer support",
        "Personalized itineraries",
        "Luxury accommodations",
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            About <span className={"text-primary"}>JetSet</span> <span className={"text-secondary"}>Health</span>
                        </h2>
                        <p className="text-lg text-gray-500">
                            JetSet Health provides an accessible online travel clinic for our patients to get the medical advice and prescriptions they need to safely set out on their travels. Our services equip our clients with a licensed medical provider without the wait times, insurance hurdles, and unknown prices.
                        </p>
                        <ul className="space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-primary">200+</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Destinations</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-primary">10k+</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Happy Travelers</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-primary">15+</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Years of Experience</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-primary">24/7</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Customer Support</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}