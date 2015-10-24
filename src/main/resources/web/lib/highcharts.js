/*
 Highcharts 4.1.9 JS v/Highstock 2.1.9 (2015-10-07)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function () {
    function H() {
        var a, b = arguments, c, d = {}, e = function (a, b) {
            var c, d;
            "object" !== typeof a && (a = {});
            for (d in b)b.hasOwnProperty(d) && ((c = b[d]) && "object" === typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" !== typeof c.nodeType ? a[d] = e(a[d] || {}, c) : a[d] = b[d]);
            return a
        };
        !0 === b[0] && (d = b[1], b = Array.prototype.slice.call(b, 2));
        c = b.length;
        for (a = 0; a < c; a++)d = e(d, b[a]);
        return d
    }

    function J(a, b) {
        return parseInt(a, b || 10)
    }

    function ia(a) {
        return "string" === typeof a
    }

    function ba(a) {
        return a &&
            "object" === typeof a
    }

    function ua(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }

    function ja(a) {
        return "number" === typeof a
    }

    function cb(a) {
        return Q.log(a) / Q.LN10
    }

    function ka(a) {
        return Q.pow(10, a)
    }

    function oa(a, b) {
        for (var c = a.length; c--;)if (a[c] === b) {
            a.splice(c, 1);
            break
        }
    }

    function u(a) {
        return a !== w && null !== a
    }

    function L(a, b, c) {
        var d, e;
        if (ia(b))u(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b)); else if (u(b) && ba(b))for (d in b)a.setAttribute(d, b[d]);
        return e
    }

    function ca(a) {
        return ua(a) ?
            a : [a]
    }

    function R(a, b) {
        da && !W && b && b.opacity !== w && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")");
        A(a.style, b)
    }

    function la(a, b, c, d, e) {
        a = D.createElement(a);
        b && A(a, b);
        e && R(a, {padding: 0, border: "none", margin: 0});
        c && R(a, c);
        d && d.appendChild(a);
        return a
    }

    function db(a, b) {
        var c = function () {
            return w
        };
        c.prototype = new a;
        A(c.prototype, b);
        return c
    }

    function pa(a, b) {
        return Array((b || 2) + 1 - String(a).length).join(0) + a
    }

    function Ca(a) {
        return 6E4 * (Oa && Oa(a) || eb || 0)
    }

    function Da(a, b) {
        for (var c = "{", d = !1, e, f, g, h, k, m = []; -1 !== (c =
            a.indexOf(c));) {
            e = a.slice(0, c);
            if (d) {
                f = e.split(":");
                g = f.shift().split(".");
                k = g.length;
                e = b;
                for (h = 0; h < k; h++)e = e[g[h]];
                f.length && (f = f.join(":"), g = /\.([0-9])/, h = N.lang, k = void 0, /f$/.test(f) ? (k = (k = f.match(g)) ? k[1] : -1, null !== e && (e = E.numberFormat(e, k, h.decimalPoint, -1 < f.indexOf(",") ? h.thousandsSep : ""))) : e = va(f, e))
            }
            m.push(e);
            a = a.slice(c + 1);
            c = (d = !d) ? "}" : "{"
        }
        m.push(a);
        return m.join("")
    }

    function qb(a, b, c, d, e) {
        var f, g = a;
        c = r(c, 1);
        f = a / c;
        b || (b = [1, 2, 2.5, 5, 10], !1 === d && (1 === c ? b = [1, 2, 5, 10] : .1 >= c && (b = [1 / c])));
        for (d =
                 0; d < b.length && !(g = b[d], e && g * c >= a || !e && f <= (b[d] + (b[d + 1] || b[d])) / 2); d++);
        return g * c
    }

    function fb(a, b) {
        var c = a.length, d, e;
        for (e = 0; e < c; e++)a[e].ss_i = e;
        a.sort(function (a, c) {
            d = b(a, c);
            return 0 === d ? a.ss_i - c.ss_i : d
        });
        for (e = 0; e < c; e++)delete a[e].ss_i
    }

    function Pa(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] < c && (c = a[b]);
        return c
    }

    function Ea(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] > c && (c = a[b]);
        return c
    }

    function Qa(a, b) {
        for (var c in a)a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c]
    }

    function Ra(a) {
        Sa || (Sa = la("div"));
        a && Sa.appendChild(a);
        Sa.innerHTML = ""
    }

    function Z(a, b) {
        var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
        if (b)throw c;
        O.console && console.log(c)
    }

    function ea(a, b) {
        return parseFloat(a.toPrecision(b || 14))
    }

    function Fa(a, b) {
        b.renderer.globalAnimation = r(a, b.animation)
    }

    function rb() {
        var a = N.global, b = a.useUTC, c = b ? "getUTC" : "get", d = b ? "setUTC" : "set";
        fa = a.Date || window.Date;
        eb = b && a.timezoneOffset;
        Oa = b && a.getTimezoneOffset;
        Ta = function (a, c, d, h, k, m) {
            var l;
            b ? (l = fa.UTC.apply(0, arguments), l += Ca(l)) : l = (new fa(a,
                c, r(d, 1), r(h, 0), r(k, 0), r(m, 0))).getTime();
            return l
        };
        gb = c + "Minutes";
        hb = c + "Hours";
        ib = c + "Day";
        Ga = c + "Date";
        Ha = c + "Month";
        Ia = c + "FullYear";
        sb = d + "Milliseconds";
        tb = d + "Seconds";
        ub = d + "Minutes";
        vb = d + "Hours";
        jb = d + "Date";
        kb = d + "Month";
        lb = d + "FullYear"
    }

    function S() {
    }

    function wa(a, b, c, d) {
        this.axis = a;
        this.pos = b;
        this.type = c || "";
        this.isNew = !0;
        c || d || this.addLabel()
    }

    var w, D = document, O = window, Q = Math, x = Q.round, P = Q.floor, ga = Q.ceil, y = Q.max, I = Q.min, T = Q.abs, qa = Q.cos, xa = Q.sin, wb = Q.PI, ya = 2 * wb / 360, ma = navigator.userAgent, Eb = O.opera,
        da = /(msie|trident|edge)/i.test(ma) && !Eb, xb = !da && /AppleWebKit/.test(ma), Ja = /Firefox/.test(ma), yb = /(Mobile|Android|Windows Phone)/.test(ma), W = !!D.createElementNS && !!D.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, Fb = Ja && 4 > parseInt(ma.split("Firefox/")[1], 10), aa = !W && !da && !!D.createElement("canvas").getContext, Ka, zb = {}, mb = 0, Sa, N, va, nb, C, Gb = function () {
            return w
        }, V = [], La = 0, Hb = /^[0-9]+$/, Ua = ["plotTop", "marginRight", "marginBottom", "plotLeft"], fa, Ta, eb, Oa, gb, hb, ib, Ga, Ha, Ia, sb, tb, ub, vb, jb,
        kb, lb, X = {}, E;
    E = O.Highcharts = O.Highcharts ? Z(16, !0) : {};
    E.seriesTypes = X;
    var A = E.extend = function (a, b) {
        var c;
        a || (a = {});
        for (c in b)a[c] = b[c];
        return a
    }, r = E.pick = function () {
        var a = arguments, b, c, d = a.length;
        for (b = 0; b < d; b++)if (c = a[b], c !== w && null !== c)return c
    }, Ab = E.wrap = function (a, b, c) {
        var d = a[b];
        a[b] = function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a)
        }
    };
    va = function (a, b, c) {
        if (!u(b) || isNaN(b))return N.lang.invalidDate || "";
        a = r(a, "%Y-%m-%d %H:%M:%S");
        var d = new fa(b - Ca(b)), e,
            f = d[hb](), g = d[ib](), h = d[Ga](), k = d[Ha](), m = d[Ia](), l = N.lang, q = l.weekdays, d = A({
                a: q[g].substr(0, 3),
                A: q[g],
                d: pa(h),
                e: h,
                w: g,
                b: l.shortMonths[k],
                B: l.months[k],
                m: pa(k + 1),
                y: m.toString().substr(2, 2),
                Y: m,
                H: pa(f),
                k: f,
                I: pa(f % 12 || 12),
                l: f % 12 || 12,
                M: pa(d[gb]()),
                p: 12 > f ? "AM" : "PM",
                P: 12 > f ? "am" : "pm",
                S: pa(d.getSeconds()),
                L: pa(x(b % 1E3), 3)
            }, E.dateFormats);
        for (e in d)for (; -1 !== a.indexOf("%" + e);)a = a.replace("%" + e, "function" === typeof d[e] ? d[e](b) : d[e]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
    };
    C = {
        millisecond: 1, second: 1E3,
        minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5
    };
    E.numberFormat = function (a, b, c, d) {
        var e = N.lang;
        a = +a || 0;
        var f = -1 === b ? I((a.toString().split(".")[1] || "").length, 20) : isNaN(b = T(b)) ? 2 : b;
        b = void 0 === c ? e.decimalPoint : c;
        d = void 0 === d ? e.thousandsSep : d;
        e = 0 > a ? "-" : "";
        c = String(J(a = T(a).toFixed(f)));
        var g = 3 < c.length ? c.length % 3 : 0;
        return e + (g ? c.substr(0, g) + d : "") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + T(a - c).toFixed(f).slice(2) : "")
    };
    nb = {
        init: function (a, b, c) {
            b = b || "";
            var d = a.shift, e = -1 <
                b.indexOf("C"), f = e ? 7 : 3, g;
            b = b.split(" ");
            c = [].concat(c);
            var h, k, m = function (a) {
                for (g = a.length; g--;)"M" === a[g] && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
            };
            e && (m(b), m(c));
            a.isArea && (h = b.splice(b.length - 6, 6), k = c.splice(c.length - 6, 6));
            if (d <= c.length / f && b.length === c.length)for (; d--;)c = [].concat(c).splice(0, f).concat(c);
            a.shift = 0;
            if (b.length)for (a = c.length; b.length < a;)d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
            h && (b = b.concat(h), c = c.concat(k));
            return [b, c]
        }, step: function (a,
                           b, c, d) {
            var e = [], f = a.length;
            if (1 === c)e = d; else if (f === b.length && 1 > c)for (; f--;)d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d; else e = b;
            return e
        }
    };
    (function (a) {
        O.HighchartsAdapter = O.HighchartsAdapter || a && {
                init: function (b) {
                    var c = a.fx;
                    a.extend(a.easing, {
                        easeOutQuad: function (a, b, c, g, h) {
                            return -g * (b /= h) * (b - 2) + c
                        }
                    });
                    a.each(["cur", "_default", "width", "height", "opacity"], function (b, e) {
                        var f = c.step, g;
                        "cur" === e ? f = c.prototype : "_default" === e && a.Tween && (f = a.Tween.propHooks[e], e = "set");
                        (g = f[e]) && (f[e] =
                            function (a) {
                                var c;
                                a = b ? a : this;
                                if ("align" !== a.prop)return c = a.elem, c.attr ? c.attr(a.prop, "cur" === e ? w : a.now) : g.apply(this, arguments)
                            })
                    });
                    Ab(a.cssHooks.opacity, "get", function (a, b, c) {
                        return b.attr ? b.opacity || 0 : a.call(this, b, c)
                    });
                    this.addAnimSetter("d", function (a) {
                        var c = a.elem, f;
                        a.started || (f = b.init(c, c.d, c.toD), a.start = f[0], a.end = f[1], a.started = !0);
                        c.attr("d", b.step(a.start, a.end, a.pos, c.toD))
                    });
                    this.each = Array.prototype.forEach ? function (a, b) {
                        return Array.prototype.forEach.call(a, b)
                    } : function (a, b) {
                        var c,
                            g = a.length;
                        for (c = 0; c < g; c++)if (!1 === b.call(a[c], a[c], c, a))return c
                    };
                    a.fn.highcharts = function () {
                        var a = "Chart", b = arguments, c, g;
                        this[0] && (ia(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1)), c = b[0], c !== w && (c.chart = c.chart || {}, c.chart.renderTo = this[0], new E[a](c, b[1]), g = this), c === w && (g = V[L(this[0], "data-highcharts-chart")]));
                        return g
                    }
                }, addAnimSetter: function (b, c) {
                    a.Tween ? a.Tween.propHooks[b] = {set: c} : a.fx.step[b] = c
                }, getScript: a.getScript, inArray: a.inArray, adapterRun: function (b, c) {
                    return a(b)[c]()
                }, grep: a.grep,
                map: function (a, c) {
                    for (var d = [], e = 0, f = a.length; e < f; e++)d[e] = c.call(a[e], a[e], e, a);
                    return d
                }, offset: function (b) {
                    return a(b).offset()
                }, addEvent: function (b, c, d) {
                    a(b).bind(c, d)
                }, removeEvent: function (b, c, d) {
                    var e = D.removeEventListener ? "removeEventListener" : "detachEvent";
                    D[e] && b && !b[e] && (b[e] = function () {
                    });
                    a(b).unbind(c, d)
                }, fireEvent: function (b, c, d, e) {
                    var f = a.Event(c), g = "detached" + c, h;
                    !da && d && (delete d.layerX, delete d.layerY, delete d.returnValue);
                    A(f, d);
                    b[c] && (b[g] = b[c], b[c] = null);
                    a.each(["preventDefault",
                        "stopPropagation"], function (a, b) {
                        var c = f[b];
                        f[b] = function () {
                            try {
                                c.call(f)
                            } catch (a) {
                                "preventDefault" === b && (h = !0)
                            }
                        }
                    });
                    a(b).trigger(f);
                    b[g] && (b[c] = b[g], b[g] = null);
                    !e || f.isDefaultPrevented() || h || e(f)
                }, washMouseEvent: function (a) {
                    var c = a.originalEvent || a;
                    c.pageX === w && (c.pageX = a.pageX, c.pageY = a.pageY);
                    return c
                }, animate: function (b, c, d) {
                    var e = a(b);
                    b.style || (b.style = {});
                    c.d && (b.toD = c.d, c.d = 1);
                    e.stop();
                    c.opacity !== w && b.attr && (c.opacity += "px");
                    b.hasAnim = 1;
                    e.animate(c, d)
                }, stop: function (b) {
                    b.hasAnim && a(b).stop()
                }
            }
    })(O.jQuery);
    var Va = O.HighchartsAdapter, Y = Va || {};
    Va && Va.init.call(Va, nb);
    var Wa = Y.adapterRun, Ma = Y.inArray, t = E.each = Y.each, Xa = Y.grep, Ib = Y.offset, Ya = Y.map, M = Y.addEvent, U = Y.removeEvent, F = Y.fireEvent, Jb = Y.washMouseEvent, Za = Y.animate, ob = Y.stop;
    N = {
        colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January February March April May June July August September October November December".split(" "),
            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " "
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.1.9/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.1.9/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}}
        },
        title: {text: "Chart title", align: "center", margin: 15, style: {color: "#333333", fontSize: "18px"}},
        subtitle: {text: "", align: "center", style: {color: "#555555"}},
        plotOptions: {
            line: {
                allowPointSelect: !1, showCheckbox: !1, animation: {duration: 1E3}, events: {}, lineWidth: 2, marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {enabled: !0, lineWidthPlus: 1, radiusPlus: 2},
                        select: {fillColor: "#FFFFFF", lineColor: "#000000", lineWidth: 2}
                    }
                }, point: {events: {}}, dataLabels: {
                    align: "center",
                    formatter: function () {
                        return null === this.y ? "" : E.numberFormat(this.y, -1)
                    },
                    style: {
                        color: "contrast",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textShadow: "0 0 6px contrast, 0 0 3px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: {
                    hover: {
                        lineWidthPlus: 1, marker: {},
                        halo: {size: 10, opacity: .25}
                    }, select: {marker: {}}
                }, stickyTracking: !0, turboThreshold: 1E3
            }
        },
        labels: {style: {position: "absolute", color: "#3E576F"}},
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function () {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {activeColor: "#274b6d", inactiveColor: "#CCC"},
            shadow: !1,
            itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold"},
            itemHoverStyle: {color: "#000"},
            itemHiddenStyle: {color: "#CCC"},
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px", height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {style: {fontWeight: "bold"}}
        },
        loading: {
            labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
            style: {position: "absolute", backgroundColor: "white", opacity: .5, textAlign: "center"}
        },
        tooltip: {
            enabled: !0,
            animation: W,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            footerFormat: "",
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: yb ? 25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                pointerEvents: "none",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0, text: "Highcharts.com", href: "http://www.highcharts.com", position: {
                align: "right", x: -10,
                verticalAlign: "bottom", y: -5
            }, style: {cursor: "pointer", color: "#909090", fontSize: "9px"}
        }
    };
    var ra = N.plotOptions, Kb = ra.line;
    rb();
    var Lb = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, Mb = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, Nb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, ha = function (a) {
        var b = [], c, d;
        (function (a) {
            a && a.stops ? d = Ya(a.stops, function (a) {
                return ha(a[1])
            }) : (c = Lb.exec(a)) ? b = [J(c[1]), J(c[2]), J(c[3]), parseFloat(c[4],
                10)] : (c = Mb.exec(a)) ? b = [J(c[1], 16), J(c[2], 16), J(c[3], 16), 1] : (c = Nb.exec(a)) && (b = [J(c[1]), J(c[2]), J(c[3]), 1])
        })(a);
        return {
            get: function (c) {
                var f;
                d ? (f = H(a), f.stops = [].concat(f.stops), t(d, function (a, b) {
                    f.stops[b] = [f.stops[b][0], a.get(c)]
                })) : f = b && !isNaN(b[0]) ? "rgb" === c ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : "a" === c ? b[3] : "rgba(" + b.join(",") + ")" : a;
                return f
            }, brighten: function (a) {
                if (d)t(d, function (b) {
                    b.brighten(a)
                }); else if (ja(a) && 0 !== a) {
                    var c;
                    for (c = 0; 3 > c; c++)b[c] += J(255 * a), 0 > b[c] && (b[c] = 0), 255 < b[c] && (b[c] = 255)
                }
                return this
            },
            rgba: b, setOpacity: function (a) {
                b[3] = a;
                return this
            }, raw: a
        }
    };
    S.prototype = {
        opacity: 1,
        textProps: "fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
        init: function (a, b) {
            this.element = "span" === b ? la(b) : D.createElementNS("http://www.w3.org/2000/svg", b);
            this.renderer = a
        },
        animate: function (a, b, c) {
            b = r(b, this.renderer.globalAnimation, !0);
            ob(this);
            b ? (b = H(b, {}), c && (b.complete = c), Za(this, a, b)) : this.attr(a, null, c);
            return this
        },
        colorGradient: function (a, b,
                                 c) {
            var d = this.renderer, e, f, g, h, k, m, l, q, n, p, z, v = [];
            a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient");
            if (f) {
                g = a[f];
                k = d.gradients;
                l = a.stops;
                p = c.radialReference;
                ua(g) && (a[f] = g = {x1: g[0], y1: g[1], x2: g[2], y2: g[3], gradientUnits: "userSpaceOnUse"});
                "radialGradient" === f && p && !u(g.gradientUnits) && (h = g, g = H(g, d.getRadialAttr(p, h), {gradientUnits: "userSpaceOnUse"}));
                for (z in g)"id" !== z && v.push(z, g[z]);
                for (z in l)v.push(l[z]);
                v = v.join(",");
                k[v] ? a = k[v].attr("id") : (g.id = a = "highcharts-" + mb++, k[v] =
                    m = d.createElement(f).attr(g).add(d.defs), m.radAttr = h, m.stops = [], t(l, function (a) {
                    0 === a[1].indexOf("rgba") ? (e = ha(a[1]), q = e.get("rgb"), n = e.get("a")) : (q = a[1], n = 1);
                    a = d.createElement("stop").attr({offset: a[0], "stop-color": q, "stop-opacity": n}).add(m);
                    m.stops.push(a)
                }));
                c.setAttribute(b, "url(" + d.url + "#" + a + ")");
                c.gradient = v
            }
        },
        applyTextShadow: function (a) {
            var b = this.element, c, d = -1 !== a.indexOf("contrast"), e = {}, f = this.renderer.forExport, g = f || b.style.textShadow !== w && !da;
            d && (e.textShadow = a = a.replace(/contrast/g,
                this.renderer.getContrast(b.style.fill)));
            if (xb || f)e.textRendering = "geometricPrecision";
            g ? this.css(e) : (this.fakeTS = !0, this.ySetter = this.xSetter, c = [].slice.call(b.getElementsByTagName("tspan")), t(a.split(/\s?,\s?/g), function (a) {
                var d = b.firstChild, e, f;
                a = a.split(" ");
                e = a[a.length - 1];
                (f = a[a.length - 2]) && t(c, function (a, c) {
                    var g;
                    0 === c && (a.setAttribute("x", b.getAttribute("x")), c = b.getAttribute("y"), a.setAttribute("y", c || 0), null === c && b.setAttribute("y", 0));
                    g = a.cloneNode(1);
                    L(g, {
                        "class": "highcharts-text-shadow",
                        fill: e,
                        stroke: e,
                        "stroke-opacity": 1 / y(J(f), 3),
                        "stroke-width": f,
                        "stroke-linejoin": "round"
                    });
                    b.insertBefore(g, d)
                })
            }))
        },
        attr: function (a, b, c) {
            var d, e = this.element, f, g = this, h;
            "string" === typeof a && b !== w && (d = a, a = {}, a[d] = b);
            if ("string" === typeof a)g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e); else {
                for (d in a)b = a[d], h = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d) && (f || (this.symbolAttr(a), f = !0), h = !0), !this.rotation || "x" !== d && "y" !== d || (this.doTransform = !0), h ||
                (this[d + "Setter"] || this._defaultSetter).call(this, b, d, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d, b);
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            }
            c && c();
            return g
        },
        updateShadows: function (a, b) {
            for (var c = this.shadows, d = c.length; d--;)c[d].setAttribute(a, "height" === a ? y(b - (c[d].cutHeight || 0), 0) : "d" === a ? this.d : b)
        },
        addClass: function (a) {
            var b = this.element, c = L(b, "class") || "";
            -1 === c.indexOf(a) && L(b, "class", c + " " + a);
            return this
        },
        symbolAttr: function (a) {
            var b =
                this;
            t("x y r start end width height innerR anchorX anchorY".split(" "), function (c) {
                b[c] = r(a[c], b[c])
            });
            b.attr({d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)})
        },
        clip: function (a) {
            return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
        },
        crisp: function (a) {
            var b, c = {}, d, e = a.strokeWidth || this.strokeWidth || 0;
            d = x(e) % 2 / 2;
            a.x = P(a.x || this.x || 0) + d;
            a.y = P(a.y || this.y || 0) + d;
            a.width = P((a.width || this.width || 0) - 2 * d);
            a.height = P((a.height || this.height || 0) - 2 * d);
            a.strokeWidth = e;
            for (b in a)this[b] !==
            a[b] && (this[b] = c[b] = a[b]);
            return c
        },
        css: function (a) {
            var b = this.styles, c = {}, d = this.element, e, f, g = "";
            e = !b;
            a && a.color && (a.fill = a.color);
            if (b)for (f in a)a[f] !== b[f] && (c[f] = a[f], e = !0);
            if (e) {
                e = this.textWidth = a && a.width && "text" === d.nodeName.toLowerCase() && J(a.width) || this.textWidth;
                b && (a = A(b, c));
                this.styles = a;
                e && (aa || !W && this.renderer.forExport) && delete a.width;
                if (da && !W)R(this.element, a); else {
                    b = function (a, b) {
                        return "-" + b.toLowerCase()
                    };
                    for (f in a)g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
                    L(d, "style", g)
                }
                e &&
                this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function (a, b) {
            var c = this, d = c.element;
            Ka && "click" === a ? (d.ontouchstart = function (a) {
                c.touchEventFired = fa.now();
                a.preventDefault();
                b.call(d, a)
            }, d.onclick = function (a) {
                (-1 === ma.indexOf("Android") || 1100 < fa.now() - (c.touchEventFired || 0)) && b.call(d, a)
            }) : d["on" + a] = b;
            return this
        },
        setRadialReference: function (a) {
            var b = this.renderer.gradients[this.element.gradient];
            this.element.radialReference = a;
            b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
            return this
        },
        translate: function (a, b) {
            return this.attr({translateX: a, translateY: b})
        },
        invert: function () {
            this.inverted = !0;
            this.updateTransform();
            return this
        },
        updateTransform: function () {
            var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation, g = this.element;
            e && (a += this.attr("width"), b += this.attr("height"));
            a = ["translate(" + a + "," + b + ")"];
            e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")");
            (u(c) || u(d)) && a.push("scale(" + r(c, 1) + " " + r(d, 1) + ")");
            a.length && g.setAttribute("transform", a.join(" "))
        },
        toFront: function () {
            var a = this.element;
            a.parentNode.appendChild(a);
            return this
        },
        align: function (a, b, c) {
            var d, e, f, g, h = {};
            e = this.renderer;
            f = e.alignedObjects;
            if (a) {
                if (this.alignOptions = a, this.alignByTranslate = b, !c || ia(c))this.alignTo = d = c || "renderer", oa(f, this), f.push(this), c = null
            } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
            c = r(c, e[d], e);
            d = a.align;
            e = a.verticalAlign;
            f = (c.x || 0) + (a.x ||
                0);
            g = (c.y || 0) + (a.y || 0);
            if ("right" === d || "center" === d)f += (c.width - (a.width || 0)) / {right: 1, center: 2}[d];
            h[b ? "translateX" : "x"] = x(f);
            if ("bottom" === e || "middle" === e)g += (c.height - (a.height || 0)) / ({bottom: 1, middle: 2}[e] || 1);
            h[b ? "translateY" : "y"] = x(g);
            this[this.placed ? "animate" : "attr"](h);
            this.placed = !0;
            this.alignAttr = h;
            return this
        },
        getBBox: function (a) {
            var b, c = this.renderer, d, e = this.rotation, f = this.element, g = this.styles, h = e * ya;
            d = this.textStr;
            var k, m = f.style, l, q;
            d !== w && (q = ["", e || 0, g && g.fontSize, f.style.width].join(),
                q = "" === d || Hb.test(d) ? "num:" + d.toString().length + q : d + q);
            q && !a && (b = c.cache[q]);
            if (!b) {
                if ("http://www.w3.org/2000/svg" === f.namespaceURI || c.forExport) {
                    try {
                        l = this.fakeTS && function (a) {
                                t(f.querySelectorAll(".highcharts-text-shadow"), function (b) {
                                    b.style.display = a
                                })
                            }, Ja && m.textShadow ? (k = m.textShadow, m.textShadow = "") : l && l("none"), b = f.getBBox ? A({}, f.getBBox()) : {
                            width: f.offsetWidth,
                            height: f.offsetHeight
                        }, k ? m.textShadow = k : l && l("")
                    } catch (n) {
                    }
                    if (!b || 0 > b.width)b = {width: 0, height: 0}
                } else b = this.htmlGetBBox();
                c.isSVG &&
                (a = b.width, d = b.height, da && g && "11px" === g.fontSize && "16.9" === d.toPrecision(3) && (b.height = d = 14), e && (b.width = T(d * xa(h)) + T(a * qa(h)), b.height = T(d * qa(h)) + T(a * xa(h))));
                q && (c.cache[q] = b)
            }
            return b
        },
        show: function (a) {
            return this.attr({visibility: a ? "inherit" : "visible"})
        },
        hide: function () {
            return this.attr({visibility: "hidden"})
        },
        fadeOut: function (a) {
            var b = this;
            b.animate({opacity: 0}, {
                duration: a || 150, complete: function () {
                    b.attr({y: -9999})
                }
            })
        },
        add: function (a) {
            var b = this.renderer, c = this.element, d;
            a && (this.parentGroup =
                a);
            this.parentInverted = a && a.inverted;
            void 0 !== this.textStr && b.buildText(this);
            this.added = !0;
            if (!a || a.handleZ || this.zIndex)d = this.zIndexSetter();
            d || (a ? a.element : b.box).appendChild(c);
            if (this.onAdd)this.onAdd();
            return this
        },
        safeRemoveChild: function (a) {
            var b = a.parentNode;
            b && b.removeChild(a)
        },
        destroy: function () {
            var a = this, b = a.element || {}, c = a.shadows, d = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup, e, f;
            b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
            ob(a);
            a.clipPath && (a.clipPath =
                a.clipPath.destroy());
            if (a.stops) {
                for (f = 0; f < a.stops.length; f++)a.stops[f] = a.stops[f].destroy();
                a.stops = null
            }
            a.safeRemoveChild(b);
            for (c && t(c, function (b) {
                a.safeRemoveChild(b)
            }); d && d.div && 0 === d.div.childNodes.length;)b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b;
            a.alignTo && oa(a.renderer.alignedObjects, a);
            for (e in a)delete a[e];
            return null
        },
        shadow: function (a, b, c) {
            var d = [], e, f, g = this.element, h, k, m, l;
            if (a) {
                k = r(a.width, 3);
                m = (a.opacity || .15) / k;
                l = this.parentInverted ? "(-1,-1)" : "(" + r(a.offsetX, 1) +
                ", " + r(a.offsetY, 1) + ")";
                for (e = 1; e <= k; e++)f = g.cloneNode(0), h = 2 * k + 1 - 2 * e, L(f, {
                    isShadow: "true",
                    stroke: a.color || "black",
                    "stroke-opacity": m * e,
                    "stroke-width": h,
                    transform: "translate" + l,
                    fill: "none"
                }), c && (L(f, "height", y(L(f, "height") - h, 0)), f.cutHeight = h), b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g), d.push(f);
                this.shadows = d
            }
            return this
        },
        xGetter: function (a) {
            "circle" === this.element.nodeName && (a = {x: "cx", y: "cy"}[a] || a);
            return this._defaultGetter(a)
        },
        _defaultGetter: function (a) {
            a = r(this[a], this.element ?
                this.element.getAttribute(a) : null, 0);
            /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
            return a
        },
        dSetter: function (a, b, c) {
            a && a.join && (a = a.join(" "));
            /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
            c.setAttribute(b, a);
            this[b] = a
        },
        dashstyleSetter: function (a) {
            var b;
            if (a = a && a.toLowerCase()) {
                a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                for (b = a.length; b--;)a[b] = J(a[b]) * this["stroke-width"];
                a = a.join(",").replace("NaN", "none");
                this.element.setAttribute("stroke-dasharray", a)
            }
        },
        alignSetter: function (a) {
            this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
        },
        opacitySetter: function (a, b, c) {
            this[b] = a;
            c.setAttribute(b, a)
        },
        titleSetter: function (a) {
            var b = this.element.getElementsByTagName("title")[0];
            b || (b = D.createElementNS("http://www.w3.org/2000/svg", "title"), this.element.appendChild(b));
            b.appendChild(D.createTextNode(String(r(a),
                "").replace(/<[^>]*>/g, "")))
        },
        textSetter: function (a) {
            a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
        },
        fillSetter: function (a, b, c) {
            "string" === typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
        },
        visibilitySetter: function (a, b, c) {
            "inherit" === a ? c.removeAttribute(b) : c.setAttribute(b, a)
        },
        zIndexSetter: function (a, b) {
            var c = this.renderer, d = this.parentGroup, c = (d || c).element || c.box, e, f, g = this.element, h;
            e = this.added;
            var k;
            u(a) && (g.setAttribute(b, a), a = +a, this[b] ===
            a && (e = !1), this[b] = a);
            if (e) {
                (a = this.zIndex) && d && (d.handleZ = !0);
                d = c.childNodes;
                for (k = 0; k < d.length && !h; k++)e = d[k], f = L(e, "zIndex"), e !== g && (J(f) > a || !u(a) && u(f)) && (c.insertBefore(g, e), h = !0);
                h || c.appendChild(g)
            }
            return h
        },
        _defaultSetter: function (a, b, c) {
            c.setAttribute(b, a)
        }
    };
    S.prototype.yGetter = S.prototype.xGetter;
    S.prototype.translateXSetter = S.prototype.translateYSetter = S.prototype.rotationSetter = S.prototype.verticalAlignSetter = S.prototype.scaleXSetter = S.prototype.scaleYSetter = function (a, b) {
        this[b] = a;
        this.doTransform = !0
    };
    S.prototype["stroke-widthSetter"] = S.prototype.strokeSetter = function (a, b, c) {
        this[b] = a;
        this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], S.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
    };
    var $a = function () {
        this.init.apply(this, arguments)
    };
    $a.prototype = {
        Element: S, init: function (a, b, c, d, e, f) {
            var g = location, h;
            d = this.createElement("svg").attr({version: "1.1"}).css(this.getStyle(d));
            h = d.element;
            a.appendChild(h);
            -1 === a.innerHTML.indexOf("xmlns") && L(h, "xmlns", "http://www.w3.org/2000/svg");
            this.isSVG = !0;
            this.box = h;
            this.boxWrapper = d;
            this.alignedObjects = [];
            this.url = (Ja || xb) && D.getElementsByTagName("base").length ? g.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
            this.createElement("desc").add().element.appendChild(D.createTextNode("Created with Highcharts 4.1.9 /Highstock 2.1.9"));
            this.defs = this.createElement("defs").add();
            this.allowHTML = f;
            this.forExport = e;
            this.gradients = {};
            this.cache = {};
            this.setSize(b, c, !1);
            var k;
            Ja && a.getBoundingClientRect && (this.subPixelFix = b = function () {
                R(a, {left: 0, top: 0});
                k = a.getBoundingClientRect();
                R(a, {left: ga(k.left) - k.left + "px", top: ga(k.top) - k.top + "px"})
            }, b(), M(O, "resize", b))
        }, getStyle: function (a) {
            return this.style = A({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, a)
        }, isHidden: function () {
            return !this.boxWrapper.getBBox().width
        },
        destroy: function () {
            var a = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            Qa(this.gradients || {});
            this.gradients = null;
            a && (this.defs = a.destroy());
            this.subPixelFix && U(O, "resize", this.subPixelFix);
            return this.alignedObjects = null
        }, createElement: function (a) {
            var b = new this.Element;
            b.init(this, a);
            return b
        }, draw: function () {
        }, getRadialAttr: function (a, b) {
            return {cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2]}
        }, buildText: function (a) {
            for (var b = a.element, c = this, d = c.forExport, e = r(a.textStr,
                "").toString(), f = -1 !== e.indexOf("<"), g = b.childNodes, h, k, m = L(b, "x"), l = a.styles, q = a.textWidth, n = l && l.lineHeight, p = l && l.textShadow, z = l && "ellipsis" === l.textOverflow, v = g.length, K = q && !a.added && this.box, B = function (a) {
                return n ? J(n) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : l && l.fontSize || c.style.fontSize || 12, a).h
            }, G = function (a) {
                return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            }; v--;)b.removeChild(g[v]);
            f || p || z || -1 !== e.indexOf(" ") ? (h = /<.*style="([^"]+)".*>/, k = /<.*href="(http[^"]+)".*>/,
            K && K.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], "" === e[e.length - 1] && e.pop(), t(e, function (e, f) {
                var g, p = 0;
                e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                g = e.split("|||");
                t(g, function (e) {
                    if ("" !== e || 1 === g.length) {
                        var n = {}, v = D.createElementNS("http://www.w3.org/2000/svg", "tspan"), r;
                        h.test(e) && (r = e.match(h)[1].replace(/(;| |^)color([ :])/,
                            "$1fill$2"), L(v, "style", r));
                        k.test(e) && !d && (L(v, "onclick", 'location.href="' + e.match(k)[1] + '"'), R(v, {cursor: "pointer"}));
                        e = G(e.replace(/<(.|\n)*?>/g, "") || " ");
                        if (" " !== e) {
                            v.appendChild(D.createTextNode(e));
                            p ? n.dx = 0 : f && null !== m && (n.x = m);
                            L(v, n);
                            b.appendChild(v);
                            !p && f && (!W && d && R(v, {display: "block"}), L(v, "dy", B(v)));
                            if (q) {
                                for (var n = e.replace(/([^\^])-/g, "$1- ").split(" "), t = 1 < g.length || f || 1 < n.length && "nowrap" !== l.whiteSpace, K, Na, u, w = [], y = B(v), A = 1, Ob = a.rotation, x = e, C = x.length; (t || z) && (n.length || w.length);)a.rotation =
                                    0, K = a.getBBox(!0), u = K.width, !W && c.forExport && (u = c.measureSpanWidth(v.firstChild.data, a.styles)), K = u > q, void 0 === Na && (Na = K), z && Na ? (C /= 2, "" === x || !K && .5 > C ? n = [] : (K && (Na = !0), x = e.substring(0, x.length + (K ? -1 : 1) * ga(C)), n = [x + (3 < q ? "\u2026" : "")], v.removeChild(v.firstChild))) : K && 1 !== n.length ? (v.removeChild(v.firstChild), w.unshift(n.pop())) : (n = w, w = [], n.length && (A++, v = D.createElementNS("http://www.w3.org/2000/svg", "tspan"), L(v, {
                                    dy: y,
                                    x: m
                                }), r && L(v, "style", r), b.appendChild(v)), u > q && (q = u)), n.length && v.appendChild(D.createTextNode(n.join(" ").replace(/- /g,
                                    "-")));
                                Na && a.attr("title", a.textStr);
                                a.rotation = Ob
                            }
                            p++
                        }
                    }
                })
            }), K && K.removeChild(b), p && a.applyTextShadow && a.applyTextShadow(p)) : b.appendChild(D.createTextNode(G(e)))
        }, getContrast: function (a) {
            a = ha(a).rgba;
            return 384 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
        }, button: function (a, b, c, d, e, f, g, h, k) {
            var m = this.label(a, b, c, k, null, null, null, null, "button"), l = 0, q, n, p, z, v, r;
            a = {x1: 0, y1: 0, x2: 0, y2: 1};
            e = H({
                    "stroke-width": 1,
                    stroke: "#CCCCCC",
                    fill: {linearGradient: a, stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]]},
                    r: 2,
                    padding: 5,
                    style: {color: "black"}
                },
                e);
            p = e.style;
            delete e.style;
            f = H(e, {stroke: "#68A", fill: {linearGradient: a, stops: [[0, "#FFF"], [1, "#ACF"]]}}, f);
            z = f.style;
            delete f.style;
            g = H(e, {stroke: "#68A", fill: {linearGradient: a, stops: [[0, "#9BD"], [1, "#CDF"]]}}, g);
            v = g.style;
            delete g.style;
            h = H(e, {style: {color: "#CCC"}}, h);
            r = h.style;
            delete h.style;
            M(m.element, da ? "mouseover" : "mouseenter", function () {
                3 !== l && m.attr(f).css(z)
            });
            M(m.element, da ? "mouseout" : "mouseleave", function () {
                3 !== l && (q = [e, f, g][l], n = [p, z, v][l], m.attr(q).css(n))
            });
            m.setState = function (a) {
                (m.state =
                    l = a) ? 2 === a ? m.attr(g).css(v) : 3 === a && m.attr(h).css(r) : m.attr(e).css(p)
            };
            return m.on("click", function (a) {
                3 !== l && d.call(m, a)
            }).attr(e).css(A({cursor: "default"}, p))
        }, crispLine: function (a, b) {
            a[1] === a[4] && (a[1] = a[4] = x(a[1]) - b % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = x(a[2]) + b % 2 / 2);
            return a
        }, path: function (a) {
            var b = {fill: "none"};
            ua(a) ? b.d = a : ba(a) && A(b, a);
            return this.createElement("path").attr(b)
        }, circle: function (a, b, c) {
            a = ba(a) ? a : {x: a, y: b, r: c};
            b = this.createElement("circle");
            b.xSetter = function (a) {
                this.element.setAttribute("cx",
                    a)
            };
            b.ySetter = function (a) {
                this.element.setAttribute("cy", a)
            };
            return b.attr(a)
        }, arc: function (a, b, c, d, e, f) {
            ba(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x);
            a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {innerR: d || 0, start: e || 0, end: f || 0});
            a.r = c;
            return a
        }, rect: function (a, b, c, d, e, f) {
            e = ba(a) ? a.r : e;
            var g = this.createElement("rect");
            a = ba(a) ? a : a === w ? {} : {x: a, y: b, width: y(c, 0), height: y(d, 0)};
            f !== w && (a.strokeWidth = f, a = g.crisp(a));
            e && (a.r = e);
            g.rSetter = function (a) {
                L(this.element, {rx: a, ry: a})
            };
            return g.attr(a)
        }, setSize: function (a,
                              b, c) {
            var d = this.alignedObjects, e = d.length;
            this.width = a;
            this.height = b;
            for (this.boxWrapper[r(c, !0) ? "animate" : "attr"]({width: a, height: b}); e--;)d[e].align()
        }, g: function (a) {
            var b = this.createElement("g");
            return u(a) ? b.attr({"class": "highcharts-" + a}) : b
        }, image: function (a, b, c, d, e) {
            var f = {preserveAspectRatio: "none"};
            1 < arguments.length && A(f, {x: b, y: c, width: d, height: e});
            f = this.createElement("image").attr(f);
            f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href",
                a);
            return f
        }, symbol: function (a, b, c, d, e, f) {
            var g, h = this.symbols[a], h = h && h(x(b), x(c), d, e, f), k = /^url\((.*?)\)$/, m, l;
            h ? (g = this.path(h), A(g, {
                symbolName: a,
                x: b,
                y: c,
                width: d,
                height: e
            }), f && A(g, f)) : k.test(a) && (l = function (a, b) {
                a.element && (a.attr({
                    width: b[0],
                    height: b[1]
                }), a.alignByTranslate || a.translate(x((d - b[0]) / 2), x((e - b[1]) / 2)))
            }, m = a.match(k)[1], a = zb[m] || f && f.width && f.height && [f.width, f.height], g = this.image(m).attr({
                x: b,
                y: c
            }), g.isImg = !0, a ? l(g, a) : (g.attr({width: 0, height: 0}), la("img", {
                onload: function () {
                    0 ===
                    this.width && (R(this, {position: "absolute", top: "-999em"}), document.body.appendChild(this));
                    l(g, zb[m] = [this.width, this.height]);
                    this.parentNode && this.parentNode.removeChild(this)
                }, src: m
            })));
            return g
        }, symbols: {
            circle: function (a, b, c, d) {
                var e = .166 * c;
                return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
            }, square: function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
            }, triangle: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
            }, "triangle-down": function (a, b, c, d) {
                return ["M",
                    a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
            }, diamond: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
            }, arc: function (a, b, c, d, e) {
                var f = e.start;
                c = e.r || c || d;
                var g = e.end - .001;
                d = e.innerR;
                var h = e.open, k = qa(f), m = xa(f), l = qa(g), g = xa(g);
                e = e.end - f < wb ? 0 : 1;
                return ["M", a + c * k, b + c * m, "A", c, c, 0, e, 1, a + c * l, b + c * g, h ? "M" : "L", a + d * l, b + d * g, "A", d, d, 0, e, 0, a + d * k, b + d * m, h ? "" : "Z"]
            }, callout: function (a, b, c, d, e) {
                var f = I(e && e.r || 0, c, d), g = f + 6, h = e && e.anchorX;
                e = e && e.anchorY;
                var k;
                k = ["M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b +
                f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b];
                h && h > c && e > b + g && e < b + d - g ? k.splice(13, 3, "L", a + c, e - 6, a + c + 6, e, a + c, e + 6, a + c, b + d - f) : h && 0 > h && e > b + g && e < b + d - g ? k.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + f) : e && e > d && h > a + g && h < a + c - g ? k.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : e && 0 > e && h > a + g && h < a + c - g && k.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b);
                return k
            }
        }, clipRect: function (a, b, c, d) {
            var e = "highcharts-" + mb++, f = this.createElement("clipPath").attr({id: e}).add(this.defs);
            a = this.rect(a, b, c, d, 0).add(f);
            a.id = e;
            a.clipPath = f;
            a.count = 0;
            return a
        }, text: function (a, b, c, d) {
            var e = aa || !W && this.forExport, f = {};
            if (d && (this.allowHTML || !this.forExport))return this.html(a, b, c);
            f.x = Math.round(b || 0);
            c && (f.y = Math.round(c));
            if (a || 0 === a)f.text = a;
            a = this.createElement("text").attr(f);
            e && a.css({position: "absolute"});
            d || (a.xSetter = function (a, b, c) {
                var d = c.getElementsByTagName("tspan"), e, f = c.getAttribute(b), n;
                for (n = 0; n < d.length; n++)e = d[n], e.getAttribute(b) === f && e.setAttribute(b, a);
                c.setAttribute(b,
                    a)
            });
            return a
        }, fontMetrics: function (a, b) {
            var c, d;
            a = a || this.style.fontSize;
            !a && b && O.getComputedStyle && (b = b.element || b, a = (c = O.getComputedStyle(b, "")) && c.fontSize);
            a = /px/.test(a) ? J(a) : /em/.test(a) ? 12 * parseFloat(a) : 12;
            c = 24 > a ? a + 3 : x(1.2 * a);
            d = x(.8 * c);
            return {h: c, b: d, f: a}
        }, rotCorr: function (a, b, c) {
            var d = a;
            b && c && (d = y(d * qa(b * ya), 4));
            return {x: -a / 3 * xa(b * ya), y: d}
        }, label: function (a, b, c, d, e, f, g, h, k) {
            function m() {
                var a, b;
                a = z.element.style;
                r = (void 0 === za || void 0 === sa || p.styles.textAlign) && u(z.textStr) && z.getBBox();
                p.width = (za || r.width || 0) + 2 * G + y;
                p.height = (sa || r.height || 0) + 2 * G;
                I = G + n.fontMetrics(a && a.fontSize, z).b;
                J && (v || (a = x(-B * G) + E, b = (h ? -I : 0) + E, p.box = v = d ? n.symbol(d, a, b, p.width, p.height, F) : n.rect(a, b, p.width, p.height, 0, F["stroke-width"]), v.isImg || v.attr("fill", "none"), v.add(p)), v.isImg || v.attr(A({
                    width: x(p.width),
                    height: x(p.height)
                }, F)), F = null)
            }

            function l() {
                var a = p.styles, a = a && a.textAlign, b = y + G * (1 - B), c;
                c = h ? 0 : I;
                u(za) && r && ("center" === a || "right" === a) && (b += {center: .5, right: 1}[a] * (za - r.width));
                if (b !== z.x || c !== z.y)z.attr("x",
                    b), c !== w && z.attr("y", c);
                z.x = b;
                z.y = c
            }

            function q(a, b) {
                v ? v.attr(a, b) : F[a] = b
            }

            var n = this, p = n.g(k), z = n.text("", 0, 0, g).attr({zIndex: 1}), v, r, B = 0, G = 3, y = 0, za, sa, C, D, E = 0, F = {}, I, J;
            p.onAdd = function () {
                z.add(p);
                p.attr({text: a || 0 === a ? a : "", x: b, y: c});
                v && u(e) && p.attr({anchorX: e, anchorY: f})
            };
            p.widthSetter = function (a) {
                za = a
            };
            p.heightSetter = function (a) {
                sa = a
            };
            p.paddingSetter = function (a) {
                u(a) && a !== G && (G = p.padding = a, l())
            };
            p.paddingLeftSetter = function (a) {
                u(a) && a !== y && (y = a, l())
            };
            p.alignSetter = function (a) {
                B = {
                    left: 0, center: .5,
                    right: 1
                }[a]
            };
            p.textSetter = function (a) {
                a !== w && z.textSetter(a);
                m();
                l()
            };
            p["stroke-widthSetter"] = function (a, b) {
                a && (J = !0);
                E = a % 2 / 2;
                q(b, a)
            };
            p.strokeSetter = p.fillSetter = p.rSetter = function (a, b) {
                "fill" === b && a && (J = !0);
                q(b, a)
            };
            p.anchorXSetter = function (a, b) {
                e = a;
                q(b, x(a) - E - C)
            };
            p.anchorYSetter = function (a, b) {
                f = a;
                q(b, a - D)
            };
            p.xSetter = function (a) {
                p.x = a;
                B && (a -= B * ((za || r.width) + G));
                C = x(a);
                p.attr("translateX", C)
            };
            p.ySetter = function (a) {
                D = p.y = x(a);
                p.attr("translateY", D)
            };
            var L = p.css;
            return A(p, {
                css: function (a) {
                    if (a) {
                        var b =
                        {};
                        a = H(a);
                        t(p.textProps, function (c) {
                            a[c] !== w && (b[c] = a[c], delete a[c])
                        });
                        z.css(b)
                    }
                    return L.call(p, a)
                }, getBBox: function () {
                    return {width: r.width + 2 * G, height: r.height + 2 * G, x: r.x - G, y: r.y - G}
                }, shadow: function (a) {
                    v && v.shadow(a);
                    return p
                }, destroy: function () {
                    U(p.element, "mouseenter");
                    U(p.element, "mouseleave");
                    z && (z = z.destroy());
                    v && (v = v.destroy());
                    S.prototype.destroy.call(p);
                    p = n = m = l = q = null
                }
            })
        }
    };
    wa.prototype = {
        addLabel: function () {
            var a = this.axis, b = a.options, c = a.chart, d = a.categories, e = a.names, f = this.pos, g = b.labels,
                h = a.tickPositions, k = f === h[0], m = f === h[h.length - 1], e = d ? r(d[f], e[f], f) : f, d = this.label, h = h.info, l;
            a.isDatetimeAxis && h && (l = b.dateTimeLabelFormats[h.higherRanks[f] || h.unitName]);
            this.isFirst = k;
            this.isLast = m;
            b = a.labelFormatter.call({
                axis: a,
                chart: c,
                isFirst: k,
                isLast: m,
                dateTimeLabelFormat: l,
                value: a.isLog ? ea(ka(e)) : e
            });
            u(d) ? d && d.attr({text: b}) : (this.labelLength = (this.label = d = u(b) && g.enabled ? c.renderer.text(b, 0, 0, g.useHTML).css(H(g.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0)
        }, getLabelSize: function () {
            return this.label ?
                this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
        }, handleOverflow: function (a) {
            var b = this.axis, c = a.x, d = b.chart.chartWidth, e = b.chart.spacing, f = r(b.labelLeft, I(b.pos, e[3])), e = r(b.labelRight, y(b.pos + b.len, d - e[1])), g = this.label, h = this.rotation, k = {
                left: 0,
                center: .5,
                right: 1
            }[b.labelAlign], m = g.getBBox().width, l = b.slotWidth, q = 1, n, p = {};
            if (h)0 > h && c - k * m < f ? n = x(c / qa(h * ya) - f) : 0 < h && c + k * m > e && (n = x((d - c) / qa(h * ya))); else if (d = c + (1 - k) * m, c - k * m < f ? l = a.x + l * (1 - k) - f : d > e && (l = e - a.x + l * k, q = -1), l = I(b.slotWidth, l), l < b.slotWidth &&
                "center" === b.labelAlign && (a.x += q * (b.slotWidth - l - k * (b.slotWidth - I(m, l)))), m > l || b.autoRotation && g.styles.width)n = l;
            n && (p.width = n, b.options.labels.style.textOverflow || (p.textOverflow = "ellipsis"), g.css(p))
        }, getPosition: function (a, b, c, d) {
            var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
            return {
                x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
                y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null,
                    d) - e.transB
            }
        }, getLabelPosition: function (a, b, c, d, e, f, g, h) {
            var k = this.axis, m = k.transA, l = k.reversed, q = k.staggerLines, n = k.tickRotCorr || {x: 0, y: 0};
            c = r(e.y, n.y + (2 === k.side ? 8 : -(c.getBBox().height / 2)));
            a = a + e.x + n.x - (f && d ? f * m * (l ? -1 : 1) : 0);
            b = b + c - (f && !d ? f * m * (l ? 1 : -1) : 0);
            q && (b += g / (h || 1) % q * (k.labelOffset / q));
            return {x: a, y: x(b)}
        }, getMarkPath: function (a, b, c, d, e, f) {
            return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
        }, render: function (a, b, c) {
            var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, h = this.type, k = this.label,
                m = this.pos, l = e.labels, q = this.gridLine, n = h ? h + "Grid" : "grid", p = h ? h + "Tick" : "tick", z = e[n + "LineWidth"], v = e[n + "LineColor"], t = e[n + "LineDashStyle"], B = e[p + "Length"], n = r(e[p + "Width"], !h && d.isXAxis ? 1 : 0), G = e[p + "Color"], u = e[p + "Position"], p = this.mark, y = l.step, sa = !0, A = d.tickmarkOffset, x = this.getPosition(g, m, A, b), C = x.x, x = x.y, D = g && C === d.pos + d.len || !g && x === d.pos ? -1 : 1;
            c = r(c, 1);
            this.isActive = !0;
            if (z && (m = d.getPlotLinePath(m + A, z * D, b, !0), q === w && (q = {
                    stroke: v,
                    "stroke-width": z
                }, t && (q.dashstyle = t), h || (q.zIndex = 1), b && (q.opacity =
                    0), this.gridLine = q = z ? f.path(m).attr(q).add(d.gridGroup) : null), !b && q && m))q[this.isNew ? "attr" : "animate"]({
                d: m,
                opacity: c
            });
            n && B && ("inside" === u && (B = -B), d.opposite && (B = -B), h = this.getMarkPath(C, x, B, n * D, g, f), p ? p.animate({
                d: h,
                opacity: c
            }) : this.mark = f.path(h).attr({stroke: G, "stroke-width": n, opacity: c}).add(d.axisGroup));
            k && !isNaN(C) && (k.xy = x = this.getLabelPosition(C, x, k, g, l, A, a, y), this.isFirst && !this.isLast && !r(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !r(e.showLastLabel, 1) ? sa = !1 : !g || d.isRadial || l.step ||
            l.rotation || b || 0 === c || this.handleOverflow(x), y && a % y && (sa = !1), sa && !isNaN(x.y) ? (x.opacity = c, k[this.isNew ? "attr" : "animate"](x), this.isNew = !1) : k.attr("y", -9999))
        }, destroy: function () {
            Qa(this, this.axis)
        }
    };
    var ta = E.Axis = function () {
        this.init.apply(this, arguments)
    };
    ta.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#D8D8D8",
            labels: {
                enabled: !0, style: {
                    color: "#606060",
                    cursor: "default", fontSize: "11px"
                }, x: 0, y: 15
            },
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            title: {align: "middle", style: {color: "#707070"}},
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {x: -8, y: 3},
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            title: {rotation: 270, text: "Values"},
            stackLabels: {
                enabled: !1, formatter: function () {
                    return E.numberFormat(this.total, -1)
                }, style: H(ra.line.dataLabels.style, {color: "#000000"})
            }
        },
        defaultLeftAxisOptions: {labels: {x: -15, y: null}, title: {rotation: 270}},
        defaultRightAxisOptions: {labels: {x: 15, y: null}, title: {rotation: 90}},
        defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0, y: null}, title: {rotation: 0}},
        defaultTopAxisOptions: {
            labels: {
                autoRotation: [-45],
                x: 0, y: -15
            }, title: {rotation: 0}
        },
        init: function (a, b) {
            var c = b.isX;
            this.chart = a;
            this.horiz = a.inverted ? !c : c;
            this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis";
            this.opposite = b.opposite;
            this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
            this.setOptions(b);
            var d = this.options, e = d.type;
            this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
            this.userOptions = b;
            this.minPixelPadding = 0;
            this.reversed = d.reversed;
            this.visible = !1 !== d.visible;
            this.zoomEnabled = !1 !== d.zoomEnabled;
            this.categories = d.categories ||
                "category" === e;
            this.names = this.names || [];
            this.isLog = "logarithmic" === e;
            this.isDatetimeAxis = "datetime" === e;
            this.isLinked = u(d.linkedTo);
            this.ticks = {};
            this.labelEdge = [];
            this.minorTicks = {};
            this.plotLinesAndBands = [];
            this.alternateBands = {};
            this.len = 0;
            this.minRange = this.userMinRange = d.minRange || d.maxZoom;
            this.range = d.range;
            this.offset = d.offset || 0;
            this.stacks = {};
            this.oldStacks = {};
            this.stacksTouched = 0;
            this.min = this.max = null;
            this.crosshair = r(d.crosshair, ca(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
            var f, d = this.options.events;
            -1 === Ma(this, a.axes) && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
            this.series = this.series || [];
            a.inverted && c && this.reversed === w && (this.reversed = !0);
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (f in d)M(this, f, d[f]);
            this.isLog && (this.val2lin = cb, this.lin2val = ka)
        },
        setOptions: function (a) {
            this.options = H(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions,
                this.defaultLeftAxisOptions][this.side], H(N[this.coll], a))
        },
        defaultLabelFormatter: function () {
            var a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = N.lang.numericSymbols, f = e && e.length, g, h = a.options.labels.format, a = a.isLog ? b : a.tickInterval;
            if (h)g = Da(h, this); else if (c)g = b; else if (d)g = va(d, b); else if (f && 1E3 <= a)for (; f-- && g === w;)c = Math.pow(1E3, f + 1), a >= c && 0 === 10 * b % c && null !== e[f] && (g = E.numberFormat(b / c, -1) + e[f]);
            g === w && (g = 1E4 <= T(b) ? E.numberFormat(b, -1) : E.numberFormat(b, -1, w, ""));
            return g
        },
        getSeriesExtremes: function () {
            var a = this, b = a.chart;
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = a.threshold = null;
            a.softThreshold = !a.isXAxis;
            a.buildStacks && a.buildStacks();
            t(a.series, function (c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                    var d = c.options, e = d.threshold, f;
                    a.hasVisibleSeries = !0;
                    a.isLog && 0 >= e && (e = null);
                    if (a.isXAxis)d = c.xData, d.length && (a.dataMin = I(r(a.dataMin, d[0]), Pa(d)), a.dataMax = y(r(a.dataMax, d[0]), Ea(d))); else if (c.getExtremes(), f = c.dataMax, c = c.dataMin, u(c) && u(f) && (a.dataMin = I(r(a.dataMin,
                            c), c), a.dataMax = y(r(a.dataMax, f), f)), u(e) && (a.threshold = e), !d.softThreshold || a.isLog)a.softThreshold = !1
                }
            })
        },
        translate: function (a, b, c, d, e, f) {
            var g = this.linkedParent || this, h = 1, k = 0, m = d ? g.oldTransA : g.transA;
            d = d ? g.oldMin : g.min;
            var l = g.minPixelPadding;
            e = (g.doPostTranslate || g.isLog && e) && g.lin2val;
            m || (m = g.transA);
            c && (h *= -1, k = g.len);
            g.reversed && (h *= -1, k -= h * (g.sector || g.len));
            b ? (a = a * h + k - l, a = a / m + d, e && (a = g.lin2val(a))) : (e && (a = g.val2lin(a)), "between" === f && (f = .5), a = h * (a - d) * m + k + h * l + (ja(f) ? m * f * g.pointRange : 0));
            return a
        },
        toPixels: function (a, b) {
            return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
        },
        toValue: function (a, b) {
            return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function (a, b, c, d, e) {
            var f = this.chart, g = this.left, h = this.top, k, m, l = c && f.oldChartHeight || f.chartHeight, q = c && f.oldChartWidth || f.chartWidth, n;
            k = this.transB;
            var p = function (a, b, c) {
                if (a < b || a > c)d ? a = I(y(b, a), c) : n = !0;
                return a
            };
            e = r(e, this.translate(a, null, null, c));
            a = c = x(e + k);
            k = m = x(l - e - k);
            isNaN(e) ? n = !0 : this.horiz ? (k = h, m = l -
                this.bottom, a = c = p(a, g, g + this.width)) : (a = g, c = q - this.right, k = m = p(k, h, h + this.height));
            return n && !d ? null : f.renderer.crispLine(["M", a, k, "L", c, m], b || 1)
        },
        getLinearTickPositions: function (a, b, c) {
            var d, e = ea(P(b / a) * a), f = ea(ga(c / a) * a), g = [];
            if (b === c && ja(b))return [b];
            for (b = e; b <= f;) {
                g.push(b);
                b = ea(b + a);
                if (b === d)break;
                d = b
            }
            return g
        },
        getMinorTickPositions: function () {
            var a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [], e, f = this.pointRangePadding || 0;
            e = this.min - f;
            var f = this.max + f, g = f - e;
            if (g && g / c < this.len /
                3)if (this.isLog)for (f = b.length, e = 1; e < f; e++)d = d.concat(this.getLogTickPositions(c, b[e - 1], b[e], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval)d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), e, f, a.startOfWeek)); else for (b = e + (b[0] - e) % c; b <= f; b += c)d.push(b);
            0 !== d.length && this.trimTicks(d, a.startOnTick, a.endOnTick);
            return d
        },
        adjustForMinRange: function () {
            var a = this.options, b = this.min, c = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, f, g, h, k, m, l;
            this.isXAxis && this.minRange ===
            w && !this.isLog && (u(a.min) || u(a.max) ? this.minRange = null : (t(this.series, function (a) {
                k = a.xData;
                for (g = m = a.xIncrement ? 1 : k.length - 1; 0 < g; g--)if (h = k[g] - k[g - 1], f === w || h < f)f = h
            }), this.minRange = I(5 * f, this.dataMax - this.dataMin)));
            c - b < this.minRange && (l = this.minRange, d = (l - c + b) / 2, d = [b - d, r(a.min, b - d)], e && (d[2] = this.dataMin), b = Ea(d), c = [b + l, r(a.max, b + l)], e && (c[2] = this.dataMax), c = Pa(c), c - b < l && (d[0] = c - l, d[1] = r(a.min, c - l), b = Ea(d)));
            this.min = b;
            this.max = c
        },
        setAxisTranslation: function (a) {
            var b = this, c = b.max - b.min, d = b.axisPointRange ||
                0, e, f = 0, g = 0, h = b.linkedParent, k = !!b.categories, m = b.transA, l = b.isXAxis;
            if (l || k || d)h ? (f = h.minPointOffset, g = h.pointRangePadding) : t(b.series, function (a) {
                var c = k ? 1 : l ? a.pointRange : b.axisPointRange || 0, h = a.options.pointPlacement, m = a.closestPointRange;
                d = y(d, c);
                b.single || (f = y(f, ia(h) ? 0 : c / 2), g = y(g, "on" === h ? 0 : c));
                !a.noSharedTooltip && u(m) && (e = u(e) ? I(e, m) : m)
            }), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = I(d, c), l && (b.closestPointRange = e);
            a && (b.oldTransA = m);
            b.translationSlope =
                b.transA = m = b.len / (c + g || 1);
            b.transB = b.horiz ? b.left : b.bottom;
            b.minPixelPadding = m * f
        },
        minFromRange: function () {
            return this.max - this.range
        },
        setTickInterval: function (a) {
            var b = this, c = b.chart, d = b.options, e = b.isLog, f = b.isDatetimeAxis, g = b.isXAxis, h = b.isLinked, k = d.maxPadding, m = d.minPadding, l = d.tickInterval, q = d.tickPixelInterval, n = b.categories, p = b.threshold, z = b.softThreshold, v, K, B, G;
            f || n || h || this.getTickAmount();
            B = r(b.userMin, d.min);
            G = r(b.userMax, d.max);
            h ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(),
                b.min = r(c.min, c.dataMin), b.max = r(c.max, c.dataMax), d.type !== b.linkedParent.options.type && Z(11, 1)) : (!z && u(p) && (b.dataMin >= p ? (v = p, m = 0) : b.dataMax <= p && (K = p, k = 0)), b.min = r(B, v, b.dataMin), b.max = r(G, K, b.dataMax));
            e && (!a && 0 >= I(b.min, r(b.dataMin, b.min)) && Z(10, 1), b.min = ea(cb(b.min), 15), b.max = ea(cb(b.max), 15));
            b.range && u(b.max) && (b.userMin = b.min = B = y(b.min, b.minFromRange()), b.userMax = G = b.max, b.range = null);
            b.beforePadding && b.beforePadding();
            b.adjustForMinRange();
            !(n || b.axisPointRange || b.usePercentage || h) && u(b.min) &&
            u(b.max) && (c = b.max - b.min) && (!u(B) && m && (b.min -= c * m), !u(G) && k && (b.max += c * k));
            ja(d.floor) && (b.min = y(b.min, d.floor));
            ja(d.ceiling) && (b.max = I(b.max, d.ceiling));
            z && u(b.dataMin) && (p = p || 0, !u(B) && b.min < p && b.dataMin >= p ? b.min = p : !u(G) && b.max > p && b.dataMax <= p && (b.max = p));
            b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : h && !l && q === b.linkedParent.options.tickPixelInterval ? l = b.linkedParent.tickInterval : r(l, this.tickAmount ? (b.max - b.min) / y(this.tickAmount - 1, 1) : void 0, n ? 1 : (b.max - b.min) * q / y(b.len, q));
            g && !a && t(b.series, function (a) {
                a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
            });
            b.setAxisTranslation(!0);
            b.beforeSetTickPositions && b.beforeSetTickPositions();
            b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
            b.pointRange && (b.tickInterval = y(b.pointRange, b.tickInterval));
            a = r(d.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
            !l && b.tickInterval < a && (b.tickInterval = a);
            f || e || l || (b.tickInterval = qb(b.tickInterval, null, Q.pow(10, P(Q.log(b.tickInterval) / Q.LN10)), r(d.allowDecimals,
                !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
            !this.tickAmount && this.len && (b.tickInterval = b.unsquish());
            this.setTickPositions()
        },
        setTickPositions: function () {
            var a = this.options, b, c = a.tickPositions, d = a.tickPositioner, e = a.startOnTick, f = a.endOnTick, g;
            this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
            this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
            this.tickPositions =
                b = c && c.slice();
            !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
            this.isLinked || (this.trimTicks(b, e, f),
            this.min === this.max && u(this.min) && !this.tickAmount && (g = !0, this.min -= .5, this.max += .5), this.single = g, c || d || this.adjustTickAmount())
        },
        trimTicks: function (a, b, c) {
            var d = a[0], e = a[a.length - 1], f = this.minPointOffset || 0;
            b ? this.min = d : this.min - f > d && a.shift();
            c ? this.max = e : this.max + f < e && a.pop();
            0 === a.length && u(d) && a.push((e + d) / 2)
        },
        getTickAmount: function () {
            var a = {}, b, c = this.options, d = c.tickAmount, e = c.tickPixelInterval;
            !u(c.tickInterval) && this.len < e && !this.isRadial && !this.isLog && c.startOnTick && c.endOnTick && (d = 2);
            d || !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || (t(this.chart[this.coll], function (c) {
                var d = c.options, e = c.horiz, d = [e ? d.left : d.top, e ? d.width : d.height, d.pane].join();
                c.series.length && (a[d] ? b = !0 : a[d] = 1)
            }), b && (d = ga(this.len / e) + 1));
            4 > d && (this.finalTickAmt = d, d = 5);
            this.tickAmount = d
        },
        adjustTickAmount: function () {
            var a = this.tickInterval, b = this.tickPositions, c = this.tickAmount, d = this.finalTickAmt, e = b && b.length;
            if (e < c) {
                for (; b.length < c;)b.push(ea(b[b.length - 1] + a));
                this.transA *= (e - 1) / (c - 1);
                this.max =
                    b[b.length - 1]
            } else e > c && (this.tickInterval *= 2, this.setTickPositions());
            if (u(d)) {
                for (a = c = b.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
                this.finalTickAmt = w
            }
        },
        setScale: function () {
            var a, b;
            this.oldMin = this.min;
            this.oldMax = this.max;
            this.oldAxisLength = this.len;
            this.setAxisSize();
            b = this.len !== this.oldAxisLength;
            t(this.series, function (b) {
                if (b.isDirtyData || b.isDirty || b.xAxis.isDirty)a = !0
            });
            b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax ?
                (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
        },
        setExtremes: function (a, b, c, d, e) {
            var f = this, g = f.chart;
            c = r(c, !0);
            t(f.series, function (a) {
                delete a.kdTree
            });
            e = A(e, {min: a, max: b});
            F(f, "setExtremes", e, function () {
                f.userMin = a;
                f.userMax = b;
                f.eventArgs = e;
                c && g.redraw(d)
            })
        },
        zoom: function (a,
                        b) {
            var c = this.dataMin, d = this.dataMax, e = this.options, f = I(c, r(e.min, c)), e = y(d, r(e.max, d));
            this.allowZoomOutside || (u(c) && a <= f && (a = f), u(d) && b >= e && (b = e));
            this.displayBtn = a !== w || b !== w;
            this.setExtremes(a, b, !1, w, {trigger: "zoom"});
            return !0
        },
        setAxisSize: function () {
            var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = this.horiz, e = r(b.width, a.plotWidth - c + (b.offsetRight || 0)), f = r(b.height, a.plotHeight), g = r(b.top, a.plotTop), b = r(b.left, a.plotLeft + c), c = /%$/;
            c.test(f) && (f = parseFloat(f) / 100 * a.plotHeight);
            c.test(g) &&
            (g = parseFloat(g) / 100 * a.plotHeight + a.plotTop);
            this.left = b;
            this.top = g;
            this.width = e;
            this.height = f;
            this.bottom = a.chartHeight - f - g;
            this.right = a.chartWidth - e - b;
            this.len = y(d ? e : f, 0);
            this.pos = d ? b : g
        },
        getExtremes: function () {
            var a = this.isLog;
            return {
                min: a ? ea(ka(this.min)) : this.min,
                max: a ? ea(ka(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function (a) {
            var b = this.isLog, c = b ? ka(this.min) : this.min, b = b ? ka(this.max) : this.max;
            null === a ? a = 0 > b ? b : c : c >
            a ? a = c : b < a && (a = b);
            return this.translate(a, 0, 1, 0, 1)
        },
        autoLabelAlign: function (a) {
            a = (r(a, 0) - 90 * this.side + 720) % 360;
            return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
        },
        unsquish: function () {
            var a = this.ticks, b = this.options.labels, c = this.horiz, d = this.tickInterval, e = d, f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d), g, h = b.rotation, k = this.chart.renderer.fontMetrics(b.style.fontSize, a[0] && a[0].label), m, l = Number.MAX_VALUE, q, n = function (a) {
                a /= f || 1;
                a = 1 < a ? ga(a) : 1;
                return a * d
            };
            c ? (q = !b.staggerLines && !b.step &&
                (u(h) ? [h] : f < r(b.autoRotationLimit, 80) && b.autoRotation)) && t(q, function (a) {
                var b;
                if (a === h || a && -90 <= a && 90 >= a)m = n(T(k.h / xa(ya * a))), b = m + T(a / 360), b < l && (l = b, g = a, e = m)
            }) : b.step || (e = n(k.h));
            this.autoRotation = q;
            this.labelRotation = r(g, h);
            return e
        },
        renderUnsquish: function () {
            var a = this.chart, b = a.renderer, c = this.tickPositions, d = this.ticks, e = this.options.labels, f = this.horiz, g = a.margin, h = this.categories ? c.length : c.length - 1, k = this.slotWidth = f && !e.step && !e.rotation && (this.staggerLines || 1) * a.plotWidth / h || !f && (g[3] &&
                g[3] - a.spacing[3] || .33 * a.chartWidth), m = y(1, x(k - 2 * (e.padding || 5))), l = {}, g = b.fontMetrics(e.style.fontSize, d[0] && d[0].label), h = e.style.textOverflow, q, n = 0;
            ia(e.rotation) || (l.rotation = e.rotation || 0);
            if (this.autoRotation)t(c, function (a) {
                (a = d[a]) && a.labelLength > n && (n = a.labelLength)
            }), n > m && n > g.h ? l.rotation = this.labelRotation : this.labelRotation = 0; else if (k && (q = {width: m + "px"}, !h))for (q.textOverflow = "clip", k = c.length; !f && k--;)if (m = c[k], m = d[m].label)"ellipsis" === m.styles.textOverflow && m.css({textOverflow: "clip"}),
            m.getBBox().height > this.len / c.length - (g.h - g.f) && (m.specCss = {textOverflow: "ellipsis"});
            l.rotation && (q = {width: (n > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, h || (q.textOverflow = "ellipsis"));
            this.labelAlign = l.align = e.align || this.autoLabelAlign(this.labelRotation);
            t(c, function (a) {
                var b = (a = d[a]) && a.label;
                b && (b.attr(l), q && b.css(H(q, b.specCss)), delete b.specCss, a.rotation = l.rotation)
            });
            this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, 2 === this.side)
        },
        hasData: function () {
            return this.hasVisibleSeries ||
                u(this.min) && u(this.max) && !!this.tickPositions
        },
        getOffset: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, k = b.inverted ? [1, 0, 3, 2][h] : h, m, l, q = 0, n, p = 0, z = d.title, v = d.labels, K = 0, B = b.axisOffset, b = b.clipOffset, G = [-1, 1, 1, -1][h], w, x = a.axisParent;
            m = a.hasData();
            a.showAxis = l = m || r(d.showEmpty, !0);
            a.staggerLines = a.horiz && v.staggerLines;
            a.axisGroup || (a.gridGroup = c.g("grid").attr({zIndex: d.gridZIndex || 1}).add(x), a.axisGroup = c.g("axis").attr({
                zIndex: d.zIndex ||
                2
            }).add(x), a.labelGroup = c.g("axis-labels").attr({zIndex: v.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add(x));
            if (m || a.isLinked)t(e, function (b) {
                f[b] ? f[b].addLabel() : f[b] = new wa(a, b)
            }), a.renderUnsquish(), t(e, function (b) {
                if (0 === h || 2 === h || {1: "left", 3: "right"}[h] === a.labelAlign)K = y(f[b].getLabelSize(), K)
            }), a.staggerLines && (K *= a.staggerLines, a.labelOffset = K); else for (w in f)f[w].destroy(), delete f[w];
            z && z.text && !1 !== z.enabled && (a.axisTitle || (a.axisTitle = c.text(z.text, 0, 0, z.useHTML).attr({
                zIndex: 7,
                rotation: z.rotation || 0, align: z.textAlign || {low: "left", middle: "center", high: "right"}[z.align]
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(z.style).add(a.axisGroup), a.axisTitle.isNew = !0), l && (q = a.axisTitle.getBBox()[g ? "height" : "width"], n = z.offset, p = u(n) ? 0 : r(z.margin, g ? 5 : 10)), a.axisTitle[l ? "show" : "hide"]());
            a.offset = G * r(d.offset, B[h]);
            a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
            c = 2 === h ? a.tickRotCorr.y : 0;
            g = K + p + (K && G * (g ? r(v.y, a.tickRotCorr.y + 8) : v.x) - c);
            a.axisTitleMargin = r(n, g);
            B[h] = y(B[h],
                a.axisTitleMargin + q + G * a.offset, g);
            d = d.offset ? 0 : 2 * P(d.lineWidth / 2);
            b[k] = y(b[k], d)
        },
        getLinePath: function (a) {
            var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width : 0) + d, d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
            c && (a *= -1);
            return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
        },
        getTitlePosition: function () {
            var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite,
                h = this.offset, k = e.x || 0, m = e.y || 0, l = J(e.style.fontSize || 12), d = {
                    low: f + (a ? 0 : d),
                    middle: f + d / 2,
                    high: f + (a ? d : 0)
                }[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? l : 0);
            return {x: a ? d + k : b + (g ? this.width : 0) + h + k, y: a ? b + m - (g ? this.height : 0) + h : d + m}
        },
        render: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.isLog, f = a.isLinked, g = a.tickPositions, h = a.axisTitle, k = a.ticks, m = a.minorTicks, l = a.alternateBands, q = d.stackLabels, n = d.alternateGridColor, p = a.tickmarkOffset, z = d.lineWidth,
                v, r = b.hasRendered && u(a.oldMin) && !isNaN(a.oldMin), B = a.showAxis, G = c.globalAnimation, y, x;
            a.labelEdge.length = 0;
            a.overlap = !1;
            t([k, m, l], function (a) {
                for (var b in a)a[b].isActive = !1
            });
            if (a.hasData() || f)a.minorTickInterval && !a.categories && t(a.getMinorTickPositions(), function (b) {
                m[b] || (m[b] = new wa(a, b, "minor"));
                r && m[b].isNew && m[b].render(null, !0);
                m[b].render(null, !1, 1)
            }), g.length && (t(g, function (b, c) {
                if (!f || b >= a.min && b <= a.max)k[b] || (k[b] = new wa(a, b)), r && k[b].isNew && k[b].render(c, !0, .1), k[b].render(c)
            }), p && (0 ===
            a.min || a.single) && (k[-1] || (k[-1] = new wa(a, -1, null, !0)), k[-1].render(-1))), n && t(g, function (b, c) {
                x = g[c + 1] !== w ? g[c + 1] + p : a.max - p;
                0 === c % 2 && b < a.max && x <= a.max - p && (l[b] || (l[b] = new E.PlotLineOrBand(a)), y = b + p, l[b].options = {
                    from: e ? ka(y) : y,
                    to: e ? ka(x) : x,
                    color: n
                }, l[b].render(), l[b].isActive = !0)
            }), a._addedPlotLB || (t((d.plotLines || []).concat(d.plotBands || []), function (b) {
                a.addPlotBandOrLine(b)
            }), a._addedPlotLB = !0);
            t([k, m, l], function (a) {
                var c, d, e = [], f = G ? G.duration || 500 : 0, g = function () {
                    for (d = e.length; d--;)a[e[d]] && !a[e[d]].isActive &&
                    (a[e[d]].destroy(), delete a[e[d]])
                };
                for (c in a)a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c));
                a !== l && b.hasRendered && f ? f && setTimeout(g, f) : g()
            });
            z && (v = a.getLinePath(z), a.axisLine ? a.axisLine.animate({d: v}) : a.axisLine = c.path(v).attr({
                stroke: d.lineColor,
                "stroke-width": z,
                zIndex: 7
            }).add(a.axisGroup), a.axisLine[B ? "show" : "hide"]());
            h && B && (h[h.isNew ? "attr" : "animate"](a.getTitlePosition()), h.isNew = !1);
            q && q.enabled && a.renderStackTotals();
            a.isDirty = !1
        },
        redraw: function () {
            this.visible && (this.render(),
                t(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
            t(this.series, function (a) {
                a.isDirty = !0
            })
        },
        destroy: function (a) {
            var b = this, c = b.stacks, d, e = b.plotLinesAndBands;
            a || U(b);
            for (d in c)Qa(c[d]), c[d] = null;
            t([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                Qa(a)
            });
            for (a = e.length; a--;)e[a].destroy();
            t("stackTotalGroup axisLine axisTitle axisGroup cross gridGroup labelGroup".split(" "), function (a) {
                b[a] && (b[a] = b[a].destroy())
            });
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function (a, b) {
            var c, d = this.crosshair,
                e = d.animation;
            if (!this.crosshair || !1 === (u(b) || !r(this.crosshair.snap, !0)) || b && b.series && b.series[this.coll] !== this)this.hideCrosshair(); else if (r(d.snap, !0) ? u(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : r(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null, null === c)this.hideCrosshair(); else if (this.cross)this.cross.attr({visibility: "visible"})[e ? "animate" : "attr"]({d: c},
                e); else e = this.categories && !this.isRadial, e = {
                "stroke-width": d.width || (e ? this.transA : 1),
                stroke: d.color || (e ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
                zIndex: d.zIndex || 2
            }, d.dashStyle && (e.dashstyle = d.dashStyle), this.cross = this.chart.renderer.path(c).attr(e).add()
        },
        hideCrosshair: function () {
            this.cross && this.cross.hide()
        }
    };
    A(ta.prototype, void 0);
    ta.prototype.getTimeTicks = function (a, b, c, d) {
        var e = [], f = {}, g = N.global.useUTC, h, k = new fa(b - Ca(b)), m = a.unitRange, l = a.count;
        if (u(b)) {
            k[sb](m >= C.second ? 0 : l * P(k.getMilliseconds() /
                l));
            if (m >= C.second)k[tb](m >= C.minute ? 0 : l * P(k.getSeconds() / l));
            if (m >= C.minute)k[ub](m >= C.hour ? 0 : l * P(k[gb]() / l));
            if (m >= C.hour)k[vb](m >= C.day ? 0 : l * P(k[hb]() / l));
            if (m >= C.day)k[jb](m >= C.month ? 1 : l * P(k[Ga]() / l));
            m >= C.month && (k[kb](m >= C.year ? 0 : l * P(k[Ha]() / l)), h = k[Ia]());
            if (m >= C.year)k[lb](h - h % l);
            if (m === C.week)k[jb](k[Ga]() - k[ib]() + r(d, 1));
            b = 1;
            if (eb || Oa)k = k.getTime(), k = new fa(k + Ca(k));
            h = k[Ia]();
            d = k.getTime();
            for (var q = k[Ha](), n = k[Ga](), p = (C.day + (g ? Ca(k) : 6E4 * k.getTimezoneOffset())) % C.day; d < c;)e.push(d), d = m ===
            C.year ? Ta(h + b * l, 0) : m === C.month ? Ta(h, q + b * l) : g || m !== C.day && m !== C.week ? d + m * l : Ta(h, q, n + b * l * (m === C.day ? 1 : 7)), b++;
            e.push(d);
            t(Xa(e, function (a) {
                return m <= C.hour && a % C.day === p
            }), function (a) {
                f[a] = "day"
            })
        }
        e.info = A(a, {higherRanks: f, totalRange: m * l});
        return e
    };
    ta.prototype.normalizeTimeTickInterval = function (a, b) {
        var c = b || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]],
            d = c[c.length - 1], e = C[d[0]], f = d[1], g;
        for (g = 0; g < c.length && !(d = c[g], e = C[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + C[c[g + 1][0]]) / 2); g++);
        e === C.year && a < 5 * e && (f = [1, 2, 5]);
        c = qb(a / e, f, "year" === d[0] ? y(Q.pow(10, P(Q.log(a / e) / Q.LN10)), 1) : 1);
        return {unitRange: e, count: c, unitName: d[0]}
    };
    var Bb = E.Tooltip = function () {
        this.init.apply(this, arguments)
    };
    Bb.prototype = {
        init: function (a, b) {
            var c = b.borderWidth, d = b.style, e = J(d.padding);
            this.chart = a;
            this.options = b;
            this.crosshairs = [];
            this.now = {x: 0, y: 0};
            this.isHidden = !0;
            this.label =
                a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
                    padding: e,
                    fill: b.backgroundColor,
                    "stroke-width": c,
                    r: b.borderRadius,
                    zIndex: 8
                }).css(d).css({padding: 0}).add().attr({y: -9999});
            aa || this.label.shadow(b.shadow);
            this.shared = b.shared
        }, destroy: function () {
            this.label && (this.label = this.label.destroy());
            clearTimeout(this.hideTimer);
            clearTimeout(this.tooltipTimeout)
        }, move: function (a, b, c, d) {
            var e = this, f = e.now, g = !1 !== e.options.animation && !e.isHidden && (1 < T(a - f.x) || 1 < T(b - f.y)), h =
                e.followPointer || 1 < e.len;
            A(f, {
                x: g ? (2 * f.x + a) / 3 : a,
                y: g ? (f.y + b) / 2 : b,
                anchorX: h ? w : g ? (2 * f.anchorX + c) / 3 : c,
                anchorY: h ? w : g ? (f.anchorY + d) / 2 : d
            });
            e.label.attr(f);
            g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                e && e.move(a, b, c, d)
            }, 32))
        }, hide: function (a) {
            var b = this;
            clearTimeout(this.hideTimer);
            this.isHidden || (this.hideTimer = setTimeout(function () {
                b.label.fadeOut();
                b.isHidden = !0
            }, r(a, this.options.hideDelay, 500)))
        }, getAnchor: function (a, b) {
            var c, d = this.chart, e = d.inverted, f = d.plotTop, g =
                d.plotLeft, h = 0, k = 0, m, l;
            a = ca(a);
            c = a[0].tooltipPos;
            this.followPointer && b && (b.chartX === w && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
            c || (t(a, function (a) {
                m = a.series.yAxis;
                l = a.series.xAxis;
                h += a.plotX + (!e && l ? l.left - g : 0);
                k += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && m ? m.top - f : 0)
            }), h /= a.length, k /= a.length, c = [e ? d.plotWidth - k : h, this.shared && !e && 1 < a.length && b ? b.chartY - f : e ? d.plotHeight - h : k]);
            return Ya(c, x)
        }, getPosition: function (a, b, c) {
            var d = this.chart, e = this.distance, f = {}, g = c.h || 0,
                h, k = ["y", d.chartHeight, b, c.plotY + d.plotTop, d.plotTop, d.plotTop + d.plotHeight], m = ["x", d.chartWidth, a, c.plotX + d.plotLeft, d.plotLeft, d.plotLeft + d.plotWidth], l = r(c.ttBelow, d.inverted && !c.negative || !d.inverted && c.negative), q = function (a, b, c, d, h, k) {
                    var m = c < d - e, n = d + e + c < b, p = d - e - c;
                    d += e;
                    if (l && n)f[a] = d; else if (!l && m)f[a] = p; else if (m)f[a] = I(k - c, 0 > p - g ? p : p - g); else if (n)f[a] = y(h, d + g + c > b ? d : d + g); else return !1
                }, n = function (a, b, c, d) {
                    if (d < e || d > b - e)return !1;
                    f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2
                }, p = function (a) {
                    var b = k;
                    k = m;
                    m = b;
                    h = a
                }, z = function () {
                    !1 !== q.apply(0, k) ? !1 !== n.apply(0, m) || h || (p(!0), z()) : h ? f.x = f.y = 0 : (p(!0), z())
                };
            (d.inverted || 1 < this.len) && p();
            z();
            return f
        }, defaultFormatter: function (a) {
            var b = this.points || ca(this), c;
            c = [a.tooltipFooterHeaderFormatter(b[0])];
            c = c.concat(a.bodyFormatter(b));
            c.push(a.tooltipFooterHeaderFormatter(b[0], !0));
            return c.join("")
        }, refresh: function (a, b) {
            var c = this.chart, d = this.label, e = this.options, f, g, h, k = {}, m, l = [];
            m = e.formatter || this.defaultFormatter;
            var k = c.hoverPoints, q, n = this.shared;
            clearTimeout(this.hideTimer);
            this.followPointer = ca(a)[0].series.tooltipOptions.followPointer;
            h = this.getAnchor(a, b);
            f = h[0];
            g = h[1];
            !n || a.series && a.series.noSharedTooltip ? k = a.getLabelConfig() : (c.hoverPoints = a, k && t(k, function (a) {
                a.setState()
            }), t(a, function (a) {
                a.setState("hover");
                l.push(a.getLabelConfig())
            }), k = {x: a[0].category, y: a[0].y}, k.points = l, this.len = l.length, a = a[0]);
            m = m.call(k, this);
            k = a.series;
            this.distance = r(k.tooltipOptions.distance, 16);
            !1 === m ? this.hide() : (this.isHidden && (ob(d), d.attr("opacity", 1).show()), d.attr({text: m}),
                q = e.borderColor || a.color || k.color || "#606060", d.attr({stroke: q}), this.updatePosition({
                plotX: f,
                plotY: g,
                negative: a.negative,
                ttBelow: a.ttBelow,
                h: h[2] || 0
            }), this.isHidden = !1);
            F(c, "tooltipRefresh", {text: m, x: f + c.plotLeft, y: g + c.plotTop, borderColor: q})
        }, updatePosition: function (a) {
            var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
            this.move(x(c.x), x(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop)
        }, getXDateFormat: function (a, b, c) {
            var d;
            b = b.dateTimeLabelFormats;
            var e = c && c.closestPointRange, f, g = {
                millisecond: 15,
                second: 12,
                minute: 9,
                hour: 6,
                day: 3
            }, h, k = "millisecond";
            if (e) {
                h = va("%m-%d %H:%M:%S.%L", a.x);
                for (f in C) {
                    if (e === C.week && +va("%w", a.x) === c.options.startOfWeek && "00:00:00.000" === h.substr(6)) {
                        f = "week";
                        break
                    } else if (C[f] > e) {
                        f = k;
                        break
                    } else if (g[f] && h.substr(g[f]) !== "01-01 00:00:00.000".substr(g[f]))break;
                    "week" !== f && (k = f)
                }
                f && (d = b[f])
            } else d = b.day;
            return d || b.year
        }, tooltipFooterHeaderFormatter: function (a, b) {
            var c = b ? "footer" : "header", d = a.series, e = d.tooltipOptions,
                f = e.xDateFormat, g = d.xAxis, h = g && "datetime" === g.options.type && ja(a.key), c = e[c + "Format"];
            h && !f && (f = this.getXDateFormat(a, e, g));
            h && f && (c = c.replace("{point.key}", "{point.key:" + f + "}"));
            return Da(c, {point: a, series: d})
        }, bodyFormatter: function (a) {
            return Ya(a, function (a) {
                var c = a.series.tooltipOptions;
                return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat)
            })
        }
    };
    var Aa;
    Ka = D.documentElement.ontouchstart !== w;
    var Cb = E.Pointer = function (a, b) {
        this.init(a, b)
    };
    Cb.prototype = {
        init: function (a, b) {
            var c =
                b.chart, d = c.events, e = aa ? "" : c.zoomType, c = a.inverted, f;
            this.options = b;
            this.chart = a;
            this.zoomX = f = /x/.test(e);
            this.zoomY = e = /y/.test(e);
            this.zoomHor = f && !c || e && c;
            this.zoomVert = e && !c || f && c;
            this.hasZoom = f || e;
            this.runChartClick = d && !!d.click;
            this.pinchDown = [];
            this.lastValidTouch = {};
            E.Tooltip && b.tooltip.enabled && (a.tooltip = new Bb(a, b.tooltip), this.followTouchMove = r(b.tooltip.followTouchMove, !0));
            this.setDOMEvents()
        }, normalize: function (a, b) {
            var c, d;
            a = a || window.event;
            a = Jb(a);
            a.target || (a.target = a.srcElement);
            d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
            b || (this.chartPosition = b = Ib(this.chart.container));
            d.pageX === w ? (c = y(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
            return A(a, {chartX: x(c), chartY: x(d)})
        }, getCoordinates: function (a) {
            var b = {xAxis: [], yAxis: []};
            t(this.chart.axes, function (c) {
                b[c.isXAxis ? "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
            });
            return b
        }, runPointActions: function (a) {
            var b = this.chart, c = b.series, d = b.tooltip, e = d ? d.shared :
                !1, f = b.hoverPoint, g = b.hoverSeries, h, k = Number.MAX_VALUE, m, l, q = [], n, p;
            if (!e && !g)for (h = 0; h < c.length; h++)if (c[h].directTouch || !c[h].options.stickyTracking)c = [];
            g && (e ? g.noSharedTooltip : g.directTouch) && f ? n = f : (t(c, function (b) {
                m = b.noSharedTooltip && e;
                l = !e && b.directTouch;
                b.visible && !m && !l && r(b.options.enableMouseTracking, !0) && (p = b.searchPoint(a, !m && 1 === b.kdDimensions)) && q.push(p)
            }), t(q, function (a) {
                a && "number" === typeof a.dist && a.dist < k && (k = a.dist, n = a)
            }));
            if (n && (n !== this.prevKDPoint || d && d.isHidden)) {
                if (e && !n.series.noSharedTooltip) {
                    for (h =
                             q.length; h--;)(q[h].clientX !== n.clientX || q[h].series.noSharedTooltip) && q.splice(h, 1);
                    q.length && d && d.refresh(q, a);
                    t(q, function (b) {
                        b.onMouseOver(a, b !== (g && g.directTouch && f || n))
                    })
                } else if (d && d.refresh(n, a), !g || !g.directTouch)n.onMouseOver(a);
                this.prevKDPoint = n
            } else c = g && g.tooltipOptions.followPointer, d && c && !d.isHidden && (c = d.getAnchor([{}], a), d.updatePosition({
                plotX: c[0],
                plotY: c[1]
            }));
            d && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function (a) {
                if (V[Aa])V[Aa].pointer.onDocumentMouseMove(a)
            },
                M(D, "mousemove", this._onDocumentMouseMove));
            t(b.axes, function (b) {
                b.drawCrosshair(a, r(n, f))
            })
        }, reset: function (a, b) {
            var c = this.chart, d = c.hoverSeries, e = c.hoverPoint, f = c.hoverPoints, g = c.tooltip, h = g && g.shared ? f : e;
            (a = a && g && h) && ca(h)[0].plotX === w && (a = !1);
            if (a)g.refresh(h), e && (e.setState(e.state, !0), t(c.axes, function (a) {
                r(a.options.crosshair && a.options.crosshair.snap, !0) ? a.drawCrosshair(null, e) : a.hideCrosshair()
            })); else {
                if (e)e.onMouseOut();
                f && t(f, function (a) {
                    a.setState()
                });
                if (d)d.onMouseOut();
                g && g.hide(b);
                this._onDocumentMouseMove && (U(D, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null);
                t(c.axes, function (a) {
                    a.hideCrosshair()
                });
                this.hoverX = c.hoverPoints = c.hoverPoint = null
            }
        }, scaleGroups: function (a, b) {
            var c = this.chart, d;
            t(c.series, function (e) {
                d = a || e.getPlotBox();
                e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
            });
            c.clipRect.attr(b || c.clipBox)
        }, dragStart: function (a) {
            var b =
                this.chart;
            b.mouseIsDown = a.type;
            b.cancelClick = !1;
            b.mouseDownX = this.mouseDownX = a.chartX;
            b.mouseDownY = this.mouseDownY = a.chartY
        }, drag: function (a) {
            var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, f = this.zoomHor, g = this.zoomVert, h = b.plotLeft, k = b.plotTop, m = b.plotWidth, l = b.plotHeight, q, n = this.selectionMarker, p = this.mouseDownX, r = this.mouseDownY, v = c.panKey && a[c.panKey + "Key"];
            n && n.touch || (d < h ? d = h : d > h + m && (d = h + m), e < k ? e = k : e > k + l && (e = k + l), this.hasDragged = Math.sqrt(Math.pow(p - d, 2) + Math.pow(r - e, 2)), 10 < this.hasDragged &&
            (q = b.isInsidePlot(p - h, r - k), b.hasCartesianSeries && (this.zoomX || this.zoomY) && q && !v && !n && (this.selectionMarker = n = b.renderer.rect(h, k, f ? 1 : m, g ? 1 : l, 0).attr({
                fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                zIndex: 7
            }).add()), n && f && (d -= p, n.attr({
                width: T(d),
                x: (0 < d ? 0 : d) + p
            })), n && g && (d = e - r, n.attr({
                height: T(d),
                y: (0 < d ? 0 : d) + r
            })), q && !n && c.panning && b.pan(a, c.panning)))
        }, drop: function (a) {
            var b = this, c = this.chart, d = this.hasPinched;
            if (this.selectionMarker) {
                var e = {xAxis: [], yAxis: [], originalEvent: a.originalEvent || a},
                    f = this.selectionMarker, g = f.attr ? f.attr("x") : f.x, h = f.attr ? f.attr("y") : f.y, k = f.attr ? f.attr("width") : f.width, m = f.attr ? f.attr("height") : f.height, l;
                if (this.hasDragged || d)t(c.axes, function (c) {
                    if (c.zoomEnabled && u(c.min) && (d || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                        var f = c.horiz, p = "touchend" === a.type ? c.minPixelPadding : 0, r = c.toValue((f ? g : h) + p), f = c.toValue((f ? g + k : h + m) - p);
                        e[c.coll].push({axis: c, min: I(r, f), max: y(r, f)});
                        l = !0
                    }
                }), l && F(c, "selection", e, function (a) {
                    c.zoom(A(a, d ? {animation: !1} : null))
                });
                this.selectionMarker =
                    this.selectionMarker.destroy();
                d && this.scaleGroups()
            }
            c && (R(c.container, {cursor: c._cursor}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
        }, onContainerMouseDown: function (a) {
            a = this.normalize(a);
            a.preventDefault && a.preventDefault();
            this.dragStart(a)
        }, onDocumentMouseUp: function (a) {
            V[Aa] && V[Aa].pointer.drop(a)
        }, onDocumentMouseMove: function (a) {
            var b = this.chart, c = this.chartPosition;
            a = this.normalize(a, c);
            !c || this.inClass(a.target, "highcharts-tracker") ||
            b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
        }, onContainerMouseLeave: function () {
            var a = V[Aa];
            a && (a.pointer.reset(), a.pointer.chartPosition = null)
        }, onContainerMouseMove: function (a) {
            var b = this.chart;
            Aa = b.index;
            a = this.normalize(a);
            a.returnValue = !1;
            "mousedown" === b.mouseIsDown && this.drag(a);
            !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || b.openMenu || this.runPointActions(a)
        }, inClass: function (a, b) {
            for (var c; a;) {
                if (c = L(a, "class")) {
                    if (-1 !==
                        c.indexOf(b))return !0;
                    if (-1 !== c.indexOf("highcharts-container"))return !1
                }
                a = a.parentNode
            }
        }, onTrackerMouseOut: function (a) {
            var b = this.chart.hoverSeries;
            a = a.relatedTarget || a.toElement;
            if (b && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && !this.inClass(a, "highcharts-series-" + b.index))b.onMouseOut()
        }, onContainerClick: function (a) {
            var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop;
            a = this.normalize(a);
            a.originalEvent = a;
            b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ?
                (F(c.series, "click", A(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (A(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && F(b, "click", a)))
        }, setDOMEvents: function () {
            var a = this, b = a.chart.container;
            b.onmousedown = function (b) {
                a.onContainerMouseDown(b)
            };
            b.onmousemove = function (b) {
                a.onContainerMouseMove(b)
            };
            b.onclick = function (b) {
                a.onContainerClick(b)
            };
            M(b, "mouseleave", a.onContainerMouseLeave);
            1 === La && M(D, "mouseup", a.onDocumentMouseUp);
            Ka && (b.ontouchstart = function (b) {
                a.onContainerTouchStart(b)
            },
                b.ontouchmove = function (b) {
                    a.onContainerTouchMove(b)
                }, 1 === La && M(D, "touchend", a.onDocumentTouchEnd))
        }, destroy: function () {
            var a;
            U(this.chart.container, "mouseleave", this.onContainerMouseLeave);
            La || (U(D, "mouseup", this.onDocumentMouseUp), U(D, "touchend", this.onDocumentTouchEnd));
            clearInterval(this.tooltipTimeout);
            for (a in this)this[a] = null
        }
    };
    var ab = E.Legend = function (a, b) {
        this.init(a, b)
    };
    ab.prototype = {
        init: function (a, b) {
            var c = this, d = b.itemStyle, e = b.itemMarginTop || 0;
            this.options = b;
            b.enabled && (c.itemStyle =
                d, c.itemHiddenStyle = H(d, b.itemHiddenStyle), c.itemMarginTop = e, c.padding = d = r(b.padding, 8), c.initialItemX = d, c.initialItemY = d - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.symbolWidth = r(b.symbolWidth, 16), c.pages = [], c.render(), M(c.chart, "endResize", function () {
                c.positionCheckboxes()
            }))
        }, colorizeItem: function (a, b) {
            var c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, h = b ? a.legendColor || a.color || "#CCC" : g, g = a.options && a.options.marker, k = {fill: h},
                m;
            d && d.css({fill: c, color: c});
            e && e.attr({stroke: h});
            if (f) {
                if (g && f.isMarker)for (m in k.stroke = h, g = a.convertAttribs(g), g)d = g[m], d !== w && (k[m] = d);
                f.attr(k)
            }
        }, positionItem: function (a) {
            var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
            (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
            f && (f.x = e, f.y = d)
        }, destroyItem: function (a) {
            var b = a.checkbox;
            t(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                a[b] && (a[b] = a[b].destroy())
            });
            b && Ra(a.checkbox)
        }, destroy: function () {
            var a = this.group, b = this.box;
            b && (this.box = b.destroy());
            a && (this.group = a.destroy())
        }, positionCheckboxes: function (a) {
            var b = this.group.alignAttr, c, d = this.clipHeight || this.legendHeight;
            b && (c = b.translateY, t(this.allItems, function (e) {
                var f = e.checkbox, g;
                f && (g = c + f.y + (a || 0) + 3, R(f, {
                    left: b.translateX + e.checkboxOffset + f.x - 20 + "px",
                    top: g + "px",
                    display: g > c - 6 && g < c + d - 6 ? "" : "none"
                }))
            }))
        }, renderTitle: function () {
            var a = this.padding, b = this.options.title, c = 0;
            b.text && (this.title || (this.title =
                this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: c}));
            this.titleHeight = c
        }, setText: function (a) {
            var b = this.options;
            a.legendItem.attr({text: b.labelFormat ? Da(b.labelFormat, a) : b.labelFormatter.call(a)})
        }, renderItem: function (a) {
            var b = this.chart, c = b.renderer, d = this.options, e = "horizontal" === d.layout, f = this.symbolWidth, g = d.symbolPadding,
                h = this.itemStyle, k = this.itemHiddenStyle, m = this.padding, l = e ? r(d.itemDistance, 20) : 0, q = !d.rtl, n = d.width, p = d.itemMarginBottom || 0, t = this.itemMarginTop, v = this.initialItemX, u = a.legendItem, B = a.series && a.series.drawLegendSymbol ? a.series : a, w = B.options, w = this.createCheckboxForItem && w && w.showCheckbox, A = d.useHTML;
            u || (a.legendGroup = c.g("legend-item").attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = u = c.text("", q ? f + g : -g, this.baseline || 0, A).css(H(a.visible ? h : k)).attr({
                align: q ? "left" : "right",
                zIndex: 2
            }).add(a.legendGroup),
            this.baseline || (this.fontMetrics = c.fontMetrics(h.fontSize, u), this.baseline = this.fontMetrics.f + 3 + t, u.attr("y", this.baseline)), B.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, u, A, h, k), this.colorizeItem(a, a.visible), w && this.createCheckboxForItem(a));
            this.setText(a);
            c = u.getBBox();
            f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + l + (w ? 20 : 0);
            this.itemHeight = g = x(a.legendItemHeight || c.height);
            e && this.itemX - v + f > (n || b.chartWidth - 2 * m - v - d.x) && (this.itemX = v, this.itemY += t + this.lastLineHeight +
                p, this.lastLineHeight = 0);
            this.maxItemWidth = y(this.maxItemWidth, f);
            this.lastItemY = t + this.itemY + p;
            this.lastLineHeight = y(g, this.lastLineHeight);
            a._legendItemPos = [this.itemX, this.itemY];
            e ? this.itemX += f : (this.itemY += t + g + p, this.lastLineHeight = g);
            this.offsetWidth = n || y((e ? this.itemX - v - l : f) + m, this.offsetWidth)
        }, getAllItems: function () {
            var a = [];
            t(this.chart.series, function (b) {
                var c = b.options;
                r(c.showInLegend, u(c.linkedTo) ? !1 : w, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
            });
            return a
        }, adjustMargins: function (a,
                                    b) {
            var c = this.chart, d = this.options, e = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
            this.display && !d.floating && t([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (f, g) {
                f.test(e) && !u(a[g]) && (c[Ua[g]] = y(c[Ua[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + r(d.margin, 12) + b[g]))
            })
        }, render: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.group, e, f, g, h, k = a.box, m = a.options, l = a.padding, q = m.borderWidth, n = m.backgroundColor;
            a.itemX = a.initialItemX;
            a.itemY = a.initialItemY;
            a.offsetWidth = 0;
            a.lastItemY = 0;
            d || (a.group = d = c.g("legend").attr({zIndex: 7}).add(), a.contentGroup = c.g().attr({zIndex: 1}).add(d), a.scrollGroup = c.g().add(a.contentGroup));
            a.renderTitle();
            e = a.getAllItems();
            fb(e, function (a, b) {
                return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
            });
            m.reversed && e.reverse();
            a.allItems = e;
            a.display = f = !!e.length;
            a.lastLineHeight = 0;
            t(e, function (b) {
                a.renderItem(b)
            });
            g = (m.width || a.offsetWidth) + l;
            h = a.lastItemY + a.lastLineHeight + a.titleHeight;
            h = a.handleOverflow(h);
            h += l;
            if (q || n)k ? 0 < g && 0 < h && (k[k.isNew ? "attr" : "animate"](k.crisp({
                width: g,
                height: h
            })), k.isNew = !1) : (a.box = k = c.rect(0, 0, g, h, m.borderRadius, q || 0).attr({
                stroke: m.borderColor,
                "stroke-width": q || 0,
                fill: n || "none"
            }).add(d).shadow(m.shadow), k.isNew = !0), k[f ? "show" : "hide"]();
            a.legendWidth = g;
            a.legendHeight = h;
            t(e, function (b) {
                a.positionItem(b)
            });
            f && d.align(A({width: g, height: h}, m), !0, "spacingBox");
            b.isResizing || this.positionCheckboxes()
        }, handleOverflow: function (a) {
            var b = this, c = this.chart, d = c.renderer,
                e = this.options, f = e.y, f = c.spacingBox.height + ("top" === e.verticalAlign ? -f : f) - this.padding, g = e.maxHeight, h, k = this.clipRect, m = e.navigation, l = r(m.animation, !0), q = m.arrowSize || 12, n = this.nav, p = this.pages, z = this.padding, v, u = this.allItems, B = function (a) {
                    k.attr({height: a});
                    b.contentGroup.div && (b.contentGroup.div.style.clip = "rect(" + z + "px,9999px," + (z + a) + "px,0)")
                };
            "horizontal" === e.layout && (f /= 2);
            g && (f = I(f, g));
            p.length = 0;
            a > f ? (this.clipHeight = h = y(f - 20 - this.titleHeight - z, 0), this.currentPage = r(this.currentPage, 1), this.fullHeight =
                a, t(u, function (a, b) {
                var c = a._legendItemPos[1], d = x(a.legendItem.getBBox().height), e = p.length;
                if (!e || c - p[e - 1] > h && (v || c) !== p[e - 1])p.push(v || c), e++;
                b === u.length - 1 && c + d - p[e - 1] > h && p.push(c);
                c !== v && (v = c)
            }), k || (k = b.clipRect = d.clipRect(0, z, 9999, 0), b.contentGroup.clip(k)), B(h), n || (this.nav = n = d.g().attr({zIndex: 1}).add(this.group), this.up = d.symbol("triangle", 0, 0, q, q).on("click", function () {
                b.scroll(-1, l)
            }).add(n), this.pager = d.text("", 15, 10).css(m.style).add(n), this.down = d.symbol("triangle-down", 0, 0, q, q).on("click",
                function () {
                    b.scroll(1, l)
                }).add(n)), b.scroll(0), a = f) : n && (B(c.chartHeight), n.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
            return a
        }, scroll: function (a, b) {
            var c = this.pages, d = c.length, e = this.currentPage + a, f = this.clipHeight, g = this.options.navigation, h = g.activeColor, g = g.inactiveColor, k = this.pager, m = this.padding;
            e > d && (e = d);
            0 < e && (b !== w && Fa(b, this.chart), this.nav.attr({
                translateX: m,
                translateY: f + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({fill: 1 === e ? g : h}).css({
                cursor: 1 ===
                e ? "default" : "pointer"
            }), k.attr({text: e + "/" + d}), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: e === d ? g : h
            }).css({cursor: e === d ? "default" : "pointer"}), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage = e, this.positionCheckboxes(c))
        }
    };
    var Db = E.LegendSymbolMixin = {
        drawRectangle: function (a, b) {
            var c = a.options.symbolHeight || a.fontMetrics.f;
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - c + 1, a.symbolWidth, c, a.options.symbolRadius || 0).attr({zIndex: 3}).add(b.legendGroup)
        },
        drawLineMarker: function (a) {
            var b = this.options, c = b.marker, d;
            d = a.symbolWidth;
            var e = this.chart.renderer, f = this.legendGroup;
            a = a.baseline - x(.3 * a.fontMetrics.b);
            var g;
            b.lineWidth && (g = {"stroke-width": b.lineWidth}, b.dashStyle && (g.dashstyle = b.dashStyle), this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f));
            c && !1 !== c.enabled && (b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0)
        }
    };
    (/Trident\/7\.0/.test(ma) || Ja) && Ab(ab.prototype, "positionItem", function (a, b) {
        var c =
            this, d = function () {
            b._legendItemPos && a.call(c, b)
        };
        d();
        setTimeout(d)
    });
    var pb = E.Chart = function () {
        this.init.apply(this, arguments)
    };
    pb.prototype = {
        callbacks: [], init: function (a, b) {
            var c, d = a.series;
            a.series = null;
            c = H(N, a);
            c.series = a.series = d;
            this.userOptions = a;
            d = c.chart;
            this.margin = this.splashArray("margin", d);
            this.spacing = this.splashArray("spacing", d);
            var e = d.events;
            this.bounds = {h: {}, v: {}};
            this.callback = b;
            this.isResizing = 0;
            this.options = c;
            this.axes = [];
            this.series = [];
            this.hasCartesianSeries = d.showAxes;
            var f =
                this, g;
            f.index = V.length;
            V.push(f);
            La++;
            !1 !== d.reflow && M(f, "load", function () {
                f.initReflow()
            });
            if (e)for (g in e)M(f, g, e[g]);
            f.xAxis = [];
            f.yAxis = [];
            f.animation = aa ? !1 : r(d.animation, !0);
            f.pointCount = f.colorCounter = f.symbolCounter = 0;
            f.firstRender()
        }, initSeries: function (a) {
            var b = this.options.chart;
            (b = X[a.type || b.type || b.defaultSeriesType]) || Z(17, !0);
            b = new b;
            b.init(this, a);
            return b
        }, isInsidePlot: function (a, b, c) {
            var d = c ? b : a;
            a = c ? a : b;
            return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
        }, redraw: function (a) {
            var b =
                this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, g, h, k = this.hasCartesianSeries, m = this.isDirtyBox, l = c.length, q = l, n = this.renderer, p = n.isHidden(), r = [];
            Fa(a, this);
            p && this.cloneRenderTo();
            for (this.layOutTitles(); q--;)if (a = c[q], a.options.stacking && (g = !0, a.isDirty)) {
                h = !0;
                break
            }
            if (h)for (q = l; q--;)a = c[q], a.options.stacking && (a.isDirty = !0);
            t(c, function (a) {
                a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), f = !0)
            });
            f && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
            g && this.getStacks();
            k && !this.isResizing && (this.maxTicks = null, t(b, function (a) {
                a.setScale()
            }));
            this.getMargins();
            k && (t(b, function (a) {
                a.isDirty && (m = !0)
            }), t(b, function (a) {
                var b = a.min + "," + a.max;
                a.extKey !== b && (a.extKey = b, r.push(function () {
                    F(a, "afterSetExtremes", A(a.eventArgs, a.getExtremes()));
                    delete a.eventArgs
                }));
                (m || g) && a.redraw()
            }));
            m && this.drawChartBox();
            t(c, function (a) {
                a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
            });
            d && d.reset(!0);
            n.draw();
            F(this, "redraw");
            p && this.cloneRenderTo(!0);
            t(r, function (a) {
                a.call()
            })
        }, get: function (a) {
            var b = this.axes, c = this.series, d, e;
            for (d = 0; d < b.length; d++)if (b[d].options.id === a)return b[d];
            for (d = 0; d < c.length; d++)if (c[d].options.id === a)return c[d];
            for (d = 0; d < c.length; d++)for (e = c[d].points || [], b = 0; b < e.length; b++)if (e[b].id === a)return e[b];
            return null
        }, getAxes: function () {
            var a = this, b = this.options, c = b.xAxis = ca(b.xAxis || {}), b = b.yAxis = ca(b.yAxis || {});
            t(c, function (a, b) {
                a.index = b;
                a.isX = !0
            });
            t(b, function (a, b) {
                a.index = b
            });
            c = c.concat(b);
            t(c, function (b) {
                new ta(a,
                    b)
            })
        }, getSelectedPoints: function () {
            var a = [];
            t(this.series, function (b) {
                a = a.concat(Xa(b.points || [], function (a) {
                    return a.selected
                }))
            });
            return a
        }, getSelectedSeries: function () {
            return Xa(this.series, function (a) {
                return a.selected
            })
        }, setTitle: function (a, b, c) {
            var d = this, e = d.options, f;
            f = e.title = H(e.title, a);
            e = e.subtitle = H(e.subtitle, b);
            t([["title", a, f], ["subtitle", b, e]], function (a) {
                var b = a[0], c = d[b], e = a[1];
                a = a[2];
                c && e && (d[b] = c = c.destroy());
                a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                    align: a.align,
                    "class": "highcharts-" + b, zIndex: a.zIndex || 4
                }).css(a.style).add())
            });
            d.layOutTitles(c)
        }, layOutTitles: function (a) {
            var b = 0, c = this.title, d = this.subtitle, e = this.options, f = e.title, e = e.subtitle, g = this.renderer, h = this.spacingBox.width - 44;
            c && (c.css({width: (f.width || h) + "px"}).align(A({y: g.fontMetrics(f.style.fontSize, c).b - 3}, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = c.getBBox().height));
            d && (d.css({width: (e.width || h) + "px"}).align(A({y: b + (f.margin - 13) + g.fontMetrics(e.style.fontSize, c).b}, e), !1, "spacingBox"),
            e.floating || e.verticalAlign || (b = ga(b + d.getBBox().height)));
            c = this.titleOffset !== b;
            this.titleOffset = b;
            !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && r(a, !0) && this.isDirtyBox && this.redraw())
        }, getChartSize: function () {
            var a = this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo;
            u(b) || (this.containerWidth = Wa(c, "width"));
            u(a) || (this.containerHeight = Wa(c, "height"));
            this.chartWidth = y(0, b || this.containerWidth || 600);
            this.chartHeight = y(0, r(a, 19 < this.containerHeight ? this.containerHeight :
                400))
        }, cloneRenderTo: function (a) {
            var b = this.renderToClone, c = this.container;
            a ? b && (this.renderTo.appendChild(c), Ra(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), R(b, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), b.style.setProperty && b.style.setProperty("display", "block", "important"), D.body.appendChild(b), c && b.appendChild(c))
        }, getContainer: function () {
            var a, b = this.options, c = b.chart, d, e, f;
            this.renderTo =
                a = c.renderTo;
            f = "highcharts-" + mb++;
            ia(a) && (this.renderTo = a = D.getElementById(a));
            a || Z(13, !0);
            d = J(L(a, "data-highcharts-chart"));
            !isNaN(d) && V[d] && V[d].hasRendered && V[d].destroy();
            L(a, "data-highcharts-chart", this.index);
            a.innerHTML = "";
            c.skipClone || a.offsetWidth || this.cloneRenderTo();
            this.getChartSize();
            d = this.chartWidth;
            e = this.chartHeight;
            this.container = a = la("div", {
                className: "highcharts-container" + (c.className ? " " + c.className : ""),
                id: f
            }, A({
                position: "relative", overflow: "hidden", width: d + "px", height: e + "px",
                textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, c.style), this.renderToClone || a);
            this._cursor = a.style.cursor;
            this.renderer = new (E[c.renderer] || $a)(a, d, e, c.style, c.forExport, b.exporting && b.exporting.allowHTML);
            aa && this.renderer.create(this, a, d, e);
            this.renderer.chartIndex = this.index
        }, getMargins: function (a) {
            var b = this.spacing, c = this.margin, d = this.titleOffset;
            this.resetMargins();
            d && !u(c[0]) && (this.plotTop = y(this.plotTop, d + this.options.title.margin + b[0]));
            this.legend.adjustMargins(c,
                b);
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
            this.extraTopMargin && (this.plotTop += this.extraTopMargin);
            a || this.getAxisMargins()
        }, getAxisMargins: function () {
            var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin;
            a.hasCartesianSeries && t(a.axes, function (a) {
                a.visible && a.getOffset()
            });
            t(Ua, function (d, e) {
                u(c[e]) || (a[d] += b[e])
            });
            a.setChartSize()
        }, reflow: function (a) {
            var b = this, c = b.options.chart, d = b.renderTo, e = c.width || Wa(d, "width"), f = c.height || Wa(d, "height"), c = a ? a.target : O, d = function () {
                b.container &&
                (b.setSize(e, f, !1), b.hasUserSize = null)
            };
            if (!b.hasUserSize && !b.isPrinting && e && f && (c === O || c === D)) {
                if (e !== b.containerWidth || f !== b.containerHeight)clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d();
                b.containerWidth = e;
                b.containerHeight = f
            }
        }, initReflow: function () {
            var a = this, b = function (b) {
                a.reflow(b)
            };
            M(O, "resize", b);
            M(a, "destroy", function () {
                U(O, "resize", b)
            })
        }, setSize: function (a, b, c) {
            var d = this, e, f, g, h = d.renderer;
            d.isResizing += 1;
            g = function () {
                d && F(d, "endResize", null, function () {
                    --d.isResizing
                })
            };
            Fa(c, d);
            d.oldChartHeight = d.chartHeight;
            d.oldChartWidth = d.chartWidth;
            u(a) && (d.chartWidth = e = y(0, x(a)), d.hasUserSize = !!e);
            u(b) && (d.chartHeight = f = y(0, x(b)));
            a = h.globalAnimation;
            (a ? Za : R)(d.container, {width: e + "px", height: f + "px"}, a);
            d.setChartSize(!0);
            h.setSize(e, f, c);
            d.maxTicks = null;
            t(d.axes, function (a) {
                a.isDirty = !0;
                a.setScale()
            });
            t(d.series, function (a) {
                a.isDirty = !0
            });
            d.isDirtyLegend = !0;
            d.isDirtyBox = !0;
            d.layOutTitles();
            d.getMargins();
            d.redraw(c);
            d.oldChartHeight = null;
            F(d, "resize");
            a = h.globalAnimation;
            !1 ===
            a ? g() : setTimeout(g, a && a.duration || 500)
        }, setChartSize: function (a) {
            var b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = this.spacing, h = this.clipOffset, k, m, l, q;
            this.plotLeft = k = x(this.plotLeft);
            this.plotTop = m = x(this.plotTop);
            this.plotWidth = l = y(0, x(d - k - this.marginRight));
            this.plotHeight = q = y(0, x(e - m - this.marginBottom));
            this.plotSizeX = b ? q : l;
            this.plotSizeY = b ? l : q;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox = c.spacingBox = {
                x: g[3], y: g[0], width: d - g[3] - g[1],
                height: e - g[0] - g[2]
            };
            this.plotBox = c.plotBox = {x: k, y: m, width: l, height: q};
            d = 2 * P(this.plotBorderWidth / 2);
            b = ga(y(d, h[3]) / 2);
            c = ga(y(d, h[0]) / 2);
            this.clipBox = {
                x: b,
                y: c,
                width: P(this.plotSizeX - y(d, h[1]) / 2 - b),
                height: y(0, P(this.plotSizeY - y(d, h[2]) / 2 - c))
            };
            a || t(this.axes, function (a) {
                a.setAxisSize();
                a.setAxisTranslation()
            })
        }, resetMargins: function () {
            var a = this;
            t(Ua, function (b, c) {
                a[b] = r(a.margin[c], a.spacing[c])
            });
            a.axisOffset = [0, 0, 0, 0];
            a.clipOffset = [0, 0, 0, 0]
        }, drawChartBox: function () {
            var a = this.options.chart, b = this.renderer,
                c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, k = a.borderWidth || 0, m = a.backgroundColor, l = a.plotBackgroundColor, q = a.plotBackgroundImage, n = a.plotBorderWidth || 0, p, r = this.plotLeft, t = this.plotTop, u = this.plotWidth, B = this.plotHeight, w = this.plotBox, y = this.clipRect, x = this.clipBox;
            p = k + (a.shadow ? 8 : 0);
            if (k || m)e ? e.animate(e.crisp({
                width: c - p,
                height: d - p
            })) : (e = {fill: m || "none"}, k && (e.stroke = a.borderColor, e["stroke-width"] = k), this.chartBackground =
                b.rect(p / 2, p / 2, c - p, d - p, a.borderRadius, k).attr(e).addClass("highcharts-background").add().shadow(a.shadow));
            l && (f ? f.animate(w) : this.plotBackground = b.rect(r, t, u, B, 0).attr({fill: l}).add().shadow(a.plotShadow));
            q && (h ? h.animate(w) : this.plotBGImage = b.image(q, r, t, u, B).add());
            y ? y.animate({width: x.width, height: x.height}) : this.clipRect = b.clipRect(x);
            n && (g ? g.animate(g.crisp({
                x: r,
                y: t,
                width: u,
                height: B,
                strokeWidth: -n
            })) : this.plotBorder = b.rect(r, t, u, B, 0, -n).attr({
                stroke: a.plotBorderColor, "stroke-width": n, fill: "none",
                zIndex: 1
            }).add());
            this.isDirtyBox = !1
        }, propFromSeries: function () {
            var a = this, b = a.options.chart, c, d = a.options.series, e, f;
            t(["inverted", "angular", "polar"], function (g) {
                c = X[b.type || b.defaultSeriesType];
                f = a[g] || b[g] || c && c.prototype[g];
                for (e = d && d.length; !f && e--;)(c = X[d[e].type]) && c.prototype[g] && (f = !0);
                a[g] = f
            })
        }, linkSeries: function () {
            var a = this, b = a.series;
            t(b, function (a) {
                a.linkedSeries.length = 0
            });
            t(b, function (b) {
                var d = b.options.linkedTo;
                ia(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && (d.linkedSeries.push(b),
                    b.linkedParent = d, b.visible = r(b.options.visible, d.options.visible, b.visible))
            })
        }, renderSeries: function () {
            t(this.series, function (a) {
                a.translate();
                a.render()
            })
        }, renderLabels: function () {
            var a = this, b = a.options.labels;
            b.items && t(b.items, function (c) {
                var d = A(b.style, c.style), e = J(d.left) + a.plotLeft, f = J(d.top) + a.plotTop + 12;
                delete d.left;
                delete d.top;
                a.renderer.text(c.html, e, f).attr({zIndex: 2}).css(d).add()
            })
        }, render: function () {
            var a = this.axes, b = this.renderer, c = this.options, d, e, f, g;
            this.setTitle();
            this.legend =
                new ab(this, c.legend);
            this.getStacks && this.getStacks();
            this.getMargins(!0);
            this.setChartSize();
            d = this.plotWidth;
            e = this.plotHeight -= 13;
            t(a, function (a) {
                a.setScale()
            });
            this.getAxisMargins();
            f = 1.1 < d / this.plotWidth;
            g = 1.1 < e / this.plotHeight;
            if (f || g)this.maxTicks = null, t(a, function (a) {
                (a.horiz && f || !a.horiz && g) && a.setTickInterval(!0)
            }), this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries && t(a, function (a) {
                a.visible && a.render()
            });
            this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
            this.renderSeries();
            this.renderLabels();
            this.showCredits(c.credits);
            this.hasRendered = !0
        }, showCredits: function (a) {
            a.enabled && !this.credits && (this.credits = this.renderer.text(a.text, 0, 0).on("click", function () {
                a.href && (location.href = a.href)
            }).attr({align: a.position.align, zIndex: 8}).css(a.style).add().align(a.position))
        }, destroy: function () {
            var a = this, b = a.axes, c = a.series, d = a.container, e, f = d && d.parentNode;
            F(a, "destroy");
            V[a.index] = w;
            La--;
            a.renderTo.removeAttribute("data-highcharts-chart");
            U(a);
            for (e = b.length; e--;)b[e] =
                b[e].destroy();
            for (e = c.length; e--;)c[e] = c[e].destroy();
            t("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer scroller rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (b) {
                var c = a[b];
                c && c.destroy && (a[b] = c.destroy())
            });
            d && (d.innerHTML = "", U(d), f && Ra(d));
            for (e in a)delete a[e]
        }, isReadyToRender: function () {
            var a = this;
            return !W && O == O.top && "complete" !== D.readyState || aa && !O.canvg ? (aa ? CanVGController.push(function () {
                    a.firstRender()
                },
                a.options.global.canvasToolsURL) : D.attachEvent("onreadystatechange", function () {
                D.detachEvent("onreadystatechange", a.firstRender);
                "complete" === D.readyState && a.firstRender()
            }), !1) : !0
        }, firstRender: function () {
            var a = this, b = a.options, c = a.callback;
            a.isReadyToRender() && (a.getContainer(), F(a, "init"), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), t(b.series || [], function (b) {
                a.initSeries(b)
            }), a.linkSeries(), F(a, "beforeRender"), E.Pointer && (a.pointer = new Cb(a, b)), a.render(), a.renderer.draw(),
            c && c.apply(a, [a]), t(a.callbacks, function (b) {
                a.index !== w && b.apply(a, [a])
            }), F(a, "load"), a.cloneRenderTo(!0))
        }, splashArray: function (a, b) {
            var c = b[a], c = ba(c) ? c : [c, c, c, c];
            return [r(b[a + "Top"], c[0]), r(b[a + "Right"], c[1]), r(b[a + "Bottom"], c[2]), r(b[a + "Left"], c[3])]
        }
    };
    var Ba = function () {
    };
    Ba.prototype = {
        init: function (a, b, c) {
            this.series = a;
            this.color = a.color;
            this.applyOptions(b, c);
            this.pointAttr = {};
            a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter ===
            b.length && (a.colorCounter = 0));
            a.chart.pointCount++;
            return this
        }, applyOptions: function (a, b) {
            var c = this.series, d = c.options.pointValKey || c.pointValKey;
            a = Ba.prototype.optionsToObject.call(this, a);
            A(this, a);
            this.options = this.options ? A(this.options, a) : a;
            d && (this.y = this[d]);
            this.x === w && c && (this.x = b === w ? c.autoIncrement() : b);
            return this
        }, optionsToObject: function (a) {
            var b = {}, c = this.series, d = c.options.keys, e = d || c.pointArrayMap || ["y"], f = e.length, g = 0, h = 0;
            if ("number" === typeof a || null === a)b[e[0]] = a; else if (ua(a))for (!d &&
                                                                                     a.length > f && (c = typeof a[0], "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]), g++); h < f;)d && void 0 === a[g] || (b[e[h]] = a[g]), g++, h++; else"object" === typeof a && (b = a, a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
            return b
        }, destroy: function () {
            var a = this.series.chart, b = a.hoverPoints, c;
            a.pointCount--;
            b && (this.setState(), oa(b, this), b.length || (a.hoverPoints = null));
            if (this === a.hoverPoint)this.onMouseOut();
            if (this.graphic || this.dataLabel)U(this), this.destroyElements();
            this.legendItem && a.legend.destroyItem(this);
            for (c in this)this[c] = null
        }, destroyElements: function () {
            for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], b, c = 6; c--;)b = a[c], this[b] && (this[b] = this[b].destroy())
        }, getLabelConfig: function () {
            return {
                x: this.category,
                y: this.y,
                color: this.color,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        }, tooltipFormatter: function (a) {
            var b = this.series, c = b.tooltipOptions, d = r(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix ||
                "";
            t(b.pointArrayMap || ["y"], function (b) {
                b = "{point." + b;
                if (e || f)a = a.replace(b + "}", e + b + "}" + f);
                a = a.replace(b + "}", b + ":,." + d + "f}")
            });
            return Da(a, {point: this, series: this.series})
        }, firePointEvent: function (a, b, c) {
            var d = this, e = this.series.options;
            (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
            "click" === a && e.allowPointSelect && (c = function (a) {
                d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
            });
            F(this, a, b, c)
        }, visible: !0
    };
    var na = E.Series = function () {
    };
    na.prototype =
    {
        isCartesian: !0,
        type: "line",
        pointClass: Ba,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor", r: "radius"},
        directTouch: !1,
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function (a, b) {
            var c = this, d, e, f = a.series, g = function (a, b) {
                return r(a.options.index, a._i) - r(b.options.index, b._i)
            };
            c.chart = a;
            c.options = b = c.setOptions(b);
            c.linkedSeries = [];
            c.bindAxes();
            A(c, {
                name: b.name, state: "", pointAttr: {}, visible: !1 !== b.visible, selected: !0 ===
                b.selected
            });
            aa && (b.animation = !1);
            e = b.events;
            for (d in e)M(c, d, e[d]);
            if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)a.runTrackerClick = !0;
            c.getColor();
            c.getSymbol();
            t(c.parallelArrays, function (a) {
                c[a + "Data"] = []
            });
            c.setData(b.data, !1);
            c.isCartesian && (a.hasCartesianSeries = !0);
            f.push(c);
            c._i = f.length - 1;
            fb(f, g);
            this.yAxis && fb(this.yAxis.series, g);
            t(f, function (a, b) {
                a.index = b;
                a.name = a.name || "Series " + (b + 1)
            })
        },
        bindAxes: function () {
            var a = this, b = a.options, c = a.chart, d;
            t(a.axisTypes ||
                [], function (e) {
                t(c[e], function (c) {
                    d = c.options;
                    if (b[e] === d.index || b[e] !== w && b[e] === d.id || b[e] === w && 0 === d.index)c.series.push(a), a[e] = c, c.isDirty = !0
                });
                a[e] || a.optionalAxis === e || Z(18, !0)
            })
        },
        updateParallelArrays: function (a, b) {
            var c = a.series, d = arguments;
            t(c.parallelArrays, "number" === typeof b ? function (d) {
                var f = "y" === d && c.toYData ? c.toYData(a) : a[d];
                c[d + "Data"][b] = f
            } : function (a) {
                Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
            })
        },
        autoIncrement: function () {
            var a = this.options, b = this.xIncrement,
                c, d = a.pointIntervalUnit, b = r(b, a.pointStart, 0);
            this.pointInterval = c = r(this.pointInterval, a.pointInterval, 1);
            if ("month" === d || "year" === d)a = new fa(b), a = "month" === d ? +a[kb](a[Ha]() + c) : +a[lb](a[Ia]() + c), c = a - b;
            this.xIncrement = b + c;
            return b
        },
        getSegments: function () {
            var a = -1, b = [], c, d = this.points, e = d.length;
            if (e)if (this.options.connectNulls) {
                for (c = e; c--;)null === d[c].y && d.splice(c, 1);
                d.length && (b = [d])
            } else t(d, function (c, g) {
                null === c.y ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1))
            });
            this.segments =
                b
        },
        setOptions: function (a) {
            var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
            this.userOptions = a;
            c = H(e, c.series, a);
            this.tooltipOptions = H(N.tooltip, N.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
            null === e.marker && delete c.marker;
            this.zoneAxis = c.zoneAxis;
            a = this.zones = (c.zones || []).slice();
            !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                value: c[this.zoneAxis + "Threshold"] || c.threshold ||
                0, color: c.negativeColor, fillColor: c.negativeFillColor
            });
            a.length && u(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
            return c
        },
        getCyclic: function (a, b, c) {
            var d = this.userOptions, e = "_" + a + "Index", f = a + "Counter";
            b || (u(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]);
            this[a] = b
        },
        getColor: function () {
            this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || ra[this.type].color, this.chart.options.colors)
        },
        getSymbol: function () {
            var a =
                this.options.marker;
            this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
            /^url/.test(this.symbol) && (a.radius = 0)
        },
        drawLegendSymbol: Db.drawLineMarker,
        setData: function (a, b, c, d) {
            var e = this, f = e.points, g = f && f.length || 0, h, k = e.options, m = e.chart, l = null, q = e.xAxis, n = q && !!q.categories, p = k.turboThreshold, z = this.xData, v = this.yData, y = (h = e.pointArrayMap) && h.length;
            a = a || [];
            h = a.length;
            b = r(b, !0);
            if (!1 !== d && h && g === h && !e.cropped && !e.hasGroupedData && e.visible)t(a, function (a, b) {
                f[b].update && f[b].update(a, !1, null,
                    !1)
            }); else {
                e.xIncrement = null;
                e.pointRange = n ? 1 : k.pointRange;
                e.colorCounter = 0;
                t(this.parallelArrays, function (a) {
                    e[a + "Data"].length = 0
                });
                if (p && h > p) {
                    for (c = 0; null === l && c < h;)l = a[c], c++;
                    if (ja(l)) {
                        n = r(k.pointStart, 0);
                        l = r(k.pointInterval, 1);
                        for (c = 0; c < h; c++)z[c] = n, v[c] = a[c], n += l;
                        e.xIncrement = n
                    } else if (ua(l))if (y)for (c = 0; c < h; c++)l = a[c], z[c] = l[0], v[c] = l.slice(1, y + 1); else for (c = 0; c < h; c++)l = a[c], z[c] = l[0], v[c] = l[1]; else Z(12)
                } else for (c = 0; c < h; c++)a[c] !== w && (l = {series: e}, e.pointClass.prototype.applyOptions.apply(l,
                    [a[c]]), e.updateParallelArrays(l, c), n && u(l.name) && (q.names[l.x] = l.name));
                ia(v[0]) && Z(14, !0);
                e.data = [];
                e.options.data = a;
                for (c = g; c--;)f[c] && f[c].destroy && f[c].destroy();
                q && (q.minRange = q.userMinRange);
                e.isDirty = e.isDirtyData = m.isDirtyBox = !0;
                c = !1
            }
            "point" === k.legendType && (this.processData(), this.generatePoints());
            b && m.redraw(c)
        },
        processData: function (a) {
            var b = this.xData, c = this.yData, d = b.length, e;
            e = 0;
            var f, g, h = this.xAxis, k, m = this.options;
            k = m.cropThreshold;
            var l = this.getExtremesFromAll || m.getExtremesFromAll,
                q = this.isCartesian, n, p;
            if (q && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a)return !1;
            h && (a = h.getExtremes(), n = a.min, p = a.max);
            if (q && this.sorted && !l && (!k || d > k || this.forceCrop))if (b[d - 1] < n || b[0] > p)b = [], c = []; else if (b[0] < n || b[d - 1] > p)e = this.cropData(this.xData, this.yData, n, p), b = e.xData, c = e.yData, e = e.start, f = !0;
            for (k = b.length - 1; 0 <= k; k--)d = b[k] - b[k - 1], 0 < d && (g === w || d < g) ? g = d : 0 > d && this.requireSorting && Z(15);
            this.cropped = f;
            this.cropStart = e;
            this.processedXData = b;
            this.processedYData = c;
            null === m.pointRange &&
            (this.pointRange = g || 1);
            this.closestPointRange = g
        },
        cropData: function (a, b, c, d) {
            var e = a.length, f = 0, g = e, h = r(this.cropShoulder, 1), k;
            for (k = 0; k < e; k++)if (a[k] >= c) {
                f = y(0, k - h);
                break
            }
            for (; k < e; k++)if (a[k] > d) {
                g = k + h;
                break
            }
            return {xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g}
        },
        generatePoints: function () {
            var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, k, m = this.hasGroupedData, l, q = [], n;
            b || m || (b = [], b.length = a.length, b = this.data = b);
            for (n = 0; n < g; n++)k = h + n, m ? q[n] = (new f).init(this, [d[n]].concat(ca(e[n]))) : (b[k] ? l = b[k] : a[k] !== w && (b[k] = l = (new f).init(this, a[k], d[n])), q[n] = l), q[n].index = k;
            if (b && (g !== (c = b.length) || m))for (n = 0; n < c; n++)n !== h || m || (n += g), b[n] && (b[n].destroyElements(), b[n].plotX = w);
            this.data = b;
            this.points = q
        },
        getExtremes: function (a) {
            var b = this.yAxis, c = this.processedXData, d, e = [], f = 0;
            d = this.xAxis.getExtremes();
            var g = d.min, h = d.max, k, m, l, q;
            a = a || this.stackedYData || this.processedYData;
            d = a.length;
            for (q = 0; q < d; q++)if (m = c[q], l = a[q],
                    k = null !== l && l !== w && (!b.isLog || l.length || 0 < l), m = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[q + 1] || m) >= g && (c[q - 1] || m) <= h, k && m)if (k = l.length)for (; k--;)null !== l[k] && (e[f++] = l[k]); else e[f++] = l;
            this.dataMin = Pa(e);
            this.dataMax = Ea(e)
        },
        translate: function () {
            this.processedXData || this.processData();
            this.generatePoints();
            for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, k = a.pointPlacement, m = "between" === k ||
                ja(k), l = a.threshold, q = a.startFromThreshold ? l : 0, n, p, t, v, x = Number.MAX_VALUE, a = 0; a < g; a++) {
                var B = f[a], A = B.x, C = B.y;
                p = B.low;
                var D = b && e.stacks[(this.negStacks && C < (q ? 0 : l) ? "-" : "") + this.stackKey];
                e.isLog && null !== C && 0 >= C && (B.y = C = null, Z(10));
                B.plotX = n = I(y(-1E5, c.translate(A, 0, 0, 0, 1, k, "flags" === this.type)), 1E5);
                b && this.visible && D && D[A] && (v = this.getStackIndicator(v, A, this.index), D = D[A], C = D.points[v.key], p = C[0], C = C[1], p === q && (p = r(l, e.min)), e.isLog && 0 >= p && (p = null), B.total = B.stackTotal = D.total, B.percentage = D.total &&
                    B.y / D.total * 100, B.stackY = C, D.setOffset(this.pointXOffset || 0, this.barW || 0));
                B.yBottom = u(p) ? e.translate(p, 0, 1, 0, 1) : null;
                h && (C = this.modifyValue(C, B));
                B.plotY = p = "number" === typeof C && Infinity !== C ? I(y(-1E5, e.translate(C, 0, 1, 0, 1)), 1E5) : w;
                B.isInside = p !== w && 0 <= p && p <= e.len && 0 <= n && n <= c.len;
                B.clientX = m ? c.translate(A, 0, 0, 0, 1) : n;
                B.negative = B.y < (l || 0);
                B.category = d && d[B.x] !== w ? d[B.x] : B.x;
                a && (x = I(x, T(n - t)));
                t = n
            }
            this.closestPointRangePx = x;
            this.getSegments()
        },
        setClip: function (a) {
            var b = this.chart, c = this.options, d = b.renderer,
                e = b.inverted, f = this.clipBox, g = f || b.clipBox, h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(), k = b[h], m = b[h + "m"];
            k || (a && (g.width = 0, b[h + "m"] = m = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = k = d.clipRect(g));
            a && (k.count += 1);
            !1 !== c.clip && (this.group.clip(a || f ? k : b.clipRect), this.markerGroup.clip(m), this.sharedClipKey = h);
            a || (--k.count, 0 >= k.count && h && b[h] && (f || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
        },
        animate: function (a) {
            var b =
                this.chart, c = this.options.animation, d;
            c && !ba(c) && (c = ra[this.type].animation);
            a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({width: b.plotSizeX}, c), b[d + "m"] && b[d + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null)
        },
        afterAnimate: function () {
            this.setClip();
            F(this, "afterAnimate")
        },
        drawPoints: function () {
            var a, b = this.points, c = this.chart, d, e, f, g, h, k, m, l, q = this.options.marker, n = this.pointAttr[""], p, t, v, u = this.markerGroup, x = r(q.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * q.radius);
            if (!1 !== q.enabled || this._hasPointMarkers)for (f = b.length; f--;)g = b[f], d = P(g.plotX), e = g.plotY, l = g.graphic, p = g.marker || {}, t = !!g.marker, a = x && p.enabled === w || p.enabled, v = g.isInside, a && e !== w && !isNaN(e) && null !== g.y ? (a = g.pointAttr[g.selected ? "select" : ""] || n, h = a.r, k = r(p.symbol, this.symbol), m = 0 === k.indexOf("url"), l ? l[v ? "show" : "hide"](!0).animate(A({
                x: d - h,
                y: e - h
            }, l.symbolName ? {
                width: 2 * h,
                height: 2 * h
            } : {})) : v && (0 < h || m) && (g.graphic = c.renderer.symbol(k, d - h, e - h, 2 * h, 2 * h, t ? p : q).attr(a).add(u))) : l && (g.graphic = l.destroy())
        },
        convertAttribs: function (a, b, c, d) {
            var e = this.pointAttrToOptions, f, g, h = {};
            a = a || {};
            b = b || {};
            c = c || {};
            d = d || {};
            for (f in e)g = e[f], h[f] = r(a[g], b[f], c[f], d[f]);
            return h
        },
        getAttribs: function () {
            var a = this, b = a.options, c = ra[a.type].marker ? b.marker : b, d = c.states, e = d.hover, f, g = a.color, h = a.options.negativeColor;
            f = {stroke: g, fill: g};
            var k = a.points || [], m, l, q = [], n = a.pointAttrToOptions;
            m = a.hasPointSpecificOptions;
            var p = c.lineColor, z = c.fillColor;
            l = b.turboThreshold;
            var v = a.zones, w = a.zoneAxis || "y", x;
            b.marker ? (e.radius = e.radius ||
                c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : (e.color = e.color || ha(e.color || g).brighten(e.brightness).get(), e.negativeColor = e.negativeColor || ha(e.negativeColor || h).brighten(e.brightness).get());
            q[""] = a.convertAttribs(c, f);
            t(["hover", "select"], function (b) {
                q[b] = a.convertAttribs(d[b], q[""])
            });
            a.pointAttr = q;
            g = k.length;
            if (!l || g < l || m)for (; g--;) {
                l = k[g];
                (c = l.options && l.options.marker || l.options) && !1 === c.enabled && (c.radius = 0);
                if (v.length) {
                    m = 0;
                    for (f = v[m]; l[w] >= f.value;)f = v[++m];
                    l.color = l.fillColor = r(f.color, a.color)
                }
                m = b.colorByPoint || l.color;
                if (l.options)for (x in n)u(c[n[x]]) && (m = !0);
                if (m) {
                    c = c || {};
                    m = [];
                    d = c.states || {};
                    f = d.hover = d.hover || {};
                    if (!b.marker || l.negative && !f.fillColor && !e.fillColor)f[a.pointAttrToOptions.fill] = f.color || !l.options.color && e[l.negative && h ? "negativeColor" : "color"] || ha(l.color).brighten(f.brightness || e.brightness).get();
                    f = {color: l.color};
                    z || (f.fillColor = l.color);
                    p || (f.lineColor = l.color);
                    c.hasOwnProperty("color") && !c.color && delete c.color;
                    m[""] = a.convertAttribs(A(f,
                        c), q[""]);
                    m.hover = a.convertAttribs(d.hover, q.hover, m[""]);
                    m.select = a.convertAttribs(d.select, q.select, m[""])
                } else m = q;
                l.pointAttr = m
            }
        },
        destroy: function () {
            var a = this, b = a.chart, c = /AppleWebKit\/533/.test(ma), d, e = a.data || [], f, g, h;
            F(a, "destroy");
            U(a);
            t(a.axisTypes || [], function (b) {
                if (h = a[b])oa(h.series, a), h.isDirty = h.forceRedraw = !0
            });
            a.legendItem && a.chart.legend.destroyItem(a);
            for (d = e.length; d--;)(f = e[d]) && f.destroy && f.destroy();
            a.points = null;
            clearTimeout(a.animationTimeout);
            for (g in a)a[g]instanceof S && !a[g].survive && (d = c && "group" === g ? "hide" : "destroy", a[g][d]());
            b.hoverSeries === a && (b.hoverSeries = null);
            oa(b.series, a);
            for (g in a)delete a[g]
        },
        getSegmentPath: function (a) {
            var b = this, c = [], d = b.options.step;
            t(a, function (e, f) {
                var g = e.plotX, h = e.plotY, k;
                b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), d && f && (k = a[f - 1], "right" === d ? c.push(k.plotX, h, "L") : "center" === d ? c.push((k.plotX + g) / 2, k.plotY, "L", (k.plotX + g) / 2, h, "L") : c.push(g, k.plotY, "L")), c.push(e.plotX, e.plotY))
            });
            return c
        },
        getGraphPath: function () {
            var a =
                this, b = [], c, d = [];
            t(a.segments, function (e) {
                c = a.getSegmentPath(e);
                1 < e.length ? b = b.concat(c) : d.push(e[0])
            });
            a.singlePoints = d;
            return a.graphPath = b
        },
        drawGraph: function () {
            var a = this, b = this.options, c = [["graph", b.lineColor || this.color, b.dashStyle]], d = b.lineWidth, e = "square" !== b.linecap, f = this.getGraphPath(), g = this.fillGraph && this.color || "none";
            t(this.zones, function (d, e) {
                c.push(["zoneGraph" + e, d.color || a.color, d.dashStyle || b.dashStyle])
            });
            t(c, function (c, k) {
                var m = c[0], l = a[m];
                l ? l.animate({d: f}) : (d || g) && f.length &&
                (l = {
                    stroke: c[1],
                    "stroke-width": d,
                    fill: g,
                    zIndex: 1
                }, c[2] ? l.dashstyle = c[2] : e && (l["stroke-linecap"] = l["stroke-linejoin"] = "round"), a[m] = a.chart.renderer.path(f).attr(l).add(a.group).shadow(2 > k && b.shadow))
            })
        },
        applyZones: function () {
            var a = this, b = this.chart, c = b.renderer, d = this.zones, e, f, g = this.clips || [], h, k = this.graph, m = this.area, l = y(b.chartWidth, b.chartHeight), q = this[(this.zoneAxis || "y") + "Axis"], n, p = q.reversed, z = b.inverted, v = q.horiz, u, B, A, C = !1;
            d.length && (k || m) && q.min !== w && (k && k.hide(), m && m.hide(), n = q.getExtremes(),
                t(d, function (d, t) {
                    e = p ? v ? b.plotWidth : 0 : v ? 0 : q.toPixels(n.min);
                    e = I(y(r(f, e), 0), l);
                    f = I(y(x(q.toPixels(r(d.value, n.max), !0)), 0), l);
                    C && (e = f = q.toPixels(n.max));
                    u = Math.abs(e - f);
                    B = I(e, f);
                    A = y(e, f);
                    q.isXAxis ? (h = {
                        x: z ? A : B,
                        y: 0,
                        width: u,
                        height: l
                    }, v || (h.x = b.plotHeight - h.x)) : (h = {
                        x: 0,
                        y: z ? A : B,
                        width: l,
                        height: u
                    }, v && (h.y = b.plotWidth - h.y));
                    b.inverted && c.isVML && (h = q.isXAxis ? {
                        x: 0,
                        y: p ? B : A,
                        height: h.width,
                        width: b.chartWidth
                    } : {x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight});
                    g[t] ? g[t].animate(h) : (g[t] =
                        c.clipRect(h), k && a["zoneGraph" + t].clip(g[t]), m && a["zoneArea" + t].clip(g[t]));
                    C = d.value > n.max
                }), this.clips = g)
        },
        invertGroups: function () {
            function a() {
                var a = {width: b.yAxis.len, height: b.xAxis.len};
                t(["group", "markerGroup"], function (c) {
                    b[c] && b[c].attr(a).invert()
                })
            }

            var b = this, c = b.chart;
            b.xAxis && (M(c, "resize", a), M(b, "destroy", function () {
                U(c, "resize", a)
            }), a(), b.invertGroups = a)
        },
        plotGroup: function (a, b, c, d, e) {
            var f = this[a], g = !f;
            g && (this[a] = f = this.chart.renderer.g(b).attr({visibility: c, zIndex: d || .1}).add(e),
                f.addClass("highcharts-series-" + this.index));
            f[g ? "attr" : "animate"](this.getPlotBox());
            return f
        },
        getPlotBox: function () {
            var a = this.chart, b = this.xAxis, c = this.yAxis;
            a.inverted && (b = c, c = this.xAxis);
            return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
        },
        render: function () {
            var a = this, b = a.chart, c, d = a.options, e = (c = d.animation) && !!a.animate && b.renderer.isSVG && r(c.duration, 500) || 0, f = a.visible ? "visible" : "hidden", g = d.zIndex, h = a.hasRendered, k = b.seriesGroup;
            c = a.plotGroup("group", "series",
                f, g, k);
            a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, k);
            e && a.animate(!0);
            a.getAttribs();
            c.inverted = a.isCartesian ? b.inverted : !1;
            a.drawGraph && (a.drawGraph(), a.applyZones());
            t(a.points, function (a) {
                a.redraw && a.redraw()
            });
            a.drawDataLabels && a.drawDataLabels();
            a.visible && a.drawPoints();
            a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
            b.inverted && a.invertGroups();
            !1 === d.clip || a.sharedClipKey || h || c.clip(b.clipRect);
            e && a.animate();
            h || (e ? a.animationTimeout = setTimeout(function () {
                    a.afterAnimate()
                },
                e) : a.afterAnimate());
            a.isDirty = a.isDirtyData = !1;
            a.hasRendered = !0
        },
        redraw: function () {
            var a = this.chart, b = this.isDirtyData, c = this.isDirty, d = this.group, e = this.xAxis, f = this.yAxis;
            d && (a.inverted && d.attr({
                width: a.plotWidth,
                height: a.plotHeight
            }), d.animate({translateX: r(e && e.left, a.plotLeft), translateY: r(f && f.top, a.plotTop)}));
            this.translate();
            this.render();
            b && F(this, "updatedData");
            (c || b) && delete this.kdTree
        },
        kdDimensions: 1,
        kdAxisArray: ["clientX", "plotY"],
        searchPoint: function (a, b) {
            var c = this.xAxis, d = this.yAxis,
                e = this.chart.inverted;
            return this.searchKDTree({
                clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
            }, b)
        },
        buildKDTree: function () {
            function a(b, d, g) {
                var h, k;
                if (k = b && b.length)return h = c.kdAxisArray[d % g], b.sort(function (a, b) {
                    return a[h] - b[h]
                }), k = Math.floor(k / 2), {
                    point: b[k],
                    left: a(b.slice(0, k), d + 1, g),
                    right: a(b.slice(k + 1), d + 1, g)
                }
            }

            function b() {
                var b = Xa(c.points || [], function (a) {
                    return null !== a.y
                });
                c.kdTree = a(b, d, d)
            }

            var c = this, d = c.kdDimensions;
            delete c.kdTree;
            c.options.kdSync ?
                b() : setTimeout(b)
        },
        searchKDTree: function (a, b) {
            function c(a, b, m, l) {
                var q = b.point, n = d.kdAxisArray[m % l], p, r, t = q;
                r = u(a[e]) && u(q[e]) ? Math.pow(a[e] - q[e], 2) : null;
                p = u(a[f]) && u(q[f]) ? Math.pow(a[f] - q[f], 2) : null;
                p = (r || 0) + (p || 0);
                q.dist = u(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                q.distX = u(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                n = a[n] - q[n];
                p = 0 > n ? "left" : "right";
                r = 0 > n ? "right" : "left";
                b[p] && (p = c(a, b[p], m + 1, l), t = p[g] < t[g] ? p : q);
                b[r] && Math.sqrt(n * n) < t[g] && (a = c(a, b[r], m + 1, l), t = a[g] < t[g] ? a : t);
                return t
            }

            var d = this, e = this.kdAxisArray[0],
                f = this.kdAxisArray[1], g = b ? "distX" : "dist";
            this.kdTree || this.buildKDTree();
            if (this.kdTree)return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
        }
    };
    A(pb.prototype, {
        addSeries: function (a, b, c) {
            var d, e = this;
            a && (b = r(b, !0), F(e, "addSeries", {options: a}, function () {
                d = e.initSeries(a);
                e.isDirtyLegend = !0;
                e.linkSeries();
                b && e.redraw(c)
            }));
            return d
        }, addAxis: function (a, b, c, d) {
            var e = b ? "xAxis" : "yAxis", f = this.options;
            new ta(this, H(a, {index: this[e].length, isX: b}));
            f[e] = ca(f[e] || {});
            f[e].push(a);
            r(c, !0) && this.redraw(d)
        },
        showLoading: function (a) {
            var b = this, c = b.options, d = b.loadingDiv, e = c.loading, f = function () {
                d && R(d, {
                    left: b.plotLeft + "px",
                    top: b.plotTop + "px",
                    width: b.plotWidth + "px",
                    height: b.plotHeight + "px"
                })
            };
            d || (b.loadingDiv = d = la("div", {className: "highcharts-loading"}, A(e.style, {
                zIndex: 10,
                display: "none"
            }), b.container), b.loadingSpan = la("span", null, e.labelStyle, d), M(b, "redraw", f));
            b.loadingSpan.innerHTML = a || c.lang.loading;
            b.loadingShown || (R(d, {opacity: 0, display: ""}), Za(d, {opacity: e.style.opacity}, {
                duration: e.showDuration ||
                0
            }), b.loadingShown = !0);
            f()
        }, hideLoading: function () {
            var a = this.options, b = this.loadingDiv;
            b && Za(b, {opacity: 0}, {
                duration: a.loading.hideDuration || 100, complete: function () {
                    R(b, {display: "none"})
                }
            });
            this.loadingShown = !1
        }
    });
    A(Ba.prototype, {
        update: function (a, b, c, d) {
            function e() {
                f.applyOptions(a);
                null === f.y && h && (f.graphic = h.destroy());
                ba(a) && !ua(a) && (f.redraw = function () {
                    h && h.element && a && a.marker && a.marker.symbol && (f.graphic = h.destroy());
                    a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy());
                    f.redraw =
                        null
                });
                k = f.index;
                g.updateParallelArrays(f, k);
                q && f.name && (q[f.x] = f.name);
                l.data[k] = f.options;
                g.isDirty = g.isDirtyData = !0;
                !g.fixedBox && g.hasCartesianSeries && (m.isDirtyBox = !0);
                "point" === l.legendType && (m.isDirtyLegend = !0);
                b && m.redraw(c)
            }

            var f = this, g = f.series, h = f.graphic, k, m = g.chart, l = g.options, q = g.xAxis && g.xAxis.names;
            b = r(b, !0);
            !1 === d ? e() : f.firePointEvent("update", {options: a}, e)
        }, remove: function (a, b) {
            this.series.removePoint(Ma(this, this.series.data), a, b)
        }
    });
    A(na.prototype, {
        addPoint: function (a, b, c, d) {
            var e =
                this, f = e.options, g = e.data, h = e.graph, k = e.area, m = e.chart, l = e.xAxis && e.xAxis.names, q = h && h.shift || 0, n = ["graph", "area"], h = f.data, p, u = e.xData;
            Fa(d, m);
            if (c) {
                for (d = e.zones.length; d--;)n.push("zoneGraph" + d, "zoneArea" + d);
                t(n, function (a) {
                    e[a] && (e[a].shift = q + (f.step ? 2 : 1))
                })
            }
            k && (k.isArea = !0);
            b = r(b, !0);
            k = {series: e};
            e.pointClass.prototype.applyOptions.apply(k, [a]);
            n = k.x;
            d = u.length;
            if (e.requireSorting && n < u[d - 1])for (p = !0; d && u[d - 1] > n;)d--;
            e.updateParallelArrays(k, "splice", d, 0, 0);
            e.updateParallelArrays(k, d);
            l && k.name &&
            (l[n] = k.name);
            h.splice(d, 0, a);
            p && (e.data.splice(d, 0, null), e.processData());
            "point" === f.legendType && e.generatePoints();
            c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), e.updateParallelArrays(k, "shift"), h.shift()));
            e.isDirty = !0;
            e.isDirtyData = !0;
            b && (e.getAttribs(), m.redraw())
        }, removePoint: function (a, b, c) {
            var d = this, e = d.data, f = e[a], g = d.points, h = d.chart, k = function () {
                e.length === g.length && g.splice(a, 1);
                e.splice(a, 1);
                d.options.data.splice(a, 1);
                d.updateParallelArrays(f || {series: d}, "splice", a, 1);
                f && f.destroy();
                d.isDirty = !0;
                d.isDirtyData = !0;
                b && h.redraw()
            };
            Fa(c, h);
            b = r(b, !0);
            f ? f.firePointEvent("remove", null, k) : k()
        }, remove: function (a, b) {
            var c = this, d = c.chart;
            a = r(a, !0);
            c.isRemoving || (c.isRemoving = !0, F(c, "remove", null, function () {
                c.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                d.linkSeries();
                a && d.redraw(b)
            }));
            c.isRemoving = !1
        }, update: function (a, b) {
            var c = this, d = this.chart, e = this.userOptions, f = this.type, g = X[f].prototype, h = ["group", "markerGroup", "dataLabelsGroup"], k;
            if (a.type && a.type !== f || void 0 !== a.zIndex)h.length = 0;
            t(h, function (a) {
                h[a] = c[a];
                delete c[a]
            });
            a = H(e, {animation: !1, index: this.index, pointStart: this.xData[0]}, {data: this.options.data}, a);
            this.remove(!1);
            for (k in g)this[k] = w;
            A(this, X[a.type || f].prototype);
            t(h, function (a) {
                c[a] = h[a]
            });
            this.init(d, a);
            d.linkSeries();
            r(b, !0) && d.redraw(!1)
        }
    });
    A(ta.prototype, {
        update: function (a, b) {
            var c = this.chart;
            a = c.options[this.coll][this.options.index] = H(this.userOptions, a);
            this.destroy(!0);
            this._addedPlotLB = this.chart._labelPanes = w;
            this.init(c, A(a, {events: w}));
            c.isDirtyBox = !0;
            r(b, !0) && c.redraw()
        }, remove: function (a) {
            for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;)d[e] && d[e].remove(!1);
            oa(b.axes, this);
            oa(b[c], this);
            b.options[c].splice(this.options.index, 1);
            t(b[c], function (a, b) {
                a.options.index = b
            });
            this.destroy();
            b.isDirtyBox = !0;
            r(a, !0) && b.redraw()
        }, setTitle: function (a, b) {
            this.update({title: a}, b)
        }, setCategories: function (a, b) {
            this.update({categories: a}, b)
        }
    });
    var Pb = db(na);
    X.line = Pb;
    ra.area = H(Kb, {softThreshold: !1, threshold: 0});
    var Qb = db(na, {
        type: "area", getSegments: function () {
            var a =
                this, b = [], c = [], d = [], e = this.xAxis, f = this.yAxis, g = f.stacks[this.stackKey], h = {}, k, m, l = this.points, q = this.options.connectNulls, n, p, r;
            if (this.options.stacking && !this.cropped) {
                for (p = 0; p < l.length; p++)h[l[p].x] = l[p];
                for (r in g)null !== g[r].total && d.push(+r);
                d.sort(function (a, b) {
                    return a - b
                });
                t(d, function (b) {
                    var d = null, l;
                    if (!q || h[b] && null !== h[b].y)if (h[b])c.push(h[b]); else {
                        for (p = a.index; p <= f.series.length; p++)if (n = a.getStackIndicator(null, b, p), l = g[b].points[n.key]) {
                            d = l[1];
                            break
                        }
                        k = e.translate(b);
                        m = f.getThreshold(d);
                        c.push({y: null, plotX: k, clientX: k, plotY: m, yBottom: m, onMouseOver: Gb})
                    }
                });
                c.length && b.push(c)
            } else na.prototype.getSegments.call(this), b = this.segments;
            this.segments = b
        }, getSegmentPath: function (a) {
            var b = na.prototype.getSegmentPath.call(this, a), c = [].concat(b), d, e = this.options;
            d = b.length;
            var f = this.yAxis.getThreshold(e.threshold), g;
            3 === d && c.push("L", b[1], b[2]);
            if (e.stacking && !this.closedStacks)for (d = a.length - 1; 0 <= d; d--)g = r(a[d].yBottom, f), d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g);
            else this.closeSegment(c, a, f);
            this.areaPath = this.areaPath.concat(c);
            return b
        }, closeSegment: function (a, b, c) {
            a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c)
        }, drawGraph: function () {
            this.areaPath = [];
            na.prototype.drawGraph.apply(this);
            var a = this, b = this.areaPath, c = this.options, d = [["area", this.color, c.fillColor]];
            t(this.zones, function (b, f) {
                d.push(["zoneArea" + f, b.color || a.color, b.fillColor || c.fillColor])
            });
            t(d, function (d) {
                var f = d[0], g = a[f];
                g ? g.animate({d: b}) : a[f] = a.chart.renderer.path(b).attr({
                    fill: r(d[2],
                        ha(d[1]).setOpacity(r(c.fillOpacity, .75)).get()), zIndex: 0
                }).add(a.group)
            })
        }, drawLegendSymbol: Db.drawRectangle
    });
    X.area = Qb;
    var bb = E.TrackerMixin = {
        drawTrackerPoint: function () {
            var a = this, b = a.chart, c = b.pointer, d = a.options.cursor, e = d && {cursor: d}, f = function (a) {
                for (var c = a.target, d; c && !d;)d = c.point, c = c.parentNode;
                if (d !== w && d !== b.hoverPoint)d.onMouseOver(a)
            };
            t(a.points, function (a) {
                a.graphic && (a.graphic.element.point = a);
                a.dataLabel && (a.dataLabel.element.point = a)
            });
            a._hasTracking || (t(a.trackerGroups, function (b) {
                if (a[b] &&
                    (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                        c.onTrackerMouseOut(a)
                    }).css(e), Ka))a[b].on("touchstart", f)
            }), a._hasTracking = !0)
        }, drawTrackerGraph: function () {
            var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, k = f.options.tooltip.snap, m = a.tracker, l = b.cursor, q = l && {cursor: l}, l = a.singlePoints, n, p = function () {
                if (f.hoverSeries !== a)a.onMouseOver()
            }, r = "rgba(192,192,192," + (W ? 1E-4 : .002) + ")";
            if (e && !c)for (n =
                                 e + 1; n--;)"M" === d[n] && d.splice(n + 1, 0, d[n + 1] - k, d[n + 2], "L"), (n && "M" === d[n] || n === e) && d.splice(n, 0, "L", d[n - 2] + k, d[n - 1]);
            for (n = 0; n < l.length; n++)e = l[n], d.push("M", e.plotX - k, e.plotY, "L", e.plotX + k, e.plotY);
            m ? m.attr({d: d}) : (a.tracker = h.path(d).attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: r,
                fill: c ? r : "none",
                "stroke-width": b.lineWidth + (c ? 0 : 2 * k),
                zIndex: 2
            }).add(a.group), t([a.tracker, a.markerGroup], function (a) {
                a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function (a) {
                    g.onTrackerMouseOut(a)
                }).css(q);
                if (Ka)a.on("touchstart", p)
            }))
        }
    };
    X.column && (ColumnSeries.prototype.drawTracker = bb.drawTrackerPoint);
    X.pie && (X.pie.prototype.drawTracker = bb.drawTrackerPoint);
    X.scatter && (ScatterSeries.prototype.drawTracker = bb.drawTrackerPoint);
    A(ab.prototype, {
        setItemEvents: function (a, b, c, d, e) {
            var f = this;
            (c ? b : a.legendGroup).on("mouseover", function () {
                a.setState("hover");
                b.css(f.options.itemHoverStyle)
            }).on("mouseout", function () {
                b.css(a.visible ? d : e);
                a.setState()
            }).on("click", function (b) {
                var c = function () {
                    a.setVisible &&
                    a.setVisible()
                };
                b = {browserEvent: b};
                a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : F(a, "legendItemClick", b, c)
            })
        }, createCheckboxForItem: function (a) {
            a.checkbox = la("input", {
                type: "checkbox",
                checked: a.selected,
                defaultChecked: a.selected
            }, this.options.itemCheckboxStyle, this.chart.container);
            M(a.checkbox, "click", function (b) {
                F(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                    a.select()
                })
            })
        }
    });
    N.legend.itemStyle.cursor = "pointer";
    A(pb.prototype, {
        showResetZoom: function () {
            var a =
                this, b = N.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                a.zoomOut()
            }, d, e && e.hover).attr({align: c.position.align, title: b.resetZoomTitle}).add().align(c.position, !1, f)
        }, zoomOut: function () {
            var a = this;
            F(a, "selection", {resetSelection: !0}, function () {
                a.zoom()
            })
        }, zoom: function (a) {
            var b, c = this.pointer, d = !1, e;
            !a || a.resetSelection ? t(this.axes, function (a) {
                b = a.zoom()
            }) : t(a.xAxis.concat(a.yAxis),
                function (a) {
                    var e = a.axis, h = e.isXAxis;
                    if (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"])b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
                });
            e = this.resetZoomButton;
            d && !e ? this.showResetZoom() : !d && ba(e) && (this.resetZoomButton = e.destroy());
            b && this.redraw(r(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
        }, pan: function (a, b) {
            var c = this, d = c.hoverPoints, e;
            d && t(d, function (a) {
                a.setState()
            });
            t("xy" === b ? [1, 0] : [1], function (b) {
                var d = a[b ? "chartX" : "chartY"], h = c[b ? "xAxis" : "yAxis"][0], k = c[b ? "mouseDownX" : "mouseDownY"],
                    m = (h.pointRange || 0) / 2, l = h.getExtremes(), q = h.toValue(k - d, !0) + m, m = h.toValue(k + c[b ? "plotWidth" : "plotHeight"] - d, !0) - m, k = k > d;
                h.series.length && (k || q > I(l.dataMin, l.min)) && (!k || m < y(l.dataMax, l.max)) && (h.setExtremes(q, m, !1, !1, {trigger: "pan"}), e = !0);
                c[b ? "mouseDownX" : "mouseDownY"] = d
            });
            e && c.redraw(!1);
            R(c.container, {cursor: "move"})
        }
    });
    A(Ba.prototype, {
        select: function (a, b) {
            var c = this, d = c.series, e = d.chart;
            a = r(a, !c.selected);
            c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                c.selected = c.options.selected =
                    a;
                d.options.data[Ma(c, d.data)] = c.options;
                c.setState(a && "select");
                b || t(e.getSelectedPoints(), function (a) {
                    a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Ma(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                })
            })
        }, onMouseOver: function (a, b) {
            var c = this.series, d = c.chart, e = d.tooltip, f = d.hoverPoint;
            if (d.hoverSeries !== c)c.onMouseOver();
            if (f && f !== this)f.onMouseOut();
            this.series && (this.firePointEvent("mouseOver"), !e || e.shared && !c.noSharedTooltip || e.refresh(this, a), this.setState("hover"),
            b || (d.hoverPoint = this))
        }, onMouseOut: function () {
            var a = this.series.chart, b = a.hoverPoints;
            this.firePointEvent("mouseOut");
            b && -1 !== Ma(this, b) || (this.setState(), a.hoverPoint = null)
        }, importEvents: function () {
            if (!this.hasImportedEvents) {
                var a = H(this.series.options.point, this.options).events, b;
                this.events = a;
                for (b in a)M(this, b, a[b]);
                this.hasImportedEvents = !0
            }
        }, setState: function (a, b) {
            var c = P(this.plotX), d = this.plotY, e = this.series, f = e.options.states, g = ra[e.type].marker && e.options.marker, h = g && !g.enabled, k = g &&
                g.states[a], m = k && !1 === k.enabled, l = e.stateMarkerGraphic, q = this.marker || {}, n = e.chart, p = e.halo, r;
            a = a || "";
            r = this.pointAttr[a] || e.pointAttr[a];
            if (!(a === this.state && !b || this.selected && "select" !== a || f[a] && !1 === f[a].enabled || a && (m || h && !1 === k.enabled) || a && q.states && q.states[a] && !1 === q.states[a].enabled)) {
                if (this.graphic)g = g && this.graphic.symbolName && r.r, this.graphic.attr(H(r, g ? {
                    x: c - g,
                    y: d - g,
                    width: 2 * g,
                    height: 2 * g
                } : {})), l && l.hide(); else {
                    if (a && k)if (g = k.radius, q = q.symbol || e.symbol, l && l.currentSymbol !== q && (l = l.destroy()),
                            l)l[b ? "animate" : "attr"]({
                        x: c - g,
                        y: d - g
                    }); else q && (e.stateMarkerGraphic = l = n.renderer.symbol(q, c - g, d - g, 2 * g, 2 * g).attr(r).add(e.markerGroup), l.currentSymbol = q);
                    l && (l[a && n.isInsidePlot(c, d, n.inverted) ? "show" : "hide"](), l.element.point = this)
                }
                (c = f[a] && f[a].halo) && c.size ? (p || (e.halo = p = n.renderer.path().add(n.seriesGroup)), p.attr(A({fill: ha(this.color || e.color).setOpacity(c.opacity).get()}, c.attributes))[b ? "animate" : "attr"]({d: this.haloPath(c.size)})) : p && p.attr({d: []});
                this.state = a
            }
        }, haloPath: function (a) {
            var b =
                this.series, c = b.chart, d = b.getPlotBox(), e = c.inverted;
            return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, 2 * a, 2 * a)
        }
    });
    A(na.prototype, {
        onMouseOver: function () {
            var a = this.chart, b = a.hoverSeries;
            if (b && b !== this)b.onMouseOut();
            this.options.events.mouseOver && F(this, "mouseOver");
            this.setState("hover");
            a.hoverSeries = this
        }, onMouseOut: function () {
            var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
            b.hoverSeries = null;
            if (d)d.onMouseOut();
            this && a.events.mouseOut && F(this, "mouseOut");
            !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
            this.setState()
        }, setState: function (a) {
            var b = this.options, c = this.graph, d = b.states, e = b.lineWidth, b = 0;
            a = a || "";
            if (this.state !== a && (this.state = a, !d[a] || !1 !== d[a].enabled) && (a && (e = d[a].lineWidth || e + (d[a].lineWidthPlus || 0)), c && !c.dashstyle))for (a = {"stroke-width": e}, c.attr(a); this["zoneGraph" + b];)this["zoneGraph" + b].attr(a), b += 1
        }, setVisible: function (a, b) {
            var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries,
                h = c.visible;
            f = (c.visible = a = c.userOptions.visible = a === w ? !h : a) ? "show" : "hide";
            t(["group", "dataLabelsGroup", "markerGroup", "tracker"], function (a) {
                if (c[a])c[a][f]()
            });
            if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)c.onMouseOut();
            e && d.legend.colorizeItem(c, a);
            c.isDirty = !0;
            c.options.stacking && t(d.series, function (a) {
                a.options.stacking && a.visible && (a.isDirty = !0)
            });
            t(c.linkedSeries, function (b) {
                b.setVisible(a, !1)
            });
            g && (d.isDirtyBox = !0);
            !1 !== b && d.redraw();
            F(c, f)
        }, show: function () {
            this.setVisible(!0)
        },
        hide: function () {
            this.setVisible(!1)
        }, select: function (a) {
            this.selected = a = a === w ? !this.selected : a;
            this.checkbox && (this.checkbox.checked = a);
            F(this, a ? "select" : "unselect")
        }, drawTracker: bb.drawTrackerGraph
    });
    A(E, {
        Color: ha,
        Point: Ba,
        Tick: wa,
        Renderer: $a,
        SVGElement: S,
        SVGRenderer: $a,
        arrayMin: Pa,
        arrayMax: Ea,
        charts: V,
        dateFormat: va,
        error: Z,
        format: Da,
        pathAnim: nb,
        getOptions: function () {
            return N
        },
        hasBidiBug: Fb,
        isTouchDevice: yb,
        setOptions: function (a) {
            N = H(!0, N, a);
            rb();
            return N
        },
        addEvent: M,
        removeEvent: U,
        createElement: la,
        discardElement: Ra,
        css: R,
        each: t,
        map: Ya,
        merge: H,
        splat: ca,
        extendClass: db,
        pInt: J,
        svg: W,
        canvas: aa,
        vml: !W && !aa,
        product: "Highcharts 4.1.9",
        version: "/Highstock 2.1.9"
    })
})(); 
