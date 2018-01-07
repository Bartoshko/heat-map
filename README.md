# Hexagon-Heatmap

HeatMap is written in EcmaScript6 and serves as a bridge to display hexagon heatmap based on coordinates that are given.
It renders hexagonal heat points csv map and appends it to div of given id.

## Dependencies

Heat map is build on the top of [d3.js](https://github.com/d3);

## Usage and Installation

### Implementing as a script tag:

Download file from this repo: ```source\hexagon-heatmap.js```, and add it to Your page:
Heatmap.js uses d3.js, so first add this on the:
```
<script type="text/javascript" src="http://d3js.org/d3.v3.js"></script>
<script type="text/javascript" src="http://d3js.org/d3.hexbin.v0.min.js"></script>
```
next add heatmap.js to your script tag after above script tags:
```
<script type="text/javascript" src="heatmap.js"></script>
```

### NPM installation and usage:

Open terminal and execute:

```
npm install --save hexagon-heatmap
```

### Usage:

#### Required:

To use in project:

```
const Heatmap = require('hexagon-heatmap');

const heatmap = Heatmap(width, height, hexSize, margin, heatColor);
```

width - Width of your csv tag, integer.

height - Height of your csv tag, integer.

hexSize - radius of the circle described on the hexagon that will be mapped to the heatmap, integer in pixels.

margin - object containing information about margin of heatmap script:
```
{left: integer, right: integer, top: integer, bottom: integer}
```

If you want Heatmap to be mapped with hex grid beginning at {x: 0, y: 0} than left and top margin should be the same as hexSize value ``` margin.left should equal hexSize, margin.top should equal hexSize```

To create and append Heatmap hexagonal group on html page write:
```
heatmap.create(id);
```

id - Id of the html parent node that you want to append Heatmap.

To feed with data containing coordinates write:
```
heatmap.feedWithCoordinates(data);
```

data - Array of coordinates or single coordinates in format of:
```
	{x: integer, y: integer}
```
Where x and y are coordinates of the heat to be mapped.
For the purpose of performance if ```array.length > 20``` than only first 20 coordinates will be mapped.
This is because CSV operation are CPU expensive.

#### Additional settings

Toggle mouse events. When mouse is over the heatmap than hexagon corresponding to the mouse position will change heat to the given maximum, use in purpose of testing:
```
heat.toggleMouseEvents = true or false;
```
true - mouse events active
false - mouse events inactive

To set up heating time - when the corresponding to the coordinates hexagon will be triggered, than heat will increase to the maximum in time of given integer in milliseconds.
```
heatmap.heatingUpTime = integer;
```

To set cooling down time - when the corresponding to the coordinates hexagon will be triggered, than cooling down will take given integer in milliseconds
```
heatmap.coolingDownTime = integer;
```

### Additional Information

This is version: 1.0.0 beta, please use for Your own responsibility.

This is weekend fun project so do not expect to much from it, maybe I will find time to develop the project to be more usable.

Use and change as You wish.

I am always happy to get a feedback or suggestions. [e-mail](mailto:lenart.consulting@gmail.com)

As always thx to My Flower.
