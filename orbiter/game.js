/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(rss.resources, function () {
        //cc.director.runScene(new MenuScene());
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();
var rss = rss || {};

rss.chipmunk = "chipmunk"
rss.box2D = "box2d"

rss.twoPI = 2 * Math.PI

rss.colors = {
    yellow: new cc.color(255, 255, 0, 255),
    green: new cc.color(0, 255, 0, 255),
    purple: new cc.color(174, 0, 255, 255),
    red: new cc.color(255, 0, 0, 255),
    pink: new cc.color(255, 0, 255, 255),
    orange: new cc.color(255, 78, 0, 255),
    maroon: new cc.color(172, 6, 84, 255),
    brown: new cc.color(145, 58, 6, 255),
    blue: new cc.color(6, 87, 234, 255),
    black: new cc.color(0, 0, 0, 255),
    white: new cc.color(255, 255, 255, 255)
}

rss.tag = {
    player: 1,
    ground: 2,
    fuel: 3,
    landingPad: 4,
    startFinish: 5,
    star: 6,
    invisible: 7,

    gameLayer: 99,
    statsLayer: 98
}
var rss = rss || {};

//rss.physics = rss.box2D
rss.physics = rss.chipmunk

rss.g = 100
rss.gravity = -500


rss.keys = []

rss.res = {
    spritesheet_plist: "res/spritesheet.plist",
    spritesheet_png: "res/spritesheet.png",

    star_wav: "res/star.wav",
    spaceship_ogg: "res/delta_iv.ogg"
}

// Resources for pre-loading
rss.resources = [];
for (var i in rss.res) {
    rss.resources.push(rss.res[i]);
}

rss.spaceship = {
    mass: 1
}
rss.spaceship.maxImp = rss.spaceship.mass * 50

rss.tag = {
    player: 1,
    ground: 2,
    fuel: 3,
    landingPad: 4,
    startFinish: 5,
    star: 6,
    invisible: 7,

    gameLayer: 99,
    statsLayer: 98
}

rss.player = {
    states: {
        landed: 0,
        flying: 1,
        refuelling: 2,
        crashed: 9
    }
}

rss.player.stateNames = {
    0: "landed",
    1: "flying",
    2: "refuelling",
    9: "crashed"
}

rss.world = {
    mass: 10000000,
    states: {
        stopped: 0,
        moving: 1
    }
}

rss.item = {
    mass: 100000
}

rss.star = {
    width: 30,
    height: 30,
    mass: 1
}

rss.landingPad = {
    angle: 5
}

rss.game = {
    states : {
        ready: 0,
        touched: 1,
        started: 2
    }
}

rss.game.stateNames = {
    0: "ready",
    1: "touched",
    2: "started"
}

rss.levels = [
    {
        radius: 2000,
        offset: 150,
        omega: 0.20
        //radius: 800,
        //offset: 150,
        //omega: 0.4
    }
]
var rss = rss || {}

cp.Space.prototype.addConstraints = function(constraints) {
    var that = this
    constraints.forEach(function(constr) {
        that.addConstraint(constr)
    })
}

cc.Node.prototype.seq = function() {
    var action = arguments.length > 1 ? cc.Sequence.create.apply(cc.Sequence, arguments) : arguments[0]
    this.runAction(action)
    return action
}

cc.Node.prototype.spawn = function(x, y) {
    var action = cc.Spawn.create.apply(cc.Spawn, arguments)
    this.runAction(action)
    return action
}

cp.Vect.prototype.toP = function() {
    return cc.p(this.x, this.y)
}

cp.Vect.prototype.addX = function(dx) {
    return cp.v(this.x + dx, this.y)
}

cp.Vect.prototype.addY = function(dy) {
    return cp.v(this.x, this.y + dy)
}

cp.Vect.prototype.subX = function(dx) {
    return cp.v(this.x - dx, this.y)
}

cp.Vect.prototype.subY = function(dy) {
    return cp.v(this.x, this.y - dy)
}

rss.logO = function(obj) {
    for (i in obj) {
        cc.log(i)
    }
}

rss.logP = function(p, name) {
    if (!name) {
        var name = "point"
    }
    cc.log(name + ".x: " + p.x)
    cc.log(name + ".y: " + p.y)
}

rss.logS = function(s) {
    if (!name) {
        var name = "size"
    }
    cc.log(name + ".width: " + s.width)
    cc.log(name + ".height: " + s.height)
}

rss.logDeg = function(rad, name) {
    if (!name) {
        var name = "angle"
    }
    cc.log(name + " (deg): " + cc.radiansToDegrees(rad))
}

rss.toV = function(p) {
    return cp.v(p.x, p.y)
}

rss.v = {}

rss.vertsToPs = function(verts, offset) {
    offset = offset || cc.p()
    var vertPs = []
    for (var i = 0; i < verts.length - 1; i+=2) {
        vertPs.push(cc.p(verts[i] + offset.x, verts[i+1] + offset.y))
    }
    return vertPs
}

rss.offsetVerts = function(verts1, offset) {
    var verts = []
    verts1.forEach(function(v) {
        verts.push(cc.p(v.x + offset.x, v.y + offset.y))
    })
    return verts
}

rss.sum = function(obj) {
    var total = 0
    for (var i in obj) {
        total += obj[i]
    }
    return total
}

rss.sumAttr = function(attr, items) {
    var sum = 0
    items.forEach(function(item) {
        sum += item[attr]
    })
    return sum
}

rss.sign = function(number) {
    return number?number<0?-1:1:0
}

rss.p = {}
rss.p.add = function(p1, p2) {
    return cc.p(p1.x + p2.x, p1.y + p2.y)
}

rss.p.addX = function(obj, dx) {
    return cc.p(obj.x + dx, obj.y)
}

rss.p.addY = function(obj, dy) {
    return cc.p(obj.x, obj.y + dy)
}

rss.p.sub = function(p1, p2) {
    return cc.p(p1.x - p2.x, p1.y - p2.y)
}

rss.p.subX = function(obj, dx) {
    return cc.p(obj.x - dx, obj.y)
}

rss.p.subY = function(obj, dy) {
    return cc.p(obj.x, obj.y - dy)
}

rss.p.mult = function(p, m) {
    return cc.p(p.x * m, p.y * m)
}

rss.p.dot = function(p1, p2) {
   return cc.p(p1.x * p2.x, p1.y * p2.y)
}

rss.p.toS = function(p) {
    return cc.size(p.x, p.y)
}

rss.s = {}
rss.s.mult = function(s, m) {
    return cc.size(s.width * m, s.height * m)
}

rss.s.addW = function(s, dw) {
    return cc.size(s.width + dw, s.height)
}

rss.s.addH = function(s, dh) {
    return cc.size(s.width, s.height + dh)
}

rss.s.subW = function(s, dw) {
    return cc.size(s.width - dw, s.height)
}

rss.s.subH = function(s, dh) {
    return cc.size(s.width, s.height - dh)
}

rss.s.dot = function(s1, s2) {
    return cc.size(s1.width * s2.width, s1.height * s2.height)
}

rss.s.toP = function(s) {
    return cc.p(s.width, s.height)
}

rss.vecFromTo = function(a, b) {
    return rss.p.sub(b, a)
}

rss.unitVecFromTo = function(a, b) {
    return rss.normalize(rss.p.sub(b, a))
}

rss.normalVecTo = function(v) {
    return cc.p(-1 * v.y, v.x)
}

rss.rotate = function(v, angle) {
    return cc.p(
        v.x * Math.cos(angle) - v.y * Math.sin(angle),
        v.x * Math.sin(angle) + v.y * Math.cos(angle)
    )
}

rss.rotate90 = function(v) {
    return cc.p(-1 * v.y, v.x)
}

rss.rotate180 = function(v) {
    return cc.p(-1 * v.x, -1 * v.y)
}

rss.rotate270 = function(v) {
    return cc.p(v.y, -1 * v.x)
}

rss.allPs = function(points, func, args) {
    var newps = []
    points.forEach(function(p) {
        newps.push(func(p, args))
    })
    return newps
}

rss.rotateAll = function(points, angle) {
    var newps = []
    points.forEach(function(p) {
        newps.push(rss.rotate(p, angle))
    })
    return newps
}

rss.p.addAll = function(points, vector) {
    var newps = []
    points.forEach(function(point) {
        newps.push(rss.p.add(point, vector))
    })
    return newps
}

rss.distance = function(p1, p2) {
    return rss.mag({x: p2.x - p1.x, y: p2.y - p1.y})
}

rss.mag = function(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))
}

rss.normalize = function(vec) {
    return cc.p(vec.x / rss.mag(vec), vec.y / rss.mag(vec))
}

rss.unitVec = function(vec) {
    return cc.p(vec.x / rss.mag(vec), vec.y / rss.mag(vec))
}

rss.toRad = function(deg) {
    return cc.degreesToRadians(deg)
}

rss.toDeg = function(rad) {
    return cc.radiansToDegrees(rad)
}

rss.polarXProj = function(r, theta) {
    return r * Math.cos(theta)
}

rss.polarYProj = function(r, theta) {
    return r * Math.sin(theta)
}

rss.polarToCartesian = function(r, theta) {
    return cc.p(rss.polarXProj(r, theta), rss.polarYProj(r, theta))
}

// Haven't tested
rss.cartesianToPolar = function(x, y) {
    var theta = Math.atan(y / x)
    var radius = Math.sqrt(x * x + y * y)

    return cc.p(radius, theta)
}

rss.pinJoint = function(obj1, obj2) {
    return [new cp.PinJoint(obj1.getBody(), obj2.getBody(), rss.toV(obj1.getJointP()), rss.toV(obj2.getJointP()))]
}

rss.pivotJoint = function(obj1, obj2) {
    return [new cp.PivotJoint(obj1.getBody(), obj2.getBody(), obj1.getJointP(true))]
}

rss.gearJoint = function(obj1, obj2, phase, ratio) {
    return [new cp.GearJoint(obj1.getBody(), obj2.getBody(), phase, ratio)]
}

rss.slideJoint = function(obj1, obj2) {
    return [new cp.SlideJoint(obj1.getBody(), obj2.getBody(), obj1.getJointPs()[0], obj1.getJointPs()[1], obj2.getJointP())]
}

rss.grooveJoint = function(obj1, obj2) {
    return [new cp.GrooveJoint(obj1.getBody(), obj2.getBody(), obj1.getJointPs()[0], obj1.getJointPs()[1], obj2.getJointP())]
}

rss.ratchetJoint = function(obj1, obj2, offset, phase) {
    return [new cp.RatchetJoint(obj1.getBody(), obj2.getBody(), offset, phase)]
}

rss.fixedJoint = function(obj1, obj2, angle) {
    var angle = angle || 0.0
    return rss.gearJoint(obj1, obj2, angle, 1.0).concat(rss.pivotJoint(obj1, obj2))
}

rss.rotaryLimitJoint = function(obj1, obj2, angle1, angle2) {
    return [new cp.RotaryLimitJoint(obj1.getBody(), obj2.getBody(), angle1, angle2)]
}

rss.winsize = function() { return cc.director.getWinSize() }

rss.width = function() { return cc.director.getWinSize().width }

rss.height = function() { return cc.director.getWinSize().height }

rss.top = function() { return cc.p(cc.director.getWinSize().width / 2, cc.director.getWinSize().height) }

rss.bottom = function() { return cc.p(cc.director.getWinSize().width / 2, 0) }

rss.left = function() { return cc.p(0, cc.director.getWinSize().height / 2) }

rss.right = function() { return cc.p(cc.director.getWinSize().width, cc.director.getWinSize().height / 2) }

rss.center = function() { return cc.p(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2) }

rss.topLeft = function() { return cc.p(0, cc.director.getWinSize().height) }

rss.topRight = function() { return cc.p(cc.director.getWinSize().width, cc.director.getWinSize().height) }

rss.bottomLeft = function() { return cc.p(0, 0) }

rss.bottomRight = function() { return cc.p(0, cc.director.getWinSize().height) }

/* Global game controls */
rss.pause = function() {
    rss.keys[cc.KEY.p] = true
}

/* Control inputs */
rss.pauseInput = function() {
    return rss.keys[cc.KEY.p]
}

rss.restartInput = function() {
    return rss.keys[cc.KEY.r]
}

rss.upInput = function() {
    return rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]
}

rss.downInput = function() {
    return rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]
}

rss.rightInput = function() {
    return rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]
}

rss.leftInput = function() {
    return rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]
}

rss.xInput = function() {
    return this.r.rightInput() || this.r.leftInput()
}

rss.yInput = function() {
    return this.upInput() || this.downInput()
}

rss.xyInput = function() {
    return this.upInput() || this.downInput() || this.r.rightInput() || this.r.leftInput()
}

rss.setAlpha = function(col, alpha) {
    return cc.color(col.r, col.g, col.b, alpha)
}

rss.squareVerts = function(width) {
    return rss.rectVerts(width, width)
}

rss.rectVerts = function(width, height) {
    return [
        cc.p(+width / 2, -height / 2),
        cc.p(+width / 2, +height / 2),
        cc.p(-width / 2, +height / 2),
        cc.p(-width / 2, -height / 2)
    ]
}

rss.circSegmentVerts = function(radius, angle, offset, segments, direction) {
    return rss.floatingCircSegmentVerts(radius, angle, offset, segments, 1.0, direction)
}

rss.floatingCircSegmentVerts = function(radius, angle, offset, segments, heightFactor, direction) {
    var verts = []

    var direction = direction || 1.0

    verts.push(rss.polarToCartesian(radius * (1 - heightFactor), offset + direction * angle))

    var deltaTheta = angle / segments
    for (var n = 0; n <= segments; ++n) {
        verts.push(rss.polarToCartesian(radius, offset + direction * (angle - n * deltaTheta)))
    }

    verts.push(rss.polarToCartesian(radius * (1 - heightFactor), offset))

    return verts
}

rss.starVerts = function(nRays, r1, r2, rayWidth) {
    verts = []
    var theta = rss.twoPI / nRays
    for (var n = 0; n < nRays; ++n) {
        verts.push(rss.polarToCartesian(r1, n * theta))
        verts.push(rss.polarToCartesian(r2, (n + 1/2) * theta))
    }
    return verts
}

rss.scaleVerts = function(verts, scale) {
    var newVerts = []
    verts.forEach(function(vert) {
        newVerts.push(cc.p(vert.x * scale, vert.y * scale))
    })
    return newVerts
}

rss.toXYVerts = function(verts) {
    vertsXY = []
    verts.forEach(function(vert) {
        vertsXY.push(vert.x)
        vertsXY.push(vert.y)
    })
    return vertsXY
}

rss.log = function(str) {
    cc.log("COCOS: " + str)
}

rss.stop = function() {
    cc.director.pause()
    cc.audioEngine.stopMusic()
}
rss.ui = {}

rss.ui.linewidth = 2

rss.ui.button = function(sprites) {
    var btn = new CompositeSprite(["#button_outer.png", sprites[0], sprites[1]])
    btn.setColor(rss.colors.white)
    btn.setChildColor(0, rss.colors.black)
    btn.setChildColor(1, rss.colors.white)
    return btn
}

rss.ui.buttons = function(sprites) {
    var buttons = {
        normal: rss.ui.button(sprites[0]),
        selected: rss.ui.button(sprites[1])
    }

    return buttons
}

rss.ui.restartButton = function() {
    return rss.ui.buttons(
        [
            ["button_n_inner.png", "restart_n_text.png"],
            ["button_s_inner.png", "restart_s_text.png"]
        ]
    )
}

rss.ui.startButton = function() {
    return rss.ui.buttons(
        [
            ["button_n_inner.png", "start_n_text.png"],
            ["button_s_inner.png", "start_s_text.png"]
        ]
    )
}
rss.StaticBody = cc.Node.extend({
    ctor: function(args) {
        this._super()

        this.r = {}

        this.r.startPos = args.pos
        this.r.origin = args.pos
        this.r.jointPs = [cc.p()]

        this.r.size = args.size
        this.r.clearance = args.clearance
        this.r.scale = args.scale

        this.r.color = args.color

        this.r.draw = new cc.DrawNode()
        this.addChild(this.r.draw)
    },

    init: function() {
        rss.log("StaticBody.init ...")
        this._super()
    },

    addToSpace: function(space) {
        space.addStaticShape(this.r.shape)
        return this
    },

    removeFromSpace: function(space) {
        var body = this.getBody()
        if (typeof body == "object") {
            //rss.log("CHECKING CONSTRAINTS")
            //space.constraints.forEach(function(constr) {
            //    //rss.log("CHECKING CONSTRAINT")
            //    if ((constr.a == body) || (constr.b == body)) {
            //        rss.log("REMOVING CONSTRAINT")
            //        space.removeConstraint(constr)
            //    }
            //})
            space.removeBody(body)
        }

        var shape = this.getShape()
        if (typeof shape == "object") {
            space.removeShape(shape)
        }

        if (typeof this.r.draw == "object") {
            this.r.shouldDraw = false
            this.r.draw.removeFromParent()
        }

        this.removeFromParent()
    },

    getStartPos: function() { return this.r.startPos },

    getPos: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                return this.r.body.getPos()
                break;
            case rss.box2D:
                return this.r.body.GetPosition()
                break;
        }
    },

    setPos: function(p) {
        switch(rss.physics) {
            case rss.chipmunk:
                this.r.body.setPos(p)
                break;
            case rss.box2D:
                this.r.body.setPosition(p.x, p.y)
                break;
        }
    },

    getX: function() { return this.r.body.getPos().x },

    getY: function() { return this.r.body.getPos().y },

    getTopLeft: function() {
        var pos = this.getPos()
        return cc.p(pos.x, pos.y + this.r.size.height / 2)
    },

    getTopLeftV: function() { return rss.toV(this.getTopLeft()) },

    getStartPos: function() { return this.r.startPos },

    getAngle: function() { return this.r.body.a },

    getAngleDeg: function() { return cc.radiansToDegrees(this.r.body.a) },

    setAngle: function(rad) { this.r.body.setAngle(rad) },

    getSize: function() { return this.r.size },

    getWidth: function() { return this.r.size.width },

    getHeight: function() { return this.r.size.height },

    getClearance: function() { return this.r.clearance },

    getRadius: function() { return this.r.radius },

    getWidthRad: function(radius) { return this.getWidth() / this.getRadius() },

    getHeightRad: function(radius) { return this.getHeight() / this.getRadius() },

    getShape: function() { return this.r.shape },

    getBody: function() { return this.r.body },

    getSprite: function() { return this.r.sprite },

    getDraw: function() { return this.r.draw },

    getStartPos: function() { return this.r.startPos },

    getOrigin: function() { return this.r.origin },

    getJointP: function(wantGlobal) {
        if (wantGlobal) {
            return rss.p.add(this.getPos(), this.r.jointPs[0])
        }
        else {
            return this.r.jointPs[0]
        }
    },

    getJointPs: function() { return this.r.jointPs },

    setJointP: function(p) { this.r.jointPs[0] = p },

    setJointPs: function(points) { this.r.jointPs = points },

    setJointR: function(ratio) { this.r.jointPs[0] = rss.p.dot(ratio, rss.s.toP(this.r.size)) },

    setJointRs: function(ratios) {
        this.r.jointPs = []
        ratios.forEach(function(ratio) {
            this.r.jointPs.push(rss.p.dot(ratio, rss.s.toP(this.r.size)))
        })
    },

    setGroup: function(group) { this.r.shape.group = group },

    getColor: function() { return this.r.color },

    setColor: function(color) { this.r.color = color },

    getState: function() { return this.r.state },

    setState: function(state) { this.r.state = state },

    setElasticity: function(e) { this.r.shape.setElasticity(e) },

    setFriction: function(f) { this.r.shape.setFriction(f) },

    setSensor: function(bool) { this.r.shape.setSensor(bool) },

    setCollisionType: function(type) { this.r.shape.setCollisionType(type) },

    translate: function(v) { this.r.body.setPos(rss.p.add(this.r.body.getPos(), v)) }
})
rss.CompositeStaticBody = rss.StaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.comps = []
        this.r.constraints = []
    },

    init: function() {
        cc.log("CompositeStaticBody.init ...")
        this._super()

        if (typeof this.getColor() == "object") {
            this.draw(this.getColor())
        }
    },

    addComp: function(comp) {
        this.r.comps.push(comp)
    },

    addChildComp: function(comp) {
        this.addChild(comp)
        this.addComp(comp)
    },

    eachComp: function(funName, args) {
        this.r.comps.forEach(function(comp) {
            comp[funName].apply(comp, args)
        })
    },

    addToSpace: function(space) {
        this.r.comps.forEach(function(comp) {
            comp.addToSpace(space)
        })
        this.r.constraints.forEach(function(constr) {
            space.addConstraint(constr)
        })
        return this
    },

    addConstraint: function(constr) {
        this.addConstraints([constr])
    },

    addConstraints: function(constraints) {
        var that = this
        constraints.forEach(function(constr) {
            that.r.constraints.push(constr)
        })
    },

    drawCOM: function() {
        this.r.draw.clear()
        this.r.draw.setPosition(this.getPos())
        this.r.draw.drawDot(cc.p(), (this.getWidth() || 100) / 6, rss.colors.red)
    },

    getMass: function() {
        var mass = 0
        this.comps.forEach(function(comp) {
            mass += comp.getMass()
        })
        return mass
    },

    setGroup: function(group) { this.eachComp('setGroup', [group]) },

    setCollisionType: function(type) { this.eachComp('setCollisionType', [type]) },

    setFriction: function(mu) { this.eachComp('setFriction', [mu]) },

    setElasticity: function(e) { this.eachComp('setElasticity', [e]) },

    setSensor: function(bool) { this.eachComp('setSensor', [bool]) },

    setColor: function(col) { this.eachComp('setColor', [col])},

    erase: function() { this.eachComp('erase', []) },

    draw: function(col) { this.eachComp('draw', [col || this.getColor()]) }
})
rss.CompositeDynamicBody = rss.CompositeStaticBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        this._super()
    },

    getPos: function() {
        var comX = 0.0
        var comY = 0.0
        var mass = this.getMass()

        this.r.comps.forEach(function(comp) {
            comX += comp.getX() * comp.getMass() / mass
            comY += comp.getY() * comp.getMass() / mass
        })

        return cc.p(comX, comY)
    },

    setPos: function(pos) {
        var com = this.getPos()
        var deltaX = pos.x - com.x
        var deltaY = pos.y - com.y

        this.r.comps.forEach(function(comp) {
            var x = comp.getPos().x + deltaX
            var y = comp.getPos().y + deltaY
            comp.setPos(cc.p(x, y))
        })
    },

    getVel: function() {
        var vComX = 0.0
        var vComY = 0.0
        var mass = this.getMass()

        this.r.comps.forEach(function(comp) {
            var vel = comp.getVel()
            vComX += vel.x * comp.getMass() / mass
            vComY += vel.y * comp.getMass() / mass
        })

        return cp.v(vComX, vComY)
    },

    setVel: function(vx, vy) {
        this.r.comps.forEach(function(comp) {
            comp.setVel(vx, vy)
        })
    },

    getMass: function() {
        var mass = 0.0
        this.r.comps.forEach(function(comp) {
            mass += comp.getMass()
        })
        return mass
    },

    applyImpulse: function(i) {
        this.r.comps.forEach(function(comp) {
            comp.applyImpulse(i)
        })
    }
})
rss.DynamicBody = rss.StaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.mass = args.mass
    },

    init: function() {
        this._super()
    },

    addToSpace: function(space) {
        space.addBody(this.r.body)
        space.addShape(this.r.shape)
        return this
    },

    getVel: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                return this.r.body.getVel()
                break;
            case rss.box2D:
                return this.r.body.GetVelocity()
                break;
        }
    },

    setVel: function(v) {
        switch(rss.physics) {
            case rss.chipmunk:
                this.r.body.setVel(v)
                break;
            case rss.box2D:
                this.r.body.SetVelocity(v.x, v.y)
                break;
        }
    },

    getV: function() {
        return rss.toV(this.getPos())
    },

    getMass: function() {
        return this.r.body.m
    },

    getOffset: function() {
        return this.r.offset
    },

    getAngVel: function() {
        return this.r.body.getAngVel()
    },

    setAngVel: function(w) {
        this.r.body.w = w
    },

    applyForce: function (f) {
        this.r.body.applyForce(f, cp.v(0, 0))
    },

    applyForceAt: function (f, r) {
        this.r.body.applyForce(f, r)
    },

    applyImpulse: function (i) {
        this.r.body.applyImpulse(i, cp.v(0, 0))
    },

    applyImpulseAt: function (i, r) {
        this.r.body.applyImpulse(i, r)
    },

    applyAxialImpulse: function(impulse) {
        this.applyImpulse(impulse * this.r.body.rot.x, impulse * this.r.body.rot.y)
    }
})
rss.RectBody = rss.DynamicBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        this._super()

        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.shape = new cp.BoxShape(this.r.body, this.r.size.width, this.r.size.height)

        return this
    },

    draw: function(col) {
        this.r.draw.clear()

        var col = col || this.getColor() || rss.colors.white
        this.r.draw.drawRect(
            cc.p(-this.getWidth() / 2, -this.getHeight() / 2),
            cc.p(this.getWidth() / 2, this.getHeight() / 2),
            rss.setAlpha(col, 255),
            2,
            rss.setAlpha(col, 255)
        )
        this.r.draw.setPosition(this.getPos())
        this.r.draw.setAnchorPoint(0.5, 0.5)
        this.r.draw.setRotation(-1 * rss.toDeg(this.getAngle()))
    }
})

rss.RectBody.create = function(args) {
    return new rss.RectBody(args).init()
}
rss.StaticRectBody = rss.StaticBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        cc.log("StaticRectBody.init ...")
        this._super()

        if (rss.physics == rss.chipmunk) {
            this.initChipmunk()
        }
        else if (rss.physics == rss.box2D) {
            this.initBox2D()
        }

        return this
    },
    
    initChipmunk: function() {
        cc.log("StaticRectBody.initChipmunk ...")
        // body
        this.r.body = new cp.StaticBody()
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.shape = new cp.BoxShape(this.r.body, this.r.size.width, this.r.size.height)
    },
    
    initBox2D: function() {
        var fixtureDef = new  Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        if(isDynamic){
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        }
        else{
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        }
        bodyDef.position.Set(posX/worldScale,posY/worldScale);
        var userSprite = cc.Sprite.create(rss.res.fish_png);
        this.addChild(userSprite, 0);
        userSprite.setPosition(posX,posY);
        bodyDef.userData = {
            type: type,
            asset: userSprite
        }
        this.r.body = world.CreateBody(bodyDef)
        body.CreateFixture(fixtureDef);
    },

    draw: function(col) {
        this.r.draw.clear()

        var col = col || this.getColor() || rss.colors.white
        this.r.draw.drawRect(
            cc.p(-this.getWidth() / 2, -this.getHeight() / 2),
            cc.p(this.getWidth() / 2, this.getHeight() / 2),
            rss.setAlpha(col, 255),
            2,
            rss.setAlpha(col, 255)
        )
        this.r.draw.setPosition(this.getPos())
        this.r.draw.setAnchorPoint(0.5, 0.5)
        this.r.draw.setRotation(-1 * rss.toDeg(this.getAngle()))
    }
})

rss.StaticRectBody.create = function(args) {
    return new rss.StaticRectBody(args).init()
}
rss.CircBody = rss.DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.radius * 2, args.radius * 2)
        this._super(args)

        this.r.offset = args.offset || 0
        this.r.radius = args.radius

        this.r.segments = args.segments
    },

    init: function() {
        this._super()

        if (rss.physics == rss.chipmunk) {
            this.initChipmunk()
        }
        else if (rss.physics == rss.box2D) {
            this.initBox2D()
        }

        return this
    },

    initChipmunk: function() {
        cc.log("Ball.init ...")
        this._super()

        this.r.body = new cp.Body(this.r.mass, cp.momentForCircle(this.r.mass, 0, this.r.radius, cp.v(0,0)))
        this.r.body.setPos(this.r.startPos)

        this.r.shape = new cp.CircleShape(this.r.body, this.r.radius, cp.v(0, 0))
    },

    initBox2D: function() {
        var fixtureDef = new  Box2D.Dynamics.b2FixtureDef
        fixtureDef.density = 1.0
        fixtureDef.friction = 0.5
        fixtureDef.restitution = 0.2
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
        fixtureDef.shape.SetAsBox(this.r.radius, this.r.radius)

        var bodyDef = new Box2D.Dynamics.b2BodyDef
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
        bodyDef.position.Set(this.r.startPos.x, this.r.startPos.y)
        bodyDef.userData = { type: "ball" }

        this.r.body = this.r.space.CreateBody(bodyDef)
        this.r.body.CreateFixture(fixtureDef)
    },

    applyTangentialImpulse: function(i) {
        this.r.body.applyImpulse(
            cp.v(i, 0),
            cp.v(this.getX(), this.getY() + this.r.radius)
        )
    },

    applyTorque: function(f) {
        this.r.body.applyForce(
            cp.v(f, 0),
            cp.v(this.getX(), this.getY() + this.r.radius)
        )
    },

    getAngle: function() {
        return this._super() - this.r.offset
    },

    getTop: function() {
        return rss.p.addY(this.r.startPos, this.r.radius)
    },

    getSurfaceVel: function() {
        return this.r.body.w * this.r.radius
    },

    setSurfaceVel: function(v) {
        this.setAngularVel(v / this.r.radius)
    },

    getAngularVel: function() {
        return this.r.body.w
    },

    setAngularVel: function(w) {
        this.r.body.w = w
    },

    drawCircle: function(col) {
        this.r.draw.drawCircle(
            cc.p(),
            this.getRadius(),
            2,
            this.getRadius(),
            false,
            10,
            col
        )
    },

    drawDot: function(col) {
        this.r.draw.drawDot(
            cc.p(),
            this.getRadius(),
            col
        )
    },

    draw: function(col) {
        this.r.draw.clear()
        var col = col || this.getColor() || rss.colors.white
        //this.drawDot(col)
        this.drawCircle(col)
        this.r.draw.setPosition(this.getPos())
    }
})

rss.CircBody.create = function(args) {
    return new rss.CircBody(args).init()
}
rss.RectPhysicsSprite = rss.RectBody.extend({
    ctor: function(args) {
        var scale = args.scale || 1.0
        var sprite = new cc.PhysicsSprite(args.spriteFrame)
        sprite.setScale(scale)
        args.size = rss.s.mult(sprite.getContentSize(), scale)
        this._super(args)

        this.r.sprite = sprite
        this.r.scale = scale

        this.spriteFrame = args.spriteFrame
    },

    init: function() {
        this._super()

        this.r.sprite.setBody(this.r.body)
        this.addChild(this.r.sprite)

        return this
    },

    animate: function(frameNames) {
        var animFrames = [];

        frameNames.forEach(function() {
            animFrames.push(cc.spriteFrameCache.getSpriteFrame(str))
        })

        this.animation = new cc.Animation(animFrames, 0.1);

        this.r.sprite.runAction(cc.animate(this.animation).repeatForever());
    }
})

rss.RectPhysicsSprite.create = function(args) {
    return new rss.RectPhysicsSprite(args).init()
}
rss.StaticRectPhysicsSprite = rss.StaticRectBody.extend({
    ctor: function(args) {
        if (args.spriteCfg.pList) {
            this.constructAnimSprite(args.spriteCfg)
        }
        else {
            this.sprite = new cc.PhysicsSprite(args.spriteCfg.image)
        }
        args.size = this.sprite.getContentSize()

        this._super(args)
    },

    init: function() {
        this._super()

        this.sprite.setBody(this.r.body)
        this.addChild(this.sprite)

        return this
    },

    constructAnimSprite: function(spriteCfg) {
        cc.spriteFrameCache.addSpriteFrames(spriteCfg.pList);
        var spriteSheet = new cc.SpriteBatchNode(spriteCfg.spriteSheet)
        this.sprite = new cc.PhysicsSprite("#" + spriteCfg.name + "0.png");

        var animFrames = [];

        for (var i = 1; i < 4; i++) {
            var str = "" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        this.animation = new cc.Animation(animFrames, 0.1);

        this.sprite.runAction(cc.animate(this.animation).repeatForever());
    }
})

rss.RectPhysicsSprite.create = function(args) {
    return new rss.RectPhysicsSprite(args).init()
}
rss.PolyBody = rss.DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.radius * 2, args.radius + args.coneLength)
        this._super(args)

        this.r.radius = args.radius
        this.coneLength = args.coneLength
        this.r.segments = args.segments
    },

    init: function() {
        this._super()

        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        var pos = this.r.startPos

        var verts = []

        var p = cc.p(pos.x, pos.y - this.coneLength)

        for (var a = 0; a < 180; a += 180 / this.r.segments) {
            var x = pos.x + (this.r.radius * Math.cos(cc.degreesToRadians(a + 180)))
            verts.push(x)
            var y = pos.y + this.r.radius * Math.sin(cc.degreesToRadians(a))
            verts.push(y)
        }

        verts.push(p.x, p.y)

        for (var i = 0; i < verts.length; i += 2) {
            cc.log("x: " + verts[i])
            cc.log("y: " + verts[i+1])
        }

        //this.r.shape = new cp.PolyShape(this.r.body, verts, cp.v(0, 0))
        this.r.shape = new cp.PolyShape(this.r.body, verts, cp.v(0, 0))

        return this
    }
})

rss.PolyBody.create = function(args) {
    return new rss.PolyBody(args).init()
}
rss.ConeBody = rss.DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.length, args.length)
        this._super(args)

        this.r.length = args.length
        this.r.radius = args.radius
        this.r.angle = cc.radiansToDegrees(2 * this.r.radius / this.r.length)
        this.r.segments = args.segments
        this.r.rotation = args.rotation - this.r.angle / 2
    },

    init: function() {
        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        var verts = []

        verts.push(0, 0)

        var gap = this.r.angle / this.r.segments
        for (var a = 90; a >= -90; a -= gap) {
            verts.push(
                this.r.length * Math.cos(cc.degreesToRadians(this.r.rotation)) + this.r.radius * Math.cos(cc.degreesToRadians(a + this.r.rotation)),
                this.r.length * Math.sin(cc.degreesToRadians(this.r.rotation)) + this.r.radius * Math.sin(cc.degreesToRadians(a + this.r.rotation))
            )
        }

        this.r.shape = new cp.PolyShape(this.r.body, verts, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))

        return this
    }
})

rss.ConeBody.create = function(args) {
    return new rss.ConeBody(args).init()
}
rss.CircSegmentBody = rss.DynamicBody.extend({
    SCALE: 1.0,

    ctor: function(args) {
        this._super(args)

        this.r.radius = args.radius
        this.r.segments = args.segments
        this.r.offset = args.offset - this.getWidth()
        this.r.size.height = this.r.size.height || 1.0

        this.r.midPoint = this.r.offset + this.getWidth() / 2
        this.r.right = this.r.offset + this.getWidth()
        this.r.left = this.r.offset

        this.r.startAngle = args.startAngle

        this.r.shouldPersist = false
        this.r.shouldDraw = true
    },

    init: function() {
        this._super()
        this.r.isInSpace = true

        if (this.getWidth() > 0) {
            this.initMe()
        }
        else {
            cc.log("angle should be greater than zero!")
        }

        return this
    },

    initMe: function() {
        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.verts = rss.floatingCircSegmentVerts(this.r.radius, this.getWidth(), this.r.offset, this.r.segments, this.r.size.height)
        this.r.verts = rss.scaleVerts(this.r.verts, this.SCALE)

        this.r.vertsXY = rss.toXYVerts(this.r.verts)

        this.r.shape = new cp.PolyShape(this.r.body, this.r.vertsXY, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))

        this.anchorX = this.getStartPos().x
        this.anchorY = this.getStartPos().y

        this.r.draw = new cc.DrawNode()
        this.r.draw.setScale(1.0 / this.SCALE)
        this.addChild(this.r.draw)

        this.startAng = this.r.body.a
    },

    getTop: function(wantGlobal) {
        if (wantGlobal) {
            return rss.polarToCartesian(this.r.startPos.x + this.r.radius, this.r.midPoint)
        }
        else {
            return rss.polarToCartesian(this.r.radius, this.getWidth() / 2 + this.r.midPoint)
        }
    },

    getShapeTop: function(wantGlobal) {
        if (wantGlobal) {
            return rss.polarToCartesian(this.r.startPos.x + this.r.radius, this.r.midPoint)
        }
        else {
            return rss.polarToCartesian(this.r.radius * this.getHeight(), this.r.midPoint)
        }
    },

    getShapeBottom: function(wantGlobal) {
        if (wantGlobal) {
            return rss.p.sub(this.getShapeTop(true), this.getShapeTop(false))
        }
        else {
            return cc.p(0, 0)
        }
    },

    getVerts: function(wantGlobal) {
        if (wantGlobal) {
            return rss.offsetVerts(this.r.verts, this.r.startPos)
        }
        else {
            return this.r.verts
        }
    },

    getStartAngle: function() {
        return this.r.startAngle
    },

    setShouldPersist: function(bool) {
        this.r.shouldPersist = bool
    },

    getShouldPersist: function() {
        return this.r.shouldPersist
    },

    draw: function() {
        this.r.draw.drawPoly(
            this.getVerts(false).reverse(),
            rss.setAlpha(this.getColor(), 128),
            rss.ui.linewidth / 2.0,
            rss.setAlpha(this.getColor(), 255)
        )
        this.r.draw.setPosition(this.getPos())
        this.r.draw.setAnchorPoint(0.5, 0)
        this.r.draw.setRotation(-1 * rss.toDeg(this.getAngle()))
    },

    update: function() {
        this.r.draw.clear()

        if (this.getShouldPersist()) {
            this.draw()
        }
        else {
            var ang = this.getAngle() % rss.twoPI
            var rightEdgeAng = rss.toDeg((this.getStartAngle() - (ang + this.getWidth() / 2)))
            var leftEdgeAng = rss.toDeg((this.getStartAngle() - (ang - this.getWidth() / 2)))
            var limit = 20
            if ((rightEdgeAng < limit) && (leftEdgeAng > (-1 * limit))) {
                this.draw()
            }
        }
    }
})

rss.CircSegmentBody.create = function(args) {
    return new rss.CircSegmentBody(args).init()
}
rss.Spaceship = rss.RectPhysicsSprite.extend({
    DEG_VERTICAL: 0,
    DEG_HORIZONTAL: 0,

    ctor:function(args) {
        cc.log("Spaceship.ctor ...")
        args.spriteFrame = "#spaceship_nofire.png"
        args.scale = 0.5
        args.mass = rss.spaceship.mass
        this._super(args)

        this.r.upFrame = cc.spriteFrameCache.getSpriteFrame("spaceship0.png")
        this.r.downFrame = cc.spriteFrameCache.getSpriteFrame("spaceship_nofire.png")
    },

    init:function() {
        cc.log("Spaceship.init ...")
        this._super()

        this.r.fuel = 100

        return this
    },

    getPos: function() {
        return this.r.body.p
    },

    setVel: function(vx, vy) {
        this.r.body.setVel(cp.v(vx, vy))
    },

    incFuel: function() {
        this.r.fuel = Math.min(100, this.r.fuel + 1)
    },

    decFuel: function() {
        this.r.fuel = Math.max(0, this.r.fuel - 0.5)
    },

    getAngle: function() {
        return this._super() - this.DEG_VERTICAL
    },

    setAngle: function(angle) {
        this._super(this.DEG_VERTICAL + angle)
    },

    angleFromVertical: function() {
        return this.r.angleFromAngle(this.DEG_VERTICAL)
    },

    angleFromHorizontal: function() {
        return this.r.angleFromAngle(this.DEG_HORIZONTAL)
    },

    angleFromAngle: function(baseAngle) {
        var ang = this.getAngle() - baseAngle

        if (ang > 180) {
            return 360 - ang
        }
        else if (ang < -180) {
            return ang + 360
        }
        return -1 * ang
    },

    getFuel: function() {
        return this.r.fuel
    },

    setSprite: function(res) {
        this.r.sprite = res
    },

    update: function(dt) {
        var p = this.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dix = 0.0, diy = 0.0

        if (rss.upInput()) {
            if (this.r.fuel > 0) {
                rss.spaceship.acc += 100
                this.applyImpulse(cp.v(0, Math.min(this.getMass() * rss.spaceship.acc * dt, rss.spaceship.maxImp)))
                this.decFuel()
                this.r.sprite.setSpriteFrame(this.r.upFrame)
                cc.audioEngine.playMusic(rss.res.spaceship_ogg)
            }
        }
        else {
            rss.spaceship.acc = 1000
            this.r.sprite.setSpriteFrame(this.r.downFrame)
            cc.audioEngine.stopMusic()
        }

        this.setAngle(0)
        this.setAngVel(0)

        if (rss.player.state == rss.player.states.refuelling) {
            this.incFuel()
        }
    }
})

rss.Spaceship.create = function(args) {
    return new rss.Spaceship(args).init()
}
var Star = rss.CircBody.extend({
    ctor: function(args) {
        args.radius = rss.star.width / 2
        args.mass = rss.star.mass
        args.size = cc.size(rss.star.width, rss.star.width)

        this._super(args)

        this.r.shouldDraw = true
    },

    init: function() {
        this._super()

        this.setCollisionType(rss.tag.star)
        this.setSensor(true)

        return this
    },

    attachToWorld: function(world) {
        this.r.constraints = rss.fixedJoint(this, world, world.START_ANGLE)
    },

    getConstraints: function() {
        return this.r.constraints
    },

    draw: function() {
        this.r.draw.clear()
        this.r.draw.setPosition(this.getPos())
        //this.r.draw.setRotation(rss.toDeg(this.getAngle()))
        this.r.draw.drawPoly(
            rss.starVerts(5, this.r.radius, this.r.radius * 0.5, this.r.radius * 0.2),
            rss.setAlpha(this.getColor(), 128),
            rss.ui.linewidth,
            rss.setAlpha(this.getColor(), 255)
        )
    },

    update: function() {
        if (this.r.shouldDraw) {
            this.draw()
        }
    }
})

Star.create = function(args) {
    return new Star(args).init()
}
var CompositeSprite = cc.Sprite.extend({
    child_resources: null,
    components: null,

    ctor: function(resources) {
        cc.log("Sprite.ctor ...")
        this._super(resources.shift());

        this.child_resources = resources
        this.init()
    },

    init: function() {
        this.setChildren(this.child_resources)
    },

    setChildren: function(resources) {
        this.removeAllChildren()
        resources.forEach(function(res, index){
            var child = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(res))
            child.setPosition(cc.p(this.width / 2, this.height / 2))
            // Add children at successively higher z-values in order to stack them on top of each other.
            this.addChild(child, index)
        }, this)

        this.components = [this].concat(this.getChildren())
    },

    setCompColor: function (i, color) {
        this.components[i].color = color
    },

    setChildColor: function (i, color) {
        this.getChildren()[i].setColor(color)
    }
})
var World = rss.CircBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        this._super()

        this.draw()

        return this
    },

    draw: function() {
        this.r.draw.clear()
        this.drawCircle()
        this.drawDot()
    },

    drawCircle: function() {
        this.r.draw.drawCircle(
            this.getPos(),
            this.getRadius() + rss.ui.linewidth,
            0,
            this.getRadius() * 2,
            false,
            rss.ui.linewidth * 2,
            rss.setAlpha(this.getColor(), 200)
        )
    },

    drawDot: function() {
        this.r.draw.drawDot(
            this.getPos(),
            this.getRadius(),
            rss.setAlpha(this.getColor(), 128)
        )
    }
})

World.create = function(args) {
    return new World(args).init()
}
rss.BaseLayer = cc.Layer.extend({
    ctor: function(){
        this._super();

        this.r = {}
    }
});
/* Listens for movement control inputs */

var MoveableObjectsLayer = rss.BaseLayer.extend({
    controllee: null,

    ctor: function (space) {
        this._super();
    },

    init: function () {
        this._super()

        this.constructListeners()
    },


})
var GameLayer = rss.BaseLayer.extend({
    ctor: function(space) {
        cc.log("GameLayer.ctor ...")
        this._super();

        //this._debugNode = new cc.PhysicsDebugNode(rss.game.space);
        //this._debugNode.setVisible(true);
        //this.addChild(this._debugNode, 10);

        this.constructListeners()
        cc.log("GameLayer.ctor")
    },

    constructListeners: function() {
        var that = this
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function (key, event) {
                if (key == cc.KEY.p) {
                    rss.keys[key] = !rss.keys[key];
                }
                else {
                    rss.keys[key] = true;
                }
            },
            onKeyReleased:function (key, event) {
                if (key != cc.KEY.p) {
                    rss.keys[key] = false;
                }
            }
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function() { rss.keys[cc.KEY.up] = true; return true },
            onTouchEnded: function () { rss.keys[cc.KEY.up] = false }
        }, this);
    },

    processTouchDragEvent:function (event) {
        //Example implementation
        var winSize = cc.director.getWinSize();
        var delta = event.getDelta();
        var curPos = this.man.getPos()
        curPos = cc.pAdd(curPos, delta);
        curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
        this.controllee.setPos(curPos.x, curPos.x)
        curPos = null;
    },

    init: function () {
        this._super()

        cc.spriteFrameCache.addSpriteFrames(rss.res.spritesheet_plist);

        this.initActors()

        rss.game.state = rss.game.states.ready
        cc.log("Ready!")

        return this
    },

    initActors: function() {
        cc.log("GameLayer.init ...")

        var level = new Level1({level: 1})
        this.addChild(level)
        level.init()
        level.setElasticity(0.0)
        level.setFriction(0.0)
        level.addToSpace(rss.game.space)
        this.r.level = level
        rss.world.state = rss.world.state.stopped

        var worldTop = this.getLevel().getWorld().getTop()

        var player = rss.Spaceship.create({
            pos: cc.p(),
            offset: cc.p(0, -10)
        })
        player.setPos(rss.p.addY(worldTop, player.getSize().height / 2 + 20))
        player.addToSpace(rss.game.space)
        this.addChild(player)
        player.setElasticity(0.0)
        player.setFriction(0.0)
        player.setGroup(rss.tag.player)
        player.setCollisionType(rss.tag.player)
        this.r.player = player

        var top = rss.top().y
        var grooveHeight = top - worldTop.y + 10
        var groove = rss.StaticRectBody.create({
            pos: cc.p(rss.center().x, worldTop.y + grooveHeight / 2),
            size: cc.size(0, grooveHeight)
        }).addToSpace(rss.game.space)
        groove.setJointPs([cc.p(0, groove.getSize().height / 2), cc.p(0, -1 * groove.getSize().height / 2)])
        groove.setGroup(rss.tag.player)
        groove.setSensor(true)

        rss.game.space.addConstraints(rss.grooveJoint(groove, this.getPlayer()))
    },
    
    getLevel: function() {
        return this.r.level
    },
    
    getPlayer: function() {
        return this.r.player
    },

    update: function(dt) {
        var angle = rss.toDeg(this.getLevel().getWorld().getAngle())

        if (rss.upInput() && (rss.game.state == rss.game.states.ready)) {
            rss.game.state = rss.game.states.touched
            this.getParent().getChildByTag(rss.tag.statsLayer).updateMsg("")
        }
        else if (angle > rss.landingPad.angle) {
            rss.game.state = rss.game.states.started
        }

        this.getPlayer().update(dt)
        this.getLevel().update(dt)
        this.getParent().getChildByTag(rss.tag.statsLayer).update()

        rss.game.space.gravity = rss.p.mult(rss.unitVecFromTo(this.getLevel().getWorld().getPos(), this.getPlayer().getPos()), rss.gravity)
    }
})

GameLayer.create = function(space) {
    return new GameLayer(space).init()
}
var StatsLayer = rss.BaseLayer.extend({
    FONT_SIZE: 20,
    MSG_FONT_SIZE: 40,

    ctor: function() {
        this._super()
    },

    init: function() {
        this._super()

        this.constructFuelMeter()
        this.constructAngleMeter()
        this.constructMsg()

        return this
    },

    constructFuelLabel: function() {
        var width = "Fuel: 100".length * this.FONT_SIZE
        this.fuel = cc.LabelTTF.create(
            "Fuel: 100",
            "res/Arial.ttf", this.FONT_SIZE,
            cc.size(width, 2 * this.FONT_SIZE),
            cc.TEXT_ALIGNMENT_LEFT, cc.TEXT_ALIGNMENT_CENTER
        )
        this.fuel.setPosition(rss.right().x - width, rss.top().y - 2 * this.FONT_SIZE)
        this.addChild(this.fuel)
    },

    constructFuelMeter: function() {
        var width = 30
        var height = 150
        this.graphicFuel = FuelMeter.create({
            pos: rss.p.add(rss.topRight(), cc.p(-width - 20, -height * 0.5 - 30)),
            size: cc.size(width, height)
        })
        this.addChild(this.graphicFuel)
    },

    constructAngleLabel: function() {
        var width = "Angle: 360".length * this.FONT_SIZE
        this.r.angle = cc.LabelTTF.create(
            "Angle: 0",
            "res/Arial.ttf", this.FONT_SIZE,
            cc.size(width, 2 * this.FONT_SIZE),
            cc.TEXT_ALIGNMENT_RIGHT, cc.TEXT_ALIGNMENT_CENTER
        )
        this.r.angle.setPosition(cc.p(rss.left().x + width / 2, rss.top().y - 2 * this.FONT_SIZE))
        this.addChild(this.r.angle)
    },

    constructAngleMeter: function() {
        var radius = 40
        this.graphicAngle = AngleMeter.create({
            pos: rss.p.add(rss.topLeft(), cc.p(radius + 20, -radius - 30)),
            radius: radius
        })
        this.addChild(this.graphicAngle)
    },

    constructMsg: function() {
        var msg = "Touch to begin!"
        var width = msg.length * this.MSG_FONT_SIZE
        this.msg = cc.LabelTTF.create(
            msg,
            "res/Arial.ttf", this.MSG_FONT_SIZE,
            cc.size(width, 2 * this.MSG_FONT_SIZE),
            cc.TEXT_ALIGNMENT_CENTER, cc.TEXT_ALIGNMENT_CENTER
        )
        this.msg.setPosition(rss.center())
        this.addChild(this.msg)
    },

    updateDistanceMeter: function(val) {
        this.graphicAngle.setLevel(val)
    },

    updateFuelMeter: function(val) {
        this.graphicFuel.setLevel(val)
    },

    updateMsg: function(msg) {
        this.msg.setString(msg)
    },

    update: function() {
        var gameLayer = this.getParent().getChildByTag(rss.tag.gameLayer)
        this.updateFuelMeter(gameLayer.getPlayer().getFuel() / 100)
        this.updateDistanceMeter(gameLayer.getLevel().getWorld().getAngle() / rss.twoPI)
    }
})

StatsLayer.create = function() {
    return new StatsLayer().init()
}
var MenuLayer = rss.BaseLayer.extend({
    ctor : function(){
        cc.log("MenuLayer.ctor ...")
        this._super();
    },

    init:function(){
        cc.log("MenuLayer.init ...")
        this._super();

        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        var menuItemPlay = new cc.MenuItemSprite(
            rss.ui.startButton().normal,
            rss.ui.startButton().selected,
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(centerpos);
        this.addChild(menu);

        return this
    },

    onPlay : function(){
        cc.log("MenuLayer.onPlay ...")
        cc.director.runScene(new GameScene());
    }
});

MenuLayer.create = function() {
    return new MenuLayer().init()
}
var GameOverLayer = rss.BaseLayer.extend({
    ctor : function(){
        cc.log("MenuLayer.ctor ...")
        this._super();
    },

    init:function(){
        cc.log("MenuLayer.init ...")
        this._super();

        var menuItemPlay = new cc.MenuItemSprite(
            rss.ui.restartButton().normal,
            rss.ui.restartButton().selected,
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(rss.center());
        this.addChild(menu);

        return this
    },

    onPlay : function(){
        cc.director.resume()
        cc.director.runScene(new GameScene());
    }
});

GameOverLayer.create = function() {
    return new GameOverLayer().init()
}
rss.BaseScene = cc.Scene.extend({
    ctor: function() {
        this._super()

        this.r = {}
    }
})
var MenuScene = rss.BaseScene.extend({
    onEnter:function () {
        cc.log("MenuScene.onEnter ...")
        this._super();

        this.addChild(MenuLayer.create());
    }
});

var GameScene = rss.BaseScene.extend({
    onEnter:function () {
        cc.log("Scene.onEnter ...")
        this._super()

        this.initPhysics()

        this.addChild(GameLayer.create(rss.game.space), 0, rss.tag.gameLayer)
        this.addChild(StatsLayer.create(), 0, rss.tag.statsLayer)

        this.scheduleUpdate();
    },
    
    initPhysics: function() {
        rss.game.space = new cp.Space()
        
        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.ground,
            this.collisionGroundBegin.bind(this),
            null,
            null,
            this.collisionGroundSeparate.bind(this));

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.fuel,
            this.collisionFuelBegin.bind(this),
            null,
            null,
            this.collisionFuelSeparate.bind(this))

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.landingPad,
            this.collisionLandingPadBegin.bind(this),
            null,
            null,
            this.collisionLandingPadSeparate.bind(this))

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.startFinish,
            this.collisionStartFinishBegin.bind(this),
            null,
            null,
            null)

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.star,
            this.collisionStarBegin.bind(this),
            null,
            null,
            null)
    },

    collisionGroundBegin:function () {
        if (rss.player.state != rss.player.states.refuelling) {
            cc.log("collisionGround.begin")
            var player = this.getChildByTag(rss.tag.gameLayer).player
            rss.player.state = rss.player.states.crashed
            cc.log("Game Over!")
            rss.stop()
            this.addChild(GameOverLayer.create())
        }
        // Absolutely required here - returning nothing gives same effect as returning false
        return true
    },

    
    collisionGroundSeparate: function() {
        cc.log("collisionGround.separate")
        if (rss.player.state != rss.player.states.refuelling) {
            rss.player.state = rss.player.states.flying
        }
    },

    collisionFuelBegin: function() {
        cc.log("collisionFuel.begin")
        rss.player.state = rss.player.states.refuelling

        // Absolutely required here - returning nothing gives same effect as returning false
        return true
    },

    collisionFuelSeparate: function() {
        cc.log("collisionFuel.separate")
        rss.player.state = rss.player.states.flying
    },

    collisionLandingPadBegin: function() {
        cc.log("collisionLandingPad.begin")
        rss.world.state = rss.world.states.stopped
        // Absolutely required here - returning nothing gives same effect as returning false
        return true
    },

    collisionLandingPadSeparate: function() {
        cc.log("collisionLandingPad.separate")
        if ((rss.game.state == rss.game.states.touched) || (rss.game.state == rss.game.states.started)) {
            rss.player.state = rss.player.states.flying
            rss.world.state = rss.world.states.moving
        }
    },

    collisionStartFinishBegin: function() {
        cc.log("collisionStartFinish.begin")
        if (rss.game.state == rss.game.states.started) {
            this.getChildByTag(rss.tag.statsLayer).updateMsg("Completed!")
            rss.stop()
            cc.log("GAME OVER")
            this.addChild(GameOverLayer.create())
        }
        return true
    },

    collisionStarBegin: function(arbiters) {
        cc.log("CollisionStarBegin")
        var that = this
        var gameLayer = this.getChildByTag(rss.tag.gameLayer)
        var shape = arbiters.getShapes()[1]
        cc.audioEngine.playEffect(rss.res.star_wav)
        gameLayer.getChildren().forEach(function(child) {
            if (((typeof child.getShape) != "undefined") && (child.getShape() == shape)) {
                that.addObjectToRemove(child)
            }
        })
    },
    
    addObjectToRemove: function(obj) {
        this.r.objectsToRemove.push(obj)
    },

    shouldPhysicsRun: function() {
        return !rss.pauseInput() && ((rss.game.state == rss.game.states.touched) || (rss.game.state == rss.game.states.started))
    },

    update: function(dt) {
        this.r.objectsToRemove = []

        if (!rss.pauseInput()) {
            rss.game.space.step(dt);
            this.getChildByTag(rss.tag.gameLayer).update(dt);
        }
        if (rss.restartInput()) {
            cc.director.runScene(new GameScene())
        }

        var that = this
        this.r.objectsToRemove.forEach(function(obj) {
            obj.removeFromSpace(rss.game.space)
        })
    }
})
var GameOverScene = rss.BaseScene.extend({
    onEnter:function () {
        cc.log("MenuScene.onEnter ...")
        this._super();

        this.addChild(GameOverLayer.create());
    }
});
