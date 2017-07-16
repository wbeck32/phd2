function hideMail() {
  console.log('obfuscation');
  var u = "user";
  var arr = "@";
  var d = "domain";
  var dot = ".";
  var t = "tldccc";
  // document.write("<a href=" + "mail" + "to:" + u + arr + d + dot + t +
  //   ">" + "Email (concatenation)" + "</a>" + "<br>");
}

$('.footerTxt.col-md-4.col-sm-3 p')
  .click(function () {
    console.log('email');
    $.ajax({
        url: "https://app.mailgun.com/app/domains/sandbox780dc44ce44a41da8a4266b80ff20b2e.mailgun.org/messages",
        method: POST,
        beforeSend: function (xhr) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
      })
      .done(function (data) {
        if (console && console.log) {
          console.log("Sample of data:", data.slice(0, 100));
        }
      });
  });

$('ul.nav.navbar-nav li a')
  .click(function () {
    var m = $(this)
      .attr('href');
    if (m == '#moretop') {
      var dropdownChoice = $(this)
        .find('ul li a')
        .attr('href');
      $('section' + dropdownChoice)
        .animate({
          scrollTop: 0
        }, 'slow', function () {
          // console.log('success!')
        });
    } else if (m == '#product1' || m == '#product2' || m == '#product3' || m == '#product4') {
      scrollToProductSection(m);
    } else if (m == '#home') {
      $('#collapsedMenu.in')
        .removeClass('in');
      $('section.allsections')
        .css({ 'visibility': 'hidden', 'display': 'none' });
      $('div.pageBody div.responsiveHeader')
        .css({ 'visibility': 'visible', 'display': 'block' });
      $('html, body')
        .animate({
          scrollTop: 0
        }, 'slow', function () {
          // console.log('success!')
        });
    } else if (m !== undefined) {
      $('#collapsedMenu.in')
        .removeClass('in');
      $('.responsiveHeader')
        .css({ 'visibility': 'hidden', 'display': 'none' });
      $('section.allsections')
        .not(m)
        .css({ 'visibility': 'hidden', 'display': 'none' });
      $('section' + m + '.allsections')
        .css({ 'display': 'block', 'visibility': 'visible' });
      $('section' + m + '.allsections')
        .animate({
          scrollTop: 0
        }, 'slow', function () {
          // console.log('success!')
        });
    }
  });

$('.navbar-brand')
  .click(function () {
    $('.responsiveHeader')
      .css({ 'visibility': 'visible', 'display': 'inline-block' });
    $('section')
      .css({ 'visibility': 'hidden', 'display': 'none' });
    $('html, body')
      .animate({
        scrollTop: 0
      }, 'slow', function () {
        // console.log('success!')
      });
  });

$('.col-xs-3.col-md-4')
  .click(function () {
    var productTarget = $(this)
      .find('a')
      .attr('href');
    scrollToProductSection(productTarget);
  });

$('.product .sectionheader a')
  .click(function () {
    $('#collapsedMenu.in')
      .removeClass('in');
    scrollToProductSection($(this)
      .attr('href'));
  });

function scrollToProductSection(selector) {
  console.log(selector);
  $('.responsiveHeader')
    .css({ 'visibility': 'hidden', 'display': 'none' });
  $('section.allsections')
    .not(selector)
    .css({ 'visibility': 'hidden', 'display': 'none' });
  $('section#products.allsections')
    .css({ 'visibility': 'visible', 'display': 'block' });
  $('div.product')
    .not(selector)
    .css({ 'visibility': 'hidden', 'display': 'none' });
  $('div' + selector + '.product')
    .css({ 'visibility': 'visible', 'display': 'block' });
  $('#products')
    .animate({
      scrollTop: 0
    }, 'slow', function () {
      // console.log('success!')
    });
}

function require(script) {
  $.ajax({
    url: 'jsSocials.js',
    dataType: "script",
    async: false, // <-- This is the key
    success: function () {
      // all g  ood...

      $('#shareRoundIcons')
        .jsSocials({
          shares: ['email', 'twitter', 'facebook', 'linkedin', 'messenger'],
          url: 'http://artisanmemoirs.com',
          text: 'text to share',
          showLabel: false,
          showCount: false,
          shareIn: 'popup',

          on: {
            click: function (e) {},
            mouseenter: function (e) {},
            mouseleave: function (e) {}
          }
        });

    },
    error: function () {
      throw new Error("Could not load script " + script);
    }
  });
}

/*! jssocials - v1.4.0 - 2016-10-10
 * http://js-socials.com
 * Copyright (c) 2016 Artem Tabalin; Licensed MIT */

(function (window, $, undefined) {

  var JSSOCIALS = "JSSocials",
    JSSOCIALS_DATA_KEY = JSSOCIALS;

  var getOrApply = function (value, context) {
    if ($.isFunction(value)) {
      return value.apply(context, $.makeArray(arguments)
        .slice(2));
    }
    return value;
  };

  var IMG_SRC_REGEX = /(\.(jpeg|png|gif|bmp|svg)$|^data:image\/(jpeg|png|gif|bmp|svg\+xml);base64)/i;
  var URL_PARAMS_REGEX = /(&?[a-zA-Z0-9]+=)?\{([a-zA-Z0-9]+)\}/g;

  var MEASURES = {
    "G": 1000000000,
    "M": 1000000,
    "K": 1000
  };

  var shares = {};

  function Socials(element, config) {
    var $element = $(element);

    $element.data(JSSOCIALS_DATA_KEY, this);

    this._$element = $element;

    this.shares = [];

    this._init(config);
    this._render();
  }

  Socials.prototype = {
    url: "",
    text: "",
    shareIn: "blank",

    showLabel: function (screenWidth) {
      return (this.showCount === false) ?
        (screenWidth > this.smallScreenWidth) :
        (screenWidth >= this.largeScreenWidth);
    },

    showCount: function (screenWidth) {
      return (screenWidth <= this.smallScreenWidth) ? "inside" : true;
    },

    smallScreenWidth: 640,
    largeScreenWidth: 1024,

    resizeTimeout: 200,

    elementClass: "jssocials",
    sharesClass: "jssocials-shares",
    shareClass: "jssocials-share",
    shareButtonClass: "jssocials-share-button",
    shareLinkClass: "jssocials-share-link",
    shareLogoClass: "jssocials-share-logo",
    shareLabelClass: "jssocials-share-label",
    shareLinkCountClass: "jssocials-share-link-count",
    shareCountBoxClass: "jssocials-share-count-box",
    shareCountClass: "jssocials-share-count",
    shareZeroCountClass: "jssocials-share-no-count",

    _init: function (config) {
      this._initDefaults();
      $.extend(this, config);
      this._initShares();
      this._attachWindowResizeCallback();
    },

    _initDefaults: function () {
      this.url = window.location.href;
      this.text = $.trim($("meta[name=description]")
        .attr("content") || $("title")
        .text());
    },

    _initShares: function () {
      this.shares = $.map(this.shares, $.proxy(function (shareConfig) {
        if (typeof shareConfig === "string") {
          shareConfig = { share: shareConfig };
        }

        var share = (shareConfig.share && shares[shareConfig.share]);

        if (!share && !shareConfig.renderer) {
          throw Error("Share '" + shareConfig.share + "' is not found");
        }

        return $.extend({ url: this.url, text: this.text }, share, shareConfig);
      }, this));
    },

    _attachWindowResizeCallback: function () {
      $(window)
        .on("resize", $.proxy(this._windowResizeHandler, this));
    },

    _detachWindowResizeCallback: function () {
      $(window)
        .off("resize", this._windowResizeHandler);
    },

    _windowResizeHandler: function () {
      if ($.isFunction(this.showLabel) || $.isFunction(this.showCount)) {
        window.clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout($.proxy(this.refresh, this), this.resizeTimeout);
      }
    },

    _render: function () {
      this._clear();

      this._defineOptionsByScreen();

      this._$element.addClass(this.elementClass);

      this._$shares = $("<div>")
        .addClass(this.sharesClass)
        .appendTo(this._$element);

      this._renderShares();
    },

    _defineOptionsByScreen: function () {
      this._screenWidth = $(window)
        .width();
      this._showLabel = getOrApply(this.showLabel, this, this._screenWidth);
      this._showCount = getOrApply(this.showCount, this, this._screenWidth);
    },

    _renderShares: function () {
      $.each(this.shares, $.proxy(function (_, share) {
        this._renderShare(share);
      }, this));
    },

    _renderShare: function (share) {
      var $share;

      if ($.isFunction(share.renderer)) {
        $share = $(share.renderer());
      } else {
        $share = this._createShare(share);
      }

      $share.addClass(this.shareClass)
        .addClass(share.share ? "jssocials-share-" + share.share : "")
        .addClass(share.css)
        .appendTo(this._$shares);
    },

    _createShare: function (share) {
      var $result = $("<div>");
      var $shareLink = this._createShareLink(share)
        .appendTo($result);

      if (this._showCount) {
        var isInsideCount = (this._showCount === "inside");
        var $countContainer = isInsideCount ? $shareLink : $("<div>")
          .addClass(this.shareCountBoxClass)
          .appendTo($result);
        $countContainer.addClass(isInsideCount ? this.shareLinkCountClass : this.shareCountBoxClass);
        this._renderShareCount(share, $countContainer);
      }

      return $result;
    },

    _createShareLink: function (share) {
      var shareStrategy = this._getShareStrategy(share);

      var $result = shareStrategy.call(share, {
        shareUrl: this._getShareUrl(share)
      });

      $result.addClass(this.shareLinkClass)
        .append(this._createShareLogo(share));

      if (this._showLabel) {
        $result.append(this._createShareLabel(share));
      }

      $.each(this.on || {}, function (event, handler) {
        if ($.isFunction(handler)) {
          $result.on(event, $.proxy(handler, share));
        }
      });

      return $result;
    },

    _getShareStrategy: function (share) {
      var result = shareStrategies[share.shareIn || this.shareIn];

      if (!result)
        throw Error("Share strategy '" + this.shareIn + "' not found");

      return result;
    },

    _getShareUrl: function (share) {
      var shareUrl = getOrApply(share.shareUrl, share);
      return this._formatShareUrl(shareUrl, share);
    },

    _createShareLogo: function (share) {
      var logo = share.logo;

      var $result = IMG_SRC_REGEX.test(logo) ?
        $("<img>")
        .attr("src", share.logo) :
        $("<i>")
        .addClass(logo);

      $result.addClass(this.shareLogoClass);

      return $result;
    },

    _createShareLabel: function (share) {
      return $("<span>")
        .addClass(this.shareLabelClass)
        .text(share.label);
    },

    _renderShareCount: function (share, $container) {
      var $count = $("<span>")
        .addClass(this.shareCountClass);

      $container.addClass(this.shareZeroCountClass)
        .append($count);

      this._loadCount(share)
        .done($.proxy(function (count) {
          if (count) {
            $container.removeClass(this.shareZeroCountClass);
            $count.text(count);
          }
        }, this));
    },

    _loadCount: function (share) {
      var deferred = $.Deferred();
      var countUrl = this._getCountUrl(share);

      if (!countUrl) {
        return deferred.resolve(0)
          .promise();
      }

      var handleSuccess = $.proxy(function (response) {
        deferred.resolve(this._getCountValue(response, share));
      }, this);

      $.getJSON(countUrl)
        .done(handleSuccess)
        .fail(function () {
          $.get(countUrl)
            .done(handleSuccess)
            .fail(function () {
              deferred.resolve(0);
            });
        });

      return deferred.promise();
    },

    _getCountUrl: function (share) {
      var countUrl = getOrApply(share.countUrl, share);
      return this._formatShareUrl(countUrl, share);
    },

    _getCountValue: function (response, share) {
      var count = ($.isFunction(share.getCount) ? share.getCount(response) : response) || 0;
      return (typeof count === "string") ? count : this._formatNumber(count);
    },

    _formatNumber: function (number) {
      $.each(MEASURES, function (letter, value) {
        if (number >= value) {
          number = parseFloat((number / value)
            .toFixed(2)) + letter;
          return false;
        }
      });

      return number;
    },

    _formatShareUrl: function (url, share) {
      return url.replace(URL_PARAMS_REGEX, function (match, key, field) {
        var value = share[field] || "";
        return value ? (key || "") + window.encodeURIComponent(value) : "";
      });
    },

    _clear: function () {
      window.clearTimeout(this._resizeTimer);
      this._$element.empty();
    },

    _passOptionToShares: function (key, value) {
      var shares = this.shares;

      $.each(["url", "text"], function (_, optionName) {
        if (optionName !== key)
          return;

        $.each(shares, function (_, share) {
          share[key] = value;
        });
      });
    },

    _normalizeShare: function (share) {
      if ($.isNumeric(share)) {
        return this.shares[share];
      }

      if (typeof share === "string") {
        return $.grep(this.shares, function (s) {
          return s.share === share;
        })[0];
      }

      return share;
    },

    refresh: function () {
      this._render();
    },

    destroy: function () {
      this._clear();
      this._detachWindowResizeCallback();

      this._$element
        .removeClass(this.elementClass)
        .removeData(JSSOCIALS_DATA_KEY);
    },

    option: function (key, value) {
      if (arguments.length === 1) {
        return this[key];
      }

      this[key] = value;

      this._passOptionToShares(key, value);

      this.refresh();
    },

    shareOption: function (share, key, value) {
      share = this._normalizeShare(share);

      if (arguments.length === 2) {
        return share[key];
      }

      share[key] = value;
      this.refresh();
    }
  };

  $.fn.jsSocials = function (config) {
    var args = $.makeArray(arguments),
      methodArgs = args.slice(1),
      result = this;

    this.each(function () {
      var $element = $(this),
        instance = $element.data(JSSOCIALS_DATA_KEY),
        methodResult;

      if (instance) {
        if (typeof config === "string") {
          methodResult = instance[config].apply(instance, methodArgs);
          if (methodResult !== undefined && methodResult !== instance) {
            result = methodResult;
            return false;
          }
        } else {
          instance._detachWindowResizeCallback();
          instance._init(config);
          instance._render();
        }
      } else {
        new Socials($element, config);
      }
    });

    return result;
  };

  var setDefaults = function (config) {
    var component;

    if ($.isPlainObject(config)) {
      component = Socials.prototype;
    } else {
      component = shares[config];
      config = arguments[1] || {};
    }

    $.extend(component, config);
  };

  var shareStrategies = {
    popup: function (args) {
      return $("<a>")
        .attr("href", "#")
        .on("click", function () {
          window.open(args.shareUrl, null, "width=600, height=400, location=0, menubar=0, resizeable=0, scrollbars=0, status=0, titlebar=0, toolbar=0");
          return false;
        });
    },

    blank: function (args) {
      return $("<a>")
        .attr({ target: "_blank", href: args.shareUrl });
    },

    self: function (args) {
      return $("<a>")
        .attr({ target: "_self", href: args.shareUrl });
    }
  };

  window.jsSocials = {
    Socials: Socials,
    shares: shares,
    shareStrategies: shareStrategies,
    setDefaults: setDefaults
  };

}(window, jQuery));

(function (window, $, jsSocials, undefined) {

  $.extend(jsSocials.shares, {

    email: {
      label: "E-mail",
      logo: "fa fa-at",
      shareUrl: "mailto:{to}?subject={text}&body={url}",
      countUrl: "",
      shareIn: "self"
    },

    twitter: {
      label: "Tweet",
      logo: "fa fa-twitter",
      shareUrl: "https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}",
      countUrl: ""
    },

    facebook: {
      label: "Like",
      logo: "fa fa-facebook",
      shareUrl: "https://facebook.com/sharer/sharer.php?u={url}",
      countUrl: "https://graph.facebook.com/?id={url}",
      getCount: function (data) {
        return data.share && data.share.share_count || 0;
      }
    },

    vkontakte: {
      label: "Like",
      logo: "fa fa-vk",
      shareUrl: "https://vk.com/share.php?url={url}&title={title}&description={text}",
      countUrl: "https://vk.com/share.php?act=count&index=1&url={url}",
      getCount: function (data) {
        return parseInt(data.slice(15, -2)
          .split(', ')[1]);
      }
    },

    googleplus: {
      label: "+1",
      logo: "fa fa-google",
      shareUrl: "https://plus.google.com/share?url={url}",
      countUrl: ""
    },

    linkedin: {
      label: "Share",
      logo: "fa fa-linkedin",
      shareUrl: "https://www.linkedin.com/shareArticle?mini=true&url={url}",
      countUrl: "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
      getCount: function (data) {
        return data.count;
      }
    },

    pinterest: {
      label: "Pin it",
      logo: "fa fa-pinterest",
      shareUrl: "https://pinterest.com/pin/create/bookmarklet/?media={media}&url={url}&description={text}",
      countUrl: "https://api.pinterest.com/v1/urls/count.json?&url={url}&callback=?",
      getCount: function (data) {
        return data.count;
      }
    },

    stumbleupon: {
      label: "Share",
      logo: "fa fa-stumbleupon",
      shareUrl: "http://www.stumbleupon.com/submit?url={url}&title={title}",
      countUrl: "https://cors-anywhere.herokuapp.com/https://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}",
      getCount: function (data) {
        return data.result.views;
      }
    },

    telegram: {
      label: "Telegram",
      logo: "fa fa-paper-plane",
      shareUrl: "tg://msg?text={url} {text}",
      countUrl: "",
      shareIn: "self"
    },

    whatsapp: {
      label: "WhatsApp",
      logo: "fa fa-whatsapp",
      shareUrl: "whatsapp://send?text={url} {text}",
      countUrl: "",
      shareIn: "self"
    },

    line: {
      label: "LINE",
      logo: "fa fa-comment",
      shareUrl: "http://line.me/R/msg/text/?{text} {url}",
      countUrl: ""
    },

    viber: {
      label: "Viber",
      logo: "fa fa-volume-control-phone",
      shareUrl: "viber://forward?text={url} {text}",
      countUrl: "",
      shareIn: "self"
    },

    pocket: {
      label: "Pocket",
      logo: "fa fa-get-pocket",
      shareUrl: "https://getpocket.com/save?url={url}&title={title}",
      countUrl: ""
    },

    messenger: {
      label: "Share",
      logo: "fa fa-commenting",
      shareUrl: "fb-messenger://share?link={url}",
      countUrl: "",
      shareIn: "self"
    }

  });

}(window, jQuery, window.jsSocials));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpzc29jaWFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBoaWRlTWFpbCgpIHtcbiAgY29uc29sZS5sb2coJ29iZnVzY2F0aW9uJyk7XG4gIHZhciB1ID0gXCJ1c2VyXCI7XG4gIHZhciBhcnIgPSBcIkBcIjtcbiAgdmFyIGQgPSBcImRvbWFpblwiO1xuICB2YXIgZG90ID0gXCIuXCI7XG4gIHZhciB0ID0gXCJ0bGRjY2NcIjtcbiAgLy8gZG9jdW1lbnQud3JpdGUoXCI8YSBocmVmPVwiICsgXCJtYWlsXCIgKyBcInRvOlwiICsgdSArIGFyciArIGQgKyBkb3QgKyB0ICtcbiAgLy8gICBcIj5cIiArIFwiRW1haWwgKGNvbmNhdGVuYXRpb24pXCIgKyBcIjwvYT5cIiArIFwiPGJyPlwiKTtcbn1cblxuJCgnLmZvb3RlclR4dC5jb2wtbWQtNC5jb2wtc20tMyBwJylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnZW1haWwnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9hcHAubWFpbGd1bi5jb20vYXBwL2RvbWFpbnMvc2FuZGJveDc4MGRjNDRjZTQ0YTQxZGE4YTQyNjZiODBmZjIwYjJlLm1haWxndW4ub3JnL21lc3NhZ2VzXCIsXG4gICAgICAgIG1ldGhvZDogUE9TVCxcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUubG9nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTYW1wbGUgb2YgZGF0YTpcIiwgZGF0YS5zbGljZSgwLCAxMDApKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xuXG4kKCd1bC5uYXYubmF2YmFyLW5hdiBsaSBhJylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbSA9ICQodGhpcylcbiAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgaWYgKG0gPT0gJyNtb3JldG9wJykge1xuICAgICAgdmFyIGRyb3Bkb3duQ2hvaWNlID0gJCh0aGlzKVxuICAgICAgICAuZmluZCgndWwgbGkgYScpXG4gICAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgICAkKCdzZWN0aW9uJyArIGRyb3Bkb3duQ2hvaWNlKVxuICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobSA9PSAnI3Byb2R1Y3QxJyB8fCBtID09ICcjcHJvZHVjdDInIHx8IG0gPT0gJyNwcm9kdWN0MycgfHwgbSA9PSAnI3Byb2R1Y3Q0Jykge1xuICAgICAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihtKTtcbiAgICB9IGVsc2UgaWYgKG0gPT0gJyNob21lJykge1xuICAgICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgICAkKCdzZWN0aW9uLmFsbHNlY3Rpb25zJylcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICAgJCgnZGl2LnBhZ2VCb2R5IGRpdi5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnZGlzcGxheSc6ICdibG9jaycgfSk7XG4gICAgICAkKCdodG1sLCBib2R5JylcbiAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24uYWxsc2VjdGlvbnMnKVxuICAgICAgICAubm90KG0pXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24nICsgbSArICcuYWxsc2VjdGlvbnMnKVxuICAgICAgICAuY3NzKHsgJ2Rpc3BsYXknOiAnYmxvY2snLCAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24nICsgbSArICcuYWxsc2VjdGlvbnMnKVxuICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiQoJy5uYXZiYXItYnJhbmQnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyB9KTtcbiAgICAkKCdzZWN0aW9uJylcbiAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAkKCdodG1sLCBib2R5JylcbiAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgIH0pO1xuICB9KTtcblxuJCgnLmNvbC14cy0zLmNvbC1tZC00JylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvZHVjdFRhcmdldCA9ICQodGhpcylcbiAgICAgIC5maW5kKCdhJylcbiAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihwcm9kdWN0VGFyZ2V0KTtcbiAgfSk7XG5cbiQoJy5wcm9kdWN0IC5zZWN0aW9uaGVhZGVyIGEnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJyNjb2xsYXBzZWRNZW51LmluJylcbiAgICAgIC5yZW1vdmVDbGFzcygnaW4nKTtcbiAgICBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKCQodGhpcylcbiAgICAgIC5hdHRyKCdocmVmJykpO1xuICB9KTtcblxuZnVuY3Rpb24gc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihzZWxlY3Rvcikge1xuICBjb25zb2xlLmxvZyhzZWxlY3Rvcik7XG4gICQoJy5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24uYWxsc2VjdGlvbnMnKVxuICAgIC5ub3Qoc2VsZWN0b3IpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uI3Byb2R1Y3RzLmFsbHNlY3Rpb25zJylcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdkaXNwbGF5JzogJ2Jsb2NrJyB9KTtcbiAgJCgnZGl2LnByb2R1Y3QnKVxuICAgIC5ub3Qoc2VsZWN0b3IpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAkKCdkaXYnICsgc2VsZWN0b3IgKyAnLnByb2R1Y3QnKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnYmxvY2snIH0pO1xuICAkKCcjcHJvZHVjdHMnKVxuICAgIC5hbmltYXRlKHtcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVxdWlyZShzY3JpcHQpIHtcbiAgJC5hamF4KHtcbiAgICB1cmw6ICdqc1NvY2lhbHMuanMnLFxuICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgIGFzeW5jOiBmYWxzZSwgLy8gPC0tIFRoaXMgaXMgdGhlIGtleVxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGFsbCBnICBvb2QuLi5cblxuICAgICAgJCgnI3NoYXJlUm91bmRJY29ucycpXG4gICAgICAgIC5qc1NvY2lhbHMoe1xuICAgICAgICAgIHNoYXJlczogWydlbWFpbCcsICd0d2l0dGVyJywgJ2ZhY2Vib29rJywgJ2xpbmtlZGluJywgJ21lc3NlbmdlciddLFxuICAgICAgICAgIHVybDogJ2h0dHA6Ly9hcnRpc2FubWVtb2lycy5jb20nLFxuICAgICAgICAgIHRleHQ6ICd0ZXh0IHRvIHNoYXJlJyxcbiAgICAgICAgICBzaG93TGFiZWw6IGZhbHNlLFxuICAgICAgICAgIHNob3dDb3VudDogZmFsc2UsXG4gICAgICAgICAgc2hhcmVJbjogJ3BvcHVwJyxcblxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGUpIHt9LFxuICAgICAgICAgICAgbW91c2VlbnRlcjogZnVuY3Rpb24gKGUpIHt9LFxuICAgICAgICAgICAgbW91c2VsZWF2ZTogZnVuY3Rpb24gKGUpIHt9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHNjcmlwdCBcIiArIHNjcmlwdCk7XG4gICAgfVxuICB9KTtcbn1cbiIsIi8qISBqc3NvY2lhbHMgLSB2MS40LjAgLSAyMDE2LTEwLTEwXG4gKiBodHRwOi8vanMtc29jaWFscy5jb21cbiAqIENvcHlyaWdodCAoYykgMjAxNiBBcnRlbSBUYWJhbGluOyBMaWNlbnNlZCBNSVQgKi9cblxuKGZ1bmN0aW9uICh3aW5kb3csICQsIHVuZGVmaW5lZCkge1xuXG4gIHZhciBKU1NPQ0lBTFMgPSBcIkpTU29jaWFsc1wiLFxuICAgIEpTU09DSUFMU19EQVRBX0tFWSA9IEpTU09DSUFMUztcblxuICB2YXIgZ2V0T3JBcHBseSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29udGV4dCkge1xuICAgIGlmICgkLmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuYXBwbHkoY29udGV4dCwgJC5tYWtlQXJyYXkoYXJndW1lbnRzKVxuICAgICAgICAuc2xpY2UoMikpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgdmFyIElNR19TUkNfUkVHRVggPSAvKFxcLihqcGVnfHBuZ3xnaWZ8Ym1wfHN2ZykkfF5kYXRhOmltYWdlXFwvKGpwZWd8cG5nfGdpZnxibXB8c3ZnXFwreG1sKTtiYXNlNjQpL2k7XG4gIHZhciBVUkxfUEFSQU1TX1JFR0VYID0gLygmP1thLXpBLVowLTldKz0pP1xceyhbYS16QS1aMC05XSspXFx9L2c7XG5cbiAgdmFyIE1FQVNVUkVTID0ge1xuICAgIFwiR1wiOiAxMDAwMDAwMDAwLFxuICAgIFwiTVwiOiAxMDAwMDAwLFxuICAgIFwiS1wiOiAxMDAwXG4gIH07XG5cbiAgdmFyIHNoYXJlcyA9IHt9O1xuXG4gIGZ1bmN0aW9uIFNvY2lhbHMoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcblxuICAgICRlbGVtZW50LmRhdGEoSlNTT0NJQUxTX0RBVEFfS0VZLCB0aGlzKTtcblxuICAgIHRoaXMuXyRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICB0aGlzLnNoYXJlcyA9IFtdO1xuXG4gICAgdGhpcy5faW5pdChjb25maWcpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgU29jaWFscy5wcm90b3R5cGUgPSB7XG4gICAgdXJsOiBcIlwiLFxuICAgIHRleHQ6IFwiXCIsXG4gICAgc2hhcmVJbjogXCJibGFua1wiLFxuXG4gICAgc2hvd0xhYmVsOiBmdW5jdGlvbiAoc2NyZWVuV2lkdGgpIHtcbiAgICAgIHJldHVybiAodGhpcy5zaG93Q291bnQgPT09IGZhbHNlKSA/XG4gICAgICAgIChzY3JlZW5XaWR0aCA+IHRoaXMuc21hbGxTY3JlZW5XaWR0aCkgOlxuICAgICAgICAoc2NyZWVuV2lkdGggPj0gdGhpcy5sYXJnZVNjcmVlbldpZHRoKTtcbiAgICB9LFxuXG4gICAgc2hvd0NvdW50OiBmdW5jdGlvbiAoc2NyZWVuV2lkdGgpIHtcbiAgICAgIHJldHVybiAoc2NyZWVuV2lkdGggPD0gdGhpcy5zbWFsbFNjcmVlbldpZHRoKSA/IFwiaW5zaWRlXCIgOiB0cnVlO1xuICAgIH0sXG5cbiAgICBzbWFsbFNjcmVlbldpZHRoOiA2NDAsXG4gICAgbGFyZ2VTY3JlZW5XaWR0aDogMTAyNCxcblxuICAgIHJlc2l6ZVRpbWVvdXQ6IDIwMCxcblxuICAgIGVsZW1lbnRDbGFzczogXCJqc3NvY2lhbHNcIixcbiAgICBzaGFyZXNDbGFzczogXCJqc3NvY2lhbHMtc2hhcmVzXCIsXG4gICAgc2hhcmVDbGFzczogXCJqc3NvY2lhbHMtc2hhcmVcIixcbiAgICBzaGFyZUJ1dHRvbkNsYXNzOiBcImpzc29jaWFscy1zaGFyZS1idXR0b25cIixcbiAgICBzaGFyZUxpbmtDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbGlua1wiLFxuICAgIHNoYXJlTG9nb0NsYXNzOiBcImpzc29jaWFscy1zaGFyZS1sb2dvXCIsXG4gICAgc2hhcmVMYWJlbENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1sYWJlbFwiLFxuICAgIHNoYXJlTGlua0NvdW50Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWxpbmstY291bnRcIixcbiAgICBzaGFyZUNvdW50Qm94Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWNvdW50LWJveFwiLFxuICAgIHNoYXJlQ291bnRDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtY291bnRcIixcbiAgICBzaGFyZVplcm9Db3VudENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1uby1jb3VudFwiLFxuXG4gICAgX2luaXQ6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgIHRoaXMuX2luaXREZWZhdWx0cygpO1xuICAgICAgJC5leHRlbmQodGhpcywgY29uZmlnKTtcbiAgICAgIHRoaXMuX2luaXRTaGFyZXMoKTtcbiAgICAgIHRoaXMuX2F0dGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIF9pbml0RGVmYXVsdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICB0aGlzLnRleHQgPSAkLnRyaW0oJChcIm1ldGFbbmFtZT1kZXNjcmlwdGlvbl1cIilcbiAgICAgICAgLmF0dHIoXCJjb250ZW50XCIpIHx8ICQoXCJ0aXRsZVwiKVxuICAgICAgICAudGV4dCgpKTtcbiAgICB9LFxuXG4gICAgX2luaXRTaGFyZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2hhcmVzID0gJC5tYXAodGhpcy5zaGFyZXMsICQucHJveHkoZnVuY3Rpb24gKHNoYXJlQ29uZmlnKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2hhcmVDb25maWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBzaGFyZUNvbmZpZyA9IHsgc2hhcmU6IHNoYXJlQ29uZmlnIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2hhcmUgPSAoc2hhcmVDb25maWcuc2hhcmUgJiYgc2hhcmVzW3NoYXJlQ29uZmlnLnNoYXJlXSk7XG5cbiAgICAgICAgaWYgKCFzaGFyZSAmJiAhc2hhcmVDb25maWcucmVuZGVyZXIpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihcIlNoYXJlICdcIiArIHNoYXJlQ29uZmlnLnNoYXJlICsgXCInIGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAkLmV4dGVuZCh7IHVybDogdGhpcy51cmwsIHRleHQ6IHRoaXMudGV4dCB9LCBzaGFyZSwgc2hhcmVDb25maWcpO1xuICAgICAgfSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfYXR0YWNoV2luZG93UmVzaXplQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICQod2luZG93KVxuICAgICAgICAub24oXCJyZXNpemVcIiwgJC5wcm94eSh0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyLCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgJCh3aW5kb3cpXG4gICAgICAgIC5vZmYoXCJyZXNpemVcIiwgdGhpcy5fd2luZG93UmVzaXplSGFuZGxlcik7XG4gICAgfSxcblxuICAgIF93aW5kb3dSZXNpemVIYW5kbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuc2hvd0xhYmVsKSB8fCAkLmlzRnVuY3Rpb24odGhpcy5zaG93Q291bnQpKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcmVzaXplVGltZXIpO1xuICAgICAgICB0aGlzLl9yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLnJlZnJlc2gsIHRoaXMpLCB0aGlzLnJlc2l6ZVRpbWVvdXQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICB0aGlzLl9kZWZpbmVPcHRpb25zQnlTY3JlZW4oKTtcblxuICAgICAgdGhpcy5fJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5lbGVtZW50Q2xhc3MpO1xuXG4gICAgICB0aGlzLl8kc2hhcmVzID0gJChcIjxkaXY+XCIpXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlc0NsYXNzKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy5fJGVsZW1lbnQpO1xuXG4gICAgICB0aGlzLl9yZW5kZXJTaGFyZXMoKTtcbiAgICB9LFxuXG4gICAgX2RlZmluZU9wdGlvbnNCeVNjcmVlbjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fc2NyZWVuV2lkdGggPSAkKHdpbmRvdylcbiAgICAgICAgLndpZHRoKCk7XG4gICAgICB0aGlzLl9zaG93TGFiZWwgPSBnZXRPckFwcGx5KHRoaXMuc2hvd0xhYmVsLCB0aGlzLCB0aGlzLl9zY3JlZW5XaWR0aCk7XG4gICAgICB0aGlzLl9zaG93Q291bnQgPSBnZXRPckFwcGx5KHRoaXMuc2hvd0NvdW50LCB0aGlzLCB0aGlzLl9zY3JlZW5XaWR0aCk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZWFjaCh0aGlzLnNoYXJlcywgJC5wcm94eShmdW5jdGlvbiAoXywgc2hhcmUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyU2hhcmUoc2hhcmUpO1xuICAgICAgfSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfcmVuZGVyU2hhcmU6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyICRzaGFyZTtcblxuICAgICAgaWYgKCQuaXNGdW5jdGlvbihzaGFyZS5yZW5kZXJlcikpIHtcbiAgICAgICAgJHNoYXJlID0gJChzaGFyZS5yZW5kZXJlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzaGFyZSA9IHRoaXMuX2NyZWF0ZVNoYXJlKHNoYXJlKTtcbiAgICAgIH1cblxuICAgICAgJHNoYXJlLmFkZENsYXNzKHRoaXMuc2hhcmVDbGFzcylcbiAgICAgICAgLmFkZENsYXNzKHNoYXJlLnNoYXJlID8gXCJqc3NvY2lhbHMtc2hhcmUtXCIgKyBzaGFyZS5zaGFyZSA6IFwiXCIpXG4gICAgICAgIC5hZGRDbGFzcyhzaGFyZS5jc3MpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLl8kc2hhcmVzKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciAkcmVzdWx0ID0gJChcIjxkaXY+XCIpO1xuICAgICAgdmFyICRzaGFyZUxpbmsgPSB0aGlzLl9jcmVhdGVTaGFyZUxpbmsoc2hhcmUpXG4gICAgICAgIC5hcHBlbmRUbygkcmVzdWx0KTtcblxuICAgICAgaWYgKHRoaXMuX3Nob3dDb3VudCkge1xuICAgICAgICB2YXIgaXNJbnNpZGVDb3VudCA9ICh0aGlzLl9zaG93Q291bnQgPT09IFwiaW5zaWRlXCIpO1xuICAgICAgICB2YXIgJGNvdW50Q29udGFpbmVyID0gaXNJbnNpZGVDb3VudCA/ICRzaGFyZUxpbmsgOiAkKFwiPGRpdj5cIilcbiAgICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZUNvdW50Qm94Q2xhc3MpXG4gICAgICAgICAgLmFwcGVuZFRvKCRyZXN1bHQpO1xuICAgICAgICAkY291bnRDb250YWluZXIuYWRkQ2xhc3MoaXNJbnNpZGVDb3VudCA/IHRoaXMuc2hhcmVMaW5rQ291bnRDbGFzcyA6IHRoaXMuc2hhcmVDb3VudEJveENsYXNzKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyU2hhcmVDb3VudChzaGFyZSwgJGNvdW50Q29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZUxpbms6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIHNoYXJlU3RyYXRlZ3kgPSB0aGlzLl9nZXRTaGFyZVN0cmF0ZWd5KHNoYXJlKTtcblxuICAgICAgdmFyICRyZXN1bHQgPSBzaGFyZVN0cmF0ZWd5LmNhbGwoc2hhcmUsIHtcbiAgICAgICAgc2hhcmVVcmw6IHRoaXMuX2dldFNoYXJlVXJsKHNoYXJlKVxuICAgICAgfSk7XG5cbiAgICAgICRyZXN1bHQuYWRkQ2xhc3ModGhpcy5zaGFyZUxpbmtDbGFzcylcbiAgICAgICAgLmFwcGVuZCh0aGlzLl9jcmVhdGVTaGFyZUxvZ28oc2hhcmUpKTtcblxuICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCkge1xuICAgICAgICAkcmVzdWx0LmFwcGVuZCh0aGlzLl9jcmVhdGVTaGFyZUxhYmVsKHNoYXJlKSk7XG4gICAgICB9XG5cbiAgICAgICQuZWFjaCh0aGlzLm9uIHx8IHt9LCBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgICAgICAgICRyZXN1bHQub24oZXZlbnQsICQucHJveHkoaGFuZGxlciwgc2hhcmUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfZ2V0U2hhcmVTdHJhdGVneTogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gc2hhcmVTdHJhdGVnaWVzW3NoYXJlLnNoYXJlSW4gfHwgdGhpcy5zaGFyZUluXTtcblxuICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgIHRocm93IEVycm9yKFwiU2hhcmUgc3RyYXRlZ3kgJ1wiICsgdGhpcy5zaGFyZUluICsgXCInIG5vdCBmb3VuZFwiKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2dldFNoYXJlVXJsOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBzaGFyZVVybCA9IGdldE9yQXBwbHkoc2hhcmUuc2hhcmVVcmwsIHNoYXJlKTtcbiAgICAgIHJldHVybiB0aGlzLl9mb3JtYXRTaGFyZVVybChzaGFyZVVybCwgc2hhcmUpO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMb2dvOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBsb2dvID0gc2hhcmUubG9nbztcblxuICAgICAgdmFyICRyZXN1bHQgPSBJTUdfU1JDX1JFR0VYLnRlc3QobG9nbykgP1xuICAgICAgICAkKFwiPGltZz5cIilcbiAgICAgICAgLmF0dHIoXCJzcmNcIiwgc2hhcmUubG9nbykgOlxuICAgICAgICAkKFwiPGk+XCIpXG4gICAgICAgIC5hZGRDbGFzcyhsb2dvKTtcblxuICAgICAgJHJlc3VsdC5hZGRDbGFzcyh0aGlzLnNoYXJlTG9nb0NsYXNzKTtcblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZUxhYmVsOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHJldHVybiAkKFwiPHNwYW4+XCIpXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlTGFiZWxDbGFzcylcbiAgICAgICAgLnRleHQoc2hhcmUubGFiZWwpO1xuICAgIH0sXG5cbiAgICBfcmVuZGVyU2hhcmVDb3VudDogZnVuY3Rpb24gKHNoYXJlLCAkY29udGFpbmVyKSB7XG4gICAgICB2YXIgJGNvdW50ID0gJChcIjxzcGFuPlwiKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZUNvdW50Q2xhc3MpO1xuXG4gICAgICAkY29udGFpbmVyLmFkZENsYXNzKHRoaXMuc2hhcmVaZXJvQ291bnRDbGFzcylcbiAgICAgICAgLmFwcGVuZCgkY291bnQpO1xuXG4gICAgICB0aGlzLl9sb2FkQ291bnQoc2hhcmUpXG4gICAgICAgIC5kb25lKCQucHJveHkoZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNsYXNzKHRoaXMuc2hhcmVaZXJvQ291bnRDbGFzcyk7XG4gICAgICAgICAgICAkY291bnQudGV4dChjb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9sb2FkQ291bnQ6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgdmFyIGNvdW50VXJsID0gdGhpcy5fZ2V0Q291bnRVcmwoc2hhcmUpO1xuXG4gICAgICBpZiAoIWNvdW50VXJsKSB7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKDApXG4gICAgICAgICAgLnByb21pc2UoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGhhbmRsZVN1Y2Nlc3MgPSAkLnByb3h5KGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMuX2dldENvdW50VmFsdWUocmVzcG9uc2UsIHNoYXJlKSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgICAgJC5nZXRKU09OKGNvdW50VXJsKVxuICAgICAgICAuZG9uZShoYW5kbGVTdWNjZXNzKVxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJC5nZXQoY291bnRVcmwpXG4gICAgICAgICAgICAuZG9uZShoYW5kbGVTdWNjZXNzKVxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBfZ2V0Q291bnRVcmw6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIGNvdW50VXJsID0gZ2V0T3JBcHBseShzaGFyZS5jb3VudFVybCwgc2hhcmUpO1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdFNoYXJlVXJsKGNvdW50VXJsLCBzaGFyZSk7XG4gICAgfSxcblxuICAgIF9nZXRDb3VudFZhbHVlOiBmdW5jdGlvbiAocmVzcG9uc2UsIHNoYXJlKSB7XG4gICAgICB2YXIgY291bnQgPSAoJC5pc0Z1bmN0aW9uKHNoYXJlLmdldENvdW50KSA/IHNoYXJlLmdldENvdW50KHJlc3BvbnNlKSA6IHJlc3BvbnNlKSB8fCAwO1xuICAgICAgcmV0dXJuICh0eXBlb2YgY291bnQgPT09IFwic3RyaW5nXCIpID8gY291bnQgOiB0aGlzLl9mb3JtYXROdW1iZXIoY291bnQpO1xuICAgIH0sXG5cbiAgICBfZm9ybWF0TnVtYmVyOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAkLmVhY2goTUVBU1VSRVMsIGZ1bmN0aW9uIChsZXR0ZXIsIHZhbHVlKSB7XG4gICAgICAgIGlmIChudW1iZXIgPj0gdmFsdWUpIHtcbiAgICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KChudW1iZXIgLyB2YWx1ZSlcbiAgICAgICAgICAgIC50b0ZpeGVkKDIpKSArIGxldHRlcjtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH0sXG5cbiAgICBfZm9ybWF0U2hhcmVVcmw6IGZ1bmN0aW9uICh1cmwsIHNoYXJlKSB7XG4gICAgICByZXR1cm4gdXJsLnJlcGxhY2UoVVJMX1BBUkFNU19SRUdFWCwgZnVuY3Rpb24gKG1hdGNoLCBrZXksIGZpZWxkKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNoYXJlW2ZpZWxkXSB8fCBcIlwiO1xuICAgICAgICByZXR1cm4gdmFsdWUgPyAoa2V5IHx8IFwiXCIpICsgd2luZG93LmVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiBcIlwiO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9jbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lcik7XG4gICAgICB0aGlzLl8kZWxlbWVudC5lbXB0eSgpO1xuICAgIH0sXG5cbiAgICBfcGFzc09wdGlvblRvU2hhcmVzOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIHNoYXJlcyA9IHRoaXMuc2hhcmVzO1xuXG4gICAgICAkLmVhY2goW1widXJsXCIsIFwidGV4dFwiXSwgZnVuY3Rpb24gKF8sIG9wdGlvbk5hbWUpIHtcbiAgICAgICAgaWYgKG9wdGlvbk5hbWUgIT09IGtleSlcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgJC5lYWNoKHNoYXJlcywgZnVuY3Rpb24gKF8sIHNoYXJlKSB7XG4gICAgICAgICAgc2hhcmVba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfbm9ybWFsaXplU2hhcmU6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgaWYgKCQuaXNOdW1lcmljKHNoYXJlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZXNbc2hhcmVdO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNoYXJlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiAkLmdyZXAodGhpcy5zaGFyZXMsIGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgcmV0dXJuIHMuc2hhcmUgPT09IHNoYXJlO1xuICAgICAgICB9KVswXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNoYXJlO1xuICAgIH0sXG5cbiAgICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fY2xlYXIoKTtcbiAgICAgIHRoaXMuX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG5cbiAgICAgIHRoaXMuXyRlbGVtZW50XG4gICAgICAgIC5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRDbGFzcylcbiAgICAgICAgLnJlbW92ZURhdGEoSlNTT0NJQUxTX0RBVEFfS0VZKTtcbiAgICB9LFxuXG4gICAgb3B0aW9uOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1trZXldID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuX3Bhc3NPcHRpb25Ub1NoYXJlcyhrZXksIHZhbHVlKTtcblxuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfSxcblxuICAgIHNoYXJlT3B0aW9uOiBmdW5jdGlvbiAoc2hhcmUsIGtleSwgdmFsdWUpIHtcbiAgICAgIHNoYXJlID0gdGhpcy5fbm9ybWFsaXplU2hhcmUoc2hhcmUpO1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICByZXR1cm4gc2hhcmVba2V5XTtcbiAgICAgIH1cblxuICAgICAgc2hhcmVba2V5XSA9IHZhbHVlO1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICB9O1xuXG4gICQuZm4uanNTb2NpYWxzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHZhciBhcmdzID0gJC5tYWtlQXJyYXkoYXJndW1lbnRzKSxcbiAgICAgIG1ldGhvZEFyZ3MgPSBhcmdzLnNsaWNlKDEpLFxuICAgICAgcmVzdWx0ID0gdGhpcztcblxuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICBpbnN0YW5jZSA9ICRlbGVtZW50LmRhdGEoSlNTT0NJQUxTX0RBVEFfS0VZKSxcbiAgICAgICAgbWV0aG9kUmVzdWx0O1xuXG4gICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBtZXRob2RSZXN1bHQgPSBpbnN0YW5jZVtjb25maWddLmFwcGx5KGluc3RhbmNlLCBtZXRob2RBcmdzKTtcbiAgICAgICAgICBpZiAobWV0aG9kUmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgbWV0aG9kUmVzdWx0ICE9PSBpbnN0YW5jZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbWV0aG9kUmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZS5fZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcbiAgICAgICAgICBpbnN0YW5jZS5faW5pdChjb25maWcpO1xuICAgICAgICAgIGluc3RhbmNlLl9yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IFNvY2lhbHMoJGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBzZXREZWZhdWx0cyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB2YXIgY29tcG9uZW50O1xuXG4gICAgaWYgKCQuaXNQbGFpbk9iamVjdChjb25maWcpKSB7XG4gICAgICBjb21wb25lbnQgPSBTb2NpYWxzLnByb3RvdHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50ID0gc2hhcmVzW2NvbmZpZ107XG4gICAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgfVxuXG4gICAgJC5leHRlbmQoY29tcG9uZW50LCBjb25maWcpO1xuICB9O1xuXG4gIHZhciBzaGFyZVN0cmF0ZWdpZXMgPSB7XG4gICAgcG9wdXA6IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICByZXR1cm4gJChcIjxhPlwiKVxuICAgICAgICAuYXR0cihcImhyZWZcIiwgXCIjXCIpXG4gICAgICAgIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3aW5kb3cub3BlbihhcmdzLnNoYXJlVXJsLCBudWxsLCBcIndpZHRoPTYwMCwgaGVpZ2h0PTQwMCwgbG9jYXRpb249MCwgbWVudWJhcj0wLCByZXNpemVhYmxlPTAsIHNjcm9sbGJhcnM9MCwgc3RhdHVzPTAsIHRpdGxlYmFyPTAsIHRvb2xiYXI9MFwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBibGFuazogZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKFwiPGE+XCIpXG4gICAgICAgIC5hdHRyKHsgdGFyZ2V0OiBcIl9ibGFua1wiLCBocmVmOiBhcmdzLnNoYXJlVXJsIH0pO1xuICAgIH0sXG5cbiAgICBzZWxmOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgcmV0dXJuICQoXCI8YT5cIilcbiAgICAgICAgLmF0dHIoeyB0YXJnZXQ6IFwiX3NlbGZcIiwgaHJlZjogYXJncy5zaGFyZVVybCB9KTtcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmpzU29jaWFscyA9IHtcbiAgICBTb2NpYWxzOiBTb2NpYWxzLFxuICAgIHNoYXJlczogc2hhcmVzLFxuICAgIHNoYXJlU3RyYXRlZ2llczogc2hhcmVTdHJhdGVnaWVzLFxuICAgIHNldERlZmF1bHRzOiBzZXREZWZhdWx0c1xuICB9O1xuXG59KHdpbmRvdywgalF1ZXJ5KSk7XG5cbihmdW5jdGlvbiAod2luZG93LCAkLCBqc1NvY2lhbHMsIHVuZGVmaW5lZCkge1xuXG4gICQuZXh0ZW5kKGpzU29jaWFscy5zaGFyZXMsIHtcblxuICAgIGVtYWlsOiB7XG4gICAgICBsYWJlbDogXCJFLW1haWxcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtYXRcIixcbiAgICAgIHNoYXJlVXJsOiBcIm1haWx0bzp7dG99P3N1YmplY3Q9e3RleHR9JmJvZHk9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9LFxuXG4gICAgdHdpdHRlcjoge1xuICAgICAgbGFiZWw6IFwiVHdlZXRcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtdHdpdHRlclwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT91cmw9e3VybH0mdGV4dD17dGV4dH0mdmlhPXt2aWF9Jmhhc2h0YWdzPXtoYXNodGFnc31cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiXG4gICAgfSxcblxuICAgIGZhY2Vib29rOiB7XG4gICAgICBsYWJlbDogXCJMaWtlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWZhY2Vib29rXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL2ZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8/aWQ9e3VybH1cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5zaGFyZSAmJiBkYXRhLnNoYXJlLnNoYXJlX2NvdW50IHx8IDA7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHZrb250YWt0ZToge1xuICAgICAgbGFiZWw6IFwiTGlrZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS12a1wiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly92ay5jb20vc2hhcmUucGhwP3VybD17dXJsfSZ0aXRsZT17dGl0bGV9JmRlc2NyaXB0aW9uPXt0ZXh0fVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly92ay5jb20vc2hhcmUucGhwP2FjdD1jb3VudCZpbmRleD0xJnVybD17dXJsfVwiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChkYXRhLnNsaWNlKDE1LCAtMilcbiAgICAgICAgICAuc3BsaXQoJywgJylbMV0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnb29nbGVwbHVzOiB7XG4gICAgICBsYWJlbDogXCIrMVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1nb29nbGVcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCJcbiAgICB9LFxuXG4gICAgbGlua2VkaW46IHtcbiAgICAgIGxhYmVsOiBcIlNoYXJlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWxpbmtlZGluXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSZ1cmw9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9jb3VudHNlcnYvY291bnQvc2hhcmU/Zm9ybWF0PWpzb25wJnVybD17dXJsfSZjYWxsYmFjaz0/XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY291bnQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHBpbnRlcmVzdDoge1xuICAgICAgbGFiZWw6IFwiUGluIGl0XCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXBpbnRlcmVzdFwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly9waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYm9va21hcmtsZXQvP21lZGlhPXttZWRpYX0mdXJsPXt1cmx9JmRlc2NyaXB0aW9uPXt0ZXh0fVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly9hcGkucGludGVyZXN0LmNvbS92MS91cmxzL2NvdW50Lmpzb24/JnVybD17dXJsfSZjYWxsYmFjaz0/XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY291bnQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0dW1ibGV1cG9uOiB7XG4gICAgICBsYWJlbDogXCJTaGFyZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1zdHVtYmxldXBvblwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cDovL3d3dy5zdHVtYmxldXBvbi5jb20vc3VibWl0P3VybD17dXJsfSZ0aXRsZT17dGl0bGV9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL3d3dy5zdHVtYmxldXBvbi5jb20vc2VydmljZXMvMS4wMS9iYWRnZS5nZXRpbmZvP3VybD17dXJsfVwiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLnJlc3VsdC52aWV3cztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVsZWdyYW06IHtcbiAgICAgIGxhYmVsOiBcIlRlbGVncmFtXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXBhcGVyLXBsYW5lXCIsXG4gICAgICBzaGFyZVVybDogXCJ0ZzovL21zZz90ZXh0PXt1cmx9IHt0ZXh0fVwiLFxuICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgIH0sXG5cbiAgICB3aGF0c2FwcDoge1xuICAgICAgbGFiZWw6IFwiV2hhdHNBcHBcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtd2hhdHNhcHBcIixcbiAgICAgIHNoYXJlVXJsOiBcIndoYXRzYXBwOi8vc2VuZD90ZXh0PXt1cmx9IHt0ZXh0fVwiLFxuICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgIH0sXG5cbiAgICBsaW5lOiB7XG4gICAgICBsYWJlbDogXCJMSU5FXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWNvbW1lbnRcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHA6Ly9saW5lLm1lL1IvbXNnL3RleHQvP3t0ZXh0fSB7dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCJcbiAgICB9LFxuXG4gICAgdmliZXI6IHtcbiAgICAgIGxhYmVsOiBcIlZpYmVyXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXZvbHVtZS1jb250cm9sLXBob25lXCIsXG4gICAgICBzaGFyZVVybDogXCJ2aWJlcjovL2ZvcndhcmQ/dGV4dD17dXJsfSB7dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9LFxuXG4gICAgcG9ja2V0OiB7XG4gICAgICBsYWJlbDogXCJQb2NrZXRcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtZ2V0LXBvY2tldFwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly9nZXRwb2NrZXQuY29tL3NhdmU/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiXG4gICAgfSxcblxuICAgIG1lc3Nlbmdlcjoge1xuICAgICAgbGFiZWw6IFwiU2hhcmVcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtY29tbWVudGluZ1wiLFxuICAgICAgc2hhcmVVcmw6IFwiZmItbWVzc2VuZ2VyOi8vc2hhcmU/bGluaz17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgIH1cblxuICB9KTtcblxufSh3aW5kb3csIGpRdWVyeSwgd2luZG93LmpzU29jaWFscykpO1xuIl19
