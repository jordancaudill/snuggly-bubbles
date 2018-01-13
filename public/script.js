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
                    this.steps = json.summary.steps.toLocaleString();
                    this.heartrate = json.summary.restingHeartRate
                });
            fetch('https://api.fitbit.com/1/user/' + this.fitbitUserID + '/sleep/date/' + moment().subtract(4, 'days').format('YYYY-MM-DD') + '.json', this.fitbitRequestOptions)
                .then(response => response.json())
                .then(json => {
                    this.sleep = (json.summary.totalMinutesAsleep / 60).toFixed(1);
                });

        },
    },
    created() {
        var sections = $('.section');
        // this.getActivity();
        for (var i = 0; i < sections.length; i++) {
            var color = this.getRandomColor();
            sections[i].style.backgroundColor = color;
        }
        $(document).ready(function () {
            $('#fullpage').fullpage();
        });
        setTimeout(function () {
            $('h6').addClass('fadeIn');
        }, 7500);
    }
});
