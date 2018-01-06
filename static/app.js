const data = [];

const pathGenerator = quantity => {
	for(let i = 0; i < quantity; ++i) {
		const x = Math.floor(Math.random() * 800);
		const y = Math.floor(Math.random() * 800);
		data.push({x: x, y: y});
	}
}

pathGenerator(1000);

const heatmap = new Heatmap(800, 800, 12, {left: 12, right: 0, top: 12, bottom: 0}, '#ff0000', '#ffffff');
heatmap.toggleMouseEvents = false;
heatmap.coolingDownTime = 35000;
heatmap.create('chart');


let index = 0;
const looper = () => {
	setTimeout(() => {
		if (index < data.length) {
			heatmap.feedWithCoordinates(data[index++]);
			looper();
		}
	},100);
}

looper();
