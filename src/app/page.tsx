"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggler } from "./components/ThemeToggler";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ThemeToggler />

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="dark:text-slate-300 text-black">
                  Turn Your Vehicle Into A{" "}
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  Revenue Stream
                </span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
                AdMobility connects vehicle owners with advertisers, allowing
                you to earn money by displaying ads on your vehicle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="/learn-more"
                  className="inline-flex items-center justify-center px-6 py-3 border border-foreground/20 text-base font-medium rounded-md bg-background hover:bg-foreground/5 transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20 dark:from-blue-500/10 dark:to-teal-500/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CarWithAdSvg />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 h-24 w-24 bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AdMobility Works
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A simple process to start earning money with your vehicle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Your Profile",
                description:
                  "Sign up and enter your vehicle details including make, model, year, and average mileage.",
                icon: <ProfileSvg />,
                delay: 0,
              },
              {
                title: "Receive Ad Offers",
                description:
                  "Get offers from advertisers looking to place ads on vehicles like yours.",
                icon: <OfferSvg />,
                delay: 0.2,
              },
              {
                title: "Earn Money",
                description:
                  "Accept offers, display ads on your vehicle, and earn money while you drive.",
                icon: <EarnMoneySvg />,
                delay: 0.4,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="flex flex-col items-center p-6 bg-primary dark:bg-foreground/[0.03] rounded-xl hover:shadow-xl shadow-md transition-all duration-300"
              >
                <div className="h-16 w-16 mb-4 text-blue-500 dark:text-blue-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-foreground/[0.02] dark:bg-foreground/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              AdMobility provides a seamless experience for both vehicle owners
              and advertisers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <h3 className="text-2xl font-bold">For Vehicle Owners</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Easy Profile Management",
                    description:
                      "Create and manage your profile with vehicle details and availability status.",
                  },
                  {
                    title: "Flexible Offer System",
                    description:
                      "Accept or reject offers based on your preferences and requirements.",
                  },
                  {
                    title: "Simple Photo Verification",
                    description:
                      "Upload daily photos of your vehicle to verify ad placement and get paid.",
                  },
                  {
                    title: "Mileage Tracking",
                    description:
                      "Track your daily and monthly mileage to meet advertiser requirements.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{feature.title}</h4>
                      <p className="text-foreground/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <h3 className="text-2xl font-bold">For Advertisers</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Targeted Ad Placement",
                    description:
                      "Find and select vehicles based on location, vehicle type, and mileage.",
                  },
                  {
                    title: "Campaign Management",
                    description:
                      "Create and manage ad campaigns with customizable terms and conditions.",
                  },
                  {
                    title: "Verification System",
                    description:
                      "Verify ad placement through daily photo uploads from vehicle owners.",
                  },
                  {
                    title: "Secure Payment Processing",
                    description:
                      "Make secure upfront payments that are only released after verification.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 h-6 w-6 text-teal-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{feature.title}</h4>
                      <p className="text-foreground/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-90"></div>
            <div className="relative py-12 px-6 md:py-16 md:px-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Join AdMobility today and turn your daily commute into a revenue
                stream.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                >
                  Sign Up Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground/[0.03] dark:bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AdMobility</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Vehicle Owners</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/owner-signup"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/owner-faq"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/owner-resources"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Advertisers</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/advertiser-signup"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/advertiser-faq"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/support"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-foreground/10">
            <p className="text-center text-foreground/60 text-sm">
              © {new Date().getFullYear()} AdMobility. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// SVG Components
const CarWithAdSvg = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-foreground"
  >
    <g className="animate-float">
      <path
        d="M600 300H200C188.954 300 180 308.954 180 320V380C180 391.046 188.954 400 200 400H600C611.046 400 620 391.046 620 380V320C620 308.954 611.046 300 600 300Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M580 320H220C215.582 320 212 323.582 212 328V372C212 376.418 215.582 380 220 380H580C584.418 380 588 376.418 588 372V328C588 323.582 584.418 320 580 320Z"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M240 340H560"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <path
        d="M240 360H560"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <circle
        cx="220"
        cy="400"
        r="40"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="220" cy="400" r="20" fill="currentColor" fillOpacity="0.4" />
      <circle
        cx="580"
        cy="400"
        r="40"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="580" cy="400" r="20" fill="currentColor" fillOpacity="0.4" />
      <path
        d="M160 300C160 300 180 250 240 230C300 210 500 210 560 230C620 250 640 300 640 300"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M200 300V260C200 255.582 203.582 252 208 252H592C596.418 252 600 255.582 600 260V300"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M240 252V220C240 215.582 243.582 212 248 212H552C556.418 212 560 215.582 560 220V252"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="300"
        y="320"
        width="200"
        height="40"
        rx="4"
        fill="#3B82F6"
        fillOpacity="0.7"
      />
      <text
        x="400"
        y="345"
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
        fontSize="16"
      >
        ADMOBILITY
      </text>
    </g>
  </svg>
);

const ProfileSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      clipRule="evenodd"
    />
  </svg>
);

const OfferSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
  >
    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
      clipRule="evenodd"
    />
  </svg>
);

const EarnMoneySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
  >
    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    <path
      fillRule="evenodd"
      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
      clipRule="evenodd"
    />
    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
  </svg>
);
