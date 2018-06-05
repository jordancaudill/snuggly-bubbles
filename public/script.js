var app = new Vue({
	el: '#app',
	data: {
		colors: [
			'rgb(252, 255, 7)',
			'rgb(242, 186, 249)',
			'rgb(78, 242, 93)',
			'rgb(24, 153, 244)',
			'rgb(255, 156, 0)',
			'rgb(233, 58, 67)'
		],
		age: moment('03/13/1995').diff(moment(), 'years') * -1,
		fitbitUserID: '5MMGDK',
		// get token (1 year) here: https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22CL68&scope=activity%20heartrate%20sleep&expires_in=31536000        
		fitbitRequestOptions: {
			headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1TU1HREsiLCJhdWQiOiIyMkNMNjgiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IHJociByc2xlIiwiZXhwIjoxNTQ3MzE1ODM5LCJpYXQiOjE1MTU3Nzk4Mzl9.iLhOl3s2-qZGRHPsKUlSudh5Ks-4nnCP61Zt3AanzZY' }
		},
		steps: '4,023',
		heartrate: 68,
		sleep: 8.2
	},
	methods: {
		getRandomColor: function () {
			return this.colors[Math.floor(Math.random() * this.colors.length)];
		},
		getActivity: function () {
			fetch('https://api.fitbit.com/1/user/' + this.fitbitUserID + '/activities/date/' + moment().format('YYYY-MM-DD') + '.json', this.fitbitRequestOptions)
				.then(response => response.json())
				.then(json => {
					if (json.summary.steps == 0) {
						this.steps = '1,502';
					} else {
						this.steps = json.summary.steps.toLocaleString();
					}
					if (json.summary.restingHeartRate == 0) {
						this.heartrate = 68;
					} else {
						this.heartrate = json.summary.restingHeartRate;
					}
				});
			fetch('https://api.fitbit.com/1/user/' + this.fitbitUserID + '/sleep/date/' + moment().subtract(4, 'days').format('YYYY-MM-DD') + '.json', this.fitbitRequestOptions)
				.then(response => response.json())
				.then(json => {
					if (json.summary.totalMinutesAsleep == 0) {
						this.sleep = 7.8;
					} else {
						this.sleep = (json.summary.totalMinutesAsleep / 60).toFixed(1);
					}
				});

		},
	},
	created() {
		let vm = this;
		this.getActivity();
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
		sections[4].style['background'] = "url('" + pnguri + "') no-repeat center center";
		sections[4].style['background-size'] = "cover";
		$(document).ready(function () {
			Particles.init({
				selector: '.particle-bg',
				color: 'white',
				sizeVariations: 10
			  });
			
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
