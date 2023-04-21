/*!
 * dwAnalytics - Web Analytics Tracking
 * Based partially on Piwik
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html Gpl v3 or later
 */
if (typeof dw == "undefined") {
  var dw = {};
}
if (typeof dw.__dwAnalyticsLoaded == "undefined") {
  dw.__dwAnalyticsLoaded = true;
  dw.__dwAnalytics = (function () {
    var l = 2000;
    var b,
      f = {},
      d = document,
      c = navigator,
      h = screen,
      m = window,
      j = m.location.hostname;
    function n(o) {
      return typeof o !== "undefined";
    }
    function k(w, J) {
      var p = w + "?" || "?",
        F,
        z = d.title,
        L = "0",
        M,
        t = {
          pdf: ["pdf", "application/pdf", "0"],
          quicktime: ["qt", "video/quicktime", "0"],
          realplayer: ["realp", "audio/x-pn-realaudio-plugin", "0"],
          wma: ["wma", "application/x-mplayer2", "0"],
          director: ["dir", "application/x-director", "0"],
          flash: ["fla", "application/x-shockwave-flash", "0"],
          java: ["java", "application/x-java-vm", "0"],
          gears: ["gears", "application/x-googlegears", "0"],
          silverlight: ["ag", "application/x-silverlight", "0"],
        },
        C = false,
        D = m.encodeURIComponent || escape,
        q = m.decodeURIComponent || unescape,
        G = {};
      function E(T, Q, O, S, P, R) {
        var N;
        if (O) {
          N = new Date();
          N.setTime(N.getTime() + O * 86400000);
        }
        d.cookie =
          T +
          "=" +
          D(Q) +
          (O ? ";expires=" + N.toGMTString() : "") +
          ";path=" +
          (S ? S : "/") +
          (P ? ";domain=" + P : "") +
          (R ? ";secure" : "");
      }
      function K(P) {
        var N = new RegExp("(^|;)[ ]*" + P + "=([^;]*)"),
          O = N.exec(d.cookie);
        return O ? q(O[2]) : 0;
      }
      function o(N) {
        dw.__timeoutCallback = function () {
          for (var O = 0; O < N.length; O++) {
            var P = new Image(1, 1);
            P.onLoad = function () {};
            P.src = N[O];
          }
        };
        setTimeout(dw.__timeoutCallback, 100);
      }
      function A() {
        var N, O;
        if (typeof c.javaEnabled !== "undefined" && c.javaEnabled()) {
          t.java[2] = "1";
        }
        if (typeof m.GearsFactory === "function") {
          t.gears[2] = "1";
        }
        if (c.mimeTypes && c.mimeTypes.length) {
          for (N in t) {
            O = c.mimeTypes[t[N][1]];
            if (O && O.enabledPlugin) {
              t[N][2] = "1";
            }
          }
        }
      }
      function s() {
        var N = "";
        try {
          N = top.document.referrer;
        } catch (P) {
          if (parent) {
            try {
              N = parent.document.referrer;
            } catch (O) {
              N = "";
            }
          }
        }
        if (N === "") {
          N = d.referrer;
        }
        return N;
      }
      function y() {
        var N = "_pk_testcookie";
        if (!n(c.cookieEnabled)) {
          E(N, "1");
          return K(N) == "1" ? "1" : "0";
        }
        return c.cookieEnabled ? "1" : "0";
      }
      function B(N, T, R) {
        var U = Math.random();
        var P = I(N, T, R, U);
        if (T != null && T.debugEnabled) {
          var S = "";
          for (var O = 0; O < P.length; O++) {
            S += P[O][0] + '"=' + P[O][1] + '"\n';
          }
          alert(S);
        }
        var Q = r(N, p, P, U);
        o(Q);
      }
      M = s();
      L = y();
      A();
      try {
        a();
      } catch (v) {}
      return {
        trackPageView: function (N) {
          B(null, null, N);
        },
        trackPageViewWithProducts: function (N, P, O) {
          B(N, P, O);
        },
      };
      function u(N, P) {
        var O = P.charAt(P.length - 1) == "?" ? "" : "&";
        return P + O + N[0] + "=" + N[1];
      }
      function H(N) {
        return N[0].length + N[1].length + 2;
      }
      function I(N, R, Q, S) {
        var P = [
          ["url", D(n(F) ? F : d.location.href)],
          ["res", h.width + "x" + h.height],
          ["cookie", L],
          ["ref", D(M)],
          ["title", D(n(Q) && Q != null ? Q : z)],
        ];
        for (var O in t) {
          P.push([t[O][0], t[O][2]]);
        }
        if (N != null && N.dwEnabled) {
          P.push(["dwac", S]);
          P.push(["cmpn", N.sourceCode]);
          P.push(["tz", N.timeZone]);
          N.category = dw.ac._category;
          if (dw.ac._searchData) {
            N.searchData = dw.ac._searchData;
          }
          x(N, R, P);
        }
        return P;
      }
      function x(V, N, U) {
        U.push(["pcc", V.siteCurrency]);
        U.push(["pct", V.customer]);
        U.push(["pcat", V.category]);
        if (V.searchData) {
          if (V.searchData.q) {
            U.push(["pst-q", V.searchData.q]);
          }
          if (V.searchData.searchID) {
            U.push(["pst-id", V.searchData.searchID]);
          }
          if (V.searchData.refs) {
            U.push(["pst-refs", V.searchData.refs]);
          }
          if (V.searchData.sort) {
            U.push(["pst-sort", V.searchData.sort]);
          }
          if (undefined != V.searchData.persd) {
            U.push(["pst-pers", V.searchData.persd]);
          }
          if (V.searchData.imageUUID) {
            U.push(["pst-img", V.searchData.imageUUID]);
          }
          if (V.searchData.suggestedSearchText) {
            U.push(["pst-sug", V.searchData.suggestedSearchText]);
          }
          if (V.searchData.locale) {
            U.push(["pst-loc", V.searchData.locale]);
          }
          if (V.searchData.queryLocale) {
            U.push(["pst-qloc", V.searchData.queryLocale]);
          }
          if (undefined != V.searchData.showProducts) {
            U.push(["pst-show", V.searchData.showProducts]);
          }
        }
        var T = N.productImpressions.getEntries();
        var R = N.productRecommendations.getEntries();
        var O = N.productViews.getEntries();
        var W = 0;
        for (var S = 0; S < T.length; S++) {
          U.push(["pid-" + W, T[S].value.id]);
          U.push(["pev-" + W, "event3"]);
          W++;
        }
        for (var Q = 0; Q < R.length; Q++) {
          U.push(["pid-" + W, R[Q].value.id]);
          U.push(["pev-" + W, "event3"]);
          U.push(["evr4-" + W, "Yes"]);
          W++;
        }
        for (var P = 0; P < O.length; P++) {
          U.push(["pid-" + W, O[P].value.id]);
          U.push(["pev-" + W, "event4"]);
          W++;
        }
      }
      function r(T, S, R, O) {
        var V = [];
        var P = S;
        for (var Q = 0; Q < R.length; Q++) {
          var U =
            R[Q][0].slice(0, "pid-".length) == "pid-" &&
            H(R[Q]) +
              (Q + 1 < R.length ? H(R[Q + 1]) : 0) +
              (Q + 2 < R.length ? H(R[Q + 2]) : 0) +
              P.length >
              l;
          var W =
            R[Q][0].slice(0, "pid-".length) != "pid-" && H(R[Q]) + P.length > l;
          if (U || W) {
            V.push(P);
            P = u(["dwac", O], S);
            if (T != null && T.dwEnabled) {
              P = u(["cmpn", T.sourceCode], P);
              P = u(["tz", T.timeZone], P);
              P = u(["pcc", T.siteCurrency], P);
              P = u(["pct", T.customer], P);
              P = u(["pcat", T.category], P);
              if (T.searchData) {
                if (T.searchData.q) {
                  u(["pst-q", T.searchData.q], P);
                }
                if (T.searchData.searchID) {
                  u(["pst-id", T.searchData.searchID], P);
                }
                if (T.searchData.refs) {
                  u(["pst-refs", JSON.stringify(T.searchData.refs)], P);
                }
                if (T.searchData.sort) {
                  u(["pst-sort", JSON.stringify(T.searchData.sort)], P);
                }
                if (undefined != T.searchData.persd) {
                  u(["pst-pers", T.searchData.persd], P);
                }
                if (T.searchData.imageUUID) {
                  u(["pst-img", T.searchData.imageUUID], P);
                }
                if (T.searchData.suggestedSearchText) {
                  u(["pst-sug", T.searchData.suggestedSearchText], P);
                }
                if (T.searchData.locale) {
                  u(["pst-loc", T.searchData.locale], P);
                }
                if (T.searchData.queryLocale) {
                  u(["pst-qloc", T.searchData.queryLocale], P);
                }
                if (undefined != T.searchData.showProducts) {
                  u(["pst-show", T.searchData.showProducts], P);
                }
              }
            }
          }
          P = u(R[Q], P);
        }
        var N = K("dw_dnt");
        if (N === 0 || N === "" || N === null || N === false) {
        } else {
          P = u(["dw_dnt", N], P);
        }
        V.push(P);
        return V;
      }
    }
    function e(p) {
      var o = g(p);
      if (o) {
        document.cookie =
          p + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      }
      return o;
    }
    function g(o) {
      return (
        decodeURIComponent(
          document.cookie
            .replace(
              new RegExp(
                "(?:(?:^|.*;)\\s*" +
                  encodeURIComponent(o).replace(/[\-\.\+\*]/g, "\\$&") +
                  "\\s*\\=\\s*([^;]*).*$)|^.*$"
              ),
              "$1"
            )
            .replace(/\+/g, "%20")
        ) || null
      );
    }
    function a() {
      if (dw.ac) {
        dw.ac._anact = e("__anact");
        if (dw.ac._anact && !dw.ac.eventsIsEmpty()) {
          return;
        }
        if (dw.ac._anact_nohit_tag || dw.ac._anact) {
          var s = dw.ac._anact_nohit_tag
            ? dw.ac._anact_nohit_tag
            : dw.ac._anact;
          var p = JSON.parse(s);
          if (p) {
            var r = Array.isArray(p) ? p[0] : p;
            if (r && "viewSearch" == r.activityType && r.parameters) {
              var t = r.parameters;
              var o = {};
              o.q = t.searchText;
              o.suggestedSearchText = t.suggestedSearchText;
              o.persd = t.personalized;
              o.refs = t.refinements;
              o.sort = t.sorting_rule;
              o.imageUUID = t.image_uuid;
              o.showProducts = t.showProducts;
              o.searchID = t.searchID;
              o.locale = t.locale;
              o.queryLocale = t.queryLocale;
              dw.ac.applyContext({ searchData: o });
              var q = t.products;
              if (q && Array.isArray(q)) {
                for (i = 0; i < q.length; i++) {
                  if (q[i]) {
                    dw.ac._capture({
                      id: q[i].id,
                      type: dw.ac.EV_PRD_SEARCHHIT,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
    return {
      getTracker: function (o) {
        return new k(o);
      },
    };
  })();
}
