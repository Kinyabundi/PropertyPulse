
import { Metadata } from "next";
import Dashboard from "../_components/Dashboard";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function page() {
	return <Dashboard />;
}
