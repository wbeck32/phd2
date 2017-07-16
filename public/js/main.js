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
var form = document.getElementById('contactUs');
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
    if (field.nodeName !== 'INPUT' && field.nodeName !== 'TEXTAREA' && field.nodeName !== 'SELECT') continue;

    // is native browser validation available?
    if (typeof field.willValidate !== 'undefined') {

      // native validation available
      if (field.nodeName === 'INPUT' && field.type !== field.getAttribute('type')) {

        // input type not supported! Use legacy JavaScript validation
        field.setCustomValidity(LegacyValidation(field) ? '' : 'error');

      }

      // native browser check
      field.checkValidity();

    } else {

      // native validation not available
      field.validity = field.validity || {};

      // set to result of validation function
      field.validity.valid = LegacyValidation(field);

      // if 'invalid' events are required, trigger it here

    }

    if (field.validity.valid) {

      // remove error styles and messages

    } else {

      // style field, show error, etc.

      // form is invalid
      formvalid = false;
    }

  }
  // console.log(formvalid);
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
    type = field.getAttribute('type'),
    chkbox = (type === 'checkbox' || type === 'radio'),
    required = field.getAttribute('required'),
    minlength = field.getAttribute('minlength'),
    maxlength = field.getAttribute('maxlength'),
    pattern = field.getAttribute('pattern');

  // disabled fields should not be validated
  if (field.disabled) return valid;

  // value required?
  valid = valid && (!required ||
    (chkbox && field.checked) ||
    (!chkbox && val !== '')
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

    $('form')
      .on('submit', function (event) {
        var mailObject = {};

        $('form')
        event.preventDefault();
        mailObject = $('form')
          .serializeArray();
        $.post({
            url: 'https://api.mailgun.net/v3/mg.perfectdaybreak.com/messages',
            crossDomain: true,
            username: '',
            password: '',
            xhrFields: {
              withCredentials: true
            },
            data: {
              key: 'pubkey-228b87725d50c61dd024e21fb2f5758d',
              from: 'info@artisanmemoirs.com',
              to: 'webeck@gmail.com',
              text: mailObject
            }
          })
          .done(function (data) {
            console.log('done: ', data);
          })
          .fail(function (err) {
            console.log('error: ', err);
          })
          .always(function () {
            console.log('finished');
          });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGhpZGVNYWlsKCkge1xuICBjb25zb2xlLmxvZygnb2JmdXNjYXRpb24nKTtcbiAgdmFyIHUgPSBcInVzZXJcIjtcbiAgdmFyIGFyciA9IFwiQFwiO1xuICB2YXIgZCA9IFwiZG9tYWluXCI7XG4gIHZhciBkb3QgPSBcIi5cIjtcbiAgdmFyIHQgPSBcInRsZGNjY1wiO1xuICAvLyBkb2N1bWVudC53cml0ZShcIjxhIGhyZWY9XCIgKyBcIm1haWxcIiArIFwidG86XCIgKyB1ICsgYXJyICsgZCArIGRvdCArIHQgK1xuICAvLyAgIFwiPlwiICsgXCJFbWFpbCAoY29uY2F0ZW5hdGlvbilcIiArIFwiPC9hPlwiICsgXCI8YnI+XCIpO1xufVxuXG4kKCcuZm9vdGVyVHh0LmNvbC1tZC00LmNvbC1zbS0zIHAnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCdlbWFpbCcpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwczovL2FwcC5tYWlsZ3VuLmNvbS9hcHAvZG9tYWlucy9zYW5kYm94NzgwZGM0NGNlNDRhNDFkYThhNDI2NmI4MGZmMjBiMmUubWFpbGd1bi5vcmcvbWVzc2FnZXNcIixcbiAgICAgICAgbWV0aG9kOiBQT1NULFxuICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5sb2cpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhbXBsZSBvZiBkYXRhOlwiLCBkYXRhLnNsaWNlKDAsIDEwMCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSk7XG5cbiQoJ3VsLm5hdi5uYXZiYXItbmF2IGxpIGEnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHZhciBtID0gJCh0aGlzKVxuICAgICAgLmF0dHIoJ2hyZWYnKTtcbiAgICBpZiAobSA9PSAnI21vcmV0b3AnKSB7XG4gICAgICB2YXIgZHJvcGRvd25DaG9pY2UgPSAkKHRoaXMpXG4gICAgICAgIC5maW5kKCd1bCBsaSBhJylcbiAgICAgICAgLmF0dHIoJ2hyZWYnKTtcbiAgICAgICQoJ3NlY3Rpb24nICsgZHJvcGRvd25DaG9pY2UpXG4gICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSwgJ3Nsb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChtID09ICcjcHJvZHVjdDEnIHx8IG0gPT0gJyNwcm9kdWN0MicgfHwgbSA9PSAnI3Byb2R1Y3QzJyB8fCBtID09ICcjcHJvZHVjdDQnKSB7XG4gICAgICBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKG0pO1xuICAgIH0gZWxzZSBpZiAobSA9PSAnI2hvbWUnKSB7XG4gICAgICAkKCcjY29sbGFwc2VkTWVudS5pbicpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnaW4nKTtcbiAgICAgICQoJ3NlY3Rpb24uYWxsc2VjdGlvbnMnKVxuICAgICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICAgICAkKCdkaXYucGFnZUJvZHkgZGl2LnJlc3BvbnNpdmVIZWFkZXInKVxuICAgICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdkaXNwbGF5JzogJ2Jsb2NrJyB9KTtcbiAgICAgICQoJ2h0bWwsIGJvZHknKVxuICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAkKCcjY29sbGFwc2VkTWVudS5pbicpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnaW4nKTtcbiAgICAgICQoJy5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICAgJCgnc2VjdGlvbi5hbGxzZWN0aW9ucycpXG4gICAgICAgIC5ub3QobSlcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICAgJCgnc2VjdGlvbicgKyBtICsgJy5hbGxzZWN0aW9ucycpXG4gICAgICAgIC5jc3MoeyAnZGlzcGxheSc6ICdibG9jaycsICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnIH0pO1xuICAgICAgJCgnc2VjdGlvbicgKyBtICsgJy5hbGxzZWN0aW9ucycpXG4gICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSwgJ3Nsb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuJCgnLm5hdmJhci1icmFuZCcpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snIH0pO1xuICAgICQoJ3NlY3Rpb24nKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICQoJ2h0bWwsIGJvZHknKVxuICAgICAgLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgfSk7XG4gIH0pO1xuXG4kKCcuY29sLXhzLTMuY29sLW1kLTQnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9kdWN0VGFyZ2V0ID0gJCh0aGlzKVxuICAgICAgLmZpbmQoJ2EnKVxuICAgICAgLmF0dHIoJ2hyZWYnKTtcbiAgICBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKHByb2R1Y3RUYXJnZXQpO1xuICB9KTtcblxuJCgnLnByb2R1Y3QgLnNlY3Rpb25oZWFkZXIgYScpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpO1xuICAgIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24oJCh0aGlzKVxuICAgICAgLmF0dHIoJ2hyZWYnKSk7XG4gIH0pO1xuXG5mdW5jdGlvbiBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKHNlbGVjdG9yKSB7XG4gIGNvbnNvbGUubG9nKHNlbGVjdG9yKTtcbiAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgJCgnc2VjdGlvbi5hbGxzZWN0aW9ucycpXG4gICAgLm5vdChzZWxlY3RvcilcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24jcHJvZHVjdHMuYWxsc2VjdGlvbnMnKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnYmxvY2snIH0pO1xuICAkKCdkaXYucHJvZHVjdCcpXG4gICAgLm5vdChzZWxlY3RvcilcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICQoJ2RpdicgKyBzZWxlY3RvciArICcucHJvZHVjdCcpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnZGlzcGxheSc6ICdibG9jaycgfSk7XG4gICQoJyNwcm9kdWN0cycpXG4gICAgLmFuaW1hdGUoe1xuICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgfSwgJ3Nsb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZXF1aXJlKHNjcmlwdCkge1xuICAkLmFqYXgoe1xuICAgIHVybDogJ2pzU29jaWFscy5qcycsXG4gICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgYXN5bmM6IGZhbHNlLCAvLyA8LS0gVGhpcyBpcyB0aGUga2V5XG4gICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gYWxsIGcgIG9vZC4uLlxuXG4gICAgICAkKCcjc2hhcmVSb3VuZEljb25zJylcbiAgICAgICAgLmpzU29jaWFscyh7XG4gICAgICAgICAgc2hhcmVzOiBbJ2VtYWlsJywgJ3R3aXR0ZXInLCAnZmFjZWJvb2snLCAnbGlua2VkaW4nLCAnbWVzc2VuZ2VyJ10sXG4gICAgICAgICAgdXJsOiAnaHR0cDovL2FydGlzYW5tZW1vaXJzLmNvbScsXG4gICAgICAgICAgdGV4dDogJ3RleHQgdG8gc2hhcmUnLFxuICAgICAgICAgIHNob3dMYWJlbDogZmFsc2UsXG4gICAgICAgICAgc2hvd0NvdW50OiBmYWxzZSxcbiAgICAgICAgICBzaGFyZUluOiAncG9wdXAnLFxuXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoZSkge30sXG4gICAgICAgICAgICBtb3VzZWVudGVyOiBmdW5jdGlvbiAoZSkge30sXG4gICAgICAgICAgICBtb3VzZWxlYXZlOiBmdW5jdGlvbiAoZSkge31cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGxvYWQgc2NyaXB0IFwiICsgc2NyaXB0KTtcbiAgICB9XG4gIH0pO1xufVxuIiwiLy8gQ29kZSBmcm9tXG4vLyBodHRwczovL3d3dy5zaXRlcG9pbnQuY29tL2h0bWw1LWZvcm1zLWphdmFzY3JpcHQtY29uc3RyYWludC12YWxpZGF0aW9uLWFwaS9cbnZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3RVcycpO1xuZm9ybS5ub1ZhbGlkYXRlID0gdHJ1ZTtcblxuLy8gc2V0IGhhbmRsZXIgdG8gdmFsaWRhdGUgdGhlIGZvcm1cbi8vIG9uc3VibWl0IHVzZWQgZm9yIGVhc2llciBjcm9zcy1icm93c2VyIGNvbXBhdGliaWxpdHlcbmZvcm0ub25zdWJtaXQgPSB2YWxpZGF0ZUZvcm07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRm9ybShldmVudCkge1xuXG4gIC8vIGZldGNoIGNyb3NzLWJyb3dzZXIgZXZlbnQgb2JqZWN0IGFuZCBmb3JtIG5vZGVcbiAgZXZlbnQgPSAoZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudCk7XG4gIHZhclxuICAgIGZvcm0gPSAoZXZlbnQudGFyZ2V0ID8gZXZlbnQudGFyZ2V0IDogZXZlbnQuc3JjRWxlbWVudCksXG4gICAgZiwgZmllbGQsIGZvcm12YWxpZCA9IHRydWU7XG5cbiAgLy8gbG9vcCBhbGwgZmllbGRzXG4gIGZvciAoZiA9IDA7IGYgPCBmb3JtLmVsZW1lbnRzOyBmKyspIHtcblxuICAgIC8vIGdldCBmaWVsZFxuICAgIGZpZWxkID0gZm9ybS5lbGVtZW50c1tmXTtcblxuICAgIC8vIGlnbm9yZSBidXR0b25zLCBmaWVsZHNldHMsIGV0Yy5cbiAgICBpZiAoZmllbGQubm9kZU5hbWUgIT09ICdJTlBVVCcgJiYgZmllbGQubm9kZU5hbWUgIT09ICdURVhUQVJFQScgJiYgZmllbGQubm9kZU5hbWUgIT09ICdTRUxFQ1QnKSBjb250aW51ZTtcblxuICAgIC8vIGlzIG5hdGl2ZSBicm93c2VyIHZhbGlkYXRpb24gYXZhaWxhYmxlP1xuICAgIGlmICh0eXBlb2YgZmllbGQud2lsbFZhbGlkYXRlICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAvLyBuYXRpdmUgdmFsaWRhdGlvbiBhdmFpbGFibGVcbiAgICAgIGlmIChmaWVsZC5ub2RlTmFtZSA9PT0gJ0lOUFVUJyAmJiBmaWVsZC50eXBlICE9PSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSkge1xuXG4gICAgICAgIC8vIGlucHV0IHR5cGUgbm90IHN1cHBvcnRlZCEgVXNlIGxlZ2FjeSBKYXZhU2NyaXB0IHZhbGlkYXRpb25cbiAgICAgICAgZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoTGVnYWN5VmFsaWRhdGlvbihmaWVsZCkgPyAnJyA6ICdlcnJvcicpO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIG5hdGl2ZSBicm93c2VyIGNoZWNrXG4gICAgICBmaWVsZC5jaGVja1ZhbGlkaXR5KCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBuYXRpdmUgdmFsaWRhdGlvbiBub3QgYXZhaWxhYmxlXG4gICAgICBmaWVsZC52YWxpZGl0eSA9IGZpZWxkLnZhbGlkaXR5IHx8IHt9O1xuXG4gICAgICAvLyBzZXQgdG8gcmVzdWx0IG9mIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAgICAgIGZpZWxkLnZhbGlkaXR5LnZhbGlkID0gTGVnYWN5VmFsaWRhdGlvbihmaWVsZCk7XG5cbiAgICAgIC8vIGlmICdpbnZhbGlkJyBldmVudHMgYXJlIHJlcXVpcmVkLCB0cmlnZ2VyIGl0IGhlcmVcblxuICAgIH1cblxuICAgIGlmIChmaWVsZC52YWxpZGl0eS52YWxpZCkge1xuXG4gICAgICAvLyByZW1vdmUgZXJyb3Igc3R5bGVzIGFuZCBtZXNzYWdlc1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gc3R5bGUgZmllbGQsIHNob3cgZXJyb3IsIGV0Yy5cblxuICAgICAgLy8gZm9ybSBpcyBpbnZhbGlkXG4gICAgICBmb3JtdmFsaWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgfVxuICAvLyBjb25zb2xlLmxvZyhmb3JtdmFsaWQpO1xuICAvLyBjYW5jZWwgZm9ybSBzdWJtaXQgaWYgdmFsaWRhdGlvbiBmYWlsc1xuICBpZiAoIWZvcm12YWxpZCkge1xuICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICByZXR1cm4gZm9ybXZhbGlkO1xufVxuXG4vLyBiYXNpYyBsZWdhY3kgdmFsaWRhdGlvbiBjaGVja2luZ1xuZnVuY3Rpb24gTGVnYWN5VmFsaWRhdGlvbihmaWVsZCkge1xuXG4gIHZhclxuICAgIHZhbGlkID0gdHJ1ZSxcbiAgICB2YWwgPSBmaWVsZC52YWx1ZSxcbiAgICB0eXBlID0gZmllbGQuZ2V0QXR0cmlidXRlKCd0eXBlJyksXG4gICAgY2hrYm94ID0gKHR5cGUgPT09ICdjaGVja2JveCcgfHwgdHlwZSA9PT0gJ3JhZGlvJyksXG4gICAgcmVxdWlyZWQgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJyksXG4gICAgbWlubGVuZ3RoID0gZmllbGQuZ2V0QXR0cmlidXRlKCdtaW5sZW5ndGgnKSxcbiAgICBtYXhsZW5ndGggPSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ21heGxlbmd0aCcpLFxuICAgIHBhdHRlcm4gPSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ3BhdHRlcm4nKTtcblxuICAvLyBkaXNhYmxlZCBmaWVsZHMgc2hvdWxkIG5vdCBiZSB2YWxpZGF0ZWRcbiAgaWYgKGZpZWxkLmRpc2FibGVkKSByZXR1cm4gdmFsaWQ7XG5cbiAgLy8gdmFsdWUgcmVxdWlyZWQ/XG4gIHZhbGlkID0gdmFsaWQgJiYgKCFyZXF1aXJlZCB8fFxuICAgIChjaGtib3ggJiYgZmllbGQuY2hlY2tlZCkgfHxcbiAgICAoIWNoa2JveCAmJiB2YWwgIT09ICcnKVxuICApO1xuXG4gIC8vIG1pbmxlbmd0aCBvciBtYXhsZW5ndGggc2V0P1xuICB2YWxpZCA9IHZhbGlkICYmIChjaGtib3ggfHwgKFxuICAgICghbWlubGVuZ3RoIHx8IHZhbC5sZW5ndGggPj0gbWlubGVuZ3RoKSAmJlxuICAgICghbWF4bGVuZ3RoIHx8IHZhbC5sZW5ndGggPD0gbWF4bGVuZ3RoKVxuICApKTtcblxuICAvLyB0ZXN0IHBhdHRlcm5cbiAgaWYgKHZhbGlkICYmIHBhdHRlcm4pIHtcbiAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChwYXR0ZXJuKTtcbiAgICB2YWxpZCA9IHBhdHRlcm4udGVzdCh2YWwpO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuJChkb2N1bWVudClcbiAgLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICAgJCgnc2VjdGlvbiNjb250YWN0LmFsbHNlY3Rpb25zJylcbiAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnYmxvY2snIH0pO1xuXG4gICAgJCgnZm9ybScpXG4gICAgICAub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgbWFpbE9iamVjdCA9IHt9O1xuXG4gICAgICAgICQoJ2Zvcm0nKVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBtYWlsT2JqZWN0ID0gJCgnZm9ybScpXG4gICAgICAgICAgLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgICAgICQucG9zdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldC92My9tZy5wZXJmZWN0ZGF5YnJlYWsuY29tL21lc3NhZ2VzJyxcbiAgICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgICAgICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgeGhyRmllbGRzOiB7XG4gICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAga2V5OiAncHVia2V5LTIyOGI4NzcyNWQ1MGM2MWRkMDI0ZTIxZmIyZjU3NThkJyxcbiAgICAgICAgICAgICAgZnJvbTogJ2luZm9AYXJ0aXNhbm1lbW9pcnMuY29tJyxcbiAgICAgICAgICAgICAgdG86ICd3ZWJlY2tAZ21haWwuY29tJyxcbiAgICAgICAgICAgICAgdGV4dDogbWFpbE9iamVjdFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb25lOiAnLCBkYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjogJywgZXJyKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfSk7XG4iLCIvKiEganNzb2NpYWxzIC0gdjEuNC4wIC0gMjAxNi0xMC0xMFxuICogaHR0cDovL2pzLXNvY2lhbHMuY29tXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgQXJ0ZW0gVGFiYWxpbjsgTGljZW5zZWQgTUlUICovXG5cbihmdW5jdGlvbiAod2luZG93LCAkLCB1bmRlZmluZWQpIHtcblxuICB2YXIgSlNTT0NJQUxTID0gXCJKU1NvY2lhbHNcIixcbiAgICBKU1NPQ0lBTFNfREFUQV9LRVkgPSBKU1NPQ0lBTFM7XG5cbiAgdmFyIGdldE9yQXBwbHkgPSBmdW5jdGlvbiAodmFsdWUsIGNvbnRleHQpIHtcbiAgICBpZiAoJC5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLmFwcGx5KGNvbnRleHQsICQubWFrZUFycmF5KGFyZ3VtZW50cylcbiAgICAgICAgLnNsaWNlKDIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIHZhciBJTUdfU1JDX1JFR0VYID0gLyhcXC4oanBlZ3xwbmd8Z2lmfGJtcHxzdmcpJHxeZGF0YTppbWFnZVxcLyhqcGVnfHBuZ3xnaWZ8Ym1wfHN2Z1xcK3htbCk7YmFzZTY0KS9pO1xuICB2YXIgVVJMX1BBUkFNU19SRUdFWCA9IC8oJj9bYS16QS1aMC05XSs9KT9cXHsoW2EtekEtWjAtOV0rKVxcfS9nO1xuXG4gIHZhciBNRUFTVVJFUyA9IHtcbiAgICBcIkdcIjogMTAwMDAwMDAwMCxcbiAgICBcIk1cIjogMTAwMDAwMCxcbiAgICBcIktcIjogMTAwMFxuICB9O1xuXG4gIHZhciBzaGFyZXMgPSB7fTtcblxuICBmdW5jdGlvbiBTb2NpYWxzKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cbiAgICAkZWxlbWVudC5kYXRhKEpTU09DSUFMU19EQVRBX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLl8kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgdGhpcy5zaGFyZXMgPSBbXTtcblxuICAgIHRoaXMuX2luaXQoY29uZmlnKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIFNvY2lhbHMucHJvdG90eXBlID0ge1xuICAgIHVybDogXCJcIixcbiAgICB0ZXh0OiBcIlwiLFxuICAgIHNoYXJlSW46IFwiYmxhbmtcIixcblxuICAgIHNob3dMYWJlbDogZnVuY3Rpb24gKHNjcmVlbldpZHRoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuc2hvd0NvdW50ID09PSBmYWxzZSkgP1xuICAgICAgICAoc2NyZWVuV2lkdGggPiB0aGlzLnNtYWxsU2NyZWVuV2lkdGgpIDpcbiAgICAgICAgKHNjcmVlbldpZHRoID49IHRoaXMubGFyZ2VTY3JlZW5XaWR0aCk7XG4gICAgfSxcblxuICAgIHNob3dDb3VudDogZnVuY3Rpb24gKHNjcmVlbldpZHRoKSB7XG4gICAgICByZXR1cm4gKHNjcmVlbldpZHRoIDw9IHRoaXMuc21hbGxTY3JlZW5XaWR0aCkgPyBcImluc2lkZVwiIDogdHJ1ZTtcbiAgICB9LFxuXG4gICAgc21hbGxTY3JlZW5XaWR0aDogNjQwLFxuICAgIGxhcmdlU2NyZWVuV2lkdGg6IDEwMjQsXG5cbiAgICByZXNpemVUaW1lb3V0OiAyMDAsXG5cbiAgICBlbGVtZW50Q2xhc3M6IFwianNzb2NpYWxzXCIsXG4gICAgc2hhcmVzQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlc1wiLFxuICAgIHNoYXJlQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlXCIsXG4gICAgc2hhcmVCdXR0b25DbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtYnV0dG9uXCIsXG4gICAgc2hhcmVMaW5rQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWxpbmtcIixcbiAgICBzaGFyZUxvZ29DbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbG9nb1wiLFxuICAgIHNoYXJlTGFiZWxDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbGFiZWxcIixcbiAgICBzaGFyZUxpbmtDb3VudENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1saW5rLWNvdW50XCIsXG4gICAgc2hhcmVDb3VudEJveENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1jb3VudC1ib3hcIixcbiAgICBzaGFyZUNvdW50Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWNvdW50XCIsXG4gICAgc2hhcmVaZXJvQ291bnRDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbm8tY291bnRcIixcblxuICAgIF9pbml0OiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICB0aGlzLl9pbml0RGVmYXVsdHMoKTtcbiAgICAgICQuZXh0ZW5kKHRoaXMsIGNvbmZpZyk7XG4gICAgICB0aGlzLl9pbml0U2hhcmVzKCk7XG4gICAgICB0aGlzLl9hdHRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuICAgIH0sXG5cbiAgICBfaW5pdERlZmF1bHRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgdGhpcy50ZXh0ID0gJC50cmltKCQoXCJtZXRhW25hbWU9ZGVzY3JpcHRpb25dXCIpXG4gICAgICAgIC5hdHRyKFwiY29udGVudFwiKSB8fCAkKFwidGl0bGVcIilcbiAgICAgICAgLnRleHQoKSk7XG4gICAgfSxcblxuICAgIF9pbml0U2hhcmVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNoYXJlcyA9ICQubWFwKHRoaXMuc2hhcmVzLCAkLnByb3h5KGZ1bmN0aW9uIChzaGFyZUNvbmZpZykge1xuICAgICAgICBpZiAodHlwZW9mIHNoYXJlQ29uZmlnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgc2hhcmVDb25maWcgPSB7IHNoYXJlOiBzaGFyZUNvbmZpZyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNoYXJlID0gKHNoYXJlQ29uZmlnLnNoYXJlICYmIHNoYXJlc1tzaGFyZUNvbmZpZy5zaGFyZV0pO1xuXG4gICAgICAgIGlmICghc2hhcmUgJiYgIXNoYXJlQ29uZmlnLnJlbmRlcmVyKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoXCJTaGFyZSAnXCIgKyBzaGFyZUNvbmZpZy5zaGFyZSArIFwiJyBpcyBub3QgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJC5leHRlbmQoeyB1cmw6IHRoaXMudXJsLCB0ZXh0OiB0aGlzLnRleHQgfSwgc2hhcmUsIHNoYXJlQ29uZmlnKTtcbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2F0dGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkKHdpbmRvdylcbiAgICAgICAgLm9uKFwicmVzaXplXCIsICQucHJveHkodGhpcy5fd2luZG93UmVzaXplSGFuZGxlciwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICQod2luZG93KVxuICAgICAgICAub2ZmKFwicmVzaXplXCIsIHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBfd2luZG93UmVzaXplSGFuZGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCQuaXNGdW5jdGlvbih0aGlzLnNob3dMYWJlbCkgfHwgJC5pc0Z1bmN0aW9uKHRoaXMuc2hvd0NvdW50KSkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVyKTtcbiAgICAgICAgdGhpcy5fcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCQucHJveHkodGhpcy5yZWZyZXNoLCB0aGlzKSwgdGhpcy5yZXNpemVUaW1lb3V0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgX3JlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fY2xlYXIoKTtcblxuICAgICAgdGhpcy5fZGVmaW5lT3B0aW9uc0J5U2NyZWVuKCk7XG5cbiAgICAgIHRoaXMuXyRlbGVtZW50LmFkZENsYXNzKHRoaXMuZWxlbWVudENsYXNzKTtcblxuICAgICAgdGhpcy5fJHNoYXJlcyA9ICQoXCI8ZGl2PlwiKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZXNDbGFzcylcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuXyRlbGVtZW50KTtcblxuICAgICAgdGhpcy5fcmVuZGVyU2hhcmVzKCk7XG4gICAgfSxcblxuICAgIF9kZWZpbmVPcHRpb25zQnlTY3JlZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX3NjcmVlbldpZHRoID0gJCh3aW5kb3cpXG4gICAgICAgIC53aWR0aCgpO1xuICAgICAgdGhpcy5fc2hvd0xhYmVsID0gZ2V0T3JBcHBseSh0aGlzLnNob3dMYWJlbCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgICAgdGhpcy5fc2hvd0NvdW50ID0gZ2V0T3JBcHBseSh0aGlzLnNob3dDb3VudCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgIH0sXG5cbiAgICBfcmVuZGVyU2hhcmVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmVhY2godGhpcy5zaGFyZXMsICQucHJveHkoZnVuY3Rpb24gKF8sIHNoYXJlKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclNoYXJlKHNoYXJlKTtcbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciAkc2hhcmU7XG5cbiAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2hhcmUucmVuZGVyZXIpKSB7XG4gICAgICAgICRzaGFyZSA9ICQoc2hhcmUucmVuZGVyZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2hhcmUgPSB0aGlzLl9jcmVhdGVTaGFyZShzaGFyZSk7XG4gICAgICB9XG5cbiAgICAgICRzaGFyZS5hZGRDbGFzcyh0aGlzLnNoYXJlQ2xhc3MpXG4gICAgICAgIC5hZGRDbGFzcyhzaGFyZS5zaGFyZSA/IFwianNzb2NpYWxzLXNoYXJlLVwiICsgc2hhcmUuc2hhcmUgOiBcIlwiKVxuICAgICAgICAuYWRkQ2xhc3Moc2hhcmUuY3NzKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy5fJHNoYXJlcyk7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZTogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgJHJlc3VsdCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgIHZhciAkc2hhcmVMaW5rID0gdGhpcy5fY3JlYXRlU2hhcmVMaW5rKHNoYXJlKVxuICAgICAgICAuYXBwZW5kVG8oJHJlc3VsdCk7XG5cbiAgICAgIGlmICh0aGlzLl9zaG93Q291bnQpIHtcbiAgICAgICAgdmFyIGlzSW5zaWRlQ291bnQgPSAodGhpcy5fc2hvd0NvdW50ID09PSBcImluc2lkZVwiKTtcbiAgICAgICAgdmFyICRjb3VudENvbnRhaW5lciA9IGlzSW5zaWRlQ291bnQgPyAkc2hhcmVMaW5rIDogJChcIjxkaXY+XCIpXG4gICAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudEJveENsYXNzKVxuICAgICAgICAgIC5hcHBlbmRUbygkcmVzdWx0KTtcbiAgICAgICAgJGNvdW50Q29udGFpbmVyLmFkZENsYXNzKGlzSW5zaWRlQ291bnQgPyB0aGlzLnNoYXJlTGlua0NvdW50Q2xhc3MgOiB0aGlzLnNoYXJlQ291bnRCb3hDbGFzcyk7XG4gICAgICAgIHRoaXMuX3JlbmRlclNoYXJlQ291bnQoc2hhcmUsICRjb3VudENvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMaW5rOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBzaGFyZVN0cmF0ZWd5ID0gdGhpcy5fZ2V0U2hhcmVTdHJhdGVneShzaGFyZSk7XG5cbiAgICAgIHZhciAkcmVzdWx0ID0gc2hhcmVTdHJhdGVneS5jYWxsKHNoYXJlLCB7XG4gICAgICAgIHNoYXJlVXJsOiB0aGlzLl9nZXRTaGFyZVVybChzaGFyZSlcbiAgICAgIH0pO1xuXG4gICAgICAkcmVzdWx0LmFkZENsYXNzKHRoaXMuc2hhcmVMaW5rQ2xhc3MpXG4gICAgICAgIC5hcHBlbmQodGhpcy5fY3JlYXRlU2hhcmVMb2dvKHNoYXJlKSk7XG5cbiAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwpIHtcbiAgICAgICAgJHJlc3VsdC5hcHBlbmQodGhpcy5fY3JlYXRlU2hhcmVMYWJlbChzaGFyZSkpO1xuICAgICAgfVxuXG4gICAgICAkLmVhY2godGhpcy5vbiB8fCB7fSwgZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICgkLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICAgICAgICAkcmVzdWx0Lm9uKGV2ZW50LCAkLnByb3h5KGhhbmRsZXIsIHNoYXJlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2dldFNoYXJlU3RyYXRlZ3k6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHNoYXJlU3RyYXRlZ2llc1tzaGFyZS5zaGFyZUluIHx8IHRoaXMuc2hhcmVJbl07XG5cbiAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICB0aHJvdyBFcnJvcihcIlNoYXJlIHN0cmF0ZWd5ICdcIiArIHRoaXMuc2hhcmVJbiArIFwiJyBub3QgZm91bmRcIik7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIF9nZXRTaGFyZVVybDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgc2hhcmVVcmwgPSBnZXRPckFwcGx5KHNoYXJlLnNoYXJlVXJsLCBzaGFyZSk7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybWF0U2hhcmVVcmwoc2hhcmVVcmwsIHNoYXJlKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTG9nbzogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgbG9nbyA9IHNoYXJlLmxvZ287XG5cbiAgICAgIHZhciAkcmVzdWx0ID0gSU1HX1NSQ19SRUdFWC50ZXN0KGxvZ28pID9cbiAgICAgICAgJChcIjxpbWc+XCIpXG4gICAgICAgIC5hdHRyKFwic3JjXCIsIHNoYXJlLmxvZ28pIDpcbiAgICAgICAgJChcIjxpPlwiKVxuICAgICAgICAuYWRkQ2xhc3MobG9nbyk7XG5cbiAgICAgICRyZXN1bHQuYWRkQ2xhc3ModGhpcy5zaGFyZUxvZ29DbGFzcyk7XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMYWJlbDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICByZXR1cm4gJChcIjxzcGFuPlwiKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZUxhYmVsQ2xhc3MpXG4gICAgICAgIC50ZXh0KHNoYXJlLmxhYmVsKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlQ291bnQ6IGZ1bmN0aW9uIChzaGFyZSwgJGNvbnRhaW5lcikge1xuICAgICAgdmFyICRjb3VudCA9ICQoXCI8c3Bhbj5cIilcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudENsYXNzKTtcblxuICAgICAgJGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnNoYXJlWmVyb0NvdW50Q2xhc3MpXG4gICAgICAgIC5hcHBlbmQoJGNvdW50KTtcblxuICAgICAgdGhpcy5fbG9hZENvdW50KHNoYXJlKVxuICAgICAgICAuZG9uZSgkLnByb3h5KGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDbGFzcyh0aGlzLnNoYXJlWmVyb0NvdW50Q2xhc3MpO1xuICAgICAgICAgICAgJGNvdW50LnRleHQoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfbG9hZENvdW50OiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgIHZhciBjb3VudFVybCA9IHRoaXMuX2dldENvdW50VXJsKHNoYXJlKTtcblxuICAgICAgaWYgKCFjb3VudFVybCkge1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgwKVxuICAgICAgICAgIC5wcm9taXNlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBoYW5kbGVTdWNjZXNzID0gJC5wcm94eShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzLl9nZXRDb3VudFZhbHVlKHJlc3BvbnNlLCBzaGFyZSkpO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICQuZ2V0SlNPTihjb3VudFVybClcbiAgICAgICAgLmRvbmUoaGFuZGxlU3VjY2VzcylcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQuZ2V0KGNvdW50VXJsKVxuICAgICAgICAgICAgLmRvbmUoaGFuZGxlU3VjY2VzcylcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgX2dldENvdW50VXJsOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciBjb3VudFVybCA9IGdldE9yQXBwbHkoc2hhcmUuY291bnRVcmwsIHNoYXJlKTtcbiAgICAgIHJldHVybiB0aGlzLl9mb3JtYXRTaGFyZVVybChjb3VudFVybCwgc2hhcmUpO1xuICAgIH0sXG5cbiAgICBfZ2V0Q291bnRWYWx1ZTogZnVuY3Rpb24gKHJlc3BvbnNlLCBzaGFyZSkge1xuICAgICAgdmFyIGNvdW50ID0gKCQuaXNGdW5jdGlvbihzaGFyZS5nZXRDb3VudCkgPyBzaGFyZS5nZXRDb3VudChyZXNwb25zZSkgOiByZXNwb25zZSkgfHwgMDtcbiAgICAgIHJldHVybiAodHlwZW9mIGNvdW50ID09PSBcInN0cmluZ1wiKSA/IGNvdW50IDogdGhpcy5fZm9ybWF0TnVtYmVyKGNvdW50KTtcbiAgICB9LFxuXG4gICAgX2Zvcm1hdE51bWJlcjogZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgJC5lYWNoKE1FQVNVUkVTLCBmdW5jdGlvbiAobGV0dGVyLCB2YWx1ZSkge1xuICAgICAgICBpZiAobnVtYmVyID49IHZhbHVlKSB7XG4gICAgICAgICAgbnVtYmVyID0gcGFyc2VGbG9hdCgobnVtYmVyIC8gdmFsdWUpXG4gICAgICAgICAgICAudG9GaXhlZCgyKSkgKyBsZXR0ZXI7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9LFxuXG4gICAgX2Zvcm1hdFNoYXJlVXJsOiBmdW5jdGlvbiAodXJsLCBzaGFyZSkge1xuICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKFVSTF9QQVJBTVNfUkVHRVgsIGZ1bmN0aW9uIChtYXRjaCwga2V5LCBmaWVsZCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzaGFyZVtmaWVsZF0gfHwgXCJcIjtcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gKGtleSB8fCBcIlwiKSArIHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogXCJcIjtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcmVzaXplVGltZXIpO1xuICAgICAgdGhpcy5fJGVsZW1lbnQuZW1wdHkoKTtcbiAgICB9LFxuXG4gICAgX3Bhc3NPcHRpb25Ub1NoYXJlczogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBzaGFyZXMgPSB0aGlzLnNoYXJlcztcblxuICAgICAgJC5lYWNoKFtcInVybFwiLCBcInRleHRcIl0sIGZ1bmN0aW9uIChfLCBvcHRpb25OYW1lKSB7XG4gICAgICAgIGlmIChvcHRpb25OYW1lICE9PSBrZXkpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICQuZWFjaChzaGFyZXMsIGZ1bmN0aW9uIChfLCBzaGFyZSkge1xuICAgICAgICAgIHNoYXJlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgX25vcm1hbGl6ZVNoYXJlOiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIGlmICgkLmlzTnVtZXJpYyhzaGFyZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVzW3NoYXJlXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzaGFyZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gJC5ncmVwKHRoaXMuc2hhcmVzLCBmdW5jdGlvbiAocykge1xuICAgICAgICAgIHJldHVybiBzLnNoYXJlID09PSBzaGFyZTtcbiAgICAgICAgfSlbMF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaGFyZTtcbiAgICB9LFxuXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfSxcblxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICB0aGlzLl9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuXG4gICAgICB0aGlzLl8kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Q2xhc3MpXG4gICAgICAgIC5yZW1vdmVEYXRhKEpTU09DSUFMU19EQVRBX0tFWSk7XG4gICAgfSxcblxuICAgIG9wdGlvbjogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLl9wYXNzT3B0aW9uVG9TaGFyZXMoa2V5LCB2YWx1ZSk7XG5cbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH0sXG5cbiAgICBzaGFyZU9wdGlvbjogZnVuY3Rpb24gKHNoYXJlLCBrZXksIHZhbHVlKSB7XG4gICAgICBzaGFyZSA9IHRoaXMuX25vcm1hbGl6ZVNoYXJlKHNoYXJlKTtcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIHNoYXJlW2tleV07XG4gICAgICB9XG5cbiAgICAgIHNoYXJlW2tleV0gPSB2YWx1ZTtcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbiAgfTtcblxuICAkLmZuLmpzU29jaWFscyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB2YXIgYXJncyA9ICQubWFrZUFycmF5KGFyZ3VtZW50cyksXG4gICAgICBtZXRob2RBcmdzID0gYXJncy5zbGljZSgxKSxcbiAgICAgIHJlc3VsdCA9IHRoaXM7XG5cbiAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgaW5zdGFuY2UgPSAkZWxlbWVudC5kYXRhKEpTU09DSUFMU19EQVRBX0tFWSksXG4gICAgICAgIG1ldGhvZFJlc3VsdDtcblxuICAgICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgbWV0aG9kUmVzdWx0ID0gaW5zdGFuY2VbY29uZmlnXS5hcHBseShpbnN0YW5jZSwgbWV0aG9kQXJncyk7XG4gICAgICAgICAgaWYgKG1ldGhvZFJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIG1ldGhvZFJlc3VsdCAhPT0gaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG1ldGhvZFJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UuX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG4gICAgICAgICAgaW5zdGFuY2UuX2luaXQoY29uZmlnKTtcbiAgICAgICAgICBpbnN0YW5jZS5fcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBTb2NpYWxzKCRlbGVtZW50LCBjb25maWcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB2YXIgc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgdmFyIGNvbXBvbmVudDtcblxuICAgIGlmICgkLmlzUGxhaW5PYmplY3QoY29uZmlnKSkge1xuICAgICAgY29tcG9uZW50ID0gU29jaWFscy5wcm90b3R5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudCA9IHNoYXJlc1tjb25maWddO1xuICAgICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIH1cblxuICAgICQuZXh0ZW5kKGNvbXBvbmVudCwgY29uZmlnKTtcbiAgfTtcblxuICB2YXIgc2hhcmVTdHJhdGVnaWVzID0ge1xuICAgIHBvcHVwOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgcmV0dXJuICQoXCI8YT5cIilcbiAgICAgICAgLmF0dHIoXCJocmVmXCIsIFwiI1wiKVxuICAgICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2luZG93Lm9wZW4oYXJncy5zaGFyZVVybCwgbnVsbCwgXCJ3aWR0aD02MDAsIGhlaWdodD00MDAsIGxvY2F0aW9uPTAsIG1lbnViYXI9MCwgcmVzaXplYWJsZT0wLCBzY3JvbGxiYXJzPTAsIHN0YXR1cz0wLCB0aXRsZWJhcj0wLCB0b29sYmFyPTBcIik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYmxhbms6IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICByZXR1cm4gJChcIjxhPlwiKVxuICAgICAgICAuYXR0cih7IHRhcmdldDogXCJfYmxhbmtcIiwgaHJlZjogYXJncy5zaGFyZVVybCB9KTtcbiAgICB9LFxuXG4gICAgc2VsZjogZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKFwiPGE+XCIpXG4gICAgICAgIC5hdHRyKHsgdGFyZ2V0OiBcIl9zZWxmXCIsIGhyZWY6IGFyZ3Muc2hhcmVVcmwgfSk7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5qc1NvY2lhbHMgPSB7XG4gICAgU29jaWFsczogU29jaWFscyxcbiAgICBzaGFyZXM6IHNoYXJlcyxcbiAgICBzaGFyZVN0cmF0ZWdpZXM6IHNoYXJlU3RyYXRlZ2llcyxcbiAgICBzZXREZWZhdWx0czogc2V0RGVmYXVsdHNcbiAgfTtcblxufSh3aW5kb3csIGpRdWVyeSkpO1xuXG4oZnVuY3Rpb24gKHdpbmRvdywgJCwganNTb2NpYWxzLCB1bmRlZmluZWQpIHtcblxuICAkLmV4dGVuZChqc1NvY2lhbHMuc2hhcmVzLCB7XG5cbiAgICBlbWFpbDoge1xuICAgICAgbGFiZWw6IFwiRS1tYWlsXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWF0XCIsXG4gICAgICBzaGFyZVVybDogXCJtYWlsdG86e3RvfT9zdWJqZWN0PXt0ZXh0fSZib2R5PXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIHR3aXR0ZXI6IHtcbiAgICAgIGxhYmVsOiBcIlR3ZWV0XCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXR3aXR0ZXJcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPXt1cmx9JnRleHQ9e3RleHR9JnZpYT17dmlhfSZoYXNodGFncz17aGFzaHRhZ3N9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICBmYWNlYm9vazoge1xuICAgICAgbGFiZWw6IFwiTGlrZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1mYWNlYm9va1wiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly9mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vP2lkPXt1cmx9XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuc2hhcmUgJiYgZGF0YS5zaGFyZS5zaGFyZV9jb3VudCB8fCAwO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB2a29udGFrdGU6IHtcbiAgICAgIGxhYmVsOiBcIkxpa2VcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtdmtcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vdmsuY29tL3NoYXJlLnBocD91cmw9e3VybH0mdGl0bGU9e3RpdGxlfSZkZXNjcmlwdGlvbj17dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vdmsuY29tL3NoYXJlLnBocD9hY3Q9Y291bnQmaW5kZXg9MSZ1cmw9e3VybH1cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZGF0YS5zbGljZSgxNSwgLTIpXG4gICAgICAgICAgLnNwbGl0KCcsICcpWzFdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ29vZ2xlcGx1czoge1xuICAgICAgbGFiZWw6IFwiKzFcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtZ29vZ2xlXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiXG4gICAgfSxcblxuICAgIGxpbmtlZGluOiB7XG4gICAgICBsYWJlbDogXCJTaGFyZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1saW5rZWRpblwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vY291bnRzZXJ2L2NvdW50L3NoYXJlP2Zvcm1hdD1qc29ucCZ1cmw9e3VybH0mY2FsbGJhY2s9P1wiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNvdW50O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBwaW50ZXJlc3Q6IHtcbiAgICAgIGxhYmVsOiBcIlBpbiBpdFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1waW50ZXJlc3RcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2Jvb2ttYXJrbGV0Lz9tZWRpYT17bWVkaWF9JnVybD17dXJsfSZkZXNjcmlwdGlvbj17dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vYXBpLnBpbnRlcmVzdC5jb20vdjEvdXJscy9jb3VudC5qc29uPyZ1cmw9e3VybH0mY2FsbGJhY2s9P1wiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNvdW50O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHVtYmxldXBvbjoge1xuICAgICAgbGFiZWw6IFwiU2hhcmVcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtc3R1bWJsZXVwb25cIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHA6Ly93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9e3VybH0mdGl0bGU9e3RpdGxlfVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly93d3cuc3R1bWJsZXVwb24uY29tL3NlcnZpY2VzLzEuMDEvYmFkZ2UuZ2V0aW5mbz91cmw9e3VybH1cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHQudmlld3M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRlbGVncmFtOiB7XG4gICAgICBsYWJlbDogXCJUZWxlZ3JhbVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1wYXBlci1wbGFuZVwiLFxuICAgICAgc2hhcmVVcmw6IFwidGc6Ly9tc2c/dGV4dD17dXJsfSB7dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9LFxuXG4gICAgd2hhdHNhcHA6IHtcbiAgICAgIGxhYmVsOiBcIldoYXRzQXBwXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXdoYXRzYXBwXCIsXG4gICAgICBzaGFyZVVybDogXCJ3aGF0c2FwcDovL3NlbmQ/dGV4dD17dXJsfSB7dGV4dH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9LFxuXG4gICAgbGluZToge1xuICAgICAgbGFiZWw6IFwiTElORVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1jb21tZW50XCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwOi8vbGluZS5tZS9SL21zZy90ZXh0Lz97dGV4dH0ge3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiXG4gICAgfSxcblxuICAgIHZpYmVyOiB7XG4gICAgICBsYWJlbDogXCJWaWJlclwiLFxuICAgICAgbG9nbzogXCJmYSBmYS12b2x1bWUtY29udHJvbC1waG9uZVwiLFxuICAgICAgc2hhcmVVcmw6IFwidmliZXI6Ly9mb3J3YXJkP3RleHQ9e3VybH0ge3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIHBvY2tldDoge1xuICAgICAgbGFiZWw6IFwiUG9ja2V0XCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWdldC1wb2NrZXRcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vZ2V0cG9ja2V0LmNvbS9zYXZlP3VybD17dXJsfSZ0aXRsZT17dGl0bGV9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICBtZXNzZW5nZXI6IHtcbiAgICAgIGxhYmVsOiBcIlNoYXJlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWNvbW1lbnRpbmdcIixcbiAgICAgIHNoYXJlVXJsOiBcImZiLW1lc3NlbmdlcjovL3NoYXJlP2xpbms9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICB9XG5cbiAgfSk7XG5cbn0od2luZG93LCBqUXVlcnksIHdpbmRvdy5qc1NvY2lhbHMpKTtcbiJdfQ==
