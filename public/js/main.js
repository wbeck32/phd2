function hideMail() {
  console.log('obfuscation');
  var u = 'user';
  var arr = '@';
  var d = 'domain';
  var dot = '.';
  var t = 'tldccc';
  // document.write("<a href=" + "mail" + "to:" + u + arr + d + dot + t +
  //   ">" + "Email (concatenation)" + "</a>" + "<br>");
}

$('.footerTxt.col-md-4.col-sm-3 p').click(function() {
  console.log('email');
  $.ajax({
    url:
      'https://app.mailgun.com/app/domains/sandbox780dc44ce44a41da8a4266b80ff20b2e.mailgun.org/messages',
    method: POST,
    beforeSend: function(xhr) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
    }
  }).done(function(data) {
    if (console && console.log) {
      console.log('Sample of data:', data.slice(0, 100));
    }
  });
});

$('ul.nav.navbar-nav li a').click(function() {
  var m = $(this).attr('href');
  console.log(m);
  if (m == '#moretop') {
    var dropdownChoice = $(this).find('ul li a').attr('href');
    $('section' + dropdownChoice).animate(
      {
        scrollTop: 0
      },
      'slow',
      function() {
        // console.log('success!')
      }
    );
  } else if (
    m == '#product1' ||
    m == '#product2' ||
    m == '#product3' ||
    m == '#product4'
  ) {
    scrollToProductSection(m);
  } else if (m == '#home') {
    $('#collapsedMenu.in').removeClass('in');
    $('section').css({ visibility: 'hidden', display: 'none' });
    $('div.pageBody div.responsiveHeader').css({
      visibility: 'visible',
      display: 'block'
    });
    $('html, body').animate(
      {
        scrollTop: 0
      },
      'slow',
      function() {
        // console.log('success!')
      }
    );
  } else if (m !== undefined) {
    $('#collapsedMenu.in').removeClass('in');
    $('.responsiveHeader').css({ visibility: 'hidden', display: 'none' });
    $('section').not(m).css({ visibility: 'hidden', display: 'none' });
    $('section' + m).css({ display: 'block', visibility: 'visible' });
    $('section' + m).animate(
      {
        scrollTop: 0
      },
      'slow',
      function() {
        // console.log('success!')
      }
    );
  }
});

$('.navbar-brand').click(function() {
  $('.responsiveHeader').css({
    visibility: 'visible',
    display: 'inline-block'
  });
  $('section').css({ visibility: 'hidden', display: 'none' });
  $('html, body').animate(
    {
      scrollTop: 0
    },
    'slow',
    function() {
      // console.log('success!')
    }
  );
});

$('.col-xs-3.col-md-4').click(function() {
  var productTarget = $(this).find('a').attr('href');
  scrollToProductSection(productTarget);
});

$('.product .sectionheader a').click(function() {
  $('#collapsedMenu.in').removeClass('in');
  scrollToProductSection($(this).attr('href'));
});

function scrollToProductSection(selector) {
  console.log(selector);
  $('.responsiveHeader').css({ visibility: 'hidden', display: 'none' });
  $('section').not(selector).css({ visibility: 'hidden', display: 'none' });
  $('section#products.container-fluid').css({
    visibility: 'visible',
    display: 'block'
  });
  $('div.product').not(selector).css({ visibility: 'hidden', display: 'none' });
  $('section' + selector + '.container-fluid.product').css({
    visibility: 'visible',
    display: 'block'
  });
  $('#products').animate(
    {
      scrollTop: 0
    },
    'slow',
    function() {
      // console.log('success!')
    }
  );
}

let mailObject = {};

$('form').on('submit', (event) => {
  event.preventDefault();
  mailObject = $('form').serializeArray();

  $.post({
    url: "send.php",
    dataType: "json",
    data: mailObject
  })

    .done(function(res) {
      // console.log('done: ', res);
  })
    .fail(function(err) {
      // console.log('error: ', err);
  })
    .always(function() {
      // console.log('finished');
    });

  });
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gaGlkZU1haWwoKSB7XG4gIGNvbnNvbGUubG9nKCdvYmZ1c2NhdGlvbicpO1xuICB2YXIgdSA9ICd1c2VyJztcbiAgdmFyIGFyciA9ICdAJztcbiAgdmFyIGQgPSAnZG9tYWluJztcbiAgdmFyIGRvdCA9ICcuJztcbiAgdmFyIHQgPSAndGxkY2NjJztcbiAgLy8gZG9jdW1lbnQud3JpdGUoXCI8YSBocmVmPVwiICsgXCJtYWlsXCIgKyBcInRvOlwiICsgdSArIGFyciArIGQgKyBkb3QgKyB0ICtcbiAgLy8gICBcIj5cIiArIFwiRW1haWwgKGNvbmNhdGVuYXRpb24pXCIgKyBcIjwvYT5cIiArIFwiPGJyPlwiKTtcbn1cblxuJCgnLmZvb3RlclR4dC5jb2wtbWQtNC5jb2wtc20tMyBwJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdlbWFpbCcpO1xuICAkLmFqYXgoe1xuICAgIHVybDpcbiAgICAgICdodHRwczovL2FwcC5tYWlsZ3VuLmNvbS9hcHAvZG9tYWlucy9zYW5kYm94NzgwZGM0NGNlNDRhNDFkYThhNDI2NmI4MGZmMjBiMmUubWFpbGd1bi5vcmcvbWVzc2FnZXMnLFxuICAgIG1ldGhvZDogUE9TVCxcbiAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbih4aHIpIHtcbiAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkJyk7XG4gICAgfVxuICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmxvZykge1xuICAgICAgY29uc29sZS5sb2coJ1NhbXBsZSBvZiBkYXRhOicsIGRhdGEuc2xpY2UoMCwgMTAwKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4kKCd1bC5uYXYubmF2YmFyLW5hdiBsaSBhJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHZhciBtID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gIGNvbnNvbGUubG9nKG0pO1xuICBpZiAobSA9PSAnI21vcmV0b3AnKSB7XG4gICAgdmFyIGRyb3Bkb3duQ2hvaWNlID0gJCh0aGlzKS5maW5kKCd1bCBsaSBhJykuYXR0cignaHJlZicpO1xuICAgICQoJ3NlY3Rpb24nICsgZHJvcGRvd25DaG9pY2UpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgfSxcbiAgICAgICdzbG93JyxcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgbSA9PSAnI3Byb2R1Y3QxJyB8fFxuICAgIG0gPT0gJyNwcm9kdWN0MicgfHxcbiAgICBtID09ICcjcHJvZHVjdDMnIHx8XG4gICAgbSA9PSAnI3Byb2R1Y3Q0J1xuICApIHtcbiAgICBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKG0pO1xuICB9IGVsc2UgaWYgKG0gPT0gJyNob21lJykge1xuICAgICQoJyNjb2xsYXBzZWRNZW51LmluJykucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgJCgnc2VjdGlvbicpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgJCgnZGl2LnBhZ2VCb2R5IGRpdi5yZXNwb25zaXZlSGVhZGVyJykuY3NzKHtcbiAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICB9KTtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICB9LFxuICAgICAgJ3Nsb3cnLFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICB9XG4gICAgKTtcbiAgfSBlbHNlIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAkKCcjY29sbGFwc2VkTWVudS5pbicpLnJlbW92ZUNsYXNzKCdpbicpO1xuICAgICQoJy5yZXNwb25zaXZlSGVhZGVyJykuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicsIGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAkKCdzZWN0aW9uJykubm90KG0pLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgJCgnc2VjdGlvbicgKyBtKS5jc3MoeyBkaXNwbGF5OiAnYmxvY2snLCB2aXNpYmlsaXR5OiAndmlzaWJsZScgfSk7XG4gICAgJCgnc2VjdGlvbicgKyBtKS5hbmltYXRlKFxuICAgICAge1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0sXG4gICAgICAnc2xvdycsXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgIH1cbiAgICApO1xuICB9XG59KTtcblxuJCgnLm5hdmJhci1icmFuZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpLmNzcyh7XG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gIH0pO1xuICAkKCdzZWN0aW9uJykuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicsIGRpc3BsYXk6ICdub25lJyB9KTtcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAge1xuICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgfSxcbiAgICAnc2xvdycsXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgIH1cbiAgKTtcbn0pO1xuXG4kKCcuY29sLXhzLTMuY29sLW1kLTQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdmFyIHByb2R1Y3RUYXJnZXQgPSAkKHRoaXMpLmZpbmQoJ2EnKS5hdHRyKCdocmVmJyk7XG4gIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24ocHJvZHVjdFRhcmdldCk7XG59KTtcblxuJCgnLnByb2R1Y3QgLnNlY3Rpb25oZWFkZXIgYScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKCcjY29sbGFwc2VkTWVudS5pbicpLnJlbW92ZUNsYXNzKCdpbicpO1xuICBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKCQodGhpcykuYXR0cignaHJlZicpKTtcbn0pO1xuXG5mdW5jdGlvbiBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKHNlbGVjdG9yKSB7XG4gIGNvbnNvbGUubG9nKHNlbGVjdG9yKTtcbiAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uJykubm90KHNlbGVjdG9yKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uI3Byb2R1Y3RzLmNvbnRhaW5lci1mbHVpZCcpLmNzcyh7XG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgIGRpc3BsYXk6ICdibG9jaydcbiAgfSk7XG4gICQoJ2Rpdi5wcm9kdWN0Jykubm90KHNlbGVjdG9yKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uJyArIHNlbGVjdG9yICsgJy5jb250YWluZXItZmx1aWQucHJvZHVjdCcpLmNzcyh7XG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgIGRpc3BsYXk6ICdibG9jaydcbiAgfSk7XG4gICQoJyNwcm9kdWN0cycpLmFuaW1hdGUoXG4gICAge1xuICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgfSxcbiAgICAnc2xvdycsXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgIH1cbiAgKTtcbn1cbiIsImxldCBtYWlsT2JqZWN0ID0ge307XG5cbiQoJ2Zvcm0nKS5vbignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIG1haWxPYmplY3QgPSAkKCdmb3JtJykuc2VyaWFsaXplQXJyYXkoKTtcblxuICAkLnBvc3Qoe1xuICAgIHVybDogXCJzZW5kLnBocFwiLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBkYXRhOiBtYWlsT2JqZWN0XG4gIH0pXG5cbiAgICAuZG9uZShmdW5jdGlvbihyZXMpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkb25lOiAnLCByZXMpO1xuICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2Vycm9yOiAnLCBlcnIpO1xuICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZmluaXNoZWQnKTtcbiAgICB9KTtcblxuICB9KTsiLCIvKiEganNzb2NpYWxzIC0gdjEuNC4wIC0gMjAxNi0xMC0xMFxuICogaHR0cDovL2pzLXNvY2lhbHMuY29tXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgQXJ0ZW0gVGFiYWxpbjsgTGljZW5zZWQgTUlUICovXG5cbihmdW5jdGlvbiAod2luZG93LCAkLCB1bmRlZmluZWQpIHtcblxuICB2YXIgSlNTT0NJQUxTID0gXCJKU1NvY2lhbHNcIixcbiAgICBKU1NPQ0lBTFNfREFUQV9LRVkgPSBKU1NPQ0lBTFM7XG5cbiAgdmFyIGdldE9yQXBwbHkgPSBmdW5jdGlvbiAodmFsdWUsIGNvbnRleHQpIHtcbiAgICBpZiAoJC5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLmFwcGx5KGNvbnRleHQsICQubWFrZUFycmF5KGFyZ3VtZW50cylcbiAgICAgICAgLnNsaWNlKDIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIHZhciBJTUdfU1JDX1JFR0VYID0gLyhcXC4oanBlZ3xwbmd8Z2lmfGJtcHxzdmcpJHxeZGF0YTppbWFnZVxcLyhqcGVnfHBuZ3xnaWZ8Ym1wfHN2Z1xcK3htbCk7YmFzZTY0KS9pO1xuICB2YXIgVVJMX1BBUkFNU19SRUdFWCA9IC8oJj9bYS16QS1aMC05XSs9KT9cXHsoW2EtekEtWjAtOV0rKVxcfS9nO1xuXG4gIHZhciBNRUFTVVJFUyA9IHtcbiAgICBcIkdcIjogMTAwMDAwMDAwMCxcbiAgICBcIk1cIjogMTAwMDAwMCxcbiAgICBcIktcIjogMTAwMFxuICB9O1xuXG4gIHZhciBzaGFyZXMgPSB7fTtcblxuICBmdW5jdGlvbiBTb2NpYWxzKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cbiAgICAkZWxlbWVudC5kYXRhKEpTU09DSUFMU19EQVRBX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLl8kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgdGhpcy5zaGFyZXMgPSBbXTtcblxuICAgIHRoaXMuX2luaXQoY29uZmlnKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIFNvY2lhbHMucHJvdG90eXBlID0ge1xuICAgIHVybDogXCJcIixcbiAgICB0ZXh0OiBcIlwiLFxuICAgIHNoYXJlSW46IFwiYmxhbmtcIixcblxuICAgIHNob3dMYWJlbDogZnVuY3Rpb24gKHNjcmVlbldpZHRoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuc2hvd0NvdW50ID09PSBmYWxzZSkgP1xuICAgICAgICAoc2NyZWVuV2lkdGggPiB0aGlzLnNtYWxsU2NyZWVuV2lkdGgpIDpcbiAgICAgICAgKHNjcmVlbldpZHRoID49IHRoaXMubGFyZ2VTY3JlZW5XaWR0aCk7XG4gICAgfSxcblxuICAgIHNob3dDb3VudDogZnVuY3Rpb24gKHNjcmVlbldpZHRoKSB7XG4gICAgICByZXR1cm4gKHNjcmVlbldpZHRoIDw9IHRoaXMuc21hbGxTY3JlZW5XaWR0aCkgPyBcImluc2lkZVwiIDogdHJ1ZTtcbiAgICB9LFxuXG4gICAgc21hbGxTY3JlZW5XaWR0aDogNjQwLFxuICAgIGxhcmdlU2NyZWVuV2lkdGg6IDEwMjQsXG5cbiAgICByZXNpemVUaW1lb3V0OiAyMDAsXG5cbiAgICBlbGVtZW50Q2xhc3M6IFwianNzb2NpYWxzXCIsXG4gICAgc2hhcmVzQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlc1wiLFxuICAgIHNoYXJlQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlXCIsXG4gICAgc2hhcmVCdXR0b25DbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtYnV0dG9uXCIsXG4gICAgc2hhcmVMaW5rQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWxpbmtcIixcbiAgICBzaGFyZUxvZ29DbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbG9nb1wiLFxuICAgIHNoYXJlTGFiZWxDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbGFiZWxcIixcbiAgICBzaGFyZUxpbmtDb3VudENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1saW5rLWNvdW50XCIsXG4gICAgc2hhcmVDb3VudEJveENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1jb3VudC1ib3hcIixcbiAgICBzaGFyZUNvdW50Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWNvdW50XCIsXG4gICAgc2hhcmVaZXJvQ291bnRDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbm8tY291bnRcIixcblxuICAgIF9pbml0OiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICB0aGlzLl9pbml0RGVmYXVsdHMoKTtcbiAgICAgICQuZXh0ZW5kKHRoaXMsIGNvbmZpZyk7XG4gICAgICB0aGlzLl9pbml0U2hhcmVzKCk7XG4gICAgICB0aGlzLl9hdHRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuICAgIH0sXG5cbiAgICBfaW5pdERlZmF1bHRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgdGhpcy50ZXh0ID0gJC50cmltKCQoXCJtZXRhW25hbWU9ZGVzY3JpcHRpb25dXCIpXG4gICAgICAgIC5hdHRyKFwiY29udGVudFwiKSB8fCAkKFwidGl0bGVcIilcbiAgICAgICAgLnRleHQoKSk7XG4gICAgfSxcblxuICAgIF9pbml0U2hhcmVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNoYXJlcyA9ICQubWFwKHRoaXMuc2hhcmVzLCAkLnByb3h5KGZ1bmN0aW9uIChzaGFyZUNvbmZpZykge1xuICAgICAgICBpZiAodHlwZW9mIHNoYXJlQ29uZmlnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgc2hhcmVDb25maWcgPSB7IHNoYXJlOiBzaGFyZUNvbmZpZyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNoYXJlID0gKHNoYXJlQ29uZmlnLnNoYXJlICYmIHNoYXJlc1tzaGFyZUNvbmZpZy5zaGFyZV0pO1xuXG4gICAgICAgIGlmICghc2hhcmUgJiYgIXNoYXJlQ29uZmlnLnJlbmRlcmVyKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoXCJTaGFyZSAnXCIgKyBzaGFyZUNvbmZpZy5zaGFyZSArIFwiJyBpcyBub3QgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJC5leHRlbmQoeyB1cmw6IHRoaXMudXJsLCB0ZXh0OiB0aGlzLnRleHQgfSwgc2hhcmUsIHNoYXJlQ29uZmlnKTtcbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2F0dGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkKHdpbmRvdylcbiAgICAgICAgLm9uKFwicmVzaXplXCIsICQucHJveHkodGhpcy5fd2luZG93UmVzaXplSGFuZGxlciwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICQod2luZG93KVxuICAgICAgICAub2ZmKFwicmVzaXplXCIsIHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBfd2luZG93UmVzaXplSGFuZGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCQuaXNGdW5jdGlvbih0aGlzLnNob3dMYWJlbCkgfHwgJC5pc0Z1bmN0aW9uKHRoaXMuc2hvd0NvdW50KSkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVyKTtcbiAgICAgICAgdGhpcy5fcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCQucHJveHkodGhpcy5yZWZyZXNoLCB0aGlzKSwgdGhpcy5yZXNpemVUaW1lb3V0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgX3JlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fY2xlYXIoKTtcblxuICAgICAgdGhpcy5fZGVmaW5lT3B0aW9uc0J5U2NyZWVuKCk7XG5cbiAgICAgIHRoaXMuXyRlbGVtZW50LmFkZENsYXNzKHRoaXMuZWxlbWVudENsYXNzKTtcblxuICAgICAgdGhpcy5fJHNoYXJlcyA9ICQoXCI8ZGl2PlwiKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZXNDbGFzcylcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuXyRlbGVtZW50KTtcblxuICAgICAgdGhpcy5fcmVuZGVyU2hhcmVzKCk7XG4gICAgfSxcblxuICAgIF9kZWZpbmVPcHRpb25zQnlTY3JlZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX3NjcmVlbldpZHRoID0gJCh3aW5kb3cpXG4gICAgICAgIC53aWR0aCgpO1xuICAgICAgdGhpcy5fc2hvd0xhYmVsID0gZ2V0T3JBcHBseSh0aGlzLnNob3dMYWJlbCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgICAgdGhpcy5fc2hvd0NvdW50ID0gZ2V0T3JBcHBseSh0aGlzLnNob3dDb3VudCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgIH0sXG5cbiAgICBfcmVuZGVyU2hhcmVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmVhY2godGhpcy5zaGFyZXMsICQucHJveHkoZnVuY3Rpb24gKF8sIHNoYXJlKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclNoYXJlKHNoYXJlKTtcbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciAkc2hhcmU7XG5cbiAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2hhcmUucmVuZGVyZXIpKSB7XG4gICAgICAgICRzaGFyZSA9ICQoc2hhcmUucmVuZGVyZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2hhcmUgPSB0aGlzLl9jcmVhdGVTaGFyZShzaGFyZSk7XG4gICAgICB9XG5cbiAgICAgICRzaGFyZS5hZGRDbGFzcyh0aGlzLnNoYXJlQ2xhc3MpXG4gICAgICAgIC5hZGRDbGFzcyhzaGFyZS5zaGFyZSA/IFwianNzb2NpYWxzLXNoYXJlLVwiICsgc2hhcmUuc2hhcmUgOiBcIlwiKVxuICAgICAgICAuYWRkQ2xhc3Moc2hhcmUuY3NzKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy5fJHNoYXJlcyk7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZTogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgJHJlc3VsdCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgIHZhciAkc2hhcmVMaW5rID0gdGhpcy5fY3JlYXRlU2hhcmVMaW5rKHNoYXJlKVxuICAgICAgICAuYXBwZW5kVG8oJHJlc3VsdCk7XG5cbiAgICAgIGlmICh0aGlzLl9zaG93Q291bnQpIHtcbiAgICAgICAgdmFyIGlzSW5zaWRlQ291bnQgPSAodGhpcy5fc2hvd0NvdW50ID09PSBcImluc2lkZVwiKTtcbiAgICAgICAgdmFyICRjb3VudENvbnRhaW5lciA9IGlzSW5zaWRlQ291bnQgPyAkc2hhcmVMaW5rIDogJChcIjxkaXY+XCIpXG4gICAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudEJveENsYXNzKVxuICAgICAgICAgIC5hcHBlbmRUbygkcmVzdWx0KTtcbiAgICAgICAgJGNvdW50Q29udGFpbmVyLmFkZENsYXNzKGlzSW5zaWRlQ291bnQgPyB0aGlzLnNoYXJlTGlua0NvdW50Q2xhc3MgOiB0aGlzLnNoYXJlQ291bnRCb3hDbGFzcyk7XG4gICAgICAgIHRoaXMuX3JlbmRlclNoYXJlQ291bnQoc2hhcmUsICRjb3VudENvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMaW5rOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBzaGFyZVN0cmF0ZWd5ID0gdGhpcy5fZ2V0U2hhcmVTdHJhdGVneShzaGFyZSk7XG5cbiAgICAgIHZhciAkcmVzdWx0ID0gc2hhcmVTdHJhdGVneS5jYWxsKHNoYXJlLCB7XG4gICAgICAgIHNoYXJlVXJsOiB0aGlzLl9nZXRTaGFyZVVybChzaGFyZSlcbiAgICAgIH0pO1xuXG4gICAgICAkcmVzdWx0LmFkZENsYXNzKHRoaXMuc2hhcmVMaW5rQ2xhc3MpXG4gICAgICAgIC5hcHBlbmQodGhpcy5fY3JlYXRlU2hhcmVMb2dvKHNoYXJlKSk7XG5cbiAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwpIHtcbiAgICAgICAgJHJlc3VsdC5hcHBlbmQodGhpcy5fY3JlYXRlU2hhcmVMYWJlbChzaGFyZSkpO1xuICAgICAgfVxuXG4gICAgICAkLmVhY2godGhpcy5vbiB8fCB7fSwgZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICgkLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICAgICAgICAkcmVzdWx0Lm9uKGV2ZW50LCAkLnByb3h5KGhhbmRsZXIsIHNoYXJlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2dldFNoYXJlU3RyYXRlZ3k6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHNoYXJlU3RyYXRlZ2llc1tzaGFyZS5zaGFyZUluIHx8IHRoaXMuc2hhcmVJbl07XG5cbiAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICB0aHJvdyBFcnJvcihcIlNoYXJlIHN0cmF0ZWd5ICdcIiArIHRoaXMuc2hhcmVJbiArIFwiJyBub3QgZm91bmRcIik7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIF9nZXRTaGFyZVVybDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgc2hhcmVVcmwgPSBnZXRPckFwcGx5KHNoYXJlLnNoYXJlVXJsLCBzaGFyZSk7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybWF0U2hhcmVVcmwoc2hhcmVVcmwsIHNoYXJlKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTG9nbzogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgbG9nbyA9IHNoYXJlLmxvZ287XG5cbiAgICAgIHZhciAkcmVzdWx0ID0gSU1HX1NSQ19SRUdFWC50ZXN0KGxvZ28pID9cbiAgICAgICAgJChcIjxpbWc+XCIpXG4gICAgICAgIC5hdHRyKFwic3JjXCIsIHNoYXJlLmxvZ28pIDpcbiAgICAgICAgJChcIjxpPlwiKVxuICAgICAgICAuYWRkQ2xhc3MobG9nbyk7XG5cbiAgICAgICRyZXN1bHQuYWRkQ2xhc3ModGhpcy5zaGFyZUxvZ29DbGFzcyk7XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMYWJlbDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICByZXR1cm4gJChcIjxzcGFuPlwiKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZUxhYmVsQ2xhc3MpXG4gICAgICAgIC50ZXh0KHNoYXJlLmxhYmVsKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlQ291bnQ6IGZ1bmN0aW9uIChzaGFyZSwgJGNvbnRhaW5lcikge1xuICAgICAgdmFyICRjb3VudCA9ICQoXCI8c3Bhbj5cIilcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudENsYXNzKTtcblxuICAgICAgJGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnNoYXJlWmVyb0NvdW50Q2xhc3MpXG4gICAgICAgIC5hcHBlbmQoJGNvdW50KTtcblxuICAgICAgdGhpcy5fbG9hZENvdW50KHNoYXJlKVxuICAgICAgICAuZG9uZSgkLnByb3h5KGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDbGFzcyh0aGlzLnNoYXJlWmVyb0NvdW50Q2xhc3MpO1xuICAgICAgICAgICAgJGNvdW50LnRleHQoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfbG9hZENvdW50OiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgIHZhciBjb3VudFVybCA9IHRoaXMuX2dldENvdW50VXJsKHNoYXJlKTtcblxuICAgICAgaWYgKCFjb3VudFVybCkge1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgwKVxuICAgICAgICAgIC5wcm9taXNlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBoYW5kbGVTdWNjZXNzID0gJC5wcm94eShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzLl9nZXRDb3VudFZhbHVlKHJlc3BvbnNlLCBzaGFyZSkpO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICQuZ2V0SlNPTihjb3VudFVybClcbiAgICAgICAgLmRvbmUoaGFuZGxlU3VjY2VzcylcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQuZ2V0KGNvdW50VXJsKVxuICAgICAgICAgICAgLmRvbmUoaGFuZGxlU3VjY2VzcylcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgX2dldENvdW50VXJsOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBjb3VudFVybCA9IGdldE9yQXBwbHkoc2hhcmUuY291bnRVcmwsIHNoYXJlKTtcbiAgICAgIHJldHVybiB0aGlzLl9mb3JtYXRTaGFyZVVybChjb3VudFVybCwgc2hhcmUpO1xuICAgIH0sXG5cbiAgICBfZ2V0Q291bnRWYWx1ZTogZnVuY3Rpb24gKHJlc3BvbnNlLCBzaGFyZSkge1xuICAgICAgdmFyIGNvdW50ID0gKCQuaXNGdW5jdGlvbihzaGFyZS5nZXRDb3VudCkgPyBzaGFyZS5nZXRDb3VudChyZXNwb25zZSkgOiByZXNwb25zZSkgfHwgMDtcbiAgICAgIHJldHVybiAodHlwZW9mIGNvdW50ID09PSBcInN0cmluZ1wiKSA/IGNvdW50IDogdGhpcy5fZm9ybWF0TnVtYmVyKGNvdW50KTtcbiAgICB9LFxuXG4gICAgX2Zvcm1hdE51bWJlcjogZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgJC5lYWNoKE1FQVNVUkVTLCBmdW5jdGlvbiAobGV0dGVyLCB2YWx1ZSkge1xuICAgICAgICBpZiAobnVtYmVyID49IHZhbHVlKSB7XG4gICAgICAgICAgbnVtYmVyID0gcGFyc2VGbG9hdCgobnVtYmVyIC8gdmFsdWUpXG4gICAgICAgICAgICAudG9GaXhlZCgyKSkgKyBsZXR0ZXI7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9LFxuXG4gICAgX2Zvcm1hdFNoYXJlVXJsOiBmdW5jdGlvbiAodXJsLCBzaGFyZSkge1xuICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKFVSTF9QQVJBTVNfUkVHRVgsIGZ1bmN0aW9uIChtYXRjaCwga2V5LCBmaWVsZCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzaGFyZVtmaWVsZF0gfHwgXCJcIjtcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gKGtleSB8fCBcIlwiKSArIHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogXCJcIjtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcmVzaXplVGltZXIpO1xuICAgICAgdGhpcy5fJGVsZW1lbnQuZW1wdHkoKTtcbiAgICB9LFxuXG4gICAgX3Bhc3NPcHRpb25Ub1NoYXJlczogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBzaGFyZXMgPSB0aGlzLnNoYXJlcztcblxuICAgICAgJC5lYWNoKFtcInVybFwiLCBcInRleHRcIl0sIGZ1bmN0aW9uIChfLCBvcHRpb25OYW1lKSB7XG4gICAgICAgIGlmIChvcHRpb25OYW1lICE9PSBrZXkpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICQuZWFjaChzaGFyZXMsIGZ1bmN0aW9uIChfLCBzaGFyZSkge1xuICAgICAgICAgIHNoYXJlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgX25vcm1hbGl6ZVNoYXJlOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIGlmICgkLmlzTnVtZXJpYyhzaGFyZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVzW3NoYXJlXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzaGFyZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gJC5ncmVwKHRoaXMuc2hhcmVzLCBmdW5jdGlvbiAocykge1xuICAgICAgICAgIHJldHVybiBzLnNoYXJlID09PSBzaGFyZTtcbiAgICAgICAgfSlbMF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaGFyZTtcbiAgICB9LFxuXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfSxcblxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICB0aGlzLl9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuXG4gICAgICB0aGlzLl8kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Q2xhc3MpXG4gICAgICAgIC5yZW1vdmVEYXRhKEpTU09DSUFMU19EQVRBX0tFWSk7XG4gICAgfSxcblxuICAgIG9wdGlvbjogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLl9wYXNzT3B0aW9uVG9TaGFyZXMoa2V5LCB2YWx1ZSk7XG5cbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH0sXG5cbiAgICBzaGFyZU9wdGlvbjogZnVuY3Rpb24gKHNoYXJlLCBrZXksIHZhbHVlKSB7XG4gICAgICBzaGFyZSA9IHRoaXMuX25vcm1hbGl6ZVNoYXJlKHNoYXJlKTtcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIHNoYXJlW2tleV07XG4gICAgICB9XG5cbiAgICAgIHNoYXJlW2tleV0gPSB2YWx1ZTtcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbiAgfTtcblxuICAkLmZuLmpzU29jaWFscyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB2YXIgYXJncyA9ICQubWFrZUFycmF5KGFyZ3VtZW50cyksXG4gICAgICBtZXRob2RBcmdzID0gYXJncy5zbGljZSgxKSxcbiAgICAgIHJlc3VsdCA9IHRoaXM7XG5cbiAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgaW5zdGFuY2UgPSAkZWxlbWVudC5kYXRhKEpTU09DSUFMU19EQVRBX0tFWSksXG4gICAgICAgIG1ldGhvZFJlc3VsdDtcblxuICAgICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgbWV0aG9kUmVzdWx0ID0gaW5zdGFuY2VbY29uZmlnXS5hcHBseShpbnN0YW5jZSwgbWV0aG9kQXJncyk7XG4gICAgICAgICAgaWYgKG1ldGhvZFJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIG1ldGhvZFJlc3VsdCAhPT0gaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG1ldGhvZFJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UuX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG4gICAgICAgICAgaW5zdGFuY2UuX2luaXQoY29uZmlnKTtcbiAgICAgICAgICBpbnN0YW5jZS5fcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBTb2NpYWxzKCRlbGVtZW50LCBjb25maWcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB2YXIgc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgdmFyIGNvbXBvbmVudDtcblxuICAgIGlmICgkLmlzUGxhaW5PYmplY3QoY29uZmlnKSkge1xuICAgICAgY29tcG9uZW50ID0gU29jaWFscy5wcm90b3R5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudCA9IHNoYXJlc1tjb25maWddO1xuICAgICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIH1cblxuICAgICQuZXh0ZW5kKGNvbXBvbmVudCwgY29uZmlnKTtcbiAgfTtcblxuICB2YXIgc2hhcmVTdHJhdGVnaWVzID0ge1xuICAgIHBvcHVwOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgcmV0dXJuICQoXCI8YT5cIilcbiAgICAgICAgLmF0dHIoXCJocmVmXCIsIFwiI1wiKVxuICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2luZG93Lm9wZW4oYXJncy5zaGFyZVVybCwgbnVsbCwgXCJ3aWR0aD02MDAsIGhlaWdodD00MDAsIGxvY2F0aW9uPTAsIG1lbnViYXI9MCwgcmVzaXplYWJsZT0wLCBzY3JvbGxiYXJzPTAsIHN0YXR1cz0wLCB0aXRsZWJhcj0wLCB0b29sYmFyPTBcIik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYmxhbms6IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICByZXR1cm4gJChcIjxhPlwiKVxuICAgICAgICAuYXR0cih7IHRhcmdldDogXCJfYmxhbmtcIiwgaHJlZjogYXJncy5zaGFyZVVybCB9KTtcbiAgICB9LFxuXG4gICAgc2VsZjogZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKFwiPGE+XCIpXG4gICAgICAgIC5hdHRyKHsgdGFyZ2V0OiBcIl9zZWxmXCIsIGhyZWY6IGFyZ3Muc2hhcmVVcmwgfSk7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5qc1NvY2lhbHMgPSB7XG4gICAgU29jaWFsczogU29jaWFscyxcbiAgICBzaGFyZXM6IHNoYXJlcyxcbiAgICBzaGFyZVN0cmF0ZWdpZXM6IHNoYXJlU3RyYXRlZ2llcyxcbiAgICBzZXREZWZhdWx0czogc2V0RGVmYXVsdHNcbiAgfTtcblxufSh3aW5kb3csIGpRdWVyeSkpO1xuXG4oZnVuY3Rpb24gKHdpbmRvdywgJCwganNTb2NpYWxzLCB1bmRlZmluZWQpIHtcblxuICAkLmV4dGVuZChqc1NvY2lhbHMuc2hhcmVzLCB7XG5cbiAgICBlbWFpbDoge1xuICAgICAgbGFiZWw6IFwiRS1tYWlsXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWF0XCIsXG4gICAgICBzaGFyZVVybDogXCJtYWlsdG86e3RvfT9zdWJqZWN0PXt0ZXh0fSZib2R5PXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIHR3aXR0ZXI6IHtcbiAgICAgIGxhYmVsOiBcIlR3ZWV0XCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXR3aXR0ZXJcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPXt1cmx9JnRleHQ9e3RleHR9JnZpYT17dmlhfSZoYXNodGFncz17aGFzaHRhZ3N9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICBmYWNlYm9vazoge1xuICAgICAgbGFiZWw6IFwiTGlrZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1mYWNlYm9va1wiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly9mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vP2lkPXt1cmx9XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuc2hhcmUgJiYgZGF0YS5zaGFyZS5zaGFyZV9jb3VudCB8fCAwO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB2a29udGFrdGU6IHtcbiAgICAgIGxhYmVsOiBcIkxpa2VcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtdmtcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vdmsuY29tL3NoYXJlLnBocD91cmw9e3VybH0mdGl0bGU9e3RpdGxlfSZkZXNjcmlwdGlvbj17dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vdmsuY29tL3NoYXJlLnBocD9hY3Q9Y291bnQmaW5kZXg9MSZ1cmw9e3VybH1cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZGF0YS5zbGljZSgxNSwgLTIpXG4gICAgICAgICAgLnNwbGl0KCcsICcpWzFdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ29vZ2xlcGx1czoge1xuICAgICAgbGFiZWw6IFwiKzFcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtZ29vZ2xlXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiXG4gICAgfSxcblxuICAgIGxpbmtlZGluOiB7XG4gICAgICBsYWJlbDogXCJTaGFyZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1saW5rZWRpblwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vY291bnRzZXJ2L2NvdW50L3NoYXJlP2Zvcm1hdD1qc29ucCZ1cmw9e3VybH0mY2FsbGJhY2s9P1wiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNvdW50O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBwaW50ZXJlc3Q6IHtcbiAgICAgIGxhYmVsOiBcIlBpbiBpdFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1waW50ZXJlc3RcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2Jvb2ttYXJrbGV0Lz9tZWRpYT17bWVkaWF9JnVybD17dXJsfSZkZXNjcmlwdGlvbj17dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vYXBpLnBpbnRlcmVzdC5jb20vdjEvdXJscy9jb3VudC5qc29uPyZ1cmw9e3VybH0mY2FsbGJhY2s9P1wiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNvdW50O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHVtYmxldXBvbjoge1xuICAgICAgbGFiZWw6IFwiU2hhcmVcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtc3R1bWJsZXVwb25cIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHA6Ly93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9e3VybH0mdGl0bGU9e3RpdGxlfVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly93d3cuc3R1bWJsZXVwb24uY29tL3NlcnZpY2VzLzEuMDEvYmFkZ2UuZ2V0aW5mbz91cmw9e3VybH1cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHQudmlld3M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRlbGVncmFtOiB7XG4gICAgICBsYWJlbDogXCJUZWxlZ3JhbVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1wYXBlci1wbGFuZVwiLFxuICAgICAgc2hhcmVVcmw6IFwidGc6Ly9tc2c/dGV4dD17dXJsfSB7dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9LFxuXG4gICAgd2hhdHNhcHA6IHtcbiAgICAgIGxhYmVsOiBcIldoYXRzQXBwXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXdoYXRzYXBwXCIsXG4gICAgICBzaGFyZVVybDogXCJ3aGF0c2FwcDovL3NlbmQ/dGV4dD17dXJsfSB7dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9LFxuXG4gICAgbGluZToge1xuICAgICAgbGFiZWw6IFwiTElORVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1jb21tZW50XCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwOi8vbGluZS5tZS9SL21zZy90ZXh0Lz97dGV4dH0ge3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiXG4gICAgfSxcblxuICAgIHZpYmVyOiB7XG4gICAgICBsYWJlbDogXCJWaWJlclwiLFxuICAgICAgbG9nbzogXCJmYSBmYS12b2x1bWUtY29udHJvbC1waG9uZVwiLFxuICAgICAgc2hhcmVVcmw6IFwidmliZXI6Ly9mb3J3YXJkP3RleHQ9e3VybH0ge3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIHBvY2tldDoge1xuICAgICAgbGFiZWw6IFwiUG9ja2V0XCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWdldC1wb2NrZXRcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vZ2V0cG9ja2V0LmNvbS9zYXZlP3VybD17dXJsfSZ0aXRsZT17dGl0bGV9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICBtZXNzZW5nZXI6IHtcbiAgICAgIGxhYmVsOiBcIlNoYXJlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWNvbW1lbnRpbmdcIixcbiAgICAgIHNoYXJlVXJsOiBcImZiLW1lc3NlbmdlcjovL3NoYXJlP2xpbms9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9XG5cbiAgfSk7XG5cbn0od2luZG93LCBqUXVlcnksIHdpbmRvdy5qc1NvY2lhbHMpKTtcblxuXG5mdW5jdGlvbiByZXF1aXJlKHNjcmlwdCkge1xuICAkLmFqYXgoe1xuICAgIHVybDogJ2pzU29jaWFscy5qcycsXG4gICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgYXN5bmM6IGZhbHNlLCAvLyA8LS0gVGhpcyBpcyB0aGUga2V5XG4gICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gYWxsIGcgIG9vZC4uLlxuXG4gICAgICAkKCcjc2hhcmVSb3VuZEljb25zJylcbiAgICAgICAgLmpzU29jaWFscyh7XG4gICAgICAgICAgc2hhcmVzOiBbJ2VtYWlsJywgJ3R3aXR0ZXInLCAnZmFjZWJvb2snLCAnbGlua2VkaW4nLCAnbWVzc2VuZ2VyJ10sXG4gICAgICAgICAgdXJsOiAnaHR0cDovL2FydGlzYW5tZW1vaXJzLmNvbScsXG4gICAgICAgICAgdGV4dDogJ3RleHQgdG8gc2hhcmUnLFxuICAgICAgICAgIHNob3dMYWJlbDogZmFsc2UsXG4gICAgICAgICAgc2hvd0NvdW50OiBmYWxzZSxcbiAgICAgICAgICBzaGFyZUluOiAncG9wdXAnLFxuXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoZSkge30sXG4gICAgICAgICAgICBtb3VzZWVudGVyOiBmdW5jdGlvbiAoZSkge30sXG4gICAgICAgICAgICBtb3VzZWxlYXZlOiBmdW5jdGlvbiAoZSkge31cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGxvYWQgc2NyaXB0IFwiICsgc2NyaXB0KTtcbiAgICB9XG4gIH0pO1xufVxuXG4iXX0=
