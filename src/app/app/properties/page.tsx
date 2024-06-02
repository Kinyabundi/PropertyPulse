
import { Metadata } from "next";
import Properties from "../_components/Properties";

export const metadata: Metadata = {
	title: "Properties",
};

export default function page() {
	return <Properties />;
}
