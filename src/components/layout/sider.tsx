
"use client";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import {LayoutDashboard,FileUp, Users, UploadCloud, LogOut, Home } from "lucide-react";
import { cn } from "@nextui-org/react";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface LinkSectionProps {
	title: string;
	render: () => ReactNode;
}

interface LinkItemProps {
	title: string;
	icon?: ReactNode;
	href?: string;
	onClick?: () => void;
}

const LinkSection = ({ title, render }: LinkSectionProps) => {
	return (
		<div className="px-4 py-5">
			<p className="font-medium text-sm text-gray-400">{title}</p>
			<div className="flex space-y-2 flex-col mt-2">{render()}</div>
		</div>
	);
};

const LinkItem = ({ title, icon, href, onClick }: LinkItemProps) => {
	const pathname = usePathname();

	const selected = useMemo(() => {
		if (href && pathname !== "/") {
			return pathname === `/app/${href}` ? true : false;
		}

		return false;
	}, [href, pathname]);

	
	return (
		<Link href={href ? `/app/${href}` : "/"}>
			<div className={`flex flex-col mt-2 ${selected ? 'bg-[#B5D0FF] rounded-lg h-10 p-2' : ''}`}>
				<div className={cn("text-sm flex space-x-3 items-center", { "text-primary-500 font-bold": selected })}>
					<div className="mr-1">{icon}</div>
					<span className="text-[14px]">{title}</span>
				</div>
			</div>
		</Link>
	);
};


const Sider = () => {
	
	return (
		<div className="hidden md:flex flex-col w-[14rem] border-r border-gray-200 h-screen overflow-y-auto">
			<div className="flex mt-6 ml-2">
			<h1 className="text-2xl font-bold text-center lg:text-3xl 2xl:text-4xl">
                <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
                  Property
                </span>

                <span className="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
                  Pulse
                </span>
              </h1>
			</div>
            <div className=" mt-4 flex flex-col space-y-8 p-6">
				<LinkItem title="Dashboard" icon={<LayoutDashboard  className="text-primary-500" size={18} />} href="dashboard" />
			
				<LinkItem title="My Tokens" icon={<FileUp className="text-primary-500" size={18} />} href="" />
				<LinkItem title="Properties" icon={<Home className="text-primary-500" size={18} />} href="/properties" />
			</div>
		</div>
	);
};



export default Sider;
