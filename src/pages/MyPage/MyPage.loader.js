import { redirect } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

export function useMyPageLoader() {
	const { currentUser } = useAuth();
	if (!currentUser) return redirect("/");

	return null;
}
