import { Briefcase, Factory, Magnifier, MapPin, Person, Star } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { BiBuildings } from "react-icons/bi";
import NewJobsBadge from "./newJobBadge";

const stats = [
    {
        icon: <Briefcase />,
        value: "50K",
        label: "Active Jobs",
    },
    {
        icon: <BiBuildings />,
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
const trendingJobs = [
    "Product Designer",
    "AI Engineering",
    "DevOps Engineer",
];

export default function StatisticsSection() {
    return (
        <section
            className="relative overflow-hidden bg-black bg-[url('/images/globe.png')]  bg-no-repeat bg-cover bg-center flex flex-col gap-60 md:gap-100 "
        >
            <div className="absolute inset-0 bg-black/20 "></div>
            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 text-center lg:pt-28">
                {/* Badge */}
                <NewJobsBadge />

                {/* Heading */}
                <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                    Find Your Dream Job Today
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
                    TalentNest connects top talent with world-class companies. Browse
                    thousands of curated opportunities and land your next role faster.
                </p>

                {/* Search */}
                <form className="mt-12 flex w-full max-w-4xl flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl lg:flex-row lg:items-center">
                    {/* Job */}
                    <div className="flex flex-1 items-center gap-3 px-4 py-3">
                        <Magnifier className="h-5 w-5 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Job title, skill or company"
                            className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="mx-3 hidden h-8 w-px bg-white/10 lg:block"></div>

                    <div className="my-2 h-px bg-white/10 lg:hidden"></div>

                    {/* Location */}
                    <div className="flex flex-1 items-center gap-3 px-4 py-3">
                        <MapPin className="h-5 w-5 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                        />
                    </div>

                    {/* Search Button */}
                    <Button
                        isIconOnly
                        color="primary"
                        className="mt-3 h-14 w-full rounded-xl lg:mt-0 lg:ml-3 lg:w-14"
                    >
                        <Magnifier className="h-5 w-5" />
                    </Button>
                </form>

                {/* Trending */}
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <span className="text-sm text-gray-400">
                        Trending Positions
                    </span>

                    <div className="flex flex-wrap justify-center gap-3">
                        {trendingJobs.map((job) => (
                            <button
                                key={job}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-white"
                            >
                                {job}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6 pb-24 z-10 w-full">
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