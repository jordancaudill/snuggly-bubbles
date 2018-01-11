var app = new Vue({
    el: '#app',
    data: {
        colors: [
            '#fcff07',
            '#f2baf9',
            '#4ef25d',
            '#1899f4',
            '#ff9c00',
            '#e93a43'
        ]
    },
    methods: {
        getRandomColor: function () {
            return this.colors[Math.floor(Math.random() * this.colors.length)];
        }
    },
    created() {
        var sections = $('.section');
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
