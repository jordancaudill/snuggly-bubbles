// console.log(window)
var app = new Vue({
	el: '#app',
	data: function () {
		return {
			colors: [
				'rgb(252, 255, 7)',
				'rgb(242, 186, 249)',
				'rgb(78, 242, 93)',
				'rgb(24, 153, 244)',
				'rgb(255, 156, 0)',
				'rgb(233, 58, 67)'
			],
			age: moment('03/13/1995').diff(moment(), 'years') * -1
		}
	},
	methods: {
		getRandomColor: function () {
			return this.colors[Math.floor(Math.random() * this.colors.length)];
		}	},
	created() {
		let vm = this;
		var sections = $('.section');
		var pattern = Trianglify({
			width: window.innerWidth,
			height: window.innerHeight
		});
		// $('#app').style['background'] = "url('" + pnguri + "') no-repeat center center";		
		var pnguri = pattern.png();
		sections[0].style['background'] = "url('" + pnguri + "') no-repeat center center";
		sections[0].style['background-size'] = "cover";
		pattern = Trianglify({
			width: window.innerWidth,
			height: window.innerHeight
		});
		pnguri = pattern.png();
		// sections[4].style['background'] = "url('" + pnguri + "') no-repeat center center";
		// sections[4].style['background-size'] = "cover";
		$(document).ready(function () {
			// pJS.init({
			// 	selector: '.particle-bg',
			// 	color: 'white',
			// 	sizeVariations: 10
			// });

			$('#fullpage').fullpage({
				afterLoad: function (anchorLink, index) {
					$('#fullpage')[0].style.opacity = 1;
					if (index === 3) {
						// scrolled to chart section
						chartComponent.createChart();
					} else {
						$('svg#chart').html('');
					}
				}
			});
		});

		setTimeout(function () {
			$('h6').addClass('fadeIn');
		}, 5500);
	}
});
var chartComponent = app.$refs.chart;
