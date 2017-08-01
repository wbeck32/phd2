function hideMail() {
  console.log('obfuscation')
  var u = "user";
  var arr = "@";
  var d = "domain";
  var dot = ".";
  var t = "tldccc";
  document.write("<a href=" + "mail" + "to:" + u + arr + d + dot + t +
    ">" + "Email (concatenation)" + "</a>" + "<br>");
}

$('.footerTxt.col-md-4.col-sm-3 p')
  .click(function () {
    console.log('email')
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
      console.log('cleeeek');
      console.log(m);
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
      $('section')
        .css({ 'visibility': 'hidden', 'display': 'none' });
      $('div.pageBody div.responsiveHeader')
        .css({ 'visibility': 'visible', 'display': 'block' });
      $('html, body')
        .animate({
          scrollTop: 0
        }, 'slow', function () {
          console.log('success!')
        });
    } else if (m !== undefined) {
      $('#collapsedMenu.in')
        .removeClass('in');
      $('.responsiveHeader')
        .css({ 'visibility': 'hidden', 'display': 'none' });
      $('section')
        .not(m)
        .css({ 'visibility': 'hidden', 'display': 'none' });
      $('section' + m)
        .css({ 'display': 'block', 'visibility': 'visible' });
      $('section' + m)
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
  console.log(selector)
  $('.responsiveHeader')
    .css({ 'visibility': 'hidden', 'display': 'none' });
  $('section')
    .not(selector)
    .css({ 'visibility': 'hidden', 'display': 'none' });
  $('section#products.container-fluid')
    .css({ 'visibility': 'visible', 'display': 'block' });
  $('div.product')
    .not(selector)
    .css({ 'visibility': 'hidden', 'display': 'none' });
  $('section' + selector + '.container-fluid.product')
    .css({ 'visibility': 'visible', 'display': 'block' });
  $('#products')
    .animate({
      scrollTop: 0
    }, 'slow', function () {
      // console.log('success!')
    });
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
(function(window, $, undefined) {

    var JSSOCIALS = "JSSocials",
        JSSOCIALS_DATA_KEY = JSSOCIALS;

    var getOrApply = function(value, context) {
        if($.isFunction(value)) {
            return value.apply(context, $.makeArray(arguments).slice(2));
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

        showLabel: function(screenWidth) {
            return (this.showCount === false) ?
                (screenWidth > this.smallScreenWidth) :
                (screenWidth >= this.largeScreenWidth);
        },

        showCount: function(screenWidth) {
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

        _init: function(config) {
            this._initDefaults();
            $.extend(this, config);
            this._initShares();
            this._attachWindowResizeCallback();
        },

        _initDefaults: function() {
            this.url = window.location.href;
            this.text = $.trim($("meta[name=description]").attr("content") || $("title").text());
        },

        _initShares: function() {
            this.shares = $.map(this.shares, $.proxy(function(shareConfig) {
                if(typeof shareConfig === "string") {
                    shareConfig = { share: shareConfig };
                }

                var share = (shareConfig.share && shares[shareConfig.share]);

                if(!share && !shareConfig.renderer) {
                    throw Error("Share '" + shareConfig.share + "' is not found");
                }

                return $.extend({ url: this.url, text: this.text }, share, shareConfig);
            }, this));
        },

        _attachWindowResizeCallback: function() {
            $(window).on("resize", $.proxy(this._windowResizeHandler, this));
        },

        _detachWindowResizeCallback: function() {
            $(window).off("resize", this._windowResizeHandler);
        },

        _windowResizeHandler: function() {
            if($.isFunction(this.showLabel) || $.isFunction(this.showCount)) {
                window.clearTimeout(this._resizeTimer);
                this._resizeTimer = setTimeout($.proxy(this.refresh, this), this.resizeTimeout);
            }
        },

        _render: function() {
            this._clear();

            this._defineOptionsByScreen();

            this._$element.addClass(this.elementClass);

            this._$shares = $("<div>").addClass(this.sharesClass)
                .appendTo(this._$element);

            this._renderShares();
        },

        _defineOptionsByScreen: function() {
            this._screenWidth = $(window).width();
            this._showLabel = getOrApply(this.showLabel, this, this._screenWidth);
            this._showCount = getOrApply(this.showCount, this, this._screenWidth);
        },

        _renderShares: function() {
            $.each(this.shares, $.proxy(function(_, share) {
                this._renderShare(share);
            }, this));
        },

        _renderShare: function(share) {
            var $share;

            if($.isFunction(share.renderer)) {
                $share = $(share.renderer());
            } else {
                $share = this._createShare(share);
            }

            $share.addClass(this.shareClass)
                .addClass(share.share ? "jssocials-share-" + share.share : "")
                .addClass(share.css)
                .appendTo(this._$shares);
        },

        _createShare: function(share) {
            var $result = $("<div>");
            var $shareLink = this._createShareLink(share).appendTo($result);

            if(this._showCount) {
                var isInsideCount = (this._showCount === "inside");
                var $countContainer = isInsideCount ? $shareLink : $("<div>").addClass(this.shareCountBoxClass).appendTo($result);
                $countContainer.addClass(isInsideCount ? this.shareLinkCountClass : this.shareCountBoxClass);
                this._renderShareCount(share, $countContainer);
            }

            return $result;
        },

        _createShareLink: function(share) {
            var shareStrategy = this._getShareStrategy(share);

            var $result = shareStrategy.call(share, {
                shareUrl: this._getShareUrl(share)
            });

            $result.addClass(this.shareLinkClass)
                .append(this._createShareLogo(share));

            if(this._showLabel) {
                $result.append(this._createShareLabel(share));
            }

            $.each(this.on || {}, function(event, handler) {
                if($.isFunction(handler)) {
                    $result.on(event, $.proxy(handler, share));
                }
            });

            return $result;
        },

        _getShareStrategy: function(share) {
            var result = shareStrategies[share.shareIn || this.shareIn];

            if(!result)
                throw Error("Share strategy '" + this.shareIn + "' not found");

            return result;
        },

        _getShareUrl: function(share) {
            var shareUrl = getOrApply(share.shareUrl, share);
            return this._formatShareUrl(shareUrl, share);
        },

        _createShareLogo: function(share) {
            var logo = share.logo;

            var $result = IMG_SRC_REGEX.test(logo) ?
                $("<img>").attr("src", share.logo) :
                $("<i>").addClass(logo);

            $result.addClass(this.shareLogoClass);

            return $result;
        },

        _createShareLabel: function(share) {
            return $("<span>").addClass(this.shareLabelClass)
                .text(share.label);
        },

        _renderShareCount: function(share, $container) {
            var $count = $("<span>").addClass(this.shareCountClass);

            $container.addClass(this.shareZeroCountClass)
                .append($count);

            this._loadCount(share).done($.proxy(function(count) {
                if(count) {
                    $container.removeClass(this.shareZeroCountClass);
                    $count.text(count);
                }
            }, this));
        },

        _loadCount: function(share) {
            var deferred = $.Deferred();
            var countUrl = this._getCountUrl(share);

            if(!countUrl) {
                return deferred.resolve(0).promise();
            }

            var handleSuccess = $.proxy(function(response) {
                deferred.resolve(this._getCountValue(response, share));
            }, this);

            $.getJSON(countUrl).done(handleSuccess)
                .fail(function() {
                    $.get(countUrl).done(handleSuccess)
                        .fail(function() {
                            deferred.resolve(0);
                        });
                });

            return deferred.promise();
        },

        _getCountUrl: function(share) {
            var countUrl = getOrApply(share.countUrl, share);
            return this._formatShareUrl(countUrl, share);
        },

        _getCountValue: function(response, share) {
            var count = ($.isFunction(share.getCount) ? share.getCount(response) : response) || 0;
            return (typeof count === "string") ? count : this._formatNumber(count);
        },

        _formatNumber: function(number) {
            $.each(MEASURES, function(letter, value) {
                if(number >= value) {
                    number = parseFloat((number / value).toFixed(2)) + letter;
                    return false;
                }
            });

            return number;
        },

        _formatShareUrl: function(url, share) {
            return url.replace(URL_PARAMS_REGEX, function(match, key, field) {
                var value = share[field] || "";
                return value ? (key || "") + window.encodeURIComponent(value) : "";
            });
        },

        _clear: function() {
            window.clearTimeout(this._resizeTimer);
            this._$element.empty();
        },

        _passOptionToShares: function(key, value) {
            var shares = this.shares;

            $.each(["url", "text"], function(_, optionName) {
                if(optionName !== key)
                    return;

                $.each(shares, function(_, share) {
                    share[key] = value;
                });
            });
        },

        _normalizeShare: function(share) {
            if($.isNumeric(share)) {
                return this.shares[share];
            }

            if(typeof share === "string") {
                return $.grep(this.shares, function(s) {
                    return s.share === share;
                })[0];
            }

            return share;
        },

        refresh: function() {
            this._render();
        },

        destroy: function() {
            this._clear();
            this._detachWindowResizeCallback();

            this._$element
                .removeClass(this.elementClass)
                .removeData(JSSOCIALS_DATA_KEY);
        },

        option: function(key, value) {
            if(arguments.length === 1) {
                return this[key];
            }

            this[key] = value;

            this._passOptionToShares(key, value);

            this.refresh();
        },

        shareOption: function(share, key, value) {
            share = this._normalizeShare(share);

            if(arguments.length === 2) {
                return share[key];
            }

            share[key] = value;
            this.refresh();
        }
    };


    $.fn.jsSocials = function(config) {
        var args = $.makeArray(arguments),
            methodArgs = args.slice(1),
            result = this;

        this.each(function() {
            var $element = $(this),
                instance = $element.data(JSSOCIALS_DATA_KEY),
                methodResult;

            if(instance) {
                if(typeof config === "string") {
                    methodResult = instance[config].apply(instance, methodArgs);
                    if(methodResult !== undefined && methodResult !== instance) {
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

    var setDefaults = function(config) {
        var component;

        if($.isPlainObject(config)) {
            component = Socials.prototype;
        } else {
            component = shares[config];
            config = arguments[1] || {};
        }

        $.extend(component, config);
    };

    var shareStrategies = {
        popup: function(args) {
            return $("<a>").attr("href", "#")
                .on("click", function() {
                    window.open(args.shareUrl, null, "width=600, height=400, location=0, menubar=0, resizeable=0, scrollbars=0, status=0, titlebar=0, toolbar=0");
                    return false;
                });
        },

        blank: function(args) {
            return $("<a>").attr({ target: "_blank", href: args.shareUrl });
        },

        self: function(args) {
            return $("<a>").attr({ target: "_self", href: args.shareUrl });
        }
    };

    window.jsSocials = {
        Socials: Socials,
        shares: shares,
        shareStrategies: shareStrategies,
        setDefaults: setDefaults
    };

}(window, jQuery));


(function(window, $, jsSocials, undefined) {

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
            getCount: function(data) {
                return data.share && data.share.share_count || 0;
            }
        },

        vkontakte: {
            label: "Like",
            logo: "fa fa-vk",
            shareUrl: "https://vk.com/share.php?url={url}&title={title}&description={text}",
            countUrl: "https://vk.com/share.php?act=count&index=1&url={url}",
            getCount: function(data) {
                return parseInt(data.slice(15, -2).split(', ')[1]);
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
            getCount: function(data) {
                return data.count;
            }
        },

        pinterest: {
            label: "Pin it",
            logo: "fa fa-pinterest",
            shareUrl: "https://pinterest.com/pin/create/bookmarklet/?media={media}&url={url}&description={text}",
            countUrl: "https://api.pinterest.com/v1/urls/count.json?&url={url}&callback=?",
            getCount: function(data) {
                return data.count;
            }
        },

        stumbleupon: {
            label: "Share",
            logo: "fa fa-stumbleupon",
            shareUrl: "http://www.stumbleupon.com/submit?url={url}&title={title}",
            countUrl:  "https://cors-anywhere.herokuapp.com/https://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}",
            getCount: function(data) {
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGhpZGVNYWlsKCkge1xuICBjb25zb2xlLmxvZygnb2JmdXNjYXRpb24nKVxuICB2YXIgdSA9IFwidXNlclwiO1xuICB2YXIgYXJyID0gXCJAXCI7XG4gIHZhciBkID0gXCJkb21haW5cIjtcbiAgdmFyIGRvdCA9IFwiLlwiO1xuICB2YXIgdCA9IFwidGxkY2NjXCI7XG4gIGRvY3VtZW50LndyaXRlKFwiPGEgaHJlZj1cIiArIFwibWFpbFwiICsgXCJ0bzpcIiArIHUgKyBhcnIgKyBkICsgZG90ICsgdCArXG4gICAgXCI+XCIgKyBcIkVtYWlsIChjb25jYXRlbmF0aW9uKVwiICsgXCI8L2E+XCIgKyBcIjxicj5cIik7XG59XG5cbiQoJy5mb290ZXJUeHQuY29sLW1kLTQuY29sLXNtLTMgcCcpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ2VtYWlsJylcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9hcHAubWFpbGd1bi5jb20vYXBwL2RvbWFpbnMvc2FuZGJveDc4MGRjNDRjZTQ0YTQxZGE4YTQyNjZiODBmZjIwYjJlLm1haWxndW4ub3JnL21lc3NhZ2VzXCIsXG4gICAgICAgIG1ldGhvZDogUE9TVCxcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUubG9nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTYW1wbGUgb2YgZGF0YTpcIiwgZGF0YS5zbGljZSgwLCAxMDApKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xuXG4kKCd1bC5uYXYubmF2YmFyLW5hdiBsaSBhJylcbiAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbSA9ICQodGhpcylcbiAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgICBjb25zb2xlLmxvZygnY2xlZWVlaycpO1xuICAgICAgY29uc29sZS5sb2cobSk7XG4gICAgaWYgKG0gPT0gJyNtb3JldG9wJykge1xuICAgICAgdmFyIGRyb3Bkb3duQ2hvaWNlID0gJCh0aGlzKVxuICAgICAgICAuZmluZCgndWwgbGkgYScpXG4gICAgICAgIC5hdHRyKCdocmVmJyk7XG4gICAgICAkKCdzZWN0aW9uJyArIGRyb3Bkb3duQ2hvaWNlKVxuICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobSA9PSAnI3Byb2R1Y3QxJyB8fCBtID09ICcjcHJvZHVjdDInIHx8IG0gPT0gJyNwcm9kdWN0MycgfHwgbSA9PSAnI3Byb2R1Y3Q0Jykge1xuICAgICAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihtKTtcbiAgICB9IGVsc2UgaWYgKG0gPT0gJyNob21lJykge1xuICAgICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgICAkKCdzZWN0aW9uJylcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICAgJCgnZGl2LnBhZ2VCb2R5IGRpdi5yZXNwb25zaXZlSGVhZGVyJylcbiAgICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnZGlzcGxheSc6ICdibG9jaycgfSk7XG4gICAgICAkKCdodG1sLCBib2R5JylcbiAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24nKVxuICAgICAgICAubm90KG0pXG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgICAgICQoJ3NlY3Rpb24nICsgbSlcbiAgICAgICAgLmNzcyh7ICdkaXNwbGF5JzogJ2Jsb2NrJywgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScgfSk7XG4gICAgICAkKCdzZWN0aW9uJyArIG0pXG4gICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSwgJ3Nsb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuJCgnLm5hdmJhci1icmFuZCcpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snIH0pO1xuICAgICQoJ3NlY3Rpb24nKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAgICQoJ2h0bWwsIGJvZHknKVxuICAgICAgLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0sICdzbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgfSk7XG4gIH0pO1xuXG4kKCcuY29sLXhzLTMuY29sLW1kLTQnKVxuICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9kdWN0VGFyZ2V0ID0gJCh0aGlzKVxuICAgICAgLmZpbmQoJ2EnKVxuICAgICAgLmF0dHIoJ2hyZWYnKTtcbiAgICBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKHByb2R1Y3RUYXJnZXQpO1xuICB9KTtcblxuJCgnLnByb2R1Y3QgLnNlY3Rpb25oZWFkZXIgYScpXG4gIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKVxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpO1xuICAgIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24oJCh0aGlzKVxuICAgICAgLmF0dHIoJ2hyZWYnKSk7XG4gIH0pO1xuXG5mdW5jdGlvbiBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKHNlbGVjdG9yKSB7XG4gIGNvbnNvbGUubG9nKHNlbGVjdG9yKVxuICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uJylcbiAgICAubm90KHNlbGVjdG9yKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdub25lJyB9KTtcbiAgJCgnc2VjdGlvbiNwcm9kdWN0cy5jb250YWluZXItZmx1aWQnKVxuICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ2Rpc3BsYXknOiAnYmxvY2snIH0pO1xuICAkKCdkaXYucHJvZHVjdCcpXG4gICAgLm5vdChzZWxlY3RvcilcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24nICsgc2VsZWN0b3IgKyAnLmNvbnRhaW5lci1mbHVpZC5wcm9kdWN0JylcbiAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdkaXNwbGF5JzogJ2Jsb2NrJyB9KTtcbiAgJCgnI3Byb2R1Y3RzJylcbiAgICAuYW5pbWF0ZSh7XG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9LCAnc2xvdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgfSk7XG59XG4iLCJsZXQgbWFpbE9iamVjdCA9IHt9O1xuXG4kKCdmb3JtJykub24oJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBtYWlsT2JqZWN0ID0gJCgnZm9ybScpLnNlcmlhbGl6ZUFycmF5KCk7XG5cbiAgJC5wb3N0KHtcbiAgICB1cmw6IFwic2VuZC5waHBcIixcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgZGF0YTogbWFpbE9iamVjdFxuICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKHJlcykge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2RvbmU6ICcsIHJlcyk7XG4gIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZXJyb3I6ICcsIGVycik7XG4gIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmaW5pc2hlZCcpO1xuICAgIH0pO1xuXG4gIH0pOyIsIi8qISBqc3NvY2lhbHMgLSB2MS40LjAgLSAyMDE2LTEwLTEwXG4qIGh0dHA6Ly9qcy1zb2NpYWxzLmNvbVxuKiBDb3B5cmlnaHQgKGMpIDIwMTYgQXJ0ZW0gVGFiYWxpbjsgTGljZW5zZWQgTUlUICovXG4oZnVuY3Rpb24od2luZG93LCAkLCB1bmRlZmluZWQpIHtcblxuICAgIHZhciBKU1NPQ0lBTFMgPSBcIkpTU29jaWFsc1wiLFxuICAgICAgICBKU1NPQ0lBTFNfREFUQV9LRVkgPSBKU1NPQ0lBTFM7XG5cbiAgICB2YXIgZ2V0T3JBcHBseSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgICAgIGlmKCQuaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5hcHBseShjb250ZXh0LCAkLm1ha2VBcnJheShhcmd1bWVudHMpLnNsaWNlKDIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcblxuICAgIHZhciBJTUdfU1JDX1JFR0VYID0gLyhcXC4oanBlZ3xwbmd8Z2lmfGJtcHxzdmcpJHxeZGF0YTppbWFnZVxcLyhqcGVnfHBuZ3xnaWZ8Ym1wfHN2Z1xcK3htbCk7YmFzZTY0KS9pO1xuICAgIHZhciBVUkxfUEFSQU1TX1JFR0VYID0gLygmP1thLXpBLVowLTldKz0pP1xceyhbYS16QS1aMC05XSspXFx9L2c7XG5cbiAgICB2YXIgTUVBU1VSRVMgPSB7XG4gICAgICAgIFwiR1wiOiAxMDAwMDAwMDAwLFxuICAgICAgICBcIk1cIjogMTAwMDAwMCxcbiAgICAgICAgXCJLXCI6IDEwMDBcbiAgICB9O1xuXG4gICAgdmFyIHNoYXJlcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gU29jaWFscyhlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcblxuICAgICAgICAkZWxlbWVudC5kYXRhKEpTU09DSUFMU19EQVRBX0tFWSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLnNoYXJlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2luaXQoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuXG4gICAgU29jaWFscy5wcm90b3R5cGUgPSB7XG4gICAgICAgIHVybDogXCJcIixcbiAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgc2hhcmVJbjogXCJibGFua1wiLFxuXG4gICAgICAgIHNob3dMYWJlbDogZnVuY3Rpb24oc2NyZWVuV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zaG93Q291bnQgPT09IGZhbHNlKSA/XG4gICAgICAgICAgICAgICAgKHNjcmVlbldpZHRoID4gdGhpcy5zbWFsbFNjcmVlbldpZHRoKSA6XG4gICAgICAgICAgICAgICAgKHNjcmVlbldpZHRoID49IHRoaXMubGFyZ2VTY3JlZW5XaWR0aCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0NvdW50OiBmdW5jdGlvbihzY3JlZW5XaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChzY3JlZW5XaWR0aCA8PSB0aGlzLnNtYWxsU2NyZWVuV2lkdGgpID8gXCJpbnNpZGVcIiA6IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc21hbGxTY3JlZW5XaWR0aDogNjQwLFxuICAgICAgICBsYXJnZVNjcmVlbldpZHRoOiAxMDI0LFxuXG4gICAgICAgIHJlc2l6ZVRpbWVvdXQ6IDIwMCxcblxuICAgICAgICBlbGVtZW50Q2xhc3M6IFwianNzb2NpYWxzXCIsXG4gICAgICAgIHNoYXJlc0NsYXNzOiBcImpzc29jaWFscy1zaGFyZXNcIixcbiAgICAgICAgc2hhcmVDbGFzczogXCJqc3NvY2lhbHMtc2hhcmVcIixcbiAgICAgICAgc2hhcmVCdXR0b25DbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtYnV0dG9uXCIsXG4gICAgICAgIHNoYXJlTGlua0NsYXNzOiBcImpzc29jaWFscy1zaGFyZS1saW5rXCIsXG4gICAgICAgIHNoYXJlTG9nb0NsYXNzOiBcImpzc29jaWFscy1zaGFyZS1sb2dvXCIsXG4gICAgICAgIHNoYXJlTGFiZWxDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbGFiZWxcIixcbiAgICAgICAgc2hhcmVMaW5rQ291bnRDbGFzczogXCJqc3NvY2lhbHMtc2hhcmUtbGluay1jb3VudFwiLFxuICAgICAgICBzaGFyZUNvdW50Qm94Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWNvdW50LWJveFwiLFxuICAgICAgICBzaGFyZUNvdW50Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLWNvdW50XCIsXG4gICAgICAgIHNoYXJlWmVyb0NvdW50Q2xhc3M6IFwianNzb2NpYWxzLXNoYXJlLW5vLWNvdW50XCIsXG5cbiAgICAgICAgX2luaXQ6IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5faW5pdERlZmF1bHRzKCk7XG4gICAgICAgICAgICAkLmV4dGVuZCh0aGlzLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5faW5pdFNoYXJlcygpO1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdERlZmF1bHRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSAkLnRyaW0oJChcIm1ldGFbbmFtZT1kZXNjcmlwdGlvbl1cIikuYXR0cihcImNvbnRlbnRcIikgfHwgJChcInRpdGxlXCIpLnRleHQoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRTaGFyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zaGFyZXMgPSAkLm1hcCh0aGlzLnNoYXJlcywgJC5wcm94eShmdW5jdGlvbihzaGFyZUNvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBzaGFyZUNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBzaGFyZUNvbmZpZyA9IHsgc2hhcmU6IHNoYXJlQ29uZmlnIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHNoYXJlID0gKHNoYXJlQ29uZmlnLnNoYXJlICYmIHNoYXJlc1tzaGFyZUNvbmZpZy5zaGFyZV0pO1xuXG4gICAgICAgICAgICAgICAgaWYoIXNoYXJlICYmICFzaGFyZUNvbmZpZy5yZW5kZXJlcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlNoYXJlICdcIiArIHNoYXJlQ29uZmlnLnNoYXJlICsgXCInIGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQoeyB1cmw6IHRoaXMudXJsLCB0ZXh0OiB0aGlzLnRleHQgfSwgc2hhcmUsIHNoYXJlQ29uZmlnKTtcbiAgICAgICAgICAgIH0sIHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYXR0YWNoV2luZG93UmVzaXplQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsICQucHJveHkodGhpcy5fd2luZG93UmVzaXplSGFuZGxlciwgdGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHdpbmRvdykub2ZmKFwicmVzaXplXCIsIHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF93aW5kb3dSZXNpemVIYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKCQuaXNGdW5jdGlvbih0aGlzLnNob3dMYWJlbCkgfHwgJC5pc0Z1bmN0aW9uKHRoaXMuc2hvd0NvdW50KSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcmVzaXplVGltZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgkLnByb3h5KHRoaXMucmVmcmVzaCwgdGhpcyksIHRoaXMucmVzaXplVGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9kZWZpbmVPcHRpb25zQnlTY3JlZW4oKTtcblxuICAgICAgICAgICAgdGhpcy5fJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5lbGVtZW50Q2xhc3MpO1xuXG4gICAgICAgICAgICB0aGlzLl8kc2hhcmVzID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKHRoaXMuc2hhcmVzQ2xhc3MpXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuXyRlbGVtZW50KTtcblxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyU2hhcmVzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2RlZmluZU9wdGlvbnNCeVNjcmVlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgdGhpcy5fc2hvd0xhYmVsID0gZ2V0T3JBcHBseSh0aGlzLnNob3dMYWJlbCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fc2hvd0NvdW50ID0gZ2V0T3JBcHBseSh0aGlzLnNob3dDb3VudCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJTaGFyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJC5lYWNoKHRoaXMuc2hhcmVzLCAkLnByb3h5KGZ1bmN0aW9uKF8sIHNoYXJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU2hhcmUoc2hhcmUpO1xuICAgICAgICAgICAgfSwgdGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJTaGFyZTogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgICAgICAgIHZhciAkc2hhcmU7XG5cbiAgICAgICAgICAgIGlmKCQuaXNGdW5jdGlvbihzaGFyZS5yZW5kZXJlcikpIHtcbiAgICAgICAgICAgICAgICAkc2hhcmUgPSAkKHNoYXJlLnJlbmRlcmVyKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2hhcmUgPSB0aGlzLl9jcmVhdGVTaGFyZShzaGFyZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzaGFyZS5hZGRDbGFzcyh0aGlzLnNoYXJlQ2xhc3MpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHNoYXJlLnNoYXJlID8gXCJqc3NvY2lhbHMtc2hhcmUtXCIgKyBzaGFyZS5zaGFyZSA6IFwiXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHNoYXJlLmNzcylcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5fJHNoYXJlcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NyZWF0ZVNoYXJlOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgICAgICAgdmFyICRyZXN1bHQgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICB2YXIgJHNoYXJlTGluayA9IHRoaXMuX2NyZWF0ZVNoYXJlTGluayhzaGFyZSkuYXBwZW5kVG8oJHJlc3VsdCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX3Nob3dDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhciBpc0luc2lkZUNvdW50ID0gKHRoaXMuX3Nob3dDb3VudCA9PT0gXCJpbnNpZGVcIik7XG4gICAgICAgICAgICAgICAgdmFyICRjb3VudENvbnRhaW5lciA9IGlzSW5zaWRlQ291bnQgPyAkc2hhcmVMaW5rIDogJChcIjxkaXY+XCIpLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudEJveENsYXNzKS5hcHBlbmRUbygkcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkY291bnRDb250YWluZXIuYWRkQ2xhc3MoaXNJbnNpZGVDb3VudCA/IHRoaXMuc2hhcmVMaW5rQ291bnRDbGFzcyA6IHRoaXMuc2hhcmVDb3VudEJveENsYXNzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTaGFyZUNvdW50KHNoYXJlLCAkY291bnRDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBfY3JlYXRlU2hhcmVMaW5rOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgICAgICAgdmFyIHNoYXJlU3RyYXRlZ3kgPSB0aGlzLl9nZXRTaGFyZVN0cmF0ZWd5KHNoYXJlKTtcblxuICAgICAgICAgICAgdmFyICRyZXN1bHQgPSBzaGFyZVN0cmF0ZWd5LmNhbGwoc2hhcmUsIHtcbiAgICAgICAgICAgICAgICBzaGFyZVVybDogdGhpcy5fZ2V0U2hhcmVVcmwoc2hhcmUpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHJlc3VsdC5hZGRDbGFzcyh0aGlzLnNoYXJlTGlua0NsYXNzKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQodGhpcy5fY3JlYXRlU2hhcmVMb2dvKHNoYXJlKSk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX3Nob3dMYWJlbCkge1xuICAgICAgICAgICAgICAgICRyZXN1bHQuYXBwZW5kKHRoaXMuX2NyZWF0ZVNoYXJlTGFiZWwoc2hhcmUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5lYWNoKHRoaXMub24gfHwge30sIGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaWYoJC5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICRyZXN1bHQub24oZXZlbnQsICQucHJveHkoaGFuZGxlciwgc2hhcmUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFNoYXJlU3RyYXRlZ3k6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2hhcmVTdHJhdGVnaWVzW3NoYXJlLnNoYXJlSW4gfHwgdGhpcy5zaGFyZUluXTtcblxuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlNoYXJlIHN0cmF0ZWd5ICdcIiArIHRoaXMuc2hhcmVJbiArIFwiJyBub3QgZm91bmRcIik7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFNoYXJlVXJsOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgICAgICAgdmFyIHNoYXJlVXJsID0gZ2V0T3JBcHBseShzaGFyZS5zaGFyZVVybCwgc2hhcmUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdFNoYXJlVXJsKHNoYXJlVXJsLCBzaGFyZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NyZWF0ZVNoYXJlTG9nbzogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgICAgICAgIHZhciBsb2dvID0gc2hhcmUubG9nbztcblxuICAgICAgICAgICAgdmFyICRyZXN1bHQgPSBJTUdfU1JDX1JFR0VYLnRlc3QobG9nbykgP1xuICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKFwic3JjXCIsIHNoYXJlLmxvZ28pIDpcbiAgICAgICAgICAgICAgICAkKFwiPGk+XCIpLmFkZENsYXNzKGxvZ28pO1xuXG4gICAgICAgICAgICAkcmVzdWx0LmFkZENsYXNzKHRoaXMuc2hhcmVMb2dvQ2xhc3MpO1xuXG4gICAgICAgICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBfY3JlYXRlU2hhcmVMYWJlbDogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiPHNwYW4+XCIpLmFkZENsYXNzKHRoaXMuc2hhcmVMYWJlbENsYXNzKVxuICAgICAgICAgICAgICAgIC50ZXh0KHNoYXJlLmxhYmVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyU2hhcmVDb3VudDogZnVuY3Rpb24oc2hhcmUsICRjb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciAkY291bnQgPSAkKFwiPHNwYW4+XCIpLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudENsYXNzKTtcblxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnNoYXJlWmVyb0NvdW50Q2xhc3MpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkY291bnQpO1xuXG4gICAgICAgICAgICB0aGlzLl9sb2FkQ291bnQoc2hhcmUpLmRvbmUoJC5wcm94eShmdW5jdGlvbihjb3VudCkge1xuICAgICAgICAgICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlQ2xhc3ModGhpcy5zaGFyZVplcm9Db3VudENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvdW50LnRleHQoY291bnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfbG9hZENvdW50OiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgdmFyIGNvdW50VXJsID0gdGhpcy5fZ2V0Q291bnRVcmwoc2hhcmUpO1xuXG4gICAgICAgICAgICBpZighY291bnRVcmwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgwKS5wcm9taXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVTdWNjZXNzID0gJC5wcm94eShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5fZ2V0Q291bnRWYWx1ZShyZXNwb25zZSwgc2hhcmUpKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAkLmdldEpTT04oY291bnRVcmwpLmRvbmUoaGFuZGxlU3VjY2VzcylcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5nZXQoY291bnRVcmwpLmRvbmUoaGFuZGxlU3VjY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Q291bnRVcmw6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICAgICAgICB2YXIgY291bnRVcmwgPSBnZXRPckFwcGx5KHNoYXJlLmNvdW50VXJsLCBzaGFyZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0U2hhcmVVcmwoY291bnRVcmwsIHNoYXJlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Q291bnRWYWx1ZTogZnVuY3Rpb24ocmVzcG9uc2UsIHNoYXJlKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAoJC5pc0Z1bmN0aW9uKHNoYXJlLmdldENvdW50KSA/IHNoYXJlLmdldENvdW50KHJlc3BvbnNlKSA6IHJlc3BvbnNlKSB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgY291bnQgPT09IFwic3RyaW5nXCIpID8gY291bnQgOiB0aGlzLl9mb3JtYXROdW1iZXIoY291bnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9mb3JtYXROdW1iZXI6IGZ1bmN0aW9uKG51bWJlcikge1xuICAgICAgICAgICAgJC5lYWNoKE1FQVNVUkVTLCBmdW5jdGlvbihsZXR0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYobnVtYmVyID49IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoKG51bWJlciAvIHZhbHVlKS50b0ZpeGVkKDIpKSArIGxldHRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9mb3JtYXRTaGFyZVVybDogZnVuY3Rpb24odXJsLCBzaGFyZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKFVSTF9QQVJBTVNfUkVHRVgsIGZ1bmN0aW9uKG1hdGNoLCBrZXksIGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc2hhcmVbZmllbGRdIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gKGtleSB8fCBcIlwiKSArIHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogXCJcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LmVtcHR5KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3Bhc3NPcHRpb25Ub1NoYXJlczogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHNoYXJlcyA9IHRoaXMuc2hhcmVzO1xuXG4gICAgICAgICAgICAkLmVhY2goW1widXJsXCIsIFwidGV4dFwiXSwgZnVuY3Rpb24oXywgb3B0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbk5hbWUgIT09IGtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgJC5lYWNoKHNoYXJlcywgZnVuY3Rpb24oXywgc2hhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcmVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX25vcm1hbGl6ZVNoYXJlOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgICAgICAgaWYoJC5pc051bWVyaWMoc2hhcmUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVzW3NoYXJlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodHlwZW9mIHNoYXJlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZ3JlcCh0aGlzLnNoYXJlcywgZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy5zaGFyZSA9PT0gc2hhcmU7XG4gICAgICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzaGFyZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG5cbiAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50XG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudENsYXNzKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVEYXRhKEpTU09DSUFMU19EQVRBX0tFWSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb3B0aW9uOiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMuX3Bhc3NPcHRpb25Ub1NoYXJlcyhrZXksIHZhbHVlKTtcblxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hhcmVPcHRpb246IGZ1bmN0aW9uKHNoYXJlLCBrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBzaGFyZSA9IHRoaXMuX25vcm1hbGl6ZVNoYXJlKHNoYXJlKTtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGFyZVtrZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaGFyZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgICQuZm4uanNTb2NpYWxzID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgIHZhciBhcmdzID0gJC5tYWtlQXJyYXkoYXJndW1lbnRzKSxcbiAgICAgICAgICAgIG1ldGhvZEFyZ3MgPSBhcmdzLnNsaWNlKDEpLFxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcztcblxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gJGVsZW1lbnQuZGF0YShKU1NPQ0lBTFNfREFUQV9LRVkpLFxuICAgICAgICAgICAgICAgIG1ldGhvZFJlc3VsdDtcblxuICAgICAgICAgICAgaWYoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgY29uZmlnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZFJlc3VsdCA9IGluc3RhbmNlW2NvbmZpZ10uYXBwbHkoaW5zdGFuY2UsIG1ldGhvZEFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBpZihtZXRob2RSZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBtZXRob2RSZXN1bHQgIT09IGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBtZXRob2RSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuX2luaXQoY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuX3JlbmRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3IFNvY2lhbHMoJGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIHZhciBzZXREZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICB2YXIgY29tcG9uZW50O1xuXG4gICAgICAgIGlmKCQuaXNQbGFpbk9iamVjdChjb25maWcpKSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSBTb2NpYWxzLnByb3RvdHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHNoYXJlc1tjb25maWddO1xuICAgICAgICAgICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgJC5leHRlbmQoY29tcG9uZW50LCBjb25maWcpO1xuICAgIH07XG5cbiAgICB2YXIgc2hhcmVTdHJhdGVnaWVzID0ge1xuICAgICAgICBwb3B1cDogZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgcmV0dXJuICQoXCI8YT5cIikuYXR0cihcImhyZWZcIiwgXCIjXCIpXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGFyZ3Muc2hhcmVVcmwsIG51bGwsIFwid2lkdGg9NjAwLCBoZWlnaHQ9NDAwLCBsb2NhdGlvbj0wLCBtZW51YmFyPTAsIHJlc2l6ZWFibGU9MCwgc2Nyb2xsYmFycz0wLCBzdGF0dXM9MCwgdGl0bGViYXI9MCwgdG9vbGJhcj0wXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmxhbms6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiPGE+XCIpLmF0dHIoeyB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IGFyZ3Muc2hhcmVVcmwgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VsZjogZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgcmV0dXJuICQoXCI8YT5cIikuYXR0cih7IHRhcmdldDogXCJfc2VsZlwiLCBocmVmOiBhcmdzLnNoYXJlVXJsIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5qc1NvY2lhbHMgPSB7XG4gICAgICAgIFNvY2lhbHM6IFNvY2lhbHMsXG4gICAgICAgIHNoYXJlczogc2hhcmVzLFxuICAgICAgICBzaGFyZVN0cmF0ZWdpZXM6IHNoYXJlU3RyYXRlZ2llcyxcbiAgICAgICAgc2V0RGVmYXVsdHM6IHNldERlZmF1bHRzXG4gICAgfTtcblxufSh3aW5kb3csIGpRdWVyeSkpO1xuXG5cbihmdW5jdGlvbih3aW5kb3csICQsIGpzU29jaWFscywgdW5kZWZpbmVkKSB7XG5cbiAgICAkLmV4dGVuZChqc1NvY2lhbHMuc2hhcmVzLCB7XG5cbiAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIkUtbWFpbFwiLFxuICAgICAgICAgICAgbG9nbzogXCJmYSBmYS1hdFwiLFxuICAgICAgICAgICAgc2hhcmVVcmw6IFwibWFpbHRvOnt0b30/c3ViamVjdD17dGV4dH0mYm9keT17dXJsfVwiLFxuICAgICAgICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICAgICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgICAgICB9LFxuXG4gICAgICAgIHR3aXR0ZXI6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlR3ZWV0XCIsXG4gICAgICAgICAgICBsb2dvOiBcImZhIGZhLXR3aXR0ZXJcIixcbiAgICAgICAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPXt1cmx9JnRleHQ9e3RleHR9JnZpYT17dmlhfSZoYXNodGFncz17aGFzaHRhZ3N9XCIsXG4gICAgICAgICAgICBjb3VudFVybDogXCJcIlxuICAgICAgICB9LFxuXG4gICAgICAgIGZhY2Vib29rOiB7XG4gICAgICAgICAgICBsYWJlbDogXCJMaWtlXCIsXG4gICAgICAgICAgICBsb2dvOiBcImZhIGZhLWZhY2Vib29rXCIsXG4gICAgICAgICAgICBzaGFyZVVybDogXCJodHRwczovL2ZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PXt1cmx9XCIsXG4gICAgICAgICAgICBjb3VudFVybDogXCJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8/aWQ9e3VybH1cIixcbiAgICAgICAgICAgIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuc2hhcmUgJiYgZGF0YS5zaGFyZS5zaGFyZV9jb3VudCB8fCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHZrb250YWt0ZToge1xuICAgICAgICAgICAgbGFiZWw6IFwiTGlrZVwiLFxuICAgICAgICAgICAgbG9nbzogXCJmYSBmYS12a1wiLFxuICAgICAgICAgICAgc2hhcmVVcmw6IFwiaHR0cHM6Ly92ay5jb20vc2hhcmUucGhwP3VybD17dXJsfSZ0aXRsZT17dGl0bGV9JmRlc2NyaXB0aW9uPXt0ZXh0fVwiLFxuICAgICAgICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly92ay5jb20vc2hhcmUucGhwP2FjdD1jb3VudCZpbmRleD0xJnVybD17dXJsfVwiLFxuICAgICAgICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoZGF0YS5zbGljZSgxNSwgLTIpLnNwbGl0KCcsICcpWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnb29nbGVwbHVzOiB7XG4gICAgICAgICAgICBsYWJlbDogXCIrMVwiLFxuICAgICAgICAgICAgbG9nbzogXCJmYSBmYS1nb29nbGVcIixcbiAgICAgICAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD17dXJsfVwiLFxuICAgICAgICAgICAgY291bnRVcmw6IFwiXCJcbiAgICAgICAgfSxcblxuICAgICAgICBsaW5rZWRpbjoge1xuICAgICAgICAgICAgbGFiZWw6IFwiU2hhcmVcIixcbiAgICAgICAgICAgIGxvZ286IFwiZmEgZmEtbGlua2VkaW5cIixcbiAgICAgICAgICAgIHNoYXJlVXJsOiBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD17dXJsfVwiLFxuICAgICAgICAgICAgY291bnRVcmw6IFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvdW50c2Vydi9jb3VudC9zaGFyZT9mb3JtYXQ9anNvbnAmdXJsPXt1cmx9JmNhbGxiYWNrPT9cIixcbiAgICAgICAgICAgIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGludGVyZXN0OiB7XG4gICAgICAgICAgICBsYWJlbDogXCJQaW4gaXRcIixcbiAgICAgICAgICAgIGxvZ286IFwiZmEgZmEtcGludGVyZXN0XCIsXG4gICAgICAgICAgICBzaGFyZVVybDogXCJodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9ib29rbWFya2xldC8/bWVkaWE9e21lZGlhfSZ1cmw9e3VybH0mZGVzY3JpcHRpb249e3RleHR9XCIsXG4gICAgICAgICAgICBjb3VudFVybDogXCJodHRwczovL2FwaS5waW50ZXJlc3QuY29tL3YxL3VybHMvY291bnQuanNvbj8mdXJsPXt1cmx9JmNhbGxiYWNrPT9cIixcbiAgICAgICAgICAgIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3R1bWJsZXVwb246IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlNoYXJlXCIsXG4gICAgICAgICAgICBsb2dvOiBcImZhIGZhLXN0dW1ibGV1cG9uXCIsXG4gICAgICAgICAgICBzaGFyZVVybDogXCJodHRwOi8vd3d3LnN0dW1ibGV1cG9uLmNvbS9zdWJtaXQ/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX1cIixcbiAgICAgICAgICAgIGNvdW50VXJsOiAgXCJodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL3d3dy5zdHVtYmxldXBvbi5jb20vc2VydmljZXMvMS4wMS9iYWRnZS5nZXRpbmZvP3VybD17dXJsfVwiLFxuICAgICAgICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHQudmlld3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGVsZWdyYW06IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlRlbGVncmFtXCIsXG4gICAgICAgICAgICBsb2dvOiBcImZhIGZhLXBhcGVyLXBsYW5lXCIsXG4gICAgICAgICAgICBzaGFyZVVybDogXCJ0ZzovL21zZz90ZXh0PXt1cmx9IHt0ZXh0fVwiLFxuICAgICAgICAgICAgY291bnRVcmw6IFwiXCIsXG4gICAgICAgICAgICBzaGFyZUluOiBcInNlbGZcIlxuICAgICAgICB9LFxuXG4gICAgICAgIHdoYXRzYXBwOiB7XG4gICAgICAgICAgICBsYWJlbDogXCJXaGF0c0FwcFwiLFxuICAgICAgICAgICAgbG9nbzogXCJmYSBmYS13aGF0c2FwcFwiLFxuICAgICAgICAgICAgc2hhcmVVcmw6IFwid2hhdHNhcHA6Ly9zZW5kP3RleHQ9e3VybH0ge3RleHR9XCIsXG4gICAgICAgICAgICBjb3VudFVybDogXCJcIixcbiAgICAgICAgICAgIHNoYXJlSW46IFwic2VsZlwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgbGFiZWw6IFwiTElORVwiLFxuICAgICAgICAgICAgbG9nbzogXCJmYSBmYS1jb21tZW50XCIsXG4gICAgICAgICAgICBzaGFyZVVybDogXCJodHRwOi8vbGluZS5tZS9SL21zZy90ZXh0Lz97dGV4dH0ge3VybH1cIixcbiAgICAgICAgICAgIGNvdW50VXJsOiBcIlwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdmliZXI6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlZpYmVyXCIsXG4gICAgICAgICAgICBsb2dvOiBcImZhIGZhLXZvbHVtZS1jb250cm9sLXBob25lXCIsXG4gICAgICAgICAgICBzaGFyZVVybDogXCJ2aWJlcjovL2ZvcndhcmQ/dGV4dD17dXJsfSB7dGV4dH1cIixcbiAgICAgICAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICAgICAgfSxcblxuICAgICAgICBwb2NrZXQ6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlBvY2tldFwiLFxuICAgICAgICAgICAgbG9nbzogXCJmYSBmYS1nZXQtcG9ja2V0XCIsXG4gICAgICAgICAgICBzaGFyZVVybDogXCJodHRwczovL2dldHBvY2tldC5jb20vc2F2ZT91cmw9e3VybH0mdGl0bGU9e3RpdGxlfVwiLFxuICAgICAgICAgICAgY291bnRVcmw6IFwiXCJcbiAgICAgICAgfSxcblxuICAgICAgICBtZXNzZW5nZXI6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIlNoYXJlXCIsXG4gICAgICAgICAgICBsb2dvOiBcImZhIGZhLWNvbW1lbnRpbmdcIixcbiAgICAgICAgICAgIHNoYXJlVXJsOiBcImZiLW1lc3NlbmdlcjovL3NoYXJlP2xpbms9e3VybH1cIixcbiAgICAgICAgICAgIGNvdW50VXJsOiBcIlwiLFxuICAgICAgICAgICAgc2hhcmVJbjogXCJzZWxmXCJcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0od2luZG93LCBqUXVlcnksIHdpbmRvdy5qc1NvY2lhbHMpKTtcblxuXG4kKCcjc2hhcmVSb3VuZEljb25zJylcbiAgLmpzU29jaWFscyh7XG4gICAgc2hhcmVzOiBbJ2VtYWlsJywgJ3R3aXR0ZXInLCAnZmFjZWJvb2snLCAnbGlua2VkaW4nLCAnbWVzc2VuZ2VyJ10sXG4gICAgdXJsOiAnaHR0cDovL2FydGlzYW5tZW1vaXJzLmNvbScsXG4gICAgdGV4dDogJ3RleHQgdG8gc2hhcmUnLFxuICAgIHNob3dMYWJlbDogZmFsc2UsXG4gICAgc2hvd0NvdW50OiBmYWxzZSxcbiAgICBzaGFyZUluOiAncG9wdXAnLFxuXG4gICAgb246IHtcbiAgICAgIGNsaWNrOiBmdW5jdGlvbiAoZSkge30sXG4gICAgICBtb3VzZWVudGVyOiBmdW5jdGlvbiAoZSkge30sXG4gICAgICBtb3VzZWxlYXZlOiBmdW5jdGlvbiAoZSkge31cbiAgICB9XG4gIH0pO1xuXG4iXX0=
