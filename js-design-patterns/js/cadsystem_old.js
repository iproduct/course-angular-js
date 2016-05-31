function init() {
    var canvas = document.getElementById('canvas');
    if (canvas !== null && canvas.getContext){  
        var ctx = canvas.getContext('2d');  
        loadDynamic('js', 'shape_decorators.js', function() { test1(ctx);});
    } else {
        alert("Problem creating canvas 2D drawing context");
    }  
}

function test1(ctx) {
    function Point(vx,vy){
        this["x"] = vx;
        this.y = vy; 
        //return this;
    }
    Point.prototype.toString = function() {
        return "(x: " + this.x + ", y: " + this.y + ")";
    }
    Point.prototype.translate = function(dx, dy) {
        this.x += dx;
        this.y += dy;
        return this;
    }
    function DrawablePoint(vx, vy, vcolor){
        //        this.x = vx;
        //        this.y = vy; 
        Point.apply(this, arguments);
        this.color = vcolor || "#000000";
    }
    DrawablePoint.prototype = new Point();
    DrawablePoint.prototype.constructor = Point;
    DrawablePoint.prototype.toString = function() {
        return "(x: " + this.x + ", y: " + this.y
            + ", color: " + this.color + ")";
    }
    DrawablePoint.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 2, 2);
    }

    // Shape
    function Shape(sx, sy, strokeColor, fillColor, width, height) {
        this.x = sx || 0;
        this.y = sy || 0; 
        this.strokeColor = strokeColor || "#000000";
        this.fillColor = fillColor || "#ff0000";
        this.width = width || 0;
        this.height = height || 0;
        eventuality(this);
    }   
    Shape.prototype.toString = function() {
        return "x: " + this.x + ", y: " + this.y + 
            ", strokeColor: " + this.strokeColor + 
            ", fillColor: " + this.fillColor;
    }
    Shape.prototype.translate = function(dx, dy) {
        this.x += dx;
        this.y += dy;
        if(this.fire){
            this.fire("translate");
        }
        return this;
    }    
    Shape.prototype.draw = function(ctx) {
        console.log("Shape draw() method is abstract");
        return this;
    }
   
    // Circle
    function Circle(cx, cy, r) {
        Shape.apply(this, arguments);
        this.radius = r || 50;
        this.width = this.height = 2 * r;
    }
    Circle.prototype = new Shape();
    Circle.prototype.constructor = Shape;
    Circle.prototype.toString = function() {
        return this.__proto__.__proto__.toString.apply(this,arguments) + ", radius: " + this.radius;
    }
    Circle.prototype.draw = function(ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();  
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill(); 
        ctx.stroke(); 
        return this;
    }
    
    // Polygon
    function Polygon(x, y, points) {
        this.points = points || [];
        this.base = Shape;
        this.base();
        this.x = x || 0;
        this.y = y || 0;
    }
    Polygon.prototype.draw =  function(ctx) {
        var i;
        if(this.points.length > 0) {
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.beginPath();  
            ctx.moveTo(this.points[0].x + this.x, this.points[0].y + this.y);
            for(i=0; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x + this.x, this.points[i].y + this.y);
            }
            ctx.fill(); 
            ctx.stroke(); 
        }
        return this;
    }
    Polygon.prototype.toString = function() {
        return "x: " + this.x + ", y: " + this.y + ", nPoints: " + this.points.length;
    }
    
    // Rectangle
    var Rectangle = function(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    Rectangle.prototype = new Shape();
    Rectangle.prototype.constructor = Shape;
    Rectangle.prototype.area = function(){
        return this.width * this.height;
    }
    Rectangle.prototype.toString = function() {
        return"x: " + this.x + ", y: " + this.y 
            + ", width: " + this.width + ", height: " + this.height;
    }
    Rectangle.prototype.draw = function(ctx){
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y,this.width, this.height);
    }
   
    var r1 = new Rectangle(100,100, 200, 150);
    
    console.log(r1.toString());
    //r1.draw();
    var r1_decorated = new ConcreteShapeDecorator(r1);
    r1_decorated.draw(ctx);

    r1.on("translate" , function(e) {alert('Object translated' + e)});
    //r1.translate(100, 100);
    
//    var rectangle = Object.create(Shape);
//    rectangle.width = 200;
//    rectangle.height = 400;
//    rectangle.area = function(){
//        return this.width * this.height;
//    }
//    rectangle.toString = function() {
//        return"x: " + this.x + ", y: " + this.y 
//            + ", width: " + this.width + ", height: " + this.height;
//    }
//    rectangle.draw = function(){
//        ctx.fillStyle = this.fillColor;
//        ctx.fillRect(this.x, this.y,this.width, this.height);
//    }
        
    
        
//        function(x, y, width, height) {
//        }
//        this.x = x || 0;
//        this.y = y || 0;
//        this.width = width || 100;
//        this.height = height || 50;
//    }
//    .inherits(Shape).
//        method('area', function(){
//            return this.width * this.height;
//        }).method('draw', function(){
//            ctx.fillStyle = this.fillColor;
//            ctx.fillRect(this.x, this.y, 2, 2);
//        });
        
        
    
    
    
    
    
    
    var p1 = new Point(2, 3);
    var p2 = new DrawablePoint(4, 5);
    var p3 = new DrawablePoint(40, 50, "red");
    console.log(p1.translate(10, 10).toString());
    console.log(p2.translate(10, 10).toString());
    
    var c1 = new Circle (0, 0);
    console.log(c1.toString());
    
    var p1 = new Polygon (200, 100, [p1, p2]);
    console.log(p1.toString());
    
//    var r1 = new Rectangle();
//    console.log(r1.area());
    
    
    //    CADSystem = {
    //        numShapes: 0,
    //        shapes: [],
    //        addShape: function(shape) {
    //            this.shapes.push(shape);
    //        },
    //        draw: function() {
    //            for(var i = 0; i < this.shapes.length; i++) {
    //                this.shapes[i].draw();
    //            }
    //        },
    //        getBoundingRectangle: function() {
    //            var that = this;
    //            function min(/* number... */){
    //                var i, 
    //                min = Number.POSITIVE_INFINITY;
    //                for(i = 0; i < arguments.length; i++){
    //                    if(arguments[i] < min){
    //                        min = arguments[i];
    //                    }
    //                }
    //                return min;
    //            }
    //            function minX() {
    //                var x, min = Number.POSITIVE_INFINITY;
    //                for(i = 0; i < this.shapes.length; i++){
    //                    x = this.shapes[i].x;
    //                    if( x < min){
    //                        min = x;
    //                    }
    //                }
    //                return min;
    //            }
    //            return minX.apply(this,[]);
    //        }
    //    }
    
    CADSystem = function(){
        var shapes = [];
        var drawingContext;
        
        /* Private methods */
        function min(/* number... */){
            var i, 
            min = Number.POSITIVE_INFINITY;
            for(i = 0; i < arguments.length; i++){
                if(arguments[i] < min){
                    min = arguments[i];
                }
            }
            return min;
        }
        function minX() {
            var x, min = Number.POSITIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                x = shapes[i].x;
                if( x < min){
                    min = x;
                }
            }
            return min;
        }
        function minY() {
            var y, min = Number.POSITIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                y = shapes[i].y;
                if( y < min){
                    min = y;
                }
            }
            return min;
        }
        function minX() {
            var x, min = Number.POSITIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                x = shapes[i].x;
                if( x < min){
                    min = x;
                }
            }
            return min;
        }
        function maxY() {
            var y, max = Number.NEGATIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                y = shapes[i].y;
                if( y > max){
                    max = y;
                }
            }
            return max;
        }
        function maxX() {
            var y, max = Number.NEGATIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                y = shapes[i].y;
                if( y > max){
                    max = y;
                }
            }
            return max;
        }
        
        /* Public methods */
        function addShape(shape) {
            shapes.push(shape);
            return this;
        };
        function draw() {
            for(var i = 0; i < shapes.length; i++) {
                shapes[i].draw();
            }
            return this;
        };
        function getBRect() {
            return {x: minX(), y: minY(), 
                width: maxX()- minX(), height: maxY()- minY()};
        }
        function setDrawingContext(ctx) {
            drawingContext = ctx;
            return this;
        }
        function drawBRect() {
            var rect;
            if(drawingContext){
                rect = getBRect();
                drawingContext.save();
                drawingContext.fillStyle = "rgba(0,0, 255,0.4)";
                drawingContext.fillRect(rect.x, rect.y, 
                rect.width, rect.height);
                //console.log(rect.x);
                //console.log(rect.y);
                //console.log(rect.width);
                //console.log(rect.height);
            }
            return this;
        }
        function delay(time) {
            var copy = {}, i, selfDelay;
            for(i in this){
                selfDelay = this;
                if(typeof selfDelay[i] == "function") {
                    copy[i] = function() {
                        var args = [], j;
                        for (j=0; j < arguments.length; j++) {
                            args.push(arguments[j]);
                            setTimeout(function(){
                                           selfDelay[i].apply(copy, args);
                                        }, time);
                           return copy;
                        }
                    }
                }
            }
            copy.delay = this.delay;
            return copy;
        }
        function echo(str) {
            console.log(str);
            return this;
        }
        return {
            setDrawingContext: setDrawingContext,
            addShape: addShape,
            draw: draw,
            getBoundingRectangle: getBRect,
            drawBoundingRectangle: drawBRect,
            delay: delay,
            echo: echo
        }
    }();
    
    CADSystem.addShape(p2);
    CADSystem.addShape(p3);
    
   // console.log(CADSystem.getBoundingRectangle().x);
   // CADSystem.setDrawingContext(ctx)
    //CADSystem.drawBoundingRectangle();
    //CADSystem.draw();
    p4 = new DrawablePoint(30, 50);
    CADSystem.setDrawingContext(ctx).draw().delay(2000).addShape(p4).draw();
    
}