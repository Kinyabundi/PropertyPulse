// import Header from "@/components/layouts/Header";
import Sider from "@/components/layout/sider";
import { FC, ReactNode } from "react";

interface AdminLayoutProps {
	children: ReactNode | ReactNode[];
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col flex-1 transition-all text-white w-full min-h-screen bg-white dark:bg-gray-900">
			{/* <Header /> */}
			<div className="flex flex-1 flex-col md:flex-row">
				<Sider />
				<div className="flex flex-1 flex-col overflow-y-auto h-screen">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
