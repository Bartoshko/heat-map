const data = [
	{x: 10, y: 10},
	{x: 20, y: 20},
	{x: 30, y: 30},
	{x: 40, y: 40},
	{x: 50, y: 50},
	{x: 60, y: 60}
];

const heatmap = new Heatmap(120, 120, 8, {left: 10, right: 0, top: 10, bottom: 0}, '#ff0000', '#ffffff');
heatmap.toggleMouseEvents = false;
heatmap.create('chart');
heatmap.feedWithCoordinates = data;