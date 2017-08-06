/* eslint-disable */

$('.footerTxt.col-md-4.col-sm-3 p')
    .click(function() {
        // just send them to the contact form?
    });

$('a')
    .click(function() {
        var m = $(this)
            .attr('href');
        if (m === undefined) return;

        const regex = /["product"]\d/g;
        let product = null;
        product = regex.exec(m);

        $('.responsiveHeader')
            .css({ display: 'none' });
        $('section')
            .not(m)
            .css({ display: 'none' });
        $('section' + m)
            .css({ display: 'block' });
        $('.collapse')
            .removeClass('in');

        if (product) {
            $('.products')
                .css({ display: 'block' });
        } else if (m === "#home") {
            $('.responsiveHeader')
                .css({ display: 'block' });
        }
    });
let mailObject = {};

$('form')
    .on('submit', (event) => {
        event.preventDefault();
        mailObject = $('form')
            .serializeArray();

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
                $('form')
                    .get(0)
                    .reset();
                $('#thanksModal')
                    .modal('show');
                $('.responsiveHeader')
                    .css({ display: 'block' });
                $('section')
                    .css({ display: 'none' });
                // console.log('finished');
            });

    });
/*! jssocials - v1.4.0 - 2016-10-10
 * http://js-socials.com
 * Copyright (c) 2016 Artem Tabalin; Licensed MIT */

(function(window, $, undefined) {
  var JSSOCIALS = 'JSSocials',
    JSSOCIALS_DATA_KEY = JSSOCIALS;

  var getOrApply = function(value, context) {
    if ($.isFunction(value)) {
      return value.apply(context, $.makeArray(arguments).slice(2));
    }
    return value;
  };

  var IMG_SRC_REGEX = /(\.(jpeg|png|gif|bmp|svg)$|^data:image\/(jpeg|png|gif|bmp|svg\+xml);base64)/i;
  var URL_PARAMS_REGEX = /(&?[a-zA-Z0-9]+=)?\{([a-zA-Z0-9]+)\}/g;

  var MEASURES = {
    G: 1000000000,
    M: 1000000,
    K: 1000
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
    url: '',
    text: '',
    shareIn: 'blank',

    showLabel: function(screenWidth) {
      return this.showCount === false
        ? screenWidth > this.smallScreenWidth
        : screenWidth >= this.largeScreenWidth;
    },

    showCount: function(screenWidth) {
      return screenWidth <= this.smallScreenWidth ? 'inside' : true;
    },

    smallScreenWidth: 640,
    largeScreenWidth: 1024,

    resizeTimeout: 200,

    elementClass: 'jssocials',
    sharesClass: 'jssocials-shares',
    shareClass: 'jssocials-share',
    shareButtonClass: 'jssocials-share-button',
    shareLinkClass: 'jssocials-share-link',
    shareLogoClass: 'jssocials-share-logo',
    shareLabelClass: 'jssocials-share-label',
    shareLinkCountClass: 'jssocials-share-link-count',
    shareCountBoxClass: 'jssocials-share-count-box',
    shareCountClass: 'jssocials-share-count',
    shareZeroCountClass: 'jssocials-share-no-count',

    _init: function(config) {
      this._initDefaults();
      $.extend(this, config);
      this._initShares();
      this._attachWindowResizeCallback();
    },

    _initDefaults: function() {
      this.url = window.location.href;
      this.text = $.trim(
        $('meta[name=description]').attr('content') || $('title').text()
      );
    },

    _initShares: function() {
      this.shares = $.map(
        this.shares,
        $.proxy(function(shareConfig) {
          if (typeof shareConfig === 'string') {
            shareConfig = { share: shareConfig };
          }

          var share = shareConfig.share && shares[shareConfig.share];

          if (!share && !shareConfig.renderer) {
            throw Error("Share '" + shareConfig.share + "' is not found");
          }

          return $.extend(
            { url: this.url, text: this.text },
            share,
            shareConfig
          );
        }, this)
      );
    },

    _attachWindowResizeCallback: function() {
      $(window).on('resize', $.proxy(this._windowResizeHandler, this));
    },

    _detachWindowResizeCallback: function() {
      $(window).off('resize', this._windowResizeHandler);
    },

    _windowResizeHandler: function() {
      if ($.isFunction(this.showLabel) || $.isFunction(this.showCount)) {
        window.clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(
          $.proxy(this.refresh, this),
          this.resizeTimeout
        );
      }
    },

    _render: function() {
      this._clear();

      this._defineOptionsByScreen();

      this._$element.addClass(this.elementClass);

      this._$shares = $('<div>')
        .addClass(this.sharesClass)
        .appendTo(this._$element);

      this._renderShares();
    },

    _defineOptionsByScreen: function() {
      this._screenWidth = $(window).width();
      this._showLabel = getOrApply(this.showLabel, this, this._screenWidth);
      this._showCount = getOrApply(this.showCount, this, this._screenWidth);
    },

    _renderShares: function() {
      $.each(
        this.shares,
        $.proxy(function(_, share) {
          this._renderShare(share);
        }, this)
      );
    },

    _renderShare: function(share) {
      var $share;

      if ($.isFunction(share.renderer)) {
        $share = $(share.renderer());
      } else {
        $share = this._createShare(share);
      }

      $share
        .addClass(this.shareClass)
        .addClass(share.share ? 'jssocials-share-' + share.share : '')
        .addClass(share.css)
        .appendTo(this._$shares);
    },

    _createShare: function(share) {
      var $result = $('<div>');
      var $shareLink = this._createShareLink(share).appendTo($result);

      if (this._showCount) {
        var isInsideCount = this._showCount === 'inside';
        var $countContainer = isInsideCount
          ? $shareLink
          : $('<div>').addClass(this.shareCountBoxClass).appendTo($result);
        $countContainer.addClass(
          isInsideCount ? this.shareLinkCountClass : this.shareCountBoxClass
        );
        this._renderShareCount(share, $countContainer);
      }

      return $result;
    },

    _createShareLink: function(share) {
      var shareStrategy = this._getShareStrategy(share);

      var $result = shareStrategy.call(share, {
        shareUrl: this._getShareUrl(share)
      });

      $result
        .addClass(this.shareLinkClass)
        .append(this._createShareLogo(share));

      if (this._showLabel) {
        $result.append(this._createShareLabel(share));
      }

      $.each(this.on || {}, function(event, handler) {
        if ($.isFunction(handler)) {
          $result.on(event, $.proxy(handler, share));
        }
      });

      return $result;
    },

    _getShareStrategy: function(share) {
      var result = shareStrategies[share.shareIn || this.shareIn];

      if (!result)
        throw Error("Share strategy '" + this.shareIn + "' not found");

      return result;
    },

    _getShareUrl: function(share) {
      var shareUrl = getOrApply(share.shareUrl, share);
      return this._formatShareUrl(shareUrl, share);
    },

    _createShareLogo: function(share) {
      var logo = share.logo;

      var $result = IMG_SRC_REGEX.test(logo)
        ? $('<img>').attr('src', share.logo)
        : $('<i>').addClass(logo);

      $result.addClass(this.shareLogoClass);

      return $result;
    },

    _createShareLabel: function(share) {
      return $('<span>').addClass(this.shareLabelClass).text(share.label);
    },

    _renderShareCount: function(share, $container) {
      var $count = $('<span>').addClass(this.shareCountClass);

      $container.addClass(this.shareZeroCountClass).append($count);

      this._loadCount(share).done(
        $.proxy(function(count) {
          if (count) {
            $container.removeClass(this.shareZeroCountClass);
            $count.text(count);
          }
        }, this)
      );
    },

    _loadCount: function(share) {
      var deferred = $.Deferred();
      var countUrl = this._getCountUrl(share);

      if (!countUrl) {
        return deferred.resolve(0).promise();
      }

      var handleSuccess = $.proxy(function(response) {
        deferred.resolve(this._getCountValue(response, share));
      }, this);

      $.getJSON(countUrl).done(handleSuccess).fail(function() {
        $.get(countUrl).done(handleSuccess).fail(function() {
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
      var count =
        ($.isFunction(share.getCount) ? share.getCount(response) : response) ||
        0;
      return typeof count === 'string' ? count : this._formatNumber(count);
    },

    _formatNumber: function(number) {
      $.each(MEASURES, function(letter, value) {
        if (number >= value) {
          number = parseFloat((number / value).toFixed(2)) + letter;
          return false;
        }
      });

      return number;
    },

    _formatShareUrl: function(url, share) {
      return url.replace(URL_PARAMS_REGEX, function(match, key, field) {
        var value = share[field] || '';
        return value ? (key || '') + window.encodeURIComponent(value) : '';
      });
    },

    _clear: function() {
      window.clearTimeout(this._resizeTimer);
      this._$element.empty();
    },

    _passOptionToShares: function(key, value) {
      var shares = this.shares;

      $.each(['url', 'text'], function(_, optionName) {
        if (optionName !== key) return;

        $.each(shares, function(_, share) {
          share[key] = value;
        });
      });
    },

    _normalizeShare: function(share) {
      if ($.isNumeric(share)) {
        return this.shares[share];
      }

      if (typeof share === 'string') {
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
      if (arguments.length === 1) {
        return this[key];
      }

      this[key] = value;

      this._passOptionToShares(key, value);

      this.refresh();
    },

    shareOption: function(share, key, value) {
      share = this._normalizeShare(share);

      if (arguments.length === 2) {
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

      if (instance) {
        if (typeof config === 'string') {
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

  var setDefaults = function(config) {
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
    popup: function(args) {
      return $('<a>').attr('href', '#').on('click', function() {
        window.open(
          args.shareUrl,
          null,
          'width=600, height=400, location=0, menubar=0, resizeable=0, scrollbars=0, status=0, titlebar=0, toolbar=0'
        );
        return false;
      });
    },

    blank: function(args) {
      return $('<a>').attr({ target: '_blank', href: args.shareUrl });
    },

    self: function(args) {
      return $('<a>').attr({ target: '_self', href: args.shareUrl });
    }
  };

  window.jsSocials = {
    Socials: Socials,
    shares: shares,
    shareStrategies: shareStrategies,
    setDefaults: setDefaults
  };
})(window, jQuery);

(function(window, $, jsSocials, undefined) {
  $.extend(jsSocials.shares, {
    email: {
      label: 'E-mail',
      logo: 'fa fa-at',
      shareUrl: 'mailto:{to}?subject={text}&body={url}',
      countUrl: '',
      shareIn: 'self'
    },

    twitter: {
      label: 'Tweet',
      logo: 'fa fa-twitter',
      shareUrl:
        'https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}',
      countUrl: ''
    },

    facebook: {
      label: 'Like',
      logo: 'fa fa-facebook',
      shareUrl: 'https://facebook.com/sharer/sharer.php?u={url}',
      countUrl: 'https://graph.facebook.com/?id={url}',
      getCount: function(data) {
        return (data.share && data.share.share_count) || 0;
      }
    },

    vkontakte: {
      label: 'Like',
      logo: 'fa fa-vk',
      shareUrl:
        'https://vk.com/share.php?url={url}&title={title}&description={text}',
      countUrl: 'https://vk.com/share.php?act=count&index=1&url={url}',
      getCount: function(data) {
        return parseInt(data.slice(15, -2).split(', ')[1]);
      }
    },

    googleplus: {
      label: '+1',
      logo: 'fa fa-google',
      shareUrl: 'https://plus.google.com/share?url={url}',
      countUrl: ''
    },

    linkedin: {
      label: 'Share',
      logo: 'fa fa-linkedin',
      shareUrl: 'https://www.linkedin.com/shareArticle?mini=true&url={url}',
      countUrl:
        'https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?',
      getCount: function(data) {
        return data.count;
      }
    },

    pinterest: {
      label: 'Pin it',
      logo: 'fa fa-pinterest',
      shareUrl:
        'https://pinterest.com/pin/create/bookmarklet/?media={media}&url={url}&description={text}',
      countUrl:
        'https://api.pinterest.com/v1/urls/count.json?&url={url}&callback=?',
      getCount: function(data) {
        return data.count;
      }
    },

    stumbleupon: {
      label: 'Share',
      logo: 'fa fa-stumbleupon',
      shareUrl: 'http://www.stumbleupon.com/submit?url={url}&title={title}',
      countUrl:
        'https://cors-anywhere.herokuapp.com/https://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}'
      // getCount: function(data) {
      //   return data.result.views;
      // }
    },

    telegram: {
      label: 'Telegram',
      logo: 'fa fa-paper-plane',
      shareUrl: 'tg://msg?text={url} {text}',
      countUrl: '',
      shareIn: 'self'
    },

    whatsapp: {
      label: 'WhatsApp',
      logo: 'fa fa-whatsapp',
      shareUrl: 'whatsapp://send?text={url} {text}',
      countUrl: '',
      shareIn: 'self'
    },

    line: {
      label: 'LINE',
      logo: 'fa fa-comment',
      shareUrl: 'http://line.me/R/msg/text/?{text} {url}',
      countUrl: ''
    },

    viber: {
      label: 'Viber',
      logo: 'fa fa-volume-control-phone',
      shareUrl: 'viber://forward?text={url} {text}',
      countUrl: '',
      shareIn: 'self'
    },

    pocket: {
      label: 'Pocket',
      logo: 'fa fa-get-pocket',
      shareUrl: 'https://getpocket.com/save?url={url}&title={title}',
      countUrl: ''
    },

    messenger: {
      label: 'Share',
      logo: 'fa fa-commenting',
      shareUrl: 'fb-messenger://share?link={url}',
      countUrl: '',
      shareIn: 'self'
    }
  });
})(window, jQuery, window.jsSocials);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5cbiQoJy5mb290ZXJUeHQuY29sLW1kLTQuY29sLXNtLTMgcCcpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBqdXN0IHNlbmQgdGhlbSB0byB0aGUgY29udGFjdCBmb3JtP1xuICAgIH0pO1xuXG4kKCdhJylcbiAgICAuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtID0gJCh0aGlzKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgaWYgKG0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gL1tcInByb2R1Y3RcIl1cXGQvZztcbiAgICAgICAgbGV0IHByb2R1Y3QgPSBudWxsO1xuICAgICAgICBwcm9kdWN0ID0gcmVnZXguZXhlYyhtKTtcblxuICAgICAgICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpXG4gICAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICAgICAkKCdzZWN0aW9uJylcbiAgICAgICAgICAgIC5ub3QobSlcbiAgICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgICQoJ3NlY3Rpb24nICsgbSlcbiAgICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICAgICAgICAkKCcuY29sbGFwc2UnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpbicpO1xuXG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgICAkKCcucHJvZHVjdHMnKVxuICAgICAgICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG0gPT09IFwiI2hvbWVcIikge1xuICAgICAgICAgICAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKVxuICAgICAgICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICAgICAgICB9XG4gICAgfSk7IiwibGV0IG1haWxPYmplY3QgPSB7fTtcblxuJCgnZm9ybScpXG4gICAgLm9uKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbWFpbE9iamVjdCA9ICQoJ2Zvcm0nKVxuICAgICAgICAgICAgLnNlcmlhbGl6ZUFycmF5KCk7XG5cbiAgICAgICAgJC5wb3N0KHtcbiAgICAgICAgICAgICAgICB1cmw6IFwic2VuZC5waHBcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogbWFpbE9iamVjdFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RvbmU6ICcsIHJlcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Vycm9yOiAnLCBlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnZm9ybScpXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoMClcbiAgICAgICAgICAgICAgICAgICAgLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgJCgnI3RoYW5rc01vZGFsJylcbiAgICAgICAgICAgICAgICAgICAgLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgICAgICAgICAgICAgICAkKCdzZWN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZmluaXNoZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfSk7IiwiLyohIGpzc29jaWFscyAtIHYxLjQuMCAtIDIwMTYtMTAtMTBcbiAqIGh0dHA6Ly9qcy1zb2NpYWxzLmNvbVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEFydGVtIFRhYmFsaW47IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24od2luZG93LCAkLCB1bmRlZmluZWQpIHtcbiAgdmFyIEpTU09DSUFMUyA9ICdKU1NvY2lhbHMnLFxuICAgIEpTU09DSUFMU19EQVRBX0tFWSA9IEpTU09DSUFMUztcblxuICB2YXIgZ2V0T3JBcHBseSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgaWYgKCQuaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5hcHBseShjb250ZXh0LCAkLm1ha2VBcnJheShhcmd1bWVudHMpLnNsaWNlKDIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIHZhciBJTUdfU1JDX1JFR0VYID0gLyhcXC4oanBlZ3xwbmd8Z2lmfGJtcHxzdmcpJHxeZGF0YTppbWFnZVxcLyhqcGVnfHBuZ3xnaWZ8Ym1wfHN2Z1xcK3htbCk7YmFzZTY0KS9pO1xuICB2YXIgVVJMX1BBUkFNU19SRUdFWCA9IC8oJj9bYS16QS1aMC05XSs9KT9cXHsoW2EtekEtWjAtOV0rKVxcfS9nO1xuXG4gIHZhciBNRUFTVVJFUyA9IHtcbiAgICBHOiAxMDAwMDAwMDAwLFxuICAgIE06IDEwMDAwMDAsXG4gICAgSzogMTAwMFxuICB9O1xuXG4gIHZhciBzaGFyZXMgPSB7fTtcblxuICBmdW5jdGlvbiBTb2NpYWxzKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cbiAgICAkZWxlbWVudC5kYXRhKEpTU09DSUFMU19EQVRBX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLl8kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgdGhpcy5zaGFyZXMgPSBbXTtcblxuICAgIHRoaXMuX2luaXQoY29uZmlnKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIFNvY2lhbHMucHJvdG90eXBlID0ge1xuICAgIHVybDogJycsXG4gICAgdGV4dDogJycsXG4gICAgc2hhcmVJbjogJ2JsYW5rJyxcblxuICAgIHNob3dMYWJlbDogZnVuY3Rpb24oc2NyZWVuV2lkdGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dDb3VudCA9PT0gZmFsc2VcbiAgICAgICAgPyBzY3JlZW5XaWR0aCA+IHRoaXMuc21hbGxTY3JlZW5XaWR0aFxuICAgICAgICA6IHNjcmVlbldpZHRoID49IHRoaXMubGFyZ2VTY3JlZW5XaWR0aDtcbiAgICB9LFxuXG4gICAgc2hvd0NvdW50OiBmdW5jdGlvbihzY3JlZW5XaWR0aCkge1xuICAgICAgcmV0dXJuIHNjcmVlbldpZHRoIDw9IHRoaXMuc21hbGxTY3JlZW5XaWR0aCA/ICdpbnNpZGUnIDogdHJ1ZTtcbiAgICB9LFxuXG4gICAgc21hbGxTY3JlZW5XaWR0aDogNjQwLFxuICAgIGxhcmdlU2NyZWVuV2lkdGg6IDEwMjQsXG5cbiAgICByZXNpemVUaW1lb3V0OiAyMDAsXG5cbiAgICBlbGVtZW50Q2xhc3M6ICdqc3NvY2lhbHMnLFxuICAgIHNoYXJlc0NsYXNzOiAnanNzb2NpYWxzLXNoYXJlcycsXG4gICAgc2hhcmVDbGFzczogJ2pzc29jaWFscy1zaGFyZScsXG4gICAgc2hhcmVCdXR0b25DbGFzczogJ2pzc29jaWFscy1zaGFyZS1idXR0b24nLFxuICAgIHNoYXJlTGlua0NsYXNzOiAnanNzb2NpYWxzLXNoYXJlLWxpbmsnLFxuICAgIHNoYXJlTG9nb0NsYXNzOiAnanNzb2NpYWxzLXNoYXJlLWxvZ28nLFxuICAgIHNoYXJlTGFiZWxDbGFzczogJ2pzc29jaWFscy1zaGFyZS1sYWJlbCcsXG4gICAgc2hhcmVMaW5rQ291bnRDbGFzczogJ2pzc29jaWFscy1zaGFyZS1saW5rLWNvdW50JyxcbiAgICBzaGFyZUNvdW50Qm94Q2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtY291bnQtYm94JyxcbiAgICBzaGFyZUNvdW50Q2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtY291bnQnLFxuICAgIHNoYXJlWmVyb0NvdW50Q2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtbm8tY291bnQnLFxuXG4gICAgX2luaXQ6IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgdGhpcy5faW5pdERlZmF1bHRzKCk7XG4gICAgICAkLmV4dGVuZCh0aGlzLCBjb25maWcpO1xuICAgICAgdGhpcy5faW5pdFNoYXJlcygpO1xuICAgICAgdGhpcy5fYXR0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgX2luaXREZWZhdWx0czogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgdGhpcy50ZXh0ID0gJC50cmltKFxuICAgICAgICAkKCdtZXRhW25hbWU9ZGVzY3JpcHRpb25dJykuYXR0cignY29udGVudCcpIHx8ICQoJ3RpdGxlJykudGV4dCgpXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBfaW5pdFNoYXJlczogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNoYXJlcyA9ICQubWFwKFxuICAgICAgICB0aGlzLnNoYXJlcyxcbiAgICAgICAgJC5wcm94eShmdW5jdGlvbihzaGFyZUNvbmZpZykge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc2hhcmVDb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzaGFyZUNvbmZpZyA9IHsgc2hhcmU6IHNoYXJlQ29uZmlnIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHNoYXJlID0gc2hhcmVDb25maWcuc2hhcmUgJiYgc2hhcmVzW3NoYXJlQ29uZmlnLnNoYXJlXTtcblxuICAgICAgICAgIGlmICghc2hhcmUgJiYgIXNoYXJlQ29uZmlnLnJlbmRlcmVyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIlNoYXJlICdcIiArIHNoYXJlQ29uZmlnLnNoYXJlICsgXCInIGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJC5leHRlbmQoXG4gICAgICAgICAgICB7IHVybDogdGhpcy51cmwsIHRleHQ6IHRoaXMudGV4dCB9LFxuICAgICAgICAgICAgc2hhcmUsXG4gICAgICAgICAgICBzaGFyZUNvbmZpZ1xuICAgICAgICAgICk7XG4gICAgICAgIH0sIHRoaXMpXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBfYXR0YWNoV2luZG93UmVzaXplQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAkLnByb3h5KHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIsIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZScsIHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBfd2luZG93UmVzaXplSGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuc2hvd0xhYmVsKSB8fCAkLmlzRnVuY3Rpb24odGhpcy5zaG93Q291bnQpKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcmVzaXplVGltZXIpO1xuICAgICAgICB0aGlzLl9yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgJC5wcm94eSh0aGlzLnJlZnJlc2gsIHRoaXMpLFxuICAgICAgICAgIHRoaXMucmVzaXplVGltZW91dFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgIHRoaXMuX2RlZmluZU9wdGlvbnNCeVNjcmVlbigpO1xuXG4gICAgICB0aGlzLl8kZWxlbWVudC5hZGRDbGFzcyh0aGlzLmVsZW1lbnRDbGFzcyk7XG5cbiAgICAgIHRoaXMuXyRzaGFyZXMgPSAkKCc8ZGl2PicpXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlc0NsYXNzKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy5fJGVsZW1lbnQpO1xuXG4gICAgICB0aGlzLl9yZW5kZXJTaGFyZXMoKTtcbiAgICB9LFxuXG4gICAgX2RlZmluZU9wdGlvbnNCeVNjcmVlbjogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9zY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgdGhpcy5fc2hvd0xhYmVsID0gZ2V0T3JBcHBseSh0aGlzLnNob3dMYWJlbCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgICAgdGhpcy5fc2hvd0NvdW50ID0gZ2V0T3JBcHBseSh0aGlzLnNob3dDb3VudCwgdGhpcywgdGhpcy5fc2NyZWVuV2lkdGgpO1xuICAgIH0sXG5cbiAgICBfcmVuZGVyU2hhcmVzOiBmdW5jdGlvbigpIHtcbiAgICAgICQuZWFjaChcbiAgICAgICAgdGhpcy5zaGFyZXMsXG4gICAgICAgICQucHJveHkoZnVuY3Rpb24oXywgc2hhcmUpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJTaGFyZShzaGFyZSk7XG4gICAgICAgIH0sIHRoaXMpXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBfcmVuZGVyU2hhcmU6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgJHNoYXJlO1xuXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNoYXJlLnJlbmRlcmVyKSkge1xuICAgICAgICAkc2hhcmUgPSAkKHNoYXJlLnJlbmRlcmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNoYXJlID0gdGhpcy5fY3JlYXRlU2hhcmUoc2hhcmUpO1xuICAgICAgfVxuXG4gICAgICAkc2hhcmVcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVDbGFzcylcbiAgICAgICAgLmFkZENsYXNzKHNoYXJlLnNoYXJlID8gJ2pzc29jaWFscy1zaGFyZS0nICsgc2hhcmUuc2hhcmUgOiAnJylcbiAgICAgICAgLmFkZENsYXNzKHNoYXJlLmNzcylcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuXyRzaGFyZXMpO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmU6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgJHJlc3VsdCA9ICQoJzxkaXY+Jyk7XG4gICAgICB2YXIgJHNoYXJlTGluayA9IHRoaXMuX2NyZWF0ZVNoYXJlTGluayhzaGFyZSkuYXBwZW5kVG8oJHJlc3VsdCk7XG5cbiAgICAgIGlmICh0aGlzLl9zaG93Q291bnQpIHtcbiAgICAgICAgdmFyIGlzSW5zaWRlQ291bnQgPSB0aGlzLl9zaG93Q291bnQgPT09ICdpbnNpZGUnO1xuICAgICAgICB2YXIgJGNvdW50Q29udGFpbmVyID0gaXNJbnNpZGVDb3VudFxuICAgICAgICAgID8gJHNoYXJlTGlua1xuICAgICAgICAgIDogJCgnPGRpdj4nKS5hZGRDbGFzcyh0aGlzLnNoYXJlQ291bnRCb3hDbGFzcykuYXBwZW5kVG8oJHJlc3VsdCk7XG4gICAgICAgICRjb3VudENvbnRhaW5lci5hZGRDbGFzcyhcbiAgICAgICAgICBpc0luc2lkZUNvdW50ID8gdGhpcy5zaGFyZUxpbmtDb3VudENsYXNzIDogdGhpcy5zaGFyZUNvdW50Qm94Q2xhc3NcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyU2hhcmVDb3VudChzaGFyZSwgJGNvdW50Q29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZUxpbms6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgc2hhcmVTdHJhdGVneSA9IHRoaXMuX2dldFNoYXJlU3RyYXRlZ3koc2hhcmUpO1xuXG4gICAgICB2YXIgJHJlc3VsdCA9IHNoYXJlU3RyYXRlZ3kuY2FsbChzaGFyZSwge1xuICAgICAgICBzaGFyZVVybDogdGhpcy5fZ2V0U2hhcmVVcmwoc2hhcmUpXG4gICAgICB9KTtcblxuICAgICAgJHJlc3VsdFxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZUxpbmtDbGFzcylcbiAgICAgICAgLmFwcGVuZCh0aGlzLl9jcmVhdGVTaGFyZUxvZ28oc2hhcmUpKTtcblxuICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCkge1xuICAgICAgICAkcmVzdWx0LmFwcGVuZCh0aGlzLl9jcmVhdGVTaGFyZUxhYmVsKHNoYXJlKSk7XG4gICAgICB9XG5cbiAgICAgICQuZWFjaCh0aGlzLm9uIHx8IHt9LCBmdW5jdGlvbihldmVudCwgaGFuZGxlcikge1xuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgICAgICAgJHJlc3VsdC5vbihldmVudCwgJC5wcm94eShoYW5kbGVyLCBzaGFyZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfSxcblxuICAgIF9nZXRTaGFyZVN0cmF0ZWd5OiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHNoYXJlU3RyYXRlZ2llc1tzaGFyZS5zaGFyZUluIHx8IHRoaXMuc2hhcmVJbl07XG5cbiAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICB0aHJvdyBFcnJvcihcIlNoYXJlIHN0cmF0ZWd5ICdcIiArIHRoaXMuc2hhcmVJbiArIFwiJyBub3QgZm91bmRcIik7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIF9nZXRTaGFyZVVybDogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciBzaGFyZVVybCA9IGdldE9yQXBwbHkoc2hhcmUuc2hhcmVVcmwsIHNoYXJlKTtcbiAgICAgIHJldHVybiB0aGlzLl9mb3JtYXRTaGFyZVVybChzaGFyZVVybCwgc2hhcmUpO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMb2dvOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyIGxvZ28gPSBzaGFyZS5sb2dvO1xuXG4gICAgICB2YXIgJHJlc3VsdCA9IElNR19TUkNfUkVHRVgudGVzdChsb2dvKVxuICAgICAgICA/ICQoJzxpbWc+JykuYXR0cignc3JjJywgc2hhcmUubG9nbylcbiAgICAgICAgOiAkKCc8aT4nKS5hZGRDbGFzcyhsb2dvKTtcblxuICAgICAgJHJlc3VsdC5hZGRDbGFzcyh0aGlzLnNoYXJlTG9nb0NsYXNzKTtcblxuICAgICAgcmV0dXJuICRyZXN1bHQ7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZUxhYmVsOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgcmV0dXJuICQoJzxzcGFuPicpLmFkZENsYXNzKHRoaXMuc2hhcmVMYWJlbENsYXNzKS50ZXh0KHNoYXJlLmxhYmVsKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlQ291bnQ6IGZ1bmN0aW9uKHNoYXJlLCAkY29udGFpbmVyKSB7XG4gICAgICB2YXIgJGNvdW50ID0gJCgnPHNwYW4+JykuYWRkQ2xhc3ModGhpcy5zaGFyZUNvdW50Q2xhc3MpO1xuXG4gICAgICAkY29udGFpbmVyLmFkZENsYXNzKHRoaXMuc2hhcmVaZXJvQ291bnRDbGFzcykuYXBwZW5kKCRjb3VudCk7XG5cbiAgICAgIHRoaXMuX2xvYWRDb3VudChzaGFyZSkuZG9uZShcbiAgICAgICAgJC5wcm94eShmdW5jdGlvbihjb3VudCkge1xuICAgICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDbGFzcyh0aGlzLnNoYXJlWmVyb0NvdW50Q2xhc3MpO1xuICAgICAgICAgICAgJGNvdW50LnRleHQoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcylcbiAgICAgICk7XG4gICAgfSxcblxuICAgIF9sb2FkQ291bnQ6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICB2YXIgY291bnRVcmwgPSB0aGlzLl9nZXRDb3VudFVybChzaGFyZSk7XG5cbiAgICAgIGlmICghY291bnRVcmwpIHtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoMCkucHJvbWlzZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGFuZGxlU3VjY2VzcyA9ICQucHJveHkoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzLl9nZXRDb3VudFZhbHVlKHJlc3BvbnNlLCBzaGFyZSkpO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICQuZ2V0SlNPTihjb3VudFVybCkuZG9uZShoYW5kbGVTdWNjZXNzKS5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAkLmdldChjb3VudFVybCkuZG9uZShoYW5kbGVTdWNjZXNzKS5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIF9nZXRDb3VudFVybDogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciBjb3VudFVybCA9IGdldE9yQXBwbHkoc2hhcmUuY291bnRVcmwsIHNoYXJlKTtcbiAgICAgIHJldHVybiB0aGlzLl9mb3JtYXRTaGFyZVVybChjb3VudFVybCwgc2hhcmUpO1xuICAgIH0sXG5cbiAgICBfZ2V0Q291bnRWYWx1ZTogZnVuY3Rpb24ocmVzcG9uc2UsIHNoYXJlKSB7XG4gICAgICB2YXIgY291bnQgPVxuICAgICAgICAoJC5pc0Z1bmN0aW9uKHNoYXJlLmdldENvdW50KSA/IHNoYXJlLmdldENvdW50KHJlc3BvbnNlKSA6IHJlc3BvbnNlKSB8fFxuICAgICAgICAwO1xuICAgICAgcmV0dXJuIHR5cGVvZiBjb3VudCA9PT0gJ3N0cmluZycgPyBjb3VudCA6IHRoaXMuX2Zvcm1hdE51bWJlcihjb3VudCk7XG4gICAgfSxcblxuICAgIF9mb3JtYXROdW1iZXI6IGZ1bmN0aW9uKG51bWJlcikge1xuICAgICAgJC5lYWNoKE1FQVNVUkVTLCBmdW5jdGlvbihsZXR0ZXIsIHZhbHVlKSB7XG4gICAgICAgIGlmIChudW1iZXIgPj0gdmFsdWUpIHtcbiAgICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KChudW1iZXIgLyB2YWx1ZSkudG9GaXhlZCgyKSkgKyBsZXR0ZXI7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9LFxuXG4gICAgX2Zvcm1hdFNoYXJlVXJsOiBmdW5jdGlvbih1cmwsIHNoYXJlKSB7XG4gICAgICByZXR1cm4gdXJsLnJlcGxhY2UoVVJMX1BBUkFNU19SRUdFWCwgZnVuY3Rpb24obWF0Y2gsIGtleSwgZmllbGQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc2hhcmVbZmllbGRdIHx8ICcnO1xuICAgICAgICByZXR1cm4gdmFsdWUgPyAoa2V5IHx8ICcnKSArIHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogJyc7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2NsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fcmVzaXplVGltZXIpO1xuICAgICAgdGhpcy5fJGVsZW1lbnQuZW1wdHkoKTtcbiAgICB9LFxuXG4gICAgX3Bhc3NPcHRpb25Ub1NoYXJlczogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIHNoYXJlcyA9IHRoaXMuc2hhcmVzO1xuXG4gICAgICAkLmVhY2goWyd1cmwnLCAndGV4dCddLCBmdW5jdGlvbihfLCBvcHRpb25OYW1lKSB7XG4gICAgICAgIGlmIChvcHRpb25OYW1lICE9PSBrZXkpIHJldHVybjtcblxuICAgICAgICAkLmVhY2goc2hhcmVzLCBmdW5jdGlvbihfLCBzaGFyZSkge1xuICAgICAgICAgIHNoYXJlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgX25vcm1hbGl6ZVNoYXJlOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgaWYgKCQuaXNOdW1lcmljKHNoYXJlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZXNbc2hhcmVdO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNoYXJlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gJC5ncmVwKHRoaXMuc2hhcmVzLCBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgcmV0dXJuIHMuc2hhcmUgPT09IHNoYXJlO1xuICAgICAgICB9KVswXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNoYXJlO1xuICAgIH0sXG5cbiAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH0sXG5cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICB0aGlzLl9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuXG4gICAgICB0aGlzLl8kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Q2xhc3MpXG4gICAgICAgIC5yZW1vdmVEYXRhKEpTU09DSUFMU19EQVRBX0tFWSk7XG4gICAgfSxcblxuICAgIG9wdGlvbjogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1trZXldID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuX3Bhc3NPcHRpb25Ub1NoYXJlcyhrZXksIHZhbHVlKTtcblxuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfSxcblxuICAgIHNoYXJlT3B0aW9uOiBmdW5jdGlvbihzaGFyZSwga2V5LCB2YWx1ZSkge1xuICAgICAgc2hhcmUgPSB0aGlzLl9ub3JtYWxpemVTaGFyZShzaGFyZSk7XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJldHVybiBzaGFyZVtrZXldO1xuICAgICAgfVxuXG4gICAgICBzaGFyZVtrZXldID0gdmFsdWU7XG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gIH07XG5cbiAgJC5mbi5qc1NvY2lhbHMgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICB2YXIgYXJncyA9ICQubWFrZUFycmF5KGFyZ3VtZW50cyksXG4gICAgICBtZXRob2RBcmdzID0gYXJncy5zbGljZSgxKSxcbiAgICAgIHJlc3VsdCA9IHRoaXM7XG5cbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICBpbnN0YW5jZSA9ICRlbGVtZW50LmRhdGEoSlNTT0NJQUxTX0RBVEFfS0VZKSxcbiAgICAgICAgbWV0aG9kUmVzdWx0O1xuXG4gICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgbWV0aG9kUmVzdWx0ID0gaW5zdGFuY2VbY29uZmlnXS5hcHBseShpbnN0YW5jZSwgbWV0aG9kQXJncyk7XG4gICAgICAgICAgaWYgKG1ldGhvZFJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIG1ldGhvZFJlc3VsdCAhPT0gaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG1ldGhvZFJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UuX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG4gICAgICAgICAgaW5zdGFuY2UuX2luaXQoY29uZmlnKTtcbiAgICAgICAgICBpbnN0YW5jZS5fcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBTb2NpYWxzKCRlbGVtZW50LCBjb25maWcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB2YXIgc2V0RGVmYXVsdHMgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICB2YXIgY29tcG9uZW50O1xuXG4gICAgaWYgKCQuaXNQbGFpbk9iamVjdChjb25maWcpKSB7XG4gICAgICBjb21wb25lbnQgPSBTb2NpYWxzLnByb3RvdHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50ID0gc2hhcmVzW2NvbmZpZ107XG4gICAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgfVxuXG4gICAgJC5leHRlbmQoY29tcG9uZW50LCBjb25maWcpO1xuICB9O1xuXG4gIHZhciBzaGFyZVN0cmF0ZWdpZXMgPSB7XG4gICAgcG9wdXA6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKCc8YT4nKS5hdHRyKCdocmVmJywgJyMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93Lm9wZW4oXG4gICAgICAgICAgYXJncy5zaGFyZVVybCxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgICd3aWR0aD02MDAsIGhlaWdodD00MDAsIGxvY2F0aW9uPTAsIG1lbnViYXI9MCwgcmVzaXplYWJsZT0wLCBzY3JvbGxiYXJzPTAsIHN0YXR1cz0wLCB0aXRsZWJhcj0wLCB0b29sYmFyPTAnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBibGFuazogZnVuY3Rpb24oYXJncykge1xuICAgICAgcmV0dXJuICQoJzxhPicpLmF0dHIoeyB0YXJnZXQ6ICdfYmxhbmsnLCBocmVmOiBhcmdzLnNoYXJlVXJsIH0pO1xuICAgIH0sXG5cbiAgICBzZWxmOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICByZXR1cm4gJCgnPGE+JykuYXR0cih7IHRhcmdldDogJ19zZWxmJywgaHJlZjogYXJncy5zaGFyZVVybCB9KTtcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmpzU29jaWFscyA9IHtcbiAgICBTb2NpYWxzOiBTb2NpYWxzLFxuICAgIHNoYXJlczogc2hhcmVzLFxuICAgIHNoYXJlU3RyYXRlZ2llczogc2hhcmVTdHJhdGVnaWVzLFxuICAgIHNldERlZmF1bHRzOiBzZXREZWZhdWx0c1xuICB9O1xufSkod2luZG93LCBqUXVlcnkpO1xuXG4oZnVuY3Rpb24od2luZG93LCAkLCBqc1NvY2lhbHMsIHVuZGVmaW5lZCkge1xuICAkLmV4dGVuZChqc1NvY2lhbHMuc2hhcmVzLCB7XG4gICAgZW1haWw6IHtcbiAgICAgIGxhYmVsOiAnRS1tYWlsJyxcbiAgICAgIGxvZ286ICdmYSBmYS1hdCcsXG4gICAgICBzaGFyZVVybDogJ21haWx0bzp7dG99P3N1YmplY3Q9e3RleHR9JmJvZHk9e3VybH0nLFxuICAgICAgY291bnRVcmw6ICcnLFxuICAgICAgc2hhcmVJbjogJ3NlbGYnXG4gICAgfSxcblxuICAgIHR3aXR0ZXI6IHtcbiAgICAgIGxhYmVsOiAnVHdlZXQnLFxuICAgICAgbG9nbzogJ2ZhIGZhLXR3aXR0ZXInLFxuICAgICAgc2hhcmVVcmw6XG4gICAgICAgICdodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlP3VybD17dXJsfSZ0ZXh0PXt0ZXh0fSZ2aWE9e3ZpYX0maGFzaHRhZ3M9e2hhc2h0YWdzfScsXG4gICAgICBjb3VudFVybDogJydcbiAgICB9LFxuXG4gICAgZmFjZWJvb2s6IHtcbiAgICAgIGxhYmVsOiAnTGlrZScsXG4gICAgICBsb2dvOiAnZmEgZmEtZmFjZWJvb2snLFxuICAgICAgc2hhcmVVcmw6ICdodHRwczovL2ZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PXt1cmx9JyxcbiAgICAgIGNvdW50VXJsOiAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vP2lkPXt1cmx9JyxcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJldHVybiAoZGF0YS5zaGFyZSAmJiBkYXRhLnNoYXJlLnNoYXJlX2NvdW50KSB8fCAwO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB2a29udGFrdGU6IHtcbiAgICAgIGxhYmVsOiAnTGlrZScsXG4gICAgICBsb2dvOiAnZmEgZmEtdmsnLFxuICAgICAgc2hhcmVVcmw6XG4gICAgICAgICdodHRwczovL3ZrLmNvbS9zaGFyZS5waHA/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX0mZGVzY3JpcHRpb249e3RleHR9JyxcbiAgICAgIGNvdW50VXJsOiAnaHR0cHM6Ly92ay5jb20vc2hhcmUucGhwP2FjdD1jb3VudCZpbmRleD0xJnVybD17dXJsfScsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZGF0YS5zbGljZSgxNSwgLTIpLnNwbGl0KCcsICcpWzFdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ29vZ2xlcGx1czoge1xuICAgICAgbGFiZWw6ICcrMScsXG4gICAgICBsb2dvOiAnZmEgZmEtZ29vZ2xlJyxcbiAgICAgIHNoYXJlVXJsOiAnaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPXt1cmx9JyxcbiAgICAgIGNvdW50VXJsOiAnJ1xuICAgIH0sXG5cbiAgICBsaW5rZWRpbjoge1xuICAgICAgbGFiZWw6ICdTaGFyZScsXG4gICAgICBsb2dvOiAnZmEgZmEtbGlua2VkaW4nLFxuICAgICAgc2hhcmVVcmw6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSZ1cmw9e3VybH0nLFxuICAgICAgY291bnRVcmw6XG4gICAgICAgICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vY291bnRzZXJ2L2NvdW50L3NoYXJlP2Zvcm1hdD1qc29ucCZ1cmw9e3VybH0mY2FsbGJhY2s9PycsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5jb3VudDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcGludGVyZXN0OiB7XG4gICAgICBsYWJlbDogJ1BpbiBpdCcsXG4gICAgICBsb2dvOiAnZmEgZmEtcGludGVyZXN0JyxcbiAgICAgIHNoYXJlVXJsOlxuICAgICAgICAnaHR0cHM6Ly9waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYm9va21hcmtsZXQvP21lZGlhPXttZWRpYX0mdXJsPXt1cmx9JmRlc2NyaXB0aW9uPXt0ZXh0fScsXG4gICAgICBjb3VudFVybDpcbiAgICAgICAgJ2h0dHBzOi8vYXBpLnBpbnRlcmVzdC5jb20vdjEvdXJscy9jb3VudC5qc29uPyZ1cmw9e3VybH0mY2FsbGJhY2s9PycsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YS5jb3VudDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3R1bWJsZXVwb246IHtcbiAgICAgIGxhYmVsOiAnU2hhcmUnLFxuICAgICAgbG9nbzogJ2ZhIGZhLXN0dW1ibGV1cG9uJyxcbiAgICAgIHNoYXJlVXJsOiAnaHR0cDovL3d3dy5zdHVtYmxldXBvbi5jb20vc3VibWl0P3VybD17dXJsfSZ0aXRsZT17dGl0bGV9JyxcbiAgICAgIGNvdW50VXJsOlxuICAgICAgICAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly93d3cuc3R1bWJsZXVwb24uY29tL3NlcnZpY2VzLzEuMDEvYmFkZ2UuZ2V0aW5mbz91cmw9e3VybH0nXG4gICAgICAvLyBnZXRDb3VudDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgLy8gICByZXR1cm4gZGF0YS5yZXN1bHQudmlld3M7XG4gICAgICAvLyB9XG4gICAgfSxcblxuICAgIHRlbGVncmFtOiB7XG4gICAgICBsYWJlbDogJ1RlbGVncmFtJyxcbiAgICAgIGxvZ286ICdmYSBmYS1wYXBlci1wbGFuZScsXG4gICAgICBzaGFyZVVybDogJ3RnOi8vbXNnP3RleHQ9e3VybH0ge3RleHR9JyxcbiAgICAgIGNvdW50VXJsOiAnJyxcbiAgICAgIHNoYXJlSW46ICdzZWxmJ1xuICAgIH0sXG5cbiAgICB3aGF0c2FwcDoge1xuICAgICAgbGFiZWw6ICdXaGF0c0FwcCcsXG4gICAgICBsb2dvOiAnZmEgZmEtd2hhdHNhcHAnLFxuICAgICAgc2hhcmVVcmw6ICd3aGF0c2FwcDovL3NlbmQ/dGV4dD17dXJsfSB7dGV4dH0nLFxuICAgICAgY291bnRVcmw6ICcnLFxuICAgICAgc2hhcmVJbjogJ3NlbGYnXG4gICAgfSxcblxuICAgIGxpbmU6IHtcbiAgICAgIGxhYmVsOiAnTElORScsXG4gICAgICBsb2dvOiAnZmEgZmEtY29tbWVudCcsXG4gICAgICBzaGFyZVVybDogJ2h0dHA6Ly9saW5lLm1lL1IvbXNnL3RleHQvP3t0ZXh0fSB7dXJsfScsXG4gICAgICBjb3VudFVybDogJydcbiAgICB9LFxuXG4gICAgdmliZXI6IHtcbiAgICAgIGxhYmVsOiAnVmliZXInLFxuICAgICAgbG9nbzogJ2ZhIGZhLXZvbHVtZS1jb250cm9sLXBob25lJyxcbiAgICAgIHNoYXJlVXJsOiAndmliZXI6Ly9mb3J3YXJkP3RleHQ9e3VybH0ge3RleHR9JyxcbiAgICAgIGNvdW50VXJsOiAnJyxcbiAgICAgIHNoYXJlSW46ICdzZWxmJ1xuICAgIH0sXG5cbiAgICBwb2NrZXQ6IHtcbiAgICAgIGxhYmVsOiAnUG9ja2V0JyxcbiAgICAgIGxvZ286ICdmYSBmYS1nZXQtcG9ja2V0JyxcbiAgICAgIHNoYXJlVXJsOiAnaHR0cHM6Ly9nZXRwb2NrZXQuY29tL3NhdmU/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX0nLFxuICAgICAgY291bnRVcmw6ICcnXG4gICAgfSxcblxuICAgIG1lc3Nlbmdlcjoge1xuICAgICAgbGFiZWw6ICdTaGFyZScsXG4gICAgICBsb2dvOiAnZmEgZmEtY29tbWVudGluZycsXG4gICAgICBzaGFyZVVybDogJ2ZiLW1lc3NlbmdlcjovL3NoYXJlP2xpbms9e3VybH0nLFxuICAgICAgY291bnRVcmw6ICcnLFxuICAgICAgc2hhcmVJbjogJ3NlbGYnXG4gICAgfVxuICB9KTtcbn0pKHdpbmRvdywgalF1ZXJ5LCB3aW5kb3cuanNTb2NpYWxzKTtcbiJdfQ==
