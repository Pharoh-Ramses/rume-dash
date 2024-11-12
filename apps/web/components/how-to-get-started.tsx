import { Button } from "@kit/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kit/ui/card"
import { CheckCircle, UserCog } from "lucide-react"

export default function HowToGetStarted() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
                    How to Get Started
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-6 w-6 text-primary" />
                                Self-Serve
                            </CardTitle>
                            <CardDescription>
                                Quick and easy way to get your travel healthcare needs met
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ol className="list-decimal list-inside space-y-2">
                                <li>Create an account on our platform</li>
                                <li>Fill out your travel details and medical history</li>
                                <li>Select the recommended medications and vaccinations</li>
                                <li>Complete the online consultation with a licensed physician</li>
                                <li>Receive your personalized travel health plan</li>
                            </ol>
                            <Button className="w-full">Start Self-Serve Process</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCog className="h-6 w-6 text-primary" />
                                Concierge
                            </CardTitle>
                            <CardDescription>
                                Personalized assistance for complex travel health needs
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ol className="list-decimal list-inside space-y-2">
                                <li>Schedule a call with our travel health specialist</li>
                                <li>Discuss your travel plans and health concerns in detail</li>
                                <li>Receive a customized travel health consultation</li>
                                <li>Get assistance with medication prescriptions and vaccinations</li>
                                <li>Enjoy ongoing support throughout your travel journey</li>
                            </ol>
                            <Button className="w-full">Book Concierge Service</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}