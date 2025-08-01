/**
 * Theme: Hyper - Responsive Bootstrap 5 Admin Dashboard
 * Author: Coderthemes
 * Module/App: Project detail chart 
 */

! function ($) {
    "use strict";

    var ChartJs = function () {
        this.$body = $("body"),
            this.charts = []
    };

    ChartJs.prototype.respChart = function (selector, type, data, options) {
        var draw = Chart.controllers.line.prototype.draw;
        Chart.controllers.line.prototype.draw = function () {
            draw.apply(this, arguments);
            var ctx = this.chart.ctx;
            var _stroke = ctx.stroke;
            ctx.stroke = function () {
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.01)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 5;
                _stroke.apply(this, arguments);
                ctx.restore();
            }
        };

        //default config
        Chart.defaults.color = '#8fa2b3';
        Chart.defaults.scale.grid.color = "#8391a2";

        // get selector by context
        var ctx = selector.get(0).getContext("2d");
        // pointing parent container to make chart js inherit its width
        var container = $(selector).parent();

        // this function produce the responsive Chart JS
        function generateChart() {
            // make chart width fit with its container
            var ww = selector.attr('width', $(container).width());
            var chart;
            switch (type) {
                case 'Line':
                    chart = new Chart(ctx, { type: 'line', data: data, options: options });
                    break;
                case 'Doughnut':
                    chart = new Chart(ctx, { type: 'doughnut', data: data, options: options });
                    break;
                case 'Pie':
                    chart = new Chart(ctx, { type: 'pie', data: data, options: options });
                    break;
                case 'Bar':
                    chart = new Chart(ctx, { type: 'bar', data: data, options: options });
                    break;
                case 'Radar':
                    chart = new Chart(ctx, { type: 'radar', data: data, options: options });
                    break;
                case 'PolarArea':
                    chart = new Chart(ctx, { data: data, type: 'polarArea', options: options });
                    break;
            }
            return chart;
        };
        // run function - render chart at first load
        return generateChart();
    },
        // init various charts and returns
        ChartJs.prototype.initCharts = function () {
            var charts = [];
            if ($('#line-chart-example').length > 0) {
                var lineChart = {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [{
                        label: "Completed Tasks",
                        backgroundColor: 'rgba(10, 207, 151, 0.3)',
                        borderColor: '#0acf97',
                        fill: true,

                        data: [32, 42, 42, 62, 52, 75, 62]
                    }, {
                        label: "Plan Tasks",
                        fill: true,
                        backgroundColor: 'transparent',
                        borderColor: "#727cf5",
                        borderDash: [5, 5],
                        data: [42, 58, 66, 93, 82, 105, 92]
                    }]
                };

                var lineOpts = {
                    maintainAspectRatio: false,

                    plugins: {
                        filler: {
                            propagate: false
                        },
                        legend: {
                            display: false
                        },
                        tooltips: {
                            intersect: false
                        },
                        hover: {
                            intersect: true
                        },
                    },
                    tension: 0.3,
                    scales: {
                        x: {
                            grid: {
                                color: "rgba(0,0,0,0.05)"
                            },
                            border: {
                                display: false,             // Hides Y axis line (left)
                                dash: [5, 5]
                            }
                        },
                        y: {
                            ticks: {
                                stepSize: 20
                            },
                            display: true,
                            borderDash: [5, 5],
                            grid: {
                                color: "rgba(0,0,0,0)",
                                drawBorder: false,          // Hides Y axis border line
                                fontColor: '#fff'
                            },
                            border: {
                                display: false,             // Hides Y axis line (left)
                                dash: [5, 5]
                            }
                        }
                    }
                };
                charts.push(this.respChart($("#line-chart-example"), 'Line', lineChart, lineOpts));
            }

            
            return charts;
        },
        //initializing various components and plugins
        ChartJs.prototype.init = function () {
            var $this = this;
            // font
            Chart.defaults.font.family = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

            // init charts
            $this.charts = this.initCharts();

            // enable resizing matter
            $(window).on('resize', function (e) {
                $.each($this.charts, function (index, chart) {
                    try {
                        chart.destroy();
                    }
                    catch (err) {
                    }
                });
                $this.charts = $this.initCharts();
            });
        },

        //init flotchart
        $.ChartJs = new ChartJs, $.ChartJs.Constructor = ChartJs
}(window.jQuery),

    //initializing ChartJs
    function ($) {
        "use strict";
        $.ChartJs.init()
    }(window.jQuery);
    