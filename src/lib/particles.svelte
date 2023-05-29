<script lang="ts">
	import Particles from "svelte-particles";
	import type { ISourceOptions, Engine } from "tsparticles-engine"
    import { loadSlim } from "tsparticles-slim";

	let colorParticle = "#eddeff"
	let colorLink     = "#aff5b4"

	const particleConfig: ISourceOptions = {
		"autoPlay": true,
		"fullScreen": {
			"enable": true,
			"zIndex": 0,
		},
		"detectRetina": true,
		"duration": 0,
		"fpsLimit": 120,
		"interactivity": {
			"detectsOn": "window",
			"events": {
				"onHover": {
					"enable": true,
					"parallax": {
						"enable": true,
						"force": 50,
						"smooth": 10
					}
				},
				"resize": {
					"delay": 0,
					"enable": true
				}
			},
			// - make things slower in general
			// - color the things correctly
			// - no fill
			// - less links
			// - slower & less growth
			// - irregular triangle sizes
		},
		"particles": {
			color: {
				value: "#fff",
			},
			"move": {
				"center": {
					"x": 50,
					"y": 50,
					"mode": "percent",
					"radius": 0
				},
				"enable": true,
				"random": false,
				"size": false,
				"speed": 1,
				"straight": false,
				"vibrate": false,
				"warp": false
			},
			"number": {
				"density": {
					"enable": true,
					"width": 1920,
					"height": 1080
				},
				"limit": 0,
				"value": 100
			},
			"opacity": {
				"random": {
					"enable": true,
					"minimumValue": 0.1
				},
				"value": {
					"min": 0.3,
					"max": 0.5
				},
			},
			"reduceDuplicates": false,
			"shape": {
				options: {
					polygon: {
						nb_sides: 3,
					},
				},
				"type": "polygon"
			},
			"size": {
				"random": true,
				"value": {
					"min": 5,
					"max": 10
				},
				"animation": {
					"count": 0,
					"enable": true,
					"speed": 10,
					"decay": 0,
					"sync": false,
					"destroy": "none",
					"startValue": "random",
					"minimumValue": 5,
				}
			},
			stroke: {
				width: 1,
				color: colorParticle,
				opacity: 0.4,
			},
			"zIndex": {
				"value": 0,
				"opacityRate": 1,
				"sizeRate": 1,
				"velocityRate": 1
			},
			"life": {
				"count": 0,
				"delay": {
					"value": 0,
					"sync": false
				},
				"duration": {
					"value": 0,
					"sync": false
				}
			},
			"rotate": {
				"value": 1,
				"direction": "random",
				"path": false,
				"animation": {
					enable: true,
					speed: 2,
				},
			},
			"destroy": {
				"split": {
					"count": 1,
					"factor": {
						"value": 3
					},
					"rate": {
						"value": {
							"min": 4,
							"max": 9
						}
					},
					"sizeOffset": true
				}
			},
			"links": {
				"blink": false,
				"color": {
					"value": colorLink,
				},
				"consent": false,
				"distance": 150,
				"enable": true,
				"frequency": 1,
				"opacity": 0.4,
				"width": 1,
				"warp": false
			},
		},
		"pauseOnBlur": true,
		"pauseOnOutsideViewport": true,
		"smooth": false,
		"zLayers": 100
	}

	let particlesInit = async (engine: Engine) => {
        await loadSlim(engine);
    };
</script>

<Particles
	options={particleConfig}
	{particlesInit}
	id="huge"
/>