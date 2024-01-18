import { TestiMonialCards } from "@/components";
import Image from "next/image";
import Link from "next/link";

import mainImage from "@/assets/landingpage/dashboard.png";
import tagmangoIcon from "@/assets/featchers-section/tagmango.svg";
import discordIcon from "@/assets/featchers-section/discord.svg";
import googleSheetIcon from "@/assets/featchers-section/google-sheet.svg";
import PlanetDbIcon from "@/assets/featchers-section/planetDb.svg";
import chartImage from "@/assets/featchers-section/chart-bento-assit.svg";
import { Check, Fingerprint, Maximize, Maximize2, Mic } from "lucide-react";

const MockData = [
  {
    profileImage: "image1.jpg",
    name: "John Doe",
    role: "Designer",
    details: "John is a talented designer with a great eye for detail.",
  },
  {
    profileImage: "image2.jpg",
    name: "Jane Smith",
    details: "Jane is a skilled developer with a passion for coding.",
  },
  {
    profileImage: "image3.jpg",
    name: "Alice Johnson",
    role: "Project Manager",
    details: "Alice is an organized project manager who keeps things on track.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between bg-slate-950 text-white">
      <div className="sticky top-0 z-40 grid w-full place-items-center  shadow-lg backdrop-blur-xl">
        <nav className="flex w-full max-w-7xl items-center px-4 py-3">
          <Link className="flex items-center gap-3 font-bold" href="#">
            {/* <Image src={logo} className="h-14 w-14" alt="authify" /> */}
            Calnflare
          </Link>

          <ul className="ml-auto flex items-center space-x-2 ">
            <li>
              <Link
                className="rounded-full border border-zinc-900  px-4 py-2 transition-colors hover:border-zinc-700"
                href={"/auth"}
              >
                Login
              </Link>
            </li>
            <li className="">
              <Link
                className="rounded-full bg-indigo-700 px-4 py-2 font-semibold transition-colors hover:bg-indigo-800"
                href={"/auth"}
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="z-10 max-w-5xl  px-4  text-sm">
        {/* Hero section */}
        <section
          id="hero"
          className="mt-20  grid place-content-center text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="w-full text-6xl font-bold leading-tight tracking-tight md:text-6xl">
              <span className="fancy-text-hilight hlight-1">Streamline</span>,
              {"  "}
              <span className="fancy-text-hilight hlight-2">Secure</span>, and
              {"  "}
              <span className="fancy-text-hilight hlight-3">Scale</span> Your
              Discord Community
            </h1>
            <p className="my-14 max-w-lg text-center text-xl font-bold text-slate-400">
              Clanflare, our Ultimate Solution for User Management and
              Authentication on Discord
            </p>
          </div>
          <div className="my-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="btn-hero w-fit rounded-full px-6 py-4 font-bold active:bg-slate-700 "
              href={"/auth"}
            >
              Create Account for free
            </Link>
          </div>
        </section>
        {/* Hero Image */}
        <div className="mt-28">
          <div className="flex w-full rounded-t-lg bg-zinc-900">
            <ul className="main-image-window-controls flex gap-1">
              <li className="bg-gray-600"></li>
              <li className="bg-gray-600"></li>
              <li className="bg-gray-600"></li>
            </ul>
          </div>
          <div className="main-image ">
            <Image
              src={mainImage}
              alt="dashboard image display"
              className="rounded-b-lg"
            />
          </div>
        </div>
        {/* Testimonial Section */}
        <h2 className="mb-16 mt-20 text-center text-5xl font-semibold ">
          Testimonials
        </h2>{" "}
        <section
          id="testimonial"
          className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6"
        >
          {MockData.map((items, i) => {
            return (
              <TestiMonialCards
                key={i}
                details={items.details}
                name={items.name}
                profileImage={items.profileImage}
                role={items.role}
              />
            );
          })}
        </section>
        <h2 className="relative mb-16 mt-20 text-center text-5xl font-semibold ">
          Features
          <div className=" absolute left-[50%]  top-0 z-[-10] h-32 w-32 translate-x-[-50%] rounded-full bg-gradient-to-t from-indigo-900 to-red-900 blur-2xl"></div>
        </h2>{" "}
        <FeaturesSection />
        <h2 className="mb-16 mt-20 text-center text-5xl font-semibold ">
          Pricng
        </h2>
        <section className="relative grid  place-items-center gap-4  sm:grid-cols-2">
          <div className="absolute left-[50%] top-0 z-[-5] h-60 w-60 translate-x-[-50%] bg-gradient-to-t from-sky-900  to-emerald-950 blur-3xl"></div>

          <SamplePricingComponent />
          <SamplePricingComponent />
        </section>
        {/* blog */}
        <div className="absolute left-[50%] top-0 z-[-10] h-32 w-1/3 translate-x-[-50%] rounded-full bg-gradient-to-t  from-indigo-800 to-emerald-950 blur-[10rem] "></div>
      </div>

      {/* footer */}
      <footer className="mt-10 flex w-full flex-wrap  justify-between gap-10 border-t bg-black px-10 py-10">
        <div className="h-full place-self-center text-xl font-bold">
          Authopi
        </div>
        <ul>
          <h4 className="mb-4 block font-semibold opacity-90">
            Social Handles
          </h4>
          <li className="text-zinc-400"> linkdin</li>
          <li className="text-zinc-400">Twitter</li>
        </ul>
        <ul>
          <span className="mb-4 block font-semibold opacity-90">Resources</span>
          <li className="text-zinc-400"> linkdin</li>
          <li className="text-zinc-400">Twitter</li>
        </ul>
        <ul>
          <span className="mb-4 block font-semibold opacity-90">
            Contact Us
          </span>
          <li className="text-zinc-400"> linkdin</li>
          <li className="text-zinc-400">Twitter</li>
        </ul>
      </footer>
    </main>
  );
}

function SamplePricingComponent() {
  return (
    <>
      <div className="relative max-w-sm rounded-xl border border-slate-800 bg-slate-950 bg-opacity-40 px-10 py-8">
        <h3 className="text-xl font-bold">Custom Solution</h3>
        <span className="mb-3 mt-1 block text-3xl font-bold">Custom</span>
        <span className="block font-semibold text-gray-300">
          For teams with more security, support, and performance needs.
        </span>

        <ul className="mt-4 space-y-4 ">
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
        </ul>

        {/* footer */}
        <div>
          <button className="mt-4 w-full rounded-xl bg-indigo-800 px-4 py-2 text-center hover:bg-indigo-700 active:bg-indigo-600">
            Get it know
          </button>
        </div>
      </div>
    </>
  );
}

function FeaturesSection() {
  return (
    <>
      <section className="grid  grid-cols-4 gap-4 sm:p-4">
        <div className="flex flex-col rounded-2xl border-2 border-slate-900 p-4 sm:col-span-1">
          <div className="mb-4 flex-1">
            <Image src={chartImage} alt="growth chart" />
          </div>
          <div>
            <h2 className="text-md text-right text-slate-300">
              Track Community Growth
            </h2>
            <h2 className="text-right text-xl font-bold text-indigo-400">
              Custom CRM
            </h2>
          </div>
        </div>
        <div className="col-span-3 flex rounded-xl border-2 border-slate-900 bg-slate-950 p-4 ">
          <span className="block text-6xl font-bold">
            <span className="text-green-400">Grow</span>
            <br />
            <span className="text-slate-200"> Your Server </span>
          </span>
        </div>
        <div className="col-span-3 break-words rounded-xl border-2 border-slate-900 bg-slate-950 p-4 ">
          <div className="text-5xl font-bold md:text-6xl">
            <span className="text-primary">Authentication</span> <br /> Service
          </div>
        </div>
        <div className="col-span-1 flex justify-center rounded-lg border-2 border-slate-900 p-4">
          <Fingerprint className="h-auto w-auto" />
        </div>
        <div className="col-span-4 grid rounded-xl border-2 border-slate-900 bg-gradient-to-b from-indigo-950  via-slate-950 p-4  sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-3xl font-semibold">
              Connect to any source
            </h2>
            <h3 className="text-xl text-slate-300">
              Use data from varity of source and allow only them to access your
              community using our authentication service
            </h3>
          </div>
          <div className="sm: mt-4 flex place-items-center justify-center gap-4">
            <Image className="h-10 w-10" alt="icon" src={googleSheetIcon} />
            <Image className="h-10 w-10" alt="icon" src={PlanetDbIcon} />
            <Image className="h-10 w-10" alt="icon" src={tagmangoIcon} />
            <Image className="h-10 w-10" alt="icon" src={discordIcon} />
          </div>
        </div>
        <div className="col-span-4 rounded-xl border-2 border-slate-900 p-4 text-4xl font-bold sm:text-6xl">
          Elevate Your Discord Community with variety of
          <span className="text-indigo-500"> Discord Bot</span>
        </div>
        <div className="via-salte-950 col-span-1 grid place-items-center rounded-xl  border-2 border-orange-900 bg-gradient-to-t from-slate-950 via-slate-950 to-orange-950 py-4">
          <h2>Auto Record</h2>
          <Mic className="my-4 h-12 w-12" />
          <h1 className="mt-2 px-2 text-center text-xs font-bold">
            Record Your Sesseions Export to any formate
          </h1>
        </div>
        <div className="via-salte-950 col-span-1 grid place-items-center rounded-xl  border-2 border-amber-900 bg-gradient-to-tr from-slate-950 via-slate-950 to-amber-950 py-4">
          <h2>Auto Scaling VC</h2>
          <Maximize2 className="h-7 w-7" />
          <h1 className="mt-2 px-2 text-center text-xs font-bold">
            VC channel automaticaly added and removed as per need
          </h1>
        </div>
        <div className="via-salte-950 col-span-2 grid place-items-center rounded-xl  border-2 border-indigo-900 bg-gradient-to-t from-slate-950 via-slate-950 to-indigo-950 py-4">
          <h2>And Much More</h2>
        </div>
      </section>
    </>
  );
}
