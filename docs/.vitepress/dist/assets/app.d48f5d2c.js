function es(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const Po =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ao = es(Po);
function fr(e) {
  return !!e || e === "";
}
function ts(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = he(s) ? Oo(s) : ts(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (he(e)) return e;
    if (ae(e)) return e;
  }
}
const Lo = /;(?![^(]*\))/g,
  Io = /:(.+)/;
function Oo(e) {
  const t = {};
  return (
    e.split(Lo).forEach((n) => {
      if (n) {
        const s = n.split(Io);
        s.length > 1 && (t[s[0].trim()] = s[1].trim());
      }
    }),
    t
  );
}
function ct(e) {
  let t = "";
  if (he(e)) t = e;
  else if (F(e))
    for (let n = 0; n < e.length; n++) {
      const s = ct(e[n]);
      s && (t += s + " ");
    }
  else if (ae(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const be = (e) =>
    he(e)
      ? e
      : e == null
      ? ""
      : F(e) || (ae(e) && (e.toString === _r || !N(e.toString)))
      ? JSON.stringify(e, dr, 2)
      : String(e),
  dr = (e, t) =>
    t && t.__v_isRef
      ? dr(e, t.value)
      : mt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : hr(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ae(t) && !F(t) && !gr(t)
      ? String(t)
      : t,
  Q = {},
  gt = [],
  Oe = () => {},
  Mo = () => !1,
  Fo = /^on[^a-z]/,
  Kt = (e) => Fo.test(e),
  ns = (e) => e.startsWith("onUpdate:"),
  ye = Object.assign,
  ss = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Ro = Object.prototype.hasOwnProperty,
  q = (e, t) => Ro.call(e, t),
  F = Array.isArray,
  mt = (e) => vn(e) === "[object Map]",
  hr = (e) => vn(e) === "[object Set]",
  N = (e) => typeof e == "function",
  he = (e) => typeof e == "string",
  rs = (e) => typeof e == "symbol",
  ae = (e) => e !== null && typeof e == "object",
  pr = (e) => ae(e) && N(e.then) && N(e.catch),
  _r = Object.prototype.toString,
  vn = (e) => _r.call(e),
  So = (e) => vn(e).slice(8, -1),
  gr = (e) => vn(e) === "[object Object]",
  os = (e) =>
    he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Lt = es(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  bn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  No = /-(\w)/g,
  Ne = bn((e) => e.replace(No, (t, n) => (n ? n.toUpperCase() : ""))),
  Ho = /\B([A-Z])/g,
  xt = bn((e) => e.replace(Ho, "-$1").toLowerCase()),
  yn = bn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Fn = bn((e) => (e ? `on${yn(e)}` : "")),
  St = (e, t) => !Object.is(e, t),
  Rn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  nn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Bo = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Ls;
const Uo = () =>
  Ls ||
  (Ls =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let Ue;
class jo {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        Ue &&
        ((this.parent = Ue),
        (this.index = (Ue.scopes || (Ue.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active)
      try {
        return (Ue = this), t();
      } finally {
        Ue = this.parent;
      }
  }
  on() {
    Ue = this;
  }
  off() {
    Ue = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.active = !1;
    }
  }
}
function Do(e, t = Ue) {
  t && t.active && t.effects.push(e);
}
const is = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  mr = (e) => (e.w & Ge) > 0,
  vr = (e) => (e.n & Ge) > 0,
  Ko = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ge;
  },
  Wo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        mr(r) && !vr(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Ge),
          (r.n &= ~Ge);
      }
      t.length = n;
    }
  },
  jn = new WeakMap();
let Pt = 0,
  Ge = 1;
const Dn = 30;
let Se;
const rt = Symbol(""),
  Kn = Symbol("");
class ls {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Do(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Se,
      n = Ze;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Se),
        (Se = this),
        (Ze = !0),
        (Ge = 1 << ++Pt),
        Pt <= Dn ? Ko(this) : Is(this),
        this.fn()
      );
    } finally {
      Pt <= Dn && Wo(this),
        (Ge = 1 << --Pt),
        (Se = this.parent),
        (Ze = n),
        (this.parent = void 0);
    }
  }
  stop() {
    this.active && (Is(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Is(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ze = !0;
const br = [];
function wt() {
  br.push(Ze), (Ze = !1);
}
function $t() {
  const e = br.pop();
  Ze = e === void 0 ? !0 : e;
}
function ke(e, t, n) {
  if (Ze && Se) {
    let s = jn.get(e);
    s || jn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = is())), yr(r);
  }
}
function yr(e, t) {
  let n = !1;
  Pt <= Dn ? vr(e) || ((e.n |= Ge), (n = !mr(e))) : (n = !e.has(Se)),
    n && (e.add(Se), Se.deps.push(e));
}
function Ke(e, t, n, s, r, o) {
  const i = jn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && F(e))
    i.forEach((u, f) => {
      (f === "length" || f >= s) && l.push(u);
    });
  else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        F(e)
          ? os(n) && l.push(i.get("length"))
          : (l.push(i.get(rt)), mt(e) && l.push(i.get(Kn)));
        break;
      case "delete":
        F(e) || (l.push(i.get(rt)), mt(e) && l.push(i.get(Kn)));
        break;
      case "set":
        mt(e) && l.push(i.get(rt));
        break;
    }
  if (l.length === 1) l[0] && Wn(l[0]);
  else {
    const u = [];
    for (const f of l) f && u.push(...f);
    Wn(is(u));
  }
}
function Wn(e, t) {
  for (const n of F(e) ? e : [...e])
    (n !== Se || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const qo = es("__proto__,__v_isRef,__isVue"),
  xr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(rs)
  ),
  zo = cs(),
  Vo = cs(!1, !0),
  Jo = cs(!0),
  Os = Yo();
function Yo() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = z(this);
        for (let o = 0, i = this.length; o < i; o++) ke(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(z)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        wt();
        const s = z(this)[t].apply(this, n);
        return $t(), s;
      };
    }),
    e
  );
}
function cs(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? (t ? fi : kr) : t ? Er : Cr).get(s))
      return s;
    const i = F(s);
    if (!e && i && q(Os, r)) return Reflect.get(Os, r, o);
    const l = Reflect.get(s, r, o);
    return (rs(r) ? xr.has(r) : qo(r)) || (e || ke(s, "get", r), t)
      ? l
      : de(l)
      ? !i || !os(r)
        ? l.value
        : l
      : ae(l)
      ? e
        ? Tr(l)
        : wn(l)
      : l;
  };
}
const Xo = wr(),
  Zo = wr(!0);
function wr(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (Nt(i) && de(i) && !de(r)) return !1;
    if (
      !e &&
      !Nt(r) &&
      (Pr(r) || ((r = z(r)), (i = z(i))), !F(n) && de(i) && !de(r))
    )
      return (i.value = r), !0;
    const l = F(n) && os(s) ? Number(s) < n.length : q(n, s),
      u = Reflect.set(n, s, r, o);
    return (
      n === z(o) && (l ? St(r, i) && Ke(n, "set", s, r) : Ke(n, "add", s, r)), u
    );
  };
}
function Qo(e, t) {
  const n = q(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ke(e, "delete", t, void 0), s;
}
function Go(e, t) {
  const n = Reflect.has(e, t);
  return (!rs(t) || !xr.has(t)) && ke(e, "has", t), n;
}
function ei(e) {
  return ke(e, "iterate", F(e) ? "length" : rt), Reflect.ownKeys(e);
}
const $r = { get: zo, set: Xo, deleteProperty: Qo, has: Go, ownKeys: ei },
  ti = {
    get: Jo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  ni = ye({}, $r, { get: Vo, set: Zo }),
  us = (e) => e,
  xn = (e) => Reflect.getPrototypeOf(e);
function Vt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = z(e),
    o = z(t);
  t !== o && !n && ke(r, "get", t), !n && ke(r, "get", o);
  const { has: i } = xn(r),
    l = s ? us : n ? ds : Ht;
  if (i.call(r, t)) return l(e.get(t));
  if (i.call(r, o)) return l(e.get(o));
  e !== r && e.get(t);
}
function Jt(e, t = !1) {
  const n = this.__v_raw,
    s = z(n),
    r = z(e);
  return (
    e !== r && !t && ke(s, "has", e),
    !t && ke(s, "has", r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Yt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ke(z(e), "iterate", rt), Reflect.get(e, "size", e)
  );
}
function Ms(e) {
  e = z(e);
  const t = z(this);
  return xn(t).has.call(t, e) || (t.add(e), Ke(t, "add", e, e)), this;
}
function Fs(e, t) {
  t = z(t);
  const n = z(this),
    { has: s, get: r } = xn(n);
  let o = s.call(n, e);
  o || ((e = z(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? St(t, i) && Ke(n, "set", e, t) : Ke(n, "add", e, t), this
  );
}
function Rs(e) {
  const t = z(this),
    { has: n, get: s } = xn(t);
  let r = n.call(t, e);
  r || ((e = z(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Ke(t, "delete", e, void 0), o;
}
function Ss() {
  const e = z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ke(e, "clear", void 0, void 0), n;
}
function Xt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = z(i),
      u = t ? us : e ? ds : Ht;
    return (
      !e && ke(l, "iterate", rt), i.forEach((f, h) => s.call(r, u(f), u(h), o))
    );
  };
}
function Zt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = z(r),
      i = mt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      u = e === "keys" && i,
      f = r[e](...s),
      h = n ? us : t ? ds : Ht;
    return (
      !t && ke(o, "iterate", u ? Kn : rt),
      {
        next() {
          const { value: v, done: w } = f.next();
          return w
            ? { value: v, done: w }
            : { value: l ? [h(v[0]), h(v[1])] : h(v), done: w };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ve(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function si() {
  const e = {
      get(o) {
        return Vt(this, o);
      },
      get size() {
        return Yt(this);
      },
      has: Jt,
      add: Ms,
      set: Fs,
      delete: Rs,
      clear: Ss,
      forEach: Xt(!1, !1),
    },
    t = {
      get(o) {
        return Vt(this, o, !1, !0);
      },
      get size() {
        return Yt(this);
      },
      has: Jt,
      add: Ms,
      set: Fs,
      delete: Rs,
      clear: Ss,
      forEach: Xt(!1, !0),
    },
    n = {
      get(o) {
        return Vt(this, o, !0);
      },
      get size() {
        return Yt(this, !0);
      },
      has(o) {
        return Jt.call(this, o, !0);
      },
      add: Ve("add"),
      set: Ve("set"),
      delete: Ve("delete"),
      clear: Ve("clear"),
      forEach: Xt(!0, !1),
    },
    s = {
      get(o) {
        return Vt(this, o, !0, !0);
      },
      get size() {
        return Yt(this, !0);
      },
      has(o) {
        return Jt.call(this, o, !0);
      },
      add: Ve("add"),
      set: Ve("set"),
      delete: Ve("delete"),
      clear: Ve("clear"),
      forEach: Xt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Zt(o, !1, !1)),
        (n[o] = Zt(o, !0, !1)),
        (t[o] = Zt(o, !1, !0)),
        (s[o] = Zt(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [ri, oi, ii, li] = si();
function as(e, t) {
  const n = t ? (e ? li : ii) : e ? oi : ri;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(q(n, r) && r in s ? n : s, r, o);
}
const ci = { get: as(!1, !1) },
  ui = { get: as(!1, !0) },
  ai = { get: as(!0, !1) },
  Cr = new WeakMap(),
  Er = new WeakMap(),
  kr = new WeakMap(),
  fi = new WeakMap();
function di(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function hi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : di(So(e));
}
function wn(e) {
  return Nt(e) ? e : fs(e, !1, $r, ci, Cr);
}
function pi(e) {
  return fs(e, !1, ni, ui, Er);
}
function Tr(e) {
  return fs(e, !0, ti, ai, kr);
}
function fs(e, t, n, s, r) {
  if (!ae(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = hi(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function vt(e) {
  return Nt(e) ? vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Nt(e) {
  return !!(e && e.__v_isReadonly);
}
function Pr(e) {
  return !!(e && e.__v_isShallow);
}
function Ar(e) {
  return vt(e) || Nt(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function It(e) {
  return nn(e, "__v_skip", !0), e;
}
const Ht = (e) => (ae(e) ? wn(e) : e),
  ds = (e) => (ae(e) ? Tr(e) : e);
function Lr(e) {
  Ze && Se && ((e = z(e)), yr(e.dep || (e.dep = is())));
}
function Ir(e, t) {
  (e = z(e)), e.dep && Wn(e.dep);
}
function de(e) {
  return !!(e && e.__v_isRef === !0);
}
function $n(e) {
  return Or(e, !1);
}
function _i(e) {
  return Or(e, !0);
}
function Or(e, t) {
  return de(e) ? e : new gi(e, t);
}
class gi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : z(t)),
      (this._value = n ? t : Ht(t));
  }
  get value() {
    return Lr(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : z(t)),
      St(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : Ht(t)),
        Ir(this));
  }
}
function C(e) {
  return de(e) ? e.value : e;
}
const mi = {
  get: (e, t, n) => C(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return de(r) && !de(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Mr(e) {
  return vt(e) ? e : new Proxy(e, mi);
}
function Fr(e) {
  const t = F(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = bi(e, n);
  return t;
}
class vi {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function bi(e, t, n) {
  const s = e[t];
  return de(s) ? s : new vi(e, t, n);
}
class yi {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new ls(t, () => {
        this._dirty || ((this._dirty = !0), Ir(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = z(this);
    return (
      Lr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function xi(e, t, n = !1) {
  let s, r;
  const o = N(e);
  return (
    o ? ((s = e), (r = Oe)) : ((s = e.get), (r = e.set)),
    new yi(s, r, o || !r, n)
  );
}
Promise.resolve();
function Qe(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    Cn(o, t, n);
  }
  return r;
}
function Me(e, t, n, s) {
  if (N(e)) {
    const o = Qe(e, t, n, s);
    return (
      o &&
        pr(o) &&
        o.catch((i) => {
          Cn(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(Me(e[o], t, n, s));
  return r;
}
function Cn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let h = 0; h < f.length; h++) if (f[h](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Qe(u, null, 10, [e, i, l]);
      return;
    }
  }
  wi(e, n, r, s);
}
function wi(e, t, n, s = !0) {
  console.error(e);
}
let sn = !1,
  qn = !1;
const Ee = [];
let De = 0;
const Ot = [];
let At = null,
  ht = 0;
const Mt = [];
let Ye = null,
  pt = 0;
const Rr = Promise.resolve();
let hs = null,
  zn = null;
function Sr(e) {
  const t = hs || Rr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $i(e) {
  let t = De + 1,
    n = Ee.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Bt(Ee[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function Nr(e) {
  (!Ee.length || !Ee.includes(e, sn && e.allowRecurse ? De + 1 : De)) &&
    e !== zn &&
    (e.id == null ? Ee.push(e) : Ee.splice($i(e.id), 0, e), Hr());
}
function Hr() {
  !sn && !qn && ((qn = !0), (hs = Rr.then(Ur)));
}
function Ci(e) {
  const t = Ee.indexOf(e);
  t > De && Ee.splice(t, 1);
}
function Br(e, t, n, s) {
  F(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e),
    Hr();
}
function Ei(e) {
  Br(e, At, Ot, ht);
}
function ki(e) {
  Br(e, Ye, Mt, pt);
}
function ps(e, t = null) {
  if (Ot.length) {
    for (
      zn = t, At = [...new Set(Ot)], Ot.length = 0, ht = 0;
      ht < At.length;
      ht++
    )
      At[ht]();
    (At = null), (ht = 0), (zn = null), ps(e, t);
  }
}
function rn(e) {
  if (Mt.length) {
    const t = [...new Set(Mt)];
    if (((Mt.length = 0), Ye)) {
      Ye.push(...t);
      return;
    }
    for (Ye = t, Ye.sort((n, s) => Bt(n) - Bt(s)), pt = 0; pt < Ye.length; pt++)
      Ye[pt]();
    (Ye = null), (pt = 0);
  }
}
const Bt = (e) => (e.id == null ? 1 / 0 : e.id);
function Ur(e) {
  (qn = !1), (sn = !0), ps(e), Ee.sort((n, s) => Bt(n) - Bt(s));
  const t = Oe;
  try {
    for (De = 0; De < Ee.length; De++) {
      const n = Ee[De];
      n && n.active !== !1 && Qe(n, null, 14);
    }
  } finally {
    (De = 0),
      (Ee.length = 0),
      rn(),
      (sn = !1),
      (hs = null),
      (Ee.length || Ot.length || Mt.length) && Ur(e);
  }
}
function Ti(e, t, ...n) {
  const s = e.vnode.props || Q;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const h = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: v, trim: w } = s[h] || Q;
    w ? (r = n.map((P) => P.trim())) : v && (r = n.map(Bo));
  }
  let l,
    u = s[(l = Fn(t))] || s[(l = Fn(Ne(t)))];
  !u && o && (u = s[(l = Fn(xt(t)))]), u && Me(u, e, 6, r);
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Me(f, e, 6, r);
  }
}
function jr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!N(e)) {
    const u = (f) => {
      const h = jr(f, t, !0);
      h && ((l = !0), ye(i, h));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !l
    ? (s.set(e, null), null)
    : (F(o) ? o.forEach((u) => (i[u] = null)) : ye(i, o), s.set(e, i), i);
}
function _s(e, t) {
  return !e || !Kt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      q(e, t[0].toLowerCase() + t.slice(1)) || q(e, xt(t)) || q(e, t));
}
let Ie = null,
  En = null;
function on(e) {
  const t = Ie;
  return (Ie = e), (En = (e && e.type.__scopeId) || null), t;
}
function Dr(e) {
  En = e;
}
function Kr() {
  En = null;
}
function je(e, t = Ie, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && zs(-1);
    const o = on(t),
      i = e(...r);
    return on(o), s._d && zs(1), i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Sn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: u,
    emit: f,
    render: h,
    renderCache: v,
    data: w,
    setupState: P,
    ctx: M,
    inheritAttrs: V,
  } = e;
  let g, x;
  const K = on(e);
  try {
    if (n.shapeFlag & 4) {
      const B = r || s;
      (g = Le(h.call(B, B, v, o, P, w, M))), (x = u);
    } else {
      const B = t;
      (g = Le(
        B.length > 1 ? B(o, { attrs: u, slots: l, emit: f }) : B(o, null)
      )),
        (x = t.props ? u : Pi(u));
    }
  } catch (B) {
    (Rt.length = 0), Cn(B, e, 1), (g = H(We));
  }
  let I = g;
  if (x && V !== !1) {
    const B = Object.keys(x),
      { shapeFlag: X } = I;
    B.length && X & 7 && (i && B.some(ns) && (x = Ai(x, i)), (I = jt(I, x)));
  }
  return (
    n.dirs && (I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs),
    n.transition && (I.transition = n.transition),
    (g = I),
    on(K),
    g
  );
}
const Pi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Kt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ai = (e, t) => {
    const n = {};
    for (const s in e) (!ns(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Li(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: u } = t,
    f = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? Ns(s, i, f) : !!i;
    if (u & 8) {
      const h = t.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        const w = h[v];
        if (i[w] !== s[w] && !_s(f, w)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? Ns(s, i, f)
        : !0
      : !!i;
  return !1;
}
function Ns(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !_s(n, o)) return !0;
  }
  return !1;
}
function Ii({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Oi = (e) => e.__isSuspense;
function Wr(e, t) {
  t && t.pendingBranch
    ? F(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ki(e);
}
function Mi(e, t) {
  if (pe) {
    let n = pe.provides;
    const s = pe.parent && pe.parent.provides;
    s === n && (n = pe.provides = Object.create(s)), (n[e] = t);
  }
}
function Ft(e, t, n = !1) {
  const s = pe || Ie;
  if (s) {
    const r =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && N(t) ? t.call(s.proxy) : t;
  }
}
function qr(e, t) {
  return gs(e, null, t);
}
const Hs = {};
function ot(e, t, n) {
  return gs(e, t, n);
}
function gs(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = Q
) {
  const l = pe;
  let u,
    f = !1,
    h = !1;
  if (
    (de(e)
      ? ((u = () => e.value), (f = Pr(e)))
      : vt(e)
      ? ((u = () => e), (s = !0))
      : F(e)
      ? ((h = !0),
        (f = e.some(vt)),
        (u = () =>
          e.map((x) => {
            if (de(x)) return x.value;
            if (vt(x)) return _t(x);
            if (N(x)) return Qe(x, l, 2);
          })))
      : N(e)
      ? t
        ? (u = () => Qe(e, l, 2))
        : (u = () => {
            if (!(l && l.isUnmounted)) return v && v(), Me(e, l, 3, [w]);
          })
      : (u = Oe),
    t && s)
  ) {
    const x = u;
    u = () => _t(x());
  }
  let v,
    w = (x) => {
      v = g.onStop = () => {
        Qe(x, l, 4);
      };
    };
  if (Dt)
    return (w = Oe), t ? n && Me(t, l, 3, [u(), h ? [] : void 0, w]) : u(), Oe;
  let P = h ? [] : Hs;
  const M = () => {
    if (!!g.active)
      if (t) {
        const x = g.run();
        (s || f || (h ? x.some((K, I) => St(K, P[I])) : St(x, P))) &&
          (v && v(), Me(t, l, 3, [x, P === Hs ? void 0 : P, w]), (P = x));
      } else g.run();
  };
  M.allowRecurse = !!t;
  let V;
  r === "sync"
    ? (V = M)
    : r === "post"
    ? (V = () => $e(M, l && l.suspense))
    : (V = () => {
        !l || l.isMounted ? Ei(M) : M();
      });
  const g = new ls(u, V);
  return (
    t
      ? n
        ? M()
        : (P = g.run())
      : r === "post"
      ? $e(g.run.bind(g), l && l.suspense)
      : g.run(),
    () => {
      g.stop(), l && l.scope && ss(l.scope.effects, g);
    }
  );
}
function Fi(e, t, n) {
  const s = this.proxy,
    r = he(e) ? (e.includes(".") ? zr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  N(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = pe;
  bt(this);
  const l = gs(r, o.bind(s), n);
  return i ? bt(i) : lt(), l;
}
function zr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function _t(e, t) {
  if (!ae(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), de(e))) _t(e.value, t);
  else if (F(e)) for (let n = 0; n < e.length; n++) _t(e[n], t);
  else if (hr(e) || mt(e))
    e.forEach((n) => {
      _t(n, t);
    });
  else if (gr(e)) for (const n in e) _t(e[n], t);
  return e;
}
function ie(e) {
  return N(e) ? { setup: e, name: e.name } : e;
}
const ln = (e) => !!e.type.__asyncLoader,
  Vr = (e) => e.type.__isKeepAlive;
function Ri(e, t) {
  Jr(e, "a", t);
}
function Si(e, t) {
  Jr(e, "da", t);
}
function Jr(e, t, n = pe) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((kn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Vr(r.parent.vnode) && Ni(s, t, n, r), (r = r.parent);
  }
}
function Ni(e, t, n, s) {
  const r = kn(t, e, s, !0);
  Tn(() => {
    ss(s[t], r);
  }, n);
}
function kn(e, t, n = pe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          wt(), bt(n);
          const l = Me(t, n, e, i);
          return lt(), $t(), l;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const qe =
    (e) =>
    (t, n = pe) =>
      (!Dt || e === "sp") && kn(e, t, n),
  Hi = qe("bm"),
  Ct = qe("m"),
  Bi = qe("bu"),
  Yr = qe("u"),
  Ui = qe("bum"),
  Tn = qe("um"),
  ji = qe("sp"),
  Di = qe("rtg"),
  Ki = qe("rtc");
function Wi(e, t = pe) {
  kn("ec", e, t);
}
let Vn = !0;
function qi(e) {
  const t = Zr(e),
    n = e.proxy,
    s = e.ctx;
  (Vn = !1), t.beforeCreate && Bs(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: u,
    inject: f,
    created: h,
    beforeMount: v,
    mounted: w,
    beforeUpdate: P,
    updated: M,
    activated: V,
    deactivated: g,
    beforeDestroy: x,
    beforeUnmount: K,
    destroyed: I,
    unmounted: B,
    render: X,
    renderTracked: Z,
    renderTriggered: U,
    errorCaptured: le,
    serverPrefetch: ne,
    expose: re,
    inheritAttrs: _e,
    components: D,
    directives: oe,
    filters: xe,
  } = t;
  if ((f && zi(f, s, null, e.appContext.config.unwrapInjectedRef), i))
    for (const se in i) {
      const G = i[se];
      N(G) && (s[se] = G.bind(n));
    }
  if (r) {
    const se = r.call(n, n);
    ae(se) && (e.data = wn(se));
  }
  if (((Vn = !0), o))
    for (const se in o) {
      const G = o[se],
        He = N(G) ? G.bind(n, n) : N(G.get) ? G.get.bind(n, n) : Oe,
        In = !N(G) && N(G.set) ? G.set.bind(n) : Oe,
        Et = j({ get: He, set: In });
      Object.defineProperty(s, se, {
        enumerable: !0,
        configurable: !0,
        get: () => Et.value,
        set: (at) => (Et.value = at),
      });
    }
  if (l) for (const se in l) Xr(l[se], s, n, se);
  if (u) {
    const se = N(u) ? u.call(n) : u;
    Reflect.ownKeys(se).forEach((G) => {
      Mi(G, se[G]);
    });
  }
  h && Bs(h, e, "c");
  function we(se, G) {
    F(G) ? G.forEach((He) => se(He.bind(n))) : G && se(G.bind(n));
  }
  if (
    (we(Hi, v),
    we(Ct, w),
    we(Bi, P),
    we(Yr, M),
    we(Ri, V),
    we(Si, g),
    we(Wi, le),
    we(Ki, Z),
    we(Di, U),
    we(Ui, K),
    we(Tn, B),
    we(ji, ne),
    F(re))
  )
    if (re.length) {
      const se = e.exposed || (e.exposed = {});
      re.forEach((G) => {
        Object.defineProperty(se, G, {
          get: () => n[G],
          set: (He) => (n[G] = He),
        });
      });
    } else e.exposed || (e.exposed = {});
  X && e.render === Oe && (e.render = X),
    _e != null && (e.inheritAttrs = _e),
    D && (e.components = D),
    oe && (e.directives = oe);
}
function zi(e, t, n = Oe, s = !1) {
  F(e) && (e = Jn(e));
  for (const r in e) {
    const o = e[r];
    let i;
    ae(o)
      ? "default" in o
        ? (i = Ft(o.from || r, o.default, !0))
        : (i = Ft(o.from || r))
      : (i = Ft(o)),
      de(i) && s
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (t[r] = i);
  }
}
function Bs(e, t, n) {
  Me(F(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Xr(e, t, n, s) {
  const r = s.includes(".") ? zr(n, s) : () => n[s];
  if (he(e)) {
    const o = t[e];
    N(o) && ot(r, o);
  } else if (N(e)) ot(r, e.bind(n));
  else if (ae(e))
    if (F(e)) e.forEach((o) => Xr(o, t, n, s));
    else {
      const o = N(e.handler) ? e.handler.bind(n) : t[e.handler];
      N(o) && ot(r, o, e);
    }
}
function Zr(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let u;
  return (
    l
      ? (u = l)
      : !r.length && !n && !s
      ? (u = t)
      : ((u = {}), r.length && r.forEach((f) => cn(u, f, i, !0)), cn(u, t, i)),
    o.set(t, u),
    u
  );
}
function cn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && cn(e, o, n, !0), r && r.forEach((i) => cn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Vi[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Vi = {
  data: Us,
  props: nt,
  emits: nt,
  methods: nt,
  computed: nt,
  beforeCreate: ve,
  created: ve,
  beforeMount: ve,
  mounted: ve,
  beforeUpdate: ve,
  updated: ve,
  beforeDestroy: ve,
  beforeUnmount: ve,
  destroyed: ve,
  unmounted: ve,
  activated: ve,
  deactivated: ve,
  errorCaptured: ve,
  serverPrefetch: ve,
  components: nt,
  directives: nt,
  watch: Yi,
  provide: Us,
  inject: Ji,
};
function Us(e, t) {
  return t
    ? e
      ? function () {
          return ye(
            N(e) ? e.call(this, this) : e,
            N(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Ji(e, t) {
  return nt(Jn(e), Jn(t));
}
function Jn(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function nt(e, t) {
  return e ? ye(ye(Object.create(null), e), t) : t;
}
function Yi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ye(Object.create(null), e);
  for (const s in t) n[s] = ve(e[s], t[s]);
  return n;
}
function Xi(e, t, n, s = !1) {
  const r = {},
    o = {};
  nn(o, Pn, 1), (e.propsDefaults = Object.create(null)), Qr(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : pi(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function Zi(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = z(r),
    [u] = e.propsOptions;
  let f = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const h = e.vnode.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        let w = h[v];
        const P = t[w];
        if (u)
          if (q(o, w)) P !== o[w] && ((o[w] = P), (f = !0));
          else {
            const M = Ne(w);
            r[M] = Yn(u, l, M, P, e, !1);
          }
        else P !== o[w] && ((o[w] = P), (f = !0));
      }
    }
  } else {
    Qr(e, t, r, o) && (f = !0);
    let h;
    for (const v in l)
      (!t || (!q(t, v) && ((h = xt(v)) === v || !q(t, h)))) &&
        (u
          ? n &&
            (n[v] !== void 0 || n[h] !== void 0) &&
            (r[v] = Yn(u, l, v, void 0, e, !0))
          : delete r[v]);
    if (o !== l)
      for (const v in o) (!t || (!q(t, v) && !0)) && (delete o[v], (f = !0));
  }
  f && Ke(e, "set", "$attrs");
}
function Qr(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let u in t) {
      if (Lt(u)) continue;
      const f = t[u];
      let h;
      r && q(r, (h = Ne(u)))
        ? !o || !o.includes(h)
          ? (n[h] = f)
          : ((l || (l = {}))[h] = f)
        : _s(e.emitsOptions, u) ||
          ((!(u in s) || f !== s[u]) && ((s[u] = f), (i = !0)));
    }
  if (o) {
    const u = z(n),
      f = l || Q;
    for (let h = 0; h < o.length; h++) {
      const v = o[h];
      n[v] = Yn(r, u, v, f[v], e, !q(f, v));
    }
  }
  return i;
}
function Yn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = q(i, "default");
    if (l && s === void 0) {
      const u = i.default;
      if (i.type !== Function && N(u)) {
        const { propsDefaults: f } = r;
        n in f ? (s = f[n]) : (bt(r), (s = f[n] = u.call(null, t)), lt());
      } else s = u;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === xt(n)) && (s = !0));
  }
  return s;
}
function Gr(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let u = !1;
  if (!N(e)) {
    const h = (v) => {
      u = !0;
      const [w, P] = Gr(v, t, !0);
      ye(i, w), P && l.push(...P);
    };
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h);
  }
  if (!o && !u) return s.set(e, gt), gt;
  if (F(o))
    for (let h = 0; h < o.length; h++) {
      const v = Ne(o[h]);
      js(v) && (i[v] = Q);
    }
  else if (o)
    for (const h in o) {
      const v = Ne(h);
      if (js(v)) {
        const w = o[h],
          P = (i[v] = F(w) || N(w) ? { type: w } : w);
        if (P) {
          const M = Ws(Boolean, P.type),
            V = Ws(String, P.type);
          (P[0] = M > -1),
            (P[1] = V < 0 || M < V),
            (M > -1 || q(P, "default")) && l.push(v);
        }
      }
    }
  const f = [i, l];
  return s.set(e, f), f;
}
function js(e) {
  return e[0] !== "$";
}
function Ds(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Ks(e, t) {
  return Ds(e) === Ds(t);
}
function Ws(e, t) {
  return F(t) ? t.findIndex((n) => Ks(n, e)) : N(t) && Ks(t, e) ? 0 : -1;
}
const eo = (e) => e[0] === "_" || e === "$stable",
  ms = (e) => (F(e) ? e.map(Le) : [Le(e)]),
  Qi = (e, t, n) => {
    const s = je((...r) => ms(t(...r)), n);
    return (s._c = !1), s;
  },
  to = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (eo(r)) continue;
      const o = e[r];
      if (N(o)) t[r] = Qi(r, o, s);
      else if (o != null) {
        const i = ms(o);
        t[r] = () => i;
      }
    }
  },
  no = (e, t) => {
    const n = ms(t);
    e.slots.default = () => n;
  },
  Gi = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = z(t)), nn(t, "_", n)) : to(t, (e.slots = {}));
    } else (e.slots = {}), t && no(e, t);
    nn(e.slots, Pn, 1);
  },
  el = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = Q;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (ye(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), to(t, r)),
        (i = t);
    } else t && (no(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !eo(l) && !(l in i) && delete r[l];
  };
function Re(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let u = l.dir[s];
    u && (wt(), Me(u, n, 8, [e.el, l, e, t]), $t());
  }
}
function so() {
  return {
    app: null,
    config: {
      isNativeTag: Mo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let tl = 0;
function nl(e, t) {
  return function (s, r = null) {
    r != null && !ae(r) && (r = null);
    const o = so(),
      i = new Set();
    let l = !1;
    const u = (o.app = {
      _uid: tl++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: $l,
      get config() {
        return o.config;
      },
      set config(f) {},
      use(f, ...h) {
        return (
          i.has(f) ||
            (f && N(f.install)
              ? (i.add(f), f.install(u, ...h))
              : N(f) && (i.add(f), f(u, ...h))),
          u
        );
      },
      mixin(f) {
        return o.mixins.includes(f) || o.mixins.push(f), u;
      },
      component(f, h) {
        return h ? ((o.components[f] = h), u) : o.components[f];
      },
      directive(f, h) {
        return h ? ((o.directives[f] = h), u) : o.directives[f];
      },
      mount(f, h, v) {
        if (!l) {
          const w = H(s, r);
          return (
            (w.appContext = o),
            h && t ? t(w, f) : e(w, f, v),
            (l = !0),
            (u._container = f),
            (f.__vue_app__ = u),
            ys(w.component) || w.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return (o.provides[f] = h), u;
      },
    });
    return u;
  };
}
function un(e, t, n, s, r = !1) {
  if (F(e)) {
    e.forEach((w, P) => un(w, t && (F(t) ? t[P] : t), n, s, r));
    return;
  }
  if (ln(s) && !r) return;
  const o = s.shapeFlag & 4 ? ys(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: u } = e,
    f = t && t.r,
    h = l.refs === Q ? (l.refs = {}) : l.refs,
    v = l.setupState;
  if (
    (f != null &&
      f !== u &&
      (he(f)
        ? ((h[f] = null), q(v, f) && (v[f] = null))
        : de(f) && (f.value = null)),
    N(u))
  )
    Qe(u, l, 12, [i, h]);
  else {
    const w = he(u),
      P = de(u);
    if (w || P) {
      const M = () => {
        if (e.f) {
          const V = w ? h[u] : u.value;
          r
            ? F(V) && ss(V, o)
            : F(V)
            ? V.includes(o) || V.push(o)
            : w
            ? (h[u] = [o])
            : ((u.value = [o]), e.k && (h[e.k] = u.value));
        } else
          w
            ? ((h[u] = i), q(v, u) && (v[u] = i))
            : de(u) && ((u.value = i), e.k && (h[e.k] = i));
      };
      i ? ((M.id = -1), $e(M, n)) : M();
    }
  }
}
let Je = !1;
const Qt = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  Nn = (e) => e.nodeType === 8;
function sl(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        nextSibling: r,
        parentNode: o,
        remove: i,
        insert: l,
        createComment: u,
      },
    } = e,
    f = (g, x) => {
      if (!x.hasChildNodes()) {
        n(null, g, x), rn();
        return;
      }
      (Je = !1),
        h(x.firstChild, g, null, null, null),
        rn(),
        Je && console.error("Hydration completed but contains mismatches.");
    },
    h = (g, x, K, I, B, X = !1) => {
      const Z = Nn(g) && g.data === "[",
        U = () => M(g, x, K, I, B, Z),
        { type: le, ref: ne, shapeFlag: re } = x,
        _e = g.nodeType;
      x.el = g;
      let D = null;
      switch (le) {
        case Ut:
          _e !== 3
            ? (D = U())
            : (g.data !== x.children && ((Je = !0), (g.data = x.children)),
              (D = r(g)));
          break;
        case We:
          _e !== 8 || Z ? (D = U()) : (D = r(g));
          break;
        case en:
          if (_e !== 1) D = U();
          else {
            D = g;
            const oe = !x.children.length;
            for (let xe = 0; xe < x.staticCount; xe++)
              oe && (x.children += D.outerHTML),
                xe === x.staticCount - 1 && (x.anchor = D),
                (D = r(D));
            return D;
          }
          break;
        case fe:
          Z ? (D = P(g, x, K, I, B, X)) : (D = U());
          break;
        default:
          if (re & 1)
            _e !== 1 || x.type.toLowerCase() !== g.tagName.toLowerCase()
              ? (D = U())
              : (D = v(g, x, K, I, B, X));
          else if (re & 6) {
            x.slotScopeIds = B;
            const oe = o(g);
            if (
              (t(x, oe, null, K, I, Qt(oe), X), (D = Z ? V(g) : r(g)), ln(x))
            ) {
              let xe;
              Z
                ? ((xe = H(fe)),
                  (xe.anchor = D ? D.previousSibling : oe.lastChild))
                : (xe = g.nodeType === 3 ? Wt("") : H("div")),
                (xe.el = g),
                (x.component.subTree = xe);
            }
          } else
            re & 64
              ? _e !== 8
                ? (D = U())
                : (D = x.type.hydrate(g, x, K, I, B, X, e, w))
              : re & 128 &&
                (D = x.type.hydrate(g, x, K, I, Qt(o(g)), B, X, e, h));
      }
      return ne != null && un(ne, null, I, x), D;
    },
    v = (g, x, K, I, B, X) => {
      X = X || !!x.dynamicChildren;
      const { type: Z, props: U, patchFlag: le, shapeFlag: ne, dirs: re } = x,
        _e = (Z === "input" && re) || Z === "option";
      if (_e || le !== -1) {
        if ((re && Re(x, null, K, "created"), U))
          if (_e || !X || le & 48)
            for (const oe in U)
              ((_e && oe.endsWith("value")) || (Kt(oe) && !Lt(oe))) &&
                s(g, oe, null, U[oe], !1, void 0, K);
          else U.onClick && s(g, "onClick", null, U.onClick, !1, void 0, K);
        let D;
        if (
          ((D = U && U.onVnodeBeforeMount) && Te(D, K, x),
          re && Re(x, null, K, "beforeMount"),
          ((D = U && U.onVnodeMounted) || re) &&
            Wr(() => {
              D && Te(D, K, x), re && Re(x, null, K, "mounted");
            }, I),
          ne & 16 && !(U && (U.innerHTML || U.textContent)))
        ) {
          let oe = w(g.firstChild, x, g, K, I, B, X);
          for (; oe; ) {
            Je = !0;
            const xe = oe;
            (oe = oe.nextSibling), i(xe);
          }
        } else
          ne & 8 &&
            g.textContent !== x.children &&
            ((Je = !0), (g.textContent = x.children));
      }
      return g.nextSibling;
    },
    w = (g, x, K, I, B, X, Z) => {
      Z = Z || !!x.dynamicChildren;
      const U = x.children,
        le = U.length;
      for (let ne = 0; ne < le; ne++) {
        const re = Z ? U[ne] : (U[ne] = Le(U[ne]));
        if (g) g = h(g, re, I, B, X, Z);
        else {
          if (re.type === Ut && !re.children) continue;
          (Je = !0), n(null, re, K, null, I, B, Qt(K), X);
        }
      }
      return g;
    },
    P = (g, x, K, I, B, X) => {
      const { slotScopeIds: Z } = x;
      Z && (B = B ? B.concat(Z) : Z);
      const U = o(g),
        le = w(r(g), x, U, K, I, B, X);
      return le && Nn(le) && le.data === "]"
        ? r((x.anchor = le))
        : ((Je = !0), l((x.anchor = u("]")), U, le), le);
    },
    M = (g, x, K, I, B, X) => {
      if (((Je = !0), (x.el = null), X)) {
        const le = V(g);
        for (;;) {
          const ne = r(g);
          if (ne && ne !== le) i(ne);
          else break;
        }
      }
      const Z = r(g),
        U = o(g);
      return i(g), n(null, x, U, Z, K, I, Qt(U), B), Z;
    },
    V = (g) => {
      let x = 0;
      for (; g; )
        if (
          ((g = r(g)), g && Nn(g) && (g.data === "[" && x++, g.data === "]"))
        ) {
          if (x === 0) return r(g);
          x--;
        }
      return g;
    };
  return [f, h];
}
const $e = Wr;
function rl(e) {
  return ol(e, sl);
}
function ol(e, t) {
  const n = Uo();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: u,
      setText: f,
      setElementText: h,
      parentNode: v,
      nextSibling: w,
      setScopeId: P = Oe,
      cloneNode: M,
      insertStaticContent: V,
    } = e,
    g = (
      c,
      a,
      d,
      _ = null,
      p = null,
      y = null,
      E = !1,
      b = null,
      $ = !!a.dynamicChildren
    ) => {
      if (c === a) return;
      c && !Tt(c, a) && ((_ = zt(c)), ze(c, p, y, !0), (c = null)),
        a.patchFlag === -2 && (($ = !1), (a.dynamicChildren = null));
      const { type: m, ref: A, shapeFlag: k } = a;
      switch (m) {
        case Ut:
          x(c, a, d, _);
          break;
        case We:
          K(c, a, d, _);
          break;
        case en:
          c == null && I(a, d, _, E);
          break;
        case fe:
          oe(c, a, d, _, p, y, E, b, $);
          break;
        default:
          k & 1
            ? Z(c, a, d, _, p, y, E, b, $)
            : k & 6
            ? xe(c, a, d, _, p, y, E, b, $)
            : (k & 64 || k & 128) && m.process(c, a, d, _, p, y, E, b, $, ft);
      }
      A != null && p && un(A, c && c.ref, y, a || c, !a);
    },
    x = (c, a, d, _) => {
      if (c == null) s((a.el = l(a.children)), d, _);
      else {
        const p = (a.el = c.el);
        a.children !== c.children && f(p, a.children);
      }
    },
    K = (c, a, d, _) => {
      c == null ? s((a.el = u(a.children || "")), d, _) : (a.el = c.el);
    },
    I = (c, a, d, _) => {
      [c.el, c.anchor] = V(c.children, a, d, _, c.el, c.anchor);
    },
    B = ({ el: c, anchor: a }, d, _) => {
      let p;
      for (; c && c !== a; ) (p = w(c)), s(c, d, _), (c = p);
      s(a, d, _);
    },
    X = ({ el: c, anchor: a }) => {
      let d;
      for (; c && c !== a; ) (d = w(c)), r(c), (c = d);
      r(a);
    },
    Z = (c, a, d, _, p, y, E, b, $) => {
      (E = E || a.type === "svg"),
        c == null ? U(a, d, _, p, y, E, b, $) : re(c, a, p, y, E, b, $);
    },
    U = (c, a, d, _, p, y, E, b) => {
      let $, m;
      const {
        type: A,
        props: k,
        shapeFlag: L,
        transition: O,
        patchFlag: W,
        dirs: te,
      } = c;
      if (c.el && M !== void 0 && W === -1) $ = c.el = M(c.el);
      else {
        if (
          (($ = c.el = i(c.type, y, k && k.is, k)),
          L & 8
            ? h($, c.children)
            : L & 16 &&
              ne(c.children, $, null, _, p, y && A !== "foreignObject", E, b),
          te && Re(c, null, _, "created"),
          k)
        ) {
          for (const ee in k)
            ee !== "value" &&
              !Lt(ee) &&
              o($, ee, null, k[ee], y, c.children, _, p, Be);
          "value" in k && o($, "value", null, k.value),
            (m = k.onVnodeBeforeMount) && Te(m, _, c);
        }
        le($, c, c.scopeId, E, _);
      }
      te && Re(c, null, _, "beforeMount");
      const Y = (!p || (p && !p.pendingBranch)) && O && !O.persisted;
      Y && O.beforeEnter($),
        s($, a, d),
        ((m = k && k.onVnodeMounted) || Y || te) &&
          $e(() => {
            m && Te(m, _, c), Y && O.enter($), te && Re(c, null, _, "mounted");
          }, p);
    },
    le = (c, a, d, _, p) => {
      if ((d && P(c, d), _)) for (let y = 0; y < _.length; y++) P(c, _[y]);
      if (p) {
        let y = p.subTree;
        if (a === y) {
          const E = p.vnode;
          le(c, E, E.scopeId, E.slotScopeIds, p.parent);
        }
      }
    },
    ne = (c, a, d, _, p, y, E, b, $ = 0) => {
      for (let m = $; m < c.length; m++) {
        const A = (c[m] = b ? Xe(c[m]) : Le(c[m]));
        g(null, A, a, d, _, p, y, E, b);
      }
    },
    re = (c, a, d, _, p, y, E) => {
      const b = (a.el = c.el);
      let { patchFlag: $, dynamicChildren: m, dirs: A } = a;
      $ |= c.patchFlag & 16;
      const k = c.props || Q,
        L = a.props || Q;
      let O;
      d && tt(d, !1),
        (O = L.onVnodeBeforeUpdate) && Te(O, d, a, c),
        A && Re(a, c, d, "beforeUpdate"),
        d && tt(d, !0);
      const W = p && a.type !== "foreignObject";
      if (
        (m
          ? _e(c.dynamicChildren, m, b, d, _, W, y)
          : E || He(c, a, b, null, d, _, W, y, !1),
        $ > 0)
      ) {
        if ($ & 16) D(b, a, k, L, d, _, p);
        else if (
          ($ & 2 && k.class !== L.class && o(b, "class", null, L.class, p),
          $ & 4 && o(b, "style", k.style, L.style, p),
          $ & 8)
        ) {
          const te = a.dynamicProps;
          for (let Y = 0; Y < te.length; Y++) {
            const ee = te[Y],
              Ae = k[ee],
              dt = L[ee];
            (dt !== Ae || ee === "value") &&
              o(b, ee, Ae, dt, p, c.children, d, _, Be);
          }
        }
        $ & 1 && c.children !== a.children && h(b, a.children);
      } else !E && m == null && D(b, a, k, L, d, _, p);
      ((O = L.onVnodeUpdated) || A) &&
        $e(() => {
          O && Te(O, d, a, c), A && Re(a, c, d, "updated");
        }, _);
    },
    _e = (c, a, d, _, p, y, E) => {
      for (let b = 0; b < a.length; b++) {
        const $ = c[b],
          m = a[b],
          A =
            $.el && ($.type === fe || !Tt($, m) || $.shapeFlag & 70)
              ? v($.el)
              : d;
        g($, m, A, null, _, p, y, E, !0);
      }
    },
    D = (c, a, d, _, p, y, E) => {
      if (d !== _) {
        for (const b in _) {
          if (Lt(b)) continue;
          const $ = _[b],
            m = d[b];
          $ !== m && b !== "value" && o(c, b, m, $, E, a.children, p, y, Be);
        }
        if (d !== Q)
          for (const b in d)
            !Lt(b) && !(b in _) && o(c, b, d[b], null, E, a.children, p, y, Be);
        "value" in _ && o(c, "value", d.value, _.value);
      }
    },
    oe = (c, a, d, _, p, y, E, b, $) => {
      const m = (a.el = c ? c.el : l("")),
        A = (a.anchor = c ? c.anchor : l(""));
      let { patchFlag: k, dynamicChildren: L, slotScopeIds: O } = a;
      O && (b = b ? b.concat(O) : O),
        c == null
          ? (s(m, d, _), s(A, d, _), ne(a.children, d, A, p, y, E, b, $))
          : k > 0 && k & 64 && L && c.dynamicChildren
          ? (_e(c.dynamicChildren, L, d, p, y, E, b),
            (a.key != null || (p && a === p.subTree)) && ro(c, a, !0))
          : He(c, a, d, A, p, y, E, b, $);
    },
    xe = (c, a, d, _, p, y, E, b, $) => {
      (a.slotScopeIds = b),
        c == null
          ? a.shapeFlag & 512
            ? p.ctx.activate(a, d, _, E, $)
            : Ln(a, d, _, p, y, E, $)
          : we(c, a, $);
    },
    Ln = (c, a, d, _, p, y, E) => {
      const b = (c.component = gl(c, _, p));
      if ((Vr(c) && (b.ctx.renderer = ft), ml(b), b.asyncDep)) {
        if ((p && p.registerDep(b, se), !c.el)) {
          const $ = (b.subTree = H(We));
          K(null, $, a, d);
        }
        return;
      }
      se(b, c, a, d, p, y, E);
    },
    we = (c, a, d) => {
      const _ = (a.component = c.component);
      if (Li(c, a, d))
        if (_.asyncDep && !_.asyncResolved) {
          G(_, a, d);
          return;
        } else (_.next = a), Ci(_.update), _.update();
      else (a.component = c.component), (a.el = c.el), (_.vnode = a);
    },
    se = (c, a, d, _, p, y, E) => {
      const b = () => {
          if (c.isMounted) {
            let { next: A, bu: k, u: L, parent: O, vnode: W } = c,
              te = A,
              Y;
            tt(c, !1),
              A ? ((A.el = W.el), G(c, A, E)) : (A = W),
              k && Rn(k),
              (Y = A.props && A.props.onVnodeBeforeUpdate) && Te(Y, O, A, W),
              tt(c, !0);
            const ee = Sn(c),
              Ae = c.subTree;
            (c.subTree = ee),
              g(Ae, ee, v(Ae.el), zt(Ae), c, p, y),
              (A.el = ee.el),
              te === null && Ii(c, ee.el),
              L && $e(L, p),
              (Y = A.props && A.props.onVnodeUpdated) &&
                $e(() => Te(Y, O, A, W), p);
          } else {
            let A;
            const { el: k, props: L } = a,
              { bm: O, m: W, parent: te } = c,
              Y = ln(a);
            if (
              (tt(c, !1),
              O && Rn(O),
              !Y && (A = L && L.onVnodeBeforeMount) && Te(A, te, a),
              tt(c, !0),
              k && Mn)
            ) {
              const ee = () => {
                (c.subTree = Sn(c)), Mn(k, c.subTree, c, p, null);
              };
              Y
                ? a.type.__asyncLoader().then(() => !c.isUnmounted && ee())
                : ee();
            } else {
              const ee = (c.subTree = Sn(c));
              g(null, ee, d, _, c, p, y), (a.el = ee.el);
            }
            if ((W && $e(W, p), !Y && (A = L && L.onVnodeMounted))) {
              const ee = a;
              $e(() => Te(A, te, ee), p);
            }
            a.shapeFlag & 256 && c.a && $e(c.a, p),
              (c.isMounted = !0),
              (a = d = _ = null);
          }
        },
        $ = (c.effect = new ls(b, () => Nr(c.update), c.scope)),
        m = (c.update = $.run.bind($));
      (m.id = c.uid), tt(c, !0), m();
    },
    G = (c, a, d) => {
      a.component = c;
      const _ = c.vnode.props;
      (c.vnode = a),
        (c.next = null),
        Zi(c, a.props, _, d),
        el(c, a.children, d),
        wt(),
        ps(void 0, c.update),
        $t();
    },
    He = (c, a, d, _, p, y, E, b, $ = !1) => {
      const m = c && c.children,
        A = c ? c.shapeFlag : 0,
        k = a.children,
        { patchFlag: L, shapeFlag: O } = a;
      if (L > 0) {
        if (L & 128) {
          Et(m, k, d, _, p, y, E, b, $);
          return;
        } else if (L & 256) {
          In(m, k, d, _, p, y, E, b, $);
          return;
        }
      }
      O & 8
        ? (A & 16 && Be(m, p, y), k !== m && h(d, k))
        : A & 16
        ? O & 16
          ? Et(m, k, d, _, p, y, E, b, $)
          : Be(m, p, y, !0)
        : (A & 8 && h(d, ""), O & 16 && ne(k, d, _, p, y, E, b, $));
    },
    In = (c, a, d, _, p, y, E, b, $) => {
      (c = c || gt), (a = a || gt);
      const m = c.length,
        A = a.length,
        k = Math.min(m, A);
      let L;
      for (L = 0; L < k; L++) {
        const O = (a[L] = $ ? Xe(a[L]) : Le(a[L]));
        g(c[L], O, d, null, p, y, E, b, $);
      }
      m > A ? Be(c, p, y, !0, !1, k) : ne(a, d, _, p, y, E, b, $, k);
    },
    Et = (c, a, d, _, p, y, E, b, $) => {
      let m = 0;
      const A = a.length;
      let k = c.length - 1,
        L = A - 1;
      for (; m <= k && m <= L; ) {
        const O = c[m],
          W = (a[m] = $ ? Xe(a[m]) : Le(a[m]));
        if (Tt(O, W)) g(O, W, d, null, p, y, E, b, $);
        else break;
        m++;
      }
      for (; m <= k && m <= L; ) {
        const O = c[k],
          W = (a[L] = $ ? Xe(a[L]) : Le(a[L]));
        if (Tt(O, W)) g(O, W, d, null, p, y, E, b, $);
        else break;
        k--, L--;
      }
      if (m > k) {
        if (m <= L) {
          const O = L + 1,
            W = O < A ? a[O].el : _;
          for (; m <= L; )
            g(null, (a[m] = $ ? Xe(a[m]) : Le(a[m])), d, W, p, y, E, b, $), m++;
        }
      } else if (m > L) for (; m <= k; ) ze(c[m], p, y, !0), m++;
      else {
        const O = m,
          W = m,
          te = new Map();
        for (m = W; m <= L; m++) {
          const Ce = (a[m] = $ ? Xe(a[m]) : Le(a[m]));
          Ce.key != null && te.set(Ce.key, m);
        }
        let Y,
          ee = 0;
        const Ae = L - W + 1;
        let dt = !1,
          Ts = 0;
        const kt = new Array(Ae);
        for (m = 0; m < Ae; m++) kt[m] = 0;
        for (m = O; m <= k; m++) {
          const Ce = c[m];
          if (ee >= Ae) {
            ze(Ce, p, y, !0);
            continue;
          }
          let Fe;
          if (Ce.key != null) Fe = te.get(Ce.key);
          else
            for (Y = W; Y <= L; Y++)
              if (kt[Y - W] === 0 && Tt(Ce, a[Y])) {
                Fe = Y;
                break;
              }
          Fe === void 0
            ? ze(Ce, p, y, !0)
            : ((kt[Fe - W] = m + 1),
              Fe >= Ts ? (Ts = Fe) : (dt = !0),
              g(Ce, a[Fe], d, null, p, y, E, b, $),
              ee++);
        }
        const Ps = dt ? il(kt) : gt;
        for (Y = Ps.length - 1, m = Ae - 1; m >= 0; m--) {
          const Ce = W + m,
            Fe = a[Ce],
            As = Ce + 1 < A ? a[Ce + 1].el : _;
          kt[m] === 0
            ? g(null, Fe, d, As, p, y, E, b, $)
            : dt && (Y < 0 || m !== Ps[Y] ? at(Fe, d, As, 2) : Y--);
        }
      }
    },
    at = (c, a, d, _, p = null) => {
      const { el: y, type: E, transition: b, children: $, shapeFlag: m } = c;
      if (m & 6) {
        at(c.component.subTree, a, d, _);
        return;
      }
      if (m & 128) {
        c.suspense.move(a, d, _);
        return;
      }
      if (m & 64) {
        E.move(c, a, d, ft);
        return;
      }
      if (E === fe) {
        s(y, a, d);
        for (let k = 0; k < $.length; k++) at($[k], a, d, _);
        s(c.anchor, a, d);
        return;
      }
      if (E === en) {
        B(c, a, d);
        return;
      }
      if (_ !== 2 && m & 1 && b)
        if (_ === 0) b.beforeEnter(y), s(y, a, d), $e(() => b.enter(y), p);
        else {
          const { leave: k, delayLeave: L, afterLeave: O } = b,
            W = () => s(y, a, d),
            te = () => {
              k(y, () => {
                W(), O && O();
              });
            };
          L ? L(y, W, te) : te();
        }
      else s(y, a, d);
    },
    ze = (c, a, d, _ = !1, p = !1) => {
      const {
        type: y,
        props: E,
        ref: b,
        children: $,
        dynamicChildren: m,
        shapeFlag: A,
        patchFlag: k,
        dirs: L,
      } = c;
      if ((b != null && un(b, null, d, c, !0), A & 256)) {
        a.ctx.deactivate(c);
        return;
      }
      const O = A & 1 && L,
        W = !ln(c);
      let te;
      if ((W && (te = E && E.onVnodeBeforeUnmount) && Te(te, a, c), A & 6))
        To(c.component, d, _);
      else {
        if (A & 128) {
          c.suspense.unmount(d, _);
          return;
        }
        O && Re(c, null, a, "beforeUnmount"),
          A & 64
            ? c.type.remove(c, a, d, p, ft, _)
            : m && (y !== fe || (k > 0 && k & 64))
            ? Be(m, a, d, !1, !0)
            : ((y === fe && k & 384) || (!p && A & 16)) && Be($, a, d),
          _ && Es(c);
      }
      ((W && (te = E && E.onVnodeUnmounted)) || O) &&
        $e(() => {
          te && Te(te, a, c), O && Re(c, null, a, "unmounted");
        }, d);
    },
    Es = (c) => {
      const { type: a, el: d, anchor: _, transition: p } = c;
      if (a === fe) {
        ko(d, _);
        return;
      }
      if (a === en) {
        X(c);
        return;
      }
      const y = () => {
        r(d), p && !p.persisted && p.afterLeave && p.afterLeave();
      };
      if (c.shapeFlag & 1 && p && !p.persisted) {
        const { leave: E, delayLeave: b } = p,
          $ = () => E(d, y);
        b ? b(c.el, y, $) : $();
      } else y();
    },
    ko = (c, a) => {
      let d;
      for (; c !== a; ) (d = w(c)), r(c), (c = d);
      r(a);
    },
    To = (c, a, d) => {
      const { bum: _, scope: p, update: y, subTree: E, um: b } = c;
      _ && Rn(_),
        p.stop(),
        y && ((y.active = !1), ze(E, c, a, d)),
        b && $e(b, a),
        $e(() => {
          c.isUnmounted = !0;
        }, a),
        a &&
          a.pendingBranch &&
          !a.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === a.pendingId &&
          (a.deps--, a.deps === 0 && a.resolve());
    },
    Be = (c, a, d, _ = !1, p = !1, y = 0) => {
      for (let E = y; E < c.length; E++) ze(c[E], a, d, _, p);
    },
    zt = (c) =>
      c.shapeFlag & 6
        ? zt(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : w(c.anchor || c.el),
    ks = (c, a, d) => {
      c == null
        ? a._vnode && ze(a._vnode, null, null, !0)
        : g(a._vnode || null, c, a, null, null, null, d),
        rn(),
        (a._vnode = c);
    },
    ft = {
      p: g,
      um: ze,
      m: at,
      r: Es,
      mt: Ln,
      mc: ne,
      pc: He,
      pbc: _e,
      n: zt,
      o: e,
    };
  let On, Mn;
  return (
    t && ([On, Mn] = t(ft)), { render: ks, hydrate: On, createApp: nl(ks, On) }
  );
}
function tt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ro(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (F(s) && F(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = Xe(r[o])), (l.el = i.el)),
        n || ro(i, l));
    }
}
function il(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const f = e[s];
    if (f !== 0) {
      if (((r = n[n.length - 1]), e[r] < f)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < f ? (o = l + 1) : (i = l);
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const ll = (e) => e.__isTeleport,
  oo = "components";
function an(e, t) {
  return ul(oo, e, !0, t) || e;
}
const cl = Symbol();
function ul(e, t, n = !0, s = !1) {
  const r = Ie || pe;
  if (r) {
    const o = r.type;
    if (e === oo) {
      const l = xl(o);
      if (l && (l === t || l === Ne(t) || l === yn(Ne(t)))) return o;
    }
    const i = qs(r[e] || o[e], t) || qs(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function qs(e, t) {
  return e && (e[t] || e[Ne(t)] || e[yn(Ne(t))]);
}
const fe = Symbol(void 0),
  Ut = Symbol(void 0),
  We = Symbol(void 0),
  en = Symbol(void 0),
  Rt = [];
let it = null;
function T(e = !1) {
  Rt.push((it = e ? null : []));
}
function al() {
  Rt.pop(), (it = Rt[Rt.length - 1] || null);
}
let fn = 1;
function zs(e) {
  fn += e;
}
function io(e) {
  return (
    (e.dynamicChildren = fn > 0 ? it || gt : null),
    al(),
    fn > 0 && it && it.push(e),
    e
  );
}
function R(e, t, n, s, r, o) {
  return io(S(e, t, n, s, r, o, !0));
}
function ge(e, t, n, s, r) {
  return io(H(e, t, n, s, r, !0));
}
function dn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Tt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Pn = "__vInternal",
  lo = ({ key: e }) => (e != null ? e : null),
  tn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? he(e) || de(e) || N(e)
        ? { i: Ie, r: e, k: t, f: !!n }
        : e
      : null;
function S(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === fe ? 0 : 1,
  i = !1,
  l = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && lo(t),
    ref: t && tn(t),
    scopeId: En,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    l
      ? (vs(u, n), o & 128 && e.normalize(u))
      : n && (u.shapeFlag |= he(n) ? 8 : 16),
    fn > 0 &&
      !i &&
      it &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      it.push(u),
    u
  );
}
const H = fl;
function fl(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === cl) && (e = We), dn(e))) {
    const l = jt(e, t, !0);
    return n && vs(l, n), l;
  }
  if ((wl(e) && (e = e.__vccOpts), t)) {
    t = dl(t);
    let { class: l, style: u } = t;
    l && !he(l) && (t.class = ct(l)),
      ae(u) && (Ar(u) && !F(u) && (u = ye({}, u)), (t.style = ts(u)));
  }
  const i = he(e) ? 1 : Oi(e) ? 128 : ll(e) ? 64 : ae(e) ? 4 : N(e) ? 2 : 0;
  return S(e, t, n, s, r, i, o, !0);
}
function dl(e) {
  return e ? (Ar(e) || Pn in e ? ye({}, e) : e) : null;
}
function jt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? bs(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && lo(l),
    ref:
      t && t.ref ? (n && r ? (F(r) ? r.concat(tn(t)) : [r, tn(t)]) : tn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== fe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && jt(e.ssContent),
    ssFallback: e.ssFallback && jt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Wt(e = " ", t = 0) {
  return H(Ut, null, e, t);
}
function J(e = "", t = !1) {
  return t ? (T(), ge(We, null, e)) : H(We, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean"
    ? H(We)
    : F(e)
    ? H(fe, null, e.slice())
    : typeof e == "object"
    ? Xe(e)
    : H(Ut, null, String(e));
}
function Xe(e) {
  return e.el === null || e.memo ? e : jt(e);
}
function vs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (F(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), vs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Pn in t)
        ? (t._ctx = Ie)
        : r === 3 &&
          Ie &&
          (Ie.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    N(t)
      ? ((t = { default: t, _ctx: Ie }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Wt(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function bs(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ct([t.class, s.class]));
      else if (r === "style") t.style = ts([t.style, s.style]);
      else if (Kt(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(F(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Te(e, t, n, s = null) {
  Me(e, t, 7, [n, s]);
}
function An(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (F(e) || he(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (ae(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, u = i.length; l < u; l++) {
        const f = i[l];
        r[l] = t(e[f], f, l, o && o[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
function ue(e, t, n = {}, s, r) {
  if (Ie.isCE) return H("slot", t === "default" ? null : { name: t }, s && s());
  let o = e[t];
  o && o._c && (o._d = !1), T();
  const i = o && co(o(n)),
    l = ge(
      fe,
      { key: n.key || `_${t}` },
      i || (s ? s() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
  );
}
function co(e) {
  return e.some((t) =>
    dn(t) ? !(t.type === We || (t.type === fe && !co(t.children))) : !0
  )
    ? e
    : null;
}
const Xn = (e) => (e ? (uo(e) ? ys(e) || e.proxy : Xn(e.parent)) : null),
  hn = ye(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Xn(e.parent),
    $root: (e) => Xn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Zr(e),
    $forceUpdate: (e) => () => Nr(e.update),
    $nextTick: (e) => Sr.bind(e.proxy),
    $watch: (e) => Fi.bind(e),
  }),
  hl = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: u,
      } = e;
      let f;
      if (t[0] !== "$") {
        const P = i[t];
        if (P !== void 0)
          switch (P) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (s !== Q && q(s, t)) return (i[t] = 1), s[t];
          if (r !== Q && q(r, t)) return (i[t] = 2), r[t];
          if ((f = e.propsOptions[0]) && q(f, t)) return (i[t] = 3), o[t];
          if (n !== Q && q(n, t)) return (i[t] = 4), n[t];
          Vn && (i[t] = 0);
        }
      }
      const h = hn[t];
      let v, w;
      if (h) return t === "$attrs" && ke(e, "get", t), h(e);
      if ((v = l.__cssModules) && (v = v[t])) return v;
      if (n !== Q && q(n, t)) return (i[t] = 4), n[t];
      if (((w = u.config.globalProperties), q(w, t))) return w[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return r !== Q && q(r, t)
        ? ((r[t] = n), !0)
        : s !== Q && q(s, t)
        ? ((s[t] = n), !0)
        : q(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== Q && q(e, i)) ||
        (t !== Q && q(t, i)) ||
        ((l = o[0]) && q(l, i)) ||
        q(s, i) ||
        q(hn, i) ||
        q(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? this.set(e, t, n.get(), null)
          : n.value != null && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  },
  pl = so();
let _l = 0;
function gl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || pl,
    o = {
      uid: _l++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new jo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Gr(s, r),
      emitsOptions: jr(s, r),
      emit: null,
      emitted: null,
      propsDefaults: Q,
      inheritAttrs: s.inheritAttrs,
      ctx: Q,
      data: Q,
      props: Q,
      attrs: Q,
      slots: Q,
      refs: Q,
      setupState: Q,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Ti.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let pe = null;
const bt = (e) => {
    (pe = e), e.scope.on();
  },
  lt = () => {
    pe && pe.scope.off(), (pe = null);
  };
function uo(e) {
  return e.vnode.shapeFlag & 4;
}
let Dt = !1;
function ml(e, t = !1) {
  Dt = t;
  const { props: n, children: s } = e.vnode,
    r = uo(e);
  Xi(e, n, r, t), Gi(e, s);
  const o = r ? vl(e, t) : void 0;
  return (Dt = !1), o;
}
function vl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = It(new Proxy(e.ctx, hl)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? yl(e) : null);
    bt(e), wt();
    const o = Qe(s, e, 0, [e.props, r]);
    if (($t(), lt(), pr(o))) {
      if ((o.then(lt, lt), t))
        return o
          .then((i) => {
            Vs(e, i, t);
          })
          .catch((i) => {
            Cn(i, e, 0);
          });
      e.asyncDep = o;
    } else Vs(e, o, t);
  } else ao(e, t);
}
function Vs(e, t, n) {
  N(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ae(t) && (e.setupState = Mr(t)),
    ao(e, n);
}
let Js;
function ao(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Js && !s.render) {
      const r = s.template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: u } = s,
          f = ye(ye({ isCustomElement: o, delimiters: l }, i), u);
        s.render = Js(r, f);
      }
    }
    e.render = s.render || Oe;
  }
  bt(e), wt(), qi(e), $t(), lt();
}
function bl(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return ke(e, "get", "$attrs"), t[n];
    },
  });
}
function yl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = bl(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ys(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Mr(It(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in hn) return hn[n](e);
        },
      }))
    );
}
function xl(e) {
  return (N(e) && e.displayName) || e.name;
}
function wl(e) {
  return N(e) && "__vccOpts" in e;
}
const j = (e, t) => xi(e, t, Dt);
function ut(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? ae(t) && !F(t)
      ? dn(t)
        ? H(e, null, [t])
        : H(e, t)
      : H(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && dn(n) && (n = [n]),
      H(e, t, n));
}
const $l = "3.2.31",
  Cl = "http://www.w3.org/2000/svg",
  st = typeof document != "undefined" ? document : null,
  Ys = st && st.createElement("template"),
  El = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? st.createElementNS(Cl, e)
        : st.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => st.createTextNode(e),
    createComment: (e) => st.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => st.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        Ys.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Ys.content;
        if (s) {
          const u = l.firstChild;
          for (; u.firstChild; ) l.appendChild(u.firstChild);
          l.removeChild(u);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function kl(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Tl(e, t, n) {
  const s = e.style,
    r = he(n);
  if (n && !r) {
    for (const o in n) Zn(s, o, n[o]);
    if (t && !he(t)) for (const o in t) n[o] == null && Zn(s, o, "");
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = o);
  }
}
const Xs = /\s*!important$/;
function Zn(e, t, n) {
  if (F(n)) n.forEach((s) => Zn(e, t, s));
  else if (t.startsWith("--")) e.setProperty(t, n);
  else {
    const s = Pl(e, t);
    Xs.test(n)
      ? e.setProperty(xt(s), n.replace(Xs, ""), "important")
      : (e[s] = n);
  }
}
const Zs = ["Webkit", "Moz", "ms"],
  Hn = {};
function Pl(e, t) {
  const n = Hn[t];
  if (n) return n;
  let s = Ne(t);
  if (s !== "filter" && s in e) return (Hn[t] = s);
  s = yn(s);
  for (let r = 0; r < Zs.length; r++) {
    const o = Zs[r] + s;
    if (o in e) return (Hn[t] = o);
  }
  return t;
}
const Qs = "http://www.w3.org/1999/xlink";
function Al(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Qs, t.slice(6, t.length))
      : e.setAttributeNS(Qs, t, n);
  else {
    const o = Ao(t);
    n == null || (o && !fr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Ll(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const l = n == null ? "" : n;
    (e.value !== l || e.tagName === "OPTION") && (e.value = l),
      n == null && e.removeAttribute(t);
    return;
  }
  if (n === "" || n == null) {
    const l = typeof e[t];
    if (l === "boolean") {
      e[t] = fr(n);
      return;
    } else if (n == null && l === "string") {
      (e[t] = ""), e.removeAttribute(t);
      return;
    } else if (l === "number") {
      try {
        e[t] = 0;
      } catch {}
      e.removeAttribute(t);
      return;
    }
  }
  try {
    e[t] = n;
  } catch {}
}
let pn = Date.now,
  fo = !1;
if (typeof window != "undefined") {
  pn() > document.createEvent("Event").timeStamp &&
    (pn = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  fo = !!(e && Number(e[1]) <= 53);
}
let Qn = 0;
const Il = Promise.resolve(),
  Ol = () => {
    Qn = 0;
  },
  Ml = () => Qn || (Il.then(Ol), (Qn = pn()));
function Fl(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Rl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Sl(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, u] = Nl(t);
    if (s) {
      const f = (o[t] = Hl(s, r));
      Fl(e, l, f, u);
    } else i && (Rl(e, l, i, u), (o[t] = void 0));
  }
}
const Gs = /(?:Once|Passive|Capture)$/;
function Nl(e) {
  let t;
  if (Gs.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(Gs)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [xt(e.slice(2)), t];
}
function Hl(e, t) {
  const n = (s) => {
    const r = s.timeStamp || pn();
    (fo || r >= n.attached - 1) && Me(Bl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Ml()), n;
}
function Bl(e, t) {
  if (F(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const er = /^on[a-z]/,
  Ul = (e, t, n, s, r = !1, o, i, l, u) => {
    t === "class"
      ? kl(e, s, r)
      : t === "style"
      ? Tl(e, n, s)
      : Kt(t)
      ? ns(t) || Sl(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : jl(e, t, s, r)
        )
      ? Ll(e, t, s, o, i, l, u)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Al(e, t, s, r));
  };
function jl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && er.test(t) && N(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (er.test(t) && he(n))
    ? !1
    : t in e;
}
const Dl = ye({ patchProp: Ul }, El);
let Bn,
  tr = !1;
function Kl() {
  return (Bn = tr ? Bn : rl(Dl)), (tr = !0), Bn;
}
const Wl = (...e) => {
  const t = Kl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = ql(s);
      if (r) return n(r, !0, r instanceof SVGElement);
    }),
    t
  );
};
function ql(e) {
  return he(e) ? document.querySelector(e) : e;
}
var zl =
  '{"lang":"en-US","title":"VitePress","description":"A VitePress site","base":"/","head":[],"themeConfig":{},"locales":{},"langs":{},"scrollOffset":90}';
const ho = /^https?:/i,
  Pe = typeof window != "undefined";
function Vl(e, t) {
  t.sort((n, s) => {
    const r = s.split("/").length - n.split("/").length;
    return r !== 0 ? r : s.length - n.length;
  });
  for (const n of t) if (e.startsWith(n)) return n;
}
function nr(e, t) {
  const n = Vl(t, Object.keys(e));
  return n ? e[n] : void 0;
}
function Jl(e) {
  const { locales: t } = e.themeConfig || {},
    n = e.locales;
  return t && n
    ? Object.keys(t).reduce(
        (s, r) => ((s[r] = { label: t[r].label, lang: n[r].lang }), s),
        {}
      )
    : {};
}
function Yl(e, t) {
  t = Xl(e, t);
  const n = nr(e.locales || {}, t),
    s = nr(e.themeConfig.locales || {}, t);
  return Object.assign({}, e, n, {
    themeConfig: Object.assign({}, e.themeConfig, s, { locales: {} }),
    lang: (n || e).lang,
    locales: {},
    langs: Jl(e),
  });
}
function Xl(e, t) {
  if (!Pe) return t;
  const n = e.base,
    s = n.endsWith("/") ? n.slice(0, -1) : n;
  return t.slice(s.length);
}
const po = Symbol(),
  qt = _i(Zl(zl));
function Zl(e) {
  return JSON.parse(e);
}
function Ql(e) {
  const t = j(() => Yl(qt.value, e.path));
  return {
    site: t,
    theme: j(() => t.value.themeConfig),
    page: j(() => e.data),
    frontmatter: j(() => e.data.frontmatter),
    lang: j(() => t.value.lang),
    localePath: j(() => {
      const { langs: n, lang: s } = t.value,
        r = Object.keys(n).find((o) => n[o].lang === s);
      return yt(r || "/");
    }),
    title: j(() =>
      e.data.title ? e.data.title + " | " + t.value.title : t.value.title
    ),
    description: j(() => e.data.description || t.value.description),
  };
}
function me() {
  const e = Ft(po);
  if (!e) throw new Error("vitepress data not properly injected in app");
  return e;
}
function Gl(e, t) {
  return `${e}${t}`.replace(/\/+/g, "/");
}
function yt(e) {
  return ho.test(e) ? e : Gl(qt.value.base, e);
}
function _o(e) {
  let t = e.replace(/\.html$/, "");
  if (((t = decodeURIComponent(t)), t.endsWith("/") && (t += "index"), Pe)) {
    const n = "/";
    t = t.slice(n.length).replace(/\//g, "_") + ".md";
    const s = __VP_HASH_MAP__[t.toLowerCase()];
    t = `${n}assets/${t}.${s}.js`;
  } else t = `./${t.slice(1).replace(/\//g, "_")}.md.js`;
  return t;
}
const go = Symbol(),
  sr = "http://a.com",
  mo = {
    relativePath: "",
    title: "404",
    description: "Not Found",
    headers: [],
    frontmatter: {},
    lastUpdated: 0,
  },
  ec = () => ({ path: "/", component: null, data: mo });
function tc(e, t) {
  const n = wn(ec());
  function s(i = Pe ? location.href : "/") {
    const l = new URL(i, sr);
    return (
      !l.pathname.endsWith("/") &&
        !l.pathname.endsWith(".html") &&
        ((l.pathname += ".html"), (i = l.pathname + l.search + l.hash)),
      Pe &&
        (history.replaceState(
          { scrollPosition: window.scrollY },
          document.title
        ),
        history.pushState(null, "", i)),
      o(i)
    );
  }
  let r = null;
  async function o(i, l = 0, u = !1) {
    const f = new URL(i, sr),
      h = (r = f.pathname);
    try {
      let v = e(h);
      if (
        ("then" in v && typeof v.then == "function" && (v = await v), r === h)
      ) {
        r = null;
        const { default: w, __pageData: P } = v;
        if (!w) throw new Error(`Invalid route component: ${w}`);
        (n.path = h),
          (n.component = It(w)),
          (n.data = It(JSON.parse(P))),
          Pe &&
            Sr(() => {
              if (f.hash && !l) {
                let M = null;
                try {
                  M = document.querySelector(decodeURIComponent(f.hash));
                } catch (V) {
                  console.warn(V);
                }
                if (M) {
                  rr(M, f.hash);
                  return;
                }
              }
              window.scrollTo(0, l);
            });
      }
    } catch (v) {
      if ((v.message.match(/fetch/) || console.error(v), !u))
        try {
          const w = await fetch(qt.value.base + "hashmap.json");
          (window.__VP_HASH_MAP__ = await w.json()), await o(i, l, !0);
          return;
        } catch {}
      r === h &&
        ((r = null),
        (n.path = h),
        (n.component = t ? It(t) : null),
        (n.data = mo));
    }
  }
  return (
    Pe &&
      (window.addEventListener(
        "click",
        (i) => {
          const l = i.target.closest("a");
          if (l) {
            const {
                href: u,
                protocol: f,
                hostname: h,
                pathname: v,
                hash: w,
                target: P,
              } = l,
              M = window.location,
              V = v.match(/\.\w+$/);
            !i.ctrlKey &&
              !i.shiftKey &&
              !i.altKey &&
              !i.metaKey &&
              P !== "_blank" &&
              f === M.protocol &&
              h === M.hostname &&
              !(V && V[0] !== ".html") &&
              (i.preventDefault(),
              v === M.pathname
                ? w &&
                  w !== M.hash &&
                  (history.pushState(null, "", w),
                  window.dispatchEvent(new Event("hashchange")),
                  rr(l, w, l.classList.contains("header-anchor")))
                : s(u));
          }
        },
        { capture: !0 }
      ),
      window.addEventListener("popstate", (i) => {
        o(location.href, (i.state && i.state.scrollPosition) || 0);
      }),
      window.addEventListener("hashchange", (i) => {
        i.preventDefault();
      })),
    { route: n, go: s }
  );
}
function nc() {
  const e = Ft(go);
  if (!e) throw new Error("useRouter() is called without provider.");
  return e;
}
function et() {
  return nc().route;
}
function rr(e, t, n = !1) {
  let s = null;
  try {
    s = e.classList.contains("header-anchor")
      ? e
      : document.querySelector(decodeURIComponent(t));
  } catch (r) {
    console.warn(r);
  }
  if (s) {
    let r = qt.value.scrollOffset;
    typeof r == "string" &&
      (r = document.querySelector(r).getBoundingClientRect().bottom + 24);
    const o = parseInt(window.getComputedStyle(s).paddingTop, 10),
      i = window.scrollY + s.getBoundingClientRect().top - r + o;
    !n || Math.abs(i - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, i)
      : window.scrollTo({ left: 0, top: i, behavior: "smooth" });
  }
}
function sc(e, t) {
  let n = [],
    s = !0;
  const r = (o) => {
    if (s) {
      s = !1;
      return;
    }
    const i = [],
      l = Math.min(n.length, o.length);
    for (let u = 0; u < l; u++) {
      let f = n[u];
      const [h, v, w = ""] = o[u];
      if (f.tagName.toLocaleLowerCase() === h) {
        for (const P in v)
          f.getAttribute(P) !== v[P] && f.setAttribute(P, v[P]);
        for (let P = 0; P < f.attributes.length; P++) {
          const M = f.attributes[P].name;
          M in v || f.removeAttribute(M);
        }
        f.innerHTML !== w && (f.innerHTML = w);
      } else
        document.head.removeChild(f), (f = or(o[u])), document.head.append(f);
      i.push(f);
    }
    n.slice(l).forEach((u) => document.head.removeChild(u)),
      o.slice(l).forEach((u) => {
        const f = or(u);
        document.head.appendChild(f), i.push(f);
      }),
      (n = i);
  };
  qr(() => {
    const o = e.data,
      i = t.value,
      l = o && o.title,
      u = o && o.description,
      f = o && o.frontmatter.head;
    (document.title = (l ? l + " | " : "") + i.title),
      document
        .querySelector("meta[name=description]")
        .setAttribute("content", u || i.description),
      r([...(f ? oc(f) : [])]);
  });
}
function or([e, t, n]) {
  const s = document.createElement(e);
  for (const r in t) s.setAttribute(r, t[r]);
  return n && (s.innerHTML = n), s;
}
function rc(e) {
  return e[0] === "meta" && e[1] && e[1].name === "description";
}
function oc(e) {
  return e.filter((t) => !rc(t));
}
const ic = ie({
  name: "VitePressContent",
  setup() {
    const e = et();
    return () =>
      ut("div", { style: { position: "relative" } }, [
        e.component ? ut(e.component) : null,
      ]);
  },
});
var ce = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t) n[s] = r;
  return n;
};
const lc = /#.*$/,
  cc = /(index)?\.(md|html)$/,
  _n = /\/$/,
  uc = /^[a-z]+:/i;
function xs(e) {
  return Array.isArray(e);
}
function ws(e) {
  return uc.test(e);
}
function ac(e, t) {
  if (t === void 0) return !1;
  const n = ir(`/${e.data.relativePath}`),
    s = ir(t);
  return n === s;
}
function ir(e) {
  return decodeURI(e).replace(lc, "").replace(cc, "");
}
function fc(e, t) {
  const n = e.endsWith("/"),
    s = t.startsWith("/");
  return n && s ? e.slice(0, -1) + t : !n && !s ? `${e}/${t}` : e + t;
}
function Gn(e) {
  return /^\//.test(e) ? e : `/${e}`;
}
function vo(e) {
  return e.replace(/(index)?(\.(md|html))?$/, "") || "/";
}
function dc(e) {
  return e === !1 || e === "auto" || xs(e);
}
function hc(e) {
  return e.children !== void 0;
}
function pc(e) {
  return xs(e) ? e.length === 0 : !e;
}
function $s(e, t) {
  if (dc(e)) return e;
  t = Gn(t);
  for (const n in e) if (t.startsWith(Gn(n))) return e[n];
  return "auto";
}
function bo(e) {
  return e.reduce(
    (t, n) => (
      n.link && t.push({ text: n.text, link: vo(n.link) }),
      hc(n) && (t = [...t, ...bo(n.children)]),
      t
    ),
    []
  );
}
function yo(e) {
  const t = et(),
    n = ws(e.value.link);
  return {
    props: j(() => {
      const r = lr(`/${t.data.relativePath}`);
      let o = !1;
      if (e.value.activeMatch) o = new RegExp(e.value.activeMatch).test(r);
      else {
        const i = lr(e.value.link);
        o = i === "/" ? i === r : r.startsWith(i);
      }
      return {
        class: { active: o, isExternal: n },
        href: n ? e.value.link : yt(e.value.link),
        target: e.value.target || (n ? "_blank" : null),
        rel: e.value.rel || (n ? "noopener noreferrer" : null),
        "aria-label": e.value.ariaLabel,
      };
    }),
    isExternal: n,
  };
}
function lr(e) {
  return e
    .replace(/#.*$/, "")
    .replace(/\?.*$/, "")
    .replace(/\.(html|md)$/, "")
    .replace(/\/index$/, "/");
}
const _c = {},
  gc = {
    class: "icon outbound",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    x: "0px",
    y: "0px",
    viewBox: "0 0 100 100",
    width: "15",
    height: "15",
  },
  mc = S(
    "path",
    {
      fill: "currentColor",
      d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z",
    },
    null,
    -1
  ),
  vc = S(
    "polygon",
    {
      fill: "currentColor",
      points:
        "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9",
    },
    null,
    -1
  ),
  bc = [mc, vc];
function yc(e, t) {
  return T(), R("svg", gc, bc);
}
var Cs = ce(_c, [["render", yc]]);
const xc = { class: "nav-link" },
  wc = ie({
    props: { item: null },
    setup(e) {
      const n = Fr(e),
        { props: s, isExternal: r } = yo(n.item);
      return (o, i) => (
        T(),
        R("div", xc, [
          S(
            "a",
            bs({ class: "item" }, C(s)),
            [
              Wt(be(e.item.text) + " ", 1),
              C(r) ? (T(), ge(Cs, { key: 0 })) : J("", !0),
            ],
            16
          ),
        ])
      );
    },
  });
var gn = ce(wc, [["__scopeId", "data-v-2100085f"]]);
const $c = { key: 0, class: "home-hero" },
  Cc = { key: 0, class: "figure" },
  Ec = ["src", "alt"],
  kc = { key: 1, id: "main-title", class: "title" },
  Tc = { key: 2, class: "tagline" },
  Pc = ie({
    setup(e) {
      const { site: t, frontmatter: n } = me(),
        s = j(() => {
          const {
            heroImage: i,
            heroText: l,
            tagline: u,
            actionLink: f,
            actionText: h,
          } = n.value;
          return i || l || u || (f && h);
        }),
        r = j(() => n.value.heroText || t.value.title),
        o = j(() => n.value.tagline || t.value.description);
      return (i, l) =>
        C(s)
          ? (T(),
            R("header", $c, [
              C(n).heroImage
                ? (T(),
                  R("figure", Cc, [
                    S(
                      "img",
                      {
                        class: "image",
                        src: C(yt)(C(n).heroImage),
                        alt: C(n).heroAlt,
                      },
                      null,
                      8,
                      Ec
                    ),
                  ]))
                : J("", !0),
              C(r) ? (T(), R("h1", kc, be(C(r)), 1)) : J("", !0),
              C(o) ? (T(), R("p", Tc, be(C(o)), 1)) : J("", !0),
              C(n).actionLink && C(n).actionText
                ? (T(),
                  ge(
                    gn,
                    {
                      key: 3,
                      item: { link: C(n).actionLink, text: C(n).actionText },
                      class: "action",
                    },
                    null,
                    8,
                    ["item"]
                  ))
                : J("", !0),
              C(n).altActionLink && C(n).altActionText
                ? (T(),
                  ge(
                    gn,
                    {
                      key: 4,
                      item: {
                        link: C(n).altActionLink,
                        text: C(n).altActionText,
                      },
                      class: "action alt",
                    },
                    null,
                    8,
                    ["item"]
                  ))
                : J("", !0),
            ]))
          : J("", !0);
    },
  });
var Ac = ce(Pc, [["__scopeId", "data-v-fad9538a"]]);
const Lc = { key: 0, class: "home-features" },
  Ic = { class: "wrapper" },
  Oc = { class: "container" },
  Mc = { class: "features" },
  Fc = { key: 0, class: "title" },
  Rc = { key: 1, class: "details" },
  Sc = ie({
    setup(e) {
      const { frontmatter: t } = me(),
        n = j(() => t.value.features && t.value.features.length > 0),
        s = j(() => (t.value.features ? t.value.features : []));
      return (r, o) =>
        C(n)
          ? (T(),
            R("div", Lc, [
              S("div", Ic, [
                S("div", Oc, [
                  S("div", Mc, [
                    (T(!0),
                    R(
                      fe,
                      null,
                      An(
                        C(s),
                        (i, l) => (
                          T(),
                          R("section", { key: l, class: "feature" }, [
                            i.title
                              ? (T(), R("h2", Fc, be(i.title), 1))
                              : J("", !0),
                            i.details
                              ? (T(), R("p", Rc, be(i.details), 1))
                              : J("", !0),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
              ]),
            ]))
          : J("", !0);
    },
  });
var Nc = ce(Sc, [["__scopeId", "data-v-95f2736a"]]);
const Hc = { key: 0, class: "footer" },
  Bc = { class: "container" },
  Uc = { class: "text" },
  jc = ie({
    setup(e) {
      const { frontmatter: t } = me();
      return (n, s) =>
        C(t).footer
          ? (T(),
            R("footer", Hc, [S("div", Bc, [S("p", Uc, be(C(t).footer), 1)])]))
          : J("", !0);
    },
  });
var Dc = ce(jc, [["__scopeId", "data-v-0b8dfcf3"]]);
const Kc = { class: "home", "aria-labelledby": "main-title" },
  Wc = { class: "home-content" },
  qc = ie({
    setup(e) {
      return (t, n) => {
        const s = an("Content");
        return (
          T(),
          R("main", Kc, [
            H(Ac),
            ue(t.$slots, "hero", {}, void 0, !0),
            H(Nc),
            S("div", Wc, [H(s)]),
            ue(t.$slots, "features", {}, void 0, !0),
            H(Dc),
            ue(t.$slots, "footer", {}, void 0, !0),
          ])
        );
      };
    },
  });
var zc = ce(qc, [["__scopeId", "data-v-613c231c"]]);
const Vc = ["href", "aria-label"],
  Jc = ["src"],
  Yc = ie({
    setup(e) {
      const { site: t, theme: n, localePath: s } = me();
      return (r, o) => (
        T(),
        R(
          "a",
          {
            class: "nav-bar-title",
            href: C(s),
            "aria-label": `${C(t).title}, back to home`,
          },
          [
            C(n).logo
              ? (T(),
                R(
                  "img",
                  { key: 0, class: "logo", src: C(yt)(C(n).logo), alt: "Logo" },
                  null,
                  8,
                  Jc
                ))
              : J("", !0),
            Wt(" " + be(C(t).title), 1),
          ],
          8,
          Vc
        )
      );
    },
  });
var Xc = ce(Yc, [["__scopeId", "data-v-b97d95cc"]]);
function Zc() {
  const { site: e, localePath: t, theme: n } = me();
  return j(() => {
    const s = e.value.langs,
      r = Object.keys(s);
    if (r.length < 2) return null;
    const i = et().path.replace(t.value, ""),
      l = r.map((f) => ({ text: s[f].label, link: `${f}${i}` }));
    return { text: n.value.selectText || "Languages", items: l };
  });
}
const Qc = ["GitHub", "GitLab", "Bitbucket"].map((e) => [
  e,
  new RegExp(e, "i"),
]);
function Gc() {
  const { site: e } = me();
  return j(() => {
    const t = e.value.themeConfig,
      n = t.docsRepo || t.repo;
    if (!n) return null;
    const s = eu(n);
    return { text: tu(s, t.repoLabel), link: s };
  });
}
function eu(e) {
  return ho.test(e) ? e : `https://github.com/${e}`;
}
function tu(e, t) {
  if (t) return t;
  const n = e.match(/^https?:\/\/[^/]+/);
  if (!n) return "Source";
  const s = Qc.find(([r, o]) => o.test(n[0]));
  return s && s[0] ? s[0] : "Source";
}
const nu = (e) => (Dr("data-v-3609119d"), (e = e()), Kr(), e),
  su = { class: "nav-dropdown-link-item" },
  ru = nu(() => S("span", { class: "arrow" }, null, -1)),
  ou = { class: "text" },
  iu = { class: "icon" },
  lu = ie({
    props: { item: null },
    setup(e) {
      const n = Fr(e),
        { props: s, isExternal: r } = yo(n.item);
      return (o, i) => (
        T(),
        R("div", su, [
          S(
            "a",
            bs({ class: "item" }, C(s)),
            [
              ru,
              S("span", ou, be(e.item.text), 1),
              S("span", iu, [C(r) ? (T(), ge(Cs, { key: 0 })) : J("", !0)]),
            ],
            16
          ),
        ])
      );
    },
  });
var cu = ce(lu, [["__scopeId", "data-v-3609119d"]]);
const uu = ["aria-label"],
  au = { class: "button-text" },
  fu = { class: "dialog" },
  du = ie({
    props: { item: null },
    setup(e) {
      const t = et(),
        n = $n(!1);
      ot(
        () => t.path,
        () => {
          n.value = !1;
        }
      );
      function s() {
        n.value = !n.value;
      }
      return (r, o) => (
        T(),
        R(
          "div",
          { class: ct(["nav-dropdown-link", { open: n.value }]) },
          [
            S(
              "button",
              { class: "button", "aria-label": e.item.ariaLabel, onClick: s },
              [
                S("span", au, be(e.item.text), 1),
                S(
                  "span",
                  { class: ct(["button-arrow", n.value ? "down" : "right"]) },
                  null,
                  2
                ),
              ],
              8,
              uu
            ),
            S("ul", fu, [
              (T(!0),
              R(
                fe,
                null,
                An(
                  e.item.items,
                  (i) => (
                    T(),
                    R("li", { key: i.text, class: "dialog-item" }, [
                      H(cu, { item: i }, null, 8, ["item"]),
                    ])
                  )
                ),
                128
              )),
            ]),
          ],
          2
        )
      );
    },
  });
var cr = ce(du, [["__scopeId", "data-v-139fdf24"]]);
const hu = { key: 0, class: "nav-links" },
  pu = { key: 1, class: "item" },
  _u = { key: 2, class: "item" },
  gu = ie({
    setup(e) {
      const { theme: t } = me(),
        n = Zc(),
        s = Gc(),
        r = j(() => t.value.nav || s.value || n.value);
      return (o, i) =>
        C(r)
          ? (T(),
            R("nav", hu, [
              C(t).nav
                ? (T(!0),
                  R(
                    fe,
                    { key: 0 },
                    An(
                      C(t).nav,
                      (l) => (
                        T(),
                        R("div", { key: l.text, class: "item" }, [
                          l.items
                            ? (T(),
                              ge(cr, { key: 0, item: l }, null, 8, ["item"]))
                            : (T(),
                              ge(gn, { key: 1, item: l }, null, 8, ["item"])),
                        ])
                      )
                    ),
                    128
                  ))
                : J("", !0),
              C(n)
                ? (T(),
                  R("div", pu, [H(cr, { item: C(n) }, null, 8, ["item"])]))
                : J("", !0),
              C(s)
                ? (T(),
                  R("div", _u, [H(gn, { item: C(s) }, null, 8, ["item"])]))
                : J("", !0),
            ]))
          : J("", !0);
    },
  });
var xo = ce(gu, [["__scopeId", "data-v-7673907c"]]);
const mu = { emits: ["toggle"] },
  vu = S(
    "svg",
    {
      class: "icon",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      role: "img",
      viewBox: "0 0 448 512",
    },
    [
      S("path", {
        fill: "currentColor",
        d: "M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z",
        class: "",
      }),
    ],
    -1
  ),
  bu = [vu];
function yu(e, t, n, s, r, o) {
  return (
    T(),
    R(
      "div",
      {
        class: "sidebar-button",
        onClick: t[0] || (t[0] = (i) => e.$emit("toggle")),
      },
      bu
    )
  );
}
var xu = ce(mu, [["render", yu]]);
const wu = (e) => (Dr("data-v-29f5408c"), (e = e()), Kr(), e),
  $u = { class: "nav-bar" },
  Cu = wu(() => S("div", { class: "flex-grow" }, null, -1)),
  Eu = { class: "nav" },
  ku = ie({
    emits: ["toggle"],
    setup(e) {
      return (t, n) => (
        T(),
        R("header", $u, [
          H(xu, { onToggle: n[0] || (n[0] = (s) => t.$emit("toggle")) }),
          H(Xc),
          Cu,
          S("div", Eu, [H(xo)]),
          ue(t.$slots, "search", {}, void 0, !0),
        ])
      );
    },
  });
var Tu = ce(ku, [["__scopeId", "data-v-29f5408c"]]);
function Pu() {
  let e = null,
    t = null;
  const n = Mu(s, 300);
  function s() {
    const i = Au(),
      l = Lu(i);
    for (let u = 0; u < l.length; u++) {
      const f = l[u],
        h = l[u + 1],
        [v, w] = Ou(u, f, h);
      if (v) {
        history.replaceState(null, document.title, w || " "), r(w);
        return;
      }
    }
  }
  function r(i) {
    if (
      (o(t), o(e), (t = document.querySelector(`.sidebar a[href="${i}"]`)), !t)
    )
      return;
    t.classList.add("active");
    const l = t.closest(".sidebar-links > ul > li");
    l && l !== t.parentElement
      ? ((e = l.querySelector("a")), e && e.classList.add("active"))
      : (e = null);
  }
  function o(i) {
    i && i.classList.remove("active");
  }
  Ct(() => {
    s(), window.addEventListener("scroll", n);
  }),
    Yr(() => {
      r(decodeURIComponent(location.hash));
    }),
    Tn(() => {
      window.removeEventListener("scroll", n);
    });
}
function Au() {
  return [].slice.call(
    document.querySelectorAll(".sidebar a.sidebar-link-item")
  );
}
function Lu(e) {
  return [].slice
    .call(document.querySelectorAll(".header-anchor"))
    .filter((t) => e.some((n) => n.hash === t.hash));
}
function Iu() {
  return document.querySelector(".nav-bar").offsetHeight;
}
function ur(e) {
  const t = Iu();
  return e.parentElement.offsetTop - t - 15;
}
function Ou(e, t, n) {
  const s = window.scrollY;
  return e === 0 && s === 0
    ? [!0, null]
    : s < ur(t)
    ? [!1, null]
    : !n || s < ur(n)
    ? [!0, decodeURIComponent(t.hash)]
    : [!1, null];
}
function Mu(e, t) {
  let n,
    s = !1;
  return () => {
    n && clearTimeout(n),
      s
        ? (n = setTimeout(e, t))
        : (e(),
          (s = !0),
          setTimeout(() => {
            s = !1;
          }, t));
  };
}
function Fu() {
  const e = et(),
    { site: t } = me();
  return (
    Pu(),
    j(() => {
      const n = e.data.headers,
        s = e.data.frontmatter.sidebar,
        r = e.data.frontmatter.sidebarDepth;
      if (s === !1) return [];
      if (s === "auto") return ar(n, r);
      const o = $s(t.value.themeConfig.sidebar, e.data.relativePath);
      return o === !1 ? [] : o === "auto" ? ar(n, r) : o;
    })
  );
}
function ar(e, t) {
  const n = [];
  if (e === void 0) return [];
  let s;
  return (
    e.forEach(({ level: r, title: o, slug: i }) => {
      if (r - 1 > t) return;
      const l = { text: o, link: `#${i}` };
      r === 2
        ? ((s = l), n.push(l))
        : s && (s.children || (s.children = [])).push(l);
    }),
    n
  );
}
const wo = (e) => {
  const t = et(),
    { site: n, frontmatter: s } = me(),
    r = e.depth || 1,
    o = s.value.sidebarDepth || 1 / 0,
    i = t.data.headers,
    l = e.item.text,
    u = Ru(n.value.base, e.item.link),
    f = e.item.children,
    h = ac(t, e.item.link),
    v = r < o ? $o(h, f, i, r + 1) : null;
  return ut("li", { class: "sidebar-link" }, [
    ut(
      u ? "a" : "p",
      { class: { "sidebar-link-item": !0, active: h }, href: u },
      l
    ),
    v,
  ]);
};
function Ru(e, t) {
  return t === void 0 || t.startsWith("#") ? t : fc(e, t);
}
function $o(e, t, n, s = 1) {
  return t && t.length > 0
    ? ut(
        "ul",
        { class: "sidebar-links" },
        t.map((r) => ut(wo, { item: r, depth: s }))
      )
    : e && n
    ? $o(!1, Su(n), void 0, s)
    : null;
}
function Su(e) {
  return Co(Nu(e));
}
function Nu(e) {
  e = e.map((n) => Object.assign({}, n));
  let t;
  return (
    e.forEach((n) => {
      n.level === 2 ? (t = n) : t && (t.children || (t.children = [])).push(n);
    }),
    e.filter((n) => n.level === 2)
  );
}
function Co(e) {
  return e.map((t) => ({
    text: t.title,
    link: `#${t.slug}`,
    children: t.children ? Co(t.children) : void 0,
  }));
}
const Hu = { key: 0, class: "sidebar-links" },
  Bu = ie({
    setup(e) {
      const t = Fu();
      return (n, s) =>
        C(t).length > 0
          ? (T(),
            R("ul", Hu, [
              (T(!0),
              R(
                fe,
                null,
                An(
                  C(t),
                  (r) => (T(), ge(C(wo), { item: r }, null, 8, ["item"]))
                ),
                256
              )),
            ]))
          : J("", !0);
    },
  });
const Uu = ie({
  props: { open: { type: Boolean } },
  setup(e) {
    return (t, n) => (
      T(),
      R(
        "aside",
        { class: ct(["sidebar", { open: e.open }]) },
        [
          H(xo, { class: "nav" }),
          ue(t.$slots, "sidebar-top", {}, void 0, !0),
          H(Bu),
          ue(t.$slots, "sidebar-bottom", {}, void 0, !0),
        ],
        2
      )
    );
  },
});
var ju = ce(Uu, [["__scopeId", "data-v-02eef771"]]);
const Du = /bitbucket.org/;
function Ku() {
  const { page: e, theme: t, frontmatter: n } = me(),
    s = j(() => {
      const {
          repo: o,
          docsDir: i = "",
          docsBranch: l = "master",
          docsRepo: u = o,
          editLinks: f,
        } = t.value,
        h = n.value.editLink != null ? n.value.editLink : f,
        { relativePath: v } = e.value;
      return !h || !v || !o ? null : Wu(o, u, i, l, v);
    }),
    r = j(() => t.value.editLinkText || "Edit this page");
  return { url: s, text: r };
}
function Wu(e, t, n, s, r) {
  return Du.test(e) ? zu(e, t, n, s, r) : qu(e, t, n, s, r);
}
function qu(e, t, n, s, r) {
  return (
    (ws(t) ? t : `https://github.com/${t}`).replace(_n, "") +
    `/edit/${s}/` +
    (n ? n.replace(_n, "") + "/" : "") +
    r
  );
}
function zu(e, t, n, s, r) {
  return (
    (ws(t) ? t : e).replace(_n, "") +
    `/src/${s}/` +
    (n ? n.replace(_n, "") + "/" : "") +
    r +
    `?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`
  );
}
const Vu = { class: "edit-link" },
  Ju = ["href"],
  Yu = ie({
    setup(e) {
      const { url: t, text: n } = Ku();
      return (s, r) => (
        T(),
        R("div", Vu, [
          C(t)
            ? (T(),
              R(
                "a",
                {
                  key: 0,
                  class: "link",
                  href: C(t),
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                [Wt(be(C(n)) + " ", 1), H(Cs, { class: "icon" })],
                8,
                Ju
              ))
            : J("", !0),
        ])
      );
    },
  });
var Xu = ce(Yu, [["__scopeId", "data-v-d3e5ec0c"]]);
const Zu = { key: 0, class: "last-updated" },
  Qu = { class: "prefix" },
  Gu = { class: "datetime" },
  ea = ie({
    setup(e) {
      const { theme: t, page: n } = me(),
        s = j(() => {
          const i = t.value.lastUpdated;
          return i !== void 0 && i !== !1 && n.value.lastUpdated !== 0;
        }),
        r = j(() => {
          const i = t.value.lastUpdated;
          return i === !0 ? "Last Updated" : i;
        }),
        o = $n("");
      return (
        Ct(() => {
          qr(() => {
            o.value = new Date(n.value.lastUpdated).toLocaleString("en-US");
          });
        }),
        (i, l) =>
          C(s)
            ? (T(),
              R("p", Zu, [
                S("span", Qu, be(C(r)) + ":", 1),
                S("span", Gu, be(o.value), 1),
              ]))
            : J("", !0)
      );
    },
  });
var ta = ce(ea, [["__scopeId", "data-v-31d78be8"]]);
const na = { class: "page-footer" },
  sa = { class: "edit" },
  ra = { class: "updated" },
  oa = ie({
    setup(e) {
      const { page: t } = me();
      return (n, s) => (
        T(),
        R("footer", na, [
          S("div", sa, [H(Xu)]),
          S("div", ra, [
            C(t).lastUpdated ? (T(), ge(ta, { key: 0 })) : J("", !0),
          ]),
        ])
      );
    },
  });
var ia = ce(oa, [["__scopeId", "data-v-3929cea7"]]);
function la() {
  const { page: e, theme: t } = me(),
    n = j(() => vo(Gn(e.value.relativePath))),
    s = j(() => {
      const u = $s(t.value.sidebar, n.value);
      return xs(u) ? bo(u) : [];
    }),
    r = j(() => s.value.findIndex((u) => u.link === n.value)),
    o = j(() => {
      if (
        t.value.nextLinks !== !1 &&
        r.value > -1 &&
        r.value < s.value.length - 1
      )
        return s.value[r.value + 1];
    }),
    i = j(() => {
      if (t.value.prevLinks !== !1 && r.value > 0) return s.value[r.value - 1];
    }),
    l = j(() => !!o.value || !!i.value);
  return { next: o, prev: i, hasLinks: l };
}
const ca = {},
  ua = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  aa = S(
    "path",
    {
      d: "M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z",
    },
    null,
    -1
  ),
  fa = [aa];
function da(e, t) {
  return T(), R("svg", ua, fa);
}
var ha = ce(ca, [["render", da]]);
const pa = {},
  _a = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  ga = S(
    "path",
    {
      d: "M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z",
    },
    null,
    -1
  ),
  ma = [ga];
function va(e, t) {
  return T(), R("svg", _a, ma);
}
var ba = ce(pa, [["render", va]]);
const ya = { key: 0, class: "next-and-prev-link" },
  xa = { class: "container" },
  wa = { class: "prev" },
  $a = ["href"],
  Ca = { class: "text" },
  Ea = { class: "next" },
  ka = ["href"],
  Ta = { class: "text" },
  Pa = ie({
    setup(e) {
      const { hasLinks: t, prev: n, next: s } = la();
      return (r, o) =>
        C(t)
          ? (T(),
            R("div", ya, [
              S("div", xa, [
                S("div", wa, [
                  C(n)
                    ? (T(),
                      R(
                        "a",
                        { key: 0, class: "link", href: C(yt)(C(n).link) },
                        [
                          H(ha, { class: "icon icon-prev" }),
                          S("span", Ca, be(C(n).text), 1),
                        ],
                        8,
                        $a
                      ))
                    : J("", !0),
                ]),
                S("div", Ea, [
                  C(s)
                    ? (T(),
                      R(
                        "a",
                        { key: 0, class: "link", href: C(yt)(C(s).link) },
                        [
                          S("span", Ta, be(C(s).text), 1),
                          H(ba, { class: "icon icon-next" }),
                        ],
                        8,
                        ka
                      ))
                    : J("", !0),
                ]),
              ]),
            ]))
          : J("", !0);
    },
  });
var Aa = ce(Pa, [["__scopeId", "data-v-40d9235a"]]);
const La = { class: "page" },
  Ia = { class: "container" },
  Oa = ie({
    setup(e) {
      return (t, n) => {
        const s = an("Content");
        return (
          T(),
          R("main", La, [
            S("div", Ia, [
              ue(t.$slots, "top", {}, void 0, !0),
              H(s, { class: "content" }),
              H(ia),
              H(Aa),
              ue(t.$slots, "bottom", {}, void 0, !0),
            ]),
          ])
        );
      };
    },
  });
var Ma = ce(Oa, [["__scopeId", "data-v-a2b604ae"]]);
const Fa = { key: 0, id: "ads-container" },
  Ra = ie({
    setup(e) {
      const t = () => null,
        n = t,
        s = t,
        r = t,
        o = et(),
        { site: i, page: l, theme: u, frontmatter: f } = me(),
        h = j(() => !!f.value.customLayout),
        v = j(() => !!f.value.home),
        w = j(() => Object.keys(i.value.langs).length > 1),
        P = j(() => {
          const I = u.value;
          return f.value.navbar === !1 || I.navbar === !1
            ? !1
            : i.value.title || I.logo || I.repo || I.nav;
        }),
        M = $n(!1),
        V = j(() =>
          f.value.home || f.value.sidebar === !1
            ? !1
            : !pc($s(u.value.sidebar, o.data.relativePath))
        ),
        g = (I) => {
          M.value = typeof I == "boolean" ? I : !M.value;
        },
        x = g.bind(null, !1);
      ot(o, x);
      const K = j(() => [
        {
          "no-navbar": !P.value,
          "sidebar-open": M.value,
          "no-sidebar": !V.value,
        },
      ]);
      return (I, B) => {
        const X = an("Content"),
          Z = an("Debug");
        return (
          T(),
          R(
            fe,
            null,
            [
              S(
                "div",
                { class: ct(["theme", C(K)]) },
                [
                  C(P)
                    ? (T(),
                      ge(
                        Tu,
                        { key: 0, onToggle: g },
                        {
                          search: je(() => [
                            ue(I.$slots, "navbar-search", {}, () => [
                              C(u).algolia
                                ? (T(),
                                  ge(
                                    C(r),
                                    {
                                      key: 0,
                                      options: C(u).algolia,
                                      multilang: C(w),
                                    },
                                    null,
                                    8,
                                    ["options", "multilang"]
                                  ))
                                : J("", !0),
                            ]),
                          ]),
                          _: 3,
                        }
                      ))
                    : J("", !0),
                  H(
                    ju,
                    { open: M.value },
                    {
                      "sidebar-top": je(() => [ue(I.$slots, "sidebar-top")]),
                      "sidebar-bottom": je(() => [
                        ue(I.$slots, "sidebar-bottom"),
                      ]),
                      _: 3,
                    },
                    8,
                    ["open"]
                  ),
                  S("div", {
                    class: "sidebar-mask",
                    onClick: B[0] || (B[0] = (U) => g(!1)),
                  }),
                  C(h)
                    ? (T(), ge(X, { key: 1 }))
                    : C(v)
                    ? ue(I.$slots, "home", { key: 2 }, () => [
                        H(zc, null, {
                          hero: je(() => [ue(I.$slots, "home-hero")]),
                          features: je(() => [ue(I.$slots, "home-features")]),
                          footer: je(() => [ue(I.$slots, "home-footer")]),
                          _: 3,
                        }),
                      ])
                    : (T(),
                      ge(
                        Ma,
                        { key: 3 },
                        {
                          top: je(() => [
                            ue(I.$slots, "page-top-ads", {}, () => [
                              C(u).carbonAds && C(u).carbonAds.carbon
                                ? (T(),
                                  R("div", Fa, [
                                    (T(),
                                    ge(
                                      C(n),
                                      {
                                        key: "carbon" + C(l).relativePath,
                                        code: C(u).carbonAds.carbon,
                                        placement: C(u).carbonAds.placement,
                                      },
                                      null,
                                      8,
                                      ["code", "placement"]
                                    )),
                                  ]))
                                : J("", !0),
                            ]),
                            ue(I.$slots, "page-top"),
                          ]),
                          bottom: je(() => [
                            ue(I.$slots, "page-bottom"),
                            ue(I.$slots, "page-bottom-ads", {}, () => [
                              C(u).carbonAds && C(u).carbonAds.custom
                                ? (T(),
                                  ge(
                                    C(s),
                                    {
                                      key: "custom" + C(l).relativePath,
                                      code: C(u).carbonAds.custom,
                                      placement: C(u).carbonAds.placement,
                                    },
                                    null,
                                    8,
                                    ["code", "placement"]
                                  ))
                                : J("", !0),
                            ]),
                          ]),
                          _: 3,
                        }
                      )),
                ],
                2
              ),
              H(Z),
            ],
            64
          )
        );
      };
    },
  }),
  Sa = { class: "theme" },
  Na = S("h1", null, "404", -1),
  Ha = ["href"],
  Ba = ie({
    setup(e) {
      const { site: t } = me(),
        n = [
          "There's nothing here.",
          "How did we get here?",
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links.",
        ];
      function s() {
        return n[Math.floor(Math.random() * n.length)];
      }
      return (r, o) => (
        T(),
        R("div", Sa, [
          Na,
          S("blockquote", null, be(s()), 1),
          S(
            "a",
            { href: C(t).base, "aria-label": "go to home" },
            "Take me home.",
            8,
            Ha
          ),
        ])
      );
    },
  }),
  mn = { Layout: Ra, NotFound: Ba },
  Un = new Set(),
  Eo = () => document.createElement("link"),
  Ua = (e) => {
    const t = Eo();
    (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
  },
  ja = (e) => {
    const t = new XMLHttpRequest();
    t.open("GET", e, (t.withCredentials = !0)), t.send();
  };
let Gt;
const Da =
  Pe &&
  (Gt = Eo()) &&
  Gt.relList &&
  Gt.relList.supports &&
  Gt.relList.supports("prefetch")
    ? Ua
    : ja;
function Ka() {
  if (!Pe || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((o) => {
        o.forEach((i) => {
          if (i.isIntersecting) {
            const l = i.target;
            n.unobserve(l);
            const { pathname: u } = l;
            if (!Un.has(u)) {
              Un.add(u);
              const f = _o(u);
              Da(f);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll("#app a").forEach((o) => {
          const { target: i, hostname: l, pathname: u } = o,
            f = u.match(/\.\w+$/);
          (f && f[0] !== ".html") ||
            (i !== "_blank" &&
              l === location.hostname &&
              (u !== location.pathname ? n.observe(o) : Un.add(u)));
        });
      });
  };
  Ct(s);
  const r = et();
  ot(() => r.path, s),
    Tn(() => {
      n && n.disconnect();
    });
}
const Wa = ie({
    setup(e, { slots: t }) {
      const n = $n(!1);
      return (
        Ct(() => {
          n.value = !0;
        }),
        () => (n.value && t.default ? t.default() : null)
      );
    },
  }),
  qa = mn.NotFound || (() => "404 Not Found"),
  za = {
    name: "VitePressApp",
    setup() {
      const { site: e } = me();
      return (
        Ct(() => {
          ot(
            () => e.value.lang,
            (t) => {
              document.documentElement.lang = t;
            },
            { immediate: !0 }
          );
        }),
        Ka(),
        () => ut(mn.Layout)
      );
    },
  };
function Va() {
  const e = Ya(),
    t = Ja();
  t.provide(go, e);
  const n = Ql(e.route);
  return (
    t.provide(po, n),
    Pe && sc(e.route, n.site),
    t.component("Content", ic),
    t.component("ClientOnly", Wa),
    t.component("Debug", () => null),
    Object.defineProperty(t.config.globalProperties, "$frontmatter", {
      get() {
        return n.frontmatter.value;
      },
    }),
    mn.enhanceApp && mn.enhanceApp({ app: t, router: e, siteData: qt }),
    { app: t, router: e }
  );
}
function Ja() {
  return Wl(za);
}
function Ya() {
  let e = Pe,
    t;
  return tc((n) => {
    let s = _o(n);
    return (
      e && (t = s),
      (e || t === s) && (s = s.replace(/\.js$/, ".lean.js")),
      Pe ? ((e = !1), import(s)) : require(s)
    );
  }, qa);
}
if (Pe) {
  const { app: e, router: t } = Va();
  t.go().then(() => {
    e.mount("#app");
  });
}
export { Va as createApp };
