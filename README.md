# Ahi HTML5 game engine

## About

Ahi is a work-in-progress HTML5 canvas game engine. It features an [Entity component system](https://en.wikipedia.org/wiki/Entity_component_system) (ECS) which is somewhat influenced by the ECS found in [Unity](https://unity3d.com/).

**Fair warning: Many features do not exist or are completely broken. :)**

## Using Ahi

The first thing you'll need is to install [Node.js](https://nodejs.org/en/) (and [npm](https://www.npmjs.com/)). Ahi assumes you're familiar with Node.js conventions, [especially the module format](https://nodejs.org/api/modules.html).

Next, install the Ahi build tools (globally) via npm:

	npm install -g ahi-tools

This should add the `ahi` command to your path and will allow you to develop and build using Ahi.

Now you're ready to creating an Ahi-based game. I find that example code is the best way to learn, so your first stop should be the [Ahi Examples repository](https://github.com/geoffb/ahi-examples).

### Required files

Ahi has a few required files which we'll go over. Those files are:

#### npm Config (package.json)

Since Ahi is largely built on Node.js/npm you'll need a `package.json` file which looks something like this:

	{
		"name": "ahigame",
		"version": "0.1.0",
		"private": true
	}

After creating this file you should add the `ahi` package as a dependency:

	npm install ahi --save

#### Manifest (ahi.json)

This is the Ahi manifest (MUST be named `ahi.json`) and contains simple configuration for your game. For now, this file only needs the `name` and `main` keys. The `main` key points to the entry point of your game, usually named `main.js` or `index.js`.

	{
		"name": "My Ahi Game",
		"main": "main.js"
	}

#### Entry (main.js)

This is the entry point to your game where you'll create an instance of the Ahi engine, create entities, etc. Here's a simple example of how to create an entity which is visualized with a shape:

	var Engine = require("ahi/core/Engine");
	var Entity = require("ahi/core/Entity");

	// Create an instance of the Ahi engine, specifiying the size of our canvas
	var game = new Engine(640, 480);

	// Create a simple entity
	var shape = new Entity({
		// The Transform component contains the position of your entity is required for all entities
		transform: {},
		// The ShapeRender component renders a shape at the position from the Transform component
		shapeRender: {
			// points are relative to transform.position
			// points are listed as: [x, y, x, y, ... x, y]
			// These points describe a triangle
			points: [0, -150, 150, 150, -150, 150],
			// fillStyle is the color of our shape
			fillStyle: "orange"
		}
	});

	// Add our newly created shape entity to the engine
	game.addEntity(shape);

	// And finally, start the engine
	game.start();

### Running your Ahi game

Now that our core files are in place all we need to is navigate to the root of your project in a terminal and run:

	ahi

By default, your game is served on port 8080 so just load up http://localhost:8080 in your favorite browser. If everything worked correctly, you should see a large, orange triangle in the middle of a blue screen. Congrats!
