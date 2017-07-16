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

// Code from
// https://www.sitepoint.com/html5-forms-javascript-constraint-validation-api/
var form = document.getElementById("contactUs");
form.noValidate = true;

// set handler to validate the form
// onsubmit used for easier cross-browser compatibility
form.onsubmit = validateForm;

function validateForm(event) {

  // fetch cross-browser event object and form node
  event = (event ? event : window.event);
  var
    form = (event.target ? event.target : event.srcElement),
    f, field, formvalid = true;

  // loop all fields
  for (f = 0; f < form.elements; f++) {

    // get field
    field = form.elements[f];

    // ignore buttons, fieldsets, etc.
    if (field.nodeName !== "INPUT" && field.nodeName !== "TEXTAREA" && field.nodeName !== "SELECT") continue;

    // is native browser validation available?
    if (typeof field.willValidate !== "undefined") {

      // native validation available
      if (field.nodeName === "INPUT" && field.type !== field.getAttribute("type")) {

        // input type not supported! Use legacy JavaScript validation
        field.setCustomValidity(LegacyValidation(field) ? "" : "error");

      }

      // native browser check
      field.checkValidity();

    } else {

      // native validation not available
      field.validity = field.validity || {};

      // set to result of validation function
      field.validity.valid = LegacyValidation(field);

      // if "invalid" events are required, trigger it here

    }

    if (field.validity.valid) {

      // remove error styles and messages

    } else {

      // style field, show error, etc.

      // form is invalid
      formvalid = false;
    }

  }
  console.log(formvalid);
  // cancel form submit if validation fails
  if (!formvalid) {
    if (event.preventDefault) event.preventDefault();
  }
  return formvalid;
}

// basic legacy validation checking
function LegacyValidation(field) {

  var
    valid = true,
    val = field.value,
    type = field.getAttribute("type"),
    chkbox = (type === "checkbox" || type === "radio"),
    required = field.getAttribute("required"),
    minlength = field.getAttribute("minlength"),
    maxlength = field.getAttribute("maxlength"),
    pattern = field.getAttribute("pattern");

  // disabled fields should not be validated
  if (field.disabled) return valid;

  // value required?
  valid = valid && (!required ||
    (chkbox && field.checked) ||
    (!chkbox && val !== "")
  );

  // minlength or maxlength set?
  valid = valid && (chkbox || (
    (!minlength || val.length >= minlength) &&
    (!maxlength || val.length <= maxlength)
  ));

  // test pattern
  if (valid && pattern) {
    pattern = new RegExp(pattern);
    valid = pattern.test(val);
  }
  return valid;
}

$(document)
  .ready(function () {
    $('.responsiveHeader')
      .css({ 'visibility': 'hidden', 'display': 'none' });
    $('section#contact.allsections')
      .css({ 'visibility': 'visible', 'display': 'block' });

    var mailObject = {};
    $('form')
      .submit(function () {
        $('form')
        event.preventDefault();
        mailObject = $('form')
          .serializeArray();
        console.log(mailObject)
        return mailObject;
      })

    $.post({
        url: "https://api.mailgun.net/v3/mg.perfectdaybreak.com",
        data: {
          key: "key-a0f4b7894ce6d4a9dd7eedc395e5b1df",
          from: 'info@artisanmemoirs.com',
          to: 'webeck@gmail.com',
          body: mailObject.guestMessage

        },
        crossDomain: true,
        success: function () {
          console.log('success');
        },
        beforeSend: function (xhr) {
          console.log('beforesend');
        }
      })
      .done(function (data) {
        console.log('dounzo!');

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBoaWRlTWFpbCgpIHtcbiAgY29uc29sZS5sb2coJ29iZnVzY2F0aW9uJyk7XG4gIHZhciB1ID0gXCJ1c2VyXCI7XG4gIHZhciBhcnIgPSBcIkBcIjtcbiAgdmFyIGQgPSBcImRvbWFpblwiO1xuICB2YXIgZG90ID0gXCIuXCI7XG4gIHZhciB0ID0gXCJ0bGRjY2NcIjtcbiAgLy8gZG9jdW1lbnQud3JpdGUoXCI8YSBocmVmPVwiICsgXCJtYWlsXCIgKyBcInRvOlwiICsgdSArIGFyciArIGQgKyBkb3QgKyB0ICtcbiAgLy8gICBcIj5cIiArIFwiRW1haWwgKGNvbmNhdGVuYXRpb24pXCIgKyBcIjwvYT5cIiArIFwiPGJyPlwiKTtcbn1cblxuJCgnLmZvb3RlclR4dC5jb2wtbWQtNC5jb2wtc20tMyBwJylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnZW1haWwnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9hcHAubWFpbGd1bi5jb20vYXBwL2RvbWFpbnMvc2FuZGJveDc4MGRjNDRjZTQ0YTQxZGE4YTQyNjZiODBmZjIwYjJlLm1haWxndW4ub3JnL21lc3NhZ2VzXCIsXG4gICAgICAgIG1ldGhvZDogUE9TVCxcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUubG9nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTYW1wbGUgb2YgZGF0YTpcIiwgZGF0YS5zbGljZSgwLCAxMDApKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xuXG4kKCd1bC5uYXYubmF2YmFyLW5hdiBsaSBhJylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbSA9ICQodGhpcylcbiAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgaWYgKG0gPT0gJyNtb3JldG9wJykge1xuICAgICAgdmFyIGRyb3Bkb3duQ2hvaWNlID0gJCh0aGlzKVxuICAgICAgICAuZmluZCgndWwgbGkgYScpXG4gICAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgICAkKCdzZWN0aW9uJyArIGRyb3Bkb3duQ2hvaWNlKVxuICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobSA9PSAnI3Byb2R1Y3QxJyB8fCBtID09ICcjcHJvZHVjdDInIHx8IG0gPT0gJyNwcm9kdWN0MycgfHwgbSA9PSAnI3Byb2R1Y3Q0Jykge1xuICAgICAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihtKTtcbiAgICB9IGVsc2UgaWYgKG0gPT0gJyNob21lJykge1xuICAgICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgICAkKCdzZWN0aW9uLmFsbHNlY3Rpb25zJylcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICAgJCgnZGl2LnBhZ2VCb2R5IGRpdi5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnZGlzcGxheSc6ICdibG9jaycgfSk7XG4gICAgICAkKCdodG1sLCBib2R5JylcbiAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24uYWxsc2VjdGlvbnMnKVxuICAgICAgICAubm90KG0pXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24nICsgbSArICcuYWxsc2VjdGlvbnMnKVxuICAgICAgICAuY3NzKHsgJ2Rpc3BsYXknOiAnYmxvY2snLCAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24nICsgbSArICcuYWxsc2VjdGlvbnMnKVxuICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiQoJy5uYXZiYXItYnJhbmQnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyB9KTtcbiAgICAkKCdzZWN0aW9uJylcbiAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAkKCdodG1sLCBib2R5JylcbiAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgIH0pO1xuICB9KTtcblxuJCgnLmNvbC14cy0zLmNvbC1tZC00JylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvZHVjdFRhcmdldCA9ICQodGhpcylcbiAgICAgIC5maW5kKCdhJylcbiAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihwcm9kdWN0VGFyZ2V0KTtcbiAgfSk7XG5cbiQoJy5wcm9kdWN0IC5zZWN0aW9uaGVhZGVyIGEnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJyNjb2xsYXBzZWRNZW51LmluJylcbiAgICAgIC5yZW1vdmVDbGFzcygnaW4nKTtcbiAgICBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKCQodGhpcylcbiAgICAgIC5hdHRyKCdocmVmJykpO1xuICB9KTtcblxuZnVuY3Rpb24gc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihzZWxlY3Rvcikge1xuICBjb25zb2xlLmxvZyhzZWxlY3Rvcik7XG4gICQoJy5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24uYWxsc2VjdGlvbnMnKVxuICAgIC5ub3Qoc2VsZWN0b3IpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uI3Byb2R1Y3RzLmFsbHNlY3Rpb25zJylcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdkaXNwbGF5JzogJ2Jsb2NrJyB9KTtcbiAgJCgnZGl2LnByb2R1Y3QnKVxuICAgIC5ub3Qoc2VsZWN0b3IpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAkKCdkaXYnICsgc2VsZWN0b3IgKyAnLnByb2R1Y3QnKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnYmxvY2snIH0pO1xuICAkKCcjcHJvZHVjdHMnKVxuICAgIC5hbmltYXRlKHtcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVxdWlyZShzY3JpcHQpIHtcbiAgJC5hamF4KHtcbiAgICB1cmw6ICdqc1NvY2lhbHMuanMnLFxuICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgIGFzeW5jOiBmYWxzZSwgLy8gPC0tIFRoaXMgaXMgdGhlIGtleVxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGFsbCBnICBvb2QuLi5cblxuICAgICAgJCgnI3NoYXJlUm91bmRJY29ucycpXG4gICAgICAgIC5qc1NvY2lhbHMoe1xuICAgICAgICAgIHNoYXJlczogWydlbWFpbCcsICd0d2l0dGVyJywgJ2ZhY2Vib29rJywgJ2xpbmtlZGluJywgJ21lc3NlbmdlciddLFxuICAgICAgICAgIHVybDogJ2h0dHA6Ly9hcnRpc2FubWVtb2lycy5jb20nLFxuICAgICAgICAgIHRleHQ6ICd0ZXh0IHRvIHNoYXJlJyxcbiAgICAgICAgICBzaG93TGFiZWw6IGZhbHNlLFxuICAgICAgICAgIHNob3dDb3VudDogZmFsc2UsXG4gICAgICAgICAgc2hhcmVJbjogJ3BvcHVwJyxcblxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGUpIHt9LFxuICAgICAgICAgICAgbW91c2VlbnRlcjogZnVuY3Rpb24gKGUpIHt9LFxuICAgICAgICAgICAgbW91c2VsZWF2ZTogZnVuY3Rpb24gKGUpIHt9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHNjcmlwdCBcIiArIHNjcmlwdCk7XG4gICAgfVxuICB9KTtcbn1cbiIsIi8vIENvZGUgZnJvbVxuLy8gaHR0cHM6Ly93d3cuc2l0ZXBvaW50LmNvbS9odG1sNS1mb3Jtcy1qYXZhc2NyaXB0LWNvbnN0cmFpbnQtdmFsaWRhdGlvbi1hcGkvXG52YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFjdFVzXCIpO1xuZm9ybS5ub1ZhbGlkYXRlID0gdHJ1ZTtcblxuLy8gc2V0IGhhbmRsZXIgdG8gdmFsaWRhdGUgdGhlIGZvcm1cbi8vIG9uc3VibWl0IHVzZWQgZm9yIGVhc2llciBjcm9zcy1icm93c2VyIGNvbXBhdGliaWxpdHlcbmZvcm0ub25zdWJtaXQgPSB2YWxpZGF0ZUZvcm07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRm9ybShldmVudCkge1xuXG4gIC8vIGZldGNoIGNyb3NzLWJyb3dzZXIgZXZlbnQgb2JqZWN0IGFuZCBmb3JtIG5vZGVcbiAgZXZlbnQgPSAoZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudCk7XG4gIHZhclxuICAgIGZvcm0gPSAoZXZlbnQudGFyZ2V0ID8gZXZlbnQudGFyZ2V0IDogZXZlbnQuc3JjRWxlbWVudCksXG4gICAgZiwgZmllbGQsIGZvcm12YWxpZCA9IHRydWU7XG5cbiAgLy8gbG9vcCBhbGwgZmllbGRzXG4gIGZvciAoZiA9IDA7IGYgPCBmb3JtLmVsZW1lbnRzOyBmKyspIHtcblxuICAgIC8vIGdldCBmaWVsZFxuICAgIGZpZWxkID0gZm9ybS5lbGVtZW50c1tmXTtcblxuICAgIC8vIGlnbm9yZSBidXR0b25zLCBmaWVsZHNldHMsIGV0Yy5cbiAgICBpZiAoZmllbGQubm9kZU5hbWUgIT09IFwiSU5QVVRcIiAmJiBmaWVsZC5ub2RlTmFtZSAhPT0gXCJURVhUQVJFQVwiICYmIGZpZWxkLm5vZGVOYW1lICE9PSBcIlNFTEVDVFwiKSBjb250aW51ZTtcblxuICAgIC8vIGlzIG5hdGl2ZSBicm93c2VyIHZhbGlkYXRpb24gYXZhaWxhYmxlP1xuICAgIGlmICh0eXBlb2YgZmllbGQud2lsbFZhbGlkYXRlICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cbiAgICAgIC8vIG5hdGl2ZSB2YWxpZGF0aW9uIGF2YWlsYWJsZVxuICAgICAgaWYgKGZpZWxkLm5vZGVOYW1lID09PSBcIklOUFVUXCIgJiYgZmllbGQudHlwZSAhPT0gZmllbGQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkge1xuXG4gICAgICAgIC8vIGlucHV0IHR5cGUgbm90IHN1cHBvcnRlZCEgVXNlIGxlZ2FjeSBKYXZhU2NyaXB0IHZhbGlkYXRpb25cbiAgICAgICAgZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoTGVnYWN5VmFsaWRhdGlvbihmaWVsZCkgPyBcIlwiIDogXCJlcnJvclwiKTtcblxuICAgICAgfVxuXG4gICAgICAvLyBuYXRpdmUgYnJvd3NlciBjaGVja1xuICAgICAgZmllbGQuY2hlY2tWYWxpZGl0eSgpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gbmF0aXZlIHZhbGlkYXRpb24gbm90IGF2YWlsYWJsZVxuICAgICAgZmllbGQudmFsaWRpdHkgPSBmaWVsZC52YWxpZGl0eSB8fCB7fTtcblxuICAgICAgLy8gc2V0IHRvIHJlc3VsdCBvZiB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gICAgICBmaWVsZC52YWxpZGl0eS52YWxpZCA9IExlZ2FjeVZhbGlkYXRpb24oZmllbGQpO1xuXG4gICAgICAvLyBpZiBcImludmFsaWRcIiBldmVudHMgYXJlIHJlcXVpcmVkLCB0cmlnZ2VyIGl0IGhlcmVcblxuICAgIH1cblxuICAgIGlmIChmaWVsZC52YWxpZGl0eS52YWxpZCkge1xuXG4gICAgICAvLyByZW1vdmUgZXJyb3Igc3R5bGVzIGFuZCBtZXNzYWdlc1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gc3R5bGUgZmllbGQsIHNob3cgZXJyb3IsIGV0Yy5cblxuICAgICAgLy8gZm9ybSBpcyBpbnZhbGlkXG4gICAgICBmb3JtdmFsaWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgfVxuICBjb25zb2xlLmxvZyhmb3JtdmFsaWQpO1xuICAvLyBjYW5jZWwgZm9ybSBzdWJtaXQgaWYgdmFsaWRhdGlvbiBmYWlsc1xuICBpZiAoIWZvcm12YWxpZCkge1xuICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICByZXR1cm4gZm9ybXZhbGlkO1xufVxuXG4vLyBiYXNpYyBsZWdhY3kgdmFsaWRhdGlvbiBjaGVja2luZ1xuZnVuY3Rpb24gTGVnYWN5VmFsaWRhdGlvbihmaWVsZCkge1xuXG4gIHZhclxuICAgIHZhbGlkID0gdHJ1ZSxcbiAgICB2YWwgPSBmaWVsZC52YWx1ZSxcbiAgICB0eXBlID0gZmllbGQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSxcbiAgICBjaGtib3ggPSAodHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IHR5cGUgPT09IFwicmFkaW9cIiksXG4gICAgcmVxdWlyZWQgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiKSxcbiAgICBtaW5sZW5ndGggPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJtaW5sZW5ndGhcIiksXG4gICAgbWF4bGVuZ3RoID0gZmllbGQuZ2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIpLFxuICAgIHBhdHRlcm4gPSBmaWVsZC5nZXRBdHRyaWJ1dGUoXCJwYXR0ZXJuXCIpO1xuXG4gIC8vIGRpc2FibGVkIGZpZWxkcyBzaG91bGQgbm90IGJlIHZhbGlkYXRlZFxuICBpZiAoZmllbGQuZGlzYWJsZWQpIHJldHVybiB2YWxpZDtcblxuICAvLyB2YWx1ZSByZXF1aXJlZD9cbiAgdmFsaWQgPSB2YWxpZCAmJiAoIXJlcXVpcmVkIHx8XG4gICAgKGNoa2JveCAmJiBmaWVsZC5jaGVja2VkKSB8fFxuICAgICghY2hrYm94ICYmIHZhbCAhPT0gXCJcIilcbiAgKTtcblxuICAvLyBtaW5sZW5ndGggb3IgbWF4bGVuZ3RoIHNldD9cbiAgdmFsaWQgPSB2YWxpZCAmJiAoY2hrYm94IHx8IChcbiAgICAoIW1pbmxlbmd0aCB8fCB2YWwubGVuZ3RoID49IG1pbmxlbmd0aCkgJiZcbiAgICAoIW1heGxlbmd0aCB8fCB2YWwubGVuZ3RoIDw9IG1heGxlbmd0aClcbiAgKSk7XG5cbiAgLy8gdGVzdCBwYXR0ZXJuXG4gIGlmICh2YWxpZCAmJiBwYXR0ZXJuKSB7XG4gICAgcGF0dGVybiA9IG5ldyBSZWdFeHAocGF0dGVybik7XG4gICAgdmFsaWQgPSBwYXR0ZXJuLnRlc3QodmFsKTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbiQoZG9jdW1lbnQpXG4gIC5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICQoJ3NlY3Rpb24jY29udGFjdC5hbGxzZWN0aW9ucycpXG4gICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdkaXNwbGF5JzogJ2Jsb2NrJyB9KTtcblxuICAgIHZhciBtYWlsT2JqZWN0ID0ge307XG4gICAgJCgnZm9ybScpXG4gICAgICAuc3VibWl0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnZm9ybScpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG1haWxPYmplY3QgPSAkKCdmb3JtJylcbiAgICAgICAgICAuc2VyaWFsaXplQXJyYXkoKTtcbiAgICAgICAgY29uc29sZS5sb2cobWFpbE9iamVjdClcbiAgICAgICAgcmV0dXJuIG1haWxPYmplY3Q7XG4gICAgICB9KVxuXG4gICAgJC5wb3N0KHtcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vYXBpLm1haWxndW4ubmV0L3YzL21nLnBlcmZlY3RkYXlicmVhay5jb21cIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGtleTogXCJrZXktYTBmNGI3ODk0Y2U2ZDRhOWRkN2VlZGMzOTVlNWIxZGZcIixcbiAgICAgICAgICBmcm9tOiAnaW5mb0BhcnRpc2FubWVtb2lycy5jb20nLFxuICAgICAgICAgIHRvOiAnd2ViZWNrQGdtYWlsLmNvbScsXG4gICAgICAgICAgYm9keTogbWFpbE9iamVjdC5ndWVzdE1lc3NhZ2VcblxuICAgICAgICB9LFxuICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnYmVmb3Jlc2VuZCcpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RvdW56byEnKTtcblxuICAgICAgfSk7XG4gIH0pO1xuIiwiLyohIGpzc29jaWFscyAtIHYxLjQuMCAtIDIwMTYtMTAtMTBcbiAqIGh0dHA6Ly9qcy1zb2NpYWxzLmNvbVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEFydGVtIFRhYmFsaW47IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24gKHdpbmRvdywgJCwgdW5kZWZpbmVkKSB7XG5cbiAgdmFyIEpTU09DSUFMUyA9IFwiSlNTb2NpYWxzXCIsXG4gICAgSlNTT0NJQUxTX0RBVEFfS0VZID0gSlNTT0NJQUxTO1xuXG4gIHZhciBnZXRPckFwcGx5ID0gZnVuY3Rpb24gKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgaWYgKCQuaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5hcHBseShjb250ZXh0LCAkLm1ha2VBcnJheShhcmd1bWVudHMpXG4gICAgICAgIC5zbGljZSgyKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICB2YXIgSU1HX1NSQ19SRUdFWCA9IC8oXFwuKGpwZWd8cG5nfGdpZnxibXB8c3ZnKSR8XmRhdGE6aW1hZ2VcXC8oanBlZ3xwbmd8Z2lmfGJtcHxzdmdcXCt4bWwpO2Jhc2U2NCkvaTtcbiAgdmFyIFVSTF9QQVJBTVNfUkVHRVggPSAvKCY/W2EtekEtWjAtOV0rPSk/XFx7KFthLXpBLVowLTldKylcXH0vZztcblxuICB2YXIgTUVBU1VSRVMgPSB7XG4gICAgXCJHXCI6IDEwMDAwMDAwMDAsXG4gICAgXCJNXCI6IDEwMDAwMDAsXG4gICAgXCJLXCI6IDEwMDBcbiAgfTtcblxuICB2YXIgc2hhcmVzID0ge307XG5cbiAgZnVuY3Rpb24gU29jaWFscyhlbGVtZW50LCBjb25maWcpIHtcbiAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuXG4gICAgJGVsZW1lbnQuZGF0YShKU1NPQ0lBTFNfREFUQV9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5fJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgIHRoaXMuc2hhcmVzID0gW107XG5cbiAgICB0aGlzLl9pbml0KGNvbmZpZyk7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBTb2NpYWxzLnByb3RvdHlwZSA9IHtcbiAgICB1cmw6IFwiXCIsXG4gICAgdGV4dDogXCJcIixcbiAgICBzaGFyZUluOiBcImJsYW5rXCIsXG5cbiAgICBzaG93TGFiZWw6IGZ1bmN0aW9uIChzY3JlZW5XaWR0aCkge1xuICAgICAgcmV0dXJuICh0aGlzLnNob3dDb3VudCA9PT0gZmFsc2UpID9cbiAgICAgICAgKHNjcmVlbldpZHRoID4gdGhpcy5zbWFsbFNjcmVlbldpZHRoKSA6XG4gICAgICAgIChzY3JlZW5XaWR0aCA+PSB0aGlzLmxhcmdlU2NyZWVuV2lkdGgpO1xuICAgIH0sXG5cbiAgICBzaG93Q291bnQ6IGZ1bmN0aW9uIChzY3JlZW5XaWR0aCkge1xuICAgICAgcmV0dXJuIChzY3JlZW5XaWR0aCA8PSB0aGlzLnNtYWxsU2NyZWVuV2lkdGgpID8gXCJpbnNpZGVcIiA6IHRydWU7XG4gICAgfSxcblxuICAgIHNtYWxsU2NyZWVuV2lkdGg6IDY0MCxcbiAgICBsYXJnZVNjcmVlbldpZHRoOiAxMDI0LFxuXG4gICAgcmVzaXplVGltZW91dDogMjAwLFxuXG4gICAgZWxlbWVudENsYXNzOiBcImpzc29jaWFsc1wiLFxuICAgIHNoYXJlc0NsYXNzOiBcImpzc29jaWFscy1zaGFyZXNcIixcbiAgICBzaGFyZUNsYXNzOiBcImpzc29jaWFscy1zaGFyZVwiLFxuICAgIHNoYXJlQnV0dG9uQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWJ1dHRvblwiLFxuICAgIHNoYXJlTGlua0NsYXNzOiBcImpzc29jaWFscy1zaGFyZS1saW5rXCIsXG4gICAgc2hhcmVMb2dvQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWxvZ29cIixcbiAgICBzaGFyZUxhYmVsQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWxhYmVsXCIsXG4gICAgc2hhcmVMaW5rQ291bnRDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbGluay1jb3VudFwiLFxuICAgIHNoYXJlQ291bnRCb3hDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtY291bnQtYm94XCIsXG4gICAgc2hhcmVDb3VudENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1jb3VudFwiLFxuICAgIHNoYXJlWmVyb0NvdW50Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLW5vLWNvdW50XCIsXG5cbiAgICBfaW5pdDogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgdGhpcy5faW5pdERlZmF1bHRzKCk7XG4gICAgICAkLmV4dGVuZCh0aGlzLCBjb25maWcpO1xuICAgICAgdGhpcy5faW5pdFNoYXJlcygpO1xuICAgICAgdGhpcy5fYXR0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgX2luaXREZWZhdWx0czogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgIHRoaXMudGV4dCA9ICQudHJpbSgkKFwibWV0YVtuYW1lPWRlc2NyaXB0aW9uXVwiKVxuICAgICAgICAuYXR0cihcImNvbnRlbnRcIikgfHwgJChcInRpdGxlXCIpXG4gICAgICAgIC50ZXh0KCkpO1xuICAgIH0sXG5cbiAgICBfaW5pdFNoYXJlczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zaGFyZXMgPSAkLm1hcCh0aGlzLnNoYXJlcywgJC5wcm94eShmdW5jdGlvbiAoc2hhcmVDb25maWcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzaGFyZUNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHNoYXJlQ29uZmlnID0geyBzaGFyZTogc2hhcmVDb25maWcgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaGFyZSA9IChzaGFyZUNvbmZpZy5zaGFyZSAmJiBzaGFyZXNbc2hhcmVDb25maWcuc2hhcmVdKTtcblxuICAgICAgICBpZiAoIXNoYXJlICYmICFzaGFyZUNvbmZpZy5yZW5kZXJlcikge1xuICAgICAgICAgIHRocm93IEVycm9yKFwiU2hhcmUgJ1wiICsgc2hhcmVDb25maWcuc2hhcmUgKyBcIicgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHsgdXJsOiB0aGlzLnVybCwgdGV4dDogdGhpcy50ZXh0IH0sIHNoYXJlLCBzaGFyZUNvbmZpZyk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9hdHRhY2hXaW5kb3dSZXNpemVDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgJCh3aW5kb3cpXG4gICAgICAgIC5vbihcInJlc2l6ZVwiLCAkLnByb3h5KHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIsIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkKHdpbmRvdylcbiAgICAgICAgLm9mZihcInJlc2l6ZVwiLCB0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgX3dpbmRvd1Jlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkLmlzRnVuY3Rpb24odGhpcy5zaG93TGFiZWwpIHx8ICQuaXNGdW5jdGlvbih0aGlzLnNob3dDb3VudCkpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lcik7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgkLnByb3h5KHRoaXMucmVmcmVzaCwgdGhpcyksIHRoaXMucmVzaXplVGltZW91dCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIF9yZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgIHRoaXMuX2RlZmluZU9wdGlvbnNCeVNjcmVlbigpO1xuXG4gICAgICB0aGlzLl8kZWxlbWVudC5hZGRDbGFzcyh0aGlzLmVsZW1lbnRDbGFzcyk7XG5cbiAgICAgIHRoaXMuXyRzaGFyZXMgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVzQ2xhc3MpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLl8kZWxlbWVudCk7XG5cbiAgICAgIHRoaXMuX3JlbmRlclNoYXJlcygpO1xuICAgIH0sXG5cbiAgICBfZGVmaW5lT3B0aW9uc0J5U2NyZWVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9zY3JlZW5XaWR0aCA9ICQod2luZG93KVxuICAgICAgICAud2lkdGgoKTtcbiAgICAgIHRoaXMuX3Nob3dMYWJlbCA9IGdldE9yQXBwbHkodGhpcy5zaG93TGFiZWwsIHRoaXMsIHRoaXMuX3NjcmVlbldpZHRoKTtcbiAgICAgIHRoaXMuX3Nob3dDb3VudCA9IGdldE9yQXBwbHkodGhpcy5zaG93Q291bnQsIHRoaXMsIHRoaXMuX3NjcmVlbldpZHRoKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlczogZnVuY3Rpb24gKCkge1xuICAgICAgJC5lYWNoKHRoaXMuc2hhcmVzLCAkLnByb3h5KGZ1bmN0aW9uIChfLCBzaGFyZSkge1xuICAgICAgICB0aGlzLl9yZW5kZXJTaGFyZShzaGFyZSk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZTogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgJHNoYXJlO1xuXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNoYXJlLnJlbmRlcmVyKSkge1xuICAgICAgICAkc2hhcmUgPSAkKHNoYXJlLnJlbmRlcmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNoYXJlID0gdGhpcy5fY3JlYXRlU2hhcmUoc2hhcmUpO1xuICAgICAgfVxuXG4gICAgICAkc2hhcmUuYWRkQ2xhc3ModGhpcy5zaGFyZUNsYXNzKVxuICAgICAgICAuYWRkQ2xhc3Moc2hhcmUuc2hhcmUgPyBcImpzc29jaWFscy1zaGFyZS1cIiArIHNoYXJlLnNoYXJlIDogXCJcIilcbiAgICAgICAgLmFkZENsYXNzKHNoYXJlLmNzcylcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuXyRzaGFyZXMpO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmU6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyICRyZXN1bHQgPSAkKFwiPGRpdj5cIik7XG4gICAgICB2YXIgJHNoYXJlTGluayA9IHRoaXMuX2NyZWF0ZVNoYXJlTGluayhzaGFyZSlcbiAgICAgICAgLmFwcGVuZFRvKCRyZXN1bHQpO1xuXG4gICAgICBpZiAodGhpcy5fc2hvd0NvdW50KSB7XG4gICAgICAgIHZhciBpc0luc2lkZUNvdW50ID0gKHRoaXMuX3Nob3dDb3VudCA9PT0gXCJpbnNpZGVcIik7XG4gICAgICAgIHZhciAkY291bnRDb250YWluZXIgPSBpc0luc2lkZUNvdW50ID8gJHNoYXJlTGluayA6ICQoXCI8ZGl2PlwiKVxuICAgICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlQ291bnRCb3hDbGFzcylcbiAgICAgICAgICAuYXBwZW5kVG8oJHJlc3VsdCk7XG4gICAgICAgICRjb3VudENvbnRhaW5lci5hZGRDbGFzcyhpc0luc2lkZUNvdW50ID8gdGhpcy5zaGFyZUxpbmtDb3VudENsYXNzIDogdGhpcy5zaGFyZUNvdW50Qm94Q2xhc3MpO1xuICAgICAgICB0aGlzLl9yZW5kZXJTaGFyZUNvdW50KHNoYXJlLCAkY291bnRDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTGluazogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgc2hhcmVTdHJhdGVneSA9IHRoaXMuX2dldFNoYXJlU3RyYXRlZ3koc2hhcmUpO1xuXG4gICAgICB2YXIgJHJlc3VsdCA9IHNoYXJlU3RyYXRlZ3kuY2FsbChzaGFyZSwge1xuICAgICAgICBzaGFyZVVybDogdGhpcy5fZ2V0U2hhcmVVcmwoc2hhcmUpXG4gICAgICB9KTtcblxuICAgICAgJHJlc3VsdC5hZGRDbGFzcyh0aGlzLnNoYXJlTGlua0NsYXNzKVxuICAgICAgICAuYXBwZW5kKHRoaXMuX2NyZWF0ZVNoYXJlTG9nbyhzaGFyZSkpO1xuXG4gICAgICBpZiAodGhpcy5fc2hvd0xhYmVsKSB7XG4gICAgICAgICRyZXN1bHQuYXBwZW5kKHRoaXMuX2NyZWF0ZVNoYXJlTGFiZWwoc2hhcmUpKTtcbiAgICAgIH1cblxuICAgICAgJC5lYWNoKHRoaXMub24gfHwge30sIGZ1bmN0aW9uIChldmVudCwgaGFuZGxlcikge1xuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgICAgICAgJHJlc3VsdC5vbihldmVudCwgJC5wcm94eShoYW5kbGVyLCBzaGFyZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfSxcblxuICAgIF9nZXRTaGFyZVN0cmF0ZWd5OiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBzaGFyZVN0cmF0ZWdpZXNbc2hhcmUuc2hhcmVJbiB8fCB0aGlzLnNoYXJlSW5dO1xuXG4gICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJTaGFyZSBzdHJhdGVneSAnXCIgKyB0aGlzLnNoYXJlSW4gKyBcIicgbm90IGZvdW5kXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfZ2V0U2hhcmVVcmw6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIHNoYXJlVXJsID0gZ2V0T3JBcHBseShzaGFyZS5zaGFyZVVybCwgc2hhcmUpO1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdFNoYXJlVXJsKHNoYXJlVXJsLCBzaGFyZSk7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZUxvZ286IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIGxvZ28gPSBzaGFyZS5sb2dvO1xuXG4gICAgICB2YXIgJHJlc3VsdCA9IElNR19TUkNfUkVHRVgudGVzdChsb2dvKSA/XG4gICAgICAgICQoXCI8aW1nPlwiKVxuICAgICAgICAuYXR0cihcInNyY1wiLCBzaGFyZS5sb2dvKSA6XG4gICAgICAgICQoXCI8aT5cIilcbiAgICAgICAgLmFkZENsYXNzKGxvZ28pO1xuXG4gICAgICAkcmVzdWx0LmFkZENsYXNzKHRoaXMuc2hhcmVMb2dvQ2xhc3MpO1xuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTGFiZWw6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgcmV0dXJuICQoXCI8c3Bhbj5cIilcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVMYWJlbENsYXNzKVxuICAgICAgICAudGV4dChzaGFyZS5sYWJlbCk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZUNvdW50OiBmdW5jdGlvbiAoc2hhcmUsICRjb250YWluZXIpIHtcbiAgICAgIHZhciAkY291bnQgPSAkKFwiPHNwYW4+XCIpXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlQ291bnRDbGFzcyk7XG5cbiAgICAgICRjb250YWluZXIuYWRkQ2xhc3ModGhpcy5zaGFyZVplcm9Db3VudENsYXNzKVxuICAgICAgICAuYXBwZW5kKCRjb3VudCk7XG5cbiAgICAgIHRoaXMuX2xvYWRDb3VudChzaGFyZSlcbiAgICAgICAgLmRvbmUoJC5wcm94eShmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlQ2xhc3ModGhpcy5zaGFyZVplcm9Db3VudENsYXNzKTtcbiAgICAgICAgICAgICRjb3VudC50ZXh0KGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2xvYWRDb3VudDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICB2YXIgY291bnRVcmwgPSB0aGlzLl9nZXRDb3VudFVybChzaGFyZSk7XG5cbiAgICAgIGlmICghY291bnRVcmwpIHtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoMClcbiAgICAgICAgICAucHJvbWlzZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGFuZGxlU3VjY2VzcyA9ICQucHJveHkoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5fZ2V0Q291bnRWYWx1ZShyZXNwb25zZSwgc2hhcmUpKTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAkLmdldEpTT04oY291bnRVcmwpXG4gICAgICAgIC5kb25lKGhhbmRsZVN1Y2Nlc3MpXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkLmdldChjb3VudFVybClcbiAgICAgICAgICAgIC5kb25lKGhhbmRsZVN1Y2Nlc3MpXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIF9nZXRDb3VudFVybDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgY291bnRVcmwgPSBnZXRPckFwcGx5KHNoYXJlLmNvdW50VXJsLCBzaGFyZSk7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybWF0U2hhcmVVcmwoY291bnRVcmwsIHNoYXJlKTtcbiAgICB9LFxuXG4gICAgX2dldENvdW50VmFsdWU6IGZ1bmN0aW9uIChyZXNwb25zZSwgc2hhcmUpIHtcbiAgICAgIHZhciBjb3VudCA9ICgkLmlzRnVuY3Rpb24oc2hhcmUuZ2V0Q291bnQpID8gc2hhcmUuZ2V0Q291bnQocmVzcG9uc2UpIDogcmVzcG9uc2UpIHx8IDA7XG4gICAgICByZXR1cm4gKHR5cGVvZiBjb3VudCA9PT0gXCJzdHJpbmdcIikgPyBjb3VudCA6IHRoaXMuX2Zvcm1hdE51bWJlcihjb3VudCk7XG4gICAgfSxcblxuICAgIF9mb3JtYXROdW1iZXI6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICQuZWFjaChNRUFTVVJFUywgZnVuY3Rpb24gKGxldHRlciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG51bWJlciA+PSB2YWx1ZSkge1xuICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoKG51bWJlciAvIHZhbHVlKVxuICAgICAgICAgICAgLnRvRml4ZWQoMikpICsgbGV0dGVyO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBudW1iZXI7XG4gICAgfSxcblxuICAgIF9mb3JtYXRTaGFyZVVybDogZnVuY3Rpb24gKHVybCwgc2hhcmUpIHtcbiAgICAgIHJldHVybiB1cmwucmVwbGFjZShVUkxfUEFSQU1TX1JFR0VYLCBmdW5jdGlvbiAobWF0Y2gsIGtleSwgZmllbGQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc2hhcmVbZmllbGRdIHx8IFwiXCI7XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IChrZXkgfHwgXCJcIikgKyB3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IFwiXCI7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2NsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVyKTtcbiAgICAgIHRoaXMuXyRlbGVtZW50LmVtcHR5KCk7XG4gICAgfSxcblxuICAgIF9wYXNzT3B0aW9uVG9TaGFyZXM6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgc2hhcmVzID0gdGhpcy5zaGFyZXM7XG5cbiAgICAgICQuZWFjaChbXCJ1cmxcIiwgXCJ0ZXh0XCJdLCBmdW5jdGlvbiAoXywgb3B0aW9uTmFtZSkge1xuICAgICAgICBpZiAob3B0aW9uTmFtZSAhPT0ga2V5KVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAkLmVhY2goc2hhcmVzLCBmdW5jdGlvbiAoXywgc2hhcmUpIHtcbiAgICAgICAgICBzaGFyZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9ub3JtYWxpemVTaGFyZTogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICBpZiAoJC5pc051bWVyaWMoc2hhcmUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlc1tzaGFyZV07XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2hhcmUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuICQuZ3JlcCh0aGlzLnNoYXJlcywgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy5zaGFyZSA9PT0gc2hhcmU7XG4gICAgICAgIH0pWzBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2hhcmU7XG4gICAgfSxcblxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH0sXG5cbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgdGhpcy5fZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcblxuICAgICAgdGhpcy5fJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudENsYXNzKVxuICAgICAgICAucmVtb3ZlRGF0YShKU1NPQ0lBTFNfREFUQV9LRVkpO1xuICAgIH0sXG5cbiAgICBvcHRpb246IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgICAgfVxuXG4gICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcblxuICAgICAgdGhpcy5fcGFzc09wdGlvblRvU2hhcmVzKGtleSwgdmFsdWUpO1xuXG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9LFxuXG4gICAgc2hhcmVPcHRpb246IGZ1bmN0aW9uIChzaGFyZSwga2V5LCB2YWx1ZSkge1xuICAgICAgc2hhcmUgPSB0aGlzLl9ub3JtYWxpemVTaGFyZShzaGFyZSk7XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJldHVybiBzaGFyZVtrZXldO1xuICAgICAgfVxuXG4gICAgICBzaGFyZVtrZXldID0gdmFsdWU7XG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gIH07XG5cbiAgJC5mbi5qc1NvY2lhbHMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgdmFyIGFyZ3MgPSAkLm1ha2VBcnJheShhcmd1bWVudHMpLFxuICAgICAgbWV0aG9kQXJncyA9IGFyZ3Muc2xpY2UoMSksXG4gICAgICByZXN1bHQgPSB0aGlzO1xuXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgIGluc3RhbmNlID0gJGVsZW1lbnQuZGF0YShKU1NPQ0lBTFNfREFUQV9LRVkpLFxuICAgICAgICBtZXRob2RSZXN1bHQ7XG5cbiAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIG1ldGhvZFJlc3VsdCA9IGluc3RhbmNlW2NvbmZpZ10uYXBwbHkoaW5zdGFuY2UsIG1ldGhvZEFyZ3MpO1xuICAgICAgICAgIGlmIChtZXRob2RSZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBtZXRob2RSZXN1bHQgIT09IGluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBtZXRob2RSZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3RhbmNlLl9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuICAgICAgICAgIGluc3RhbmNlLl9pbml0KGNvbmZpZyk7XG4gICAgICAgICAgaW5zdGFuY2UuX3JlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgU29jaWFscygkZWxlbWVudCwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIHNldERlZmF1bHRzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHZhciBjb21wb25lbnQ7XG5cbiAgICBpZiAoJC5pc1BsYWluT2JqZWN0KGNvbmZpZykpIHtcbiAgICAgIGNvbXBvbmVudCA9IFNvY2lhbHMucHJvdG90eXBlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnQgPSBzaGFyZXNbY29uZmlnXTtcbiAgICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICB9XG5cbiAgICAkLmV4dGVuZChjb21wb25lbnQsIGNvbmZpZyk7XG4gIH07XG5cbiAgdmFyIHNoYXJlU3RyYXRlZ2llcyA9IHtcbiAgICBwb3B1cDogZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKFwiPGE+XCIpXG4gICAgICAgIC5hdHRyKFwiaHJlZlwiLCBcIiNcIilcbiAgICAgICAgLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdpbmRvdy5vcGVuKGFyZ3Muc2hhcmVVcmwsIG51bGwsIFwid2lkdGg9NjAwLCBoZWlnaHQ9NDAwLCBsb2NhdGlvbj0wLCBtZW51YmFyPTAsIHJlc2l6ZWFibGU9MCwgc2Nyb2xsYmFycz0wLCBzdGF0dXM9MCwgdGl0bGViYXI9MCwgdG9vbGJhcj0wXCIpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJsYW5rOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgcmV0dXJuICQoXCI8YT5cIilcbiAgICAgICAgLmF0dHIoeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IGFyZ3Muc2hhcmVVcmwgfSk7XG4gICAgfSxcblxuICAgIHNlbGY6IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICByZXR1cm4gJChcIjxhPlwiKVxuICAgICAgICAuYXR0cih7IHRhcmdldDogXCJfc2VsZlwiLCBocmVmOiBhcmdzLnNoYXJlVXJsIH0pO1xuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuanNTb2NpYWxzID0ge1xuICAgIFNvY2lhbHM6IFNvY2lhbHMsXG4gICAgc2hhcmVzOiBzaGFyZXMsXG4gICAgc2hhcmVTdHJhdGVnaWVzOiBzaGFyZVN0cmF0ZWdpZXMsXG4gICAgc2V0RGVmYXVsdHM6IHNldERlZmF1bHRzXG4gIH07XG5cbn0od2luZG93LCBqUXVlcnkpKTtcblxuKGZ1bmN0aW9uICh3aW5kb3csICQsIGpzU29jaWFscywgdW5kZWZpbmVkKSB7XG5cbiAgJC5leHRlbmQoanNTb2NpYWxzLnNoYXJlcywge1xuXG4gICAgZW1haWw6IHtcbiAgICAgIGxhYmVsOiBcIkUtbWFpbFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1hdFwiLFxuICAgICAgc2hhcmVVcmw6IFwibWFpbHRvOnt0b30/c3ViamVjdD17dGV4dH0mYm9keT17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgIH0sXG5cbiAgICB0d2l0dGVyOiB7XG4gICAgICBsYWJlbDogXCJUd2VldFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS10d2l0dGVyXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlP3VybD17dXJsfSZ0ZXh0PXt0ZXh0fSZ2aWE9e3ZpYX0maGFzaHRhZ3M9e2hhc2h0YWdzfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCJcbiAgICB9LFxuXG4gICAgZmFjZWJvb2s6IHtcbiAgICAgIGxhYmVsOiBcIkxpa2VcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtZmFjZWJvb2tcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLz9pZD17dXJsfVwiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLnNoYXJlICYmIGRhdGEuc2hhcmUuc2hhcmVfY291bnQgfHwgMDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdmtvbnRha3RlOiB7XG4gICAgICBsYWJlbDogXCJMaWtlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXZrXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3ZrLmNvbS9zaGFyZS5waHA/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX0mZGVzY3JpcHRpb249e3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL3ZrLmNvbS9zaGFyZS5waHA/YWN0PWNvdW50JmluZGV4PTEmdXJsPXt1cmx9XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRhdGEuc2xpY2UoMTUsIC0yKVxuICAgICAgICAgIC5zcGxpdCgnLCAnKVsxXSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdvb2dsZXBsdXM6IHtcbiAgICAgIGxhYmVsOiBcIisxXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWdvb2dsZVwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICBsaW5rZWRpbjoge1xuICAgICAgbGFiZWw6IFwiU2hhcmVcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtbGlua2VkaW5cIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvdW50c2Vydi9jb3VudC9zaGFyZT9mb3JtYXQ9anNvbnAmdXJsPXt1cmx9JmNhbGxiYWNrPT9cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5jb3VudDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcGludGVyZXN0OiB7XG4gICAgICBsYWJlbDogXCJQaW4gaXRcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtcGludGVyZXN0XCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9ib29rbWFya2xldC8/bWVkaWE9e21lZGlhfSZ1cmw9e3VybH0mZGVzY3JpcHRpb249e3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL2FwaS5waW50ZXJlc3QuY29tL3YxL3VybHMvY291bnQuanNvbj8mdXJsPXt1cmx9JmNhbGxiYWNrPT9cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5jb3VudDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3R1bWJsZXVwb246IHtcbiAgICAgIGxhYmVsOiBcIlNoYXJlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXN0dW1ibGV1cG9uXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwOi8vd3d3LnN0dW1ibGV1cG9uLmNvbS9zdWJtaXQ/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vd3d3LnN0dW1ibGV1cG9uLmNvbS9zZXJ2aWNlcy8xLjAxL2JhZGdlLmdldGluZm8/dXJsPXt1cmx9XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEucmVzdWx0LnZpZXdzO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZWxlZ3JhbToge1xuICAgICAgbGFiZWw6IFwiVGVsZWdyYW1cIixcbiAgICAgIGxvZ286IFwiZmEgZmEtcGFwZXItcGxhbmVcIixcbiAgICAgIHNoYXJlVXJsOiBcInRnOi8vbXNnP3RleHQ9e3VybH0ge3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIHdoYXRzYXBwOiB7XG4gICAgICBsYWJlbDogXCJXaGF0c0FwcFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS13aGF0c2FwcFwiLFxuICAgICAgc2hhcmVVcmw6IFwid2hhdHNhcHA6Ly9zZW5kP3RleHQ9e3VybH0ge3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIGxpbmU6IHtcbiAgICAgIGxhYmVsOiBcIkxJTkVcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtY29tbWVudFwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cDovL2xpbmUubWUvUi9tc2cvdGV4dC8/e3RleHR9IHt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICB2aWJlcjoge1xuICAgICAgbGFiZWw6IFwiVmliZXJcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtdm9sdW1lLWNvbnRyb2wtcGhvbmVcIixcbiAgICAgIHNoYXJlVXJsOiBcInZpYmVyOi8vZm9yd2FyZD90ZXh0PXt1cmx9IHt0ZXh0fVwiLFxuICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgIH0sXG5cbiAgICBwb2NrZXQ6IHtcbiAgICAgIGxhYmVsOiBcIlBvY2tldFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1nZXQtcG9ja2V0XCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL2dldHBvY2tldC5jb20vc2F2ZT91cmw9e3VybH0mdGl0bGU9e3RpdGxlfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCJcbiAgICB9LFxuXG4gICAgbWVzc2VuZ2VyOiB7XG4gICAgICBsYWJlbDogXCJTaGFyZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1jb21tZW50aW5nXCIsXG4gICAgICBzaGFyZVVybDogXCJmYi1tZXNzZW5nZXI6Ly9zaGFyZT9saW5rPXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfVxuXG4gIH0pO1xuXG59KHdpbmRvdywgalF1ZXJ5LCB3aW5kb3cuanNTb2NpYWxzKSk7XG4iXX0=
