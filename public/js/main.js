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
// just send them to the contact form?
});

$('a').click(function() {
  var m = $(this).attr('href');
  if (m == '#moretop') {
    var dropdownChoice = $(this)
    .find('ul li a')
    .attr('href');
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

$('.col-xs-3.col-md-4').click(function() {
  var productTarget = $(this).find('a').attr('href');
  scrollToProductSection(productTarget);
});

function scrollToProductSection(selector) {
  // console.log(selector);
  $('.responsiveHeader').css({ visibility: 'hidden', display: 'none' });
  $('section').not(selector).css({ visibility: 'hidden', display: 'none' });
  $('section.products').css({
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gaGlkZU1haWwoKSB7XG4gIGNvbnNvbGUubG9nKCdvYmZ1c2NhdGlvbicpO1xuICB2YXIgdSA9ICd1c2VyJztcbiAgdmFyIGFyciA9ICdAJztcbiAgdmFyIGQgPSAnZG9tYWluJztcbiAgdmFyIGRvdCA9ICcuJztcbiAgdmFyIHQgPSAndGxkY2NjJztcbiAgLy8gZG9jdW1lbnQud3JpdGUoXCI8YSBocmVmPVwiICsgXCJtYWlsXCIgKyBcInRvOlwiICsgdSArIGFyciArIGQgKyBkb3QgKyB0ICtcbiAgLy8gICBcIj5cIiArIFwiRW1haWwgKGNvbmNhdGVuYXRpb24pXCIgKyBcIjwvYT5cIiArIFwiPGJyPlwiKTtcbn1cblxuJCgnLmZvb3RlclR4dC5jb2wtbWQtNC5jb2wtc20tMyBwJykuY2xpY2soZnVuY3Rpb24oKSB7XG4vLyBqdXN0IHNlbmQgdGhlbSB0byB0aGUgY29udGFjdCBmb3JtP1xufSk7XG5cbiQoJ2EnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdmFyIG0gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgaWYgKG0gPT0gJyNtb3JldG9wJykge1xuICAgIHZhciBkcm9wZG93bkNob2ljZSA9ICQodGhpcylcbiAgICAuZmluZCgndWwgbGkgYScpXG4gICAgLmF0dHIoJ2hyZWYnKTtcbiAgICAkKCdzZWN0aW9uJyArIGRyb3Bkb3duQ2hvaWNlKS5hbmltYXRlKFxuICAgICAge1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0sXG4gICAgICAnc2xvdycsXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgIH1cbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIG0gPT0gJyNwcm9kdWN0MScgfHxcbiAgICBtID09ICcjcHJvZHVjdDInIHx8XG4gICAgbSA9PSAnI3Byb2R1Y3QzJyB8fFxuICAgIG0gPT0gJyNwcm9kdWN0NCdcbiAgKSB7XG4gICAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihtKTtcbiAgfSBlbHNlIGlmIChtID09ICcjaG9tZScpIHtcbiAgICAkKCcjY29sbGFwc2VkTWVudS5pbicpLnJlbW92ZUNsYXNzKCdpbicpO1xuICAgICQoJ3NlY3Rpb24nKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICQoJ2Rpdi5wYWdlQm9keSBkaXYucmVzcG9uc2l2ZUhlYWRlcicpLmNzcyh7XG4gICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgfSk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgfSxcbiAgICAgICdzbG93JyxcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSBpZiAobSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKS5yZW1vdmVDbGFzcygnaW4nKTtcbiAgICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgJCgnc2VjdGlvbicpLm5vdChtKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICQoJ3NlY3Rpb24nICsgbSkuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJywgdmlzaWJpbGl0eTogJ3Zpc2libGUnIH0pO1xuICAgICQoJ3NlY3Rpb24nICsgbSkuYW5pbWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICB9LFxuICAgICAgJ3Nsb3cnLFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICB9XG4gICAgKTtcbiAgfVxufSk7XG5cbiQoJy5jb2wteHMtMy5jb2wtbWQtNCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB2YXIgcHJvZHVjdFRhcmdldCA9ICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcbiAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihwcm9kdWN0VGFyZ2V0KTtcbn0pO1xuXG5mdW5jdGlvbiBzY3JvbGxUb1Byb2R1Y3RTZWN0aW9uKHNlbGVjdG9yKSB7XG4gIC8vIGNvbnNvbGUubG9nKHNlbGVjdG9yKTtcbiAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uJykubm90KHNlbGVjdG9yKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAkKCdzZWN0aW9uLnByb2R1Y3RzJykuY3NzKHtcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgZGlzcGxheTogJ2Jsb2NrJ1xuICB9KTtcbiAgJCgnZGl2LnByb2R1Y3QnKS5ub3Qoc2VsZWN0b3IpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24nICsgc2VsZWN0b3IgKyAnLmNvbnRhaW5lci1mbHVpZC5wcm9kdWN0JykuY3NzKHtcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgZGlzcGxheTogJ2Jsb2NrJ1xuICB9KTtcbiAgJCgnI3Byb2R1Y3RzJykuYW5pbWF0ZShcbiAgICB7XG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9LFxuICAgICdzbG93JyxcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgfVxuICApO1xufSIsImxldCBtYWlsT2JqZWN0ID0ge307XG5cbiQoJ2Zvcm0nKS5vbignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIG1haWxPYmplY3QgPSAkKCdmb3JtJykuc2VyaWFsaXplQXJyYXkoKTtcblxuICAkLnBvc3Qoe1xuICAgIHVybDogXCJzZW5kLnBocFwiLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBkYXRhOiBtYWlsT2JqZWN0XG4gIH0pXG5cbiAgICAuZG9uZShmdW5jdGlvbihyZXMpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkb25lOiAnLCByZXMpO1xuICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2Vycm9yOiAnLCBlcnIpO1xuICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZmluaXNoZWQnKTtcbiAgICB9KTtcblxuICB9KTsiLCIvKiEganNzb2NpYWxzIC0gdjEuNC4wIC0gMjAxNi0xMC0xMFxuICogaHR0cDovL2pzLXNvY2lhbHMuY29tXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgQXJ0ZW0gVGFiYWxpbjsgTGljZW5zZWQgTUlUICovXG5cbihmdW5jdGlvbih3aW5kb3csICQsIHVuZGVmaW5lZCkge1xuICB2YXIgSlNTT0NJQUxTID0gJ0pTU29jaWFscycsXG4gICAgSlNTT0NJQUxTX0RBVEFfS0VZID0gSlNTT0NJQUxTO1xuXG4gIHZhciBnZXRPckFwcGx5ID0gZnVuY3Rpb24odmFsdWUsIGNvbnRleHQpIHtcbiAgICBpZiAoJC5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLmFwcGx5KGNvbnRleHQsICQubWFrZUFycmF5KGFyZ3VtZW50cykuc2xpY2UoMikpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgdmFyIElNR19TUkNfUkVHRVggPSAvKFxcLihqcGVnfHBuZ3xnaWZ8Ym1wfHN2ZykkfF5kYXRhOmltYWdlXFwvKGpwZWd8cG5nfGdpZnxibXB8c3ZnXFwreG1sKTtiYXNlNjQpL2k7XG4gIHZhciBVUkxfUEFSQU1TX1JFR0VYID0gLygmP1thLXpBLVowLTldKz0pP1xceyhbYS16QS1aMC05XSspXFx9L2c7XG5cbiAgdmFyIE1FQVNVUkVTID0ge1xuICAgIEc6IDEwMDAwMDAwMDAsXG4gICAgTTogMTAwMDAwMCxcbiAgICBLOiAxMDAwXG4gIH07XG5cbiAgdmFyIHNoYXJlcyA9IHt9O1xuXG4gIGZ1bmN0aW9uIFNvY2lhbHMoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcblxuICAgICRlbGVtZW50LmRhdGEoSlNTT0NJQUxTX0RBVEFfS0VZLCB0aGlzKTtcblxuICAgIHRoaXMuXyRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICB0aGlzLnNoYXJlcyA9IFtdO1xuXG4gICAgdGhpcy5faW5pdChjb25maWcpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgU29jaWFscy5wcm90b3R5cGUgPSB7XG4gICAgdXJsOiAnJyxcbiAgICB0ZXh0OiAnJyxcbiAgICBzaGFyZUluOiAnYmxhbmsnLFxuXG4gICAgc2hvd0xhYmVsOiBmdW5jdGlvbihzY3JlZW5XaWR0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2hvd0NvdW50ID09PSBmYWxzZVxuICAgICAgICA/IHNjcmVlbldpZHRoID4gdGhpcy5zbWFsbFNjcmVlbldpZHRoXG4gICAgICAgIDogc2NyZWVuV2lkdGggPj0gdGhpcy5sYXJnZVNjcmVlbldpZHRoO1xuICAgIH0sXG5cbiAgICBzaG93Q291bnQ6IGZ1bmN0aW9uKHNjcmVlbldpZHRoKSB7XG4gICAgICByZXR1cm4gc2NyZWVuV2lkdGggPD0gdGhpcy5zbWFsbFNjcmVlbldpZHRoID8gJ2luc2lkZScgOiB0cnVlO1xuICAgIH0sXG5cbiAgICBzbWFsbFNjcmVlbldpZHRoOiA2NDAsXG4gICAgbGFyZ2VTY3JlZW5XaWR0aDogMTAyNCxcblxuICAgIHJlc2l6ZVRpbWVvdXQ6IDIwMCxcblxuICAgIGVsZW1lbnRDbGFzczogJ2pzc29jaWFscycsXG4gICAgc2hhcmVzQ2xhc3M6ICdqc3NvY2lhbHMtc2hhcmVzJyxcbiAgICBzaGFyZUNsYXNzOiAnanNzb2NpYWxzLXNoYXJlJyxcbiAgICBzaGFyZUJ1dHRvbkNsYXNzOiAnanNzb2NpYWxzLXNoYXJlLWJ1dHRvbicsXG4gICAgc2hhcmVMaW5rQ2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtbGluaycsXG4gICAgc2hhcmVMb2dvQ2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtbG9nbycsXG4gICAgc2hhcmVMYWJlbENsYXNzOiAnanNzb2NpYWxzLXNoYXJlLWxhYmVsJyxcbiAgICBzaGFyZUxpbmtDb3VudENsYXNzOiAnanNzb2NpYWxzLXNoYXJlLWxpbmstY291bnQnLFxuICAgIHNoYXJlQ291bnRCb3hDbGFzczogJ2pzc29jaWFscy1zaGFyZS1jb3VudC1ib3gnLFxuICAgIHNoYXJlQ291bnRDbGFzczogJ2pzc29jaWFscy1zaGFyZS1jb3VudCcsXG4gICAgc2hhcmVaZXJvQ291bnRDbGFzczogJ2pzc29jaWFscy1zaGFyZS1uby1jb3VudCcsXG5cbiAgICBfaW5pdDogZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICB0aGlzLl9pbml0RGVmYXVsdHMoKTtcbiAgICAgICQuZXh0ZW5kKHRoaXMsIGNvbmZpZyk7XG4gICAgICB0aGlzLl9pbml0U2hhcmVzKCk7XG4gICAgICB0aGlzLl9hdHRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuICAgIH0sXG5cbiAgICBfaW5pdERlZmF1bHRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICB0aGlzLnRleHQgPSAkLnRyaW0oXG4gICAgICAgICQoJ21ldGFbbmFtZT1kZXNjcmlwdGlvbl0nKS5hdHRyKCdjb250ZW50JykgfHwgJCgndGl0bGUnKS50ZXh0KClcbiAgICAgICk7XG4gICAgfSxcblxuICAgIF9pbml0U2hhcmVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2hhcmVzID0gJC5tYXAoXG4gICAgICAgIHRoaXMuc2hhcmVzLFxuICAgICAgICAkLnByb3h5KGZ1bmN0aW9uKHNoYXJlQ29uZmlnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzaGFyZUNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHNoYXJlQ29uZmlnID0geyBzaGFyZTogc2hhcmVDb25maWcgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2hhcmUgPSBzaGFyZUNvbmZpZy5zaGFyZSAmJiBzaGFyZXNbc2hhcmVDb25maWcuc2hhcmVdO1xuXG4gICAgICAgICAgaWYgKCFzaGFyZSAmJiAhc2hhcmVDb25maWcucmVuZGVyZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiU2hhcmUgJ1wiICsgc2hhcmVDb25maWcuc2hhcmUgKyBcIicgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAkLmV4dGVuZChcbiAgICAgICAgICAgIHsgdXJsOiB0aGlzLnVybCwgdGV4dDogdGhpcy50ZXh0IH0sXG4gICAgICAgICAgICBzaGFyZSxcbiAgICAgICAgICAgIHNoYXJlQ29uZmlnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICk7XG4gICAgfSxcblxuICAgIF9hdHRhY2hXaW5kb3dSZXNpemVDYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICQucHJveHkodGhpcy5fd2luZG93UmVzaXplSGFuZGxlciwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplJywgdGhpcy5fd2luZG93UmVzaXplSGFuZGxlcik7XG4gICAgfSxcblxuICAgIF93aW5kb3dSZXNpemVIYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkLmlzRnVuY3Rpb24odGhpcy5zaG93TGFiZWwpIHx8ICQuaXNGdW5jdGlvbih0aGlzLnNob3dDb3VudCkpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lcik7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVRpbWVyID0gc2V0VGltZW91dChcbiAgICAgICAgICAkLnByb3h5KHRoaXMucmVmcmVzaCwgdGhpcyksXG4gICAgICAgICAgdGhpcy5yZXNpemVUaW1lb3V0XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIF9yZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fY2xlYXIoKTtcblxuICAgICAgdGhpcy5fZGVmaW5lT3B0aW9uc0J5U2NyZWVuKCk7XG5cbiAgICAgIHRoaXMuXyRlbGVtZW50LmFkZENsYXNzKHRoaXMuZWxlbWVudENsYXNzKTtcblxuICAgICAgdGhpcy5fJHNoYXJlcyA9ICQoJzxkaXY+JylcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVzQ2xhc3MpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLl8kZWxlbWVudCk7XG5cbiAgICAgIHRoaXMuX3JlbmRlclNoYXJlcygpO1xuICAgIH0sXG5cbiAgICBfZGVmaW5lT3B0aW9uc0J5U2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3NjcmVlbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICB0aGlzLl9zaG93TGFiZWwgPSBnZXRPckFwcGx5KHRoaXMuc2hvd0xhYmVsLCB0aGlzLCB0aGlzLl9zY3JlZW5XaWR0aCk7XG4gICAgICB0aGlzLl9zaG93Q291bnQgPSBnZXRPckFwcGx5KHRoaXMuc2hvd0NvdW50LCB0aGlzLCB0aGlzLl9zY3JlZW5XaWR0aCk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgJC5lYWNoKFxuICAgICAgICB0aGlzLnNoYXJlcyxcbiAgICAgICAgJC5wcm94eShmdW5jdGlvbihfLCBzaGFyZSkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlclNoYXJlKHNoYXJlKTtcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZTogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciAkc2hhcmU7XG5cbiAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2hhcmUucmVuZGVyZXIpKSB7XG4gICAgICAgICRzaGFyZSA9ICQoc2hhcmUucmVuZGVyZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2hhcmUgPSB0aGlzLl9jcmVhdGVTaGFyZShzaGFyZSk7XG4gICAgICB9XG5cbiAgICAgICRzaGFyZVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZUNsYXNzKVxuICAgICAgICAuYWRkQ2xhc3Moc2hhcmUuc2hhcmUgPyAnanNzb2NpYWxzLXNoYXJlLScgKyBzaGFyZS5zaGFyZSA6ICcnKVxuICAgICAgICAuYWRkQ2xhc3Moc2hhcmUuY3NzKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy5fJHNoYXJlcyk7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZTogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciAkcmVzdWx0ID0gJCgnPGRpdj4nKTtcbiAgICAgIHZhciAkc2hhcmVMaW5rID0gdGhpcy5fY3JlYXRlU2hhcmVMaW5rKHNoYXJlKS5hcHBlbmRUbygkcmVzdWx0KTtcblxuICAgICAgaWYgKHRoaXMuX3Nob3dDb3VudCkge1xuICAgICAgICB2YXIgaXNJbnNpZGVDb3VudCA9IHRoaXMuX3Nob3dDb3VudCA9PT0gJ2luc2lkZSc7XG4gICAgICAgIHZhciAkY291bnRDb250YWluZXIgPSBpc0luc2lkZUNvdW50XG4gICAgICAgICAgPyAkc2hhcmVMaW5rXG4gICAgICAgICAgOiAkKCc8ZGl2PicpLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudEJveENsYXNzKS5hcHBlbmRUbygkcmVzdWx0KTtcbiAgICAgICAgJGNvdW50Q29udGFpbmVyLmFkZENsYXNzKFxuICAgICAgICAgIGlzSW5zaWRlQ291bnQgPyB0aGlzLnNoYXJlTGlua0NvdW50Q2xhc3MgOiB0aGlzLnNoYXJlQ291bnRCb3hDbGFzc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl9yZW5kZXJTaGFyZUNvdW50KHNoYXJlLCAkY291bnRDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTGluazogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciBzaGFyZVN0cmF0ZWd5ID0gdGhpcy5fZ2V0U2hhcmVTdHJhdGVneShzaGFyZSk7XG5cbiAgICAgIHZhciAkcmVzdWx0ID0gc2hhcmVTdHJhdGVneS5jYWxsKHNoYXJlLCB7XG4gICAgICAgIHNoYXJlVXJsOiB0aGlzLl9nZXRTaGFyZVVybChzaGFyZSlcbiAgICAgIH0pO1xuXG4gICAgICAkcmVzdWx0XG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlTGlua0NsYXNzKVxuICAgICAgICAuYXBwZW5kKHRoaXMuX2NyZWF0ZVNoYXJlTG9nbyhzaGFyZSkpO1xuXG4gICAgICBpZiAodGhpcy5fc2hvd0xhYmVsKSB7XG4gICAgICAgICRyZXN1bHQuYXBwZW5kKHRoaXMuX2NyZWF0ZVNoYXJlTGFiZWwoc2hhcmUpKTtcbiAgICAgIH1cblxuICAgICAgJC5lYWNoKHRoaXMub24gfHwge30sIGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICgkLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICAgICAgICAkcmVzdWx0Lm9uKGV2ZW50LCAkLnByb3h5KGhhbmRsZXIsIHNoYXJlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2dldFNoYXJlU3RyYXRlZ3k6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gc2hhcmVTdHJhdGVnaWVzW3NoYXJlLnNoYXJlSW4gfHwgdGhpcy5zaGFyZUluXTtcblxuICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgIHRocm93IEVycm9yKFwiU2hhcmUgc3RyYXRlZ3kgJ1wiICsgdGhpcy5zaGFyZUluICsgXCInIG5vdCBmb3VuZFwiKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2dldFNoYXJlVXJsOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyIHNoYXJlVXJsID0gZ2V0T3JBcHBseShzaGFyZS5zaGFyZVVybCwgc2hhcmUpO1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdFNoYXJlVXJsKHNoYXJlVXJsLCBzaGFyZSk7XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFyZUxvZ286IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgbG9nbyA9IHNoYXJlLmxvZ287XG5cbiAgICAgIHZhciAkcmVzdWx0ID0gSU1HX1NSQ19SRUdFWC50ZXN0KGxvZ28pXG4gICAgICAgID8gJCgnPGltZz4nKS5hdHRyKCdzcmMnLCBzaGFyZS5sb2dvKVxuICAgICAgICA6ICQoJzxpPicpLmFkZENsYXNzKGxvZ28pO1xuXG4gICAgICAkcmVzdWx0LmFkZENsYXNzKHRoaXMuc2hhcmVMb2dvQ2xhc3MpO1xuXG4gICAgICByZXR1cm4gJHJlc3VsdDtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTGFiZWw6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICByZXR1cm4gJCgnPHNwYW4+JykuYWRkQ2xhc3ModGhpcy5zaGFyZUxhYmVsQ2xhc3MpLnRleHQoc2hhcmUubGFiZWwpO1xuICAgIH0sXG5cbiAgICBfcmVuZGVyU2hhcmVDb3VudDogZnVuY3Rpb24oc2hhcmUsICRjb250YWluZXIpIHtcbiAgICAgIHZhciAkY291bnQgPSAkKCc8c3Bhbj4nKS5hZGRDbGFzcyh0aGlzLnNoYXJlQ291bnRDbGFzcyk7XG5cbiAgICAgICRjb250YWluZXIuYWRkQ2xhc3ModGhpcy5zaGFyZVplcm9Db3VudENsYXNzKS5hcHBlbmQoJGNvdW50KTtcblxuICAgICAgdGhpcy5fbG9hZENvdW50KHNoYXJlKS5kb25lKFxuICAgICAgICAkLnByb3h5KGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNsYXNzKHRoaXMuc2hhcmVaZXJvQ291bnRDbGFzcyk7XG4gICAgICAgICAgICAkY291bnQudGV4dChjb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgX2xvYWRDb3VudDogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgIHZhciBjb3VudFVybCA9IHRoaXMuX2dldENvdW50VXJsKHNoYXJlKTtcblxuICAgICAgaWYgKCFjb3VudFVybCkge1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgwKS5wcm9taXNlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBoYW5kbGVTdWNjZXNzID0gJC5wcm94eShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMuX2dldENvdW50VmFsdWUocmVzcG9uc2UsIHNoYXJlKSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgICAgJC5nZXRKU09OKGNvdW50VXJsKS5kb25lKGhhbmRsZVN1Y2Nlc3MpLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICQuZ2V0KGNvdW50VXJsKS5kb25lKGhhbmRsZVN1Y2Nlc3MpLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgX2dldENvdW50VXJsOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyIGNvdW50VXJsID0gZ2V0T3JBcHBseShzaGFyZS5jb3VudFVybCwgc2hhcmUpO1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdFNoYXJlVXJsKGNvdW50VXJsLCBzaGFyZSk7XG4gICAgfSxcblxuICAgIF9nZXRDb3VudFZhbHVlOiBmdW5jdGlvbihyZXNwb25zZSwgc2hhcmUpIHtcbiAgICAgIHZhciBjb3VudCA9XG4gICAgICAgICgkLmlzRnVuY3Rpb24oc2hhcmUuZ2V0Q291bnQpID8gc2hhcmUuZ2V0Q291bnQocmVzcG9uc2UpIDogcmVzcG9uc2UpIHx8XG4gICAgICAgIDA7XG4gICAgICByZXR1cm4gdHlwZW9mIGNvdW50ID09PSAnc3RyaW5nJyA/IGNvdW50IDogdGhpcy5fZm9ybWF0TnVtYmVyKGNvdW50KTtcbiAgICB9LFxuXG4gICAgX2Zvcm1hdE51bWJlcjogZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgICAkLmVhY2goTUVBU1VSRVMsIGZ1bmN0aW9uKGxldHRlciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG51bWJlciA+PSB2YWx1ZSkge1xuICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoKG51bWJlciAvIHZhbHVlKS50b0ZpeGVkKDIpKSArIGxldHRlcjtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH0sXG5cbiAgICBfZm9ybWF0U2hhcmVVcmw6IGZ1bmN0aW9uKHVybCwgc2hhcmUpIHtcbiAgICAgIHJldHVybiB1cmwucmVwbGFjZShVUkxfUEFSQU1TX1JFR0VYLCBmdW5jdGlvbihtYXRjaCwga2V5LCBmaWVsZCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzaGFyZVtmaWVsZF0gfHwgJyc7XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IChrZXkgfHwgJycpICsgd2luZG93LmVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiAnJztcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lcik7XG4gICAgICB0aGlzLl8kZWxlbWVudC5lbXB0eSgpO1xuICAgIH0sXG5cbiAgICBfcGFzc09wdGlvblRvU2hhcmVzOiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgc2hhcmVzID0gdGhpcy5zaGFyZXM7XG5cbiAgICAgICQuZWFjaChbJ3VybCcsICd0ZXh0J10sIGZ1bmN0aW9uKF8sIG9wdGlvbk5hbWUpIHtcbiAgICAgICAgaWYgKG9wdGlvbk5hbWUgIT09IGtleSkgcmV0dXJuO1xuXG4gICAgICAgICQuZWFjaChzaGFyZXMsIGZ1bmN0aW9uKF8sIHNoYXJlKSB7XG4gICAgICAgICAgc2hhcmVba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfbm9ybWFsaXplU2hhcmU6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICBpZiAoJC5pc051bWVyaWMoc2hhcmUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlc1tzaGFyZV07XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2hhcmUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiAkLmdyZXAodGhpcy5zaGFyZXMsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy5zaGFyZSA9PT0gc2hhcmU7XG4gICAgICAgIH0pWzBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2hhcmU7XG4gICAgfSxcblxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfSxcblxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fY2xlYXIoKTtcbiAgICAgIHRoaXMuX2RldGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG5cbiAgICAgIHRoaXMuXyRlbGVtZW50XG4gICAgICAgIC5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRDbGFzcylcbiAgICAgICAgLnJlbW92ZURhdGEoSlNTT0NJQUxTX0RBVEFfS0VZKTtcbiAgICB9LFxuXG4gICAgb3B0aW9uOiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgICAgfVxuXG4gICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcblxuICAgICAgdGhpcy5fcGFzc09wdGlvblRvU2hhcmVzKGtleSwgdmFsdWUpO1xuXG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9LFxuXG4gICAgc2hhcmVPcHRpb246IGZ1bmN0aW9uKHNoYXJlLCBrZXksIHZhbHVlKSB7XG4gICAgICBzaGFyZSA9IHRoaXMuX25vcm1hbGl6ZVNoYXJlKHNoYXJlKTtcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIHNoYXJlW2tleV07XG4gICAgICB9XG5cbiAgICAgIHNoYXJlW2tleV0gPSB2YWx1ZTtcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbiAgfTtcblxuICAkLmZuLmpzU29jaWFscyA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgIHZhciBhcmdzID0gJC5tYWtlQXJyYXkoYXJndW1lbnRzKSxcbiAgICAgIG1ldGhvZEFyZ3MgPSBhcmdzLnNsaWNlKDEpLFxuICAgICAgcmVzdWx0ID0gdGhpcztcblxuICAgIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgIGluc3RhbmNlID0gJGVsZW1lbnQuZGF0YShKU1NPQ0lBTFNfREFUQV9LRVkpLFxuICAgICAgICBtZXRob2RSZXN1bHQ7XG5cbiAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBtZXRob2RSZXN1bHQgPSBpbnN0YW5jZVtjb25maWddLmFwcGx5KGluc3RhbmNlLCBtZXRob2RBcmdzKTtcbiAgICAgICAgICBpZiAobWV0aG9kUmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgbWV0aG9kUmVzdWx0ICE9PSBpbnN0YW5jZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbWV0aG9kUmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZS5fZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcbiAgICAgICAgICBpbnN0YW5jZS5faW5pdChjb25maWcpO1xuICAgICAgICAgIGluc3RhbmNlLl9yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IFNvY2lhbHMoJGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBzZXREZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgIHZhciBjb21wb25lbnQ7XG5cbiAgICBpZiAoJC5pc1BsYWluT2JqZWN0KGNvbmZpZykpIHtcbiAgICAgIGNvbXBvbmVudCA9IFNvY2lhbHMucHJvdG90eXBlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnQgPSBzaGFyZXNbY29uZmlnXTtcbiAgICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICB9XG5cbiAgICAkLmV4dGVuZChjb21wb25lbnQsIGNvbmZpZyk7XG4gIH07XG5cbiAgdmFyIHNoYXJlU3RyYXRlZ2llcyA9IHtcbiAgICBwb3B1cDogZnVuY3Rpb24oYXJncykge1xuICAgICAgcmV0dXJuICQoJzxhPicpLmF0dHIoJ2hyZWYnLCAnIycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cub3BlbihcbiAgICAgICAgICBhcmdzLnNoYXJlVXJsLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgJ3dpZHRoPTYwMCwgaGVpZ2h0PTQwMCwgbG9jYXRpb249MCwgbWVudWJhcj0wLCByZXNpemVhYmxlPTAsIHNjcm9sbGJhcnM9MCwgc3RhdHVzPTAsIHRpdGxlYmFyPTAsIHRvb2xiYXI9MCdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJsYW5rOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICByZXR1cm4gJCgnPGE+JykuYXR0cih7IHRhcmdldDogJ19ibGFuaycsIGhyZWY6IGFyZ3Muc2hhcmVVcmwgfSk7XG4gICAgfSxcblxuICAgIHNlbGY6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKCc8YT4nKS5hdHRyKHsgdGFyZ2V0OiAnX3NlbGYnLCBocmVmOiBhcmdzLnNoYXJlVXJsIH0pO1xuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuanNTb2NpYWxzID0ge1xuICAgIFNvY2lhbHM6IFNvY2lhbHMsXG4gICAgc2hhcmVzOiBzaGFyZXMsXG4gICAgc2hhcmVTdHJhdGVnaWVzOiBzaGFyZVN0cmF0ZWdpZXMsXG4gICAgc2V0RGVmYXVsdHM6IHNldERlZmF1bHRzXG4gIH07XG59KSh3aW5kb3csIGpRdWVyeSk7XG5cbihmdW5jdGlvbih3aW5kb3csICQsIGpzU29jaWFscywgdW5kZWZpbmVkKSB7XG4gICQuZXh0ZW5kKGpzU29jaWFscy5zaGFyZXMsIHtcbiAgICBlbWFpbDoge1xuICAgICAgbGFiZWw6ICdFLW1haWwnLFxuICAgICAgbG9nbzogJ2ZhIGZhLWF0JyxcbiAgICAgIHNoYXJlVXJsOiAnbWFpbHRvOnt0b30/c3ViamVjdD17dGV4dH0mYm9keT17dXJsfScsXG4gICAgICBjb3VudFVybDogJycsXG4gICAgICBzaGFyZUluOiAnc2VsZidcbiAgICB9LFxuXG4gICAgdHdpdHRlcjoge1xuICAgICAgbGFiZWw6ICdUd2VldCcsXG4gICAgICBsb2dvOiAnZmEgZmEtdHdpdHRlcicsXG4gICAgICBzaGFyZVVybDpcbiAgICAgICAgJ2h0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPXt1cmx9JnRleHQ9e3RleHR9JnZpYT17dmlhfSZoYXNodGFncz17aGFzaHRhZ3N9JyxcbiAgICAgIGNvdW50VXJsOiAnJ1xuICAgIH0sXG5cbiAgICBmYWNlYm9vazoge1xuICAgICAgbGFiZWw6ICdMaWtlJyxcbiAgICAgIGxvZ286ICdmYSBmYS1mYWNlYm9vaycsXG4gICAgICBzaGFyZVVybDogJ2h0dHBzOi8vZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9e3VybH0nLFxuICAgICAgY291bnRVcmw6ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8/aWQ9e3VybH0nLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIChkYXRhLnNoYXJlICYmIGRhdGEuc2hhcmUuc2hhcmVfY291bnQpIHx8IDA7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHZrb250YWt0ZToge1xuICAgICAgbGFiZWw6ICdMaWtlJyxcbiAgICAgIGxvZ286ICdmYSBmYS12aycsXG4gICAgICBzaGFyZVVybDpcbiAgICAgICAgJ2h0dHBzOi8vdmsuY29tL3NoYXJlLnBocD91cmw9e3VybH0mdGl0bGU9e3RpdGxlfSZkZXNjcmlwdGlvbj17dGV4dH0nLFxuICAgICAgY291bnRVcmw6ICdodHRwczovL3ZrLmNvbS9zaGFyZS5waHA/YWN0PWNvdW50JmluZGV4PTEmdXJsPXt1cmx9JyxcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChkYXRhLnNsaWNlKDE1LCAtMikuc3BsaXQoJywgJylbMV0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnb29nbGVwbHVzOiB7XG4gICAgICBsYWJlbDogJysxJyxcbiAgICAgIGxvZ286ICdmYSBmYS1nb29nbGUnLFxuICAgICAgc2hhcmVVcmw6ICdodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9e3VybH0nLFxuICAgICAgY291bnRVcmw6ICcnXG4gICAgfSxcblxuICAgIGxpbmtlZGluOiB7XG4gICAgICBsYWJlbDogJ1NoYXJlJyxcbiAgICAgIGxvZ286ICdmYSBmYS1saW5rZWRpbicsXG4gICAgICBzaGFyZVVybDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD17dXJsfScsXG4gICAgICBjb3VudFVybDpcbiAgICAgICAgJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9jb3VudHNlcnYvY291bnQvc2hhcmU/Zm9ybWF0PWpzb25wJnVybD17dXJsfSZjYWxsYmFjaz0/JyxcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNvdW50O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBwaW50ZXJlc3Q6IHtcbiAgICAgIGxhYmVsOiAnUGluIGl0JyxcbiAgICAgIGxvZ286ICdmYSBmYS1waW50ZXJlc3QnLFxuICAgICAgc2hhcmVVcmw6XG4gICAgICAgICdodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9ib29rbWFya2xldC8/bWVkaWE9e21lZGlhfSZ1cmw9e3VybH0mZGVzY3JpcHRpb249e3RleHR9JyxcbiAgICAgIGNvdW50VXJsOlxuICAgICAgICAnaHR0cHM6Ly9hcGkucGludGVyZXN0LmNvbS92MS91cmxzL2NvdW50Lmpzb24/JnVybD17dXJsfSZjYWxsYmFjaz0/JyxcbiAgICAgIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNvdW50O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHVtYmxldXBvbjoge1xuICAgICAgbGFiZWw6ICdTaGFyZScsXG4gICAgICBsb2dvOiAnZmEgZmEtc3R1bWJsZXVwb24nLFxuICAgICAgc2hhcmVVcmw6ICdodHRwOi8vd3d3LnN0dW1ibGV1cG9uLmNvbS9zdWJtaXQ/dXJsPXt1cmx9JnRpdGxlPXt0aXRsZX0nLFxuICAgICAgY291bnRVcmw6XG4gICAgICAgICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL3d3dy5zdHVtYmxldXBvbi5jb20vc2VydmljZXMvMS4wMS9iYWRnZS5nZXRpbmZvP3VybD17dXJsfSdcbiAgICAgIC8vIGdldENvdW50OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAvLyAgIHJldHVybiBkYXRhLnJlc3VsdC52aWV3cztcbiAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgdGVsZWdyYW06IHtcbiAgICAgIGxhYmVsOiAnVGVsZWdyYW0nLFxuICAgICAgbG9nbzogJ2ZhIGZhLXBhcGVyLXBsYW5lJyxcbiAgICAgIHNoYXJlVXJsOiAndGc6Ly9tc2c/dGV4dD17dXJsfSB7dGV4dH0nLFxuICAgICAgY291bnRVcmw6ICcnLFxuICAgICAgc2hhcmVJbjogJ3NlbGYnXG4gICAgfSxcblxuICAgIHdoYXRzYXBwOiB7XG4gICAgICBsYWJlbDogJ1doYXRzQXBwJyxcbiAgICAgIGxvZ286ICdmYSBmYS13aGF0c2FwcCcsXG4gICAgICBzaGFyZVVybDogJ3doYXRzYXBwOi8vc2VuZD90ZXh0PXt1cmx9IHt0ZXh0fScsXG4gICAgICBjb3VudFVybDogJycsXG4gICAgICBzaGFyZUluOiAnc2VsZidcbiAgICB9LFxuXG4gICAgbGluZToge1xuICAgICAgbGFiZWw6ICdMSU5FJyxcbiAgICAgIGxvZ286ICdmYSBmYS1jb21tZW50JyxcbiAgICAgIHNoYXJlVXJsOiAnaHR0cDovL2xpbmUubWUvUi9tc2cvdGV4dC8/e3RleHR9IHt1cmx9JyxcbiAgICAgIGNvdW50VXJsOiAnJ1xuICAgIH0sXG5cbiAgICB2aWJlcjoge1xuICAgICAgbGFiZWw6ICdWaWJlcicsXG4gICAgICBsb2dvOiAnZmEgZmEtdm9sdW1lLWNvbnRyb2wtcGhvbmUnLFxuICAgICAgc2hhcmVVcmw6ICd2aWJlcjovL2ZvcndhcmQ/dGV4dD17dXJsfSB7dGV4dH0nLFxuICAgICAgY291bnRVcmw6ICcnLFxuICAgICAgc2hhcmVJbjogJ3NlbGYnXG4gICAgfSxcblxuICAgIHBvY2tldDoge1xuICAgICAgbGFiZWw6ICdQb2NrZXQnLFxuICAgICAgbG9nbzogJ2ZhIGZhLWdldC1wb2NrZXQnLFxuICAgICAgc2hhcmVVcmw6ICdodHRwczovL2dldHBvY2tldC5jb20vc2F2ZT91cmw9e3VybH0mdGl0bGU9e3RpdGxlfScsXG4gICAgICBjb3VudFVybDogJydcbiAgICB9LFxuXG4gICAgbWVzc2VuZ2VyOiB7XG4gICAgICBsYWJlbDogJ1NoYXJlJyxcbiAgICAgIGxvZ286ICdmYSBmYS1jb21tZW50aW5nJyxcbiAgICAgIHNoYXJlVXJsOiAnZmItbWVzc2VuZ2VyOi8vc2hhcmU/bGluaz17dXJsfScsXG4gICAgICBjb3VudFVybDogJycsXG4gICAgICBzaGFyZUluOiAnc2VsZidcbiAgICB9XG4gIH0pO1xufSkod2luZG93LCBqUXVlcnksIHdpbmRvdy5qc1NvY2lhbHMpO1xuIl19
