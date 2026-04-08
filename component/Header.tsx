"use client";

import { Feather, Menu, Search, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const navLinks = [
	{ label: "Coat", href: "/shop/coat" },
	{ label: "Dhaka Meter Cloth", href: "/shop/dhaka-meter-cloth" },
	{ label: "Dhaka Saree", href: "/shop/dhaka-saree" },
	{ label: "Kurtha", href: "/shop/kurtha" },
	{ label: "Lungi & Faria", href: "/shop/lungi-faria" },
	{ label: "Sarees", href: "/shop/sarees" },
	{ label: "Sawl", href: "/shop/shawls-wraps" },
];

export function Header() {
	const quickLinks = useMemo(() => navLinks, []);

	return (
		<header className="w-full border-b border-gray-200 bg-white">
			<div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
				<Link href="/home" className="flex items-center gap-3">
					<span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white">
						<Feather className="h-6 w-6" strokeWidth={2.3} />
					</span>
					<div className="flex flex-col leading-tight">
						<span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
							BunchHat
						</span>
						<span className="text-2xl font-black tracking-tight text-gray-900">
							Collection
						</span>
					</div>
				</Link>

				<Link
					href="/shop/sarees"
					className="flex items-center gap-3 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 ring-1 ring-amber-200 transition hover:bg-amber-900 hover:text-amber-50"
				>
					<Menu className="h-4.5 w-4.5" />
					<span>Shop by Craft</span>
				</Link>

				<div className="relative flex-1">
					<input
						type="text"
						placeholder="Search handloom, designers, regions"
						className="h-11 w-full rounded-full bg-gray-100 px-5 pr-12 text-[15px] text-gray-800 ring-1 ring-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
					/>
					<Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
				</div>

				<Link
					href="https://wa.me/919876543210"
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-2 rounded-full bg-green-900 px-4 py-2 text-sm font-semibold text-amber-50 shadow-sm transition hover:bg-amber-800"
				>
					<MessageCircle className="h-4 w-4" />
					Chat on WhatsApp
				</Link>
			</div>

			<div className="mx-auto flex max-w-6xl items-center gap-6 px-4 pb-3 text-sm font-semibold text-gray-800">
				<div className="flex flex-1 items-center gap-5">
					{quickLinks.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="transition hover:text-amber-900"
						>
							{item.label}
						</Link>
					))}
				</div>

				<div className="flex items-center gap-5">
					<Link href="/about" className="transition hover:text-amber-900">
						About
					</Link>
					<Link href="/contact" className="transition hover:text-amber-900">
						Contact
					</Link>
				</div>
			</div>
		</header>
	);
}
