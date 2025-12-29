'use client';

export default function AboutUs() {
    const stats = [
        { value: '20+', label: 'Years Experience' },
        { value: '10k', label: 'Happy Customer' },
        { value: '4.9', label: 'Overall rating' },
    ];

    return (
        <section className="py-16 px-4 md:px-8">
            <div className="items-center max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        About us
                    </h2>
                <div className="justify-center mb-12 max-w-3xl mx-auto text-justify">
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Explore the World with Travelo!
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Welcome to Travelo, your trusted partner in creating unforgettable journeys to Travelo. We
                        understand that travel is more than just visiting new places; it&apos;s about experiencing different
                        cultures, meeting new people, and creating memories that last a lifetime. Our team of dedicated
                        travel experts is passionate about curating personalized itineraries that cater to your unique
                        preferences and interests. Whether it&apos;s a relaxing beach vacation, an adventurous mountain trek,
                        a cultural city tour, or a romantic getaway, we ensure every journey you undertake with us is
                        seamless, enjoyable, and memorable. At Travelo, customer trust, flight, and satisfaction are
                        our top priorities, and we go the extra mile to provide you with exceptional service from start
                        to finish.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 from-blue-50 to-white rounded-2xl shadow-md"
                        >
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}