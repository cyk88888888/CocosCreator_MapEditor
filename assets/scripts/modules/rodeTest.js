System.register("chunks:///_virtual/Actor.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./NavUnit.ts"], (function(t) {
    "use strict";
    var a, o, e, s;
    return {
        setters: [function(t) {
            a = t.inheritsLoose
        }
        , function(t) {
            o = t.cclegacy,
            e = t._decorator
        }
        , function(t) {
            s = t.default
        }
        ],
        execute: function() {
            var r;
            o._RF.push({}, "697c0YMyJNE4YASev2ekfVg", "Actor", void 0);
            var c = e.ccclass;
            e.property,
            t("default", c("Actor")(r = function(t) {
                function o() {
                    for (var a, o = arguments.length, e = new Array(o), s = 0; s < o; s++)
                        e[s] = arguments[s];
                    return (a = t.call.apply(t, [this].concat(e)) || this)._lastRoadNode = null,
                    a
                }
                a(o, t);
                var e = o.prototype;
                return e.onLoad = function() {
                    t.prototype.onLoad.call(this)
                }
                ,
                e.start = function() {
                    t.prototype.start.call(this)
                }
                ,
                e.update = function(a) {
                    t.prototype.update.call(this, a),
                    this.updateActorStateByNode()
                }
                ,
                e.updateActorStateByNode = function() {
                    var t = this.roadNode;
                    if (t != this._lastRoadNode && (this._lastRoadNode = t,
                    this._lastRoadNode))
                        switch (this._lastRoadNode.value) {
                        case 2:
                            .4 != this.alpha && (this.alpha = .4);
                            break;
                        case 3:
                            this.alpha > 0 && (this.alpha = 0);
                            break;
                        default:
                            this.alpha < 1 && (this.alpha = 1)
                        }
                }
                ,
                o
            }(s)) || r);
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Actor2.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Unit.ts", "./Actor.ts"], (function(t) {
    "use strict";
    var i, e, o, r, s, n, a, l, c, h, p, u, f;
    return {
        setters: [function(t) {
            i = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            o = t.initializerDefineProperty,
            r = t.assertThisInitialized,
            s = t.createClass
        }
        , function(t) {
            n = t.cclegacy,
            a = t._decorator,
            l = t.CCBoolean,
            c = t.CCFloat,
            h = t.CCInteger,
            p = t.Vec2
        }
        , function(t) {
            u = t.UnitState
        }
        , function(t) {
            f = t.default
        }
        ],
        execute: function() {
            var g, d, m, v, C, y, b, P, R;
            n._RF.push({}, "f05eeJGSLFCfYlOD/5ZskEP", "Actor2", void 0);
            var w = a.ccclass
              , _ = a.property;
            t("default", (g = w("Actor2"),
            d = _(l),
            m = _(c),
            v = _(h),
            g((b = i((y = function(t) {
                function i() {
                    for (var i, e = arguments.length, s = new Array(e), n = 0; n < e; n++)
                        s[n] = arguments[n];
                    return i = t.call.apply(t, [this].concat(s)) || this,
                    o(i, "isPatrol", b, r(i)),
                    o(i, "patrolRange", P, r(i)),
                    o(i, "defaultDir", R, r(i)),
                    i.basePos = null,
                    i.targetPos = new p,
                    i.timer = 3.5,
                    i.isStopPatrol = !1,
                    i
                }
                e(i, t);
                var n = i.prototype;
                return n.start = function() {
                    t.prototype.start.call(this),
                    this.basePos = this.node.position,
                    this.timer = this.Range(.5, 1.5)
                }
                ,
                n.update = function(i) {
                    t.prototype.update.call(this, i),
                    this.isStopPatrol || this.isPatrol && (this.timer -= i,
                    this.timer <= 0 && (this.timer = this.Range(1.5, 4),
                    this.patrol()))
                }
                ,
                n.Range = function(t, i) {
                    return i > t ? Math.random() * (i - t) + t : Math.random() * (t - i) + i
                }
                ,
                n.patrol = function() {
                    this.targetPos.x = this.basePos.x + this.Range(-this.patrolRange, this.patrolRange),
                    this.targetPos.y = this.basePos.y + this.Range(-this.patrolRange, this.patrolRange),
                    this.navTo(this.targetPos.x, this.targetPos.y)
                }
                ,
                s(i, [{
                    key: "direction",
                    get: function() {
                        return this._direction
                    },
                    set: function(t) {
                        var i;
                        (this._direction = t,
                        t > 4) ? (this.movieClip.rowIndex = 4 - t % 4,
                        (i = this.movieClip.node.scale).x = -1,
                        this.movieClip.node.scale = i) : (this.movieClip.rowIndex = t,
                        (i = this.movieClip.node.scale).x = 1,
                        this.movieClip.node.scale = i)
                    }
                }, {
                    key: "state",
                    get: function() {
                        return this._state
                    },
                    set: function(t) {
                        this._state = t;
                        var i = this.movieClip.col / 2;
                        switch (this._state) {
                        case u.idle:
                            this.movieClip.begin = 0,
                            this.movieClip.end = i;
                            break;
                        case u.walk:
                            this.movieClip.begin = i,
                            this.movieClip.end = this.movieClip.col
                        }
                    }
                }]),
                i
            }(f)).prototype, "isPatrol", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !0
                }
            }),
            P = i(y.prototype, "patrolRange", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 200
                }
            }),
            R = i(y.prototype, "defaultDir", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            C = y)) || C));
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Agent.ts", ["cc", "./Common.ts"], (function(i) {
    "use strict";
    var t, e, s, n, o;
    return {
        setters: [function(i) {
            t = i.cclegacy
        }
        , function(i) {
            e = i.RVOMath,
            s = i.Vector2,
            n = i.KeyValuePair,
            o = i.Line
        }
        ],
        execute: function() {
            t._RF.push({}, "99d7fX9+uZBBrp6k8HimNAB", "Agent", void 0);
            i("Agent", function() {
                function i() {
                    this.agentNeighbors_ = [],
                    this.obstaclNeighbors_ = [],
                    this.orcaLines_ = [],
                    this.position_ = new s(0,0),
                    this.prefVelocity_ = new s(0,0),
                    this.velocity_ = new s(0,0),
                    this.id = 0,
                    this.maxNeighbors_ = 0,
                    this.maxSpeed_ = 0,
                    this.neighborDist = 0,
                    this.radius_ = 0,
                    this.timeHorizon = 0,
                    this.timeHorizonObst = 0,
                    this.newVelocity_ = new s(0,0),
                    this.mass = 1
                }
                var t = i.prototype;
                return t.computeNeighbors = function(i) {
                    this.obstaclNeighbors_.length = 0;
                    var t = Math.pow(this.timeHorizonObst * this.maxSpeed_ + this.radius_, 2);
                    i.kdTree.computeObstacleNeighbors(this, t),
                    this.agentNeighbors_.length = 0,
                    this.maxNeighbors_ > 0 && (t = Math.pow(this.neighborDist, 2),
                    t = i.kdTree.computeAgentNeighbors(this, t))
                }
                ,
                t.computeNewVelocity = function(i) {
                    this.orcaLines_.length = 0;
                    for (var t = this.orcaLines_, n = 1 / this.timeHorizonObst, r = 0; r < this.obstaclNeighbors_.length; ++r) {
                        for (var a = this.obstaclNeighbors_[r].value, c = a.next, h = a.point.minus(this.position_), l = c.point.minus(this.position_), u = !1, p = 0; p < t.length; ++p)
                            if (e.det(h.scale(n).minus(t[p].point), t[p].direction) - n * this.radius_ >= -e.RVO_EPSILON && e.det(l.scale(n).minus(t[p].point), t[p].direction) - n * this.radius_ >= -e.RVO_EPSILON) {
                                u = !0;
                                break
                            }
                        if (!u) {
                            var d = e.absSq(h)
                              , _ = e.absSq(l)
                              , m = e.sqr(this.radius_)
                              , y = c.point.minus(a.point)
                              , g = h.scale(-1).multiply(y) / e.absSq(y)
                              , v = e.absSq(h.scale(-1).minus(y.scale(g)))
                              , b = new o;
                            if (g < 0 && d <= m)
                                a.convex && (b.point = new s(0,0),
                                b.direction = e.normalize(new s(-h.y,h.x)),
                                t.push(b));
                            else if (g > 1 && _ <= m)
                                c.convex && e.det(l, c.direction) >= 0 && (b.point = new s(0,0),
                                b.direction = e.normalize(new s(-l.y,l.x)),
                                t.push(b));
                            else if (g >= 0 && g <= 1 && v <= m)
                                b.point = new s(0,0),
                                b.direction = a.direction.scale(-1),
                                t.push(b);
                            else {
                                var f = void 0
                                  , x = void 0;
                                if (g < 0 && v <= m) {
                                    if (!a.convex)
                                        continue;
                                    c = a;
                                    var w = Math.sqrt(d - m);
                                    f = new s(h.x * w - h.y * this.radius_,h.x * this.radius_ + h.y * w).scale(1 / d),
                                    x = new s(h.x * w + h.y * this.radius_,-h.x * this.radius_ + h.y * w).scale(1 / d)
                                } else if (g > 1 && v <= m) {
                                    if (!c.convex)
                                        continue;
                                    a = c;
                                    var N = Math.sqrt(_ - m);
                                    f = new s(l.x * N - l.y * this.radius_,l.x * this.radius_ + l.y * N).scale(1 / _),
                                    x = new s(l.x * N + l.y * this.radius_,-l.x * this.radius_ + l.y * N).scale(1 / _)
                                } else {
                                    if (a.convex) {
                                        var q = Math.sqrt(d - m);
                                        f = new s(h.x * q - h.y * this.radius_,h.x * this.radius_ + h.y * q).scale(1 / d)
                                    } else
                                        f = a.direction.scale(-1);
                                    if (c.convex) {
                                        var S = Math.sqrt(_ - m);
                                        x = new s(l.x * S + l.y * this.radius_,-l.x * this.radius_ + l.y * S).scale(1 / _)
                                    } else
                                        x = a.direction
                                }
                                var V = a.previous
                                  , M = !1
                                  , O = !1;
                                a.convex && e.det(f, V.direction.scale(-1)) >= 0 && (f = V.direction.scale(-1),
                                M = !0),
                                c.convex && e.det(x, c.direction) <= 0 && (x = c.direction,
                                O = !0);
                                var P = a.point.minus(this.position_).scale(n)
                                  , z = c.point.minus(this.position_).scale(n)
                                  , L = z.minus(P)
                                  , k = a == c ? .5 : this.velocity_.minus(P).multiply(L) / e.absSq(L)
                                  , R = this.velocity_.minus(P).multiply(f)
                                  , A = this.velocity_.minus(z).multiply(x);
                                if (k < 0 && R < 0 || a == c && R < 0 && A < 0) {
                                    var H = e.normalize(this.velocity_.minus(P));
                                    b.direction = new s(H.y,-H.x),
                                    b.point = P.plus(H.scale(this.radius_ * n)),
                                    t.push(b)
                                } else if (k > 1 && A < 0) {
                                    var E = e.normalize(this.velocity_.minus(z));
                                    b.direction = new s(E.y,-E.x),
                                    b.point = z.plus(E.scale(this.radius_ * n)),
                                    t.push(b)
                                } else {
                                    var I = k < 0 || k > 1 || a == c ? 1 / 0 : e.absSq(this.velocity_.minus(L.scale(k).plus(P)))
                                      , B = R < 0 ? 1 / 0 : e.absSq(this.velocity_.minus(f.scale(R).plus(P)))
                                      , D = A < 0 ? 1 / 0 : e.absSq(this.velocity_.minus(x.scale(A).plus(z)));
                                    if (I <= B && I <= D) {
                                        b.direction = a.direction.scale(-1);
                                        var F = new s(-b.direction.y,b.direction.x);
                                        b.point = F.scale(this.radius_ * n).plus(P),
                                        t.push(b)
                                    } else if (B <= D) {
                                        if (M)
                                            continue;
                                        b.direction = f;
                                        var T = new s(-b.direction.y,b.direction.x);
                                        b.point = T.scale(this.radius_ * n).plus(P),
                                        t.push(b)
                                    } else if (!O) {
                                        b.direction = x.scale(-1);
                                        var C = new s(-b.direction.y,b.direction.x);
                                        b.point = C.scale(this.radius_ * n).plus(z),
                                        t.push(b)
                                    }
                                }
                            }
                        }
                    }
                    for (var K = t.length, X = 1 / this.timeHorizon, Z = 0; Z < this.agentNeighbors_.length; ++Z) {
                        var j = this.agentNeighbors_[Z].value
                          , G = j.position_.minus(this.position_)
                          , J = j.mass / (this.mass + j.mass)
                          , Q = this.mass / (this.mass + j.mass)
                          , U = J >= .5 ? this.velocity_.minus(this.velocity_.scale(J)).scale(2) : this.prefVelocity_.plus(this.velocity_.minus(this.prefVelocity_).scale(2 * J))
                          , W = Q >= .5 ? j.velocity_.scale(2).scale(1 - Q) : j.prefVelocity_.plus(j.velocity_.minus(j.prefVelocity_).scale(2 * Q))
                          , Y = U.minus(W)
                          , $ = e.absSq(G)
                          , ii = this.radius_ + j.radius_
                          , ti = e.sqr(ii)
                          , ei = new o
                          , si = void 0;
                        if ($ > ti) {
                            var ni = Y.minus(G.scale(X))
                              , oi = e.absSq(ni)
                              , ri = ni.multiply(G);
                            if (ri < 0 && e.sqr(ri) > ti * oi) {
                                var ai = Math.sqrt(oi)
                                  , ci = ni.scale(1 / ai);
                                ei.direction = new s(ci.y,-ci.x),
                                si = ci.scale(ii * X - ai)
                            } else {
                                var hi = Math.sqrt($ - ti);
                                if (e.det(G, ni) > 0) {
                                    var li = new s(G.x * hi - G.y * ii,G.x * ii + G.y * hi);
                                    ei.direction = li.scale(1 / $)
                                } else {
                                    var ui = new s(G.x * hi + G.y * ii,-G.x * ii + G.y * hi);
                                    ei.direction = ui.scale(-1 / $)
                                }
                                var pi = Y.multiply(ei.direction);
                                si = ei.direction.scale(pi).minus(Y)
                            }
                        } else {
                            var di = 1 / i
                              , _i = Y.minus(G.scale(di))
                              , mi = e.abs(_i)
                              , yi = _i.scale(1 / mi);
                            ei.direction = new s(yi.y,-yi.x),
                            si = yi.scale(ii * di - mi)
                        }
                        ei.point = U.plus(si.scale(J)),
                        t.push(ei)
                    }
                    var gi = this.linearProgram2(t, this.maxSpeed_, this.prefVelocity_, !1, this.newVelocity_);
                    gi < t.length && this.linearProgram3(t, K, gi, this.maxSpeed_, this.newVelocity_)
                }
                ,
                t.insertAgentNeighbor = function(i, t) {
                    if (this != i) {
                        var s = e.absSq(this.position_.minus(i.position_));
                        if (s < t) {
                            this.agentNeighbors_.length < this.maxNeighbors_ && this.agentNeighbors_.push(new n(s,i));
                            for (var o = this.agentNeighbors_.length - 1; 0 != o && s < this.agentNeighbors_[o - 1].key; )
                                this.agentNeighbors_[o] = this.agentNeighbors_[o - 1],
                                --o;
                            this.agentNeighbors_[o] = new n(s,i),
                            this.agentNeighbors_.length == this.maxNeighbors_ && (t = this.agentNeighbors_[this.agentNeighbors_.length - 1].key)
                        }
                    }
                    return t
                }
                ,
                t.insertObstacleNeighbor = function(i, t) {
                    var s = i.next
                      , o = e.distSqPointLineSegment(i.point, s.point, this.position_);
                    if (o < t) {
                        this.obstaclNeighbors_.push(new n(o,i));
                        for (var r = this.obstaclNeighbors_.length - 1; 0 != r && o < this.obstaclNeighbors_[r - 1].key; )
                            this.obstaclNeighbors_[r] = this.obstaclNeighbors_[r - 1],
                            --r;
                        this.obstaclNeighbors_[r] = new n(o,i)
                    }
                }
                ,
                t.update = function(i) {
                    this.velocity_.copy(this.newVelocity_),
                    this.position_.copy(this.position_.plus(this.velocity_.scale(i)))
                }
                ,
                t.linearProgram1 = function(i, t, s, n, o, r) {
                    var a = i[t].point.multiply(i[t].direction)
                      , c = e.sqr(a) + e.sqr(s) - e.absSq(i[t].point);
                    if (c < 0)
                        return !1;
                    for (var h = Math.sqrt(c), l = -a - h, u = -a + h, p = 0; p < t; ++p) {
                        var d = e.det(i[t].direction, i[p].direction)
                          , _ = e.det(i[p].direction, i[t].point.minus(i[p].point));
                        if (Math.abs(d) <= e.RVO_EPSILON) {
                            if (_ < 0)
                                return !1
                        } else {
                            var m = _ / d;
                            if (d >= 0 ? u = Math.min(u, m) : l = Math.max(l, m),
                            l > u)
                                return !1
                        }
                    }
                    if (o)
                        n.multiply(i[t].direction) > 0 ? r.copy(i[t].point.plus(i[t].direction.scale(u))) : r.copy(i[t].point.plus(i[t].direction.scale(l)));
                    else {
                        var y = i[t].direction.multiply(n.minus(i[t].point));
                        y < l ? r.copy(i[t].point.plus(i[t].direction.scale(l))) : y > u ? r.copy(i[t].point.plus(i[t].direction.scale(u))) : r.copy(i[t].point.plus(i[t].direction.scale(y)))
                    }
                    return !0
                }
                ,
                t.linearProgram2 = function(i, t, s, n, o) {
                    n ? o.copy(s.scale(t)) : e.absSq(s) > e.sqr(t) ? o.copy(e.normalize(s).scale(t)) : o.copy(s);
                    for (var r = 0; r < i.length; ++r)
                        if (e.det(i[r].direction, i[r].point.minus(o)) > 0) {
                            var a = o.clone();
                            if (!this.linearProgram1(i, r, t, s, n, o))
                                return o.copy(a),
                                r
                        }
                    return i.length
                }
                ,
                t.linearProgram3 = function(i, t, n, r, a) {
                    for (var c = 0, h = n; h < i.length; ++h)
                        if (e.det(i[h].direction, i[h].point.minus(a)) > c) {
                            for (var l = [], u = 0; u < t; ++u)
                                l.push(i[u]);
                            for (var p = t; p < h; ++p) {
                                var d = new o
                                  , _ = e.det(i[h].direction, i[p].direction);
                                if (Math.abs(_) <= e.RVO_EPSILON) {
                                    if (i[h].direction.multiply(i[p].direction) > 0)
                                        continue;
                                    d.point = i[h].point.plus(i[p].point).scale(.5)
                                } else
                                    d.point = i[h].point.plus(i[h].direction.scale(e.det(i[p].direction, i[h].point.minus(i[p].point)) / _));
                                d.direction = e.normalize(i[p].direction.minus(i[h].direction)),
                                l.push(d)
                            }
                            var m = a.clone();
                            this.linearProgram2(l, r, new s(-i[h].direction.y,i[h].direction.x), !0, a) < l.length && a.copy(m),
                            c = e.det(i[h].direction, i[h].point.minus(a))
                        }
                }
                ,
                i
            }());
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/AnimationController.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(e) {
    "use strict";
    var t, i, r, s, n, a, m, h, o, l, u, f, c, d;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            i = e.inheritsLoose,
            r = e.initializerDefineProperty,
            s = e.assertThisInitialized,
            n = e.createClass
        }
        , function(e) {
            a = e.cclegacy,
            m = e._decorator,
            h = e.SpriteFrame,
            o = e.CCFloat,
            l = e.CCInteger,
            u = e.CCBoolean,
            f = e.Sprite,
            c = e.UITransform,
            d = e.Component
        }
        ],
        execute: function() {
            var p, g, T, x, b, y, I, C, _, F, v, k, w, N, z;
            a._RF.push({}, "a5491LI8SNJ4YgtDHwBcK0d", "AnimationController", void 0);
            var D = m.ccclass
              , L = m.property;
            e("default", (p = D("AnimationController"),
            g = L(h),
            T = L(o),
            x = L(l),
            b = L({
                displayName: "是否倒播",
                tooltip: "勾选，倒着播放，不钩，顺序播放"
            }),
            y = L(u),
            I = L({
                tooltip: "勾选，播放完自动销毁"
            }),
            p((F = t((_ = function(e) {
                function t() {
                    for (var t, i = arguments.length, n = new Array(i), a = 0; a < i; a++)
                        n[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(n)) || this,
                    r(t, "images", F, s(t)),
                    r(t, "frameTime", v, s(t)),
                    r(t, "playTimes", k, s(t)),
                    r(t, "reverse", w, s(t)),
                    r(t, "autoPlayOnLoad", N, s(t)),
                    r(t, "autoDestroy", z, s(t)),
                    t.frameNum = 0,
                    t.frameIndex = 0,
                    t.nextFrameIndex = 0,
                    t.running = !0,
                    t.m_render = void 0,
                    t.time = 0,
                    t.completeTimesCallback = void 0,
                    t.completeCallback = void 0,
                    t.frameCallback = void 0,
                    t.currentTimes = 0,
                    t._uiTransform = null,
                    t
                }
                i(t, e);
                var a = t.prototype;
                return a.onLoad = function() {
                    this.m_render = this.getComponent(f)
                }
                ,
                a.start = function() {
                    0 != this.images.length && (this.frameNum = this.images.length),
                    this.running = this.autoPlayOnLoad,
                    this.reverse && (this.frameIndex = this.frameNum - 1,
                    this.nextFrameIndex = this.frameNum - 1)
                }
                ,
                a.update = function(e) {
                    if (this.running && 0 != this.images.length)
                        if (this.time -= e,
                        0 == this.playTimes || this.currentTimes != this.playTimes) {
                            if (this.time <= 0)
                                if (this.time = this.frameTime,
                                this.reverse) {
                                    if (this.frameIndex = (this.nextFrameIndex + this.frameNum) % this.frameNum,
                                    this.nextFrameIndex = this.frameIndex - 1,
                                    this.m_render.spriteFrame = this.images[this.frameIndex],
                                    this.m_render.spriteFrame) {
                                        t = this.m_render.spriteFrame.rect;
                                        this.uiTransform.width = t.width,
                                        this.uiTransform.height = t.height
                                    }
                                    null != this.frameCallback && this.frameCallback(this.frameIndex),
                                    0 == this.frameIndex && (this.currentTimes++,
                                    this.node.emit("completeTimes", this.currentTimes),
                                    null != this.completeTimesCallback && this.completeTimesCallback(this.currentTimes),
                                    0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                                    null != this.completeCallback && this.completeCallback(),
                                    this.autoDestroy && this.node.destroy()))
                                } else {
                                    if (this.frameIndex = this.nextFrameIndex % this.frameNum,
                                    this.nextFrameIndex = this.frameIndex + 1,
                                    this.m_render.spriteFrame = this.images[this.frameIndex],
                                    this.m_render.spriteFrame) {
                                        var t = this.m_render.spriteFrame.rect;
                                        this.uiTransform.width = t.width,
                                        this.uiTransform.height = t.height
                                    }
                                    null != this.frameCallback && this.frameCallback(this.frameIndex),
                                    this.frameIndex == this.frameNum - 1 && (this.currentTimes++,
                                    this.node.emit("completeTimes", this.currentTimes),
                                    null != this.completeTimesCallback && this.completeTimesCallback(this.currentTimes),
                                    0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                                    null != this.completeCallback && this.completeCallback(),
                                    this.autoDestroy && this.node.destroy()))
                                }
                        } else
                            this.running = !1
                }
                ,
                a.play = function(e, t) {
                    if (void 0 === e && (e = null),
                    void 0 === t && (t = null),
                    this.frameCallback = e,
                    this.completeCallback = t,
                    this.running = !0,
                    this.frameIndex = 0,
                    this.currentTimes = 0,
                    this.time = this.frameTime,
                    0 != this.images.length && (this.frameNum = this.images.length,
                    this.reverse && (this.frameIndex = this.frameNum - 1,
                    this.nextFrameIndex = this.frameNum - 1)),
                    this.m_render || (this.m_render = this.getComponent(f)),
                    this.m_render && (this.m_render.spriteFrame = this.images[0]),
                    this.m_render.spriteFrame) {
                        var i = this.m_render.spriteFrame.rect;
                        this.uiTransform.width = i.width,
                        this.uiTransform.height = i.height
                    }
                }
                ,
                a.gotoAndPlay = function(e) {
                    this.m_render || (this.m_render = this.getComponent(f)),
                    this.running = !0,
                    this.frameIndex = e,
                    this.nextFrameIndex = e,
                    this.currentTimes = 0
                }
                ,
                a.stop = function() {
                    this.running = !1
                }
                ,
                a.gotoAndStop = function(e) {
                    if (this.frameIndex = e,
                    this.frameIndex < 0 && (this.frameIndex = 0),
                    this.frameIndex > this.images.length - 1 && (this.frameIndex = this.images.length - 1),
                    this.m_render || (this.m_render = this.getComponent(f)),
                    this.m_render.spriteFrame = this.images[this.frameIndex],
                    this.m_render.spriteFrame) {
                        var t = this.m_render.spriteFrame.rect;
                        this.uiTransform.width = t.width,
                        this.uiTransform.height = t.height
                    }
                    this.running = !1
                }
                ,
                a.isPlayEnd = function() {
                    return this.frameIndex == this.frameNum
                }
                ,
                n(t, [{
                    key: "uiTransform",
                    get: function() {
                        return this._uiTransform || (this._uiTransform = this.node.getComponent(c)),
                        this._uiTransform
                    }
                }]),
                t
            }(d)).prototype, "images", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return []
                }
            }),
            v = t(_.prototype, "frameTime", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return .1
                }
            }),
            k = t(_.prototype, "playTimes", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            w = t(_.prototype, "reverse", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !1
                }
            }),
            N = t(_.prototype, "autoPlayOnLoad", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !0
                }
            }),
            z = t(_.prototype, "autoDestroy", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !1
                }
            }),
            C = _)) || C));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/AstarHoneycombRoadSeeker.ts", ["cc", "./BinaryTreeNode.ts", "./PathLog.ts", "./PathOptimize.ts"], (function(t) {
    "use strict";
    var e, s, i, h;
    return {
        setters: [function(t) {
            e = t.cclegacy
        }
        , function(t) {
            s = t.default
        }
        , function(t) {
            i = t.default
        }
        , function(t) {
            h = t.PathOptimize
        }
        ],
        execute: function() {
            e._RF.push({}, "470f8oyv3xHR719BwQrvDie", "AstarHoneycombRoadSeeker", void 0);
            t("default", function() {
                function t(t) {
                    this.COST_STRAIGHT = 10,
                    this.COST_DIAGONAL = 10,
                    this.maxStep = 1e3,
                    this._openlist = void 0,
                    this._closelist = void 0,
                    this._binaryTreeNode = new s,
                    this._startNode = void 0,
                    this._currentNode = void 0,
                    this._targetNode = void 0,
                    this._roadNodes = void 0,
                    this._round1 = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, -1]],
                    this._round2 = [[0, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]],
                    this._neighbours = null,
                    this._neighboursDic = {},
                    this.handle = -1,
                    this._pathOptimize = h.best,
                    this._isPassCallBack = null,
                    this._roadNodes = t
                }
                var e = t.prototype;
                return e.setMaxSeekStep = function(t) {
                    this.maxStep = t
                }
                ,
                e.setPathOptimize = function(t) {
                    this._pathOptimize = t
                }
                ,
                e.setPathQuadSeek = function(t) {}
                ,
                e.setRoadNodePassCondition = function(t) {
                    this._isPassCallBack = t
                }
                ,
                e.seekPath = function(t, e, s) {
                    if (this._startNode = t,
                    this._currentNode = t,
                    this._targetNode = e,
                    this._neighbours = this.getNeighbours(s),
                    !this._startNode || !this._targetNode)
                        return [];
                    if (this._startNode == this._targetNode)
                        return [this._targetNode];
                    if (!this.isCanPass(this._targetNode))
                        return i.log("目标不可达到："),
                        [];
                    this._startNode.g = 0,
                    this._startNode.resetTree(),
                    this._binaryTreeNode.refleshTag();
                    for (var h = 0; ; ) {
                        if (h > this.maxStep)
                            return i.log("没找到目标计算步骤为：", h),
                            [];
                        if (h++,
                        this.searchRoundNodes(this._currentNode),
                        this._binaryTreeNode.isTreeNull())
                            return i.log("没找到目标计算步骤为：", h),
                            [];
                        if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                        this._currentNode == this._targetNode)
                            return i.log("找到目标计算步骤为：", h),
                            this.getPath();
                        this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                    }
                    return []
                }
                ,
                e.seekPath2 = function(t, e, s) {
                    if (this._startNode = t,
                    this._currentNode = t,
                    this._targetNode = e,
                    this._neighbours = this.getNeighbours(s),
                    !this._startNode || !this._targetNode)
                        return [];
                    if (this._startNode == this._targetNode)
                        return [this._targetNode];
                    var h = this.maxStep;
                    this.isCanPass(this._targetNode) || (h = 3 * (Math.abs(this._targetNode.cx - this._startNode.cx) + Math.abs(this._targetNode.cy - this._startNode.cy))) > this.maxStep && (h = this.maxStep),
                    this._startNode.g = 0,
                    this._startNode.resetTree(),
                    this._binaryTreeNode.refleshTag();
                    for (var r = 0, o = null; ; ) {
                        if (r > h)
                            return i.log("没找到目标计算步骤为：", r),
                            this.seekPath(t, o, s);
                        if (r++,
                        this.searchRoundNodes(this._currentNode),
                        this._binaryTreeNode.isTreeNull())
                            return i.log("没找到目标计算步骤为：", r),
                            this.seekPath(t, o, s);
                        if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                        (null == o || this._currentNode.h < o.h) && (o = this._currentNode),
                        this._currentNode == this._targetNode)
                            return i.log("找到目标计算步骤为：", r),
                            this.getPath();
                        this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                    }
                    return this.seekPath(t, o, s)
                }
                ,
                e.getPath = function() {
                    for (var t, e, s, i, r, o, n = [], a = this._targetNode; a != this._startNode; )
                        n.unshift(a),
                        a = a.parent;
                    if (n.unshift(this._startNode),
                    this._pathOptimize == h.none)
                        return n;
                    for (var d = 1; d < n.length - 1; d++) {
                        t = n[d - 1],
                        e = n[d],
                        s = n[d + 1],
                        i = this.getHoneyPoint(t),
                        r = this.getHoneyPoint(e),
                        o = this.getHoneyPoint(s);
                        var u = e.cx == t.cx && e.cx == s.cx
                          , N = e.cy == t.cy && e.cy == s.cy && t.cx % 2 == e.cx % 2 && e.cx % 2 == s.cx % 2
                          , _ = i.hx == r.hx && r.hx == o.hx
                          , c = i.hy == r.hy && r.hy == o.hy;
                        (u || N || _ || c) && (n.splice(d, 1),
                        d--)
                    }
                    if (this._pathOptimize == h.better)
                        return n;
                    for (d = 0; d < n.length - 2; d++) {
                        for (var l = n[d], y = null, g = n.length - 1; g > d + 1; g--) {
                            var f = n[g];
                            if (this.isArriveBetweenTwoNodes(l, f)) {
                                y = f;
                                break
                            }
                        }
                        if (y) {
                            var x = g - d - 1;
                            n.splice(d + 1, x)
                        }
                    }
                    return n
                }
                ,
                e.isArriveBetweenTwoNodes = function(t, e) {
                    var s = this.getHoneyPoint(t)
                      , i = this.getHoneyPoint(e);
                    if (s.hx == i.hx && s.hy == i.hy)
                        return !1;
                    var h = Math.abs(i.hx - s.hx)
                      , o = Math.abs(i.hy - s.hy)
                      , n = 0;
                    i.hx > s.hx ? n = 1 : i.hx < s.hx && (n = -1);
                    var a = 0;
                    i.hy > s.hy ? a = 1 : i.hy < s.hy && (a = -1);
                    var d = 0
                      , u = 0
                      , N = 0
                      , _ = 0;
                    if (h > o)
                        for (var c = o / h, l = 0; l < h; l += 2) {
                            if (u = l * a * c,
                            N = a > 0 ? Math.floor(s.hy + u) : Math.ceil(s.hy + u),
                            _ = Math.abs(u % 1),
                            (y = new r).hx = s.hx + l * n,
                            y.hy = _ <= .5 ? N : N + 1 * a,
                            u = (l + 1) * a * c,
                            N = a > 0 ? Math.floor(s.hy + u) : Math.ceil(s.hy + u),
                            _ = Math.abs(u % 1),
                            (g = new r).hx = s.hx + (l + 1) * n,
                            g.hy = _ <= .5 ? N : N + 1 * a,
                            u = (l + 2) * a * c,
                            N = a > 0 ? Math.floor(s.hy + u) : Math.ceil(s.hy + u),
                            _ = Math.abs(u % 1),
                            (f = new r).hx = s.hx + (l + 2) * n,
                            f.hy = _ <= .5 ? N : N + 1 * a,
                            !this.isCrossAtAdjacentNodes(s, i, y, g, f))
                                return !1
                        }
                    else
                        for (c = h / o,
                        l = 0; l < o; l += 2) {
                            var y, g, f;
                            if (d = l * n * c,
                            N = n > 0 ? Math.floor(s.hx + d) : Math.ceil(s.hx + d),
                            _ = Math.abs(d % 1),
                            (y = new r).hx = _ <= .5 ? N : N + 1 * n,
                            y.hy = s.hy + l * a,
                            d = (l + 1) * n * c,
                            N = n > 0 ? Math.floor(s.hx + d) : Math.ceil(s.hx + d),
                            _ = Math.abs(d % 1),
                            (g = new r).hx = _ <= .5 ? N : N + 1 * n,
                            g.hy = s.hy + (l + 1) * a,
                            d = (l + 2) * n * c,
                            N = n > 0 ? Math.floor(s.hx + d) : Math.ceil(s.hx + d),
                            _ = Math.abs(d % 1),
                            (f = new r).hx = _ <= .5 ? N : N + 1 * n,
                            f.hy = s.hy + (l + 2) * a,
                            !this.isCrossAtAdjacentNodes(s, i, y, g, f))
                                return !1
                        }
                    return !0
                }
                ,
                e.isCrossAtAdjacentNodes = function(t, e, s, i, h) {
                    var r = this.getNodeByHoneyPoint(s.hx, s.hy)
                      , o = this.getNodeByHoneyPoint(i.hx, i.hy);
                    this.getNodeByHoneyPoint(h.hx, h.hy);
                    if (r == o)
                        return !1;
                    if (!this.isPassNode(r) || !this.isPassNode(o))
                        return !1;
                    if (!this.isCanPass(r) || !this.isCanPass(o))
                        return !1;
                    var n = s.hx - i.hx
                      , a = s.hy - i.hy
                      , d = h.hx - i.hx
                      , u = h.hy - i.hy;
                    if (Math.abs(n) > 1 || Math.abs(a) > 1 || Math.abs(d) > 1 || Math.abs(u) > 1)
                        return !1;
                    if (n == -a)
                        if (-1 == n) {
                            if (!this.isPassNode(this.getNodeByHoneyPoint(i.hx - 1, i.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(i.hx, i.hy + 1)))
                                return !1
                        } else if (!this.isPassNode(this.getNodeByHoneyPoint(i.hx + 1, i.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(i.hx, i.hy - 1)))
                            return !1;
                    if (i.hx == e.hx && i.hy == e.hy)
                        return !0;
                    if (d == -u)
                        if (-1 == d) {
                            if (!this.isPassNode(this.getNodeByHoneyPoint(i.hx - 1, i.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(i.hx, i.hy + 1)))
                                return !1
                        } else if (!this.isPassNode(this.getNodeByHoneyPoint(i.hx + 1, i.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(i.hx, i.hy - 1)))
                            return !1;
                    return s.hx == i.hx && i.hx == h.hx || !!this.isPassNode(this.getNodeByHoneyPoint(i.hx + (n + d), i.hy + (a + u)))
                }
                ,
                e.getHoneyPoint = function(t) {
                    var e = t.cy + Math.ceil(t.cx / 2)
                      , s = t.cy - Math.floor(t.cx / 2);
                    return new r(e,s)
                }
                ,
                e.getNodeByHoneyPoint = function(t, e) {
                    var s = t - e
                      , i = Math.floor((t - e) / 2) + e;
                    return this.getRoadNode(s, i)
                }
                ,
                e.getRoundNodeByIndex = function(t, e) {
                    if (!t)
                        return null;
                    var s;
                    e %= 6,
                    s = t.cx % 2 == 0 ? this._round1 : this._round2;
                    var i = t.cx + s[e][0]
                      , h = t.cy + s[e][1];
                    return this.getRoadNode(i, h)
                }
                ,
                e.getRoundNodes = function(t) {
                    var e;
                    e = t.cx % 2 == 0 ? this._round1 : this._round2;
                    for (var s = [], i = 0; i < e.length; i++) {
                        var h = t.cx + e[i][0]
                          , r = t.cy + e[i][1]
                          , o = this.getRoadNode(h, r);
                        s.push(o)
                    }
                    return s
                }
                ,
                e.isPassNode = function(t) {
                    return null != this._isPassCallBack ? this._isPassCallBack(t) : null != t && 1 != t.value
                }
                ,
                e.isCanPass = function(t) {
                    if (!this.isPassNode(t))
                        return !1;
                    if (null == this._neighbours || 0 == this._neighbours.length)
                        return !0;
                    for (var e = this.getHoneyPoint(t), s = 0; s < this._neighbours.length; s++) {
                        var i = e.hx + this._neighbours[s][0]
                          , h = e.hy + this._neighbours[s][1]
                          , r = this.getNodeByHoneyPoint(i, h);
                        if (!this.isPassNode(r))
                            return !1
                    }
                    return !0
                }
                ,
                e.getRoadNode = function(t, e) {
                    var s = t + "_" + e;
                    return this._roadNodes[s]
                }
                ,
                e.getNeighbours = function(t) {
                    if (0 == t)
                        return null;
                    var e = null;
                    if (null != this._neighboursDic[t])
                        e = this._neighboursDic[t];
                    else {
                        e = [];
                        this.getNeighboursRecursive(0, 0, t, 1, e, {}, {}, [[-1, -1], [-1, 0], [0, 1], [1, 1], [1, 0], [0, -1]]),
                        this._neighboursDic[t] = e
                    }
                    return e
                }
                ,
                e.getNeighboursRecursive = function(t, e, s, i, h, r, o, n) {
                    if (!(i > s)) {
                        r[u = t + "_" + e] = !0;
                        for (var a = n.length, d = 0; d < a; d++) {
                            var u, N = t + n[d][0], _ = e + n[d][1];
                            if (0 != N || 0 != _)
                                r[u = N + "_" + _] || (o[u] || (h.push([N, _]),
                                o[u] = !0),
                                this.getNeighboursRecursive(N, _, s, i + 1, h, r, o, n))
                        }
                    }
                }
                ,
                e.testSeekPathStep = function(t, e, s, h, r, o) {
                    var n = this;
                    if (void 0 === o && (o = 100),
                    this._startNode = t,
                    this._currentNode = t,
                    this._targetNode = e,
                    this._neighbours = this.getNeighbours(s),
                    this.isCanPass(this._targetNode)) {
                        this._startNode.g = 0,
                        this._startNode.resetTree(),
                        this._binaryTreeNode.refleshTag(),
                        this._closelist = [];
                        var a = 0;
                        clearInterval(this.handle),
                        this.handle = setInterval((function() {
                            return a > n.maxStep ? (i.log("没找到目标计算步骤为：", a),
                            void clearInterval(n.handle)) : (a++,
                            n.searchRoundNodes(n._currentNode),
                            n._binaryTreeNode.isTreeNull() ? (i.log("没找到目标计算步骤为：", a),
                            void clearInterval(n.handle)) : (n._currentNode = n._binaryTreeNode.getMin_F_Node(),
                            void (n._currentNode == n._targetNode ? (i.log("找到目标计算步骤为：", a),
                            clearInterval(n.handle),
                            n._openlist = n._binaryTreeNode.getOpenList(),
                            h.apply(r, [n._startNode, n._targetNode, n._currentNode, n._openlist, n._closelist, n.getPath()])) : (n._binaryTreeNode.setRoadNodeInCloseList(n._currentNode),
                            n._openlist = n._binaryTreeNode.getOpenList(),
                            n._closelist.push(n._currentNode),
                            h.apply(r, [n._startNode, n._targetNode, n._currentNode, n._openlist, n._closelist, null])))))
                        }
                        ), o)
                    }
                }
                ,
                e.searchRoundNodes = function(t) {
                    var e;
                    e = t.cx % 2 == 0 ? this._round1 : this._round2;
                    for (var s = 0; s < e.length; s++) {
                        var i = t.cx + e[s][0]
                          , h = t.cy + e[s][1]
                          , r = this.getRoadNode(i, h);
                        this.isPassNode(r) && this.isCanPass(r) && r != this._startNode && !this.isInCloseList(r) && this.setNodeF(r)
                    }
                }
                ,
                e.setNodeF = function(t) {
                    var e;
                    e = t.cx == this._currentNode.cx || t.cy == this._currentNode.cy ? this._currentNode.g + this.COST_STRAIGHT : this._currentNode.g + this.COST_DIAGONAL,
                    this.isInOpenList(t) ? e < t.g && (t.g = e,
                    t.parent = this._currentNode,
                    t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                    t.f = t.g + t.h,
                    this._binaryTreeNode.removeTreeNode(t),
                    this._binaryTreeNode.addTreeNode(t)) : (t.g = e,
                    this._binaryTreeNode.setRoadNodeInOpenList(t),
                    t.resetTree(),
                    t.parent = this._currentNode,
                    t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                    t.f = t.g + t.h,
                    this._binaryTreeNode.addTreeNode(t))
                }
                ,
                e.isInOpenList = function(t) {
                    return this._binaryTreeNode.isInOpenList(t)
                }
                ,
                e.isInCloseList = function(t) {
                    return this._binaryTreeNode.isInCloseList(t)
                }
                ,
                e.dispose = function() {
                    this._roadNodes = null,
                    this._round1 = null,
                    this._round2 = null
                }
                ,
                t
            }());
            var r = function(t, e) {
                void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                this.hx = 0,
                this.hy = 0,
                this.hx = t,
                this.hy = e
            };
            e._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/AStarRoadSeeker.ts", ["cc", "./BinaryTreeNode.ts", "./PathLog.ts", "./PathOptimize.ts", "./PathQuadSeek.ts"], (function(t) {
    "use strict";
    var e, s, i, r, o;
    return {
        setters: [function(t) {
            e = t.cclegacy
        }
        , function(t) {
            s = t.default
        }
        , function(t) {
            i = t.default
        }
        , function(t) {
            r = t.PathOptimize
        }
        , function(t) {
            o = t.PathQuadSeek
        }
        ],
        execute: function() {
            e._RF.push({}, "a3a193EdkVIWoDgtJ/bBisA", "AStarRoadSeeker", void 0);
            t("default", function() {
                function t(t) {
                    this.COST_STRAIGHT = 10,
                    this.COST_DIAGONAL = 14,
                    this.maxStep = 1e3,
                    this._openlist = void 0,
                    this._closelist = void 0,
                    this._binaryTreeNode = new s,
                    this._startNode = void 0,
                    this._currentNode = void 0,
                    this._targetNode = void 0,
                    this._roadNodes = void 0,
                    this._round1 = [[0, -1], [1, 0], [0, 1], [-1, 0]],
                    this._round2 = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
                    this._round = this._round2,
                    this._neighbours = null,
                    this._neighboursDic = {},
                    this.handle = -1,
                    this._pathOptimize = r.best,
                    this._pathQuadSeek = o.path_dire_8,
                    this._isPassCallBack = null,
                    this._roadNodes = t
                }
                var e = t.prototype;
                return e.setMaxSeekStep = function(t) {
                    this.maxStep = t
                }
                ,
                e.setPathOptimize = function(t) {
                    this._pathOptimize = t
                }
                ,
                e.setPathQuadSeek = function(t) {
                    this._pathQuadSeek = t,
                    this._pathQuadSeek == o.path_dire_4 ? this._round = this._round1 : this._round = this._round2
                }
                ,
                e.setRoadNodePassCondition = function(t) {
                    this._isPassCallBack = t
                }
                ,
                e.seekPath = function(t, e, s) {
                    if (this._startNode = t,
                    this._currentNode = t,
                    this._targetNode = e,
                    this._neighbours = this.getNeighbours(s),
                    !this._startNode || !this._targetNode)
                        return [];
                    if (this._startNode == this._targetNode)
                        return [this._targetNode];
                    if (!this.isCanPass(this._targetNode))
                        return i.log("目标不可达到："),
                        [];
                    this._startNode.g = 0,
                    this._startNode.resetTree(),
                    this._binaryTreeNode.refleshTag();
                    for (var r = 0; ; ) {
                        if (r > this.maxStep)
                            return i.log("没找到目标计算步骤为：", r),
                            [];
                        if (r++,
                        this.searchRoundNodes(this._currentNode),
                        this._binaryTreeNode.isTreeNull())
                            return i.log("没找到目标计算步骤为：", r),
                            [];
                        if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                        this._currentNode == this._targetNode)
                            return i.log("找到目标计算步骤为：", r),
                            this.getPath();
                        this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                    }
                    return []
                }
                ,
                e.seekPath2 = function(t, e, s) {
                    if (void 0 === s && (s = 0),
                    this._startNode = t,
                    this._currentNode = t,
                    this._targetNode = e,
                    this._neighbours = this.getNeighbours(s),
                    !this._startNode || !this._targetNode)
                        return [];
                    if (this._startNode == this._targetNode)
                        return [this._targetNode];
                    var r = this.maxStep;
                    this.isCanPass(this._targetNode) || (r = 3 * (Math.abs(this._targetNode.cx - this._startNode.cx) + Math.abs(this._targetNode.cy - this._startNode.cy))) > this.maxStep && (r = this.maxStep),
                    this._startNode.g = 0,
                    this._startNode.resetTree(),
                    this._binaryTreeNode.refleshTag();
                    for (var o = 0, a = null; ; ) {
                        if (o > r)
                            return i.log("没找到目标计算步骤为：", o),
                            this.seekPath(t, a, s);
                        if (o++,
                        this.searchRoundNodes(this._currentNode),
                        this._binaryTreeNode.isTreeNull())
                            return i.log("没找到目标计算步骤为：", o),
                            this.seekPath(t, a, s);
                        if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                        (null == a || this._currentNode.h < a.h) && (a = this._currentNode),
                        this._currentNode == this._targetNode)
                            return i.log("找到目标计算步骤为：", o),
                            this.getPath();
                        this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                    }
                    return this.seekPath(t, a, s)
                }
                ,
                e.getPath = function() {
                    for (var t = [], e = this._targetNode; e != this._startNode; )
                        t.unshift(e),
                        e = e.parent;
                    if (t.unshift(this._startNode),
                    this._pathOptimize == r.none)
                        return t;
                    for (var s = 1; s < t.length - 1; s++) {
                        var i = t[s - 1]
                          , a = t[s]
                          , h = t[s + 1]
                          , n = a.cx == i.cx && a.cx == h.cx
                          , d = a.cy == i.cy && a.cy == h.cy
                          , c = !1;
                        this._pathQuadSeek == o.path_dire_8 && (c = (a.cx - i.cx) / (a.cy - i.cy) * ((h.cx - a.cx) / (h.cy - a.cy)) == 1),
                        (n || d || c) && (t.splice(s, 1),
                        s--)
                    }
                    if (this._pathQuadSeek == o.path_dire_4)
                        return t;
                    if (this._pathOptimize == r.better)
                        return t;
                    for (s = 0; s < t.length - 2; s++) {
                        for (var _ = t[s], u = null, N = t.length - 1; N > s + 1; N--) {
                            var l = t[N];
                            if (_.cx != l.cx && _.cy != l.cy && Math.abs(l.cx - _.cx) != Math.abs(l.cy - _.cy) && this.isArriveBetweenTwoNodes(_, l)) {
                                u = l;
                                break
                            }
                        }
                        if (u) {
                            var g = N - s - 1;
                            t.splice(s + 1, g)
                        }
                    }
                    return t
                }
                ,
                e.isArriveBetweenTwoNodes = function(t, e) {
                    if (t == e)
                        return !1;
                    var s = Math.abs(e.cx - t.cx)
                      , i = Math.abs(e.cy - t.cy)
                      , r = 0;
                    e.cx > t.cx ? r = 1 : e.cx < t.cx && (r = -1);
                    var o = 0;
                    e.cy > t.cy ? o = 1 : e.cy < t.cy && (o = -1);
                    var a = 0
                      , h = 0
                      , n = 0
                      , d = 0;
                    if (s > i)
                        for (var c = i / s, _ = 0; _ < s; _++) {
                            h = t.cy + _ * o * c,
                            n = Math.floor(h),
                            d = h % 1;
                            var u = t.cx + _ * r
                              , N = d <= .5 ? n : n + 1;
                            h = t.cy + (_ + 1) * o * c,
                            n = Math.floor(h),
                            d = h % 1;
                            var l = t.cx + (_ + 1) * r
                              , g = d <= .5 ? n : n + 1
                              , f = this.getRoadNode(u, N)
                              , y = this.getRoadNode(l, g);
                            if (!this.isCrossAtAdjacentNodes(f, y))
                                return !1
                        }
                    else
                        for (c = s / i,
                        _ = 0; _ < i; _++) {
                            a = _ * r * c,
                            n = r > 0 ? Math.floor(t.cx + a) : Math.ceil(t.cx + a);
                            u = (d = Math.abs(a % 1)) <= .5 ? n : n + 1 * r,
                            N = t.cy + _ * o;
                            a = (_ + 1) * r * c,
                            n = r > 0 ? Math.floor(t.cx + a) : Math.ceil(t.cx + a);
                            l = (d = Math.abs(a % 1)) <= .5 ? n : n + 1 * r,
                            g = t.cy + (_ + 1) * o,
                            f = this.getRoadNode(u, N),
                            y = this.getRoadNode(l, g);
                            if (!this.isCrossAtAdjacentNodes(f, y))
                                return !1
                        }
                    return !0
                }
                ,
                e.isCrossAtAdjacentNodes = function(t, e) {
                    if (t == e)
                        return !1;
                    if (!this.isPassNode(t) || !this.isPassNode(e))
                        return !1;
                    if (!this.isCanPass(t) || !this.isCanPass(e))
                        return !1;
                    var s = e.cx - t.cx
                      , i = e.cy - t.cy;
                    return !(Math.abs(s) > 1 || Math.abs(i) > 1) && (t.cx == e.cx || t.cy == e.cy || !(!this.isPassNode(this.getRoadNode(t.cx, t.cy + i)) || !this.isPassNode(this.getRoadNode(t.cx + s, t.cy))))
                }
                ,
                e.isPassNode = function(t) {
                    return null != this._isPassCallBack ? this._isPassCallBack(t) : null != t && 1 != t.value
                }
                ,
                e.isCanPass = function(t) {
                    if (!this.isPassNode(t))
                        return !1;
                    if (null == this._neighbours || 0 == this._neighbours.length)
                        return !0;
                    for (var e = 0; e < this._neighbours.length; e++) {
                        var s = t.cx + this._neighbours[e][0]
                          , i = t.cy + this._neighbours[e][1]
                          , r = this.getRoadNode(s, i);
                        if (!this.isPassNode(r))
                            return !1
                    }
                    return !0
                }
                ,
                e.getRoadNode = function(t, e) {
                    var s = t + "_" + e;
                    return this._roadNodes[s]
                }
                ,
                e.getNeighbours = function(t) {
                    if (0 == t)
                        return null;
                    var e = null;
                    if (null != this._neighboursDic[t])
                        e = this._neighboursDic[t];
                    else {
                        e = [];
                        for (var s = -t; s <= t; s++)
                            for (var i = -t; i <= t; i++)
                                0 == i && 0 == s || Math.abs(i) + Math.abs(s) > t || e.push([i, s]);
                        this._neighboursDic[t] = e
                    }
                    return e
                }
                ,
                e.testSeekPathStep = function(t, e, s, r, o, a) {
                    var h = this;
                    if (void 0 === a && (a = 100),
                    this._startNode = t,
                    this._currentNode = t,
                    this._targetNode = e,
                    this._neighbours = this.getNeighbours(s),
                    this.isCanPass(this._targetNode)) {
                        this._startNode.g = 0,
                        this._startNode.resetTree(),
                        this._binaryTreeNode.refleshTag(),
                        this._closelist = [];
                        var n = 0;
                        clearInterval(this.handle),
                        this.handle = setInterval((function() {
                            return n > h.maxStep ? (i.log("没找到目标计算步骤为：", n),
                            void clearInterval(h.handle)) : (n++,
                            h.searchRoundNodes(h._currentNode),
                            h._binaryTreeNode.isTreeNull() ? (i.log("没找到目标计算步骤为：", n),
                            void clearInterval(h.handle)) : (h._currentNode = h._binaryTreeNode.getMin_F_Node(),
                            void (h._currentNode == h._targetNode ? (i.log("找到目标计算步骤为：", n),
                            clearInterval(h.handle),
                            h._openlist = h._binaryTreeNode.getOpenList(),
                            r.apply(o, [h._startNode, h._targetNode, h._currentNode, h._openlist, h._closelist, h.getPath()])) : (h._binaryTreeNode.setRoadNodeInCloseList(h._currentNode),
                            h._openlist = h._binaryTreeNode.getOpenList(),
                            h._closelist.push(h._currentNode),
                            r.apply(o, [h._startNode, h._targetNode, h._currentNode, h._openlist, h._closelist, null])))))
                        }
                        ), a)
                    }
                }
                ,
                e.searchRoundNodes = function(t) {
                    for (var e = 0; e < this._round.length; e++) {
                        var s = t.cx + this._round[e][0]
                          , i = t.cy + this._round[e][1]
                          , r = this.getRoadNode(s, i);
                        this.isPassNode(r) && this.isCanPass(r) && r != this._startNode && !this.isInCloseList(r) && !this.inInCorner(r) && this.setNodeF(r)
                    }
                }
                ,
                e.setNodeF = function(t) {
                    var e;
                    e = t.cx == this._currentNode.cx || t.cy == this._currentNode.cy ? this._currentNode.g + this.COST_STRAIGHT : this._currentNode.g + this.COST_DIAGONAL,
                    this.isInOpenList(t) ? e < t.g && (t.g = e,
                    t.parent = this._currentNode,
                    t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                    t.f = t.g + t.h,
                    this._binaryTreeNode.removeTreeNode(t),
                    this._binaryTreeNode.addTreeNode(t)) : (t.g = e,
                    this._binaryTreeNode.setRoadNodeInOpenList(t),
                    t.resetTree(),
                    t.parent = this._currentNode,
                    t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                    t.f = t.g + t.h,
                    this._binaryTreeNode.addTreeNode(t))
                }
                ,
                e.isInOpenList = function(t) {
                    return this._binaryTreeNode.isInOpenList(t)
                }
                ,
                e.isInCloseList = function(t) {
                    return this._binaryTreeNode.isInCloseList(t)
                }
                ,
                e.inInCorner = function(t) {
                    if (this._pathQuadSeek == o.path_dire_4)
                        return !1;
                    if (t.cx == this._currentNode.cx || t.cy == this._currentNode.cy)
                        return !1;
                    var e = this.getRoadNode(this._currentNode.cx, t.cy)
                      , s = this.getRoadNode(t.cx, this._currentNode.cy);
                    return !this.isPassNode(e) || !this.isPassNode(s)
                }
                ,
                e.dispose = function() {
                    this._roadNodes = null,
                    this._round = null
                }
                ,
                t
            }());
            e._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/BaseView.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Behaviour.ts"], (function(t) {
    "use strict";
    var e, i, n, o, r, a, s, c, l, u, h;
    return {
        setters: [function(t) {
            e = t.applyDecoratedDescriptor,
            i = t.inheritsLoose,
            n = t.initializerDefineProperty,
            o = t.assertThisInitialized
        }
        , function(t) {
            r = t.cclegacy,
            a = t._decorator,
            s = t.Node,
            c = t.UITransform,
            l = t.Vec3,
            u = t.view
        }
        , function(t) {
            h = t.Behaviour
        }
        ],
        execute: function() {
            var p, f, g, d, y, v, w, b, T, _, D;
            r._RF.push({}, "fa0a6xU1slHuanA+q9oE3z8", "BaseView", void 0);
            var B = a.ccclass
              , C = a.property;
            t("default", (p = B("BaseView"),
            f = C({
                tooltip: "窗口是否可拖拽:\n勾选可拖拽 \n不勾选不可拖拽"
            }),
            g = C(s),
            d = C(s),
            y = C(s),
            p((b = e((w = function(t) {
                function e() {
                    for (var e, i = arguments.length, r = new Array(i), a = 0; a < i; a++)
                        r[a] = arguments[a];
                    return e = t.call.apply(t, [this].concat(r)) || this,
                    n(e, "canDrag", b, o(e)),
                    n(e, "content", T, o(e)),
                    n(e, "title", _, o(e)),
                    n(e, "closeBtn", D, o(e)),
                    e._startDrag = !1,
                    e
                }
                i(e, t);
                var r = e.prototype;
                return r.onLoad = function() {
                    var t = this;
                    this.closeBtn.on(s.EventType.TOUCH_START, this.onCloseBtnClick, this),
                    this.canDrag && (this.title.on(s.EventType.TOUCH_START, (function(e) {
                        t._startDrag = !0
                    }
                    ), this),
                    this.title.on(s.EventType.TOUCH_END, (function(e) {
                        t._startDrag = !1
                    }
                    ), this),
                    this.node.on(s.EventType.TOUCH_MOVE, (function(e) {
                        if (t._startDrag) {
                            var i = t.node.parent.getComponent(c);
                            null == i && (i = t.node.parent.addComponent(c));
                            var n = i.convertToNodeSpaceAR(new l(e.getUILocation().x,e.getUILocation().y)).subtract(t.title.position)
                              , o = u.getVisibleSize();
                            n.x < -(o.width - t.width) / 2 ? n.x = -(o.width - t.width) / 2 : n.x > (o.width - t.width) / 2 && (n.x = (o.width - t.width) / 2),
                            n.y < -(o.height - t.height) / 2 ? n.y = -(o.height - t.height) / 2 : n.y > (o.height - t.height) / 2 && (n.y = (o.height - t.height) / 2),
                            t.node.position = n
                        }
                    }
                    ), this))
                }
                ,
                r.start = function() {}
                ,
                r.onCloseBtnClick = function(t) {
                    this.close()
                }
                ,
                r.open = function() {
                    this._startDrag = !1,
                    this.node.active = !0,
                    this.node.position = new l(0,0,0)
                }
                ,
                r.close = function() {
                    this.node.active = !1
                }
                ,
                e
            }(h)).prototype, "canDrag", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !0
                }
            }),
            T = e(w.prototype, "content", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            _ = e(w.prototype, "title", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            D = e(w.prototype, "closeBtn", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            v = w)) || v));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Behaviour.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(i) {
    "use strict";
    var t, o, s, n, r, e, l, h, a, f, c, u, g;
    return {
        setters: [function(i) {
            t = i.applyDecoratedDescriptor,
            o = i.inheritsLoose,
            s = i.initializerDefineProperty,
            n = i.assertThisInitialized,
            r = i.createClass
        }
        , function(i) {
            e = i.cclegacy,
            l = i._decorator,
            h = i.Collider2D,
            a = i.Contact2DType,
            f = i.Collider,
            c = i.UITransform,
            u = i.UIOpacity,
            g = i.Component
        }
        ],
        execute: function() {
            var d, _, D, y, p;
            e._RF.push({}, "e79bdNTsHBHU5QkvvzTQ10j", "Behaviour", void 0);
            var T = l.ccclass
              , C = l.property;
            i("Behaviour", (d = T("Behaviour"),
            _ = C({
                tooltip: "对象标识"
            }),
            d((p = t((y = function(i) {
                function t() {
                    for (var t, o = arguments.length, r = new Array(o), e = 0; e < o; e++)
                        r[e] = arguments[e];
                    return t = i.call.apply(i, [this].concat(r)) || this,
                    s(t, "tag", p, n(t)),
                    t.colliders_2D = null,
                    t.colliders_3D = null,
                    t._transform = null,
                    t._gameObject = null,
                    t._uiTransform = null,
                    t._uiOpacity = null,
                    t._alpha = 1,
                    t._opacity = 255,
                    t
                }
                o(t, i);
                var e = t.prototype;
                return e.onLoad = function() {
                    this.addColliderEventListener()
                }
                ,
                e.addColliderEventListener = function() {
                    this.add2DColliderEventListener(),
                    this.add3DColliderEventListener()
                }
                ,
                e.add2DColliderEventListener = function() {
                    if (this.colliders_2D = this.getComponents(h),
                    this.onTriggerEnter2D)
                        for (var i = 0; i < this.colliders_2D.length; i++)
                            this.colliders_2D[i].on(a.BEGIN_CONTACT, this.onTriggerEnter2D, this);
                    if (this.onTriggerExit2D)
                        for (i = 0; i < this.colliders_2D.length; i++)
                            this.colliders_2D[i].on(a.END_CONTACT, this.onTriggerExit2D, this);
                    if (this.onCollisionEnter2D)
                        for (i = 0; i < this.colliders_2D.length; i++)
                            this.colliders_2D[i].on(a.BEGIN_CONTACT, this.onCollisionEnter2D, this);
                    if (this.onCollisionExit2D)
                        for (i = 0; i < this.colliders_2D.length; i++)
                            this.colliders_2D[i].on(a.END_CONTACT, this.onCollisionExit2D, this)
                }
                ,
                e.add3DColliderEventListener = function() {
                    if (this.colliders_3D = this.getComponents(f),
                    this.onTriggerEnter)
                        for (var i = 0; i < this.colliders_3D.length; i++)
                            this.colliders_3D[i].on("onTriggerEnter", this.onTriggerEnter, this);
                    if (this.onTriggerStay)
                        for (i = 0; i < this.colliders_3D.length; i++)
                            this.colliders_3D[i].on("onTriggerStay", this.onTriggerStay, this);
                    if (this.onTriggerExit)
                        for (i = 0; i < this.colliders_3D.length; i++)
                            this.colliders_3D[i].on("onTriggerExit", this.onTriggerExit, this);
                    if (this.onCollisionEnter)
                        for (i = 0; i < this.colliders_3D.length; i++)
                            this.colliders_3D[i].on("onCollisionEnter", this.onCollisionEnter, this);
                    if (this.onCollisionStay)
                        for (i = 0; i < this.colliders_3D.length; i++)
                            this.colliders_3D[i].on("onCollisionStay", this.onCollisionStay, this);
                    if (this.onCollisionExit)
                        for (i = 0; i < this.colliders_3D.length; i++)
                            this.colliders_3D[i].on("onCollisionExit", this.onCollisionExit, this)
                }
                ,
                e.removeAllColliderEventListener = function() {
                    if (this.colliders_2D)
                        for (var i = 0; i < this.colliders_2D.length; i++)
                            this.onTriggerEnter2D && this.colliders_2D[i].off(a.BEGIN_CONTACT, this.onTriggerEnter2D, this),
                            this.onTriggerExit2D && this.colliders_2D[i].off(a.END_CONTACT, this.onTriggerExit2D, this),
                            this.onCollisionEnter2D && this.colliders_2D[i].off(a.BEGIN_CONTACT, this.onCollisionEnter2D, this),
                            this.onCollisionExit2D && this.colliders_2D[i].off(a.END_CONTACT, this.onCollisionExit2D, this);
                    if (this.colliders_3D)
                        for (i = 0; i < this.colliders_3D.length; i++)
                            this.onTriggerEnter && this.colliders_3D[i].off("onTriggerEnter", this.onTriggerEnter, this),
                            this.onTriggerStay && this.colliders_3D[i].off("onTriggerStay", this.onTriggerStay, this),
                            this.onTriggerExit && this.colliders_3D[i].off("onTriggerExit", this.onTriggerExit, this),
                            this.onCollisionEnter && this.colliders_3D[i].off("onCollisionEnter", this.onCollisionEnter, this),
                            this.onCollisionStay && this.colliders_3D[i].off("onCollisionStay", this.onCollisionStay, this),
                            this.onCollisionExit && this.colliders_3D[i].off("onCollisionExit", this.onCollisionExit, this)
                }
                ,
                e.onDestroy = function() {
                    this.removeAllColliderEventListener()
                }
                ,
                r(t, [{
                    key: "transform",
                    get: function() {
                        return this._transform || (this._transform = this.node),
                        this._transform
                    }
                }, {
                    key: "gameObject",
                    get: function() {
                        return this._gameObject || (this._gameObject = this.node),
                        this._gameObject
                    }
                }, {
                    key: "uiTransform",
                    get: function() {
                        return this._uiTransform || (this._uiTransform = this.node.getComponent(c)),
                        this._uiTransform
                    }
                }, {
                    key: "uiOpacity",
                    get: function() {
                        return this._uiOpacity || (this._uiOpacity = this.node.getComponent(u)),
                        this._uiOpacity
                    }
                }, {
                    key: "width",
                    get: function() {
                        return this.uiTransform ? this.uiTransform.width : 0
                    },
                    set: function(i) {
                        this.uiTransform && (this.uiTransform.width = i)
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.uiTransform ? this.uiTransform.height : 0
                    },
                    set: function(i) {
                        this.uiTransform && (this.uiTransform.height = i)
                    }
                }, {
                    key: "alpha",
                    get: function() {
                        return this._alpha
                    },
                    set: function(i) {
                        this._alpha = i,
                        this._alpha < 0 ? this._alpha = 0 : this._alpha > 1 && (this._alpha = 1),
                        null != this.uiOpacity && (this.uiOpacity.opacity = this._alpha / 1 * 255)
                    }
                }, {
                    key: "opacity",
                    get: function() {
                        return this._opacity
                    },
                    set: function(i) {
                        this._opacity = i,
                        this._opacity < 0 ? this._opacity = 0 : this._opacity > 255 && (this._opacity = 255),
                        null != this.uiOpacity && (this.uiOpacity.opacity = this._opacity)
                    }
                }, {
                    key: "x",
                    get: function() {
                        return this.transform.position.x
                    },
                    set: function(i) {
                        var t = this.transform.position;
                        t.x = i,
                        this.transform.position = t
                    }
                }, {
                    key: "y",
                    get: function() {
                        return this.transform.position.y
                    },
                    set: function(i) {
                        var t = this.transform.position;
                        t.y = i,
                        this.transform.position = t
                    }
                }, {
                    key: "z",
                    get: function() {
                        return this.transform.position.z
                    },
                    set: function(i) {
                        var t = this.transform.position;
                        t.z = i,
                        this.transform.position = t
                    }
                }, {
                    key: "wx",
                    get: function() {
                        return this.transform.worldPosition.x
                    },
                    set: function(i) {
                        var t = this.transform.worldPosition;
                        t.x = i,
                        this.transform.worldPosition = t
                    }
                }, {
                    key: "wy",
                    get: function() {
                        return this.transform.worldPosition.y
                    },
                    set: function(i) {
                        var t = this.transform.transform.worldPosition;
                        t.y = i,
                        this.transform.worldPosition = t
                    }
                }, {
                    key: "wz",
                    get: function() {
                        return this.transform.worldPosition.z
                    },
                    set: function(i) {
                        var t = this.transform.worldPosition;
                        t.z = i,
                        this.transform.worldPosition = t
                    }
                }]),
                t
            }(g)).prototype, "tag", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ""
                }
            }),
            D = y)) || D));
            e._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/BinaryTreeNode.ts", ["cc"], (function(e) {
    "use strict";
    var t;
    return {
        setters: [function(e) {
            t = e.cclegacy
        }
        ],
        execute: function() {
            t._RF.push({}, "60d7a9yrfZNFZCCoRQd6Y7i", "BinaryTreeNode", void 0);
            e("default", function() {
                function e() {
                    this.seekTag = 0,
                    this.openNode = null,
                    this.count = 0
                }
                var t = e.prototype;
                return t.refleshTag = function() {
                    this.openNode = null,
                    this.count = 0,
                    this.seekTag++,
                    this.seekTag > 1e9 && (this.seekTag = 0)
                }
                ,
                t.isTreeNull = function() {
                    return null == this.openNode
                }
                ,
                t.addTreeNode = function(e, t) {
                    if (void 0 === t && (t = null),
                    this.count++,
                    null == t) {
                        if (null == this.openNode)
                            return void (this.openNode = e);
                        t = this.openNode
                    }
                    t != e && (e.f >= t.f ? null == t.right ? (t.right = e,
                    e.treeParent = t) : this.addTreeNode(e, t.right) : null == t.left ? (t.left = e,
                    e.treeParent = t) : this.addTreeNode(e, t.left))
                }
                ,
                t.removeTreeNode = function(e) {
                    this.count++,
                    null != e.treeParent || null != e.left || null != e.right ? (null == e.treeParent ? e.left ? (this.openNode = e.left,
                    e.left.treeParent = null,
                    e.right && (e.right.treeParent = null,
                    this.addTreeNode(e.right, this.openNode))) : e.right && (this.openNode = e.right,
                    e.right.treeParent = null) : e.treeParent.left == e ? e.right ? (e.treeParent.left = e.right,
                    e.right.treeParent = e.treeParent,
                    e.left && (e.left.treeParent = null,
                    this.addTreeNode(e.left, e.right))) : (e.treeParent.left = e.left,
                    e.left && (e.left.treeParent = e.treeParent)) : e.treeParent.right == e && (e.left ? (e.treeParent.right = e.left,
                    e.left.treeParent = e.treeParent,
                    e.right && (e.right.treeParent = null,
                    this.addTreeNode(e.right, e.left))) : (e.treeParent.right = e.right,
                    e.right && (e.right.treeParent = e.treeParent))),
                    e.resetTree()) : e == this.openNode && (this.openNode = null)
                }
                ,
                t.getMin_F_Node = function(e) {
                    if (void 0 === e && (e = null),
                    this.count++,
                    null == e) {
                        if (null == this.openNode)
                            return null;
                        e = this.openNode
                    }
                    if (null == e.left) {
                        var t = e;
                        return null == e.treeParent ? (this.openNode = e.right,
                        this.openNode && (this.openNode.treeParent = null)) : (e.treeParent.left = e.right,
                        e.right && (e.right.treeParent = e.treeParent)),
                        t
                    }
                    return this.getMin_F_Node(e.left)
                }
                ,
                t.setRoadNodeInOpenList = function(e) {
                    e.openTag = this.seekTag,
                    e.closeTag = 0
                }
                ,
                t.setRoadNodeInCloseList = function(e) {
                    e.openTag = 0,
                    e.closeTag = this.seekTag
                }
                ,
                t.isInOpenList = function(e) {
                    return e.openTag == this.seekTag
                }
                ,
                t.isInCloseList = function(e) {
                    return e.closeTag == this.seekTag
                }
                ,
                t.getOpenList = function() {
                    var e = [];
                    return this.seachTree(this.openNode, e),
                    e
                }
                ,
                t.seachTree = function(e, t) {
                    null != e && (t.push(e),
                    e.left && this.seachTree(e.left, t),
                    e.right && this.seachTree(e.right, t))
                }
                ,
                e
            }());
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Body.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Player.ts"], (function(t) {
    "use strict";
    var n, o, e, r, c;
    return {
        setters: [function(t) {
            n = t.inheritsLoose
        }
        , function(t) {
            o = t.cclegacy,
            e = t._decorator,
            r = t.Component
        }
        , function(t) {
            c = t.default
        }
        ],
        execute: function() {
            var u;
            o._RF.push({}, "6f987iEmGpFs7oQJ+Xpz5XM", "Body", void 0);
            var a = e.ccclass;
            e.property,
            t("default", a("Body")(u = function(t) {
                function o() {
                    for (var n, o = arguments.length, e = new Array(o), r = 0; r < o; r++)
                        e[r] = arguments[r];
                    return (n = t.call.apply(t, [this].concat(e)) || this).player = null,
                    n
                }
                n(o, t);
                var e = o.prototype;
                return e.onLoad = function() {
                    this.player = this.node.parent.getComponent(c)
                }
                ,
                e.start = function() {}
                ,
                e.update = function(t) {}
                ,
                o
            }(r)) || u);
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/BottomToolBar.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIManager.ts"], (function(e) {
    "use strict";
    var t, n, i, o, r, l, c, a, u, s;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            n = e.inheritsLoose,
            i = e.initializerDefineProperty,
            o = e.assertThisInitialized
        }
        , function(e) {
            r = e.cclegacy,
            l = e._decorator,
            c = e.Button,
            a = e.Node,
            u = e.Component
        }
        , function(e) {
            s = e.default
        }
        ],
        execute: function() {
            var p, f, h, d, B, y, m, w, b, g, T;
            r._RF.push({}, "7e7f0nDJRREtoMMADJs+uNP", "BottomToolBar", void 0);
            var v = l.ccclass
              , V = l.property;
            e("default", (p = v("BottomToolBar"),
            f = V(c),
            h = V(c),
            d = V(c),
            B = V(c),
            p((w = t((m = function(e) {
                function t() {
                    for (var t, n = arguments.length, r = new Array(n), l = 0; l < n; l++)
                        r[l] = arguments[l];
                    return t = e.call.apply(e, [this].concat(r)) || this,
                    i(t, "mapBtn", w, o(t)),
                    i(t, "introduceBtn", b, o(t)),
                    i(t, "helpBtn", g, o(t)),
                    i(t, "getPrjBtn", T, o(t)),
                    t
                }
                n(t, e);
                var r = t.prototype;
                return r.start = function() {
                    var e = this;
                    this.mapBtn.node.on(a.EventType.TOUCH_END, (function(t) {
                        e.scheduleOnce((function() {
                            window.open("https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/v2.0.0/web-mobile/index.html", "_blank")
                        }
                        ), .2)
                    }
                    ), this),
                    this.introduceBtn.node.on(a.EventType.TOUCH_START, (function(t) {
                        e.closeAllView(),
                        s.instance.introduceView.open()
                    }
                    ), this),
                    this.helpBtn.node.on(a.EventType.TOUCH_START, (function(t) {
                        e.closeAllView(),
                        s.instance.helpView.open()
                    }
                    ), this),
                    this.getPrjBtn.node.on(a.EventType.TOUCH_END, (function(e) {
                        s.instance.getPrjView.open()
                    }
                    ), this)
                }
                ,
                r.closeAllView = function() {
                    s.instance.helpView.close(),
                    s.instance.introduceView.close(),
                    s.instance.getPrjView.close()
                }
                ,
                t
            }(u)).prototype, "mapBtn", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            b = t(m.prototype, "introduceBtn", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            g = t(m.prototype, "helpBtn", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            T = t(m.prototype, "getPrjBtn", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            y = m)) || y));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/CameraController.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var i, e, a, s, h, r, n, o, m, g, p;
    return {
        setters: [function(t) {
            i = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            a = t.initializerDefineProperty,
            s = t.assertThisInitialized,
            h = t.createClass
        }
        , function(t) {
            r = t.cclegacy,
            n = t._decorator,
            o = t.Camera,
            m = t.Vec3,
            g = t.view,
            p = t.Component
        }
        ],
        execute: function() {
            var l, c, P, w, u, d;
            r._RF.push({}, "622efjTeKdBl5ayGMAr/R0K", "CameraController", void 0);
            var z = n.ccclass
              , S = n.property;
            t("default", (l = z("CameraController"),
            c = S(o),
            l(((d = function(t) {
                function i() {
                    for (var i, e = arguments.length, h = new Array(e), r = 0; r < e; r++)
                        h[r] = arguments[r];
                    return i = t.call.apply(t, [this].concat(h)) || this,
                    a(i, "camera", u, s(i)),
                    i.target = null,
                    i.targetPos = new m(0,0,0),
                    i._mapParams = null,
                    i._winSize = void 0,
                    i
                }
                e(i, t);
                var r = i.prototype;
                return r.onLoad = function() {
                    i.instance = this
                }
                ,
                r.init = function(t) {
                    this._mapParams = t
                }
                ,
                r.update = function(t) {
                    this.followTarget(t)
                }
                ,
                r.getCameraPos = function() {
                    return null == this.camera ? new m(0,0,0) : new m(Math.ceil(this.camera.node.position.x),Math.ceil(this.camera.node.position.y),0)
                }
                ,
                r.setTarget = function(t) {
                    this.target = t
                }
                ,
                r.followTarget = function(t) {
                    null != this.target && this.target.isValid && null != this.camera && (this.targetPos = this.target.position.clone().subtract(new m(this.winSize.width / 2,this.winSize.height / 2)),
                    this._mapParams.mapWidth < this.winSize.width ? this.targetPos.x = (this._mapParams.mapWidth - this.winSize.width) / 2 : this.targetPos.x > this._mapParams.mapWidth - this.winSize.width ? this.targetPos.x = this._mapParams.mapWidth - this.winSize.width : this.targetPos.x < 0 && (this.targetPos.x = 0),
                    this._mapParams.mapHeight < this.winSize.height ? this.targetPos.y = (this._mapParams.mapHeight - this.winSize.height) / 2 : this.targetPos.y > this._mapParams.mapHeight - this.winSize.height ? this.targetPos.y = this._mapParams.mapHeight - this.winSize.height : this.targetPos.y < 0 && (this.targetPos.y = 0),
                    this.targetPos.z = this.camera.node.position.z,
                    this.targetPos = this.camera.node.position.lerp(this.targetPos, 2 * t),
                    this.camera.node.position = this.targetPos)
                }
                ,
                r.setViewToPoint = function(t, i) {
                    this.targetPos = new m(t,i).subtract(new m(this.winSize.width / 2,this.winSize.height / 2)),
                    this._mapParams.mapWidth < this.winSize.width ? this.targetPos.x = (this._mapParams.mapWidth - this.winSize.width) / 2 : this.targetPos.x > this._mapParams.mapWidth - this.winSize.width ? this.targetPos.x = this._mapParams.mapWidth - this.winSize.width : this.targetPos.x < 0 && (this.targetPos.x = 0),
                    this._mapParams.mapHeight < this.winSize.height ? this.targetPos.y = (this._mapParams.mapHeight - this.winSize.height) / 2 : this.targetPos.y > this._mapParams.mapHeight - this.winSize.height ? this.targetPos.y = this._mapParams.mapHeight - this.winSize.height : this.targetPos.y < 0 && (this.targetPos.y = 0),
                    this.targetPos.z = this.camera.node.position.z,
                    this.camera.node.position = this.targetPos
                }
                ,
                r.onDestroy = function() {
                    i.instance = null
                }
                ,
                h(i, [{
                    key: "winSize",
                    get: function() {
                        return null == this._winSize && (this._winSize = g.getVisibleSize()),
                        this._winSize
                    }
                }]),
                i
            }(p)).instance = null,
            u = i((w = d).prototype, "camera", [c], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            P = w)) || P));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Common.ts", ["cc"], (function(t) {
    "use strict";
    var n;
    return {
        setters: [function(t) {
            n = t.cclegacy
        }
        ],
        execute: function() {
            n._RF.push({}, "b21ab/9QsZNQ7vgDt0vtZ9T", "Common", void 0);
            t("Vector2", function() {
                function t(t, n) {
                    this.x = 0,
                    this.y = 0,
                    this.x = t,
                    this.y = n
                }
                var n = t.prototype;
                return n.plus = function(n) {
                    return new t(this.x + n.x,this.y + n.y)
                }
                ,
                n.minus = function(n) {
                    return new t(this.x - n.x,this.y - n.y)
                }
                ,
                n.multiply = function(t) {
                    return this.x * t.x + this.y * t.y
                }
                ,
                n.scale = function(n) {
                    return new t(this.x * n,this.y * n)
                }
                ,
                n.copy = function(t) {
                    return this.x = t.x,
                    this.y = t.y,
                    this
                }
                ,
                n.clone = function() {
                    return new t(this.x,this.y)
                }
                ,
                n.substract = function(t, n) {
                    return t.x -= n.x,
                    t.y -= n.y,
                    t
                }
                ,
                n.lengthSqr = function() {
                    return Math.pow(this.x, 2) + Math.pow(this.y, 2)
                }
                ,
                t
            }()),
            t("Obstacle", (function() {
                this.next = void 0,
                this.previous = void 0,
                this.direction = void 0,
                this.point = void 0,
                this.id = void 0,
                this.convex = void 0
            }
            )),
            t("Line", (function() {
                this.point = void 0,
                this.direction = void 0
            }
            )),
            t("KeyValuePair", (function(t, n) {
                this.key = void 0,
                this.value = void 0,
                this.key = t,
                this.value = n
            }
            ));
            t("RVOMath", function() {
                function t() {}
                return t.absSq = function(t) {
                    return t.multiply(t)
                }
                ,
                t.normalize = function(n) {
                    return n.scale(1 / t.abs(n))
                }
                ,
                t.distSqPointLineSegment = function(n, i, s) {
                    var u = s.minus(n)
                      , e = i.minus(n)
                      , o = u.multiply(e) / t.absSq(e);
                    return o < 0 ? t.absSq(u) : o > 1 ? t.absSq(s.minus(i)) : t.absSq(s.minus(n.plus(e.scale(o))))
                }
                ,
                t.sqr = function(t) {
                    return t * t
                }
                ,
                t.det = function(t, n) {
                    return t.x * n.y - t.y * n.x
                }
                ,
                t.abs = function(n) {
                    return Math.sqrt(t.absSq(n))
                }
                ,
                t.leftOf = function(n, i, s) {
                    return t.det(n.minus(s), i.minus(n))
                }
                ,
                t
            }()).RVO_EPSILON = 1e-5,
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/ControlMode.ts", ["cc"], (function(o) {
    "use strict";
    var t;
    return {
        setters: [function(o) {
            t = o.cclegacy
        }
        ],
        execute: function() {
            var c;
            o("ControlMode", void 0),
            t._RF.push({}, "fd1b36VZM5JO7pVY7NY84Gm", "ControlMode", void 0),
            function(o) {
                o[o.touch = 0] = "touch",
                o[o.joystick = 1] = "joystick"
            }(c || (c = o("ControlMode", {}))),
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/DataConfig.ts", ["cc", "./SoundManager.ts"], (function(a) {
    "use strict";
    var t, n;
    return {
        setters: [function(a) {
            t = a.cclegacy
        }
        , function(a) {
            n = a.BGSound
        }
        ],
        execute: function() {
            t._RF.push({}, "b338e6tD1pAdofYapDnsV6s", "DataConfig", void 0);
            var e = a("DataConfig", function() {
                function a() {}
                return a.getMapBGSound = function(t) {
                    return a.BGMData[t] ? a.BGMData[t] : a.NpcTalkData[1e4]
                }
                ,
                a.getNpcTalkData = function(t) {
                    return a.NpcTalkData[t] ? a.NpcTalkData[t] : a.NpcTalkData[1e3]
                }
                ,
                a
            }());
            e.BGMData = {
                1e4: n.none,
                10001: n.bgm1,
                10002: n.bgm2,
                10003: n.bgm3,
                10004: n.bgm4,
                10005: n.bgm5
            },
            e.NpcTalkData = {
                1e3: "你好！",
                2001: "我是装备商，要买点什么装备吗？",
                2002: "往西边走，可以去长寿！",
                3001: "天上人间很好玩！，你快去体验一下吧！",
                3002: "我是楼主！你是谁？",
                4001: "私闯民宅，给我滚出去！",
                5001: "大爷，我们这里的姑娘只卖身不卖艺的！",
                5002: "我寂寞，我冷！",
                5003: "什么才一两，当我什么啊，最少也要给十两",
                5004: "大爷，不要这样，你再这样我可要叫了！",
                5005: "禽兽！"
            },
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/EditObjData.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var n, a;
    return {
        setters: [function(t) {
            n = t.inheritsLoose
        }
        , function(t) {
            a = t.cclegacy
        }
        ],
        execute: function() {
            a._RF.push({}, "3d0dfoRXqtGe4rOoa+utwRI", "EditObjData", void 0);
            var r = t("default", (function() {
                this.objId = "",
                this.objName = "",
                this.objType = "",
                this.skin = "",
                this.x = 0,
                this.y = 0,
                this.cx = 0,
                this.cy = 0,
                this.params = ""
            }
            ));
            t("EditNpcData", function(t) {
                function a() {
                    for (var n, a = arguments.length, r = new Array(a), i = 0; i < a; i++)
                        r[i] = arguments[i];
                    return (n = t.call.apply(t, [this].concat(r)) || this).direction = 0,
                    n.isPatrol = !1,
                    n.dialogueId = 0,
                    n.taskId = 0,
                    n.funcId = 0,
                    n.npcType = 0,
                    n
                }
                return n(a, t),
                a
            }(r)),
            t("EditMonsterData", function(t) {
                function a() {
                    for (var n, a = arguments.length, r = new Array(a), i = 0; i < a; i++)
                        r[i] = arguments[i];
                    return (n = t.call.apply(t, [this].concat(r)) || this).direction = 0,
                    n.isPatrol = !1,
                    n.dialogueId = 0,
                    n.fightId = 0,
                    n.monsterType = 0,
                    n
                }
                return n(a, t),
                a
            }(r)),
            t("EditTransferData", function(t) {
                function a() {
                    for (var n, a = arguments.length, r = new Array(a), i = 0; i < a; i++)
                        r[i] = arguments[i];
                    return (n = t.call.apply(t, [this].concat(r)) || this).targetMapId = "",
                    n.targetMapSpawnId = 0,
                    n.transferType = 0,
                    n
                }
                return n(a, t),
                a
            }(r)),
            t("EditSpawnPointData", function(t) {
                function a() {
                    for (var n, a = arguments.length, r = new Array(a), i = 0; i < a; i++)
                        r[i] = arguments[i];
                    return (n = t.call.apply(t, [this].concat(r)) || this).spawnId = 0,
                    n.defaultSpawn = !1,
                    n
                }
                return n(a, t),
                a
            }(r));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/EntityLayer.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var n, i, o, e;
    return {
        setters: [function(t) {
            n = t.inheritsLoose
        }
        , function(t) {
            i = t.cclegacy,
            o = t._decorator,
            e = t.Component
        }
        ],
        execute: function() {
            var r;
            i._RF.push({}, "6639ayo4DFKZYCU2OBZzyb+", "EntityLayer", void 0);
            var s = o.ccclass;
            o.property,
            t("default", s("EntityLayer")(r = function(t) {
                function i() {
                    return t.apply(this, arguments) || this
                }
                n(i, t);
                var o = i.prototype;
                return o.start = function() {}
                ,
                o.update = function(t) {
                    this.sortZindex()
                }
                ,
                o.clear = function() {}
                ,
                o.sortZindex = function() {
                    var t = this.node.children.slice();
                    t.sort((function(t, n) {
                        return t.position.y > n.position.y ? -1 : t.position.y < n.position.y ? 1 : 0
                    }
                    ));
                    for (var n = t.length, i = 0; i < n; i++)
                        t[i].setSiblingIndex(i)
                }
                ,
                i
            }(e)) || r);
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/FogOfWar.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./TextureUtils.ts"], (function(t) {
    "use strict";
    var e, i, a, s, o, r, n, h, l, c, m, u, f, g, x;
    return {
        setters: [function(t) {
            e = t.applyDecoratedDescriptor,
            i = t.inheritsLoose,
            a = t.initializerDefineProperty,
            s = t.assertThisInitialized
        }
        , function(t) {
            o = t.cclegacy,
            r = t._decorator,
            n = t.Sprite,
            h = t.CCInteger,
            l = t.Color,
            c = t.Vec3,
            m = t.UITransform,
            u = t.Texture2D,
            f = t.Vec2,
            g = t.Component
        }
        , function(t) {
            x = t.TextureUtils
        }
        ],
        execute: function() {
            var k, p, d, S, C, w, v, T, z, y, M, b;
            o._RF.push({}, "243feOTIJNKZ5LbKNreaswF", "FogOfWar", void 0);
            var P = r.ccclass
              , U = r.property;
            t("FogOfWar", (k = P("FogOfWar"),
            p = U(n),
            d = U(h),
            S = U(h),
            C = U(l),
            k(((b = function(t) {
                function e() {
                    for (var e, i = arguments.length, o = new Array(i), r = 0; r < i; r++)
                        o[r] = arguments[r];
                    return e = t.call.apply(t, [this].concat(o)) || this,
                    a(e, "fogMask", T, s(e)),
                    a(e, "texWidth", z, s(e)),
                    a(e, "texHeight", y, s(e)),
                    a(e, "defaultColor", M, s(e)),
                    e.maskTex = null,
                    e.texUtils = void 0,
                    e.maskSize = null,
                    e.maskScaleX = 1,
                    e.maskScaleY = 1,
                    e.maskScale = 1,
                    e.tempVec3 = new c,
                    e.isTexChange = !1,
                    e
                }
                i(e, t);
                var o = e.prototype;
                return o.onLoad = function() {
                    e.instance = this
                }
                ,
                o.init = function(t, e) {
                    this.fogMask.node.getComponent(m).setContentSize(t, e),
                    this.maskTex = new u,
                    this.maskTex.reset({
                        width: this.texWidth,
                        height: this.texHeight,
                        format: u.PixelFormat.RGBA8888
                    }),
                    this.texUtils = new x,
                    this.texUtils.init(this.maskTex),
                    this.resetColor(),
                    this.maskTex.uploadData(this.texUtils.getData()),
                    this.maskSize = this.fogMask.node.getComponent(m).contentSize,
                    this.maskScaleX = this.texWidth / this.maskSize.width,
                    this.maskScaleY = this.texHeight / this.maskSize.height,
                    this.maskScale = Math.max(this.maskScaleX, this.maskScaleY),
                    this.fogMask.enabled = !0,
                    this.fogMask.spriteFrame.texture = this.maskTex
                }
                ,
                o.convertNodePosToTexPos = function(t, e) {
                    this.tempVec3.set(e.x, e.y, 0);
                    var i = t.getComponent(m).convertToNodeSpaceAR(this.tempVec3);
                    return i.x += t.getComponent(m).width * t.getComponent(m).anchorX,
                    i.y += t.getComponent(m).height * t.getComponent(m).anchorY,
                    i.y = t.getComponent(m).height - i.y,
                    new f(i.x,i.y)
                }
                ,
                o.lateUpdate = function() {
                    this.isTexChange && (this.isTexChange = !1,
                    this.maskTex.uploadData(this.texUtils.getData()))
                }
                ,
                o.resetColor = function() {
                    for (var t = 0; t < this.texHeight; t++)
                        for (var e = 0; e < this.texWidth; e++)
                            this.texUtils.setPixel(e, t, this.defaultColor)
                }
                ,
                o.drawCircle = function(t, e, i) {
                    var a = this.convertNodePosToTexPos(this.fogMask.node, new f(t,e));
                    t = Math.floor(a.x * this.maskScaleX),
                    e = Math.floor(a.y * this.maskScaleY);
                    var s = (i = Math.floor(i)) * this.maskScale
                      , o = i * this.maskScale;
                    this.drawColor(t, e, s, o, i)
                }
                ,
                o.drawOval = function(t, e, i, a) {
                    var s = this.convertNodePosToTexPos(this.fogMask.node, new f(t,e));
                    t = Math.floor(s.x * this.maskScaleX),
                    e = Math.floor(s.y * this.maskScaleY);
                    var o = i * this.maskScale
                      , r = a * this.maskScale
                      , n = Math.max(o, r);
                    this.drawColor(t, e, o, r, n)
                }
                ,
                o.drawColor = function(t, e, i, a, s) {
                    this.maskSize.width < this.maskSize.height ? a *= this.maskSize.width / this.maskSize.height : this.maskSize.width > this.maskSize.height && (i *= this.maskSize.height / this.maskSize.width);
                    for (var o = i * i, r = a * a, n = e - s; n < e + s; n++)
                        for (var h = t - s; h < t + s; h++) {
                            var l = h
                              , c = n
                              , m = l - t
                              , u = c - e
                              , f = m * m / o + u * u / r;
                            if (f <= 1) {
                                var g = this.texUtils.getPixel(l, c);
                                g.a = Math.floor(g.a * f),
                                this.texUtils.setPixel(l, c, g)
                            }
                        }
                    this.isTexChange = !0
                }
                ,
                e
            }(g)).instance = null,
            T = e((v = b).prototype, "fogMask", [p], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            z = e(v.prototype, "texWidth", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 256
                }
            }),
            y = e(v.prototype, "texHeight", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 256
                }
            }),
            M = e(v.prototype, "defaultColor", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return new l(0,0,0,255)
                }
            }),
            w = v)) || w));
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/FootTrigger.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Behaviour.ts", "./Actor.ts", "./TransferDoor.ts"], (function(t) {
    "use strict";
    var r, e, o, n, i, c, s, a, l, u;
    return {
        setters: [function(t) {
            r = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            o = t.initializerDefineProperty,
            n = t.assertThisInitialized,
            i = t.createClass
        }
        , function(t) {
            c = t.cclegacy,
            s = t._decorator
        }
        , function(t) {
            a = t.Behaviour
        }
        , function(t) {
            l = t.default
        }
        , function(t) {
            u = t.default
        }
        ],
        execute: function() {
            var f, g, p, h, d;
            c._RF.push({}, "e6f05YZAHRGiorL9OHBeRYw", "FootTrigger", void 0);
            var v = s.ccclass
              , y = s.property;
            t("default", (f = v("FootTrigger"),
            g = y(l),
            f((d = r((h = function(t) {
                function r() {
                    for (var r, e = arguments.length, i = new Array(e), c = 0; c < e; c++)
                        i[c] = arguments[c];
                    return r = t.call.apply(t, [this].concat(i)) || this,
                    o(r, "selfActor", d, n(r)),
                    r
                }
                e(r, t);
                var c = r.prototype;
                return c.start = function() {}
                ,
                c.onTriggerEnter = function(t) {
                    var r = t.otherCollider.getComponent(u);
                    null != r && r.onTriggerEnter(this.actor)
                }
                ,
                c.onTriggerExit = function(t) {
                    var r = t.otherCollider.getComponent(u);
                    null != r && r.onTriggerEnter(this.actor)
                }
                ,
                i(r, [{
                    key: "actor",
                    get: function() {
                        return !this.selfActor && this.node.parent && (this.selfActor = this.node.parent.getComponent(l)),
                        this.selfActor
                    }
                }]),
                r
            }(a)).prototype, "selfActor", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            p = h)) || p));
            c._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/GameController.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./SceneManager.ts", "./GameWorld.ts"], (function(t) {
    "use strict";
    var n, e, o, r, i, a, c, l, u, s, p, f;
    return {
        setters: [function(t) {
            n = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            o = t.initializerDefineProperty,
            r = t.assertThisInitialized
        }
        , function(t) {
            i = t.cclegacy,
            a = t._decorator,
            c = t.Enum,
            l = t.Component
        }
        , function(t) {
            u = t.ControlMode
        }
        , function(t) {
            s = t.default,
            p = t.SceneLoadStatus
        }
        , function(t) {
            f = t.default
        }
        ],
        execute: function() {
            var d, y, h, m, C, g;
            i._RF.push({}, "31c2aC2pFRIBruSNZr6cbm3", "GameController", void 0);
            var M = a.ccclass
              , v = a.property;
            t("default", (d = M("GameController"),
            y = v({
                type: c(u),
                tooltip: "控制模式:\ntouch  点击行走 \njoystick 摇杆操作 "
            }),
            d(((g = function(t) {
                function n() {
                    for (var n, e = arguments.length, i = new Array(e), a = 0; a < e; a++)
                        i[a] = arguments[a];
                    return n = t.call.apply(t, [this].concat(i)) || this,
                    o(n, "controlMode", C, r(n)),
                    n
                }
                e(n, t);
                var i = n.prototype;
                return i.onLoad = function() {
                    n.instance = this,
                    this.init()
                }
                ,
                i.start = function() {}
                ,
                i.init = function() {}
                ,
                i.isCanControlPlayer = function() {
                    return s.instance.loadStatus != p.loading && (!!f.instance.isMapValid() && null != f.instance.gameMap.myPlayer)
                }
                ,
                n
            }(l)).instance = null,
            C = n((m = g).prototype, "controlMode", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return u.touch
                }
            }),
            h = m)) || h));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/GameManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MonsterManager.ts", "./NpcManager.ts", "./OtherManager.ts", "./PetManager.ts", "./PlayerManager.ts"], (function(t) {
    "use strict";
    var n, e, r, i, o, s, a, u, l, g, c;
    return {
        setters: [function(t) {
            n = t.inheritsLoose,
            e = t.createClass
        }
        , function(t) {
            r = t.cclegacy,
            i = t._decorator,
            o = t.game,
            s = t.Component
        }
        , function(t) {
            a = t.default
        }
        , function(t) {
            u = t.default
        }
        , function(t) {
            l = t.default
        }
        , function(t) {
            g = t.default
        }
        , function(t) {
            c = t.default
        }
        ],
        execute: function() {
            var h, p;
            r._RF.push({}, "c63a6DR8ZRHQpBvpeEqDbvH", "GameManager", void 0);
            var M = i.ccclass;
            i.property,
            t("default", M("GameManager")(((p = function(t) {
                function r() {
                    for (var n, e = arguments.length, r = new Array(e), i = 0; i < e; i++)
                        r[i] = arguments[i];
                    return (n = t.call.apply(t, [this].concat(r)) || this)._playerMgr = null,
                    n._petMgr = null,
                    n._npcMgr = null,
                    n._monsterMgr = null,
                    n._otherMgr = null,
                    n
                }
                n(r, t);
                var i = r.prototype;
                return i.onLoad = function() {
                    r._instance ? this.node.destroy() : (r._instance = this,
                    o.addPersistRootNode(this.node),
                    this.init())
                }
                ,
                i.init = function() {}
                ,
                e(r, [{
                    key: "playerMgr",
                    get: function() {
                        return null == this._playerMgr && (this._playerMgr = this.getComponentInChildren(c)),
                        this._playerMgr
                    }
                }, {
                    key: "petMgr",
                    get: function() {
                        return null == this._petMgr && (this._petMgr = this.getComponentInChildren(g)),
                        this._petMgr
                    }
                }, {
                    key: "npcMgr",
                    get: function() {
                        return null == this._npcMgr && (this._npcMgr = this.getComponentInChildren(u)),
                        this._npcMgr
                    }
                }, {
                    key: "monsterMgr",
                    get: function() {
                        return null == this._monsterMgr && (this._monsterMgr = this.getComponentInChildren(a)),
                        this._monsterMgr
                    }
                }, {
                    key: "otherMgr",
                    get: function() {
                        return null == this._otherMgr && (this._otherMgr = this.getComponentInChildren(l)),
                        this._otherMgr
                    }
                }], [{
                    key: "instance",
                    get: function() {
                        return r._instance
                    }
                }]),
                r
            }(s))._instance = void 0,
            h = p)) || h);
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/GameMap.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./PathLog.ts", "./PathFindingAgent.ts", "./Common.ts", "./Simulator.ts", "./RVOSystem.ts", "./Behaviour.ts", "./FogOfWar.ts", "./Player.ts", "./CameraController.ts", "./SoundManager.ts", "./DataConfig.ts", "./EntityLayer.ts", "./TransferDoor.ts", "./Monster.ts", "./NPC.ts", "./SpawnPoint.ts", "./GameManager.ts", "./MapParams.ts", "./MapLayer.ts", "./ObstacleEdgeUtils.ts", "./GameController.ts"], (function(t) {
    "use strict";
    var i, n, e, a, s, r, o, l, h, y, c, p, u, d, f, m, g, P, w, _, L, M, S, v, D, b, C, z, O, T, W, I, E;
    return {
        setters: [function(t) {
            i = t.applyDecoratedDescriptor,
            n = t.inheritsLoose,
            e = t.initializerDefineProperty,
            a = t.assertThisInitialized,
            s = t.createClass
        }
        , function(t) {
            r = t.cclegacy,
            o = t._decorator,
            l = t.Node,
            h = t.Vec3,
            y = t.Graphics,
            c = t.view
        }
        , function(t) {
            p = t.default
        }
        , function(t) {
            u = t.default
        }
        , function(t) {
            d = t.Vector2
        }
        , function(t) {
            f = t.Simulator
        }
        , function(t) {
            m = t.default
        }
        , function(t) {
            g = t.Behaviour
        }
        , function(t) {
            P = t.FogOfWar
        }
        , function(t) {
            w = t.PlayerType,
            _ = t.PlayerControlType
        }
        , function(t) {
            L = t.default
        }
        , function(t) {
            M = t.SoundManager
        }
        , function(t) {
            S = t.DataConfig
        }
        , function(t) {
            v = t.default
        }
        , function(t) {
            D = t.default
        }
        , function(t) {
            b = t.default
        }
        , function(t) {
            C = t.default
        }
        , function(t) {
            z = t.default
        }
        , function(t) {
            O = t.default
        }
        , function(t) {
            T = t.default
        }
        , function(t) {
            W = t.default
        }
        , function(t) {
            I = t.default
        }
        , function(t) {
            E = t.default
        }
        ],
        execute: function() {
            var R, G, x, V, H, B, N, F, k, X, A, Y;
            r._RF.push({}, "89c47E03L1GW547eXJCInNz", "GameMap", void 0);
            var j = o.ccclass
              , J = o.property;
            t("default", (R = j("GameMap"),
            G = J(l),
            x = J(W),
            V = J(v),
            H = J(l),
            R(((Y = function(t) {
                function i() {
                    for (var i, n = arguments.length, s = new Array(n), r = 0; r < n; r++)
                        s[r] = arguments[r];
                    return i = t.call.apply(t, [this].concat(s)) || this,
                    e(i, "layer", F, a(i)),
                    e(i, "mapLayer", k, a(i)),
                    e(i, "entityLayer", X, a(i)),
                    e(i, "roadLayer", A, a(i)),
                    i._myPlayer = null,
                    i._sceneData = null,
                    i._mapData = null,
                    i._mapParams = null,
                    i.roadSign = null,
                    i.spawnPointList = [],
                    i.transferDoorList = [],
                    i.npcList = [],
                    i.monsterList = [],
                    i._winSize = void 0,
                    i._fogWartime = 0,
                    i._lastPlayerPos = null,
                    i
                }
                n(i, t);
                var r = i.prototype;
                return r.onLoad = function() {
                    i.instance = this
                }
                ,
                r.start = function() {
                    this.node.position = new h(-this.winSize.width / 2,-this.winSize.height / 2),
                    this.roadLayer.active = i.isDrawRoadLayer
                }
                ,
                r.init = function(t) {
                    this._sceneData = t,
                    this._mapData = t.mapData,
                    this._mapParams = this.getMapParams(t.mapData, t.bgTex, t.mapLoadModel),
                    this.mapLayer.init(this._mapParams),
                    p.setLogEnable(!1),
                    u.instance.init(t.mapData),
                    this.width = this.mapLayer.width,
                    this.height = this.mapLayer.height,
                    this.initRVO(),
                    this.initMapElement(),
                    this.afterInitMapElement(),
                    this.initPlayer(),
                    this.initCamera(),
                    this.initBGM(),
                    this.initFogOfWar()
                }
                ,
                r.initMapElement = function() {
                    var t = this._mapData.mapItems;
                    if (t)
                        for (var i = 0; i < t.length; i++) {
                            var n = t[i];
                            "npc" == n.type ? this.initNpc(n) : "monster" == n.type ? this.initMonster(n) : "transfer" == n.type ? this.initTransferDoor(n) : "spawnPoint" == n.type && this.initSpawnPoint(n)
                        }
                }
                ,
                r.initNpc = function(t) {
                    var i = O.instance.npcMgr.getNPC();
                    i.node.parent = this.entityLayer.node,
                    i.initEditData(t),
                    i.init(),
                    m.instance.runing && i.initRVO()
                }
                ,
                r.initMonster = function(t) {
                    var i = O.instance.monsterMgr.getMonster();
                    i.node.parent = this.entityLayer.node,
                    i.initEditData(t),
                    i.init(),
                    m.instance.runing && i.initRVO()
                }
                ,
                r.initTransferDoor = function(t) {
                    var i = O.instance.otherMgr.getTransferDoor(t.transferType);
                    i.node.parent = this.entityLayer.node,
                    i.initEditData(t),
                    i.init()
                }
                ,
                r.initSpawnPoint = function(t) {
                    var i = O.instance.otherMgr.getSpawnPoint();
                    i.node.parent = this.entityLayer.node,
                    i.initEditData(t),
                    i.init()
                }
                ,
                r.afterInitMapElement = function() {
                    this.spawnPointList = this.getComponentsInChildren(z),
                    this.transferDoorList = this.getComponentsInChildren(D),
                    this.npcList = this.getComponentsInChildren(C),
                    this.monsterList = this.getComponentsInChildren(b)
                }
                ,
                r.initPlayer = function() {
                    var t = this.getSpawnPoint(this.sceneData.enterSpawnId)
                      , i = O.instance.playerMgr.selectRoleId;
                    this._myPlayer = O.instance.playerMgr.getPlayer(i),
                    this._myPlayer.node.parent = this.entityLayer.node,
                    this._myPlayer.playerType = w.my,
                    this._myPlayer.controlType = _.user,
                    this._myPlayer.controlMode = E.instance.controlMode,
                    this._myPlayer.node.position = null != t ? t.node.position : new h(1e3,1e3,0),
                    m.instance.runing && this._myPlayer.initRVO()
                }
                ,
                r.switchPlayer = function(t) {
                    var i = new h;
                    null != this._myPlayer && (i = this._myPlayer.node.position,
                    this._myPlayer.destroySelf(),
                    this._myPlayer = null),
                    this._myPlayer = O.instance.playerMgr.getPlayer(t),
                    this._myPlayer.node.parent = this.entityLayer.node,
                    this._myPlayer.playerType = w.my,
                    this._myPlayer.controlType = _.user,
                    this._myPlayer.controlMode = E.instance.controlMode,
                    this._myPlayer.node.position = i,
                    m.instance.runing && this._myPlayer.initRVO(),
                    L.instance.setTarget(this._myPlayer.node)
                }
                ,
                r.initCamera = function() {
                    L.instance.init(this._mapParams),
                    L.instance.setTarget(this._myPlayer.node),
                    L.instance.setViewToPoint(this._myPlayer.node.position.x, this._myPlayer.node.position.y)
                }
                ,
                r.initBGM = function() {
                    M.instance.stopBGSound(),
                    M.instance.playBGSound(S.getMapBGSound(this.sceneData.currentMapId))
                }
                ,
                r.initRVO = function() {
                    m.instance.refresh();
                    for (var t = I.instance.getObstacleEdge(), i = t.length, n = 0; n < i; n++) {
                        var e = t[n]
                          , a = [];
                        a.push(new d(e.startX,e.startY)),
                        a.push(new d(e.endX,e.endY)),
                        f.instance.addObstacle(a)
                    }
                    f.instance.processObstacles(),
                    m.instance.startup();
                    var s = this.roadLayer.getComponent(y);
                    I.instance.showObstacleEdge(s)
                }
                ,
                r.initFogOfWar = function() {
                    null != P.instance && (P.instance.node.position = new h(-this.winSize.width / 2,-this.winSize.height / 2),
                    P.instance.init(this.mapLayer.width, this.mapLayer.height))
                }
                ,
                r.getMapParams = function(t, i, n) {
                    void 0 === n && (n = 1);
                    var e = new T;
                    return e.name = t.name,
                    e.bgName = t.bgName,
                    e.mapType = t.type,
                    e.mapWidth = t.mapWidth,
                    e.mapHeight = t.mapHeight,
                    e.ceilWidth = t.nodeWidth,
                    e.ceilHeight = t.nodeHeight,
                    e.viewWidth = t.mapWidth > this.winSize.width ? this.winSize.width : t.mapWidth,
                    e.viewHeight = t.mapHeight > this.winSize.height ? this.winSize.height : t.mapHeight,
                    e.sliceWidth = 256,
                    e.sliceHeight = 256,
                    e.bgTex = i,
                    e.mapLoadModel = n,
                    e
                }
                ,
                r.getSpawnPoint = function(t) {
                    void 0 === t && (t = 0);
                    for (var i = 0; i < this.spawnPointList.length; i++)
                        if (this.spawnPointList[i].spawnId == t)
                            return this.spawnPointList[i];
                    if (0 == t)
                        for (i = 0; i < this.spawnPointList.length; i++)
                            if (this.spawnPointList[i].defaultSpawn)
                                return this.spawnPointList[i];
                    return console.error("地图" + this.sceneData.currentMapId + "不存在这个出生点 spawnId = " + t),
                    null
                }
                ,
                r.showRoadSign = function(t) {
                    this.roadSign || (this.roadSign = O.instance.otherMgr.getRoadSign(),
                    this.roadSign.node.parent = this.node),
                    this.roadSign.node.position = t,
                    this.roadSign.play()
                }
                ,
                r.update2 = function(t) {
                    if (null != P.instance && (this._fogWartime -= t,
                    this._fogWartime <= 0)) {
                        this._fogWartime = .02;
                        var i = this.myPlayer.mapPos;
                        (null == this._lastPlayerPos || Math.abs(i.x - this._lastPlayerPos.x) > 1 || Math.abs(i.y - this._lastPlayerPos.y) > 1) && (null == this._lastPlayerPos && (this._lastPlayerPos = new h),
                        this._lastPlayerPos.x = i.x,
                        this._lastPlayerPos.y = i.y,
                        P.instance.drawOval(this.myPlayer.x, this.myPlayer.y + 35, 80, 120));
                        for (var n = 0; n < this.npcList.length; n++)
                            P.instance.drawOval(this.npcList[n].x, this.npcList[n].y + 35, 160, 100)
                    }
                }
                ,
                r.getPos = function() {
                    return new h(Math.ceil(this.myPlayer.x),Math.ceil(this.myPlayer.y),0)
                }
                ,
                r.destroySelf = function() {
                    this.node.destroy()
                }
                ,
                s(i, [{
                    key: "myPlayer",
                    get: function() {
                        return this._myPlayer
                    }
                }, {
                    key: "sceneData",
                    get: function() {
                        return this._sceneData
                    }
                }, {
                    key: "mapData",
                    get: function() {
                        return this._mapData
                    }
                }, {
                    key: "winSize",
                    get: function() {
                        return null == this._winSize && (this._winSize = c.getVisibleSize()),
                        this._winSize
                    }
                }]),
                i
            }(g)).instance = null,
            Y.isDrawRoadLayer = !0,
            F = i((N = Y).prototype, "layer", [G], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            k = i(N.prototype, "mapLayer", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            X = i(N.prototype, "entityLayer", [V], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            A = i(N.prototype, "roadLayer", [H], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            B = N)) || B));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/GameObject.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(e) {
    "use strict";
    var t, r, n, c, i, o;
    return {
        setters: [function(e) {
            t = e.inheritsLoose,
            r = e.createClass
        }
        , function(e) {
            n = e.cclegacy,
            c = e._decorator,
            i = e.Node,
            o = e.director
        }
        ],
        execute: function() {
            var a;
            n._RF.push({}, "75cc0eX5ChHrrsMSLK1O49f", "GameObject", void 0);
            var s = c.ccclass
              , u = (c.property,
            e("GameObject", s("GameObject")(a = function(e) {
                function n() {
                    return e.apply(this, arguments) || this
                }
                return t(n, e),
                n.prototype.setActive = function(e) {
                    this.active != e && (this.active = e)
                }
                ,
                n.Find = function(e) {
                    var t = o.getScene();
                    return this.searchChildByName(t, e)
                }
                ,
                n.searchChildByName = function(e, t) {
                    var r = e.getChildByName(t);
                    if (r)
                        return r;
                    for (var n = e.children.length, c = null, i = 0; i < n; i++) {
                        if ((c = e.children[i]).name == t)
                            return r = c;
                        if (r = this.searchChildByName(c, t))
                            return r
                    }
                    return r
                }
                ,
                n.FindObjectOfType = function(e) {
                    var t = e;
                    return o.getScene().getComponentInChildren(t)
                }
                ,
                n.FindObjectsOfType = function(e) {
                    var t = e;
                    return o.getScene().getComponentsInChildren(t)
                }
                ,
                r(n, [{
                    key: "transform",
                    get: function() {
                        return this
                    }
                }, {
                    key: "gameObject",
                    get: function() {
                        return this
                    }
                }]),
                n
            }(i)) || a));
            i.prototype.gameObject = u.prototype.gameObject,
            i.prototype.transform = u.prototype.transform,
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/GamePlatformConfig.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GamePlatformType.ts"], (function(e) {
    "use strict";
    var t, i, r, n, a, o, l, u, p, c;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            i = e.inheritsLoose,
            r = e.initializerDefineProperty,
            n = e.assertThisInitialized
        }
        , function(e) {
            a = e.cclegacy,
            o = e._decorator,
            l = e.Enum,
            u = e.CCString,
            p = e.Component
        }
        , function(e) {
            c = e.GamePlatformType
        }
        ],
        execute: function() {
            var s, f, d, y, m, b, g, v, h, P, _, z, I;
            a._RF.push({}, "528cbjxl4NMPJHih40vL3Fg", "GamePlatformConfig", void 0);
            var w = o.ccclass
              , C = o.property;
            e("default", (s = w("GamePlatformConfig"),
            f = C({
                type: l(c),
                displayName: "平台类型"
            }),
            d = C({
                displayName: "游戏appid"
            }),
            y = C({
                displayName: "游戏密匙"
            }),
            m = C({
                type: u,
                displayName: "视频广告"
            }),
            b = C({
                type: u,
                displayName: "横幅广告"
            }),
            s((h = t((v = function(e) {
                function t() {
                    for (var t, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
                        a[o] = arguments[o];
                    return t = e.call.apply(e, [this].concat(a)) || this,
                    r(t, "type", h, n(t)),
                    r(t, "appId", P, n(t)),
                    r(t, "secret", _, n(t)),
                    r(t, "videoAd_unitIds", z, n(t)),
                    r(t, "bannerAd_unitIds", I, n(t)),
                    t
                }
                return i(t, e),
                t
            }(p)).prototype, "type", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return c.none
                }
            }),
            P = t(v.prototype, "appId", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ""
                }
            }),
            _ = t(v.prototype, "secret", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ""
                }
            }),
            z = t(v.prototype, "videoAd_unitIds", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ["", "", "", "", ""]
                }
            }),
            I = t(v.prototype, "bannerAd_unitIds", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ["", "", "", "", ""]
                }
            }),
            g = v)) || g));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/GamePlatformType.ts", ["cc"], (function(e) {
    "use strict";
    var t;
    return {
        setters: [function(e) {
            t = e.cclegacy
        }
        ],
        execute: function() {
            var o;
            e("GamePlatformType", void 0),
            t._RF.push({}, "6a74ffrhv9Is5BipTnepB3S", "GamePlatformType", void 0),
            function(e) {
                e[e.none = 0] = "none",
                e[e.pc = 1] = "pc",
                e[e.wx = 2] = "wx",
                e[e.tt = 3] = "tt",
                e[e.qq = 4] = "qq",
                e[e.oppo = 5] = "oppo",
                e[e.vivo = 6] = "vivo"
            }(o || (o = e("GamePlatformType", {}))),
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/GameWorld.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./SceneManager.ts", "./GameMap.ts"], (function(e) {
    "use strict";
    var t, n, a, i, r, o, s, c, l, p, u, f, d;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            n = e.inheritsLoose,
            a = e.initializerDefineProperty,
            i = e.assertThisInitialized
        }
        , function(e) {
            r = e.cclegacy,
            o = e._decorator,
            s = e.Prefab,
            c = e.instantiate,
            l = e.Vec3,
            p = e.Component
        }
        , function(e) {
            u = e.default,
            f = e.SceneEventType
        }
        , function(e) {
            d = e.default
        }
        ],
        execute: function() {
            var h, m, g, M, v, y;
            r._RF.push({}, "80b063gthdC1Lm58FnLGdM3", "GameWorld", void 0);
            var b = o.ccclass
              , L = o.property;
            e("default", (h = b("GameWorld"),
            m = L(s),
            h(((y = function(e) {
                function t() {
                    for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
                        r[o] = arguments[o];
                    return t = e.call.apply(e, [this].concat(r)) || this,
                    a(t, "gameMapPrefab", v, i(t)),
                    t.gameMap = null,
                    t
                }
                n(t, e);
                var r = t.prototype;
                return r.onLoad = function() {
                    t.instance = this,
                    this.init()
                }
                ,
                r.start = function() {}
                ,
                r.init = function() {
                    this.registerEvent()
                }
                ,
                r.registerEvent = function() {
                    u.instance.on(f.LOAD_COMPLETE, this.onSceneLoadComp, this)
                }
                ,
                r.onSceneLoadComp = function(e) {
                    null != this.gameMap && (this.gameMap.destroySelf(),
                    this.gameMap = null),
                    this.gameMap = this.createMap(),
                    this.gameMap.init(e)
                }
                ,
                r.createMap = function() {
                    var e = c(this.gameMapPrefab).getComponent(d);
                    return e.node.parent = this.node,
                    e.node.active = !0,
                    e.node.position = new l(0,0,0),
                    e
                }
                ,
                r.isMapValid = function() {
                    return null != this.gameMap && this.gameMap.isValid && this.gameMap.node.isValid
                }
                ,
                t
            }(p)).instance = null,
            v = t((M = y).prototype, "gameMapPrefab", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            g = M)) || g));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/InputManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(e) {
    "use strict";
    var t, n, o, i, s, u, r, c, a, h, y, p;
    return {
        setters: [function(e) {
            t = e.inheritsLoose,
            n = e.createClass
        }
        , function(e) {
            o = e.cclegacy,
            i = e._decorator,
            s = e.Vec2,
            u = e.input,
            r = e.Input,
            c = e.EventMouse,
            a = e.Node,
            h = e.game,
            y = e.UITransform,
            p = e.Component
        }
        ],
        execute: function() {
            var d, D;
            e({
                KeyStatus: void 0,
                MouseButtonCode: void 0,
                TouchPhase: void 0,
                UKeyCode: void 0
            }),
            o._RF.push({}, "a966d1Zw7RNab7Zw0mTKGMY", "InputManager", void 0);
            var l = i.ccclass
              , f = (i.property,
            e("UInput", function() {
                function e() {}
                return e.getKeyDown = function(t) {
                    return e.keyDic[t] == g.keyDown
                }
                ,
                e.getKey = function(t) {
                    return e.keyDic[t] == g.keyDown || e.keyDic[t] == g.press
                }
                ,
                e.getKeyUp = function(t) {
                    return e.keyDic[t] == g.keyUp
                }
                ,
                e.getMouseButtonDown = function(t) {
                    return e.mouseBtnDic[t] == g.keyDown
                }
                ,
                e.getMouseButton = function(t) {
                    return e.mouseBtnDic[t] == g.keyDown || e.mouseBtnDic[t] == g.press
                }
                ,
                e.getMouseButtonUp = function(t) {
                    return e.mouseBtnDic[t] == g.keyUp
                }
                ,
                e.getTouch = function(e) {
                    for (var t = 0; t < this.touches.length; t++)
                        if (this.touches[t].fingerId == e)
                            return this.touches[t];
                    return null
                }
                ,
                e
            }()));
            f.mousePosition = s.ZERO,
            f.axis = s.ZERO,
            f.keyDic = {},
            f.mouseBtnDic = {},
            f.touches = [];
            var g, w, v, m = e("default", l("InputManager")(((D = function(e) {
                function o() {
                    for (var t, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
                        o[i] = arguments[i];
                    return (t = e.call.apply(e, [this].concat(o)) || this).discardKeyList = [],
                    t.mouseDiscardKeyList = [],
                    t.axisDir = new s(0,0),
                    t
                }
                t(o, e);
                var i = o.prototype;
                return i.init = function() {}
                ,
                i.onLoad = function() {
                    u.on(r.EventType.KEY_DOWN, this.onKeyDown, this),
                    u.on(r.EventType.KEY_UP, this.onKeyUp, this)
                }
                ,
                i.start = function() {
                    u.on(r.EventType.MOUSE_DOWN, this.onMouseDown, this),
                    u.on(r.EventType.MOUSE_UP, this.onMouseUp, this),
                    u.on(r.EventType.MOUSE_MOVE, this.onMouseMove, this),
                    u.on(r.EventType.TOUCH_START, this.onTouchStart, this),
                    u.on(r.EventType.TOUCH_MOVE, this.onTouchMove, this),
                    u.on(r.EventType.TOUCH_END, this.onTouchEnd, this),
                    u.on(r.EventType.TOUCH_CANCEL, this.onTouchCancle, this)
                }
                ,
                i.startup = function() {
                    console.log("InputManager 启动输入管理")
                }
                ,
                i.onKeyDown = function(e) {
                    var t = e.keyCode;
                    e.keyCode >= 48 && e.keyCode <= 57 && (t += 48),
                    f.keyDic[t] || (f.keyDic[t] = g.keyDown)
                }
                ,
                i.onKeyUp = function(e) {
                    var t = e.keyCode;
                    e.keyCode >= 48 && e.keyCode <= 57 && (t += 48),
                    f.keyDic[t] = g.keyUp
                }
                ,
                i.onMouseDown = function(e) {
                    e.preventSwallow = !0,
                    e.getButton() == c.BUTTON_LEFT ? f.mouseBtnDic[v.Left] = g.keyDown : e.getButton() == c.BUTTON_RIGHT ? f.mouseBtnDic[v.Right] = g.keyDown : e.getButton() == c.BUTTON_MIDDLE && (f.mouseBtnDic[v.Midden] = g.keyDown)
                }
                ,
                i.onMouseUp = function(e) {
                    e.preventSwallow = !0,
                    e.getButton() == c.BUTTON_LEFT ? f.mouseBtnDic[v.Left] = g.keyUp : e.getButton() == c.BUTTON_RIGHT ? f.mouseBtnDic[v.Right] = g.keyUp : e.getButton() == c.BUTTON_MIDDLE && (f.mouseBtnDic[v.Midden] = g.keyUp)
                }
                ,
                i.onMouseMove = function(e) {
                    e.preventSwallow = !0,
                    f.mousePosition = e.getUILocation()
                }
                ,
                i.onMouseLeave = function(e) {
                    e.preventSwallow = !0,
                    f.mousePosition = s.ZERO
                }
                ,
                i.onTouchStart = function(e) {
                    e.preventSwallow = !0;
                    for (var t = e.getTouches(), n = [], o = 0; o < t.length; o++) {
                        var i = new k;
                        i.touch = t[o],
                        i.fingerId = o,
                        i.phase = T.Began,
                        n.push(i)
                    }
                    f.touches = n
                }
                ,
                i.onTouchMove = function(e) {
                    e.preventSwallow = !0;
                    for (var t = e.getTouches(), n = [], o = 0; o < t.length; o++) {
                        var i = new k;
                        i.touch = t[o],
                        i.fingerId = o,
                        i.phase = T.Moved,
                        n.push(i)
                    }
                    f.touches = n
                }
                ,
                i.onTouchEnd = function(e) {
                    e.preventSwallow = !0;
                    for (var t = 0; t < f.touches.length; t++) {
                        f.touches[t].phase = T.Ended
                    }
                }
                ,
                i.onTouchCancle = function(e) {
                    e.preventSwallow = !0;
                    for (var t = 0; t < f.touches.length; t++) {
                        f.touches[t].phase = T.Canceled
                    }
                }
                ,
                i.update = function(e) {
                    this.axisDir.x = 0,
                    this.axisDir.y = 0,
                    (f.getKey(w.LeftArrow) || f.getKey(w.A)) && (this.axisDir.x = -1),
                    (f.getKey(w.RightArrow) || f.getKey(w.D)) && (this.axisDir.x = 1),
                    (f.getKey(w.UpArrow) || f.getKey(w.W)) && (this.axisDir.y = 1),
                    (f.getKey(w.DownArrow) || f.getKey(w.S)) && (this.axisDir.y = -1),
                    f.axis = this.axisDir
                }
                ,
                i.lateUpdate = function() {
                    for (var e = 0; e < this.discardKeyList.length; e++)
                        delete f.keyDic[this.discardKeyList[e]];
                    for (var t in this.discardKeyList.length = 0,
                    f.keyDic)
                        f.keyDic[t] == g.keyDown && (f.keyDic[t] = g.press),
                        f.keyDic[t] == g.keyUp && (f.keyDic[t] = g.none,
                        this.discardKeyList.push(Number(t)));
                    for (e = 0; e < this.mouseDiscardKeyList.length; e++)
                        delete f.mouseBtnDic[this.mouseDiscardKeyList[e]];
                    for (var n in this.mouseDiscardKeyList.length = 0,
                    f.mouseBtnDic)
                        f.mouseBtnDic[n] == g.keyDown && (f.mouseBtnDic[n] = g.press),
                        f.mouseBtnDic[n] == g.keyUp && (f.mouseBtnDic[n] = g.none,
                        this.mouseDiscardKeyList.push(Number(n)));
                    for (e = 0; e < f.touches.length; e++) {
                        var o = f.touches[e];
                        o.phase != T.Began && o.phase != T.Moved || (o.phase = T.Stationary),
                        o.phase != T.Ended && o.phase != T.Canceled || (f.touches.splice(e, 1),
                        e--)
                    }
                }
                ,
                n(o, null, [{
                    key: "instance",
                    get: function() {
                        if (null == this._instance) {
                            var e = new a("InputManager");
                            h.addPersistRootNode(e),
                            e.addComponent(y),
                            this._instance = e.addComponent(o),
                            this._instance.init()
                        }
                        return this._instance
                    }
                }]),
                o
            }(p))._instance = void 0,
            d = D)) || d);
            CC_EDITOR || m.instance.startup(),
            function(e) {
                e[e.none = 0] = "none",
                e[e.keyDown = 1] = "keyDown",
                e[e.press = 2] = "press",
                e[e.keyUp = 3] = "keyUp"
            }(g || (g = e("KeyStatus", {}))),
            function(e) {
                e[e.None = 0] = "None",
                e[e.Space = 32] = "Space",
                e[e.Enter = 13] = "Enter",
                e[e.Ctrl = 17] = "Ctrl",
                e[e.Alt = 18] = "Alt",
                e[e.Escape = 27] = "Escape",
                e[e.LeftArrow = 37] = "LeftArrow",
                e[e.UpArrow = 38] = "UpArrow",
                e[e.RightArrow = 39] = "RightArrow",
                e[e.DownArrow = 40] = "DownArrow",
                e[e.A = 65] = "A",
                e[e.B = 66] = "B",
                e[e.C = 67] = "C",
                e[e.D = 68] = "D",
                e[e.E = 69] = "E",
                e[e.F = 70] = "F",
                e[e.G = 71] = "G",
                e[e.H = 72] = "H",
                e[e.I = 73] = "I",
                e[e.J = 74] = "J",
                e[e.K = 75] = "K",
                e[e.L = 76] = "L",
                e[e.M = 77] = "M",
                e[e.N = 78] = "N",
                e[e.O = 79] = "O",
                e[e.P = 80] = "P",
                e[e.Q = 81] = "Q",
                e[e.R = 82] = "R",
                e[e.S = 83] = "S",
                e[e.T = 84] = "T",
                e[e.U = 85] = "U",
                e[e.V = 86] = "V",
                e[e.W = 87] = "W",
                e[e.X = 88] = "X",
                e[e.Y = 89] = "Y",
                e[e.Z = 90] = "Z",
                e[e.F1 = 112] = "F1",
                e[e.F2 = 113] = "F2",
                e[e.F3 = 114] = "F3",
                e[e.F4 = 115] = "F4",
                e[e.F5 = 116] = "F5",
                e[e.F6 = 117] = "F6",
                e[e.F7 = 118] = "F7",
                e[e.F8 = 119] = "F8",
                e[e.F9 = 120] = "F9",
                e[e.F10 = 121] = "F10",
                e[e.F11 = 122] = "F11",
                e[e.F12 = 123] = "F12",
                e[e.Num0 = 96] = "Num0",
                e[e.Num1 = 97] = "Num1",
                e[e.Num2 = 98] = "Num2",
                e[e.Num3 = 99] = "Num3",
                e[e.Num4 = 100] = "Num4",
                e[e.Num5 = 101] = "Num5",
                e[e.Num6 = 102] = "Num6",
                e[e.Num7 = 103] = "Num7",
                e[e.Num8 = 104] = "Num8",
                e[e.Num9 = 105] = "Num9"
            }(w || (w = e("UKeyCode", {}))),
            function(e) {
                e[e.Left = 0] = "Left",
                e[e.Right = 1] = "Right",
                e[e.Midden = 2] = "Midden"
            }(v || (v = e("MouseButtonCode", {})));
            var T, k = e("TouchData", (function() {
                this.touch = null,
                this.fingerId = 0,
                this.phase = T.Began
            }
            ));
            !function(e) {
                e[e.Began = 0] = "Began",
                e[e.Moved = 1] = "Moved",
                e[e.Stationary = 2] = "Stationary",
                e[e.Ended = 3] = "Ended",
                e[e.Canceled = 4] = "Canceled"
            }(T || (T = e("TouchPhase", {}))),
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/IRoadSeeker.ts", ["cc"], (function() {
    "use strict";
    var e;
    return {
        setters: [function(t) {
            e = t.cclegacy
        }
        ],
        execute: function() {
            e._RF.push({}, "e4f3f6Ez/xAyqwa4NhT8jTY", "IRoadSeeker", void 0),
            e._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Joystick.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var r, e, o, i, n, c, s, u;
    return {
        setters: [function(t) {
            r = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            o = t.initializerDefineProperty,
            i = t.assertThisInitialized
        }
        , function(t) {
            n = t.cclegacy,
            c = t._decorator,
            s = t.Node,
            u = t.Component
        }
        ],
        execute: function() {
            var a, l, p, f, d;
            n._RF.push({}, "5cf1eUddDtEbo4Yg+BcoH4F", "Joystick", void 0);
            var y = c.ccclass
              , h = c.property;
            t("default", (a = y("Joystick"),
            l = h(s),
            a((d = r((f = function(t) {
                function r() {
                    for (var r, e = arguments.length, n = new Array(e), c = 0; c < e; c++)
                        n[c] = arguments[c];
                    return r = t.call.apply(t, [this].concat(n)) || this,
                    o(r, "cursor", d, i(r)),
                    r
                }
                e(r, t);
                var n = r.prototype;
                return n.start = function() {}
                ,
                n.cursorTo = function(t) {
                    this.cursor.position = t.clone().multiplyScalar(20)
                }
                ,
                n.show = function() {
                    this.node.active = !0
                }
                ,
                n.hidden = function() {
                    this.node.active = !1
                }
                ,
                r
            }(u)).prototype, "cursor", [l], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            p = f)) || p));
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/JoystickController.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./SceneManager.ts", "./GameWorld.ts", "./GameController.ts", "./InputManager.ts", "./Joystick.ts"], (function(o) {
    "use strict";
    var t, i, e, n, r, s, c, a, l, u, h, y, f, p, C, v, d, m;
    return {
        setters: [function(o) {
            t = o.applyDecoratedDescriptor,
            i = o.inheritsLoose,
            e = o.initializerDefineProperty,
            n = o.assertThisInitialized
        }
        , function(o) {
            r = o.cclegacy,
            s = o._decorator,
            c = o.Vec2,
            a = o.Vec3,
            l = o.Node,
            u = o.view,
            h = o.Component
        }
        , function(o) {
            y = o.ControlMode
        }
        , function(o) {
            f = o.default,
            p = o.SceneEventType
        }
        , function(o) {
            C = o.default
        }
        , function(o) {
            v = o.default
        }
        , function(o) {
            d = o.UInput
        }
        , function(o) {
            m = o.default
        }
        ],
        execute: function() {
            var M, g, k, T, j;
            r._RF.push({}, "6b1bfPm88pBV4mbkuwBDXbM", "JoystickController", void 0);
            var D = s.ccclass
              , x = s.property;
            o("default", (M = D("JoystickController"),
            g = x(m),
            M((j = t((T = function(o) {
                function t() {
                    for (var t, i = arguments.length, r = new Array(i), s = 0; s < i; s++)
                        r[s] = arguments[s];
                    return t = o.call.apply(o, [this].concat(r)) || this,
                    e(t, "joyStick", j, n(t)),
                    t.touchPos = c.ZERO,
                    t.gameController = null,
                    t.joyMoveDir = new a(0,0,0),
                    t
                }
                i(t, o);
                var r = t.prototype;
                return r.onLoad = function() {
                    this.gameController = this.getComponent(v)
                }
                ,
                r.start = function() {
                    f.instance.on(p.Map_INIT_COMPLETE, this.onMapInitComp, this)
                }
                ,
                r.onMapInitComp = function(o) {
                    var t = C.instance.gameMap.node;
                    t.on(l.EventType.TOUCH_START, this.onJoystickTouchStart, this),
                    t.on(l.EventType.TOUCH_MOVE, this.onJoystickTouchMove, this),
                    t.on(l.EventType.TOUCH_END, this.onJoystickTouchEnd, this),
                    t.on(l.EventType.TOUCH_CANCEL, this.onJoystickTouchEnd, this)
                }
                ,
                r.update = function(o) {
                    if (this.gameController.controlMode == y.joystick && this.gameController.isCanControlPlayer()) {
                        var t = C.instance.gameMap.myPlayer;
                        0 != d.axis.x ? t.moveDir.x = d.axis.x : t.moveDir.x = this.joyMoveDir.x,
                        0 != d.axis.y ? t.moveDir.y = d.axis.y : t.moveDir.y = this.joyMoveDir.y
                    }
                }
                ,
                r.onJoystickTouchStart = function(o) {
                    if (this.gameController.controlMode == y.joystick) {
                        if (!this.gameController.isCanControlPlayer())
                            return;
                        var t = u.getVisibleSize();
                        this.touchPos = o.getUILocation(),
                        this.joyStick.node.position = new a(this.touchPos.x - .5 * t.width,this.touchPos.y - .5 * t.height),
                        this.joyStick.show()
                    }
                }
                ,
                r.onJoystickTouchMove = function(o) {
                    if (this.gameController.controlMode == y.joystick) {
                        if (!this.gameController.isCanControlPlayer())
                            return;
                        var t = o.getUILocation().subtract(this.touchPos).normalize();
                        this.joyMoveDir.x = t.x,
                        this.joyMoveDir.y = t.y,
                        this.joyStick.cursorTo(this.joyMoveDir)
                    }
                }
                ,
                r.onJoystickTouchEnd = function(o) {
                    if (this.gameController.controlMode == y.joystick) {
                        if (!this.gameController.isCanControlPlayer())
                            return;
                        this.joyMoveDir.x = 0,
                        this.joyMoveDir.y = 0,
                        this.joyStick.hidden()
                    }
                }
                ,
                t
            }(h)).prototype, "joyStick", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            k = T)) || k));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/kdtree.ts", ["cc", "./Common.ts", "./Simulator.ts"], (function(e) {
    "use strict";
    var t, i, n, s;
    return {
        setters: [function(e) {
            t = e.cclegacy
        }
        , function(e) {
            i = e.RVOMath,
            n = e.Obstacle
        }
        , function(e) {
            s = e.Simulator
        }
        ],
        execute: function() {
            t._RF.push({}, "a7ee442uqxHILoPf3eaf9Mo", "kdtree", void 0);
            var r = function() {
                function e(e, t) {
                    this.a = void 0,
                    this.b = void 0,
                    this.a = e,
                    this.b = t
                }
                var t = e.prototype;
                return t.lessThan = function(e) {
                    return this.a < e.a || !(e.a < this.a) && this.b < e.b
                }
                ,
                t.lessEqualThan = function(e) {
                    return this.a == e.a && this.b == e.b || this.lessThan(e)
                }
                ,
                t.bigThan = function(e) {
                    return !this.lessEqualThan(e)
                }
                ,
                t.bigEqualThan = function(e) {
                    return !this.lessThan(e)
                }
                ,
                e
            }()
              , a = function() {
                this.begin = void 0,
                this.end = void 0,
                this.left = void 0,
                this.right = void 0,
                this.maxX = void 0,
                this.maxY = void 0,
                this.minX = void 0,
                this.minY = void 0
            }
              , h = function() {
                this.obstacle = void 0,
                this.left = void 0,
                this.right = void 0
            };
            e("KdTree", function() {
                function e() {
                    this.MAX_LEAF_SIZE = 10,
                    this.agents = null,
                    this.agentTree = [],
                    this.obstacleTree = null
                }
                var t = e.prototype;
                return t.buildAgentTree = function(e) {
                    if (!this.agents || this.agents.length != e || s.instance.hasAgentChange) {
                        s.instance.hasAgentChange = !1,
                        this.agents = new Array(e);
                        for (var t = 0; t < this.agents.length; t++)
                            this.agents[t] = s.instance.getAgent(t);
                        this.agentTree = new Array(2 * this.agents.length);
                        for (var i = 0; i < this.agentTree.length; i++)
                            this.agentTree[i] = new a
                    }
                    0 != this.agents.length && this.buildAgentTreeRecursive(0, this.agents.length, 0)
                }
                ,
                t.buildObstacleTree = function() {
                    this.obstacleTree = new h;
                    for (var e = new Array(s.instance.obstacles.length), t = 0; t < e.length; t++)
                        e[t] = s.instance.obstacles[t];
                    this.obstacleTree = this.buildObstacleTreeRecursive(e)
                }
                ,
                t.computeAgentNeighbors = function(e, t) {
                    return this.queryAgentTreeRecursive(e, t, 0)
                }
                ,
                t.computeObstacleNeighbors = function(e, t) {
                    this.queryObstacleTreeRecursive(e, t, this.obstacleTree)
                }
                ,
                t.queryVisibility = function(e, t, i) {
                    return this.queryVisibilityRecursive(e, t, i, this.obstacleTree)
                }
                ,
                t.buildAgentTreeRecursive = function(e, t, i) {
                    this.agentTree[i].begin = e,
                    this.agentTree[i].end = t,
                    this.agentTree[i].minX = this.agentTree[i].maxX = this.agents[e].position_.x,
                    this.agentTree[i].minY = this.agentTree[i].maxY = this.agents[e].position_.y;
                    for (var n = e + 1; n < t; ++n)
                        this.agentTree[i].maxX = Math.max(this.agentTree[i].maxX, this.agents[n].position_.x),
                        this.agentTree[i].minX = Math.min(this.agentTree[i].minX, this.agents[n].position_.x),
                        this.agentTree[i].maxY = Math.max(this.agentTree[i].maxY, this.agents[n].position_.y),
                        this.agentTree[i].minY = Math.min(this.agentTree[i].minY, this.agents[n].position_.y);
                    if (t - e > this.MAX_LEAF_SIZE) {
                        for (var s = this.agentTree[i].maxX - this.agentTree[i].minX > this.agentTree[i].maxY - this.agentTree[i].minY, r = .5 * (s ? this.agentTree[i].maxX + this.agentTree[i].minX : this.agentTree[i].maxY + this.agentTree[i].minY), a = e, h = t; a < h; ) {
                            for (; a < h && (s ? this.agents[a].position_.x : this.agents[a].position_.y) < r; )
                                ++a;
                            for (; h > a && (s ? this.agents[h - 1].position_.x : this.agents[h - 1].position_.y) >= r; )
                                --h;
                            if (a < h) {
                                var o = this.agents[a];
                                this.agents[a] = this.agents[h - 1],
                                this.agents[h - 1] = o,
                                ++a,
                                --h
                            }
                        }
                        var g = a - e;
                        0 == g && (++g,
                        ++a,
                        ++h),
                        this.agentTree[i].left = i + 1,
                        this.agentTree[i].right = i + 2 * g,
                        this.buildAgentTreeRecursive(e, a, this.agentTree[i].left),
                        this.buildAgentTreeRecursive(a, t, this.agentTree[i].right)
                    }
                }
                ,
                t.buildObstacleTreeRecursive = function(e) {
                    if (0 == e.length)
                        return null;
                    for (var t = new h, a = 0, o = e.length, g = o, u = 0; u < e.length; ++u) {
                        for (var l = 0, c = 0, f = e[u], T = f.next, v = 0; v < e.length; v++)
                            if (u != v) {
                                var p = e[v]
                                  , b = p.next
                                  , m = i.leftOf(f.point, T.point, p.point)
                                  , q = i.leftOf(f.point, T.point, b.point);
                                m >= -i.RVO_EPSILON && q >= -i.RVO_EPSILON ? ++l : (m <= i.RVO_EPSILON && q <= i.RVO_EPSILON || ++l,
                                ++c);
                                var x = new r(Math.max(l, c),Math.min(l, c))
                                  , y = new r(Math.max(o, g),Math.min(o, g));
                                if (x.bigEqualThan(y))
                                    break
                            }
                        var R = new r(Math.max(l, c),Math.min(l, c))
                          , O = new r(Math.max(o, g),Math.min(o, g));
                        R.lessThan(O) && (o = l,
                        g = c,
                        a = u)
                    }
                    for (var d = [], _ = 0; _ < o; ++_)
                        d.push(null);
                    for (var A = [], M = 0; M < g; ++M)
                        A.push(null);
                    for (var V = 0, X = 0, E = a, S = e[E], Y = S.next, I = 0; I < e.length; ++I)
                        if (E != I) {
                            var L = e[I]
                              , N = L.next
                              , w = i.leftOf(S.point, Y.point, L.point)
                              , P = i.leftOf(S.point, Y.point, N.point);
                            if (w >= -i.RVO_EPSILON && P >= -i.RVO_EPSILON)
                                d[V++] = e[I];
                            else if (w <= i.RVO_EPSILON && P <= i.RVO_EPSILON)
                                A[X++] = e[I];
                            else {
                                var F = i.det(Y.point.minus(S.point), L.point.minus(S.point)) / i.det(Y.point.minus(S.point), L.point.minus(N.point))
                                  , k = L.point.plus(N.point.minus(L.point).scale(F))
                                  , C = new n;
                                C.point = k,
                                C.previous = L,
                                C.next = N,
                                C.convex = !0,
                                C.direction = L.direction,
                                C.id = s.instance.obstacles.length,
                                s.instance.obstacles.push(C),
                                L.next = C,
                                N.previous = C,
                                w > 0 ? (d[V++] = L,
                                A[X++] = C) : (A[X++] = L,
                                d[V++] = C)
                            }
                        }
                    return t.obstacle = S,
                    t.left = this.buildObstacleTreeRecursive(d),
                    t.right = this.buildObstacleTreeRecursive(A),
                    t
                }
                ,
                t.queryAgentTreeRecursive = function(e, t, n) {
                    if (this.agentTree[n].end - this.agentTree[n].begin <= this.MAX_LEAF_SIZE)
                        for (var s = this.agentTree[n].begin; s < this.agentTree[n].end; ++s)
                            t = e.insertAgentNeighbor(this.agents[s], t);
                    else {
                        var r = i.sqr(Math.max(0, this.agentTree[this.agentTree[n].left].minX - e.position_.x)) + i.sqr(Math.max(0, e.position_.x - this.agentTree[this.agentTree[n].left].maxX)) + i.sqr(Math.max(0, this.agentTree[this.agentTree[n].left].minY - e.position_.y)) + i.sqr(Math.max(0, e.position_.y - this.agentTree[this.agentTree[n].left].maxY))
                          , a = i.sqr(Math.max(0, this.agentTree[this.agentTree[n].right].minX - e.position_.x)) + i.sqr(Math.max(0, e.position_.x - this.agentTree[this.agentTree[n].right].maxX)) + i.sqr(Math.max(0, this.agentTree[this.agentTree[n].right].minY - e.position_.y)) + i.sqr(Math.max(0, e.position_.y - this.agentTree[this.agentTree[n].right].maxY));
                        r < a ? r < t && a < (t = this.queryAgentTreeRecursive(e, t, this.agentTree[n].left)) && (t = this.queryAgentTreeRecursive(e, t, this.agentTree[n].right)) : a < t && r < (t = this.queryAgentTreeRecursive(e, t, this.agentTree[n].right)) && (t = this.queryAgentTreeRecursive(e, t, this.agentTree[n].left))
                    }
                    return t
                }
                ,
                t.queryObstacleTreeRecursive = function(e, t, n) {
                    if (null == n)
                        return t;
                    var s = n.obstacle
                      , r = s.next
                      , a = i.leftOf(s.point, r.point, e.position_);
                    return t = this.queryObstacleTreeRecursive(e, t, a >= 0 ? n.left : n.right),
                    i.sqr(a) / i.absSq(r.point.minus(s.point)) < t && (a < 0 && e.insertObstacleNeighbor(n.obstacle, t),
                    this.queryObstacleTreeRecursive(e, t, a >= 0 ? n.right : n.left)),
                    t
                }
                ,
                t.queryVisibilityRecursive = function(e, t, n, s) {
                    if (null == s)
                        return !0;
                    var r = s.obstacle
                      , a = r.next
                      , h = i.leftOf(r.point, a.point, e)
                      , o = i.leftOf(r.point, a.point, t)
                      , g = 1 / i.absSq(a.point.minus(r.point));
                    if (h >= 0 && o >= 0)
                        return this.queryVisibilityRecursive(e, t, n, s.left) && (i.sqr(h) * g >= i.sqr(n) && i.sqr(o) * g >= i.sqr(n) || this.queryVisibilityRecursive(e, t, n, s.right));
                    if (h <= 0 && o <= 0)
                        return this.queryVisibilityRecursive(e, t, n, s.right) && (i.sqr(h) * g >= i.sqr(n) && i.sqr(o) * g >= i.sqr(n) || this.queryVisibilityRecursive(e, t, n, s.left));
                    if (h >= 0 && o <= 0)
                        return this.queryVisibilityRecursive(e, t, n, s.left) && this.queryVisibilityRecursive(e, t, n, s.right);
                    var u = i.leftOf(e, t, r.point)
                      , l = i.leftOf(e, t, a.point)
                      , c = 1 / i.absSq(t.minus(e));
                    return u * l >= 0 && i.sqr(u) * c > i.sqr(n) && i.sqr(l) * c > i.sqr(n) && this.queryVisibilityRecursive(e, t, n, s.left) && this.queryVisibilityRecursive(e, t, n, s.right)
                }
                ,
                e
            }());
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Launch.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GamePlatformType.ts", "./GamePlatformConfig.ts"], (function(e) {
    "use strict";
    var t, n, r, o, i, a, l, c, p, u, s, f;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            n = e.inheritsLoose,
            r = e.initializerDefineProperty,
            o = e.assertThisInitialized
        }
        , function(e) {
            i = e.cclegacy,
            a = e._decorator,
            l = e.Enum,
            c = e.Node,
            p = e.director,
            u = e.Component
        }
        , function(e) {
            s = e.GamePlatformType
        }
        , function(e) {
            f = e.default
        }
        ],
        execute: function() {
            var y, m, g, h, d, b, v;
            i._RF.push({}, "5eeafsFYQxFToZfTwT0EzBs", "Launch", void 0);
            var C = a.ccclass
              , L = a.property;
            e("default", (y = C("Launch"),
            m = L({
                type: l(s),
                displayName: "选择平台"
            }),
            g = L(c),
            y((b = t((d = function(e) {
                function t() {
                    for (var t, n = arguments.length, i = new Array(n), a = 0; a < n; a++)
                        i[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(i)) || this,
                    r(t, "type", b, o(t)),
                    r(t, "platformConfig", v, o(t)),
                    t
                }
                return n(t, e),
                t.prototype.start = function() {
                    for (var e = this.platformConfig.getComponentsInChildren(f), t = null, n = 0; n < e.length; n++)
                        e[n].type == this.type && (t = e[n]);
                    null == t && ((t = new f).type = s.pc),
                    console.log("当前选择的游戏平台为 ", s[t.type]),
                    p.loadScene("Login")
                }
                ,
                t
            }(u)).prototype, "type", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return s.pc
                }
            }),
            v = t(d.prototype, "platformConfig", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            h = d)) || h));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Loading.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(e) {
    "use strict";
    var t, a, o, n, r, s, i, l, c, d, u;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            a = e.inheritsLoose,
            o = e.initializerDefineProperty,
            n = e.assertThisInitialized,
            r = e.createClass
        }
        , function(e) {
            s = e.cclegacy,
            i = e._decorator,
            l = e.Sprite,
            c = e.Label,
            d = e.director,
            u = e.Component
        }
        ],
        execute: function() {
            var h, p, g, L, f, y, m, S;
            e("LoadingStatus", void 0),
            s._RF.push({}, "2fc5cC47nhPwqk1BxMh3sMc", "Loading", void 0);
            var b, v = i.ccclass, N = i.property;
            !function(e) {
                e[e.none = 0] = "none",
                e[e.prepareLoading = 1] = "prepareLoading",
                e[e.loading = 2] = "loading",
                e[e.complete = 3] = "complete"
            }(b || (b = e("LoadingStatus", {})));
            e("default", (h = v("Loading"),
            p = N(l),
            g = N(c),
            h(((S = function(e) {
                function t() {
                    for (var t, a = arguments.length, r = new Array(a), s = 0; s < a; s++)
                        r[s] = arguments[s];
                    return t = e.call.apply(e, [this].concat(r)) || this,
                    o(t, "bar", y, n(t)),
                    o(t, "progressTxt", m, n(t)),
                    t.currentLoad = 0,
                    t.alreadyLoad = 0,
                    t.loadScale = 1,
                    t.totalLoad = 100,
                    t._progress = 0,
                    t
                }
                a(t, e),
                t.loadScene = function(e) {
                    this.status != b.loading && (this.sceneName = e,
                    this.status = b.loading,
                    d.loadScene("Loading"))
                }
                ,
                t.reloadScene = function() {
                    this.status = b.none,
                    this.loadScene(this.sceneName)
                }
                ;
                var s = t.prototype;
                return s.start = function() {
                    var e = this;
                    this.bar.fillRange = 0,
                    this.currentLoad = 0,
                    this.alreadyLoad = 5,
                    t.sceneName && (t.status = b.loading,
                    this.loadSceneRes((function() {
                        t.status = b.complete,
                        e.alreadyLoad = e.totalLoad,
                        e.loadScale = 2.5
                    }
                    ))),
                    this.scheduleOnce((function() {
                        t.status != b.loading && t.status != b.complete || (console.error("场景加载超时！"),
                        t.reloadScene())
                    }
                    ), 18)
                }
                ,
                s.loadSceneRes = function(e) {
                    d.preloadScene(t.sceneName, (function(e, t, a) {
                        Number((e / t).toFixed(10))
                    }
                    ), (function(a) {
                        a ? (console.log("场景加载异常：sceneName", t.sceneName, " error ", a),
                        t.reloadScene()) : (console.log("加载完成"),
                        e())
                    }
                    ))
                }
                ,
                s.update = function(e) {
                    if (this.currentLoad < this.alreadyLoad) {
                        if (this.currentLoad += e * (50 * (this.alreadyLoad - this.currentLoad) / this.totalLoad + 50) * this.loadScale,
                        this.currentLoad >= this.alreadyLoad) {
                            this.currentLoad = this.alreadyLoad;
                            var t = .8 * this.totalLoad;
                            this.alreadyLoad < t && (this.alreadyLoad = this.alreadyLoad + (t - this.alreadyLoad) * (.005 * Math.random()),
                            this.alreadyLoad > t && (this.alreadyLoad = t))
                        }
                        this.progress = this.currentLoad / this.totalLoad,
                        this.currentLoad >= this.totalLoad && this.scheduleOnce(this.loadSceneComp, .1)
                    }
                }
                ,
                s.loadSceneComp = function() {
                    d.loadScene(t.sceneName, (function() {
                        console.log("场景" + t.sceneName + "加载完成"),
                        t.status = b.none
                    }
                    ))
                }
                ,
                r(t, [{
                    key: "progress",
                    get: function() {
                        return this._progress
                    },
                    set: function(e) {
                        this._progress != e && (this._progress = e,
                        null != this.bar && (this.bar.fillRange = this._progress),
                        null != this.progressTxt && (this.progressTxt.string = Math.floor(100 * this._progress) + "%"))
                    }
                }]),
                t
            }(u)).status = b.none,
            S.sceneName = null,
            y = t((f = S).prototype, "bar", [p], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            m = t(f.prototype, "progressTxt", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            L = f)) || L));
            s._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Login.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Loading.ts"], (function(t) {
    "use strict";
    var n, e, i, r, o, c, l, u, a, s;
    return {
        setters: [function(t) {
            n = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            i = t.initializerDefineProperty,
            r = t.assertThisInitialized
        }
        , function(t) {
            o = t.cclegacy,
            c = t._decorator,
            l = t.Button,
            u = t.Node,
            a = t.Component
        }
        , function(t) {
            s = t.default
        }
        ],
        execute: function() {
            var p, f, g, y, d, h, T;
            o._RF.push({}, "f06e3GRWftBwKyyVCcYT5ZO", "Login", void 0);
            var B = c.ccclass
              , v = c.property;
            t("default", (p = B("Login"),
            f = v(l),
            g = v(l),
            p((h = n((d = function(t) {
                function n() {
                    for (var n, e = arguments.length, o = new Array(e), c = 0; c < e; c++)
                        o[c] = arguments[c];
                    return n = t.call.apply(t, [this].concat(o)) || this,
                    i(n, "loginBtn", h, r(n)),
                    i(n, "registerBtn", T, r(n)),
                    n
                }
                return e(n, t),
                n.prototype.start = function() {
                    this.loginBtn.node.on(u.EventType.TOUCH_START, (function(t) {
                        s.loadScene("Main")
                    }
                    ), this),
                    this.registerBtn.node.on(u.EventType.TOUCH_START, (function(t) {}
                    ), this)
                }
                ,
                n
            }(a)).prototype, "loginBtn", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            T = n(d.prototype, "registerBtn", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            y = d)) || y));
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/main", ["./ControlMode.ts", "./Point.ts", "./RoadNode.ts", "./MapType.ts", "./MapRoadUtils.ts", "./BinaryTreeNode.ts", "./PathLog.ts", "./PathOptimize.ts", "./AstarHoneycombRoadSeeker.ts", "./PathQuadSeek.ts", "./AStarRoadSeeker.ts", "./PathFindingAgent.ts", "./Common.ts", "./Agent.ts", "./kdtree.ts", "./Simulator.ts", "./RVOSystem.ts", "./NavJoystick.ts", "./NavPath.ts", "./NavRVO.ts", "./NavAgent.ts", "./Behaviour.ts", "./MovieClip.ts", "./TextureUtils.ts", "./FogOfWar.ts", "./Unit.ts", "./NavUnit.ts", "./Actor.ts", "./Actor2.ts", "./AnimationController.ts", "./BaseView.ts", "./Player.ts", "./Body.ts", "./UIManager.ts", "./BottomToolBar.ts", "./CameraController.ts", "./SoundManager.ts", "./DataConfig.ts", "./EditObjData.ts", "./EntityLayer.ts", "./MapLoadModel.ts", "./SceneManager.ts", "./TransferDoor.ts", "./FootTrigger.ts", "./Monster.ts", "./MonsterManager.ts", "./NPCTalkBoard.ts", "./NPC.ts", "./NpcManager.ts", "./RoadSign.ts", "./SpawnPoint.ts", "./OtherManager.ts", "./Pet.ts", "./PetManager.ts", "./PlayerManager.ts", "./GameManager.ts", "./MapParams.ts", "./MapLayer.ts", "./ObstacleEdgeUtils.ts", "./GameMap.ts", "./GameWorld.ts", "./GameController.ts", "./GameObject.ts", "./GamePlatformType.ts", "./GamePlatformConfig.ts", "./InputManager.ts", "./IRoadSeeker.ts", "./Joystick.ts", "./JoystickController.ts", "./Launch.ts", "./Loading.ts", "./Login.ts", "./Main.ts", "./MapBar.ts", "./MapData.ts", "./MiniMapView.ts", "./MouseCursorController.ts", "./SystemManager.ts", "./TopToolBar.ts", "./TouchController.ts", "./Transform.ts"], (function() {
    "use strict";
    return {
        setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        execute: function() {}
    }
}
));

System.register("chunks:///_virtual/Main.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Behaviour.ts", "./MapLoadModel.ts", "./SceneManager.ts"], (function(t) {
    "use strict";
    var n, i, e, o, a, c, s;
    return {
        setters: [function(t) {
            n = t.inheritsLoose
        }
        , function(t) {
            i = t.cclegacy,
            e = t._decorator,
            o = t.setDisplayStats
        }
        , function(t) {
            a = t.Behaviour
        }
        , function(t) {
            c = t.MapLoadModel
        }
        , function(t) {
            s = t.default
        }
        ],
        execute: function() {
            var u;
            i._RF.push({}, "08578t5Vl9N1ZlW30M5nHYi", "Main", void 0);
            var r = e.ccclass;
            e.property,
            t("default", r("Main")(u = function(t) {
                function i() {
                    return t.apply(this, arguments) || this
                }
                n(i, t);
                var e = i.prototype;
                return e.onLoad = function() {
                    o(!1)
                }
                ,
                e.start = function() {
                    this.init()
                }
                ,
                e.update = function(t) {}
                ,
                e.init = function() {
                    this.initScene()
                }
                ,
                e.initScene = function() {
                    s.instance.loadMap("10001", 0, c.slices)
                }
                ,
                i
            }(a)) || u);
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MapBar.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MapLoadModel.ts", "./SceneManager.ts"], (function(t) {
    "use strict";
    var e, n, r, a, o, i, c, s, p, u;
    return {
        setters: [function(t) {
            e = t.applyDecoratedDescriptor,
            n = t.inheritsLoose,
            r = t.initializerDefineProperty,
            a = t.assertThisInitialized
        }
        , function(t) {
            o = t.cclegacy,
            i = t._decorator,
            c = t.Node,
            s = t.Component
        }
        , function(t) {
            p = t.MapLoadModel
        }
        , function(t) {
            u = t.default
        }
        ],
        execute: function() {
            var l, f, d, h, m;
            o._RF.push({}, "d2544RaaRdHhrjMgF9cvxf4", "MapBar", void 0);
            var M = i.ccclass
              , y = i.property;
            t("default", (l = M("MapBar"),
            f = y(c),
            l((m = e((h = function(t) {
                function e() {
                    for (var e, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
                        o[i] = arguments[i];
                    return e = t.call.apply(t, [this].concat(o)) || this,
                    r(e, "mapItems", m, a(e)),
                    e
                }
                return n(e, t),
                e.prototype.start = function() {
                    for (var t = this, e = function(e) {
                        t.mapItems[e].on(c.EventType.TOUCH_START, (function(t) {
                            u.instance.loadMap("" + (1e4 + (e + 1)), 1, p.slices)
                        }
                        ))
                    }, n = 0; n < this.mapItems.length; n++)
                        e(n)
                }
                ,
                e
            }(s)).prototype, "mapItems", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return []
                }
            }),
            d = h)) || d));
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MapData.ts", ["cc", "./MapType.ts"], (function(t) {
    "use strict";
    var i, s;
    return {
        setters: [function(t) {
            i = t.cclegacy
        }
        , function(t) {
            s = t.MapType
        }
        ],
        execute: function() {
            i._RF.push({}, "a0091ubw51FsLzsP1pcYli/", "MapData", void 0);
            t("default", (function() {
                this.name = "",
                this.bgName = "",
                this.type = s.angle45,
                this.mapWidth = 0,
                this.mapHeight = 0,
                this.nodeWidth = 0,
                this.nodeHeight = 0,
                this.roadDataArr = [],
                this.mapItems = [],
                this.alignment = 0,
                this.offsetX = 0,
                this.offsetY = 0
            }
            ));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MapLayer.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CameraController.ts", "./MapLoadModel.ts"], (function(e) {
    "use strict";
    var t, i, a, r, s, n, o, m, h, l, c, g, p, d, u, f, _;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            i = e.inheritsLoose,
            a = e.initializerDefineProperty,
            r = e.assertThisInitialized,
            s = e.createClass
        }
        , function(e) {
            n = e.cclegacy,
            o = e._decorator,
            m = e.Sprite,
            h = e.Node,
            l = e.UITransform,
            c = e.SpriteFrame,
            g = e.Vec3,
            p = e.resources,
            d = e.Texture2D,
            u = e.Component
        }
        , function(e) {
            f = e.default
        }
        , function(e) {
            _ = e.MapLoadModel
        }
        ],
        execute: function() {
            var I, C, P, b, y;
            n._RF.push({}, "753fbcKY45E1Lc2+Glt9EhY", "MapLayer", void 0);
            var v = o.ccclass
              , M = o.property;
            e("default", (I = v("MapLayer"),
            C = M(m),
            I((y = t((b = function(e) {
                function t() {
                    for (var t, i = arguments.length, s = new Array(i), n = 0; n < i; n++)
                        s[n] = arguments[n];
                    return (t = e.call.apply(e, [this].concat(s)) || this)._sliceImgDic = {},
                    t._mapParams = null,
                    t._lastCameraPos = null,
                    a(t, "bgImg", y, r(t)),
                    t
                }
                i(t, e);
                var n = t.prototype;
                return n.init = function(e) {
                    if (this._mapParams = e,
                    !this.bgImg) {
                        var t = new h;
                        this.node.addChild(t),
                        t.layer = this.node.layer,
                        this.bgImg = t.addComponent(m),
                        this.bgImg.sizeMode = m.SizeMode.RAW,
                        t.getComponent(l).anchorX = 0,
                        t.getComponent(l).anchorY = 0
                    }
                    var i = new c;
                    i.texture = this._mapParams.bgTex,
                    this.bgImg.spriteFrame = i,
                    e.mapLoadModel == _.slices && (this.bgImg.getComponent(l).width = e.mapWidth,
                    this.bgImg.getComponent(l).height = e.mapHeight),
                    this.getComponent(l).width = this.width,
                    this.getComponent(l).height = this.height
                }
                ,
                n.loadSliceImage = function(e, t) {
                    for (var i, a = this, r = Math.floor(t / this._mapParams.sliceHeight), s = Math.floor((t + this._mapParams.viewHeight) / this._mapParams.sliceHeight), n = Math.floor(e / this._mapParams.sliceWidth), o = Math.floor((e + this._mapParams.viewWidth) / this._mapParams.sliceWidth), m = r; m <= s; m++)
                        for (var h = n; h <= o; h++)
                            i = m + 1 + "_" + (h + 1),
                            this._sliceImgDic[i] || function() {
                                var e = a.getSliceSprite(i);
                                a._sliceImgDic[i] = e,
                                a.node.addChild(e.node),
                                e.node.position = new g(h * a._mapParams.sliceWidth,m * a._mapParams.sliceHeight,0),
                                p.load("map/bg/" + a._mapParams.bgName + "/slices/" + i + "/texture", d, (function(t, i) {
                                    if (null == t) {
                                        var a = new c;
                                        a.texture = i,
                                        e.spriteFrame = a
                                    }
                                }
                                ))
                            }()
                }
                ,
                n.getSliceSprite = function(e) {
                    var t = new h(e);
                    t.layer = this.node.layer;
                    var i = t.addComponent(m);
                    return i.sizeMode = m.SizeMode.RAW,
                    t.getComponent(l).anchorX = 0,
                    t.getComponent(l).anchorY = 0,
                    i
                }
                ,
                n.clear = function() {
                    for (var e in this.bgImg.spriteFrame = null,
                    this._sliceImgDic) {
                        var t = this._sliceImgDic[e];
                        t && t.node.destroy(),
                        this._sliceImgDic[e] = null,
                        delete this._sliceImgDic[e]
                    }
                }
                ,
                n.update = function(e) {
                    if (null != f.instance && null != this._mapParams && this._mapParams.mapLoadModel == _.slices) {
                        var t = f.instance.getCameraPos();
                        null != this._lastCameraPos && t.x == this._lastCameraPos.x && t.y == this._lastCameraPos.y || (this._lastCameraPos = t,
                        this.loadSliceImage(t.x, t.y))
                    }
                }
                ,
                s(t, [{
                    key: "bgImage",
                    get: function() {
                        return this.bgImg
                    }
                }, {
                    key: "width",
                    get: function() {
                        return this.bgImg ? this.bgImg.getComponent(l).width : this._mapParams.viewWidth
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.bgImg ? this.bgImg.getComponent(l).height : this._mapParams.viewHeight
                    }
                }]),
                t
            }(u)).prototype, "bgImg", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            P = b)) || P));
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MapLoadModel.ts", ["cc"], (function(e) {
    "use strict";
    var o;
    return {
        setters: [function(e) {
            o = e.cclegacy
        }
        ],
        execute: function() {
            var a;
            e("MapLoadModel", void 0),
            o._RF.push({}, "2f328tajjBEEabRmXaJoxWn", "MapLoadModel", void 0),
            function(e) {
                e[e.single = 0] = "single",
                e[e.slices = 1] = "slices"
            }(a || (a = e("MapLoadModel", {}))),
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MapParams.ts", ["cc", "./MapType.ts", "./MapLoadModel.ts"], (function(t) {
    "use strict";
    var i, e, s;
    return {
        setters: [function(t) {
            i = t.cclegacy
        }
        , function(t) {
            e = t.MapType
        }
        , function(t) {
            s = t.MapLoadModel
        }
        ],
        execute: function() {
            i._RF.push({}, "6b00e3/60pNy69HrXB4iMm4", "MapParams", void 0);
            t("default", (function() {
                this.name = "",
                this.bgName = "",
                this.mapType = e.angle45,
                this.mapWidth = 750,
                this.mapHeight = 1600,
                this.ceilWidth = 75,
                this.ceilHeight = 75,
                this.viewWidth = 750,
                this.viewHeight = 1334,
                this.sliceWidth = 256,
                this.sliceHeight = 256,
                this.mapLoadModel = s.single,
                this.bgTex = null
            }
            ));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MapRoadUtils.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Point.ts", "./RoadNode.ts", "./MapType.ts"], (function(t) {
    "use strict";
    var i, e, o, h, n;
    return {
        setters: [function(t) {
            i = t.createClass
        }
        , function(t) {
            e = t.cclegacy
        }
        , function(t) {
            o = t.default
        }
        , function(t) {
            h = t.default
        }
        , function(t) {
            n = t.MapType
        }
        ],
        execute: function() {
            e._RF.push({}, "38983rww8xCor2DSeawAfiI", "MapRoadUtils", void 0),
            t("default", function() {
                function t() {
                    this._mapWidth = void 0,
                    this._mapHeight = void 0,
                    this._row = void 0,
                    this._col = void 0,
                    this._nodeWidth = void 0,
                    this._nodeHeight = void 0,
                    this._halfNodeWidth = void 0,
                    this._halfNodeHeight = void 0,
                    this._mapType = void 0,
                    this._mapRoad = void 0
                }
                var e = t.prototype;
                return e.updateMapInfo = function(t, i, e, o, h) {
                    switch (this._mapWidth = t,
                    this._mapHeight = i,
                    this._nodeWidth = e,
                    this._nodeHeight = o,
                    this._halfNodeWidth = Math.floor(this._nodeWidth / 2),
                    this._halfNodeHeight = Math.floor(this._nodeHeight / 2),
                    this._mapType = h,
                    this._mapType) {
                    case n.angle45:
                        this._col = Math.ceil(t / this._nodeWidth),
                        this._row = 2 * Math.ceil(i / this._nodeHeight),
                        this._mapRoad = new d(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight);
                        break;
                    case n.angle90:
                        this._col = Math.ceil(t / this._nodeWidth),
                        this._row = Math.ceil(i / this._nodeHeight),
                        this._mapRoad = new r(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight);
                        break;
                    case n.honeycomb:
                        this._col = 2 * Math.ceil((this._mapWidth - this._nodeWidth / 4) / (this._nodeWidth / 4 * 6)),
                        this._row = Math.ceil((this._mapHeight - this._nodeHeight / 2) / this._nodeHeight),
                        this._mapRoad = new s(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight);
                        break;
                    case n.honeycomb2:
                        this._col = Math.ceil((this._mapWidth - this._nodeHeight / 2) / this._nodeHeight),
                        this._row = 2 * Math.ceil((this._mapHeight - this._nodeWidth / 4) / (this._nodeWidth / 4 * 6)),
                        this._mapRoad = new a(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight)
                    }
                }
                ,
                e.getNodeByPixel = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getNodeByPixel(t, i) : new h
                }
                ,
                e.getNodeByDerect = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getNodeByDerect(t, i) : new h
                }
                ,
                e.getNodeByWorldPoint = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getNodeByWorldPoint(t, i) : new h
                }
                ,
                e.getWorldPointByPixel = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getWorldPointByPixel(t, i) : new o
                }
                ,
                e.getPixelByWorldPoint = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getPixelByWorldPoint(t, i) : new o
                }
                ,
                e.getDerectByPixel = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getDerectByPixel(t, i) : new o
                }
                ,
                e.getDerectByWorldPoint = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getDerectByWorldPoint(t, i) : new o
                }
                ,
                e.getPixelByDerect = function(t, i) {
                    return this._mapRoad ? this._mapRoad.getPixelByDerect(t, i) : new o
                }
                ,
                i(t, [{
                    key: "mapWidth",
                    get: function() {
                        return this._mapWidth
                    }
                }, {
                    key: "mapHeight",
                    get: function() {
                        return this._mapHeight
                    }
                }, {
                    key: "nodeWidth",
                    get: function() {
                        return this._nodeWidth
                    }
                }, {
                    key: "nodeHeight",
                    get: function() {
                        return this._nodeHeight
                    }
                }, {
                    key: "row",
                    get: function() {
                        return this._row
                    }
                }, {
                    key: "col",
                    get: function() {
                        return this._col
                    }
                }, {
                    key: "halfNodeWidth",
                    get: function() {
                        return this._halfNodeWidth
                    }
                }, {
                    key: "halfNodeHeight",
                    get: function() {
                        return this._halfNodeHeight
                    }
                }, {
                    key: "mapType",
                    get: function() {
                        return this._mapType
                    }
                }], [{
                    key: "instance",
                    get: function() {
                        return null == this._instance && (this._instance = new t),
                        this._instance
                    }
                }]),
                t
            }())._instance = void 0;
            var d = function() {
                function t(t, i, e, o, h, n) {
                    this._row = void 0,
                    this._col = void 0,
                    this._nodeWidth = void 0,
                    this._nodeHeight = void 0,
                    this._halfNodeWidth = void 0,
                    this._halfNodeHeight = void 0,
                    this._row = t,
                    this._col = i,
                    this._nodeWidth = e,
                    this._nodeHeight = o,
                    this._halfNodeWidth = h,
                    this._halfNodeHeight = n
                }
                var i = t.prototype;
                return i.getNodeByPixel = function(t, i) {
                    var e = this.getWorldPointByPixel(t, i)
                      , o = this.getPixelByWorldPoint(e.x, e.y)
                      , n = this.getDerectByPixel(t, i)
                      , d = new h;
                    return d.cx = e.x,
                    d.cy = e.y,
                    d.px = o.x,
                    d.py = o.y,
                    d.dx = n.x,
                    d.dy = n.y,
                    d
                }
                ,
                i.getNodeByDerect = function(t, i) {
                    var e = this.getPixelByDerect(t, i)
                      , o = this.getWorldPointByPixel(e.x, e.y)
                      , n = new h;
                    return n.cx = o.x,
                    n.cy = o.y,
                    n.px = e.x,
                    n.py = e.y,
                    n.dx = t,
                    n.dy = i,
                    n
                }
                ,
                i.getNodeByWorldPoint = function(t, i) {
                    var e = this.getPixelByWorldPoint(t, i);
                    return this.getNodeByPixel(e.x, e.y)
                }
                ,
                i.getWorldPointByPixel = function(t, i) {
                    var e = Math.ceil(t / this._nodeWidth - .5 + i / this._nodeHeight) - 1
                      , h = this._col - 1 - Math.ceil(t / this._nodeWidth - .5 - i / this._nodeHeight);
                    return new o(e,h)
                }
                ,
                i.getPixelByWorldPoint = function(t, i) {
                    var e = Math.floor((t + 1 - (i - (this._col - 1))) * this._halfNodeWidth)
                      , h = Math.floor((t + 1 + (i - (this._col - 1))) * this._halfNodeHeight);
                    return new o(e,h)
                }
                ,
                i.getDerectByPixel = function(t, i) {
                    var e = this.getWorldPointByPixel(t, i)
                      , h = this.getPixelByWorldPoint(e.x, e.y)
                      , n = Math.floor(h.x / this._nodeWidth) - (h.x % this._nodeWidth == 0 ? 1 : 0)
                      , d = Math.floor(h.y / this._halfNodeHeight) - 1;
                    return new o(n,d)
                }
                ,
                i.getDerectByWorldPoint = function(t, i) {
                    var e = Math.floor((t - (i - (this._col - 1))) / 2)
                      , h = t + (i - (this._col - 1));
                    return new o(e,h)
                }
                ,
                i.getPixelByDerect = function(t, i) {
                    var e = Math.floor((t + i % 2) * this._nodeWidth + (1 - i % 2) * this._halfNodeWidth)
                      , h = Math.floor((i + 1) * this._halfNodeHeight);
                    return new o(e,h)
                }
                ,
                t
            }()
              , r = function() {
                function t(t, i, e, o, h, n) {
                    this._row = void 0,
                    this._col = void 0,
                    this._nodeWidth = void 0,
                    this._nodeHeight = void 0,
                    this._halfNodeWidth = void 0,
                    this._halfNodeHeight = void 0,
                    this._row = t,
                    this._col = i,
                    this._nodeWidth = e,
                    this._nodeHeight = o,
                    this._halfNodeWidth = h,
                    this._halfNodeHeight = n
                }
                var i = t.prototype;
                return i.getNodeByPixel = function(t, i) {
                    var e = this.getWorldPointByPixel(t, i)
                      , o = this.getPixelByWorldPoint(e.x, e.y)
                      , n = this.getDerectByPixel(t, i)
                      , d = new h;
                    return d.cx = e.x,
                    d.cy = e.y,
                    d.px = o.x,
                    d.py = o.y,
                    d.dx = n.x,
                    d.dy = n.y,
                    d
                }
                ,
                i.getNodeByDerect = function(t, i) {
                    var e = this.getPixelByDerect(t, i)
                      , o = this.getWorldPointByPixel(e.x, e.y)
                      , n = new h;
                    return n.cx = o.x,
                    n.cy = o.y,
                    n.px = e.x,
                    n.py = e.y,
                    n.dx = t,
                    n.dy = i,
                    n
                }
                ,
                i.getNodeByWorldPoint = function(t, i) {
                    var e = this.getPixelByWorldPoint(t, i);
                    return this.getNodeByPixel(e.x, e.y)
                }
                ,
                i.getWorldPointByPixel = function(t, i) {
                    var e = Math.floor(t / this._nodeWidth)
                      , h = Math.floor(i / this._nodeHeight);
                    return new o(e,h)
                }
                ,
                i.getPixelByWorldPoint = function(t, i) {
                    var e = Math.floor((t + 1) * this._nodeWidth - this._halfNodeWidth)
                      , h = Math.floor((i + 1) * this._nodeHeight - this._halfNodeHeight);
                    return new o(e,h)
                }
                ,
                i.getDerectByPixel = function(t, i) {
                    var e = Math.floor(t / this._nodeWidth)
                      , h = Math.floor(i / this._nodeHeight);
                    return new o(e,h)
                }
                ,
                i.getDerectByWorldPoint = function(t, i) {
                    return new o(t,i)
                }
                ,
                i.getPixelByDerect = function(t, i) {
                    var e = Math.floor((t + 1) * this._nodeWidth - this._halfNodeWidth)
                      , h = Math.floor((i + 1) * this._nodeHeight - this._halfNodeHeight);
                    return new o(e,h)
                }
                ,
                t
            }()
              , s = function() {
                function t(t, i, e, o, h, n) {
                    this._row = void 0,
                    this._col = void 0,
                    this._nodeWidth = void 0,
                    this._nodeHeight = void 0,
                    this._halfNodeWidth = void 0,
                    this._halfNodeHeight = void 0,
                    this._nwDiv4 = void 0,
                    this._radius = void 0,
                    this._proportion = 1.732,
                    this._row = t,
                    this._col = i,
                    this._nodeWidth = e,
                    this._nodeHeight = o,
                    this._halfNodeWidth = h,
                    this._halfNodeHeight = n,
                    this._nwDiv4 = this._nodeWidth / 4,
                    this._radius = 4 * this._nwDiv4,
                    this._proportion = 2 * this._nodeHeight / this._nodeWidth
                }
                var i = t.prototype;
                return i.getNodeByPixel = function(t, i) {
                    var e = this.getWorldPointByPixel(t, i)
                      , o = this.getPixelByWorldPoint(e.x, e.y)
                      , n = new h;
                    return n.cx = e.x,
                    n.cy = e.y,
                    n.px = o.x,
                    n.py = o.y,
                    n.dx = e.x,
                    n.dy = e.y,
                    n
                }
                ,
                i.getNodeByDerect = function(t, i) {
                    var e = this.getPixelByDerect(t, i)
                      , o = new h;
                    return o.cx = t,
                    o.cy = i,
                    o.px = e.x,
                    o.py = e.y,
                    o.dx = t,
                    o.dy = i,
                    o
                }
                ,
                i.getNodeByWorldPoint = function(t, i) {
                    var e = this.getPixelByWorldPoint(t, i);
                    return this.getNodeByPixel(e.x, e.y)
                }
                ,
                i.getWorldPointByPixel = function(t, i) {
                    var e, h, n, d = Math.floor(t / this._nwDiv4), r = Math.floor(d / 3);
                    return (d - 1) % 6 == 0 || (d - 2) % 6 == 0 ? (h = r,
                    n = e = Math.floor(i / this._nodeHeight)) : (d - 4) % 6 == 0 || (d - 5) % 6 == 0 ? (h = r,
                    n = e = i < this._nodeHeight / 2 ? -1 : Math.floor((i - this._nodeHeight / 2) / this._nodeHeight)) : r % 2 == 0 ? (e = Math.floor(i / this._nodeHeight),
                    this.testPointInHoneycomb(r, e, t, i) ? (h = r,
                    n = e) : this.testPointInHoneycomb(r - 1, e - 1, t, i) ? (h = r - 1,
                    n = e - 1) : (h = r - 1,
                    n = e)) : (e = i < this._nodeHeight / 2 ? -1 : Math.floor((i - this._nodeHeight / 2) / this._nodeHeight),
                    this.testPointInHoneycomb(r, e, t, i) ? (h = r,
                    n = e) : this.testPointInHoneycomb(r - 1, e, t, i) ? (h = r - 1,
                    n = e) : (h = r - 1,
                    n = e + 1)),
                    new o(h,n)
                }
                ,
                i.testPointInHoneycomb = function(t, i, e, o) {
                    var h = 2 * this._nwDiv4
                      , n = this.getPixelByWorldPoint(t, i);
                    return h - Math.abs(e - n.x) >= Math.abs(o - n.y) / this._proportion
                }
                ,
                i.getPixelByWorldPoint = function(t, i) {
                    var e = Math.floor((2 + 3 * t) / 4 * this._nodeWidth)
                      , h = Math.floor((i + .5 * (1 + t % 2)) * this._nodeHeight);
                    return new o(e,h)
                }
                ,
                i.getDerectByPixel = function(t, i) {
                    return this.getWorldPointByPixel(t, i)
                }
                ,
                i.getDerectByWorldPoint = function(t, i) {
                    return new o(t,i)
                }
                ,
                i.getPixelByDerect = function(t, i) {
                    var e = (2 + 3 * t) / 4 * this._nodeWidth
                      , h = (i + .5 * (1 + t % 2)) * this._nodeHeight;
                    return new o(e,h)
                }
                ,
                t
            }()
              , a = function() {
                function t(t, i, e, o, h, n) {
                    this.mapRoadHoneycomb = void 0,
                    this.mapRoadHoneycomb = new s(t,i,e,o,h,n)
                }
                var i = t.prototype;
                return i.transposedNode = function(t) {
                    var i = t.cx
                      , e = t.dx
                      , o = t.px;
                    return t.cx = t.cy,
                    t.cy = i,
                    t.dx = t.dy,
                    t.dy = e,
                    t.px = t.py,
                    t.py = o,
                    t
                }
                ,
                i.transposedPoint = function(t) {
                    var i = t.x;
                    return t.x = t.y,
                    t.y = i,
                    t
                }
                ,
                i.getNodeByPixel = function(t, i) {
                    return this.transposedNode(this.mapRoadHoneycomb.getNodeByPixel(i, t))
                }
                ,
                i.getNodeByDerect = function(t, i) {
                    return this.transposedNode(this.mapRoadHoneycomb.getNodeByDerect(i, t))
                }
                ,
                i.getNodeByWorldPoint = function(t, i) {
                    return this.transposedNode(this.mapRoadHoneycomb.getNodeByWorldPoint(i, t))
                }
                ,
                i.getWorldPointByPixel = function(t, i) {
                    return this.transposedPoint(this.mapRoadHoneycomb.getWorldPointByPixel(i, t))
                }
                ,
                i.getPixelByWorldPoint = function(t, i) {
                    return this.transposedPoint(this.mapRoadHoneycomb.getPixelByWorldPoint(i, t))
                }
                ,
                i.getDerectByPixel = function(t, i) {
                    return this.transposedPoint(this.mapRoadHoneycomb.getDerectByPixel(i, t))
                }
                ,
                i.getDerectByWorldPoint = function(t, i) {
                    return this.transposedPoint(this.mapRoadHoneycomb.getDerectByWorldPoint(i, t))
                }
                ,
                i.getPixelByDerect = function(t, i) {
                    return this.transposedPoint(this.mapRoadHoneycomb.getPixelByDerect(i, t))
                }
                ,
                t
            }();
            e._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MapType.ts", ["cc"], (function(e) {
    "use strict";
    var n;
    return {
        setters: [function(e) {
            n = e.cclegacy
        }
        ],
        execute: function() {
            var o;
            e("MapType", void 0),
            n._RF.push({}, "967a1oZod1CQYHXqS8EHBnp", "MapType", void 0),
            function(e) {
                e[e.angle45 = 0] = "angle45",
                e[e.angle90 = 1] = "angle90",
                e[e.honeycomb = 2] = "honeycomb",
                e[e.honeycomb2 = 3] = "honeycomb2"
            }(o || (o = e("MapType", {}))),
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MiniMapView.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MapRoadUtils.ts", "./FogOfWar.ts", "./CameraController.ts", "./SceneManager.ts", "./GameWorld.ts"], (function(i) {
    "use strict";
    var t, e, n, a, o, r, s, c, h, l, p, f, g, u, m, d, w, M, v, y, S;
    return {
        setters: [function(i) {
            t = i.applyDecoratedDescriptor,
            e = i.inheritsLoose,
            n = i.initializerDefineProperty,
            a = i.assertThisInitialized
        }
        , function(i) {
            o = i.cclegacy,
            r = i._decorator,
            s = i.Node,
            c = i.Sprite,
            h = i.Size,
            l = i.SpriteFrame,
            p = i.UITransform,
            f = i.view,
            g = i.Graphics,
            u = i.Vec3,
            m = i.Component
        }
        , function(i) {
            d = i.default
        }
        , function(i) {
            w = i.FogOfWar
        }
        , function(i) {
            M = i.default
        }
        , function(i) {
            v = i.default,
            y = i.SceneEventType
        }
        , function(i) {
            S = i.default
        }
        ],
        execute: function() {
            var C, _, b, z, k, T, x, F, R, I, V;
            o._RF.push({}, "95695BykxVFO6rw6g+nCzTD", "MiniMapView", void 0);
            var L = r.ccclass
              , P = r.property;
            i("default", (C = L("MiniMapView"),
            _ = P(s),
            b = P(c),
            z = P(c),
            k = P(s),
            C((F = t((x = function(i) {
                function t() {
                    for (var t, e = arguments.length, o = new Array(e), r = 0; r < e; r++)
                        o[r] = arguments[r];
                    return t = i.call.apply(i, [this].concat(o)) || this,
                    n(t, "content", F, a(t)),
                    n(t, "miniMap", R, a(t)),
                    n(t, "fogMask", I, a(t)),
                    n(t, "viewRect", V, a(t)),
                    t._mapScale = 1,
                    t._rectSize = new h(0,0),
                    t._isInit = !1,
                    t
                }
                e(t, i);
                var o = t.prototype;
                return o.start = function() {
                    this.miniMap.node.on(s.EventType.TOUCH_START, this.onClickMiniMap, this),
                    v.instance.on(y.Map_INIT_COMPLETE, this.onMapInitComp, this)
                }
                ,
                o.onMapInitComp = function(i) {
                    this.init(i.bgTex)
                }
                ,
                o.init = function(i) {
                    this._isInit = !0;
                    var t = new l;
                    t.texture = i,
                    this.miniMap.spriteFrame = t;
                    var e = this.content.getComponent(p)
                      , n = this.miniMap.getComponent(p)
                      , a = f.getVisibleSize();
                    i.width > i.height ? (n.width = e.width - 4,
                    n.height = i.height * (n.width / i.width)) : (n.height = e.height - 4,
                    n.width = i.width * (n.height / i.height));
                    var o = this.miniMap.node.position;
                    o.x = -n.width / 2,
                    o.y = -n.height / 2,
                    this.miniMap.node.position = o,
                    this.viewRect.position = o,
                    null != w.instance && (this.fogMask.node.position = o,
                    this.fogMask.getComponent(p).setContentSize(new h(n.width,n.height)),
                    this.fogMask.node.active = !0,
                    this.fogMask.spriteFrame.texture = w.instance.maskTex);
                    var r = d.instance.mapWidth;
                    d.instance.mapHeight;
                    this._mapScale = n.width / r,
                    this._rectSize.width = a.width * this._mapScale,
                    this._rectSize.height = a.height * this._mapScale,
                    this.refreshViewRect(0, 0)
                }
                ,
                o.refreshViewRect = function(i, t) {
                    var e = this.viewRect.getComponent(g);
                    e || (e = this.viewRect.addComponent(g));
                    var n = f.getVisibleSize()
                      , a = d.instance.mapWidth
                      , o = d.instance.mapHeight
                      , r = t;
                    (c = i) < 0 ? c = 0 : c > a - n.width && (c = a - n.width),
                    r < 0 ? r = 0 : r > o - n.height && (r = o - n.height);
                    var s, c = c * this._mapScale;
                    r *= this._mapScale;
                    e.clear(),
                    e.rect(c, r, this._rectSize.width, this._rectSize.height),
                    e.lineWidth = 2.5,
                    e.strokeColor.fromHEX("#ffffff"),
                    e.stroke(),
                    S.instance.gameMap.myPlayer && (s = S.instance.gameMap.myPlayer.node.position,
                    this.drawCircleFlag(e, s, "#ffff00aa", 5));
                    for (var h = S.instance.gameMap.npcList, l = h.length, p = 0; p < l; p++)
                        s = h[p].node.position,
                        this.drawCircleFlag(e, s, "#00ff00aa", 4);
                    var u = S.instance.gameMap.monsterList;
                    l = u.length;
                    for (p = 0; p < l; p++)
                        s = u[p].node.position,
                        this.drawCircleFlag(e, s, "#ff0000aa", 3);
                    var m = S.instance.gameMap.transferDoorList;
                    l = m.length;
                    for (p = 0; p < l; p++)
                        s = m[p].node.position,
                        this.drawCircleFlag(e, s, "#0000ffaa", 7)
                }
                ,
                o.drawCircleFlag = function(i, t, e, n) {
                    i.fillColor.fromHEX(e),
                    i.circle(t.x * this._mapScale, t.y * this._mapScale, n),
                    i.fill()
                }
                ,
                o.onClickMiniMap = function(i) {
                    var t = this.miniMap.getComponent(p).convertToNodeSpaceAR(new u(i.getUILocation().x,i.getUILocation().y));
                    t.x = t.x / this._mapScale,
                    t.y = t.y / this._mapScale,
                    S.instance.gameMap.myPlayer.navTo(t.x, t.y)
                }
                ,
                o.update = function(i) {
                    if (this._isInit) {
                        var t = M.instance.getCameraPos();
                        this.refreshViewRect(t.x, t.y),
                        null != w.instance && (this.fogMask.node.active = w.instance.node.active)
                    }
                }
                ,
                t
            }(m)).prototype, "content", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            R = t(x.prototype, "miniMap", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            I = t(x.prototype, "fogMask", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            V = t(x.prototype, "viewRect", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            T = x)) || T));
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Monster.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Actor2.ts", "./GameWorld.ts"], (function(t) {
    "use strict";
    var e, i, o, n, r, s, a, c, l, u, h, d, f;
    return {
        setters: [function(t) {
            e = t.applyDecoratedDescriptor,
            i = t.inheritsLoose,
            o = t.initializerDefineProperty,
            n = t.assertThisInitialized
        }
        , function(t) {
            r = t.cclegacy,
            s = t._decorator,
            a = t.CCInteger,
            c = t.Node,
            l = t.Vec3,
            u = t.resources,
            h = t.Texture2D
        }
        , function(t) {
            d = t.default
        }
        , function(t) {
            f = t.default
        }
        ],
        execute: function() {
            var p, m, g, v, y;
            r._RF.push({}, "9689aoZBnNBd45BX8DHD4qp", "Monster", void 0);
            var D = s.ccclass
              , T = s.property;
            t("default", (p = D("Monster"),
            m = T(a),
            p((y = e((v = function(t) {
                function e() {
                    for (var e, i = arguments.length, r = new Array(i), s = 0; s < i; s++)
                        r[s] = arguments[s];
                    return e = t.call.apply(t, [this].concat(r)) || this,
                    o(e, "monsterId", y, n(e)),
                    e.editData = null,
                    e
                }
                i(e, t);
                var r = e.prototype;
                return r.start = function() {
                    t.prototype.start.call(this),
                    this.node.on(c.EventType.TOUCH_START, this.onTouchStart, this)
                }
                ,
                r.init = function() {
                    this.width = 100,
                    this.height = 100,
                    this.direction = this.defaultDir,
                    this.loadRes()
                }
                ,
                r.initEditData = function(t) {
                    this.editData = t,
                    this.objName = t.objName,
                    this.monsterId = Number(t.objId),
                    this.node.position = new l(t.x,t.y),
                    this.defaultDir = t.direction,
                    this.isPatrol = t.isPatrol
                }
                ,
                r.loadRes = function() {
                    var t = this;
                    if (0 != this.monsterId) {
                        var e = "game/monster/" + this.monsterId + "/texture";
                        u.load(e, h, (function(i, o) {
                            if (null != i)
                                return console.log("\n"),
                                console.error("加载怪物资源失败 filePath：", e),
                                console.error("错误原因", i),
                                void console.log("\n");
                            t.movieClip.init(o, 5, 8),
                            t.width = t.movieClip.uiTransform.width,
                            t.height = t.movieClip.uiTransform.height
                        }
                        ))
                    }
                }
                ,
                r.onTouchStart = function(t) {
                    f.instance.gameMap.myPlayer.trackTarget(this.node, (function(t) {}
                    ))
                }
                ,
                e
            }(d)).prototype, "monsterId", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            g = v)) || g));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MonsterManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Monster.ts"], (function(e) {
    "use strict";
    var t, n, r, o, i, a, s, c, u, l, p;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            n = e.inheritsLoose,
            r = e.initializerDefineProperty,
            o = e.assertThisInitialized
        }
        , function(e) {
            i = e.cclegacy,
            a = e._decorator,
            s = e.Prefab,
            c = e.instantiate,
            u = e.Vec3,
            l = e.Component
        }
        , function(e) {
            p = e.default
        }
        ],
        execute: function() {
            var f, g, d, v, y;
            i._RF.push({}, "9e094IZHjVKlZIUHAK9I3nq", "MonsterManager", void 0);
            var M = a.ccclass
              , b = a.property;
            e("default", (f = M("MonsterManager"),
            g = b(s),
            f((y = t((v = function(e) {
                function t() {
                    for (var t, n = arguments.length, i = new Array(n), a = 0; a < n; a++)
                        i[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(i)) || this,
                    r(t, "monsterPrefab", y, o(t)),
                    t
                }
                n(t, e);
                var i = t.prototype;
                return i.start = function() {}
                ,
                i.getMonster = function() {
                    var e = c(this.monsterPrefab).getComponent(p);
                    return e.node.active = !0,
                    e.node.position = new u(0,0,0),
                    e
                }
                ,
                t
            }(l)).prototype, "monsterPrefab", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            d = v)) || d));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MouseCursorController.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(e) {
    "use strict";
    var o, t, r, s, u, i, n, l, c, a, h, m, p;
    return {
        setters: [function(e) {
            o = e.applyDecoratedDescriptor,
            t = e.inheritsLoose,
            r = e.initializerDefineProperty,
            s = e.assertThisInitialized
        }
        , function(e) {
            u = e.cclegacy,
            i = e._decorator,
            n = e.Enum,
            l = e.Node,
            c = e.Vec3,
            a = e.view,
            h = e.game,
            m = e.Vec2,
            p = e.Component
        }
        ],
        execute: function() {
            var y, f, C, v, d, P, S, b, g;
            e("MouseCursorStyle", void 0),
            u._RF.push({}, "772fcd/jyVOOI/deHGBAMyH", "MouseCursorController", void 0);
            var M, w = i.ccclass, z = i.property;
            !function(e) {
                e[e.normal = 0] = "normal",
                e[e.custom = 1] = "custom"
            }(M || (M = e("MouseCursorStyle", {})));
            e("default", (y = w("MouseCursorController"),
            f = z({
                type: n(M),
                tooltip: "默认鼠标光标样式 "
            }),
            C = z(l),
            v = z(l),
            y((S = o((P = function(e) {
                function o() {
                    for (var o, t = arguments.length, u = new Array(t), i = 0; i < t; i++)
                        u[i] = arguments[i];
                    return o = e.call.apply(e, [this].concat(u)) || this,
                    r(o, "defaultCursorStyle", S, s(o)),
                    r(o, "touchPlane", b, s(o)),
                    r(o, "mouseCursor", g, s(o)),
                    o.mousePos = new c(0,0,0),
                    o.currMousePos = new c(0,0,0),
                    o.cursorStyle = M.custom,
                    o
                }
                t(o, e);
                var u = o.prototype;
                return u.start = function() {
                    var e = a.getVisibleSize();
                    this.mousePos.x = -e.width,
                    this.mousePos.y = -e.height,
                    this.setCursorStyle(this.defaultCursorStyle),
                    this.touchPlane.on(l.EventType.MOUSE_MOVE, this.onTouchMove, this)
                }
                ,
                u.setCursorStyle = function(e) {
                    this.cursorStyle = e,
                    this.cursorStyle == M.custom ? (h.canvas.style.cursor = "None",
                    this.mouseCursor.active = !0,
                    this.mouseCursor.position = this.mousePos) : (h.canvas.style.cursor = "default",
                    this.mouseCursor.active = !1)
                }
                ,
                u.onTouchMove = function(e) {
                    var o = a.getVisibleSize()
                      , t = e.getUILocation().subtract(new m(o.width / 2,o.height / 2));
                    this.mousePos.x = t.x,
                    this.mousePos.y = t.y
                }
                ,
                u.update = function(e) {
                    this.mousePos = this.mouseCursor.position.lerp(this.mousePos, 40 * e),
                    this.mouseCursor.position = this.mousePos
                }
                ,
                o
            }(p)).prototype, "defaultCursorStyle", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return M.custom
                }
            }),
            b = o(P.prototype, "touchPlane", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            g = o(P.prototype, "mouseCursor", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            d = P)) || d));
            u._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/MovieClip.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var i, e, r, n, s, o, h, a, l, u, p, c, m, d, y, f, _, b;
    return {
        setters: [function(t) {
            i = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            r = t.initializerDefineProperty,
            n = t.assertThisInitialized,
            s = t.createClass
        }
        , function(t) {
            o = t.cclegacy,
            h = t._decorator,
            a = t.CCFloat,
            l = t.Texture2D,
            u = t.CCInteger,
            p = t.CCBoolean,
            c = t.Sprite,
            m = t.SpriteFrame,
            d = t.Rect,
            y = t.Vec2,
            f = t.Size,
            _ = t.UITransform,
            b = t.Component
        }
        ],
        execute: function() {
            var g, w, x, I, T, A, v, z, C, F, D, H, S, L, P, W, M, k, B, O, R, j, J, U, V;
            o._RF.push({}, "cb924t7AD1JlaIj9BYSsdh8", "MovieClip", void 0);
            var Y = h.ccclass
              , q = h.property;
            t("default", (g = Y("MovieClip"),
            w = q(a),
            x = q({
                type: l
            }),
            I = q({
                type: u
            }),
            T = q(u),
            A = q(u),
            v = q(u),
            z = q(p),
            C = q(p),
            F = q(p),
            D = q(u),
            H = q(u),
            g((P = i((L = function(t) {
                function i() {
                    for (var i, e = arguments.length, s = new Array(e), o = 0; o < e; o++)
                        s[o] = arguments[o];
                    return (i = t.call.apply(t, [this].concat(s)) || this).m_sprite = null,
                    i.timer = .1,
                    r(i, "interval", P, n(i)),
                    r(i, "texture", W, n(i)),
                    r(i, "playTimes", M, n(i)),
                    r(i, "row", k, n(i)),
                    r(i, "col", B, n(i)),
                    r(i, "rowIndex", O, n(i)),
                    r(i, "isAll", R, n(i)),
                    r(i, "autoPlayOnLoad", j, n(i)),
                    r(i, "autoDestroy", J, n(i)),
                    r(i, "begin", U, n(i)),
                    r(i, "end", V, n(i)),
                    i.totalFrame = 8,
                    i.currentFrame = 0,
                    i.currentTimes = 0,
                    i.running = !0,
                    i._playIndex = 0,
                    i._pieceWidth = 0,
                    i._pieceHeight = 0,
                    i._bitmapArr = [],
                    i._isInit = !1,
                    i._uiTransform = null,
                    i
                }
                e(i, t);
                var o = i.prototype;
                return o.onLoad = function() {
                    this.running = this.autoPlayOnLoad,
                    this._isInit || this.init(this.texture, this.row, this.col, this.playTimes)
                }
                ,
                o.init = function(t, i, e, r) {
                    if (void 0 === r && (r = 0),
                    null != t) {
                        this.reset(),
                        this._isInit = !0,
                        this.texture = t,
                        this.row = i,
                        this.col = e,
                        this.playTimes = r,
                        0 == this.end && (this.end = this.col),
                        this.rowIndex = this.clamp(this.rowIndex, 0, this.row - 1),
                        this._pieceWidth = this.texture.width / this.col,
                        this._pieceHeight = this.texture.height / this.row,
                        this.m_sprite || (this.m_sprite = this.getComponent(c),
                        this.m_sprite || (this.m_sprite = this.addComponent(c))),
                        this._bitmapArr.length = 0;
                        for (var n = 0; n < this.row; n++) {
                            this._bitmapArr[n] = [];
                            for (var s = 0; s < this.col; s++) {
                                var o = new m;
                                o.texture = this.texture,
                                o.rect = new d(s * this._pieceWidth,n * this._pieceHeight,this._pieceWidth,this._pieceHeight),
                                o.rotated = !1,
                                o.offset = new y(0,0),
                                o.originalSize = new f(this._pieceWidth,this._pieceHeight),
                                this._bitmapArr[n][s] = o
                            }
                        }
                        this.m_sprite.spriteFrame = this._bitmapArr[this.rowIndex][0],
                        this.uiTransform.width = this._pieceWidth,
                        this.uiTransform.height = this._pieceHeight,
                        this.timer = 0,
                        this.playAction()
                    }
                }
                ,
                o.reset = function() {
                    this.timer = 0,
                    this.playIndex = 0,
                    this.currentTimes = 0,
                    this.currentFrame = 0
                }
                ,
                o.update = function(t) {
                    null != this.texture && this.running && (0 == this.playTimes || this.currentTimes != this.playTimes ? (this.timer -= t,
                    this.timer <= 0 && (this.isAll && (this.begin = 0,
                    this.end = this.col),
                    this.timer = this.interval,
                    this.currentFrame = this.currentFrame % this.col,
                    this.playAction(),
                    this.currentFrame++,
                    this.currentFrame == this.col && (this.isAll ? (this.rowIndex++,
                    this.rowIndex == this.row && (this.currentTimes++,
                    this.node.emit("completeTimes"),
                    0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                    this.autoDestroy && this.node.destroy())),
                    this.rowIndex %= this.row) : (this.currentTimes++,
                    this.node.emit("completeTimes"),
                    0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                    this.autoDestroy && this.node.destroy()))))) : this.running = !1)
                }
                ,
                o.playAction = function() {
                    this.end != this.begin && (this.rowIndex = this.clamp(this.rowIndex, 0, this.row - 1),
                    this._playIndex = this._playIndex % (this.end - this.begin) + this.begin,
                    this.m_sprite.spriteFrame = this._bitmapArr[this.rowIndex][this._playIndex],
                    this._playIndex++)
                }
                ,
                o.play = function() {
                    this.running = !0,
                    this.playAction()
                }
                ,
                o.stop = function() {
                    this.running = !1
                }
                ,
                o.gotoAndPlay = function(t) {
                    this.running = !0,
                    this._playIndex = t,
                    this._playIndex = this.clamp(this._playIndex, 0, this.col - 1)
                }
                ,
                o.gotoAndStop = function(t) {
                    this.running = !1,
                    this._playIndex = t,
                    this._playIndex = this.clamp(this._playIndex, 0, this.col - 1),
                    this.m_sprite.spriteFrame = this._bitmapArr[this.rowIndex][this._playIndex]
                }
                ,
                o.clamp = function(t, i, e) {
                    return t < i ? i : t > e ? e : t
                }
                ,
                s(i, [{
                    key: "playIndex",
                    get: function() {
                        return this._playIndex
                    },
                    set: function(t) {
                        this._playIndex = t
                    }
                }, {
                    key: "uiTransform",
                    get: function() {
                        return this._uiTransform || (this._uiTransform = this.node.getComponent(_)),
                        this._uiTransform
                    }
                }]),
                i
            }(b)).prototype, "interval", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return .1
                }
            }),
            W = i(L.prototype, "texture", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            M = i(L.prototype, "playTimes", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            k = i(L.prototype, "row", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 4
                }
            }),
            B = i(L.prototype, "col", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 4
                }
            }),
            O = i(L.prototype, "rowIndex", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            R = i(L.prototype, "isAll", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !1
                }
            }),
            j = i(L.prototype, "autoPlayOnLoad", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !0
                }
            }),
            J = i(L.prototype, "autoDestroy", [F], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !1
                }
            }),
            U = i(L.prototype, "begin", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            V = i(L.prototype, "end", [H], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            S = L)) || S));
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NavAgent.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./PathFindingAgent.ts", "./NavJoystick.ts", "./NavPath.ts", "./NavRVO.ts", "./NavUnit.ts"], (function(n) {
    "use strict";
    var t, i, o, e, s, a, h, u, r, l, v, c, d, p, f, U;
    return {
        setters: [function(n) {
            t = n.applyDecoratedDescriptor,
            i = n.inheritsLoose,
            o = n.initializerDefineProperty,
            e = n.assertThisInitialized,
            s = n.createClass
        }
        , function(n) {
            a = n.cclegacy,
            h = n._decorator,
            u = n.Enum,
            r = n.Vec3,
            l = n.Component
        }
        , function(n) {
            v = n.ControlMode
        }
        , function(n) {
            c = n.default
        }
        , function(n) {
            d = n.default
        }
        , function(n) {
            p = n.default
        }
        , function(n) {
            f = n.default
        }
        , function(n) {
            U = n.default
        }
        ],
        execute: function() {
            var _, y, g, m, k;
            a._RF.push({}, "1ed0bz2hFFN/oJlNEnAPikg", "NavAgent", void 0);
            var P = h.ccclass
              , C = h.property;
            n("default", (_ = P("NavAgent"),
            y = C({
                type: u(v),
                tooltip: "控制模式:\ntouch  点击行走 \njoystick 摇杆操作 "
            }),
            _((k = t((m = function(n) {
                function t() {
                    for (var t, i = arguments.length, s = new Array(i), a = 0; a < i; a++)
                        s[a] = arguments[a];
                    return (t = n.call.apply(n, [this].concat(s)) || this)._navUnit = null,
                    o(t, "ctrMode", k, e(t)),
                    t._joystick = null,
                    t._navPath = null,
                    t._navRVO = null,
                    t._direction = 0,
                    t._moveSpeed = 100,
                    t._moveDir = new r(0,0,0),
                    t._radius = 25,
                    t.isInit = !1,
                    t
                }
                i(t, n);
                var a = t.prototype;
                return a.onLoad = function() {
                    this.init()
                }
                ,
                a.start = function() {}
                ,
                a.init = function() {
                    this.isInit || (this.isInit = !0,
                    null == this._navUnit && (this._navUnit = this.node.getComponent(U)),
                    this.joystick.init(),
                    this.navPath.init(),
                    this.navRVO.init())
                }
                ,
                a.setPosition = function(n) {
                    null != this.navUnit ? this.navUnit.node.position = n : this.node.position = n
                }
                ,
                a.setPos = function(n, t, i) {
                    void 0 === i && (i = 0),
                    null != this.navUnit ? this.navUnit.node.position = new r(n,t,i) : this.node.position = new r(n,t,i)
                }
                ,
                a.getPos = function() {
                    return null != this.navUnit ? this.navUnit.node.position : this.node.position
                }
                ,
                a.setX = function(n) {
                    var t;
                    null != this.navUnit ? ((t = this.navUnit.node.position).x = n,
                    this.navUnit.node.position = t) : ((t = this.node.position).x = n,
                    this.node.position = t)
                }
                ,
                a.getX = function() {
                    return null != this.navUnit ? this.navUnit.node.position.x : this.node.position.x
                }
                ,
                a.setY = function(n) {
                    var t;
                    null != this.navUnit ? ((t = this.navUnit.node.position).y = n,
                    this.navUnit.node.position = t) : ((t = this.node.position).y = n,
                    this.node.position = t)
                }
                ,
                a.getY = function() {
                    return null != this.navUnit ? this.navUnit.node.position.y : this.node.position.y
                }
                ,
                a.setZ = function(n) {
                    var t;
                    null != this.navUnit ? ((t = this.navUnit.node.position).z = n,
                    this.navUnit.node.position = t) : ((t = this.node.position).z = n,
                    this.node.position = t)
                }
                ,
                a.getZ = function() {
                    return null != this.navUnit ? this.navUnit.node.position.z : this.node.position.z
                }
                ,
                a.navTo = function(n, t) {
                    this.navPath.navTo(n, t)
                }
                ,
                a.setMoveDir = function(n, t, i) {
                    void 0 === i && (i = 0),
                    this.moveDir.x = n,
                    this.moveDir.y = t,
                    this.moveDir.z = i
                }
                ,
                a.onMove = function() {
                    if (null != this.navUnit)
                        return this.navUnit.onMove()
                }
                ,
                a.onStop = function() {
                    if (null != this.navUnit)
                        return this.navUnit.onStop()
                }
                ,
                a.setFaceDir = function(n) {
                    if (null != this.navUnit)
                        return this.navUnit.setFaceDir(n)
                }
                ,
                a.walkCompleteOneRoadNode = function(n) {
                    if (null != this.navUnit)
                        return this.navUnit.walkCompleteOneRoadNode(n)
                }
                ,
                a.walkCompleteThePath = function(n) {
                    if (null != this.navUnit)
                        return this.navUnit.walkCompleteThePath(n)
                }
                ,
                s(t, [{
                    key: "navUnit",
                    get: function() {
                        return this._navUnit
                    }
                }, {
                    key: "controlMode",
                    get: function() {
                        return null != this.navUnit ? this.navUnit.controlMode : this.ctrMode
                    },
                    set: function(n) {
                        null != this.navUnit && (this.navUnit.controlMode = n),
                        this.ctrMode = n
                    }
                }, {
                    key: "joystick",
                    get: function() {
                        return null == this._joystick && (this._joystick = this.node.getComponent(d),
                        null == this._joystick && (this._joystick = this.node.addComponent(d))),
                        this._joystick
                    }
                }, {
                    key: "navPath",
                    get: function() {
                        return null == this._navPath && (this._navPath = this.node.getComponent(p),
                        null == this._navPath && (this._navPath = this.node.addComponent(p))),
                        this._navPath
                    }
                }, {
                    key: "navRVO",
                    get: function() {
                        return null == this._navRVO && (this._navRVO = this.node.getComponent(f),
                        null == this._navRVO && (this._navRVO = this.node.addComponent(f))),
                        this._navRVO
                    }
                }, {
                    key: "roadNode",
                    get: function() {
                        return c.instance.getRoadNodeByPixel(this.getX(), this.getY())
                    }
                }, {
                    key: "direction",
                    get: function() {
                        return null != this.navUnit ? this.navUnit.direction : this._direction
                    },
                    set: function(n) {
                        null != this.navUnit && (this.navUnit.direction = n),
                        this._direction = n
                    }
                }, {
                    key: "moveSpeed",
                    get: function() {
                        return null != this.navUnit ? this.navUnit.moveSpeed : this._moveSpeed
                    },
                    set: function(n) {
                        null != this.navUnit && (this.navUnit.moveSpeed = n),
                        this._moveSpeed = n
                    }
                }, {
                    key: "moveDir",
                    get: function() {
                        return null != this.navUnit ? this.navUnit.moveDir : this._moveDir
                    },
                    set: function(n) {
                        null != this.navUnit && (this.navUnit.moveDir = n),
                        this._moveDir = n
                    }
                }, {
                    key: "radius",
                    get: function() {
                        return null != this.navUnit ? this.navUnit.radius : this._radius
                    },
                    set: function(n) {
                        null != this.navUnit && (this.navUnit.radius = n),
                        this._radius = n
                    }
                }]),
                t
            }(l)).prototype, "ctrMode", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return v.touch
                }
            }),
            g = m)) || g));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NavJoystick.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./PathFindingAgent.ts", "./RVOSystem.ts", "./NavAgent.ts"], (function(t) {
    "use strict";
    var n, e, a, o, s, i, g, r, v, h;
    return {
        setters: [function(t) {
            n = t.inheritsLoose,
            e = t.createClass
        }
        , function(t) {
            a = t.cclegacy,
            o = t._decorator,
            s = t.Vec3,
            i = t.Component
        }
        , function(t) {
            g = t.ControlMode
        }
        , function(t) {
            r = t.default
        }
        , function(t) {
            v = t.default
        }
        , function(t) {
            h = t.default
        }
        ],
        execute: function() {
            var l;
            a._RF.push({}, "1aa63ho/ppFtqe2/wx0vckg", "NavJoystick", void 0);
            var c = o.ccclass;
            o.property,
            t("default", c("NavJoystick")(l = function(t) {
                function a() {
                    for (var n, e = arguments.length, a = new Array(e), o = 0; o < e; o++)
                        a[o] = arguments[o];
                    return (n = t.call.apply(t, [this].concat(a)) || this)._navAgent = null,
                    n.targetPos = new s(0,0,0),
                    n
                }
                n(a, t);
                var o = a.prototype;
                return o.start = function() {}
                ,
                o.init = function() {}
                ,
                o.update = function(t) {
                    null != this.navAgent && this.navAgent.controlMode == g.joystick && (v.instance.runing && this.navAgent.navRVO.isUse && !this.navAgent.navRVO.isObstacle ? this.onJoyStickControll_RVO(t) : this.onJoyStickControll_Normal(t))
                }
                ,
                o.onJoyStickControll_Normal = function(t) {
                    if (0 != this.navAgent.moveDir.x || 0 != this.navAgent.moveDir.y) {
                        this.navAgent.setFaceDir(this.navAgent.moveDir);
                        var n = this.navAgent.moveSpeed * t
                          , e = this.navAgent.getPos().clone().add(this.navAgent.moveDir.clone().multiplyScalar(n))
                          , a = r.instance.getRoadNodeByPixel(e.x, e.y);
                        if (a)
                            if (1 != a.value)
                                this.targetPos = e;
                            else {
                                for (var o = r.instance.getRoundRoadNodes(this.navAgent.roadNode), i = null, g = 0; g < o.length; g++)
                                    if (o[g] && 1 != o[g].value && o[g] != a)
                                        if (o[g].h = 10 * (Math.abs(a.cx - o[g].cx) + Math.abs(a.cy - o[g].cy)),
                                        i) {
                                            if (o[g].h < i.h)
                                                i = o[g];
                                            else if (o[g].h == i.h) {
                                                var v = new s(o[g].px,o[g].py).subtract(this.navAgent.getPos()).normalize()
                                                  , h = new s(i.px,i.py).subtract(this.navAgent.getPos()).normalize();
                                                v.add(this.navAgent.moveDir).length() > h.add(this.navAgent.moveDir).length() && (i = o[g])
                                            }
                                        } else
                                            i = o[g];
                                if (i) {
                                    v = new s(a.px,a.py).subtract(this.navAgent.getPos()).normalize(),
                                    h = new s(i.px,i.py).subtract(this.navAgent.getPos()).normalize();
                                    v.add(this.navAgent.moveDir).length() / 2 > h.add(this.navAgent.moveDir).length() ? this.targetPos = this.navAgent.getPos() : this.targetPos = new s(i.px,i.py)
                                }
                            }
                        else
                            this.targetPos = this.navAgent.getPos();
                        var l = this.targetPos.clone().subtract(this.navAgent.getPos())
                          , c = l.length();
                        l = l.normalize(),
                        c >= n && (this.targetPos = this.navAgent.getPos().clone().add(l.multiplyScalar(n))),
                        this.navAgent.setPosition(this.targetPos),
                        this.navAgent.onMove()
                    } else
                        this.navAgent.onStop()
                }
                ,
                o.onJoyStickControll_RVO = function(t) {
                    0 != this.navAgent.moveDir.x || 0 != this.navAgent.moveDir.y ? (this.navAgent.setFaceDir(this.navAgent.moveDir),
                    this.targetPos = this.navAgent.getPos().clone().add(this.navAgent.moveDir.clone().multiplyScalar(this.navAgent.moveSpeed)),
                    this.navAgent.onMove()) : (this.targetPos = this.navAgent.getPos(),
                    this.navAgent.onStop()),
                    this.navAgent.navRVO.moveSpeed = this.navAgent.moveSpeed,
                    this.navAgent.navRVO.targetPos.x = this.targetPos.x,
                    this.navAgent.navRVO.targetPos.y = this.targetPos.y
                }
                ,
                e(a, [{
                    key: "navAgent",
                    get: function() {
                        return this._navAgent || (this._navAgent = this.node.getComponent(h)),
                        this._navAgent
                    }
                }]),
                a
            }(i)) || l);
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NavPath.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./PathFindingAgent.ts", "./RVOSystem.ts", "./NavAgent.ts"], (function(t) {
    "use strict";
    var n, e, i, a, s, o, h, v, g;
    return {
        setters: [function(t) {
            n = t.inheritsLoose,
            e = t.createClass
        }
        , function(t) {
            i = t.cclegacy,
            a = t._decorator,
            s = t.Component
        }
        , function(t) {
            o = t.ControlMode
        }
        , function(t) {
            h = t.default
        }
        , function(t) {
            v = t.default
        }
        , function(t) {
            g = t.default
        }
        ],
        execute: function() {
            var r;
            i._RF.push({}, "2d3d61QDtBIIIM2ZvwWiNnJ", "NavPath", void 0);
            var l = a.ccclass;
            a.property,
            t("default", l("NavPath")(r = function(t) {
                function i() {
                    for (var n, e = arguments.length, i = new Array(e), a = 0; a < e; a++)
                        i[a] = arguments[a];
                    return (n = t.call.apply(t, [this].concat(i)) || this).naving = !1,
                    n._moveAngle = 0,
                    n._roadNodeArr = [],
                    n._nodeIndex = 0,
                    n._navAgent = null,
                    n
                }
                n(i, t);
                var a = i.prototype;
                return a.start = function() {}
                ,
                a.init = function() {}
                ,
                a.update = function(t) {
                    if (null != this.navAgent && this.navAgent.controlMode == o.touch && this.naving) {
                        if (v.instance.runing && this.navAgent.navRVO.isUse && this.navAgent.navRVO.isObstacle)
                            return void this.stop();
                        if (0 == this.navAgent.moveSpeed)
                            return void this.stop();
                        var n = this._roadNodeArr[this._nodeIndex]
                          , e = n.px - this.navAgent.getX()
                          , i = n.py - this.navAgent.getY()
                          , a = this.navAgent.moveSpeed * t;
                        if (e * e + i * i > a * a) {
                            if (0 == this._moveAngle) {
                                this._moveAngle = Math.atan2(i, e);
                                var s = Math.round((-this._moveAngle + Math.PI) / (Math.PI / 4));
                                this.navAgent.direction = s > 5 ? s - 6 : s + 2
                            }
                            var h = Math.cos(this._moveAngle) * a
                              , g = Math.sin(this._moveAngle) * a;
                            v.instance.runing && this.navAgent.navRVO.isUse ? (this.navAgent.navRVO.moveSpeed = this.navAgent.moveSpeed,
                            this.navAgent.navRVO.targetPos.x = n.px,
                            this.navAgent.navRVO.targetPos.y = n.py) : (this.navAgent.setX(this.navAgent.getX() + h),
                            this.navAgent.setY(this.navAgent.getY() + g))
                        } else
                            this.navAgent.walkCompleteOneRoadNode(n),
                            this._moveAngle = 0,
                            this._nodeIndex == this._roadNodeArr.length - 1 ? (this.navAgent.setPos(n.px, n.py),
                            this.stop(),
                            this.navAgent.walkCompleteThePath(n)) : this.walk()
                    }
                }
                ,
                a.navTo = function(t, n) {
                    if (null != this.navAgent) {
                        var e = h.instance.seekPath2(this.navAgent.getX(), this.navAgent.getY(), t, n, this.navAgent.radius);
                        e.length > 0 && this.walkByRoad(e)
                    }
                }
                ,
                a.walkByRoad = function(t) {
                    this._roadNodeArr = t,
                    this._nodeIndex = 0,
                    this._moveAngle = 0,
                    this.walk(),
                    this.move()
                }
                ,
                a.walk = function() {
                    this._nodeIndex < this._roadNodeArr.length - 1 && this._nodeIndex++
                }
                ,
                a.move = function() {
                    0 != this._roadNodeArr.length ? (this.naving = !0,
                    this._moveAngle = 0,
                    null != this.navAgent && this.navAgent.onMove()) : this.stop()
                }
                ,
                a.stop = function() {
                    this.naving = !1,
                    null != this.navAgent && (this.navAgent.navRVO.stop(),
                    this.navAgent.onStop())
                }
                ,
                e(i, [{
                    key: "navAgent",
                    get: function() {
                        return this._navAgent || (this._navAgent = this.node.getComponent(g)),
                        this._navAgent
                    }
                }]),
                i
            }(s)) || r);
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NavRVO.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Common.ts", "./Simulator.ts", "./RVOSystem.ts", "./NavAgent.ts"], (function(t) {
    "use strict";
    var e, n, s, i, o, a, r, g, c, h;
    return {
        setters: [function(t) {
            e = t.inheritsLoose,
            n = t.createClass
        }
        , function(t) {
            s = t.cclegacy,
            i = t._decorator,
            o = t.Component
        }
        , function(t) {
            a = t.Vector2,
            r = t.RVOMath
        }
        , function(t) {
            g = t.Simulator
        }
        , function(t) {
            c = t.default
        }
        , function(t) {
            h = t.default
        }
        ],
        execute: function() {
            var v;
            s._RF.push({}, "7d4c69vFjxA972tNH0LOj72", "NavRVO", void 0);
            var u = i.ccclass;
            i.property,
            t("default", u("NavRVO")(v = function(t) {
                function s() {
                    for (var e, n = arguments.length, s = new Array(n), i = 0; i < n; i++)
                        s[i] = arguments[i];
                    return (e = t.call.apply(t, [this].concat(s)) || this)._navAgent = null,
                    e.rvoTag = 0,
                    e.rvoAgentId = -1,
                    e.targetPos = new a(0,0),
                    e.moveSpeed = 200,
                    e.isUse = !1,
                    e._isObstacle = !1,
                    e.isDestroy = !1,
                    e
                }
                e(s, t);
                var i = s.prototype;
                return i.start = function() {}
                ,
                i.init = function() {}
                ,
                i.initRVO = function() {
                    -1 != this.rvoAgentId && g.instance.removeAgent(this.rvoAgentId),
                    this.rvoTag = c.instance.rvoTag,
                    g.instance.setAgentDefaults(80, 10, 100, .01, this.navAgent.radius, this.navAgent.moveSpeed, new a(0,0));
                    var t = new a(this.node.position.x,this.node.position.y)
                      , e = g.instance.addAgent(t);
                    this.rvoAgentId = e,
                    this.targetPos = t,
                    this.isUse = !0,
                    this.isObstacle = this.isObstacle
                }
                ,
                i.removeRVO = function() {
                    -1 != this.rvoAgentId && g.instance.removeAgent(this.rvoAgentId),
                    this.rvoAgentId = -1,
                    this.targetPos = new a(0,0),
                    this.isUse = !1
                }
                ,
                i.update = function(t) {
                    if (g.instance.hasAgent(this.rvoAgentId)) {
                        null != this.targetPos && this.setPreferredVelocities(t);
                        var e = g.instance.getAgentPosition(this.rvoAgentId);
                        this.navAgent.setX(e.x),
                        this.navAgent.setY(e.y)
                    }
                }
                ,
                i.setPreferredVelocities = function(t) {
                    if (!this.isObstacle) {
                        var e = this.targetPos.minus(g.instance.getAgentPosition(this.rvoAgentId))
                          , n = r.absSq(e)
                          , s = this.navAgent.moveSpeed * t
                          , i = this.moveSpeed;
                        n < s * s && (i = this.lerp(0, Math.sqrt(n), .5)),
                        r.absSq(e) > 1 && (e = r.normalize(e).scale(i)),
                        g.instance.setAgentPrefVelocity(this.rvoAgentId, e);
                        var o = 2 * Math.random() * Math.PI
                          , c = 1 * Math.random();
                        g.instance.setAgentPrefVelocity(this.rvoAgentId, g.instance.getAgentPrefVelocity(this.rvoAgentId).plus(new a(Math.cos(o),Math.sin(o)).scale(c)))
                    }
                }
                ,
                i.lerp = function(t, e, n) {
                    return n > 1 ? n = 1 : n < 0 && (n = 0),
                    t * (1 - n) + e * n
                }
                ,
                i.stop = function() {
                    null != this.targetPos && (this.targetPos.x = this.navAgent.getX(),
                    this.targetPos.y = this.navAgent.getY())
                }
                ,
                i.isReachedTargetPos = function() {
                    return !(r.absSq(g.instance.getAgentPosition(this.rvoAgentId).minus(this.targetPos)) > g.instance.getAgentRadius(this.rvoAgentId) * g.instance.getAgentRadius(this.rvoAgentId))
                }
                ,
                i.destroySelf = function() {
                    this.isDestroy = !0,
                    this.rvoTag == c.instance.rvoTag && g.instance.removeAgent(this.rvoAgentId)
                }
                ,
                i.onDestroy = function() {
                    this.isDestroy || (this.isDestroy = !0,
                    this.rvoTag == c.instance.rvoTag && g.instance.removeAgent(this.rvoAgentId))
                }
                ,
                n(s, [{
                    key: "navAgent",
                    get: function() {
                        return this._navAgent || (this._navAgent = this.node.getComponent(h)),
                        this._navAgent
                    }
                }, {
                    key: "isObstacle",
                    get: function() {
                        return this._isObstacle
                    },
                    set: function(t) {
                        this._isObstacle = t,
                        -1 != this.rvoAgentId && (this._isObstacle ? g.instance.setAgentMass(this.rvoAgentId, 10) : g.instance.setAgentMass(this.rvoAgentId, 1))
                    }
                }]),
                s
            }(o)) || v);
            s._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NavUnit.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./MapRoadUtils.ts", "./PathFindingAgent.ts", "./NavAgent.ts", "./Unit.ts"], (function(t) {
    "use strict";
    var i, a, n, e, o, s, r, l, c, h, u, d, k, v, g;
    return {
        setters: [function(t) {
            i = t.applyDecoratedDescriptor,
            a = t.inheritsLoose,
            n = t.initializerDefineProperty,
            e = t.assertThisInitialized,
            o = t.createClass
        }
        , function(t) {
            s = t.cclegacy,
            r = t._decorator,
            l = t.Vec3,
            c = t.Enum
        }
        , function(t) {
            h = t.ControlMode
        }
        , function(t) {
            u = t.default
        }
        , function(t) {
            d = t.default
        }
        , function(t) {
            k = t.default
        }
        , function(t) {
            v = t.UnitState,
            g = t.default
        }
        ],
        execute: function() {
            var p, f, T, y, C;
            s._RF.push({}, "c8c9aADnAtFnKIKwoeBQYmx", "NavUnit", void 0);
            var A = r.ccclass
              , b = r.property
              , P = t("TrackLogic", function() {
                function t() {
                    this.navUnit = null,
                    this.target = void 0,
                    this.arriveTargetCallback = void 0,
                    this.stopTrackCallback = void 0,
                    this.lockedArrive = !1,
                    this.lastTrackPos = new l(0,0,0),
                    this.notTrackDist = 3,
                    this.notSeakDist = 3
                }
                var i = t.prototype;
                return i.trackTarget = function(t, i, a, n, e, o) {
                    void 0 === a && (a = null),
                    void 0 === n && (n = null),
                    void 0 === e && (e = 3),
                    void 0 === o && (o = 3),
                    null != t && null != i && (this.target != i && (this.lastTrackPos = new l(0,0,0)),
                    this.navUnit = t,
                    this.target = i,
                    this.arriveTargetCallback = a,
                    this.stopTrackCallback = n,
                    this.notTrackDist = e,
                    this.notSeakDist = o,
                    this.lockedArrive = !1)
                }
                ,
                i.stopTrack = function() {
                    this.arriveTargetCallback = null,
                    null != this.stopTrackCallback && (this.stopTrackCallback(this.target),
                    this.stopTrackCallback = null),
                    this.target = null
                }
                ,
                i.isNeedTrack = function() {
                    var t = u.instance.getWorldPointByPixel(this.navUnit.node.position.x, this.navUnit.node.position.y)
                      , i = u.instance.getWorldPointByPixel(this.target.position.x, this.target.position.y);
                    return !(Math.abs(t.x - i.x) + Math.abs(t.y - i.y) < this.notTrackDist)
                }
                ,
                i.isNeedSeekRoad = function() {
                    if (null == this.target)
                        return !1;
                    var t = u.instance.getWorldPointByPixel(this.target.position.x, this.target.position.y)
                      , i = u.instance.getWorldPointByPixel(this.lastTrackPos.x, this.lastTrackPos.y);
                    return !(Math.abs(t.x - i.x) + Math.abs(t.y - i.y) < this.notSeakDist)
                }
                ,
                i.trackTo = function(t, i) {
                    null != this.navUnit && (this.lastTrackPos.x = t,
                    this.lastTrackPos.y = i,
                    this.navUnit.navAgent.navTo(t, i))
                }
                ,
                i.update = function(t) {
                    if (null != this.navUnit && null != this.target) {
                        if (!this.isNeedTrack())
                            return this.navUnit.navAgent.navPath.stop(),
                            this.navUnit.lookAtTarget(this.target),
                            void (this.lockedArrive || (this.lockedArrive = !0,
                            null != this.arriveTargetCallback && this.arriveTargetCallback(this.target)));
                        this.lockedArrive = !1,
                        this.navUnit.navAgent.navPath.naving ? this.isNeedSeekRoad() && this.trackTo(this.target.position.x, this.target.position.y) : this.trackTo(this.target.position.x, this.target.position.y)
                    }
                }
                ,
                t
            }());
            t("default", (p = A("NavUnit"),
            f = b({
                type: c(h),
                tooltip: "控制模式:\ntouch  点击行走 \njoystick 摇杆操作 "
            }),
            p((C = i((y = function(t) {
                function i() {
                    for (var i, a = arguments.length, o = new Array(a), s = 0; s < a; s++)
                        o[s] = arguments[s];
                    return i = t.call.apply(t, [this].concat(o)) || this,
                    n(i, "ctrMode", C, e(i)),
                    i._navAgent = null,
                    i.trackLogic = new P,
                    i.moveDir = new l(0,0,0),
                    i.radius = 10,
                    i.walkRoadNodeCallback = null,
                    i.walkCompletePathCallback = null,
                    i
                }
                a(i, t);
                var s = i.prototype;
                return s.onLoad = function() {
                    t.prototype.onLoad.call(this),
                    this.navAgent.init()
                }
                ,
                s.start = function() {
                    t.prototype.start.call(this)
                }
                ,
                s.update = function(i) {
                    t.prototype.update.call(this, i),
                    this.trackLogic.update(i)
                }
                ,
                s.initRVO = function() {
                    this.setDefaultRadius(),
                    this.navAgent.navRVO.initRVO()
                }
                ,
                s.setDefaultRadius = function() {
                    if (d.instance.mapData) {
                        var t = Math.min(u.instance.halfNodeWidth, u.instance.halfNodeHeight);
                        this.radius = Math.floor(.8 * t)
                    }
                }
                ,
                s.navTo = function(t, i) {
                    null != this.trackLogic.target && this.trackLogic.stopTrack(),
                    this.navAgent.navTo(t, i)
                }
                ,
                s.trackTarget = function(t, i, a, n, e) {
                    void 0 === i && (i = null),
                    void 0 === a && (a = null),
                    void 0 === n && (n = 3),
                    void 0 === e && (e = 3),
                    null != this.trackLogic.target && this.trackLogic.target != t && this.trackLogic.stopTrack(),
                    this.trackLogic.trackTarget(this, t, i, a, n, e)
                }
                ,
                s.stopTrack = function() {
                    this.trackLogic.stopTrack()
                }
                ,
                s.onMove = function() {
                    this.state = v.walk
                }
                ,
                s.onStop = function() {
                    this.state = v.idle
                }
                ,
                s.walkCompleteOneRoadNode = function(t) {
                    null != this.walkRoadNodeCallback && this.walkRoadNodeCallback()
                }
                ,
                s.walkCompleteThePath = function(t) {
                    null != this.walkCompletePathCallback && this.walkCompletePathCallback()
                }
                ,
                s.destroySelf = function() {
                    this.navAgent.navRVO.destroySelf(),
                    t.prototype.destroySelf.call(this)
                }
                ,
                o(i, [{
                    key: "controlMode",
                    get: function() {
                        return this.ctrMode
                    },
                    set: function(t) {
                        this.ctrMode = t
                    }
                }, {
                    key: "navAgent",
                    get: function() {
                        return null == this._navAgent && (this._navAgent = this.node.getComponent(k),
                        null == this._navAgent && (this._navAgent = this.node.addComponent(k))),
                        this._navAgent
                    }
                }]),
                i
            }(g)).prototype, "ctrMode", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return h.touch
                }
            }),
            T = y)) || T));
            s._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NPC.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Actor2.ts", "./UIManager.ts", "./DataConfig.ts", "./NPCTalkBoard.ts", "./GameWorld.ts"], (function(t) {
    "use strict";
    var i, n, e, o, a, r, s, l, c, u, h, d, p, f, g, v, y;
    return {
        setters: [function(t) {
            i = t.applyDecoratedDescriptor,
            n = t.inheritsLoose,
            e = t.initializerDefineProperty,
            o = t.assertThisInitialized,
            a = t.createClass
        }
        , function(t) {
            r = t.cclegacy,
            s = t._decorator,
            l = t.CCInteger,
            c = t.Node,
            u = t.Vec3,
            h = t.resources,
            d = t.Texture2D
        }
        , function(t) {
            p = t.default
        }
        , function(t) {
            f = t.default
        }
        , function(t) {
            g = t.DataConfig
        }
        , function(t) {
            v = t.NPCTalkBoard
        }
        , function(t) {
            y = t.default
        }
        ],
        execute: function() {
            var k, m, P, C, T, D, b;
            r._RF.push({}, "d21e4Sn7TpPb6hQIKrDjDRB", "NPC", void 0);
            var I = s.ccclass
              , B = s.property;
            t("default", (k = I("NPC"),
            m = B(l),
            P = B(c),
            k((D = i((T = function(t) {
                function i() {
                    for (var i, n = arguments.length, a = new Array(n), r = 0; r < n; r++)
                        a[r] = arguments[r];
                    return i = t.call.apply(t, [this].concat(a)) || this,
                    e(i, "npcId", D, o(i)),
                    e(i, "skin", b, o(i)),
                    i._talkBoard = null,
                    i.editData = null,
                    i
                }
                n(i, t);
                var r = i.prototype;
                return r.start = function() {
                    t.prototype.start.call(this),
                    this.skin.on(c.EventType.TOUCH_START, this.onTouchStart, this)
                }
                ,
                r.init = function() {
                    this.width = 100,
                    this.height = 100,
                    this.direction = this.defaultDir,
                    this.isPatrol || (this.navAgent.navRVO.isObstacle = !0),
                    this.loadRes()
                }
                ,
                r.initEditData = function(t) {
                    this.editData = t,
                    this.objName = t.objName,
                    this.npcId = Number(t.objId),
                    this.node.position = new u(t.x,t.y),
                    this.defaultDir = t.direction,
                    this.isPatrol = t.isPatrol
                }
                ,
                r.loadRes = function() {
                    var t = this;
                    if (0 != this.npcId) {
                        var i = "game/npc/" + this.npcId + "/texture";
                        h.load(i, d, (function(n, e) {
                            if (null != n)
                                return console.log("\n"),
                                console.error("加载NPC资源失败 filePath：", i),
                                console.error("错误原因", n),
                                void console.log("\n");
                            t.movieClip.init(e, 5, 12),
                            t.width = t.movieClip.uiTransform.width,
                            t.height = t.movieClip.uiTransform.height
                        }
                        ))
                    }
                }
                ,
                r.onTouchStart = function(t) {
                    var i = this;
                    y.instance.gameMap.myPlayer.trackTarget(this.node, (function(t) {
                        i.isStopPatrol = !0,
                        i.navAgent.navPath.stop(),
                        i.lookAtTarget(y.instance.gameMap.myPlayer.node),
                        i.say(g.getNpcTalkData(i.editData.dialogueId), (function() {
                            1 == i.editData.funcId && f.instance.equipShopView.open()
                        }
                        ))
                    }
                    ), (function() {
                        i.isStopPatrol = !1,
                        i.navAgent.navPath.move()
                    }
                    ))
                }
                ,
                r.say = function(t, i) {
                    void 0 === i && (i = null),
                    null != this.talkBoard && this.talkBoard.showTalkContent(t, i)
                }
                ,
                r.stopSay = function() {
                    this.talkBoard.close()
                }
                ,
                a(i, [{
                    key: "talkBoard",
                    get: function() {
                        return this._talkBoard || (this._talkBoard = this.node.getComponentInChildren(v)),
                        this._talkBoard
                    }
                }]),
                i
            }(p)).prototype, "npcId", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            b = i(T.prototype, "skin", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            C = T)) || C));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NpcManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./NPC.ts"], (function(e) {
    "use strict";
    var t, n, r, i, a, o, c, u, p, s, l;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            n = e.inheritsLoose,
            r = e.initializerDefineProperty,
            i = e.assertThisInitialized
        }
        , function(e) {
            a = e.cclegacy,
            o = e._decorator,
            c = e.Prefab,
            u = e.instantiate,
            p = e.Vec3,
            s = e.Component
        }
        , function(e) {
            l = e.default
        }
        ],
        execute: function() {
            var f, d, g, b, v;
            a._RF.push({}, "846b4EYS5xKg7zPEfdwdoQJ", "NpcManager", void 0);
            var y = o.ccclass
              , P = o.property;
            e("default", (f = y("NpcManager"),
            d = P(c),
            f((v = t((b = function(e) {
                function t() {
                    for (var t, n = arguments.length, a = new Array(n), o = 0; o < n; o++)
                        a[o] = arguments[o];
                    return t = e.call.apply(e, [this].concat(a)) || this,
                    r(t, "npcPrefab", v, i(t)),
                    t
                }
                n(t, e);
                var a = t.prototype;
                return a.start = function() {}
                ,
                a.getNPC = function() {
                    var e = u(this.npcPrefab).getComponent(l);
                    return e.node.active = !0,
                    e.node.position = new p(0,0,0),
                    e
                }
                ,
                t
            }(s)).prototype, "npcPrefab", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            g = b)) || g));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/NPCTalkBoard.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var l, e, a, n, i, o, s, r, c;
    return {
        setters: [function(t) {
            l = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            a = t.initializerDefineProperty,
            n = t.assertThisInitialized
        }
        , function(t) {
            i = t.cclegacy,
            o = t._decorator,
            s = t.Node,
            r = t.Label,
            c = t.Component
        }
        ],
        execute: function() {
            var u, k, h, p, d, C, f;
            i._RF.push({}, "e37486U2MlKTpObuoBppaL8", "NPCTalkBoard", void 0);
            var b = o.ccclass
              , g = o.property;
            t("NPCTalkBoard", (u = b("NPCTalkBoard"),
            k = g(s),
            h = g(r),
            u((C = l((d = function(t) {
                function l() {
                    for (var l, e = arguments.length, i = new Array(e), o = 0; o < e; o++)
                        i[o] = arguments[o];
                    return l = t.call.apply(t, [this].concat(i)) || this,
                    a(l, "board", C, n(l)),
                    a(l, "talkContentTxt", f, n(l)),
                    l.talkCompCallback = null,
                    l.talkMsg = "",
                    l.talkIndex = 0,
                    l.talkTime = 0,
                    l
                }
                e(l, t);
                var i = l.prototype;
                return i.start = function() {}
                ,
                i.update = function(t) {
                    var l = this;
                    if (this.talkIndex != this.talkMsg.length && (this.talkTime -= t,
                    this.talkTime <= 0 && (this.talkTime = .065,
                    this.talkIndex < this.talkMsg.length))) {
                        var e = this.talkMsg.substring(0, this.talkIndex + 1);
                        this.talkContentTxt.string = e,
                        this.talkIndex++,
                        this.talkIndex == this.talkMsg.length && this.scheduleOnce((function() {
                            null != l.talkCompCallback && (l.talkCompCallback(),
                            l.talkCompCallback = null),
                            l.close()
                        }
                        ), 1.5)
                    }
                }
                ,
                i.showTalkContent = function(t, l) {
                    void 0 === l && (l = null),
                    this.talkCompCallback = l,
                    this.talkContentTxt.string = "",
                    this.talkMsg = t,
                    this.talkIndex = 1,
                    this.talkTime = .25,
                    this.unscheduleAllCallbacks(),
                    this.open()
                }
                ,
                i.open = function() {
                    this.node.active = !0
                }
                ,
                i.close = function() {
                    this.node.active = !1
                }
                ,
                l
            }(c)).prototype, "board", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            f = l(d.prototype, "talkContentTxt", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            p = d)) || p));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/ObstacleEdgeUtils.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MapType.ts", "./MapRoadUtils.ts", "./PathFindingAgent.ts"], (function(e) {
    "use strict";
    var t, n, i, o, s;
    return {
        setters: [function(e) {
            t = e.createClass
        }
        , function(e) {
            n = e.cclegacy
        }
        , function(e) {
            i = e.MapType
        }
        , function(e) {
            o = e.default
        }
        , function(e) {
            s = e.default
        }
        ],
        execute: function() {
            n._RF.push({}, "5b2fbo8M9VKx5RhQXncu8vy", "ObstacleEdgeUtils", void 0),
            e("default", function() {
                function e() {}
                var n = e.prototype;
                return n.showObstacleEdge = function(t) {
                    var n = e.instance.getEdge();
                    e.instance.optimizeEdge(n);
                    var s = e.instance.getObstacleEdge();
                    t.clear(),
                    t.lineWidth = 2.4,
                    t.strokeColor.fromHEX("#ffff00"),
                    t.fillColor.fromHEX("#ff0000");
                    var a = o.instance.nodeWidth / 2
                      , d = o.instance.nodeHeight / 2
                      , l = o.instance.mapType;
                    for (var u in n)
                        if (null != n[u]) {
                            var r = o.instance.getNodeByWorldPoint(n[u].x + .5, n[u].y + .5);
                            l == i.angle45 ? (t.circle(r.px, r.py - d, 5),
                            t.fill()) : l == i.angle90 && (t.circle(r.px - a, r.py - d, 5),
                            t.fill())
                        }
                    for (var c = s.length, g = 0; g < c; g++)
                        t.moveTo(s[g].startX, s[g].startY),
                        t.lineTo(s[g].endX, s[g].endY),
                        t.stroke()
                }
                ,
                n.getObstacleEdge = function() {
                    var e = this.getEdge();
                    return this.optimizeEdge(e),
                    this.getEdgeLine(e)
                }
                ,
                n.optimizeEdge = function(e) {
                    var t = [];
                    for (var n in e) {
                        var i = e[n]
                          , o = null != i.left && null != i.right
                          , s = null != i.up && null != i.down;
                        o && !s && (i.left.right = i.right,
                        i.right.left = i.left,
                        i.left = null,
                        i.right = null,
                        t.push(n)),
                        !o && s && (i.up.down = i.down,
                        i.down.up = i.up,
                        i.up = null,
                        i.down = null,
                        t.push(n))
                    }
                    for (var a = t.length, d = 0; d < a; d++) {
                        e[n = t[d]] = null,
                        delete e[n]
                    }
                }
                ,
                n.getEdgeLine = function(e) {
                    var t = o.instance.nodeWidth / 2
                      , n = o.instance.nodeHeight / 2
                      , s = o.instance.mapType
                      , d = null
                      , l = null
                      , u = null
                      , r = 0
                      , c = 0
                      , g = 0
                      , h = 0
                      , f = [];
                    for (var p in e) {
                        var v;
                        if (d = e[p],
                        l = o.instance.getNodeByWorldPoint(d.x + .5, d.y + .5),
                        s == i.angle45 ? r = l.px : s == i.angle90 && (r = l.px - t),
                        c = l.py - n,
                        null != d.left && !d.connectLeft)
                            u = o.instance.getNodeByWorldPoint(d.left.x + .5, d.left.y + .5),
                            s == i.angle45 ? g = u.px : s == i.angle90 && (g = u.px - t),
                            h = u.py - n,
                            (v = new a).moveTo(r, c),
                            v.lineTo(g, h),
                            f.push(v),
                            d.connectLeft = !0,
                            d.left.connectRight = !0;
                        if (null != d.up && !d.connectUp)
                            u = o.instance.getNodeByWorldPoint(d.up.x + .5, d.up.y + .5),
                            s == i.angle45 ? g = u.px : s == i.angle90 && (g = u.px - t),
                            h = u.py - n,
                            (v = new a).moveTo(r, c),
                            v.lineTo(g, h),
                            f.push(v),
                            d.connectUp = !0,
                            d.up.connectDown = !0;
                        if (null != d.right && !d.connectRight)
                            u = o.instance.getNodeByWorldPoint(d.right.x + .5, d.right.y + .5),
                            s == i.angle45 ? g = u.px : s == i.angle90 && (g = u.px - t),
                            h = u.py - n,
                            (v = new a).moveTo(r, c),
                            v.lineTo(g, h),
                            f.push(v),
                            d.connectRight = !0,
                            d.right.connectLeft = !0;
                        if (null != d.down && !d.connectDown)
                            u = o.instance.getNodeByWorldPoint(d.down.x + .5, d.down.y + .5),
                            s == i.angle45 ? g = u.px : s == i.angle90 && (g = u.px - t),
                            h = u.py - n,
                            (v = new a).moveTo(r, c),
                            v.lineTo(g, h),
                            f.push(v),
                            d.connectDown = !0,
                            d.down.connectUp = !0
                    }
                    return f
                }
                ,
                n.getEdge = function() {
                    var e = o.instance.mapType;
                    return e == i.angle45 ? this.getEdge45Angle() : e == i.angle90 ? this.getEdge90Angle() : {}
                }
                ,
                n.getEdge45Angle = function() {
                    for (var e = o.instance.row, t = o.instance.col, n = 0, i = 0, a = {}, l = 0; l <= e; l++)
                        for (var u = 0; u <= t; u++) {
                            var r, c = o.instance.getNodeByDerect(u, l);
                            if (n = c.cx,
                            i = c.cy,
                            0 == c.dx && c.dy % 2 == 0)
                                a[(r = new d(n - .5,i + .5)).x + "_" + r.y] = r;
                            if (c.dx < t && c.dy == e)
                                a[(r = new d(n + .5,i - .5)).x + "_" + r.y] = r;
                            if (c.dx == t && c.dy % 2 == 0 || c.dy == e)
                                this.saveLeftDownCornerQuadData(n, i, a);
                            else {
                                var g = s.instance.getRoadNode(n, i);
                                if (null == g)
                                    continue;
                                var h = s.instance.getRoadNode(n - 1, i)
                                  , f = s.instance.getRoadNode(n - 1, i - 1)
                                  , p = s.instance.getRoadNode(n, i - 1);
                                this.isEnableValue(g.value) ? (this.isOutEdgeNode(h) || this.isOutEdgeNode(f) || this.isOutEdgeNode(p)) && this.saveLeftDownCornerQuadData(n, i, a) : this.isDisableValue(g.value) && (this.isOutEdgeNode(h) && this.isOutEdgeNode(f) && this.isOutEdgeNode(p) || this.saveLeftDownCornerQuadData(n, i, a))
                            }
                        }
                    return a
                }
                ,
                n.getEdge90Angle = function() {
                    for (var e = o.instance.row, t = o.instance.col, n = 0, i = 0, a = {}, d = 0; d <= e; d++)
                        for (var l = 0; l <= t; l++)
                            if (i = d,
                            (n = l) == t || i == e)
                                this.saveLeftDownCornerQuadData(n, i, a);
                            else {
                                var u = s.instance.getRoadNode(n, i)
                                  , r = s.instance.getRoadNode(n - 1, i)
                                  , c = s.instance.getRoadNode(n - 1, i - 1)
                                  , g = s.instance.getRoadNode(n, i - 1);
                                this.isEnableValue(u.value) ? (this.isOutEdgeNode(r) || this.isOutEdgeNode(c) || this.isOutEdgeNode(g)) && this.saveLeftDownCornerQuadData(n, i, a) : this.isDisableValue(u.value) && (this.isOutEdgeNode(r) && this.isOutEdgeNode(c) && this.isOutEdgeNode(g) || this.saveLeftDownCornerQuadData(n, i, a))
                            }
                    return a
                }
                ,
                n.saveLeftDownCornerQuadData = function(e, t, n) {
                    var i = new d(e - .5,t - .5);
                    n[i.x + "_" + i.y] = i;
                    var o = s.instance.getRoadNode(i.x - .5, i.y + .5)
                      , a = s.instance.getRoadNode(i.x + .5, i.y + .5)
                      , l = s.instance.getRoadNode(i.x + .5, i.y - .5)
                      , u = s.instance.getRoadNode(i.x - .5, i.y - .5)
                      , r = n[i.x - 1 + "_" + i.y];
                    null != r && (!this.isOutEdgeNode(o) && this.isOutEdgeNode(u) || this.isOutEdgeNode(o) && !this.isOutEdgeNode(u)) && (i.left = r,
                    r.right = i);
                    var c = n[i.x + "_" + (i.y + 1)];
                    null != c && (!this.isOutEdgeNode(o) && this.isOutEdgeNode(a) || this.isOutEdgeNode(o) && !this.isOutEdgeNode(a)) && (i.up = c,
                    c.down = i);
                    var g = n[i.x + 1 + "_" + i.y];
                    null != g && (!this.isOutEdgeNode(a) && this.isOutEdgeNode(l) || this.isOutEdgeNode(a) && !this.isOutEdgeNode(l)) && (i.right = g,
                    g.left = i);
                    var h = n[i.x + "_" + (i.y - 1)];
                    null != h && (!this.isOutEdgeNode(u) && this.isOutEdgeNode(l) || this.isOutEdgeNode(u) && !this.isOutEdgeNode(l)) && (i.down = h,
                    h.up = i)
                }
                ,
                n.isEnableValue = function(e) {
                    if (1 != e)
                        return !0
                }
                ,
                n.isDisableValue = function(e) {
                    if (1 == e)
                        return !0
                }
                ,
                n.isOutEdgeNode = function(e) {
                    return !(null != e && !this.isDisableValue(e.value))
                }
                ,
                t(e, null, [{
                    key: "instance",
                    get: function() {
                        return null == this._instance && (this._instance = new e),
                        this._instance
                    }
                }]),
                e
            }())._instance = void 0;
            var a = e("ObstacleLine", function() {
                function e() {
                    this.startX = 0,
                    this.startY = 0,
                    this.endX = 0,
                    this.endY = 0
                }
                var t = e.prototype;
                return t.moveTo = function(e, t) {
                    this.startX = e,
                    this.startY = t
                }
                ,
                t.lineTo = function(e, t) {
                    this.endX = e,
                    this.endY = t
                }
                ,
                e
            }())
              , d = function(e, t) {
                void 0 === e && (e = 0),
                void 0 === t && (t = 0),
                this.x = 0,
                this.y = 0,
                this.left = null,
                this.up = null,
                this.right = null,
                this.down = null,
                this.connectLeft = !1,
                this.connectUp = !1,
                this.connectRight = !1,
                this.connectDown = !1,
                this.x = e,
                this.y = t
            };
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/OtherManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./TransferDoor.ts", "./RoadSign.ts", "./SpawnPoint.ts"], (function(e) {
    "use strict";
    var n, t, r, o, a, i, s, u, f, c, l, p, g;
    return {
        setters: [function(e) {
            n = e.applyDecoratedDescriptor,
            t = e.inheritsLoose,
            r = e.initializerDefineProperty,
            o = e.assertThisInitialized
        }
        , function(e) {
            a = e.cclegacy,
            i = e._decorator,
            s = e.Prefab,
            u = e.instantiate,
            f = e.Vec3,
            c = e.Component
        }
        , function(e) {
            l = e.default
        }
        , function(e) {
            p = e.default
        }
        , function(e) {
            g = e.default
        }
        ],
        execute: function() {
            var b, d, P, h, v, w, y, D, m;
            a._RF.push({}, "4392frP6NxKxKaBQkz8zd5H", "OtherManager", void 0);
            var S = i.ccclass
              , z = i.property;
            e("default", (b = S("OtherManager"),
            d = z(s),
            P = z(s),
            h = z(s),
            b((y = n((w = function(e) {
                function n() {
                    for (var n, t = arguments.length, a = new Array(t), i = 0; i < t; i++)
                        a[i] = arguments[i];
                    return n = e.call.apply(e, [this].concat(a)) || this,
                    r(n, "roadSignPrefab", y, o(n)),
                    r(n, "spawnPointPrefab", D, o(n)),
                    r(n, "transferDoorPrefabs", m, o(n)),
                    n
                }
                t(n, e);
                var a = n.prototype;
                return a.start = function() {}
                ,
                a.getRoadSign = function() {
                    var e = u(this.roadSignPrefab).getComponent(p);
                    return e.node.active = !0,
                    e.node.position = new f(0,0,0),
                    e
                }
                ,
                a.getSpawnPoint = function() {
                    var e = u(this.spawnPointPrefab).getComponent(g);
                    return e.node.active = !0,
                    e.node.position = new f(0,0,0),
                    e
                }
                ,
                a.getTransferDoor = function(e) {
                    var n = 0;
                    e < this.transferDoorPrefabs.length && (n = e);
                    var t = u(this.transferDoorPrefabs[n]).getComponent(l);
                    return t.node.active = !0,
                    t.node.position = new f(0,0,0),
                    t
                }
                ,
                n
            }(c)).prototype, "roadSignPrefab", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            D = n(w.prototype, "spawnPointPrefab", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            m = n(w.prototype, "transferDoorPrefabs", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return []
                }
            }),
            v = w)) || v));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/PathFindingAgent.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MapType.ts", "./MapRoadUtils.ts", "./AstarHoneycombRoadSeeker.ts", "./AStarRoadSeeker.ts"], (function(e) {
    "use strict";
    var t, a, i, o, n, s;
    return {
        setters: [function(e) {
            t = e.createClass
        }
        , function(e) {
            a = e.cclegacy
        }
        , function(e) {
            i = e.MapType
        }
        , function(e) {
            o = e.default
        }
        , function(e) {
            n = e.default
        }
        , function(e) {
            s = e.default
        }
        ],
        execute: function() {
            a._RF.push({}, "2713cxFI+NMQJ7BOBfOraHy", "PathFindingAgent", void 0),
            e("default", function() {
                function e() {
                    this._roadDic = {},
                    this._roadSeeker = void 0,
                    this._mapData = null,
                    this._mapType = i.angle45,
                    this._round = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
                    this._round1 = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, -1]],
                    this._round2 = [[0, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]
                }
                var a = e.prototype;
                return a.init = function(e) {
                    this._mapData = e,
                    this._mapType = e.type,
                    o.instance.updateMapInfo(this._mapData.mapWidth, this._mapData.mapHeight, this._mapData.nodeWidth, this._mapData.nodeHeight, this._mapData.type);
                    for (var t = this._mapData.roadDataArr.length, a = this._mapData.roadDataArr[0].length, r = 0, d = 0, h = 0, u = 0, c = 0, p = 0; p < t; p++)
                        for (var _ = 0; _ < a; _++) {
                            r = this._mapData.roadDataArr[p][_],
                            d = _,
                            h = p;
                            var y = o.instance.getNodeByDerect(d, h);
                            y.value = r,
                            this._mapType == i.honeycomb2 && (u = y.cx,
                            c = y.cy,
                            y.cx = c,
                            y.cy = u),
                            this._roadDic[y.cx + "_" + y.cy] = y
                        }
                    this._mapType == i.honeycomb || this._mapType == i.honeycomb2 ? this._roadSeeker = new n(this._roadDic) : this._roadSeeker = new s(this._roadDic)
                }
                ,
                a.seekPath = function(e, t, a, i, o) {
                    void 0 === o && (o = 0);
                    var n = this.getRoadNodeByPixel(e, t)
                      , s = this.getRoadNodeByPixel(a, i)
                      , r = this.getSeakRadius(o);
                    return this._roadSeeker.seekPath(n, s, r)
                }
                ,
                a.seekPath2 = function(e, t, a, i, o) {
                    void 0 === o && (o = 0);
                    var n = this.getRoadNodeByPixel(e, t)
                      , s = this.getRoadNodeByPixel(a, i)
                      , r = this.getSeakRadius(o);
                    return this._roadSeeker.seekPath2(n, s, r)
                }
                ,
                a.testSeekRoad = function(e, t, a, i, o, n, s, r) {
                    var d = this.getRoadNodeByPixel(e, t)
                      , h = this.getRoadNodeByPixel(a, i)
                      , u = this.getSeakRadius(o);
                    this._roadSeeker.testSeekPathStep(d, h, u, n, s, r)
                }
                ,
                a.getSeakRadius = function(e) {
                    void 0 === e && (e = 0);
                    var t = Math.min(o.instance.halfNodeWidth, o.instance.halfNodeHeight)
                      , a = Math.ceil((e - t) / (2 * t));
                    return a > 0 ? a : 0
                }
                ,
                a.isArriveBetweenTwoNodes = function(e, t) {
                    return null != e && null != t && this._roadSeeker.isArriveBetweenTwoNodes(e, t)
                }
                ,
                a.isArriveBetweenTwoPos = function(e, t, a, i) {
                    var o = this.getRoadNodeByPixel(e, t)
                      , n = this.getRoadNodeByPixel(a, i);
                    return this._roadSeeker.isArriveBetweenTwoNodes(o, n)
                }
                ,
                a.getRoadNodeByPixel = function(e, t) {
                    var a = o.instance.getWorldPointByPixel(e, t);
                    return this._mapType == i.honeycomb2 ? this.getRoadNode(a.y, a.x) : this.getRoadNode(a.x, a.y)
                }
                ,
                a.getRoadNode = function(e, t) {
                    return this._roadSeeker.getRoadNode(e, t)
                }
                ,
                a.getRoundRoadNodes = function(e, t) {
                    if (void 0 === t && (t = !1),
                    null == e)
                        return [];
                    var a, o = [];
                    t && o.push(e),
                    a = this.mapType == i.honeycomb || this.mapType == i.honeycomb2 ? e.cx % 2 == 0 ? this._round1 : this._round2 : this._round;
                    for (var n = 0; n < a.length; n++) {
                        var s = e.cx + a[n][0]
                          , r = e.cy + a[n][1];
                        o.push(this.getRoadNode(s, r))
                    }
                    return o
                }
                ,
                a.setMaxSeekStep = function(e) {
                    this._roadSeeker.setMaxSeekStep(e)
                }
                ,
                a.setPathOptimize = function(e) {
                    this._roadSeeker.setPathOptimize(e)
                }
                ,
                a.setPathQuadSeek = function(e) {
                    this._roadSeeker.setPathQuadSeek(e)
                }
                ,
                a.setRoadNodePassCondition = function(e) {
                    this._roadSeeker.setRoadNodePassCondition(e)
                }
                ,
                t(e, [{
                    key: "mapData",
                    get: function() {
                        return this._mapData
                    }
                }, {
                    key: "mapType",
                    get: function() {
                        return this._mapType
                    }
                }, {
                    key: "roadSeeker",
                    get: function() {
                        return this._roadSeeker
                    }
                }], [{
                    key: "instance",
                    get: function() {
                        return null == this._instance && (this._instance = new e),
                        this._instance
                    }
                }]),
                e
            }())._instance = void 0,
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/PathLog.ts", ["cc"], (function(t) {
    "use strict";
    var n;
    return {
        setters: [function(t) {
            n = t.cclegacy
        }
        ],
        execute: function() {
            n._RF.push({}, "90201mzAshCGZOJXgifi2Sv", "PathLog", void 0),
            t("default", function() {
                function t() {}
                return t.setLogEnable = function(t) {
                    this.log = t ? console.log : function() {}
                }
                ,
                t
            }()).log = console.log,
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/PathOptimize.ts", ["cc"], (function(t) {
    "use strict";
    var e;
    return {
        setters: [function(t) {
            e = t.cclegacy
        }
        ],
        execute: function() {
            var i;
            t("PathOptimize", void 0),
            e._RF.push({}, "a9cd52F3d9EwKcKajKjkZkz", "PathOptimize", void 0),
            function(t) {
                t[t.none = 0] = "none",
                t[t.better = 1] = "better",
                t[t.best = 2] = "best"
            }(i || (i = t("PathOptimize", {}))),
            e._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/PathQuadSeek.ts", ["cc"], (function(e) {
    "use strict";
    var t;
    return {
        setters: [function(e) {
            t = e.cclegacy
        }
        ],
        execute: function() {
            var a;
            e("PathQuadSeek", void 0),
            t._RF.push({}, "9f4b4XouzRKZ43Hs0ARXbeT", "PathQuadSeek", void 0),
            function(e) {
                e[e.path_dire_4 = 0] = "path_dire_4",
                e[e.path_dire_8 = 1] = "path_dire_8"
            }(a || (a = e("PathQuadSeek", {}))),
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Pet.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Actor.ts"], (function(t) {
    "use strict";
    var e, r, n, c;
    return {
        setters: [function(t) {
            e = t.inheritsLoose
        }
        , function(t) {
            r = t.cclegacy,
            n = t._decorator
        }
        , function(t) {
            c = t.default
        }
        ],
        execute: function() {
            var o;
            r._RF.push({}, "2ef83PN8rVDlp7+ymFHLAci", "Pet", void 0);
            var i = n.ccclass;
            n.property,
            t("default", i("Pet")(o = function(t) {
                function r() {
                    return t.apply(this, arguments) || this
                }
                e(r, t);
                var n = r.prototype;
                return n.start = function() {}
                ,
                n.init = function() {}
                ,
                r
            }(c)) || o);
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/PetManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Pet.ts"], (function(e) {
    "use strict";
    var t, r, n, i, a, o, c, u, s, p, l;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            r = e.inheritsLoose,
            n = e.initializerDefineProperty,
            i = e.assertThisInitialized
        }
        , function(e) {
            a = e.cclegacy,
            o = e._decorator,
            c = e.Prefab,
            u = e.instantiate,
            s = e.Vec3,
            p = e.Component
        }
        , function(e) {
            l = e.default
        }
        ],
        execute: function() {
            var f, P, d, g, v;
            a._RF.push({}, "92250RiPGdDOaC8E3uCZT2L", "PetManager", void 0);
            var y = o.ccclass
              , b = o.property;
            e("default", (f = y("PetManager"),
            P = b(c),
            f((v = t((g = function(e) {
                function t() {
                    for (var t, r = arguments.length, a = new Array(r), o = 0; o < r; o++)
                        a[o] = arguments[o];
                    return t = e.call.apply(e, [this].concat(a)) || this,
                    n(t, "petPrefab", v, i(t)),
                    t
                }
                r(t, e);
                var a = t.prototype;
                return a.start = function() {}
                ,
                a.getpet = function(e) {
                    var t = u(this.petPrefab).getComponent(l);
                    return t.node.active = !0,
                    t.node.position = new s(0,0,0),
                    t
                }
                ,
                t
            }(p)).prototype, "petPrefab", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            d = g)) || d));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Player.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MovieClip.ts", "./Unit.ts", "./Actor.ts", "./Body.ts"], (function(e) {
    "use strict";
    var t, i, o, n, r, a, s, l, c, p, d, h, u;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            i = e.inheritsLoose,
            o = e.initializerDefineProperty,
            n = e.assertThisInitialized,
            r = e.createClass
        }
        , function(e) {
            a = e.cclegacy,
            s = e._decorator,
            l = e.Enum,
            c = e.CCInteger
        }
        , function(e) {
            p = e.default
        }
        , function(e) {
            d = e.UnitState
        }
        , function(e) {
            h = e.default
        }
        , function(e) {
            u = e.default
        }
        ],
        execute: function() {
            var y, m, C, f, v, _, b;
            e({
                PlayerControlType: void 0,
                PlayerType: void 0
            }),
            a._RF.push({}, "f6123H0uppA2Zmo5qpWWxKq", "Player", void 0);
            var k, g, I = s.ccclass, w = s.property;
            !function(e) {
                e[e.none = 0] = "none",
                e[e.my = 1] = "my",
                e[e.other = 1] = "other"
            }(k || (k = e("PlayerType", {}))),
            function(e) {
                e[e.none = 0] = "none",
                e[e.user = 1] = "user",
                e[e.ai = 2] = "ai",
                e[e.net = 3] = "net"
            }(g || (g = e("PlayerControlType", {})));
            e("default", (y = I("Player"),
            m = w({
                type: l(g),
                tooltip: "玩家控制类型:\nnone  无控制 \nuser 用户操作 \nai ai操作 \nnet 网络玩家操作"
            }),
            C = w(c),
            y((_ = t((v = function(e) {
                function t() {
                    for (var t, i = arguments.length, r = new Array(i), a = 0; a < i; a++)
                        r[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(r)) || this,
                    o(t, "controlType", _, n(t)),
                    o(t, "roleId", b, n(t)),
                    t.body = null,
                    t.playerType = k.none,
                    t._state = d.none,
                    t
                }
                i(t, e);
                var a = t.prototype;
                return a.onLoad = function() {
                    this.body = this.getComponentInChildren(u),
                    e.prototype.onLoad.call(this)
                }
                ,
                a.start = function() {
                    e.prototype.start.call(this),
                    this.state = d.idle
                }
                ,
                a.update = function(t) {
                    e.prototype.update.call(this, t)
                }
                ,
                r(t, [{
                    key: "direction",
                    set: function(e) {
                        switch (this._direction = e,
                        this._direction) {
                        case 0:
                            this.movieClip.rowIndex = 0;
                            break;
                        case 1:
                            this.movieClip.rowIndex = 4;
                            break;
                        case 2:
                            this.movieClip.rowIndex = 1;
                            break;
                        case 3:
                            this.movieClip.rowIndex = 6;
                            break;
                        case 4:
                            this.movieClip.rowIndex = 3;
                            break;
                        case 5:
                            this.movieClip.rowIndex = 7;
                            break;
                        case 6:
                            this.movieClip.rowIndex = 2;
                            break;
                        case 7:
                            this.movieClip.rowIndex = 5
                        }
                    }
                }, {
                    key: "state",
                    set: function(e) {
                        if (this._state != e) {
                            switch (this._state = e,
                            this._movieClip && (this._movieClip.node.active = !1),
                            this._state) {
                            case d.idle:
                                this._movieClip = this.node.getChildByName("Body").getChildByName("Skin_Idle").getComponent(p);
                                break;
                            case d.walk:
                                this._movieClip = this.node.getChildByName("Body").getChildByName("Skin_Walk").getComponent(p);
                                break;
                            case d.attack:
                                this._movieClip = this.node.getChildByName("Body").getChildByName("Skin_Idle").getComponent(p)
                            }
                            this.direction = this._direction,
                            this._movieClip.node.active = !0,
                            this._movieClip.playIndex = 0,
                            this._movieClip.playAction()
                        }
                    }
                }]),
                t
            }(h)).prototype, "controlType", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return g.none
                }
            }),
            b = t(v.prototype, "roleId", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            f = v)) || f));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/PlayerManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Player.ts"], (function(e) {
    "use strict";
    var r, t, n, a, i, o, l, c, u, s, p;
    return {
        setters: [function(e) {
            r = e.applyDecoratedDescriptor,
            t = e.inheritsLoose,
            n = e.initializerDefineProperty,
            a = e.assertThisInitialized
        }
        , function(e) {
            i = e.cclegacy,
            o = e._decorator,
            l = e.Prefab,
            c = e.instantiate,
            u = e.Vec3,
            s = e.Component
        }
        , function(e) {
            p = e.default
        }
        ],
        execute: function() {
            var f, y, d, P, b, g;
            i._RF.push({}, "0afddzPh/5MHKC8hwiZAfAa", "PlayerManager", void 0);
            var h = o.ccclass
              , v = o.property;
            e("default", (f = h("PlayerManager"),
            y = v(l),
            f((b = r((P = function(e) {
                function r() {
                    for (var r, t = arguments.length, i = new Array(t), o = 0; o < t; o++)
                        i[o] = arguments[o];
                    return r = e.call.apply(e, [this].concat(i)) || this,
                    n(r, "playerPrefabArr", b, a(r)),
                    n(r, "selectRoleId", g, a(r)),
                    r
                }
                t(r, e);
                var i = r.prototype;
                return i.start = function() {}
                ,
                i.getPlayer = function(e) {
                    var r = c(this.playerPrefabArr[e - 1]).getComponent(p);
                    return r.node.position = new u(0,0,0),
                    r.roleId = e,
                    r.node.active = !0,
                    r
                }
                ,
                r
            }(s)).prototype, "playerPrefabArr", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return []
                }
            }),
            g = r(P.prototype, "selectRoleId", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 1
                }
            }),
            d = P)) || d));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Point.ts", ["cc"], (function(t) {
    "use strict";
    var i;
    return {
        setters: [function(t) {
            i = t.cclegacy
        }
        ],
        execute: function() {
            i._RF.push({}, "520e4cLiBBPLYREzSRGlltJ", "Point", void 0);
            t("default", (function(t, i) {
                void 0 === t && (t = 0),
                void 0 === i && (i = 0),
                this.x = 0,
                this.y = 0,
                this.x = t,
                this.y = i
            }
            ));
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/RoadNode.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var e, n;
    return {
        setters: [function(t) {
            e = t.createClass
        }
        , function(t) {
            n = t.cclegacy
        }
        ],
        execute: function() {
            n._RF.push({}, "a5569a7KTRDiKGvGCqxNAHv", "RoadNode", void 0);
            t("default", function() {
                function t() {
                    this._px = void 0,
                    this._py = void 0,
                    this._cx = void 0,
                    this._cy = void 0,
                    this._dx = void 0,
                    this._dy = void 0,
                    this._value = 0,
                    this._f = 0,
                    this._g = 0,
                    this._h = 0,
                    this._parent = null,
                    this._treeParent = null,
                    this._left = null,
                    this._right = null,
                    this._openTag = 0,
                    this._closeTag = 0
                }
                var n = t.prototype;
                return n.resetTree = function() {
                    this._treeParent = null,
                    this._left = null,
                    this._right = null
                }
                ,
                n.toString = function() {
                    return "路点像素坐标：（" + this._px + "," + this._py + "),  路点世界坐标：（" + this._cx + "," + this._cy + "),  路点平面直角坐标：（" + this._dx + "," + this._dy + ")"
                }
                ,
                e(t, [{
                    key: "px",
                    get: function() {
                        return this._px
                    },
                    set: function(t) {
                        this._px = t
                    }
                }, {
                    key: "py",
                    get: function() {
                        return this._py
                    },
                    set: function(t) {
                        this._py = t
                    }
                }, {
                    key: "cx",
                    get: function() {
                        return this._cx
                    },
                    set: function(t) {
                        this._cx = t
                    }
                }, {
                    key: "cy",
                    get: function() {
                        return this._cy
                    },
                    set: function(t) {
                        this._cy = t
                    }
                }, {
                    key: "dx",
                    get: function() {
                        return this._dx
                    },
                    set: function(t) {
                        this._dx = t
                    }
                }, {
                    key: "dy",
                    get: function() {
                        return this._dy
                    },
                    set: function(t) {
                        this._dy = t
                    }
                }, {
                    key: "value",
                    get: function() {
                        return this._value
                    },
                    set: function(t) {
                        this._value = t
                    }
                }, {
                    key: "f",
                    get: function() {
                        return this._f
                    },
                    set: function(t) {
                        this._f = t
                    }
                }, {
                    key: "g",
                    get: function() {
                        return this._g
                    },
                    set: function(t) {
                        this._g = t
                    }
                }, {
                    key: "h",
                    get: function() {
                        return this._h
                    },
                    set: function(t) {
                        this._h = t
                    }
                }, {
                    key: "parent",
                    get: function() {
                        return this._parent
                    },
                    set: function(t) {
                        this._parent = t
                    }
                }, {
                    key: "treeParent",
                    get: function() {
                        return this._treeParent
                    },
                    set: function(t) {
                        this._treeParent = t
                    }
                }, {
                    key: "left",
                    get: function() {
                        return this._left
                    },
                    set: function(t) {
                        this._left = t
                    }
                }, {
                    key: "right",
                    get: function() {
                        return this._right
                    },
                    set: function(t) {
                        this._right = t
                    }
                }, {
                    key: "openTag",
                    get: function() {
                        return this._openTag
                    },
                    set: function(t) {
                        this._openTag = t
                    }
                }, {
                    key: "closeTag",
                    get: function() {
                        return this._closeTag
                    },
                    set: function(t) {
                        this._closeTag = t
                    }
                }]),
                t
            }());
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/RoadSign.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MovieClip.ts"], (function(t) {
    "use strict";
    var e, i, n, r, o, c, a, s;
    return {
        setters: [function(t) {
            e = t.applyDecoratedDescriptor,
            i = t.inheritsLoose,
            n = t.initializerDefineProperty,
            r = t.assertThisInitialized
        }
        , function(t) {
            o = t.cclegacy,
            c = t._decorator,
            a = t.Component
        }
        , function(t) {
            s = t.default
        }
        ],
        execute: function() {
            var l, u, p, f, h;
            o._RF.push({}, "99ab1Uqzh9PPJeZ3hD/Yq+h", "RoadSign", void 0);
            var d = c.ccclass
              , g = c.property;
            t("default", (l = d("RoadSign"),
            u = g(s),
            l((h = e((f = function(t) {
                function e() {
                    for (var e, i = arguments.length, o = new Array(i), c = 0; c < i; c++)
                        o[c] = arguments[c];
                    return e = t.call.apply(t, [this].concat(o)) || this,
                    n(e, "signMc", h, r(e)),
                    e
                }
                i(e, t);
                var o = e.prototype;
                return o.start = function() {
                    var t = this;
                    this.signMc.node.on("complete", (function() {
                        t.node.active = !1
                    }
                    ), this)
                }
                ,
                o.play = function() {
                    this.node.active = !0,
                    this.signMc.reset(),
                    this.signMc.play()
                }
                ,
                e
            }(a)).prototype, "signMc", [u], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            p = f)) || p));
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/RVOSystem.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Simulator.ts"], (function(t) {
    "use strict";
    var n, e, i, s, o, r, c, a;
    return {
        setters: [function(t) {
            n = t.inheritsLoose,
            e = t.createClass
        }
        , function(t) {
            i = t.cclegacy,
            s = t._decorator,
            o = t.Node,
            r = t.game,
            c = t.Component
        }
        , function(t) {
            a = t.Simulator
        }
        ],
        execute: function() {
            var u, l;
            i._RF.push({}, "980b5DltKBEPJkcHAmFWzn3", "RVOSystem", void 0);
            var f = s.ccclass;
            s.property,
            t("default", f("RVOSystem")(((l = function(t) {
                function i() {
                    for (var n, e = arguments.length, i = new Array(e), s = 0; s < e; s++)
                        i[s] = arguments[s];
                    return (n = t.call.apply(t, [this].concat(i)) || this).rvoTag = 0,
                    n.runing = !1,
                    n
                }
                n(i, t);
                var s = i.prototype;
                return s.init = function() {}
                ,
                s.startup = function() {
                    console.log("RVOSystem 启动RVO系统"),
                    this.runing = !0
                }
                ,
                s.stop = function() {
                    console.log("RVOSystem 停止RVO系统"),
                    this.runing = !1
                }
                ,
                s.refresh = function() {
                    this.rvoTag++,
                    a.instance.clear()
                }
                ,
                s.start = function() {}
                ,
                s.update = function(t) {
                    this.runing && a.instance.run(t)
                }
                ,
                e(i, null, [{
                    key: "instance",
                    get: function() {
                        if (null == this._instance) {
                            var t = new o("RVOSystem");
                            r.addPersistRootNode(t),
                            this._instance = t.addComponent(i),
                            this._instance.init()
                        }
                        return this._instance
                    }
                }]),
                i
            }(c))._instance = void 0,
            u = l)) || u);
            i._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/SceneManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./MapLoadModel.ts"], (function(a) {
    "use strict";
    var e, n, t, o, s, i, c, l, r, d, u;
    return {
        setters: [function(a) {
            e = a.inheritsLoose,
            n = a.createClass
        }
        , function(a) {
            t = a.cclegacy,
            o = a._decorator,
            s = a.resources,
            i = a.JsonAsset,
            c = a.Texture2D,
            l = a.Node,
            r = a.game,
            d = a.Component
        }
        , function(a) {
            u = a.MapLoadModel
        }
        ],
        execute: function() {
            var p, M;
            a("SceneLoadStatus", void 0),
            t._RF.push({}, "7796aT7xMBLFJJC7npZJ4FM", "SceneManager", void 0);
            var h, D = o.ccclass, m = (o.property,
            a("SceneEventType", (function() {}
            )));
            m.LOAD_COMPLETE = "LOAD_COMPLETE",
            m.Map_INIT_COMPLETE = "MAP_INIT_COMPLETE",
            function(a) {
                a[a.none = 0] = "none",
                a[a.loading = 1] = "loading",
                a[a.loaded = 2] = "loaded"
            }(h || (h = a("SceneLoadStatus", {})));
            var f = a("SceneData", (function() {
                this.currentMapId = "",
                this.enterSpawnId = 0,
                this.mapLoadModel = u.single,
                this.mapData = null,
                this.bgTex = null
            }
            ));
            a("default", D("SceneManager")(((M = function(a) {
                function t() {
                    for (var e, n = arguments.length, t = new Array(n), o = 0; o < n; o++)
                        t[o] = arguments[o];
                    return (e = a.call.apply(a, [this].concat(t)) || this).loadStatus = h.none,
                    e.sceneData = new f,
                    e
                }
                e(t, a);
                var o = t.prototype;
                return o.start = function() {}
                ,
                o.init = function() {}
                ,
                o.on = function(a, e, n, t) {
                    this.node.on(a, e, n, t)
                }
                ,
                o.emit = function(a, e, n, t, o, s) {
                    this.node.emit(a, e, n, t, o, s)
                }
                ,
                o.loadMap = function(a, e, n) {
                    void 0 === n && (n = u.single),
                    this.loadStatus != h.loading && (this.loadStatus = h.loading,
                    this.sceneData.currentMapId = a,
                    this.sceneData.enterSpawnId = e,
                    this.sceneData.mapLoadModel = n,
                    n == u.single ? this.loadSingleMap() : this.loadSlicesMap())
                }
                ,
                o.reloadMap = function() {
                    this.loadStatus = h.none,
                    this.loadMap(this.sceneData.currentMapId, this.sceneData.enterSpawnId, this.sceneData.mapLoadModel)
                }
                ,
                o.loadSingleMap = function() {
                    var a = this
                      , e = "map/data/" + ("" + this.sceneData.currentMapId);
                    s.load(e, i, (function(n, t) {
                        if (null == n) {
                            a.sceneData.mapData = t.json;
                            var o = "map/bg/" + a.sceneData.mapData.bgName + "/texture";
                            s.load(o, c, (function(e, n) {
                                null == e ? (a.loadStatus = h.loaded,
                                a.sceneData.bgTex = n,
                                a.emit(m.LOAD_COMPLETE, a.sceneData),
                                a.emit(m.Map_INIT_COMPLETE, a.sceneData)) : console.error("地图背景加载失败 mapBgPath = " + o, e)
                            }
                            ))
                        } else
                            console.error("地图数据加载失败 mapFilePath = " + e, n)
                    }
                    ))
                }
                ,
                o.loadSlicesMap = function() {
                    var a = this
                      , e = "map/data/" + ("" + this.sceneData.currentMapId);
                    s.load(e, i, (function(n, t) {
                        if (null == n) {
                            a.sceneData.mapData = t.json;
                            var o = "map/bg/" + a.sceneData.mapData.bgName + "/miniMap/texture";
                            s.load(o, c, (function(e, n) {
                                null == e ? (a.loadStatus = h.loaded,
                                a.sceneData.bgTex = n,
                                a.emit(m.LOAD_COMPLETE, a.sceneData),
                                a.emit(m.Map_INIT_COMPLETE, a.sceneData)) : console.error("小地图背景加载失败 miniMapBgPath = " + o, e)
                            }
                            ))
                        } else
                            console.error("地图数据加载失败 mapFilePath = " + e, n)
                    }
                    ))
                }
                ,
                n(t, null, [{
                    key: "instance",
                    get: function() {
                        if (null == this._instance) {
                            var a = new l("SceneManager");
                            r.addPersistRootNode(a),
                            this._instance = a.addComponent(t),
                            this._instance.init()
                        }
                        return this._instance
                    }
                }]),
                t
            }(d))._instance = null,
            p = M)) || p);
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Simulator.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Common.ts", "./Agent.ts", "./kdtree.ts"], (function(t) {
    "use strict";
    var e, n, i, s, a, g;
    return {
        setters: [function(t) {
            e = t.createClass
        }
        , function(t) {
            n = t.cclegacy
        }
        , function(t) {
            i = t.RVOMath,
            s = t.Obstacle
        }
        , function(t) {
            a = t.Agent
        }
        , function(t) {
            g = t.KdTree
        }
        ],
        execute: function() {
            n._RF.push({}, "c9717VhLl5EHrHeGzym7lQ/", "Simulator", void 0),
            t("Simulator", function() {
                function t() {
                    this.agentId = 0,
                    this.agentIdLst = [],
                    this.aid2agent = Object.create(null),
                    this.hasAgentChange = !1,
                    this.obstacles = [],
                    this.kdTree = new g,
                    this.defaultAgent = void 0,
                    this.time = 0
                }
                var n = t.prototype;
                return n.getAgent = function(t) {
                    return this.aid2agent[this.agentIdLst[t]]
                }
                ,
                n.getAgentByAid = function(t) {
                    return this.aid2agent[t]
                }
                ,
                n.getGlobalTime = function() {
                    return this.time
                }
                ,
                n.getNumAgents = function() {
                    return this.agentIdLst.length
                }
                ,
                n.setAgentPrefVelocity = function(t, e) {
                    this.aid2agent[t].prefVelocity_.copy(e)
                }
                ,
                n.getAgentPosition = function(t) {
                    return this.aid2agent[t].position_
                }
                ,
                n.getAgentPrefVelocity = function(t) {
                    return this.aid2agent[t].prefVelocity_
                }
                ,
                n.getAgentVelocity = function(t) {
                    return this.aid2agent[t].velocity_
                }
                ,
                n.getAgentRadius = function(t) {
                    return this.aid2agent[t].radius_
                }
                ,
                n.getAgentOrcaLines = function(t) {
                    return this.aid2agent[t].orcaLines_
                }
                ,
                n.addAgent = function(t) {
                    if (!this.defaultAgent)
                        throw new Error("no default agent");
                    var e = new a;
                    return e.position_.copy(t),
                    e.maxNeighbors_ = this.defaultAgent.maxNeighbors_,
                    e.maxSpeed_ = this.defaultAgent.maxSpeed_,
                    e.neighborDist = this.defaultAgent.neighborDist,
                    e.radius_ = this.defaultAgent.radius_,
                    e.timeHorizon = this.defaultAgent.timeHorizon,
                    e.timeHorizonObst = this.defaultAgent.timeHorizonObst,
                    e.velocity_.copy(this.defaultAgent.velocity_),
                    e.id = this.agentId++,
                    this.aid2agent[e.id] = e,
                    this.agentIdLst.push(e.id),
                    this.hasAgentChange = !0,
                    e.id
                }
                ,
                n.removeAgent = function(t) {
                    if (this.hasAgent(t)) {
                        delete this.aid2agent[t];
                        var e = this.agentIdLst.indexOf(t);
                        this.agentIdLst[e] = this.agentIdLst[this.agentIdLst.length - 1],
                        this.agentIdLst.length--,
                        this.hasAgentChange = !0
                    }
                }
                ,
                n.hasAgent = function(t) {
                    return !!this.aid2agent[t]
                }
                ,
                n.setAgentMass = function(t, e) {
                    this.aid2agent[t].mass = e
                }
                ,
                n.getAgentMass = function(t) {
                    return this.aid2agent[t].mass
                }
                ,
                n.setAgentRadius = function(t, e) {
                    this.aid2agent[t].radius_ = e
                }
                ,
                n.setAgentDefaults = function(t, e, n, i, s, g, h) {
                    this.defaultAgent || (this.defaultAgent = new a),
                    this.defaultAgent.maxNeighbors_ = e,
                    this.defaultAgent.maxSpeed_ = g,
                    this.defaultAgent.neighborDist = t,
                    this.defaultAgent.radius_ = s,
                    this.defaultAgent.timeHorizon = n,
                    this.defaultAgent.timeHorizonObst = i,
                    this.defaultAgent.velocity_ = h
                }
                ,
                n.run = function(t) {
                    this.kdTree.buildAgentTree(this.getNumAgents());
                    for (var e = this.agentIdLst.length, n = 0; n < e; n++)
                        this.aid2agent[this.agentIdLst[n]].computeNeighbors(this),
                        this.aid2agent[this.agentIdLst[n]].computeNewVelocity(t);
                    for (var i = 0; i < e; i++)
                        this.aid2agent[this.agentIdLst[i]].update(t);
                    this.time += t
                }
                ,
                n.addObstacle = function(t) {
                    if (t.length < 2)
                        return -1;
                    for (var e = this.obstacles.length, n = 0; n < t.length; ++n) {
                        var a = new s;
                        a.point = t[n],
                        0 != n && (a.previous = this.obstacles[this.obstacles.length - 1],
                        a.previous.next = a),
                        n == t.length - 1 && (a.next = this.obstacles[e],
                        a.next.previous = a),
                        a.direction = i.normalize(t[n == t.length - 1 ? 0 : n + 1].minus(t[n])),
                        2 == t.length ? a.convex = !0 : a.convex = i.leftOf(t[0 == n ? t.length - 1 : n - 1], t[n], t[n == t.length - 1 ? 0 : n + 1]) >= 0,
                        a.id = this.obstacles.length,
                        this.obstacles.push(a)
                    }
                    return e
                }
                ,
                n.processObstacles = function() {
                    this.kdTree.buildObstacleTree()
                }
                ,
                n.queryVisibility = function(t, e, n) {
                    return this.kdTree.queryVisibility(t, e, n)
                }
                ,
                n.getObstacles = function() {
                    return this.obstacles
                }
                ,
                n.clear = function() {
                    this.agentIdLst.length = 0,
                    this.agentId = 0,
                    this.aid2agent = Object.create(null),
                    this.defaultAgent = null,
                    this.kdTree = new g,
                    this.obstacles.length = 0
                }
                ,
                e(t, null, [{
                    key: "instance",
                    get: function() {
                        return t._inst || (t._inst = new t),
                        t._inst
                    }
                }]),
                t
            }())._inst = void 0,
            n._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/SoundManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(n) {
    "use strict";
    var i, t, e, o, r, u, l, a, s, c, p, d, h, g, b;
    return {
        setters: [function(n) {
            i = n.applyDecoratedDescriptor,
            t = n.initializerDefineProperty,
            e = n.inheritsLoose,
            o = n.assertThisInitialized,
            r = n.createClass
        }
        , function(n) {
            u = n.cclegacy,
            l = n._decorator,
            a = n.CCString,
            s = n.Enum,
            c = n.AudioClip,
            p = n.AudioSource,
            d = n.game,
            h = n.resources,
            g = n.log,
            b = n.Component
        }
        ],
        execute: function() {
            var S, f, y, m, C, v, B, A, D, z, w, G, O, _, N, M, P, k, L, R, x, F, T, j, q, E, H, I, Q, U;
            n({
                BGSound: void 0,
                OtherSound: void 0
            }),
            u._RF.push({}, "6dcacfNQmNPAYlxRNlqToAU", "SoundManager", void 0);
            var Y, J = l.ccclass, K = l.property;
            !function(n) {
                n[n.none = 0] = "none",
                n[n.bgm1 = 1] = "bgm1",
                n[n.bgm2 = 2] = "bgm2",
                n[n.bgm3 = 3] = "bgm3",
                n[n.bgm4 = 4] = "bgm4",
                n[n.bgm5 = 5] = "bgm5"
            }(Y || (Y = n("BGSound", {})));
            var V, W = n("BGSoundClip", (S = J("BGSoundClip"),
            f = K(a),
            y = K(a),
            m = K({
                type: s(Y)
            }),
            C = K(c),
            S((A = i((B = function() {
                t(this, "name", A, this),
                t(this, "srcName", D, this),
                t(this, "type", z, this),
                t(this, "clip", w, this)
            }
            ).prototype, "name", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ""
                }
            }),
            D = i(B.prototype, "srcName", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ""
                }
            }),
            z = i(B.prototype, "type", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return Y.none
                }
            }),
            w = i(B.prototype, "clip", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            v = B)) || v));
            !function(n) {
                n[n.none = 0] = "none",
                n[n.click = 1] = "click",
                n[n.bonus = 2] = "bonus"
            }(V || (V = n("OtherSound", {})));
            var X = n("OtherSoundClip", (G = J("OtherSoundClip"),
            O = K(a),
            _ = K({
                type: s(V)
            }),
            N = K(c),
            G((k = i((P = function() {
                t(this, "name", k, this),
                t(this, "type", L, this),
                t(this, "clip", R, this)
            }
            ).prototype, "name", [O], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ""
                }
            }),
            L = i(P.prototype, "type", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return V.none
                }
            }),
            R = i(P.prototype, "clip", [N], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            M = P)) || M));
            n("SoundManager", (x = J("SoundManager"),
            F = K(p),
            T = K(W),
            j = K(X),
            x(((U = function(n) {
                function i() {
                    for (var i, e = arguments.length, r = new Array(e), u = 0; u < e; u++)
                        r[u] = arguments[u];
                    return i = n.call.apply(n, [this].concat(r)) || this,
                    t(i, "bgAS", H, o(i)),
                    t(i, "bgSoundClips", I, o(i)),
                    i.bgSoundDic = {},
                    t(i, "otherSoundClips", Q, o(i)),
                    i.otherSoundDic = {},
                    i.lastBgSound = Y.none,
                    i
                }
                e(i, n);
                var u = i.prototype;
                return u.onLoad = function() {
                    if (i._instance)
                        this.node.destroy();
                    else {
                        i._instance = this,
                        d.addPersistRootNode(this.node),
                        this.node.parent = null;
                        for (var n = 0; n < this.bgSoundClips.length; n++)
                            this.bgSoundDic[this.bgSoundClips[n].type] = this.bgSoundClips[n];
                        for (n = 0; n < this.otherSoundClips.length; n++)
                            this.otherSoundDic[this.otherSoundClips[n].type] = this.otherSoundClips[n]
                    }
                }
                ,
                u.start = function() {}
                ,
                u.playBGSound = function(n, i) {
                    var t = this;
                    void 0 === i && (i = !0),
                    this.lastBgSound == Y.none && (this.lastBgSound = n),
                    this.getBGSoundClip(n, (function(n) {
                        t.bgAS.stop(),
                        t.bgAS.clip = n,
                        t.bgAS.loop = i,
                        t.bgAS.pause(),
                        t.bgAS.play()
                    }
                    ))
                }
                ,
                u.stopBGSound = function() {
                    this.bgAS.stop()
                }
                ,
                u.playLastBGSound = function() {
                    this.lastBgSound != Y.none && this.playBGSound(this.lastBgSound)
                }
                ,
                u.playOtherSound = function(n, i) {
                    void 0 === i && (i = 1);
                    var t = this.getOtherSoundClip(n);
                    t ? this.bgAS.playOneShot(t, i) : console.log("找不到资源id为 " + n + " PlayOtherSound声音配置")
                }
                ,
                u.getBGSoundClip = function(n, i) {
                    var t = this;
                    if (null != this.bgSoundDic[n])
                        if (null != this.bgSoundDic[n].clip)
                            i(this.bgSoundDic[n].clip);
                        else {
                            var e = "sound/bgm/" + this.bgSoundDic[n].srcName;
                            h.load(e, c, (function(o, r) {
                                null == o ? (t.bgSoundDic[n].clip = r,
                                i && i(r)) : console.error(Y[n], "背景音乐加载失败 path = " + e, o)
                            }
                            ))
                        }
                    else
                        console.log("没配置背景音乐数据 type = ", Y[n])
                }
                ,
                u.getOtherSoundClip = function(n) {
                    return this.otherSoundDic[n] ? this.otherSoundDic[n].clip : (g("不存在该种声音源 type = ", V[n]),
                    null)
                }
                ,
                r(i, null, [{
                    key: "instance",
                    get: function() {
                        return this._instance,
                        i._instance
                    }
                }]),
                i
            }(b))._instance = void 0,
            H = i((E = U).prototype, "bgAS", [F], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            I = i(E.prototype, "bgSoundClips", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return []
                }
            }),
            Q = i(E.prototype, "otherSoundClips", [j], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return []
                }
            }),
            q = E)) || q));
            u._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/SpawnPoint.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var n, e, i, r, a, o, p, u, c;
    return {
        setters: [function(t) {
            n = t.applyDecoratedDescriptor,
            e = t.inheritsLoose,
            i = t.initializerDefineProperty,
            r = t.assertThisInitialized
        }
        , function(t) {
            a = t.cclegacy,
            o = t._decorator,
            p = t.CCInteger,
            u = t.Vec3,
            c = t.Component
        }
        ],
        execute: function() {
            var s, l, d, f, w, h, y;
            a._RF.push({}, "44005HVhJdDmrOpOby1TSdB", "SpawnPoint", void 0);
            var S = o.ccclass
              , b = o.property;
            t("default", (s = S("SpawnPoint"),
            l = b(p),
            d = b(p),
            s((h = n((w = function(t) {
                function n() {
                    for (var n, e = arguments.length, a = new Array(e), o = 0; o < e; o++)
                        a[o] = arguments[o];
                    return n = t.call.apply(t, [this].concat(a)) || this,
                    i(n, "spawnId", h, r(n)),
                    i(n, "defaultSpawn", y, r(n)),
                    n.editData = null,
                    n
                }
                e(n, t);
                var a = n.prototype;
                return a.start = function() {}
                ,
                a.init = function() {}
                ,
                a.initEditData = function(t) {
                    this.editData = t,
                    this.node.position = new u(t.x,t.y),
                    this.spawnId = t.spawnId,
                    this.defaultSpawn = t.defaultSpawn
                }
                ,
                n
            }(c)).prototype, "spawnId", [l], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            y = n(w.prototype, "defaultSpawn", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return !1
                }
            }),
            f = w)) || f));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/SystemManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./InputManager.ts"], (function(t) {
    "use strict";
    var n, e, s, a, i, o, r, c, u;
    return {
        setters: [function(t) {
            n = t.inheritsLoose,
            e = t.createClass
        }
        , function(t) {
            s = t.cclegacy,
            a = t._decorator,
            i = t.Node,
            o = t.game,
            r = t.Component
        }
        , function(t) {
            c = t.UInput,
            u = t.UKeyCode
        }
        ],
        execute: function() {
            var p, l;
            s._RF.push({}, "68f6b6MmC1BXaz+HsIjta0Z", "SystemManager", void 0);
            var f = a.ccclass
              , d = (a.property,
            t("default", f("SystemManager")(((l = function(t) {
                function s() {
                    return t.apply(this, arguments) || this
                }
                n(s, t);
                var a = s.prototype;
                return a.init = function() {}
                ,
                a.startup = function() {
                    console.log("SystemManager 启动系统管理")
                }
                ,
                a.onLoad = function() {}
                ,
                a.start = function() {}
                ,
                a.update = function(t) {
                    (CC_EDITOR || CC_PREVIEW) && c.getKeyDown(u.Space)
                }
                ,
                a.RegisterSystems = function() {}
                ,
                e(s, null, [{
                    key: "instance",
                    get: function() {
                        if (null == this._instance) {
                            var t = new i("SystemManager");
                            t.setSiblingIndex(1e3),
                            o.addPersistRootNode(t),
                            this._instance = t.addComponent(s),
                            this._instance.init()
                        }
                        return this._instance
                    }
                }]),
                s
            }(r))._instance = void 0,
            p = l)) || p));
            CC_EDITOR || d.instance.startup(),
            s._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/TextureUtils.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var i, o, r;
    return {
        setters: [function(t) {
            i = t.createClass
        }
        , function(t) {
            o = t.cclegacy,
            r = t.Color
        }
        ],
        execute: function() {
            o._RF.push({}, "f0f4dShZFtC56JLwT3LoDyM", "TextureUtils", void 0);
            t("TextureUtils", function() {
                function t() {
                    this._texture2d = void 0,
                    this.width = 100,
                    this.height = 100,
                    this.buffer = void 0,
                    this.pixelColor = void 0,
                    this.colorCount = void 0,
                    this.pointColor = void 0
                }
                var o = t.prototype;
                return o.init = function(t) {
                    this._texture2d = t,
                    this.width = this._texture2d.width,
                    this.height = this._texture2d.height,
                    this.initPixelColor()
                }
                ,
                o.initPixelColor = function() {
                    this.buffer = new ArrayBuffer(this.width * this.height * 4),
                    this.pixelColor = new Uint8Array(this.buffer),
                    this.pixelColor.fill(0)
                }
                ,
                o.resetPixelColor = function() {
                    this.pixelColor.fill(0)
                }
                ,
                o.setData = function(t) {
                    var i = new Uint8Array(t);
                    i.length == this.width * this.height * 4 ? (this.setPixelColorByRGBA(i),
                    this.setPointColorByRGBA(i)) : console.warn("数据格式不对")
                }
                ,
                o.getData = function() {
                    return this.pixelColor
                }
                ,
                o.copyData = function(t) {
                    void 0 === t && (t = []);
                    for (var i = 0, o = this.pixelColor.length; i < o; ++i)
                        t[i] = this.pixelColor[i];
                    return t
                }
                ,
                o.getBuffer = function() {
                    return this.buffer
                }
                ,
                o.getPointData = function() {
                    return this.pointColor
                }
                ,
                o.getColorCount = function(t, i, o, r) {
                    void 0 === r && (r = 255);
                    var e = this.convertToNumber(t, i, o, r);
                    return this.colorCount[e]
                }
                ,
                o.setPixelColorByRGBA = function(t) {
                    this.pixelColor.set(t)
                }
                ,
                o.setPointColorByRGBA = function(t) {
                    this.colorCount = {};
                    for (var i = 0; i < this.height; ++i)
                        for (var o = i * this.height, r = 0; r < this.width; ++r) {
                            var e = this.convertToNumber(t[o++], t[o++], t[o++], t[o++]);
                            this.pointColor[r][i] = e,
                            this.colorCount[e] ? this.colorCount[e] += 1 : this.colorCount[e] = 1
                        }
                }
                ,
                o.convertToNumber = function(t, i, o, r) {
                    return void 0 === r && (r = 255),
                    (254 & t) << 23 | i << 16 | o << 8 | r
                }
                ,
                o.setPixel = function(t, i, o) {
                    if (!(t < 0 || t >= this.width || i < 0 || i > this.height)) {
                        t = Math.round(t);
                        var r = 4 * ((i = Math.round(i)) * this.width + t);
                        this.pixelColor[r] = o.r,
                        this.pixelColor[r + 1] = o.g,
                        this.pixelColor[r + 2] = o.b,
                        this.pixelColor[r + 3] = o.a
                    }
                }
                ,
                o.setPixels = function(t) {
                    for (var i = t.length, o = this.width * this.height, r = 0; r < o; r++) {
                        var e = r;
                        if (e < i) {
                            var h = t[r];
                            this.pixelColor[e] = h.r,
                            this.pixelColor[e + 1] = h.g,
                            this.pixelColor[e + 2] = h.b,
                            this.pixelColor[e + 3] = h.a
                        } else
                            this.pixelColor[e] = 0,
                            this.pixelColor[e + 1] = 0,
                            this.pixelColor[e + 2] = 0,
                            this.pixelColor[e + 3] = 255
                    }
                }
                ,
                o.setBlockPixels = function(t, i, o, r, e) {
                    for (var h = 0, l = e.length, s = i; s < i + r; s++)
                        for (var n = t; n < t + o; n++) {
                            var u = n
                              , x = s;
                            if (!(u < 0 || u >= this.width || x < 0 || x > this.height)) {
                                var C = 4 * (x * this.width + u)
                                  , f = e[h];
                                h < l ? (this.pixelColor[C] = f.r,
                                this.pixelColor[C + 1] = f.g,
                                this.pixelColor[C + 2] = f.b,
                                this.pixelColor[C + 3] = f.a) : (this.pixelColor[C] = 0,
                                this.pixelColor[C + 1] = 0,
                                this.pixelColor[C + 2] = 0,
                                this.pixelColor[C + 3] = 255),
                                h++
                            }
                        }
                }
                ,
                o.getPixel = function(t, i) {
                    if (t < 0 || t >= this.width || i < 0 || i > this.height)
                        return new r(0,0,0,255);
                    t = Math.round(t);
                    var o = 4 * ((i = Math.round(i)) * this.width + t)
                      , e = new r;
                    return e.r = this.pixelColor[o],
                    e.g = this.pixelColor[o + 1],
                    e.b = this.pixelColor[o + 2],
                    e.a = this.pixelColor[o + 3],
                    e
                }
                ,
                o.getPixels = function() {
                    for (var t = [], i = this.pixelColor.length, o = 0; o < i; o += 4) {
                        var e = o
                          , h = new r;
                        h.r = this.pixelColor[e],
                        h.g = this.pixelColor[e + 1],
                        h.b = this.pixelColor[e + 2],
                        h.a = this.pixelColor[e + 3],
                        t.push(h)
                    }
                    return t
                }
                ,
                o.getBlockPixels = function(t, i, o, e) {
                    for (var h = [], l = i; l < i + e; l++)
                        for (var s = t; s < t + o; s++) {
                            var n = s
                              , u = l
                              , x = new r;
                            if (n < 0 || n >= this.width || u < 0 || u > this.height)
                                x.r = 0,
                                x.g = 0,
                                x.b = 0,
                                x.a = 255;
                            else {
                                var C = 4 * (u * this.width + n);
                                x.r = this.pixelColor[C],
                                x.g = this.pixelColor[C + 1],
                                x.b = this.pixelColor[C + 2],
                                x.a = this.pixelColor[C + 3]
                            }
                            h.push(x)
                        }
                    return h
                }
                ,
                i(t, [{
                    key: "texture2d",
                    get: function() {
                        return this._texture2d
                    },
                    set: function(t) {
                        this._texture2d = t
                    }
                }]),
                t
            }());
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/TopToolBar.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./RVOSystem.ts", "./FogOfWar.ts", "./SoundManager.ts", "./SceneManager.ts", "./GameManager.ts", "./GameMap.ts", "./GameWorld.ts", "./GameController.ts", "./MouseCursorController.ts"], (function(n) {
    "use strict";
    var t, e, o, i, r, a, l, s, c, u, f, p, d, h, g, m, y, M, C, B, T, S, b;
    return {
        setters: [function(n) {
            t = n.applyDecoratedDescriptor,
            e = n.inheritsLoose,
            o = n.initializerDefineProperty,
            i = n.assertThisInitialized
        }
        , function(n) {
            r = n.cclegacy,
            a = n._decorator,
            l = n.Button,
            s = n.Node,
            c = n.director,
            u = n.Label,
            f = n.Component
        }
        , function(n) {
            p = n.ControlMode
        }
        , function(n) {
            d = n.default
        }
        , function(n) {
            h = n.FogOfWar
        }
        , function(n) {
            g = n.SoundManager
        }
        , function(n) {
            m = n.default,
            y = n.SceneEventType
        }
        , function(n) {
            M = n.default
        }
        , function(n) {
            C = n.default
        }
        , function(n) {
            B = n.default
        }
        , function(n) {
            T = n.default
        }
        , function(n) {
            S = n.default,
            b = n.MouseCursorStyle
        }
        ],
        execute: function() {
            var v, I, O, R, w, _, z, L, E, W, H, A, N, U, D, F, G, P, k;
            r._RF.push({}, "81eebhSt91OzaL3r+eBmHhk", "TopToolBar", void 0);
            var j = a.ccclass
              , x = a.property;
            n("default", (v = j("TopToolBar"),
            I = x(l),
            O = x(l),
            R = x(l),
            w = x(l),
            _ = x(l),
            z = x(l),
            L = x(l),
            E = x(s),
            v((A = t((H = function(n) {
                function t() {
                    for (var t, e = arguments.length, r = new Array(e), a = 0; a < e; a++)
                        r[a] = arguments[a];
                    return t = n.call.apply(n, [this].concat(r)) || this,
                    o(t, "controllBtn", A, i(t)),
                    o(t, "swBtn", N, i(t)),
                    o(t, "roadBtn", U, i(t)),
                    o(t, "mouseStyleBtn", D, i(t)),
                    o(t, "miniMapBtn", F, i(t)),
                    o(t, "fogOfWarBtn", G, i(t)),
                    o(t, "loginBtn", P, i(t)),
                    o(t, "miniMapNode", k, i(t)),
                    t
                }
                e(t, n);
                var r = t.prototype;
                return r.start = function() {
                    var n = this;
                    this.refreshControlMode(),
                    this.refreshRoadInfo(),
                    this.controllBtn.node.on(s.EventType.TOUCH_START, (function(t) {
                        T.instance.controlMode == p.touch ? T.instance.controlMode = p.joystick : T.instance.controlMode = p.touch,
                        B.instance.gameMap.myPlayer.controlMode = T.instance.controlMode,
                        n.refreshControlMode()
                    }
                    ), this),
                    this.swBtn.node.on(s.EventType.TOUCH_START, (function(n) {
                        var t = M.instance.playerMgr.selectRoleId + 1;
                        t > 11 && (t = 1),
                        M.instance.playerMgr.selectRoleId = t,
                        B.instance.gameMap.switchPlayer(t)
                    }
                    ), this),
                    this.roadBtn.node.on(s.EventType.TOUCH_START, (function(t) {
                        C.isDrawRoadLayer = !C.isDrawRoadLayer,
                        B.instance.gameMap.roadLayer.active = C.isDrawRoadLayer,
                        n.refreshRoadInfo()
                    }
                    ), this),
                    this.mouseStyleBtn.node.on(s.EventType.TOUCH_START, (function(t) {
                        var e = T.instance.getComponent(S);
                        e.cursorStyle == b.custom ? e.setCursorStyle(b.normal) : e.setCursorStyle(b.custom),
                        n.refreshMouseStyleInfo()
                    }
                    ), this),
                    this.miniMapBtn.node.on(s.EventType.TOUCH_START, (function(t) {
                        n.miniMapNode.active = !n.miniMapNode.active,
                        n.refreshMiniMapInfo()
                    }
                    ), this),
                    this.fogOfWarBtn.node.on(s.EventType.TOUCH_START, (function(t) {
                        null != h.instance && (h.instance.node.active = !h.instance.node.active,
                        n.refreshFogOfWarInfo())
                    }
                    ), this),
                    this.loginBtn.node.on(s.EventType.TOUCH_START, (function(n) {
                        T.instance.getComponent(S).setCursorStyle(b.normal),
                        g.instance.stopBGSound(),
                        c.loadScene("Login")
                    }
                    ), this),
                    m.instance.on(y.Map_INIT_COMPLETE, this.onMapInitComp, this)
                }
                ,
                r.onMapInitComp = function(n) {
                    this.refreshRoadInfo()
                }
                ,
                r.refreshControlMode = function() {
                    null != T.instance && (T.instance.controlMode == p.touch ? this.controllBtn.getComponentInChildren(u).string = "切换摇杆导航" : this.controllBtn.getComponentInChildren(u).string = "切换寻路导航")
                }
                ,
                r.refreshRoadInfo = function() {
                    null != B.instance.gameMap && (this.roadBtn.node.active,
                    d.instance.runing,
                    B.instance.gameMap.roadLayer.active ? this.roadBtn.getComponentInChildren(u).string = "隐藏路点辅助线" : this.roadBtn.getComponentInChildren(u).string = "显示路点辅助线")
                }
                ,
                r.refreshMouseStyleInfo = function() {
                    null != T.instance && (T.instance.getComponent(S).cursorStyle == b.custom ? this.mouseStyleBtn.getComponentInChildren(u).string = "切换普通光标" : this.mouseStyleBtn.getComponentInChildren(u).string = "切换自定义光标")
                }
                ,
                r.refreshMiniMapInfo = function() {
                    null != B.instance.gameMap && (this.miniMapNode.active ? this.miniMapBtn.getComponentInChildren(u).string = "隐藏小地图" : this.miniMapBtn.getComponentInChildren(u).string = "显示小地图")
                }
                ,
                r.refreshFogOfWarInfo = function() {
                    null != h.instance && (h.instance.node.active ? this.fogOfWarBtn.getComponentInChildren(u).string = "关闭战争迷雾" : this.fogOfWarBtn.getComponentInChildren(u).string = "打开战争迷雾")
                }
                ,
                t
            }(f)).prototype, "controllBtn", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            N = t(H.prototype, "swBtn", [O], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            U = t(H.prototype, "roadBtn", [R], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            D = t(H.prototype, "mouseStyleBtn", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            F = t(H.prototype, "miniMapBtn", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            G = t(H.prototype, "fogOfWarBtn", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            P = t(H.prototype, "loginBtn", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            k = t(H.prototype, "miniMapNode", [E], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            W = H)) || W));
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/TouchController.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ControlMode.ts", "./CameraController.ts", "./SceneManager.ts", "./GameWorld.ts", "./GameController.ts"], (function(n) {
    "use strict";
    var o, t, e, a, r, c, i, l, u, s, p, f;
    return {
        setters: [function(n) {
            o = n.inheritsLoose
        }
        , function(n) {
            t = n.cclegacy,
            e = n._decorator,
            a = n.Node,
            r = n.Vec3,
            c = n.Component
        }
        , function(n) {
            i = n.ControlMode
        }
        , function(n) {
            l = n.default
        }
        , function(n) {
            u = n.default,
            s = n.SceneEventType
        }
        , function(n) {
            p = n.default
        }
        , function(n) {
            f = n.default
        }
        ],
        execute: function() {
            var h;
            t._RF.push({}, "3dc9cupI5hGBLjW84Y26nVc", "TouchController", void 0);
            var C = e.ccclass;
            e.property,
            n("default", C("TouchController")(h = function(n) {
                function t() {
                    for (var o, t = arguments.length, e = new Array(t), a = 0; a < t; a++)
                        e[a] = arguments[a];
                    return (o = n.call.apply(n, [this].concat(e)) || this).gameController = null,
                    o
                }
                o(t, n);
                var e = t.prototype;
                return e.onLoad = function() {
                    this.gameController = this.getComponent(f)
                }
                ,
                e.start = function() {
                    u.instance.on(s.Map_INIT_COMPLETE, this.onMapInitComp, this)
                }
                ,
                e.onMapInitComp = function(n) {
                    p.instance.gameMap.mapLayer.node.on(a.EventType.TOUCH_START, this.onTouchMap, this)
                }
                ,
                e.onTouchMap = function(n) {
                    if (this.gameController.controlMode == i.touch) {
                        if (!this.gameController.isCanControlPlayer())
                            return;
                        var o = n.getUILocation()
                          , t = l.instance.getCameraPos().add(new r(o.x,o.y));
                        p.instance.gameMap.showRoadSign(t),
                        p.instance.gameMap.myPlayer.navTo(t.x, t.y)
                    }
                }
                ,
                e.update = function(n) {}
                ,
                t
            }(c)) || h);
            t._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/TransferDoor.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Player.ts", "./MapLoadModel.ts", "./SceneManager.ts"], (function(t) {
    "use strict";
    var e, n, a, r, i, o, s, l, p, u, c, d, g, f, h;
    return {
        setters: [function(t) {
            e = t.applyDecoratedDescriptor,
            n = t.inheritsLoose,
            a = t.initializerDefineProperty,
            r = t.assertThisInitialized,
            i = t.createClass
        }
        , function(t) {
            o = t.cclegacy,
            s = t._decorator,
            l = t.CCString,
            p = t.CCInteger,
            u = t.Label,
            c = t.Vec3,
            d = t.Component
        }
        , function(t) {
            g = t.PlayerType
        }
        , function(t) {
            f = t.MapLoadModel
        }
        , function(t) {
            h = t.default
        }
        ],
        execute: function() {
            var m, y, M, b, T, I, w, S, x;
            o._RF.push({}, "80009haV6NEw6EaKESh1p83", "TransferDoor", void 0);
            var N = s.ccclass
              , v = s.property;
            t("default", (m = N("TransferDoor"),
            y = v(l),
            M = v(p),
            b = v(u),
            m((w = e((I = function(t) {
                function e() {
                    for (var e, n = arguments.length, i = new Array(n), o = 0; o < n; o++)
                        i[o] = arguments[o];
                    return e = t.call.apply(t, [this].concat(i)) || this,
                    a(e, "targetMapId", w, r(e)),
                    a(e, "targetMapSpawnId", S, r(e)),
                    a(e, "nameTxt", x, r(e)),
                    e._objName = "",
                    e.editData = null,
                    e
                }
                n(e, t);
                var o = e.prototype;
                return o.start = function() {}
                ,
                o.init = function() {}
                ,
                o.initEditData = function(t) {
                    this.editData = t,
                    this.objName = t.objName,
                    this.node.position = new c(t.x,t.y),
                    this.targetMapId = t.targetMapId,
                    this.targetMapSpawnId = t.targetMapSpawnId
                }
                ,
                o.toString = function() {
                    return this.targetMapId + "," + this.targetMapSpawnId
                }
                ,
                o.onTriggerEnter = function(t) {
                    null != t && t.playerType == g.my && h.instance.loadMap(this.targetMapId, this.targetMapSpawnId, f.slices)
                }
                ,
                o.onTriggerExit = function(t) {}
                ,
                i(e, [{
                    key: "objName",
                    get: function() {
                        return this._objName
                    },
                    set: function(t) {
                        var e;
                        (this._objName = t,
                        null == this.nameTxt) && (this.nameTxt = null == (e = this.node.getChildByName("NameTxt")) ? void 0 : e.getComponent(u));
                        this.nameTxt && (this.nameTxt.string = this._objName)
                    }
                }]),
                e
            }(d)).prototype, "targetMapId", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return ""
                }
            }),
            S = e(I.prototype, "targetMapSpawnId", [M], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            x = e(I.prototype, "nameTxt", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            T = I)) || T));
            o._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Transform.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function(t) {
    "use strict";
    var n, e, r, o, a, i, p;
    return {
        setters: [function(t) {
            n = t.inheritsLoose,
            e = t.createClass
        }
        , function(t) {
            r = t.cclegacy,
            o = t._decorator,
            a = t.Vec3,
            i = t.Quat,
            p = t.Node
        }
        ],
        execute: function() {
            var s;
            r._RF.push({}, "ac61eQO709OhbPj4R/fyOnz", "Transform", void 0);
            var c = o.ccclass
              , u = (o.property,
            t("Transform", c("Transform")(s = function(t) {
                function r() {
                    return t.apply(this, arguments) || this
                }
                n(r, t);
                var o = r.prototype;
                return o.lookAtZ = function(t, n) {
                    var e = new a;
                    a.subtract(e, t, this.worldPosition),
                    e.normalize();
                    var r = new i;
                    i.fromViewUp(r, e.normalize(), n),
                    this.rotation = r
                }
                ,
                o.find = function(t) {
                    return this.getChildByPath(t)
                }
                ,
                o.getComponentInParent = function(t) {
                    var n = t
                      , e = this.getComponent(n);
                    return e || (e = this.searchParentComponent(this, n)),
                    e
                }
                ,
                o.searchParentComponent = function(t, n) {
                    var e = n
                      , r = null;
                    if (t.parent) {
                        if (r = t.parent.getComponent(e))
                            return r;
                        if (r = this.searchParentComponent(t.parent, n))
                            return r
                    }
                    return r
                }
                ,
                e(r, [{
                    key: "transform",
                    get: function() {
                        return this
                    }
                }, {
                    key: "gameObject",
                    get: function() {
                        return this
                    }
                }]),
                r
            }(p)) || s));
            p.prototype.lookAtZ = u.prototype.lookAtZ,
            p.prototype.find = u.prototype.find,
            p.prototype.getComponentInParent = u.prototype.getComponentInParent,
            p.prototype.searchParentComponent = u.prototype.searchParentComponent,
            r._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/UIManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseView.ts"], (function(e) {
    "use strict";
    var t, n, i, r, o, a, u, l, c;
    return {
        setters: [function(e) {
            t = e.applyDecoratedDescriptor,
            n = e.inheritsLoose,
            i = e.initializerDefineProperty,
            r = e.assertThisInitialized,
            o = e.createClass
        }
        , function(e) {
            a = e.cclegacy,
            u = e._decorator,
            l = e.Component
        }
        , function(e) {
            c = e.default
        }
        ],
        execute: function() {
            var s, p, f, b, g, w, y, h, d, V, v, _;
            a._RF.push({}, "982bbK3WGNJDYkotH4k9yAT", "UIManager", void 0);
            var m = u.ccclass
              , z = u.property;
            e("default", (s = m("UIManager"),
            p = z(c),
            f = z(c),
            b = z(c),
            g = z(c),
            s(((_ = function(e) {
                function t() {
                    for (var t, n = arguments.length, o = new Array(n), a = 0; a < n; a++)
                        o[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(o)) || this,
                    i(t, "introduceView", h, r(t)),
                    i(t, "helpView", d, r(t)),
                    i(t, "equipShopView", V, r(t)),
                    i(t, "getPrjView", v, r(t)),
                    t
                }
                n(t, e);
                var a = t.prototype;
                return a.onLoad = function() {
                    t._instance = this
                }
                ,
                a.start = function() {}
                ,
                a.init = function() {}
                ,
                a.update = function(e) {}
                ,
                o(t, null, [{
                    key: "instance",
                    get: function() {
                        return this._instance
                    }
                }]),
                t
            }(l))._instance = void 0,
            h = t((y = _).prototype, "introduceView", [p], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            d = t(y.prototype, "helpView", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            V = t(y.prototype, "equipShopView", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            v = t(y.prototype, "getPrjView", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            w = y)) || w));
            a._RF.pop()
        }
    }
}
));

System.register("chunks:///_virtual/Unit.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./PathFindingAgent.ts", "./Behaviour.ts", "./MovieClip.ts", "./FogOfWar.ts"], (function(t) {
    "use strict";
    var e, i, n, o, a, s, r, l, u, c, h, p, d, f, m;
    return {
        setters: [function(t) {
            e = t.applyDecoratedDescriptor,
            i = t.inheritsLoose,
            n = t.initializerDefineProperty,
            o = t.assertThisInitialized,
            a = t.createClass
        }
        , function(t) {
            s = t.cclegacy,
            r = t._decorator,
            l = t.Label,
            u = t.CCInteger,
            c = t.CCFloat,
            h = t.Vec3
        }
        , function(t) {
            p = t.default
        }
        , function(t) {
            d = t.Behaviour
        }
        , function(t) {
            f = t.default
        }
        , function(t) {
            m = t.FogOfWar
        }
        ],
        execute: function() {
            var y, _, g, b, P, v, x, C, M, N, k, T, w, z, F;
            t("UnitState", void 0),
            s._RF.push({}, "a08d9zbMORNCbXaFHT6BlYT", "Unit", void 0);
            var R, I = r.ccclass, j = r.property;
            !function(t) {
                t[t.none = 0] = "none",
                t[t.idle = 1] = "idle",
                t[t.walk = 2] = "walk",
                t[t.attack = 3] = "attack",
                t[t.death = 4] = "death"
            }(R || (R = t("UnitState", {})));
            t("default", (y = I("Unit"),
            _ = j(l),
            g = j(u),
            b = j(u),
            P = j(c),
            v = j(u),
            x = j(u),
            y((N = e((M = function(t) {
                function e() {
                    for (var e, i = arguments.length, a = new Array(i), s = 0; s < i; s++)
                        a[s] = arguments[s];
                    return (e = t.call.apply(t, [this].concat(a)) || this)._movieClip = null,
                    n(e, "nameTxt", N, o(e)),
                    n(e, "id", k, o(e)),
                    n(e, "type", T, o(e)),
                    n(e, "moveSpeed", w, o(e)),
                    n(e, "hp", z, o(e)),
                    n(e, "mp", F, o(e)),
                    e._direction = 0,
                    e._state = R.none,
                    e._objName = "",
                    e._lastPos = null,
                    e._mapPos = null,
                    e
                }
                i(e, t);
                var s = e.prototype;
                return s.onLoad = function() {
                    t.prototype.onLoad.call(this)
                }
                ,
                s.start = function() {
                    this.state = R.idle
                }
                ,
                s.update = function(t) {
                    var e = this.mapPos;
                    (null == this._lastPos || Math.abs(e.x - this._lastPos.x) > 1 || Math.abs(e.y - this._lastPos.y) > 1) && (null == this._lastPos && (this._lastPos = new h),
                    this._lastPos.x = e.x,
                    this._lastPos.y = e.y,
                    this.onPosChange())
                }
                ,
                s.onPosChange = function() {
                    null != m.instance && m.instance.drawOval(this.x, this.y + 35, 80, 120)
                }
                ,
                s.rotateToPos = function(t, e) {
                    var i = t - this.node.position.x
                      , n = e - this.node.position.y
                      , o = Math.atan2(n, i)
                      , a = Math.round((-o + Math.PI) / (Math.PI / 4));
                    this.direction = a > 5 ? a - 6 : a + 2
                }
                ,
                s.setFaceDir = function(t) {
                    var e = Math.atan2(t.y, t.x)
                      , i = Math.round((-e + Math.PI) / (Math.PI / 4));
                    this.direction = i > 5 ? i - 6 : i + 2
                }
                ,
                s.lookAtTarget = function(t) {
                    var e = t.position.clone().subtract(this.node.position);
                    this.setFaceDir(e)
                }
                ,
                s.getRoundRoadNodes = function() {
                    return p.instance.getRoundRoadNodes(this.roadNode)
                }
                ,
                s.destroySelf = function() {
                    this.node.destroy()
                }
                ,
                a(e, [{
                    key: "movieClip",
                    get: function() {
                        return this._movieClip || (this._movieClip = this.node.getComponentInChildren(f)),
                        this._movieClip
                    }
                }, {
                    key: "direction",
                    get: function() {
                        return this._direction
                    },
                    set: function(t) {
                        this._direction = t
                    }
                }, {
                    key: "state",
                    get: function() {
                        return this._state
                    },
                    set: function(t) {
                        this._state = t
                    }
                }, {
                    key: "objName",
                    get: function() {
                        return this._objName
                    },
                    set: function(t) {
                        var e;
                        (this._objName = t,
                        null == this.nameTxt) && (this.nameTxt = null == (e = this.node.getChildByName("NameTxt")) ? void 0 : e.getComponent(l));
                        this.nameTxt && (this.nameTxt.string = this._objName)
                    }
                }, {
                    key: "roadNode",
                    get: function() {
                        return p.instance.getRoadNodeByPixel(this.node.position.x, this.node.position.y)
                    }
                }, {
                    key: "mapPos",
                    get: function() {
                        return null == this._mapPos && (this._mapPos = this.node.position.clone()),
                        this._mapPos.x = Math.floor(this.node.position.x),
                        this._mapPos.y = Math.floor(this.node.position.y),
                        this._mapPos
                    }
                }]),
                e
            }(d)).prototype, "nameTxt", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return null
                }
            }),
            k = e(M.prototype, "id", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            T = e(M.prototype, "type", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 0
                }
            }),
            w = e(M.prototype, "moveSpeed", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 200
                }
            }),
            z = e(M.prototype, "hp", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 100
                }
            }),
            F = e(M.prototype, "mp", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function() {
                    return 100
                }
            }),
            C = M)) || C));
            s._RF.pop()
        }
    }
}
));

(function(r) {
    r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main');
}
)(function(mid, cid) {
    System.register(mid, [cid], function(_export, _context) {
        return {
            setters: [function(_m) {
                var _exportObj = {};

                for (var _key in _m) {
                    if (_key !== "default" && _key !== "__esModule")
                        _exportObj[_key] = _m[_key];
                }

                _export(_exportObj);
            }
            ],
            execute: function() {}
        };
    });
});
