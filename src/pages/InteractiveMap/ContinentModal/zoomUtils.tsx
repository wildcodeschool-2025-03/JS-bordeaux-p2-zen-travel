export const manualZoomPresets: Record<
	string,
	{ scale: number; x: number; y: number }
> = {
	Europe: { scale: 1.5, x: 0.55, y: 0.4 },
	Asia: { scale: 1.5, x: 0.75, y: 0.4 },
	Africa: { scale: 1.5, x: 0.5, y: 0.7 },
	NorthAmerica: { scale: 1.5, x: 0.3, y: 0.4 },
	SouthAmerica: { scale: 1.5, x: 0.4, y: 0.8 },
	Oceania: { scale: 1.5, x: 0.85, y: 0.8 },
};

export const zoomOnContinent = (continent: string) => {
	if (window.innerWidth > 768) return;

	const preset = manualZoomPresets[continent];
	const mapInstance = window.$(".jvectormap-container").data("mapObject");

	if (preset && typeof mapInstance?.setFocus === "function") {
		mapInstance.setFocus({
			scale: preset.scale,
			x: preset.x,
			y: preset.y,
			animate: true,
		});
	}
};

export const handleResetZoom = () => {
	const mapInstance = window.$(".jvectormap-container").data("mapObject");

	if (mapInstance && typeof mapInstance.setFocus === "function") {
		mapInstance.setFocus({
			scale: 1,
			x: 0.5,
			y: 0.5,
			animate: true,
		});
	}
};
