import { Briefcase, Factory, Person, Star } from "@gravity-ui/icons";

const stats = [
    {
        icon: <Briefcase />,
        value: "50K",
        label: "Active Jobs",
    },
    {
        icon: <Factory />,
        value: "12K",
        label: "Companies",
    },
    {
        icon: <Person />,
        value: "2M",
        label: "Job Seekers",
    },
    {
        icon: <Star />,
        value: "97%",
        label: "Satisfaction Rate",
    },
];

export default function StatisticsSection() {
    return (
        <section
            className="relative overflow-hidden bg-black bg-[url('/images/globe.png')]  bg-no-repeat bg-cover bg-center "
        >
            <div className="absolute inset-0 bg-black/40 "></div>
            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 z-10">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                        Assisting over{" "}
                        <span className="text-violet-300">15,000</span> job seekers
                        <br />
                        find their dream positions.
                    </h2>
                </div>

                {/* Cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-3xl border border-white/10 bg-white/4 p-8 backdrop-blur-xl"
                        >
                            <div className="mb-10 text-violet-300">
                                {item.icon}
                            </div>

                            <h3 className="text-5xl font-bold text-white">
                                {item.value}
                            </h3>

                            <p className="mt-4 text-gray-300">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}