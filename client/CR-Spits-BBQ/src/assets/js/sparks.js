(function () {
    var COLORS, Spark, NUM_Spark, PI_2, canvas, Spark, context, drawCircle, i, range, resizeWindow, xpos;

    NUM_Spark = 55;

    COLORS = [[255, 66, 0]];

    PI_2 = 2 * Math.PI;

    canvas = document.getElementById("sparks");

    context = canvas.getContext("2d");

    window.w = 0;

    window.h = 0;

    resizeWindow = function () {
        window.w = canvas.width = window.innerWidth;
        return window.h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeWindow, false);

    window.onload = function () {
        return setTimeout(resizeWindow, 0);
    };

    range = function (a, b) {
        return (b - a) * Math.random() + a;
    };

    drawCircle = function (x, y, r, style) {
        context.beginPath();
        context.arc(x * 1.5, y, r, 0, PI_2, false);
        context.fillStyle = style;
        return context.fill();
    };

    xpos = 0.5;

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();

    Spark = (function () {
        function Spark() {
            this.style = COLORS[0];
            this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
            this.r = ~~range(6, 2.5);
            this.r2 = 2 * this.r;
            this.replace();
        }

        Spark.prototype.replace = function () {
            this.opacity = 0;
            this.dop = 0.005 * range(1, 4);
            this.x = range(-this.r2, w - this.r2);
            this.y = range(-20, h - this.r2);
            this.xmax = w - this.r;
            this.ymax = h - this.r;
            var random = Math.random() * 6;
            this.vx = range(random, 2) + 8 * xpos - 6;
            return this.vy = 2 * this.r + range(-random, 5);
        };

        Spark.prototype.draw = function () {
            var _ref;
            this.x += this.vx;
            this.y += this.vy;
            this.opacity += this.dop;
            if (this.opacity > 1) {
                this.opacity = 1;
                this.dop *= -1;
            }
            if (this.opacity < 0 || this.y > this.ymax) {
                this.replace();
            }
            if (!((0 < (_ref = this.x) && _ref < this.xmax))) {
                this.x = (this.x + this.xmax) % this.xmax;
            }
            return drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
        };

        return Spark;

    })();

    Spark = (function () {
        var _i, _results;
        _results = [];
        for (i = _i = 1; 1 <= NUM_Spark ? _i <= NUM_Spark : _i >= NUM_Spark; i = 1 <= NUM_Spark ? ++_i : --_i) {
            _results.push(new Spark);
        }
        return _results;
    })();

    window.step = function () {
        var c, _i, _len, _results;
        requestAnimationFrame(step);
        context.clearRect(0, 0, w, h);
        _results = [];
        for (_i = 0, _len = Spark.length; _i < _len; _i++) {
            c = Spark[_i];
            _results.push(c.draw());
        }
        return _results;
    };

    step();

}).call(this);