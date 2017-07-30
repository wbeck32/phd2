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
  event = event ? event : window.event;
  var form = event.target ? event.target : event.srcElement,
    f,
    field,
    formvalid = true;

  // loop all fields
  for (f = 0; f < form.elements; f++) {
    // get field
    field = form.elements[f];

    // ignore buttons, fieldsets, etc.
    if (
      field.nodeName !== 'INPUT' &&
      field.nodeName !== 'TEXTAREA' &&
      field.nodeName !== 'SELECT'
    )
      continue;

    // is native browser validation available?
    if (typeof field.willValidate !== 'undefined') {
      // native validation available
      if (
        field.nodeName === 'INPUT' &&
        field.type !== field.getAttribute('type')
      ) {
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
  var valid = true,
    val = field.value,
    type = field.getAttribute('type'),
    chkbox = type === 'checkbox' || type === 'radio',
    required = field.getAttribute('required'),
    minlength = field.getAttribute('minlength'),
    maxlength = field.getAttribute('maxlength'),
    pattern = field.getAttribute('pattern');

  // disabled fields should not be validated
  if (field.disabled) return valid;

  // value required?
  valid =
    valid &&
    (!required || (chkbox && field.checked) || (!chkbox && val !== ''));

  // minlength or maxlength set?
  valid =
    valid &&
    (chkbox ||
      ((!minlength || val.length >= minlength) &&
        (!maxlength || val.length <= maxlength)));

  // test pattern
  if (valid && pattern) {
    pattern = new RegExp(pattern);
    valid = pattern.test(val);
  }
  return valid;
}

$(document).ready(function() {
  $('.responsiveHeader').css({ visibility: 'hidden', display: 'none' });
  $('section#contact.allsections').css({
    visibility: 'visible',
    display: 'block'
  });
});

$('form')
  .on('submit', (event) => {
  var mailObject = {};
  mailObject = $('form')
    .serializeArray();
  console.log(mailObject);
  // $('form').load('./js/mailgun-curl.js', function() {
  //   console.log('loaded!');
  // });

  $.post({
    url: '../send.php'
    // crossDomain: true,
    // username: 'api',
    // key: 'pubkey-228b87725d50c61dd024e21fb2f5758d',
    // text: 'what???',
    // data: {
    //   key: 'pubkey-228b87725d50c61dd024e21fb2f5758d',
    //   from: 'info@artisanmemoirs.com',
    //   to: 'webeck@gmail.com',
    //   text: mailObject
    // }
  })
    .done(function(data) {
      console.log('done: ', data);
    })
    .fail(function(err) {
      console.log('error: ', err);
    })
    .always(function() {
      console.log('finished');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gaGlkZU1haWwoKSB7XG4gIGNvbnNvbGUubG9nKCdvYmZ1c2NhdGlvbicpO1xuICB2YXIgdSA9IFwidXNlclwiO1xuICB2YXIgYXJyID0gXCJAXCI7XG4gIHZhciBkID0gXCJkb21haW5cIjtcbiAgdmFyIGRvdCA9IFwiLlwiO1xuICB2YXIgdCA9IFwidGxkY2NjXCI7XG4gIC8vIGRvY3VtZW50LndyaXRlKFwiPGEgaHJlZj1cIiArIFwibWFpbFwiICsgXCJ0bzpcIiArIHUgKyBhcnIgKyBkICsgZG90ICsgdCArXG4gIC8vICAgXCI+XCIgKyBcIkVtYWlsIChjb25jYXRlbmF0aW9uKVwiICsgXCI8L2E+XCIgKyBcIjxicj5cIik7XG59XG5cbiQoJy5mb290ZXJUeHQuY29sLW1kLTQuY29sLXNtLTMgcCcpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ2VtYWlsJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vYXBwLm1haWxndW4uY29tL2FwcC9kb21haW5zL3NhbmRib3g3ODBkYzQ0Y2U0NGE0MWRhOGE0MjY2YjgwZmYyMGIyZS5tYWlsZ3VuLm9yZy9tZXNzYWdlc1wiLFxuICAgICAgICBtZXRob2Q6IFBPU1QsXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZShcInRleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmxvZykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2FtcGxlIG9mIGRhdGE6XCIsIGRhdGEuc2xpY2UoMCwgMTAwKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9KTtcblxuJCgndWwubmF2Lm5hdmJhci1uYXYgbGkgYScpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG0gPSAkKHRoaXMpXG4gICAgICAuYXR0cignaHJlZicpO1xuICAgIGlmIChtID09ICcjbW9yZXRvcCcpIHtcbiAgICAgIHZhciBkcm9wZG93bkNob2ljZSA9ICQodGhpcylcbiAgICAgICAgLmZpbmQoJ3VsIGxpIGEnKVxuICAgICAgICAuYXR0cignaHJlZicpO1xuICAgICAgJCgnc2VjdGlvbicgKyBkcm9wZG93bkNob2ljZSlcbiAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG0gPT0gJyNwcm9kdWN0MScgfHwgbSA9PSAnI3Byb2R1Y3QyJyB8fCBtID09ICcjcHJvZHVjdDMnIHx8IG0gPT0gJyNwcm9kdWN0NCcpIHtcbiAgICAgIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24obSk7XG4gICAgfSBlbHNlIGlmIChtID09ICcjaG9tZScpIHtcbiAgICAgICQoJyNjb2xsYXBzZWRNZW51LmluJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdpbicpO1xuICAgICAgJCgnc2VjdGlvbi5hbGxzZWN0aW9ucycpXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAgICQoJ2Rpdi5wYWdlQm9keSBkaXYucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnYmxvY2snIH0pO1xuICAgICAgJCgnaHRtbCwgYm9keScpXG4gICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSwgJ3Nsb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICQoJyNjb2xsYXBzZWRNZW51LmluJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdpbicpO1xuICAgICAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKVxuICAgICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICAgICAkKCdzZWN0aW9uLmFsbHNlY3Rpb25zJylcbiAgICAgICAgLm5vdChtKVxuICAgICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICAgICAkKCdzZWN0aW9uJyArIG0gKyAnLmFsbHNlY3Rpb25zJylcbiAgICAgICAgLmNzcyh7ICdkaXNwbGF5JzogJ2Jsb2NrJywgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScgfSk7XG4gICAgICAkKCdzZWN0aW9uJyArIG0gKyAnLmFsbHNlY3Rpb25zJylcbiAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4kKCcubmF2YmFyLWJyYW5kJylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycgfSk7XG4gICAgJCgnc2VjdGlvbicpXG4gICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICAgJCgnaHRtbCwgYm9keScpXG4gICAgICAuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgfSwgJ3Nsb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICB9KTtcbiAgfSk7XG5cbiQoJy5jb2wteHMtMy5jb2wtbWQtNCcpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb2R1Y3RUYXJnZXQgPSAkKHRoaXMpXG4gICAgICAuZmluZCgnYScpXG4gICAgICAuYXR0cignaHJlZicpO1xuICAgIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24ocHJvZHVjdFRhcmdldCk7XG4gIH0pO1xuXG4kKCcucHJvZHVjdCAuc2VjdGlvbmhlYWRlciBhJylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjY29sbGFwc2VkTWVudS5pbicpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbigkKHRoaXMpXG4gICAgICAuYXR0cignaHJlZicpKTtcbiAgfSk7XG5cbmZ1bmN0aW9uIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24oc2VsZWN0b3IpIHtcbiAgY29uc29sZS5sb2coc2VsZWN0b3IpO1xuICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uLmFsbHNlY3Rpb25zJylcbiAgICAubm90KHNlbGVjdG9yKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgJCgnc2VjdGlvbiNwcm9kdWN0cy5hbGxzZWN0aW9ucycpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnZGlzcGxheSc6ICdibG9jaycgfSk7XG4gICQoJ2Rpdi5wcm9kdWN0JylcbiAgICAubm90KHNlbGVjdG9yKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgJCgnZGl2JyArIHNlbGVjdG9yICsgJy5wcm9kdWN0JylcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdkaXNwbGF5JzogJ2Jsb2NrJyB9KTtcbiAgJCgnI3Byb2R1Y3RzJylcbiAgICAuYW5pbWF0ZSh7XG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcXVpcmUoc2NyaXB0KSB7XG4gICQuYWpheCh7XG4gICAgdXJsOiAnanNTb2NpYWxzLmpzJyxcbiAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICBhc3luYzogZmFsc2UsIC8vIDwtLSBUaGlzIGlzIHRoZSBrZXlcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBhbGwgZyAgb29kLi4uXG5cbiAgICAgICQoJyNzaGFyZVJvdW5kSWNvbnMnKVxuICAgICAgICAuanNTb2NpYWxzKHtcbiAgICAgICAgICBzaGFyZXM6IFsnZW1haWwnLCAndHdpdHRlcicsICdmYWNlYm9vaycsICdsaW5rZWRpbicsICdtZXNzZW5nZXInXSxcbiAgICAgICAgICB1cmw6ICdodHRwOi8vYXJ0aXNhbm1lbW9pcnMuY29tJyxcbiAgICAgICAgICB0ZXh0OiAndGV4dCB0byBzaGFyZScsXG4gICAgICAgICAgc2hvd0xhYmVsOiBmYWxzZSxcbiAgICAgICAgICBzaG93Q291bnQ6IGZhbHNlLFxuICAgICAgICAgIHNoYXJlSW46ICdwb3B1cCcsXG5cbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7fSxcbiAgICAgICAgICAgIG1vdXNlZW50ZXI6IGZ1bmN0aW9uIChlKSB7fSxcbiAgICAgICAgICAgIG1vdXNlbGVhdmU6IGZ1bmN0aW9uIChlKSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBzY3JpcHQgXCIgKyBzY3JpcHQpO1xuICAgIH1cbiAgfSk7XG59XG4iLCIvLyBDb2RlIGZyb21cbi8vIGh0dHBzOi8vd3d3LnNpdGVwb2ludC5jb20vaHRtbDUtZm9ybXMtamF2YXNjcmlwdC1jb25zdHJhaW50LXZhbGlkYXRpb24tYXBpL1xudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdFVzJyk7XG5mb3JtLm5vVmFsaWRhdGUgPSB0cnVlO1xuXG4vLyBzZXQgaGFuZGxlciB0byB2YWxpZGF0ZSB0aGUgZm9ybVxuLy8gb25zdWJtaXQgdXNlZCBmb3IgZWFzaWVyIGNyb3NzLWJyb3dzZXIgY29tcGF0aWJpbGl0eVxuZm9ybS5vbnN1Ym1pdCA9IHZhbGlkYXRlRm9ybTtcblxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKGV2ZW50KSB7XG4gIC8vIGZldGNoIGNyb3NzLWJyb3dzZXIgZXZlbnQgb2JqZWN0IGFuZCBmb3JtIG5vZGVcbiAgZXZlbnQgPSBldmVudCA/IGV2ZW50IDogd2luZG93LmV2ZW50O1xuICB2YXIgZm9ybSA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldCA6IGV2ZW50LnNyY0VsZW1lbnQsXG4gICAgZixcbiAgICBmaWVsZCxcbiAgICBmb3JtdmFsaWQgPSB0cnVlO1xuXG4gIC8vIGxvb3AgYWxsIGZpZWxkc1xuICBmb3IgKGYgPSAwOyBmIDwgZm9ybS5lbGVtZW50czsgZisrKSB7XG4gICAgLy8gZ2V0IGZpZWxkXG4gICAgZmllbGQgPSBmb3JtLmVsZW1lbnRzW2ZdO1xuXG4gICAgLy8gaWdub3JlIGJ1dHRvbnMsIGZpZWxkc2V0cywgZXRjLlxuICAgIGlmIChcbiAgICAgIGZpZWxkLm5vZGVOYW1lICE9PSAnSU5QVVQnICYmXG4gICAgICBmaWVsZC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJyAmJlxuICAgICAgZmllbGQubm9kZU5hbWUgIT09ICdTRUxFQ1QnXG4gICAgKVxuICAgICAgY29udGludWU7XG5cbiAgICAvLyBpcyBuYXRpdmUgYnJvd3NlciB2YWxpZGF0aW9uIGF2YWlsYWJsZT9cbiAgICBpZiAodHlwZW9mIGZpZWxkLndpbGxWYWxpZGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIG5hdGl2ZSB2YWxpZGF0aW9uIGF2YWlsYWJsZVxuICAgICAgaWYgKFxuICAgICAgICBmaWVsZC5ub2RlTmFtZSA9PT0gJ0lOUFVUJyAmJlxuICAgICAgICBmaWVsZC50eXBlICE9PSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGlucHV0IHR5cGUgbm90IHN1cHBvcnRlZCEgVXNlIGxlZ2FjeSBKYXZhU2NyaXB0IHZhbGlkYXRpb25cbiAgICAgICAgZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoTGVnYWN5VmFsaWRhdGlvbihmaWVsZCkgPyAnJyA6ICdlcnJvcicpO1xuICAgICAgfVxuXG4gICAgICAvLyBuYXRpdmUgYnJvd3NlciBjaGVja1xuICAgICAgZmllbGQuY2hlY2tWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBuYXRpdmUgdmFsaWRhdGlvbiBub3QgYXZhaWxhYmxlXG4gICAgICBmaWVsZC52YWxpZGl0eSA9IGZpZWxkLnZhbGlkaXR5IHx8IHt9O1xuXG4gICAgICAvLyBzZXQgdG8gcmVzdWx0IG9mIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAgICAgIGZpZWxkLnZhbGlkaXR5LnZhbGlkID0gTGVnYWN5VmFsaWRhdGlvbihmaWVsZCk7XG5cbiAgICAgIC8vIGlmICdpbnZhbGlkJyBldmVudHMgYXJlIHJlcXVpcmVkLCB0cmlnZ2VyIGl0IGhlcmVcbiAgICB9XG5cbiAgICBpZiAoZmllbGQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIC8vIHJlbW92ZSBlcnJvciBzdHlsZXMgYW5kIG1lc3NhZ2VzXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0eWxlIGZpZWxkLCBzaG93IGVycm9yLCBldGMuXG5cbiAgICAgIC8vIGZvcm0gaXMgaW52YWxpZFxuICAgICAgZm9ybXZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIGNvbnNvbGUubG9nKGZvcm12YWxpZCk7XG4gIC8vIGNhbmNlbCBmb3JtIHN1Ym1pdCBpZiB2YWxpZGF0aW9uIGZhaWxzXG4gIGlmICghZm9ybXZhbGlkKSB7XG4gICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHJldHVybiBmb3JtdmFsaWQ7XG59XG5cbi8vIGJhc2ljIGxlZ2FjeSB2YWxpZGF0aW9uIGNoZWNraW5nXG5mdW5jdGlvbiBMZWdhY3lWYWxpZGF0aW9uKGZpZWxkKSB7XG4gIHZhciB2YWxpZCA9IHRydWUsXG4gICAgdmFsID0gZmllbGQudmFsdWUsXG4gICAgdHlwZSA9IGZpZWxkLmdldEF0dHJpYnV0ZSgndHlwZScpLFxuICAgIGNoa2JveCA9IHR5cGUgPT09ICdjaGVja2JveCcgfHwgdHlwZSA9PT0gJ3JhZGlvJyxcbiAgICByZXF1aXJlZCA9IGZpZWxkLmdldEF0dHJpYnV0ZSgncmVxdWlyZWQnKSxcbiAgICBtaW5sZW5ndGggPSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ21pbmxlbmd0aCcpLFxuICAgIG1heGxlbmd0aCA9IGZpZWxkLmdldEF0dHJpYnV0ZSgnbWF4bGVuZ3RoJyksXG4gICAgcGF0dGVybiA9IGZpZWxkLmdldEF0dHJpYnV0ZSgncGF0dGVybicpO1xuXG4gIC8vIGRpc2FibGVkIGZpZWxkcyBzaG91bGQgbm90IGJlIHZhbGlkYXRlZFxuICBpZiAoZmllbGQuZGlzYWJsZWQpIHJldHVybiB2YWxpZDtcblxuICAvLyB2YWx1ZSByZXF1aXJlZD9cbiAgdmFsaWQgPVxuICAgIHZhbGlkICYmXG4gICAgKCFyZXF1aXJlZCB8fCAoY2hrYm94ICYmIGZpZWxkLmNoZWNrZWQpIHx8ICghY2hrYm94ICYmIHZhbCAhPT0gJycpKTtcblxuICAvLyBtaW5sZW5ndGggb3IgbWF4bGVuZ3RoIHNldD9cbiAgdmFsaWQgPVxuICAgIHZhbGlkICYmXG4gICAgKGNoa2JveCB8fFxuICAgICAgKCghbWlubGVuZ3RoIHx8IHZhbC5sZW5ndGggPj0gbWlubGVuZ3RoKSAmJlxuICAgICAgICAoIW1heGxlbmd0aCB8fCB2YWwubGVuZ3RoIDw9IG1heGxlbmd0aCkpKTtcblxuICAvLyB0ZXN0IHBhdHRlcm5cbiAgaWYgKHZhbGlkICYmIHBhdHRlcm4pIHtcbiAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChwYXR0ZXJuKTtcbiAgICB2YWxpZCA9IHBhdHRlcm4udGVzdCh2YWwpO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICQoJy5yZXNwb25zaXZlSGVhZGVyJykuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicsIGRpc3BsYXk6ICdub25lJyB9KTtcbiAgJCgnc2VjdGlvbiNjb250YWN0LmFsbHNlY3Rpb25zJykuY3NzKHtcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgZGlzcGxheTogJ2Jsb2NrJ1xuICB9KTtcbn0pO1xuXG4kKCdmb3JtJylcbiAgLm9uKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgdmFyIG1haWxPYmplY3QgPSB7fTtcbiAgbWFpbE9iamVjdCA9ICQoJ2Zvcm0nKVxuICAgIC5zZXJpYWxpemVBcnJheSgpO1xuICBjb25zb2xlLmxvZyhtYWlsT2JqZWN0KTtcbiAgLy8gJCgnZm9ybScpLmxvYWQoJy4vanMvbWFpbGd1bi1jdXJsLmpzJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgY29uc29sZS5sb2coJ2xvYWRlZCEnKTtcbiAgLy8gfSk7XG5cbiAgJC5wb3N0KHtcbiAgICB1cmw6ICcuLi9zZW5kLnBocCdcbiAgICAvLyBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAvLyB1c2VybmFtZTogJ2FwaScsXG4gICAgLy8ga2V5OiAncHVia2V5LTIyOGI4NzcyNWQ1MGM2MWRkMDI0ZTIxZmIyZjU3NThkJyxcbiAgICAvLyB0ZXh0OiAnd2hhdD8/PycsXG4gICAgLy8gZGF0YToge1xuICAgIC8vICAga2V5OiAncHVia2V5LTIyOGI4NzcyNWQ1MGM2MWRkMDI0ZTIxZmIyZjU3NThkJyxcbiAgICAvLyAgIGZyb206ICdpbmZvQGFydGlzYW5tZW1vaXJzLmNvbScsXG4gICAgLy8gICB0bzogJ3dlYmVja0BnbWFpbC5jb20nLFxuICAgIC8vICAgdGV4dDogbWFpbE9iamVjdFxuICAgIC8vIH1cbiAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZygnZG9uZTogJywgZGF0YSk7XG4gICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjogJywgZXJyKTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQnKTtcbiAgICB9KTtcbn0pO1xuIiwiLyohIGpzc29jaWFscyAtIHYxLjQuMCAtIDIwMTYtMTAtMTBcbiAqIGh0dHA6Ly9qcy1zb2NpYWxzLmNvbVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEFydGVtIFRhYmFsaW47IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24gKHdpbmRvdywgJCwgdW5kZWZpbmVkKSB7XG5cbiAgdmFyIEpTU09DSUFMUyA9IFwiSlNTb2NpYWxzXCIsXG4gICAgSlNTT0NJQUxTX0RBVEFfS0VZID0gSlNTT0NJQUxTO1xuXG4gIHZhciBnZXRPckFwcGx5ID0gZnVuY3Rpb24gKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgaWYgKCQuaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5hcHBseShjb250ZXh0LCAkLm1ha2VBcnJheShhcmd1bWVudHMpXG4gICAgICAgIC5zbGljZSgyKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICB2YXIgSU1HX1NSQ19SRUdFWCA9IC8oXFwuKGpwZWd8cG5nfGdpZnxibXB8c3ZnKSR8XmRhdGE6aW1hZ2VcXC8oanBlZ3xwbmd8Z2lmfGJtcHxzdmdcXCt4bWwpO2Jhc2U2NCkvaTtcbiAgdmFyIFVSTF9QQVJBTVNfUkVHRVggPSAvKCY/W2EtekEtWjAtOV0rPSk/XFx7KFthLXpBLVowLTldKylcXH0vZztcblxuICB2YXIgTUVBU1VSRVMgPSB7XG4gICAgXCJHXCI6IDEwMDAwMDAwMDAsXG4gICAgXCJNXCI6IDEwMDAwMDAsXG4gICAgXCJLXCI6IDEwMDBcbiAgfTtcblxuICB2YXIgc2hhcmVzID0ge307XG5cbiAgZnVuY3Rpb24gU29jaWFscyhlbGVtZW50LCBjb25maWcpIHtcbiAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuXG4gICAgJGVsZW1lbnQuZGF0YShKU1NPQ0lBTFNfREFUQV9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5fJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgIHRoaXMuc2hhcmVzID0gW107XG5cbiAgICB0aGlzLl9pbml0KGNvbmZpZyk7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBTb2NpYWxzLnByb3RvdHlwZSA9IHtcbiAgICB1cmw6IFwiXCIsXG4gICAgdGV4dDogXCJcIixcbiAgICBzaGFyZUluOiBcImJsYW5rXCIsXG5cbiAgICBzaG93TGFiZWw6IGZ1bmN0aW9uIChzY3JlZW5XaWR0aCkge1xuICAgICAgcmV0dXJuICh0aGlzLnNob3dDb3VudCA9PT0gZmFsc2UpID9cbiAgICAgICAgKHNjcmVlbldpZHRoID4gdGhpcy5zbWFsbFNjcmVlbldpZHRoKSA6XG4gICAgICAgIChzY3JlZW5XaWR0aCA+PSB0aGlzLmxhcmdlU2NyZWVuV2lkdGgpO1xuICAgIH0sXG5cbiAgICBzaG93Q291bnQ6IGZ1bmN0aW9uIChzY3JlZW5XaWR0aCkge1xuICAgICAgcmV0dXJuIChzY3JlZW5XaWR0aCA8PSB0aGlzLnNtYWxsU2NyZWVuV2lkdGgpID8gXCJpbnNpZGVcIiA6IHRydWU7XG4gICAgfSxcblxuICAgIHNtYWxsU2NyZWVuV2lkdGg6IDY0MCxcbiAgICBsYXJnZVNjcmVlbldpZHRoOiAxMDI0LFxuXG4gICAgcmVzaXplVGltZW91dDogMjAwLFxuXG4gICAgZWxlbWVudENsYXNzOiBcImpzc29jaWFsc1wiLFxuICAgIHNoYXJlc0NsYXNzOiBcImpzc29jaWFscy1zaGFyZXNcIixcbiAgICBzaGFyZUNsYXNzOiBcImpzc29jaWFscy1zaGFyZVwiLFxuICAgIHNoYXJlQnV0dG9uQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWJ1dHRvblwiLFxuICAgIHNoYXJlTGlua0NsYXNzOiBcImpzc29jaWFscy1zaGFyZS1saW5rXCIsXG4gICAgc2hhcmVMb2dvQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWxvZ29cIixcbiAgICBzaGFyZUxhYmVsQ2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWxhYmVsXCIsXG4gICAgc2hhcmVMaW5rQ291bnRDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbGluay1jb3VudFwiLFxuICAgIHNoYXJlQ291bnRCb3hDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtY291bnQtYm94XCIsXG4gICAgc2hhcmVDb3VudENsYXNzOiBcImpzc29jaWFscy1zaGFyZS1jb3VudFwiLFxuICAgIHNoYXJlWmVyb0NvdW50Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLW5vLWNvdW50XCIsXG5cbiAgICBfaW5pdDogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgdGhpcy5faW5pdERlZmF1bHRzKCk7XG4gICAgICAkLmV4dGVuZCh0aGlzLCBjb25maWcpO1xuICAgICAgdGhpcy5faW5pdFNoYXJlcygpO1xuICAgICAgdGhpcy5fYXR0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgX2luaXREZWZhdWx0czogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgIHRoaXMudGV4dCA9ICQudHJpbSgkKFwibWV0YVtuYW1lPWRlc2NyaXB0aW9uXVwiKVxuICAgICAgICAuYXR0cihcImNvbnRlbnRcIikgfHwgJChcInRpdGxlXCIpXG4gICAgICAgIC50ZXh0KCkpO1xuICAgIH0sXG5cbiAgICBfaW5pdFNoYXJlczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zaGFyZXMgPSAkLm1hcCh0aGlzLnNoYXJlcywgJC5wcm94eShmdW5jdGlvbiAoc2hhcmVDb25maWcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzaGFyZUNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHNoYXJlQ29uZmlnID0geyBzaGFyZTogc2hhcmVDb25maWcgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaGFyZSA9IChzaGFyZUNvbmZpZy5zaGFyZSAmJiBzaGFyZXNbc2hhcmVDb25maWcuc2hhcmVdKTtcblxuICAgICAgICBpZiAoIXNoYXJlICYmICFzaGFyZUNvbmZpZy5yZW5kZXJlcikge1xuICAgICAgICAgIHRocm93IEVycm9yKFwiU2hhcmUgJ1wiICsgc2hhcmVDb25maWcuc2hhcmUgKyBcIicgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHsgdXJsOiB0aGlzLnVybCwgdGV4dDogdGhpcy50ZXh0IH0sIHNoYXJlLCBzaGFyZUNvbmZpZyk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9hdHRhY2hXaW5kb3dSZXNpemVDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgJCh3aW5kb3cpXG4gICAgICAgIC5vbihcInJlc2l6ZVwiLCAkLnByb3h5KHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIsIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAkKHdpbmRvdylcbiAgICAgICAgLm9mZihcInJlc2l6ZVwiLCB0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgX3dpbmRvd1Jlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkLmlzRnVuY3Rpb24odGhpcy5zaG93TGFiZWwpIHx8ICQuaXNGdW5jdGlvbih0aGlzLnNob3dDb3VudCkpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lcik7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgkLnByb3h5KHRoaXMucmVmcmVzaCwgdGhpcyksIHRoaXMucmVzaXplVGltZW91dCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIF9yZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgIHRoaXMuX2RlZmluZU9wdGlvbnNCeVNjcmVlbigpO1xuXG4gICAgICB0aGlzLl8kZWxlbWVudC5hZGRDbGFzcyh0aGlzLmVsZW1lbnRDbGFzcyk7XG5cbiAgICAgIHRoaXMuXyRzaGFyZXMgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVzQ2xhc3MpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLl8kZWxlbWVudCk7XG5cbiAgICAgIHRoaXMuX3JlbmRlclNoYXJlcygpO1xuICAgIH0sXG5cbiAgICBfZGVmaW5lT3B0aW9uc0J5U2NyZWVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9zY3JlZW5XaWR0aCA9ICQod2luZG93KVxuICAgICAgICAud2lkdGgoKTtcbiAgICAgIHRoaXMuX3Nob3dMYWJlbCA9IGdldE9yQXBwbHkodGhpcy5zaG93TGFiZWwsIHRoaXMsIHRoaXMuX3NjcmVlbldpZHRoKTtcbiAgICAgIHRoaXMuX3Nob3dDb3VudCA9IGdldE9yQXBwbHkodGhpcy5zaG93Q291bnQsIHRoaXMsIHRoaXMuX3NjcmVlbldpZHRoKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlczogZnVuY3Rpb24gKCkge1xuICAgICAgJC5lYWNoKHRoaXMuc2hhcmVzLCAkLnByb3h5KGZ1bmN0aW9uIChfLCBzaGFyZSkge1xuICAgICAgICB0aGlzLl9yZW5kZXJTaGFyZShzaGFyZSk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZTogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgJHNoYXJlO1xuXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNoYXJlLnJlbmRlcmVyKSkge1xuICAgICAgICAkc2hhcmUgPSAkKHNoYXJlLnJlbmRlcmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNoYXJlID0gdGhpcy5fY3JlYXRlU2hhcmUoc2hhcmUpO1xuICAgICAgfVxuXG4gICAgICAkc2hhcmUuYWRkQ2xhc3ModGhpcy5zaGFyZUNsYXNzKVxuICAgICAgICAuYWRkQ2xhc3Moc2hhcmUuc2hhcmUgPyBcImpzc29jaWFscy1zaGFyZS1cIiArIHNoYXJlLnNoYXJlIDogXCJcIilcbiAgICAgICAgLmFkZENsYXNzKHNoYXJlLmNzcylcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuXyRzaGFyZXMpO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmU6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyICRyZXN1bHQgPSAkKFwiPGRpdj5cIik7XG4gICAgICB2YXIgJHNoYXJlTGluayA9IHRoaXMuX2NyZWF0ZVNoYXJlTGluayhzaGFyZSlcbiAgICAgICAgLmFwcGVuZFRvKCRyZXN1bHQpO1xuXG4gICAgICBpZiAodGhpcy5fc2hvd0NvdW50KSB7XG4gICAgICAgIHZhciBpc0luc2lkZUNvdW50ID0gKHRoaXMuX3Nob3dDb3VudCA9PT0gXCJpbnNpZGVcIik7XG4gICAgICAgIHZhciAkY291bnRDb250YWluZXIgPSBpc0luc2lkZUNvdW50ID8gJHNoYXJlTGluayA6ICQoXCI8ZGl2PlwiKVxuICAgICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlQ291bnRCb3hDbGFzcylcbiAgICAgICAgICAuYXBwZW5kVG8oJHJlc3VsdCk7XG4gICAgICAgICRjb3VudENvbnRhaW5lci5hZGRDbGFzcyhpc0luc2lkZUNvdW50ID8gdGhpcy5zaGFyZUxpbmtDb3VudENsYXNzIDogdGhpcy5zaGFyZUNvdW50Qm94Q2xhc3MpO1xuICAgICAgICB0aGlzLl9yZW5kZXJTaGFyZUNvdW50KHNoYXJlLCAkY291bnRDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTGluazogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgc2hhcmVTdHJhdGVneSA9IHRoaXMuX2dldFNoYXJlU3RyYXRlZ3koc2hhcmUpO1xuXG4gICAgICB2YXIgJHJlc3VsdCA9IHNoYXJlU3RyYXRlZ3kuY2FsbChzaGFyZSwge1xuICAgICAgICBzaGFyZVVybDogdGhpcy5fZ2V0U2hhcmVVcmwoc2hhcmUpXG4gICAgICB9KTtcblxuICAgICAgJHJlc3VsdC5hZGRDbGFzcyh0aGlzLnNoYXJlTGlua0NsYXNzKVxuICAgICAgICAuYXBwZW5kKHRoaXMuX2NyZWF0ZVNoYXJlTG9nbyhzaGFyZSkpO1xuXG4gICAgICBpZiAodGhpcy5fc2hvd0xhYmVsKSB7XG4gICAgICAgICRyZXN1bHQuYXBwZW5kKHRoaXMuX2NyZWF0ZVNoYXJlTGFiZWwoc2hhcmUpKTtcbiAgICAgIH1cblxuICAgICAgJC5lYWNoKHRoaXMub24gfHwge30sIGZ1bmN0aW9uIChldmVudCwgaGFuZGxlcikge1xuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgICAgICAgJHJlc3VsdC5vbihldmVudCwgJC5wcm94eShoYW5kbGVyLCBzaGFyZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfSxcblxuICAgIF9nZXRTaGFyZVN0cmF0ZWd5OiBmdW5jdGlvbiAoc2hhcmUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBzaGFyZVN0cmF0ZWdpZXNbc2hhcmUuc2hhcmVJbiB8fCB0aGlzLnNoYXJlSW5dO1xuXG4gICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJTaGFyZSBzdHJhdGVneSAnXCIgKyB0aGlzLnNoYXJlSW4gKyBcIicgbm90IGZvdW5kXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfZ2V0U2hhcmVVcmw6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIHNoYXJlVXJsID0gZ2V0T3JBcHBseShzaGFyZS5zaGFyZVVybCwgc2hhcmUpO1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdFNoYXJlVXJsKHNoYXJlVXJsLCBzaGFyZSk7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZUxvZ286IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgdmFyIGxvZ28gPSBzaGFyZS5sb2dvO1xuXG4gICAgICB2YXIgJHJlc3VsdCA9IElNR19TUkNfUkVHRVgudGVzdChsb2dvKSA/XG4gICAgICAgICQoXCI8aW1nPlwiKVxuICAgICAgICAuYXR0cihcInNyY1wiLCBzaGFyZS5sb2dvKSA6XG4gICAgICAgICQoXCI8aT5cIilcbiAgICAgICAgLmFkZENsYXNzKGxvZ28pO1xuXG4gICAgICAkcmVzdWx0LmFkZENsYXNzKHRoaXMuc2hhcmVMb2dvQ2xhc3MpO1xuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTGFiZWw6IGZ1bmN0aW9uIChzaGFyZSkge1xuICAgICAgcmV0dXJuICQoXCI8c3Bhbj5cIilcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVMYWJlbENsYXNzKVxuICAgICAgICAudGV4dChzaGFyZS5sYWJlbCk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZUNvdW50OiBmdW5jdGlvbiAoc2hhcmUsICRjb250YWluZXIpIHtcbiAgICAgIHZhciAkY291bnQgPSAkKFwiPHNwYW4+XCIpXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlQ291bnRDbGFzcyk7XG5cbiAgICAgICRjb250YWluZXIuYWRkQ2xhc3ModGhpcy5zaGFyZVplcm9Db3VudENsYXNzKVxuICAgICAgICAuYXBwZW5kKCRjb3VudCk7XG5cbiAgICAgIHRoaXMuX2xvYWRDb3VudChzaGFyZSlcbiAgICAgICAgLmRvbmUoJC5wcm94eShmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlQ2xhc3ModGhpcy5zaGFyZVplcm9Db3VudENsYXNzKTtcbiAgICAgICAgICAgICRjb3VudC50ZXh0KGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2xvYWRDb3VudDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICB2YXIgY291bnRVcmwgPSB0aGlzLl9nZXRDb3VudFVybChzaGFyZSk7XG5cbiAgICAgIGlmICghY291bnRVcmwpIHtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoMClcbiAgICAgICAgICAucHJvbWlzZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGFuZGxlU3VjY2VzcyA9ICQucHJveHkoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5fZ2V0Q291bnRWYWx1ZShyZXNwb25zZSwgc2hhcmUpKTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAkLmdldEpTT04oY291bnRVcmwpXG4gICAgICAgIC5kb25lKGhhbmRsZVN1Y2Nlc3MpXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkLmdldChjb3VudFVybClcbiAgICAgICAgICAgIC5kb25lKGhhbmRsZVN1Y2Nlc3MpXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIF9nZXRDb3VudFVybDogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICB2YXIgY291bnRVcmwgPSBnZXRPckFwcGx5KHNoYXJlLmNvdW50VXJsLCBzaGFyZSk7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybWF0U2hhcmVVcmwoY291bnRVcmwsIHNoYXJlKTtcbiAgICB9LFxuXG4gICAgX2dldENvdW50VmFsdWU6IGZ1bmN0aW9uIChyZXNwb25zZSwgc2hhcmUpIHtcbiAgICAgIHZhciBjb3VudCA9ICgkLmlzRnVuY3Rpb24oc2hhcmUuZ2V0Q291bnQpID8gc2hhcmUuZ2V0Q291bnQocmVzcG9uc2UpIDogcmVzcG9uc2UpIHx8IDA7XG4gICAgICByZXR1cm4gKHR5cGVvZiBjb3VudCA9PT0gXCJzdHJpbmdcIikgPyBjb3VudCA6IHRoaXMuX2Zvcm1hdE51bWJlcihjb3VudCk7XG4gICAgfSxcblxuICAgIF9mb3JtYXROdW1iZXI6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICQuZWFjaChNRUFTVVJFUywgZnVuY3Rpb24gKGxldHRlciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG51bWJlciA+PSB2YWx1ZSkge1xuICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoKG51bWJlciAvIHZhbHVlKVxuICAgICAgICAgICAgLnRvRml4ZWQoMikpICsgbGV0dGVyO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBudW1iZXI7XG4gICAgfSxcblxuICAgIF9mb3JtYXRTaGFyZVVybDogZnVuY3Rpb24gKHVybCwgc2hhcmUpIHtcbiAgICAgIHJldHVybiB1cmwucmVwbGFjZShVUkxfUEFSQU1TX1JFR0VYLCBmdW5jdGlvbiAobWF0Y2gsIGtleSwgZmllbGQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc2hhcmVbZmllbGRdIHx8IFwiXCI7XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IChrZXkgfHwgXCJcIikgKyB3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IFwiXCI7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2NsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVyKTtcbiAgICAgIHRoaXMuXyRlbGVtZW50LmVtcHR5KCk7XG4gICAgfSxcblxuICAgIF9wYXNzT3B0aW9uVG9TaGFyZXM6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgc2hhcmVzID0gdGhpcy5zaGFyZXM7XG5cbiAgICAgICQuZWFjaChbXCJ1cmxcIiwgXCJ0ZXh0XCJdLCBmdW5jdGlvbiAoXywgb3B0aW9uTmFtZSkge1xuICAgICAgICBpZiAob3B0aW9uTmFtZSAhPT0ga2V5KVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAkLmVhY2goc2hhcmVzLCBmdW5jdGlvbiAoXywgc2hhcmUpIHtcbiAgICAgICAgICBzaGFyZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9ub3JtYWxpemVTaGFyZTogZnVuY3Rpb24gKHNoYXJlKSB7XG4gICAgICBpZiAoJC5pc051bWVyaWMoc2hhcmUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlc1tzaGFyZV07XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2hhcmUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuICQuZ3JlcCh0aGlzLnNoYXJlcywgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy5zaGFyZSA9PT0gc2hhcmU7XG4gICAgICAgIH0pWzBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2hhcmU7XG4gICAgfSxcblxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH0sXG5cbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgdGhpcy5fZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcblxuICAgICAgdGhpcy5fJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudENsYXNzKVxuICAgICAgICAucmVtb3ZlRGF0YShKU1NPQ0lBTFNfREFUQV9LRVkpO1xuICAgIH0sXG5cbiAgICBvcHRpb246IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgICAgfVxuXG4gICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcblxuICAgICAgdGhpcy5fcGFzc09wdGlvblRvU2hhcmVzKGtleSwgdmFsdWUpO1xuXG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9LFxuXG4gICAgc2hhcmVPcHRpb246IGZ1bmN0aW9uIChzaGFyZSwga2V5LCB2YWx1ZSkge1xuICAgICAgc2hhcmUgPSB0aGlzLl9ub3JtYWxpemVTaGFyZShzaGFyZSk7XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJldHVybiBzaGFyZVtrZXldO1xuICAgICAgfVxuXG4gICAgICBzaGFyZVtrZXldID0gdmFsdWU7XG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gIH07XG5cbiAgJC5mbi5qc1NvY2lhbHMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgdmFyIGFyZ3MgPSAkLm1ha2VBcnJheShhcmd1bWVudHMpLFxuICAgICAgbWV0aG9kQXJncyA9IGFyZ3Muc2xpY2UoMSksXG4gICAgICByZXN1bHQgPSB0aGlzO1xuXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgIGluc3RhbmNlID0gJGVsZW1lbnQuZGF0YShKU1NPQ0lBTFNfREFUQV9LRVkpLFxuICAgICAgICBtZXRob2RSZXN1bHQ7XG5cbiAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIG1ldGhvZFJlc3VsdCA9IGluc3RhbmNlW2NvbmZpZ10uYXBwbHkoaW5zdGFuY2UsIG1ldGhvZEFyZ3MpO1xuICAgICAgICAgIGlmIChtZXRob2RSZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBtZXRob2RSZXN1bHQgIT09IGluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBtZXRob2RSZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3RhbmNlLl9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuICAgICAgICAgIGluc3RhbmNlLl9pbml0KGNvbmZpZyk7XG4gICAgICAgICAgaW5zdGFuY2UuX3JlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgU29jaWFscygkZWxlbWVudCwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIHNldERlZmF1bHRzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHZhciBjb21wb25lbnQ7XG5cbiAgICBpZiAoJC5pc1BsYWluT2JqZWN0KGNvbmZpZykpIHtcbiAgICAgIGNvbXBvbmVudCA9IFNvY2lhbHMucHJvdG90eXBlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnQgPSBzaGFyZXNbY29uZmlnXTtcbiAgICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICB9XG5cbiAgICAkLmV4dGVuZChjb21wb25lbnQsIGNvbmZpZyk7XG4gIH07XG5cbiAgdmFyIHNoYXJlU3RyYXRlZ2llcyA9IHtcbiAgICBwb3B1cDogZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKFwiPGE+XCIpXG4gICAgICAgIC5hdHRyKFwiaHJlZlwiLCBcIiNcIilcbiAgICAgICAgLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdpbmRvdy5vcGVuKGFyZ3Muc2hhcmVVcmwsIG51bGwsIFwid2lkdGg9NjAwLCBoZWlnaHQ9NDAwLCBsb2NhdGlvbj0wLCBtZW51YmFyPTAsIHJlc2l6ZWFibGU9MCwgc2Nyb2xsYmFycz0wLCBzdGF0dXM9MCwgdGl0bGViYXI9MCwgdG9vbGJhcj0wXCIpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJsYW5rOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgcmV0dXJuICQoXCI8YT5cIilcbiAgICAgICAgLmF0dHIoeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IGFyZ3Muc2hhcmVVcmwgfSk7XG4gICAgfSxcblxuICAgIHNlbGY6IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICByZXR1cm4gJChcIjxhPlwiKVxuICAgICAgICAuYXR0cih7IHRhcmdldDogXCJfc2VsZlwiLCBocmVmOiBhcmdzLnNoYXJlVXJsIH0pO1xuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuanNTb2NpYWxzID0ge1xuICAgIFNvY2lhbHM6IFNvY2lhbHMsXG4gICAgc2hhcmVzOiBzaGFyZXMsXG4gICAgc2hhcmVTdHJhdGVnaWVzOiBzaGFyZVN0cmF0ZWdpZXMsXG4gICAgc2V0RGVmYXVsdHM6IHNldERlZmF1bHRzXG4gIH07XG5cbn0od2luZG93LCBqUXVlcnkpKTtcblxuKGZ1bmN0aW9uICh3aW5kb3csICQsIGpzU29jaWFscywgdW5kZWZpbmVkKSB7XG5cbiAgJC5leHRlbmQoanNTb2NpYWxzLnNoYXJlcywge1xuXG4gICAgZW1haWw6IHtcbiAgICAgIGxhYmVsOiBcIkUtbWFpbFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1hdFwiLFxuICAgICAgc2hhcmVVcmw6IFwibWFpbHRvOnt0b30/c3ViamVjdD17dGV4dH0mYm9keT17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgIH0sXG5cbiAgICB0d2l0dGVyOiB7XG4gICAgICBsYWJlbDogXCJUd2VldFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS10d2l0dGVyXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlP3VybD17dXJsfSZ0ZXh0PXt0ZXh0fSZ2aWE9e3ZpYX0maGFzaHRhZ3M9e2hhc2h0YWdzfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCJcbiAgICB9LFxuXG4gICAgZmFjZWJvb2s6IHtcbiAgICAgIGxhYmVsOiBcIkxpa2VcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtZmFjZWJvb2tcIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9e3VybH1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLz9pZD17dXJsfVwiLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLnNoYXJlICYmIGRhdGEuc2hhcmUuc2hhcmVfY291bnQgfHwgMDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdmtvbnRha3RlOiB7XG4gICAgICBsYWJlbDogXCJMaWtlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXZrXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3ZrLmNvbS9zaGFyZS5waHA/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX0mZGVzY3JpcHRpb249e3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL3ZrLmNvbS9zaGFyZS5waHA/YWN0PWNvdW50JmluZGV4PTEmdXJsPXt1cmx9XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRhdGEuc2xpY2UoMTUsIC0yKVxuICAgICAgICAgIC5zcGxpdCgnLCAnKVsxXSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdvb2dsZXBsdXM6IHtcbiAgICAgIGxhYmVsOiBcIisxXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLWdvb2dsZVwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICBsaW5rZWRpbjoge1xuICAgICAgbGFiZWw6IFwiU2hhcmVcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtbGlua2VkaW5cIixcbiAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD17dXJsfVwiLFxuICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvdW50c2Vydi9jb3VudC9zaGFyZT9mb3JtYXQ9anNvbnAmdXJsPXt1cmx9JmNhbGxiYWNrPT9cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5jb3VudDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcGludGVyZXN0OiB7XG4gICAgICBsYWJlbDogXCJQaW4gaXRcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtcGludGVyZXN0XCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9ib29rbWFya2xldC8/bWVkaWE9e21lZGlhfSZ1cmw9e3VybH0mZGVzY3JpcHRpb249e3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJodHRwczovL2FwaS5waW50ZXJlc3QuY29tL3YxL3VybHMvY291bnQuanNvbj8mdXJsPXt1cmx9JmNhbGxiYWNrPT9cIixcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5jb3VudDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3R1bWJsZXVwb246IHtcbiAgICAgIGxhYmVsOiBcIlNoYXJlXCIsXG4gICAgICBsb2dvOiBcImZhIGZhLXN0dW1ibGV1cG9uXCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwOi8vd3d3LnN0dW1ibGV1cG9uLmNvbS9zdWJtaXQ/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX1cIixcbiAgICAgIGNvdW50VXJsOiBcImh0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vd3d3LnN0dW1ibGV1cG9uLmNvbS9zZXJ2aWNlcy8xLjAxL2JhZGdlLmdldGluZm8/dXJsPXt1cmx9XCIsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEucmVzdWx0LnZpZXdzO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZWxlZ3JhbToge1xuICAgICAgbGFiZWw6IFwiVGVsZWdyYW1cIixcbiAgICAgIGxvZ286IFwiZmEgZmEtcGFwZXItcGxhbmVcIixcbiAgICAgIHNoYXJlVXJsOiBcInRnOi8vbXNnP3RleHQ9e3VybH0ge3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIHdoYXRzYXBwOiB7XG4gICAgICBsYWJlbDogXCJXaGF0c0FwcFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS13aGF0c2FwcFwiLFxuICAgICAgc2hhcmVVcmw6IFwid2hhdHNhcHA6Ly9zZW5kP3RleHQ9e3VybH0ge3RleHR9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfSxcblxuICAgIGxpbmU6IHtcbiAgICAgIGxhYmVsOiBcIkxJTkVcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtY29tbWVudFwiLFxuICAgICAgc2hhcmVVcmw6IFwiaHR0cDovL2xpbmUubWUvUi9tc2cvdGV4dC8/e3RleHR9IHt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIlxuICAgIH0sXG5cbiAgICB2aWJlcjoge1xuICAgICAgbGFiZWw6IFwiVmliZXJcIixcbiAgICAgIGxvZ286IFwiZmEgZmEtdm9sdW1lLWNvbnRyb2wtcGhvbmVcIixcbiAgICAgIHNoYXJlVXJsOiBcInZpYmVyOi8vZm9yd2FyZD90ZXh0PXt1cmx9IHt0ZXh0fVwiLFxuICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgIH0sXG5cbiAgICBwb2NrZXQ6IHtcbiAgICAgIGxhYmVsOiBcIlBvY2tldFwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1nZXQtcG9ja2V0XCIsXG4gICAgICBzaGFyZVVybDogXCJodHRwczovL2dldHBvY2tldC5jb20vc2F2ZT91cmw9e3VybH0mdGl0bGU9e3RpdGxlfVwiLFxuICAgICAgY291bnRVcmw6IFwiXCJcbiAgICB9LFxuXG4gICAgbWVzc2VuZ2VyOiB7XG4gICAgICBsYWJlbDogXCJTaGFyZVwiLFxuICAgICAgbG9nbzogXCJmYSBmYS1jb21tZW50aW5nXCIsXG4gICAgICBzaGFyZVVybDogXCJmYi1tZXNzZW5nZXI6Ly9zaGFyZT9saW5rPXt1cmx9XCIsXG4gICAgICBjb3VudFVybDogXCJcIixcbiAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgfVxuXG4gIH0pO1xuXG59KHdpbmRvdywgalF1ZXJ5LCB3aW5kb3cuanNTb2NpYWxzKSk7XG4iXX0=
