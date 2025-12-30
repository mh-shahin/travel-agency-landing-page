'use client';

export default function AboutUs() {
    const stats = [
        { value: '20+', label: 'Years Experience' },
        { value: '10k', label: 'Happy Clients' },
        { value: '4.9', label: 'Overall rating' },
    ];

    return (
        <section className="py-16 px-4 md:px-8">
            <div className="items-center max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-4xl font-bold text-blue-600 mb-8 relative w-full max-w-312 mx-auto">
                    About us
                </h2>
                <div className="justify-center mb-12 max-w-5xl mx-auto text-justify">

                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Explore the World with Travelo!
                    </h3>
                    <p className="text-black leading-relaxed mb-6">
                        <span className="text-blue-600 text-2xl font-semibold">Welcome to Travels,</span>your trusted partner in creating unforgettable journeys!
                        At Travels, we believe travel is more than just visiting places—it’s about discovering experiences that stay with you forever.
                        Our passionate team of travel enthusiasts specializes in crafting personalized itineraries tailored
                        to your unique preferences, ensuring seamless, hassle-free travel. From serene getaways to adventurous
                        expeditions and cultural explorations, we deliver expert guidance, a trusted network of partners, and 24/7
                        support to make every journey meaningful and memorable. Whether it’s customized tours,
                        flight and hotel bookings, group packages, or corporate travel solutions, Travels is here to simplify
                        your travel plans and add magic to your adventures. Start your journey with us today and create memories
                        to cherish for a lifetime!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-2xl mx-auto justify-center">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center px-8 py-6 bg-blue-100 rounded-full shadow-md"
                        >
                            <div className="text-6xl font-bold text-blue-600 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-black text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}