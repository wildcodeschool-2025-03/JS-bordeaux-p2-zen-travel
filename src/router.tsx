import { createBrowserRouter } from "react-router";
import Home from "../src/pages/Home/Home";
import App from "./App";
import InteractiveMap from "./pages/InteractiveMap/InteractiveMap";
import ModalChecklist from "./pages/ModalChecklist/ModalChecklist";
import ModalInfo from "./pages/ModalInfo/ModalInfo";

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
				children: [
					{
						path: "modal-info",
						element: <ModalInfo />,
						children: [
							{
								path: "modal-checklist",
								element: <ModalChecklist />,
							},
						],
					},
				],
			},
		],
	},
]);

export default router;
