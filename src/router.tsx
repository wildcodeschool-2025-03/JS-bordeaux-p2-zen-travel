import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home/Home";
import InteractiveMap from "./pages/InteractiveMap/InteractiveMap";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "interactive-map",
				element: <InteractiveMap />,
			},
		],
	},
]);

export default router;
