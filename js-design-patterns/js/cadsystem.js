function init() {
    var canvas = document.getElementById('canvas');
    if (canvas !== null && canvas.getContext){  
        var ctx = canvas.getContext('2d');  
        loadDynamic('js', ['global.js', 'events.js'], function() {
            loadDynamic('js',['shapes.js', 'shape_decorators.js'], function() {
                start(ctx);
            }) 
        });
    } else {
        alert("Problem creating canvas 2D drawing context");
    }  
}

function start(ctx) {
    var r1 = shapes.makeRectangle(300, 100, 150, 80);
    console.log("r1 = " + r1.toString() + ", Area = " + r1.getArea());
    r1.draw(ctx);
    //    var r1_decorated = new AreaShapeDecorator( 
    //        new NamedShapeDecorator(new ShadowShapeDecorator( r1), 
    //        "Rectangle 1", null , "15px Arial")
    //        );
    var r1_decorated =  
//    new AreaShapeDecorator( 
        new ShadowShapeDecorator(
            new NamedShapeDecorator(
                r1, "Rectangle 1", null , "15px Arial"
            ), 15, 15, 7, "blue"
        ); //, 'yellow'
//    );
    r1_decorated.draw(ctx);

//    r1.on("translate" , function(e) {
//        alert('Object translated: ' + e.payload);
//    });
//    r1.translate(100, 100);
    
    var p1 = shapes.makePoint(2, 3);
    var p2 = shapes.makePoint(30, 90);
    p2.draw(ctx);
    var p3 = shapes.makePoint(40, 50, "green");
    p3.draw(ctx);
    console.log(p1.translate(10, 10).toString());
    console.log(p2.translate(10, 10).toString());
    console.log(p3.translate(10, 10).toString());
    
    var l1 = shapes.makeLine(200,20, 220, 250, "green");
    console.log(l1.translate(-10, -10).toString());
    
    //var l2 = Object.create(l1);
    
    var l2 = Object.clone(l1, {
        x: 300, 
        strokeColor: 'orange'
    }, 

    {
        toString: function(){
            return "New Line(" +this.x + ", " + this.y + ", "
            + this.strokeColor + ")";
        }
    });
    
    //l2.x = 300;
    //l2.strokeColor = 'blue';
    console.log(l2.toString());
    console.log(l1.toString());
    
    l1.draw(ctx);
    l2.draw(ctx);


    var c1 = shapes.makeCircle (100, 100 ,70);
    var c1_decorated = new AreaShapeDecorator(
        new NamedShapeDecorator(c1, "Circle 1", null , "15px Arial"));
    c1_decorated.draw(ctx);
    console.log("c1: " + c1.toString());
    
    var po1 = shapes.makePolygon (200, 100, [p1, p2, p3]);
    console.log(po1.toString());
    po1.draw(ctx);
    
    
     
    //    var rectangle = Object.create(r1);
    //    rectangle.width = 50;
    //    rectangle.height = 250;
    //    rectangle.area = function(){
    //        return this.width * this.height;
    //    }
    //    rectangle.toString = function() {
    //        return"x: " + this.x + ", y: " + this.y 
    //            + ", width: " + this.width + ", height: " + this.height;
    //    }
    //    rectangle.draw = function(ctx){
    //        ctx.fillStyle = this.fillColor;
    //        ctx.fillRect(this.x, this.y,this.width, this.height);
    //    }
    //    
    //    console.log(rectangle.toString());
    //    rectangle.draw(ctx)
    //    //        
    //    
    //    
    //    
    //    var Shape = function(x,y){
    //        this.x = x;
    //        this.y = y;
    //    }    
    //    Shape.prototype.toString = function() {
    //        return "Builder Shape - x: " + this.x + ", y: "+ this.y;
    //    }
    //    var Rect = function(x, y, width, height) {
    //        this.x = x || 0;
    //        this.y = y || 0;
    //        this.width = width || 100;
    //        this.height = height || 50;
    //    }.inherits(Shape)
    //    .method('area', function(){
    //        return this.width * this.height;
    //    }).method('draw', function(ctx){
    //        ctx.fillStyle = "blue";
    //        ctx.fillRect(this.x, this.y, this.width, this.height);
    //    });
    //        
    //    var r5 = Rect.new1(100, 150, 300,200);
    //    console.log("From builder: " + r5.toString());
    //    console.log("From builder Area: " + r5.area());
    //    r5.draw(ctx);  
     
    CADSystem = (function(){
        var shapes = [];
        var context;
        
        /* Private methods */
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
                y = shapes[i].y - shapes[i].height/2;
                if( y < min){
                    min = y;
                }
            }
            return min;
        }
        function minX() {
            var x, min = Number.POSITIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                x = shapes[i].x - shapes[i].width/2;
                if( x < min){
                    min = x;
                }
            }
            return min;
        }
        function maxY() {
            var y, max = Number.NEGATIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                y = shapes[i].y + shapes[i].height/2;
                if( y > max){
                    max = y;
                }
            }
            return max;
        }
        function maxX() {
            var x, max = Number.NEGATIVE_INFINITY;
            for(i = 0; i < shapes.length; i++){
                x = shapes[i].x + shapes[i].width/2;
                if( x > max){
                    max = x;
                }
            }
            return max;
        }
        
        /* Public methods */
        function addShape(shape) {
            shapes.push(shape);
            return this;
        }
        function removeShape(index) {
            shapes.splice(index, 1);
            return this;
        }
        function getShape(index) {
            if(index >= 0 && index < shapes.length){
                return shapes[index];
            }else {
                return null;
            }
        }
        function getShapesCount() {
            return shapes.length;
        }
        function draw(ctx) {
            ctx = ctx || context;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            for(var i = 0; i < shapes.length; i++) {
                shapes[i].draw(ctx);
            }
            ctx.restore();
            return this;
        }
        function getBRect() {
            return {
                x: minX(), 
                y: minY(), 
                width:  maxX()- minX(), 
                height: maxY()- minY()
            };
        }
        function drawBRect(ctx) {
           ctx = ctx || context;
           var rect;
            rect = getBRect();
            ctx.save();
            ctx.fillStyle = "rgba(0,0, 255,0.4)";
            ctx.fillRect(rect.x, rect.y, 
                rect.width, rect.height);
            ctx.restore();
            return this;
        }
        function delay(time) {
            var copy = {}, i, self;
            for(i in this){
                self = this;
                if(typeof self[i] === "function") {
                    copy[i] = function(x) {
                        return function() {
                            var args = Array.prototype.slice.call(arguments);
                            setTimeout(function(){
                                self[x].apply(copy, args);
                            }, time);
                            return copy;    
                        };
                    }(i);
                } else {
                    copy[i] = self[i];
                }
            }
            copy.delay = this.delay;
            return copy;
        }
        function echo(str) {
            console.log(str);
            return this;
        }
        function setDrawingContext(ctx){
            context = ctx;
        }
        return {
            addShape: addShape,
            removeShape: removeShape,
            getShape: getShape,
            getShapesCount: getShapesCount,
            draw: draw,
            getBoundingRectangle: getBRect,
            drawBoundingRectangle: drawBRect,
            delay: delay,
            echo: echo,
            setDrawingContext: setDrawingContext
        }
    })();
    
//    CADSystem.addShape(r1_decorated);
//    CADSystem.addShape(c1);
//    CADSystem.draw(ctx);
    
    CADSystem.draw(ctx).delay(2000).addShape(l2).draw(ctx)
        .delay(2000).addShape(c1_decorated).draw(ctx)
        .delay(1000).addShape(l1).draw(ctx)
        .delay(2000).removeShape(2).draw(ctx)
        .delay(1500).removeShape(1).draw(ctx);
    
// console.log(CADSystem.getShapesCount());
// console.log(CADSystem.getShape(0));
// console.log(CADSystem.getBoundingRectangle());
// CADSystem.setDrawingContext(ctx);
// CADSystem.drawBoundingRectangle();
//CADSystem.draw(ctx);
//p4 = shapes.makePoint(30, 50);
//CADSystem.setDrawingContext(ctx).draw().delay(2000).addShape(p4).draw();
    
}