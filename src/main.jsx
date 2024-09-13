import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router";
import { AuthProvider } from "./contexts/auth.context";
import { MoviesProvider } from "./contexts/movies.context";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanstackQueryProvider } from "./tenstack-query/client";

createRoot(document.getElementById("root")).render(
	<TanstackQueryProvider>
		<AuthProvider>
			<MoviesProvider>
				<Router />
			</MoviesProvider>
		</AuthProvider>
	</TanstackQueryProvider>
);
