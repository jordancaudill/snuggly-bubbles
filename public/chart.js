var component = Vue.component('chart',
	{
		methods: {
			getRandomColor: function () {
				var colors = [
					'rgb(252, 255, 7)',
					'rgb(242, 186, 249)',
					'rgb(78, 242, 93)',
					'rgb(24, 153, 244)',
					'rgb(255, 156, 0)',
					'rgb(233, 58, 67)'
				];
				var color = colors[Math.floor(Math.random() * colors.length)];
				while (color === $('.section.skills')[0].style['background-color']) {
					color = colors[Math.floor(Math.random() * colors.length)];
				}
				return color;
			},
			createChart: function () {
				var component = this;
				let data = [
					{ name: 'Angular', value: 5, icon: 'Angular' },
					{ name: 'NodeJS', value: 5, icon: 'NodeJS' },
					{ name: 'MongoDB', value: 3, icon: 'MongoDB' },
					{ name: 'Javascript', value: 4, icon: 'Javascript' },
					{ name: 'SASS', value: 1, icon: 'SASS' },
					{ name: 'LESS', value: 1, icon: 'LESS' },
					{ name: 'Express', value: 4, icon: 'Express' },
					{ name: 'AJAX', value: 1, icon: 'AJAX' },
					{ name: 'HTML5', value: 3, icon: 'HTML5' },
					{ name: 'Vue.js', value: 3, icon: 'Vue.js' },
					{ name: 'MySQL', value: 2, icon: 'MySQL' },
					{ name: 'CSS', value: 4, icon: 'CSS' },
					{ name: 'Linux', value: 1, icon: 'Linux' },
					{ name: 'Webpack', value: 3, icon: 'Webpack' },
					{ name: 'Jasmine', value: 3, icon: 'Jasmine' },
					{ name: 'Mocha', value: 3, icon: 'Mocha' },
					{ name: 'Karma', value: 3, icon: 'Karma' },
					{ name: 'jQuery', value: 2, icon: 'jQuery' },
					{ name: 'Photoshop', value: 1, icon: 'Photoshop' },
					{ name: 'Adobe XD', value: 1, icon: 'Adobe XD' },

				];
				let svg = d3.select('#chart');
				let width = svg.property('clientWidth'); // get width in pixels
				let height = +svg.attr('height');
				let centerX = width * 0.5;
				let centerY = height * 0.5;
				let strength = 0.05;
				let focusedNode;

				let format = d3.format(',d');


				// use pack to calculate radius of the circle
				let pack = d3.pack()
					.size([width, height])
					.padding(1.5);

				let forceCollide = d3.forceCollide(d => d.r + 1);

				// use the force
				let simulation = d3.forceSimulation()
					// .force('link', d3.forceLink().id(d => d.id))
					.force('charge', d3.forceManyBody())
					.force('collide', forceCollide)
					// .force('center', d3.forceCenter(centerX, centerY))
					.force('x', d3.forceX(centerX).strength(strength))
					.force('y', d3.forceY(centerY).strength(strength));

				let root = d3.hierarchy({ children: data })
					.sum(d => d.value);


				// we use pack() to automatically calculate radius conveniently only
				// and get only the leaves
				let nodes = pack(root).leaves().map(node => {
					const data = node.data;
					return {
						x: centerX + (node.x - centerX) * 3, // magnify start position to have transition to center movement
						y: centerY + (node.y - centerY) * 3,
						r: 0, // for tweening
						radius: node.r, //original radius
						name: data.name,
						value: data.value,
						icon: data.icon
					};
				});
				simulation.nodes(nodes).on('tick', ticked);

				let node = svg.selectAll('.node')
					.data(nodes)
					.enter().append('g')
					.attr('class', 'node')
					.call(d3.drag()
						.on('start', (d) => {
							if (!d3.event.active) { simulation.alphaTarget(0.2).restart(); }
							d.fx = d.x;
							d.fy = d.y;
						})
						.on('drag', (d) => {
							d.fx = d3.event.x;
							d.fy = d3.event.y;
						})
						.on('end', (d) => {
							if (!d3.event.active) { simulation.alphaTarget(0); }
							d.fx = null;
							d.fy = null;
						}));
				node.append('circle')
					.attr('id', d => d.id)
					.attr('r', 0)
					.style('fill', d => component.getRandomColor())
					.transition().duration(2000).ease(d3.easeElasticOut)
					.tween('circleIn', (d) => {
						let i = d3.interpolateNumber(0, d.radius);
						return (t) => {
							d.r = i(t);
							simulation.force('collide', forceCollide);
						};
					});

				node.append('clipPath')
					.attr('id', d => `clip-${d.id}`)
					.append('use')
					.attr('xlink:href', d => `#${d.id}`);

				// display text as circle icon
				node.append('text')
					.selectAll('tspan')
					.data((d, i) => {
						return d.icon.split(';')
					})
					.enter()
					.append('tspan')
					.text(data => {
						return data;
					});
				node.select('tspan').attr('x', (d, i, p) => {
					return nodes[i].name.length * (nodes[i].radius / 3) * -1 / 4;
				});
				node.style('font-size', (d, i) => {
					return nodes[i].radius / 3;
				});
				node.style('text-align', 'center');
				node.style('cursor', 'pointer');

				function ticked() {
					node
						.attr('transform', d => `translate(${d.x},${d.y})`)
						.select('circle')
						.attr('r', d => d.r);
				}

			}
		},
		template: '<svg id="chart" width="100%" height="' + window.innerHeight + '"></svg>'
	}
);


