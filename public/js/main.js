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
  // console.log(m);
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
  // console.log(selector);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRhY3RGb3JtLmpzIiwianNzb2NpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBoaWRlTWFpbCgpIHtcbiAgY29uc29sZS5sb2coJ29iZnVzY2F0aW9uJyk7XG4gIHZhciB1ID0gJ3VzZXInO1xuICB2YXIgYXJyID0gJ0AnO1xuICB2YXIgZCA9ICdkb21haW4nO1xuICB2YXIgZG90ID0gJy4nO1xuICB2YXIgdCA9ICd0bGRjY2MnO1xuICAvLyBkb2N1bWVudC53cml0ZShcIjxhIGhyZWY9XCIgKyBcIm1haWxcIiArIFwidG86XCIgKyB1ICsgYXJyICsgZCArIGRvdCArIHQgK1xuICAvLyAgIFwiPlwiICsgXCJFbWFpbCAoY29uY2F0ZW5hdGlvbilcIiArIFwiPC9hPlwiICsgXCI8YnI+XCIpO1xufVxuXG4kKCcuZm9vdGVyVHh0LmNvbC1tZC00LmNvbC1zbS0zIHAnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ2VtYWlsJyk7XG4gICQuYWpheCh7XG4gICAgdXJsOlxuICAgICAgJ2h0dHBzOi8vYXBwLm1haWxndW4uY29tL2FwcC9kb21haW5zL3NhbmRib3g3ODBkYzQ0Y2U0NGE0MWRhOGE0MjY2YjgwZmYyMGIyZS5tYWlsZ3VuLm9yZy9tZXNzYWdlcycsXG4gICAgbWV0aG9kOiBQT1NULFxuICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKHhocikge1xuICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcbiAgICB9XG4gIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUubG9nKSB7XG4gICAgICBjb25zb2xlLmxvZygnU2FtcGxlIG9mIGRhdGE6JywgZGF0YS5zbGljZSgwLCAxMDApKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbiQoJ3VsLm5hdi5uYXZiYXItbmF2IGxpIGEnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdmFyIG0gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgLy8gY29uc29sZS5sb2cobSk7XG4gIGlmIChtID09ICcjbW9yZXRvcCcpIHtcbiAgICB2YXIgZHJvcGRvd25DaG9pY2UgPSAkKHRoaXMpLmZpbmQoJ3VsIGxpIGEnKS5hdHRyKCdocmVmJyk7XG4gICAgJCgnc2VjdGlvbicgKyBkcm9wZG93bkNob2ljZSkuYW5pbWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICB9LFxuICAgICAgJ3Nsb3cnLFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgICB9XG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICBtID09ICcjcHJvZHVjdDEnIHx8XG4gICAgbSA9PSAnI3Byb2R1Y3QyJyB8fFxuICAgIG0gPT0gJyNwcm9kdWN0MycgfHxcbiAgICBtID09ICcjcHJvZHVjdDQnXG4gICkge1xuICAgIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24obSk7XG4gIH0gZWxzZSBpZiAobSA9PSAnI2hvbWUnKSB7XG4gICAgJCgnI2NvbGxhcHNlZE1lbnUuaW4nKS5yZW1vdmVDbGFzcygnaW4nKTtcbiAgICAkKCdzZWN0aW9uJykuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicsIGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAkKCdkaXYucGFnZUJvZHkgZGl2LnJlc3BvbnNpdmVIZWFkZXInKS5jc3Moe1xuICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH0pO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAge1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0sXG4gICAgICAnc2xvdycsXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3MhJylcbiAgICAgIH1cbiAgICApO1xuICB9IGVsc2UgaWYgKG0gIT09IHVuZGVmaW5lZCkge1xuICAgICQoJyNjb2xsYXBzZWRNZW51LmluJykucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gICAgJCgnLnJlc3BvbnNpdmVIZWFkZXInKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICQoJ3NlY3Rpb24nKS5ub3QobSkuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicsIGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAkKCdzZWN0aW9uJyArIG0pLmNzcyh7IGRpc3BsYXk6ICdibG9jaycsIHZpc2liaWxpdHk6ICd2aXNpYmxlJyB9KTtcbiAgICAkKCdzZWN0aW9uJyArIG0pLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgfSxcbiAgICAgICdzbG93JyxcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyEnKVxuICAgICAgfVxuICAgICk7XG4gIH1cbn0pO1xuXG4kKCcubmF2YmFyLWJyYW5kJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoJy5yZXNwb25zaXZlSGVhZGVyJykuY3NzKHtcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgfSk7XG4gICQoJ3NlY3Rpb24nKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgZGlzcGxheTogJ25vbmUnIH0pO1xuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICB7XG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9LFxuICAgICdzbG93JyxcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgfVxuICApO1xufSk7XG5cbiQoJy5jb2wteHMtMy5jb2wtbWQtNCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB2YXIgcHJvZHVjdFRhcmdldCA9ICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcbiAgc2Nyb2xsVG9Qcm9kdWN0U2VjdGlvbihwcm9kdWN0VGFyZ2V0KTtcbn0pO1xuXG4kKCcucHJvZHVjdCAuc2VjdGlvbmhlYWRlciBhJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoJyNjb2xsYXBzZWRNZW51LmluJykucmVtb3ZlQ2xhc3MoJ2luJyk7XG4gIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24oJCh0aGlzKS5hdHRyKCdocmVmJykpO1xufSk7XG5cbmZ1bmN0aW9uIHNjcm9sbFRvUHJvZHVjdFNlY3Rpb24oc2VsZWN0b3IpIHtcbiAgLy8gY29uc29sZS5sb2coc2VsZWN0b3IpO1xuICAkKCcucmVzcG9uc2l2ZUhlYWRlcicpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24nKS5ub3Qoc2VsZWN0b3IpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24jcHJvZHVjdHMuY29udGFpbmVyLWZsdWlkJykuY3NzKHtcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgZGlzcGxheTogJ2Jsb2NrJ1xuICB9KTtcbiAgJCgnZGl2LnByb2R1Y3QnKS5ub3Qoc2VsZWN0b3IpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICQoJ3NlY3Rpb24nICsgc2VsZWN0b3IgKyAnLmNvbnRhaW5lci1mbHVpZC5wcm9kdWN0JykuY3NzKHtcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgZGlzcGxheTogJ2Jsb2NrJ1xuICB9KTtcbiAgJCgnI3Byb2R1Y3RzJykuYW5pbWF0ZShcbiAgICB7XG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9LFxuICAgICdzbG93JyxcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpXG4gICAgfVxuICApO1xufVxuIiwibGV0IG1haWxPYmplY3QgPSB7fTtcblxuJCgnZm9ybScpLm9uKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgbWFpbE9iamVjdCA9ICQoJ2Zvcm0nKS5zZXJpYWxpemVBcnJheSgpO1xuXG4gICQucG9zdCh7XG4gICAgdXJsOiBcInNlbmQucGhwXCIsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIGRhdGE6IG1haWxPYmplY3RcbiAgfSlcblxuICAgIC5kb25lKGZ1bmN0aW9uKHJlcykge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2RvbmU6ICcsIHJlcyk7XG4gIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZXJyb3I6ICcsIGVycik7XG4gIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmaW5pc2hlZCcpO1xuICAgIH0pO1xuXG4gIH0pOyIsIi8qISBqc3NvY2lhbHMgLSB2MS40LjAgLSAyMDE2LTEwLTEwXG4gKiBodHRwOi8vanMtc29jaWFscy5jb21cbiAqIENvcHlyaWdodCAoYykgMjAxNiBBcnRlbSBUYWJhbGluOyBMaWNlbnNlZCBNSVQgKi9cblxuKGZ1bmN0aW9uKHdpbmRvdywgJCwgdW5kZWZpbmVkKSB7XG4gIHZhciBKU1NPQ0lBTFMgPSAnSlNTb2NpYWxzJyxcbiAgICBKU1NPQ0lBTFNfREFUQV9LRVkgPSBKU1NPQ0lBTFM7XG5cbiAgdmFyIGdldE9yQXBwbHkgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIGlmICgkLmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuYXBwbHkoY29udGV4dCwgJC5tYWtlQXJyYXkoYXJndW1lbnRzKS5zbGljZSgyKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICB2YXIgSU1HX1NSQ19SRUdFWCA9IC8oXFwuKGpwZWd8cG5nfGdpZnxibXB8c3ZnKSR8XmRhdGE6aW1hZ2VcXC8oanBlZ3xwbmd8Z2lmfGJtcHxzdmdcXCt4bWwpO2Jhc2U2NCkvaTtcbiAgdmFyIFVSTF9QQVJBTVNfUkVHRVggPSAvKCY/W2EtekEtWjAtOV0rPSk/XFx7KFthLXpBLVowLTldKylcXH0vZztcblxuICB2YXIgTUVBU1VSRVMgPSB7XG4gICAgRzogMTAwMDAwMDAwMCxcbiAgICBNOiAxMDAwMDAwLFxuICAgIEs6IDEwMDBcbiAgfTtcblxuICB2YXIgc2hhcmVzID0ge307XG5cbiAgZnVuY3Rpb24gU29jaWFscyhlbGVtZW50LCBjb25maWcpIHtcbiAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuXG4gICAgJGVsZW1lbnQuZGF0YShKU1NPQ0lBTFNfREFUQV9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5fJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgIHRoaXMuc2hhcmVzID0gW107XG5cbiAgICB0aGlzLl9pbml0KGNvbmZpZyk7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBTb2NpYWxzLnByb3RvdHlwZSA9IHtcbiAgICB1cmw6ICcnLFxuICAgIHRleHQ6ICcnLFxuICAgIHNoYXJlSW46ICdibGFuaycsXG5cbiAgICBzaG93TGFiZWw6IGZ1bmN0aW9uKHNjcmVlbldpZHRoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaG93Q291bnQgPT09IGZhbHNlXG4gICAgICAgID8gc2NyZWVuV2lkdGggPiB0aGlzLnNtYWxsU2NyZWVuV2lkdGhcbiAgICAgICAgOiBzY3JlZW5XaWR0aCA+PSB0aGlzLmxhcmdlU2NyZWVuV2lkdGg7XG4gICAgfSxcblxuICAgIHNob3dDb3VudDogZnVuY3Rpb24oc2NyZWVuV2lkdGgpIHtcbiAgICAgIHJldHVybiBzY3JlZW5XaWR0aCA8PSB0aGlzLnNtYWxsU2NyZWVuV2lkdGggPyAnaW5zaWRlJyA6IHRydWU7XG4gICAgfSxcblxuICAgIHNtYWxsU2NyZWVuV2lkdGg6IDY0MCxcbiAgICBsYXJnZVNjcmVlbldpZHRoOiAxMDI0LFxuXG4gICAgcmVzaXplVGltZW91dDogMjAwLFxuXG4gICAgZWxlbWVudENsYXNzOiAnanNzb2NpYWxzJyxcbiAgICBzaGFyZXNDbGFzczogJ2pzc29jaWFscy1zaGFyZXMnLFxuICAgIHNoYXJlQ2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUnLFxuICAgIHNoYXJlQnV0dG9uQ2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtYnV0dG9uJyxcbiAgICBzaGFyZUxpbmtDbGFzczogJ2pzc29jaWFscy1zaGFyZS1saW5rJyxcbiAgICBzaGFyZUxvZ29DbGFzczogJ2pzc29jaWFscy1zaGFyZS1sb2dvJyxcbiAgICBzaGFyZUxhYmVsQ2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtbGFiZWwnLFxuICAgIHNoYXJlTGlua0NvdW50Q2xhc3M6ICdqc3NvY2lhbHMtc2hhcmUtbGluay1jb3VudCcsXG4gICAgc2hhcmVDb3VudEJveENsYXNzOiAnanNzb2NpYWxzLXNoYXJlLWNvdW50LWJveCcsXG4gICAgc2hhcmVDb3VudENsYXNzOiAnanNzb2NpYWxzLXNoYXJlLWNvdW50JyxcbiAgICBzaGFyZVplcm9Db3VudENsYXNzOiAnanNzb2NpYWxzLXNoYXJlLW5vLWNvdW50JyxcblxuICAgIF9pbml0OiBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgIHRoaXMuX2luaXREZWZhdWx0cygpO1xuICAgICAgJC5leHRlbmQodGhpcywgY29uZmlnKTtcbiAgICAgIHRoaXMuX2luaXRTaGFyZXMoKTtcbiAgICAgIHRoaXMuX2F0dGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIF9pbml0RGVmYXVsdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgIHRoaXMudGV4dCA9ICQudHJpbShcbiAgICAgICAgJCgnbWV0YVtuYW1lPWRlc2NyaXB0aW9uXScpLmF0dHIoJ2NvbnRlbnQnKSB8fCAkKCd0aXRsZScpLnRleHQoKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgX2luaXRTaGFyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zaGFyZXMgPSAkLm1hcChcbiAgICAgICAgdGhpcy5zaGFyZXMsXG4gICAgICAgICQucHJveHkoZnVuY3Rpb24oc2hhcmVDb25maWcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHNoYXJlQ29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc2hhcmVDb25maWcgPSB7IHNoYXJlOiBzaGFyZUNvbmZpZyB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzaGFyZSA9IHNoYXJlQ29uZmlnLnNoYXJlICYmIHNoYXJlc1tzaGFyZUNvbmZpZy5zaGFyZV07XG5cbiAgICAgICAgICBpZiAoIXNoYXJlICYmICFzaGFyZUNvbmZpZy5yZW5kZXJlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJTaGFyZSAnXCIgKyBzaGFyZUNvbmZpZy5zaGFyZSArIFwiJyBpcyBub3QgZm91bmRcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKFxuICAgICAgICAgICAgeyB1cmw6IHRoaXMudXJsLCB0ZXh0OiB0aGlzLnRleHQgfSxcbiAgICAgICAgICAgIHNoYXJlLFxuICAgICAgICAgICAgc2hhcmVDb25maWdcbiAgICAgICAgICApO1xuICAgICAgICB9LCB0aGlzKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgX2F0dGFjaFdpbmRvd1Jlc2l6ZUNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgJC5wcm94eSh0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyLCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUnLCB0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgX3dpbmRvd1Jlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCQuaXNGdW5jdGlvbih0aGlzLnNob3dMYWJlbCkgfHwgJC5pc0Z1bmN0aW9uKHRoaXMuc2hvd0NvdW50KSkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVyKTtcbiAgICAgICAgdGhpcy5fcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICQucHJveHkodGhpcy5yZWZyZXNoLCB0aGlzKSxcbiAgICAgICAgICB0aGlzLnJlc2l6ZVRpbWVvdXRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgX3JlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICB0aGlzLl9kZWZpbmVPcHRpb25zQnlTY3JlZW4oKTtcblxuICAgICAgdGhpcy5fJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5lbGVtZW50Q2xhc3MpO1xuXG4gICAgICB0aGlzLl8kc2hhcmVzID0gJCgnPGRpdj4nKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zaGFyZXNDbGFzcylcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuXyRlbGVtZW50KTtcblxuICAgICAgdGhpcy5fcmVuZGVyU2hhcmVzKCk7XG4gICAgfSxcblxuICAgIF9kZWZpbmVPcHRpb25zQnlTY3JlZW46IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgIHRoaXMuX3Nob3dMYWJlbCA9IGdldE9yQXBwbHkodGhpcy5zaG93TGFiZWwsIHRoaXMsIHRoaXMuX3NjcmVlbldpZHRoKTtcbiAgICAgIHRoaXMuX3Nob3dDb3VudCA9IGdldE9yQXBwbHkodGhpcy5zaG93Q291bnQsIHRoaXMsIHRoaXMuX3NjcmVlbldpZHRoKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlczogZnVuY3Rpb24oKSB7XG4gICAgICAkLmVhY2goXG4gICAgICAgIHRoaXMuc2hhcmVzLFxuICAgICAgICAkLnByb3h5KGZ1bmN0aW9uKF8sIHNoYXJlKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyU2hhcmUoc2hhcmUpO1xuICAgICAgICB9LCB0aGlzKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgX3JlbmRlclNoYXJlOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyICRzaGFyZTtcblxuICAgICAgaWYgKCQuaXNGdW5jdGlvbihzaGFyZS5yZW5kZXJlcikpIHtcbiAgICAgICAgJHNoYXJlID0gJChzaGFyZS5yZW5kZXJlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzaGFyZSA9IHRoaXMuX2NyZWF0ZVNoYXJlKHNoYXJlKTtcbiAgICAgIH1cblxuICAgICAgJHNoYXJlXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLnNoYXJlQ2xhc3MpXG4gICAgICAgIC5hZGRDbGFzcyhzaGFyZS5zaGFyZSA/ICdqc3NvY2lhbHMtc2hhcmUtJyArIHNoYXJlLnNoYXJlIDogJycpXG4gICAgICAgIC5hZGRDbGFzcyhzaGFyZS5jc3MpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLl8kc2hhcmVzKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyICRyZXN1bHQgPSAkKCc8ZGl2PicpO1xuICAgICAgdmFyICRzaGFyZUxpbmsgPSB0aGlzLl9jcmVhdGVTaGFyZUxpbmsoc2hhcmUpLmFwcGVuZFRvKCRyZXN1bHQpO1xuXG4gICAgICBpZiAodGhpcy5fc2hvd0NvdW50KSB7XG4gICAgICAgIHZhciBpc0luc2lkZUNvdW50ID0gdGhpcy5fc2hvd0NvdW50ID09PSAnaW5zaWRlJztcbiAgICAgICAgdmFyICRjb3VudENvbnRhaW5lciA9IGlzSW5zaWRlQ291bnRcbiAgICAgICAgICA/ICRzaGFyZUxpbmtcbiAgICAgICAgICA6ICQoJzxkaXY+JykuYWRkQ2xhc3ModGhpcy5zaGFyZUNvdW50Qm94Q2xhc3MpLmFwcGVuZFRvKCRyZXN1bHQpO1xuICAgICAgICAkY291bnRDb250YWluZXIuYWRkQ2xhc3MoXG4gICAgICAgICAgaXNJbnNpZGVDb3VudCA/IHRoaXMuc2hhcmVMaW5rQ291bnRDbGFzcyA6IHRoaXMuc2hhcmVDb3VudEJveENsYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX3JlbmRlclNoYXJlQ291bnQoc2hhcmUsICRjb3VudENvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMaW5rOiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyIHNoYXJlU3RyYXRlZ3kgPSB0aGlzLl9nZXRTaGFyZVN0cmF0ZWd5KHNoYXJlKTtcblxuICAgICAgdmFyICRyZXN1bHQgPSBzaGFyZVN0cmF0ZWd5LmNhbGwoc2hhcmUsIHtcbiAgICAgICAgc2hhcmVVcmw6IHRoaXMuX2dldFNoYXJlVXJsKHNoYXJlKVxuICAgICAgfSk7XG5cbiAgICAgICRyZXN1bHRcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2hhcmVMaW5rQ2xhc3MpXG4gICAgICAgIC5hcHBlbmQodGhpcy5fY3JlYXRlU2hhcmVMb2dvKHNoYXJlKSk7XG5cbiAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwpIHtcbiAgICAgICAgJHJlc3VsdC5hcHBlbmQodGhpcy5fY3JlYXRlU2hhcmVMYWJlbChzaGFyZSkpO1xuICAgICAgfVxuXG4gICAgICAkLmVhY2godGhpcy5vbiB8fCB7fSwgZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgICAgICAgICRyZXN1bHQub24oZXZlbnQsICQucHJveHkoaGFuZGxlciwgc2hhcmUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfZ2V0U2hhcmVTdHJhdGVneTogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBzaGFyZVN0cmF0ZWdpZXNbc2hhcmUuc2hhcmVJbiB8fCB0aGlzLnNoYXJlSW5dO1xuXG4gICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJTaGFyZSBzdHJhdGVneSAnXCIgKyB0aGlzLnNoYXJlSW4gKyBcIicgbm90IGZvdW5kXCIpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfZ2V0U2hhcmVVcmw6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgc2hhcmVVcmwgPSBnZXRPckFwcGx5KHNoYXJlLnNoYXJlVXJsLCBzaGFyZSk7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybWF0U2hhcmVVcmwoc2hhcmVVcmwsIHNoYXJlKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXJlTG9nbzogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHZhciBsb2dvID0gc2hhcmUubG9nbztcblxuICAgICAgdmFyICRyZXN1bHQgPSBJTUdfU1JDX1JFR0VYLnRlc3QobG9nbylcbiAgICAgICAgPyAkKCc8aW1nPicpLmF0dHIoJ3NyYycsIHNoYXJlLmxvZ28pXG4gICAgICAgIDogJCgnPGk+JykuYWRkQ2xhc3MobG9nbyk7XG5cbiAgICAgICRyZXN1bHQuYWRkQ2xhc3ModGhpcy5zaGFyZUxvZ29DbGFzcyk7XG5cbiAgICAgIHJldHVybiAkcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU2hhcmVMYWJlbDogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIHJldHVybiAkKCc8c3Bhbj4nKS5hZGRDbGFzcyh0aGlzLnNoYXJlTGFiZWxDbGFzcykudGV4dChzaGFyZS5sYWJlbCk7XG4gICAgfSxcblxuICAgIF9yZW5kZXJTaGFyZUNvdW50OiBmdW5jdGlvbihzaGFyZSwgJGNvbnRhaW5lcikge1xuICAgICAgdmFyICRjb3VudCA9ICQoJzxzcGFuPicpLmFkZENsYXNzKHRoaXMuc2hhcmVDb3VudENsYXNzKTtcblxuICAgICAgJGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnNoYXJlWmVyb0NvdW50Q2xhc3MpLmFwcGVuZCgkY291bnQpO1xuXG4gICAgICB0aGlzLl9sb2FkQ291bnQoc2hhcmUpLmRvbmUoXG4gICAgICAgICQucHJveHkoZnVuY3Rpb24oY291bnQpIHtcbiAgICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlQ2xhc3ModGhpcy5zaGFyZVplcm9Db3VudENsYXNzKTtcbiAgICAgICAgICAgICRjb3VudC50ZXh0KGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBfbG9hZENvdW50OiBmdW5jdGlvbihzaGFyZSkge1xuICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgdmFyIGNvdW50VXJsID0gdGhpcy5fZ2V0Q291bnRVcmwoc2hhcmUpO1xuXG4gICAgICBpZiAoIWNvdW50VXJsKSB7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKDApLnByb21pc2UoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGhhbmRsZVN1Y2Nlc3MgPSAkLnByb3h5KGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcy5fZ2V0Q291bnRWYWx1ZShyZXNwb25zZSwgc2hhcmUpKTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAkLmdldEpTT04oY291bnRVcmwpLmRvbmUoaGFuZGxlU3VjY2VzcykuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgJC5nZXQoY291bnRVcmwpLmRvbmUoaGFuZGxlU3VjY2VzcykuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBfZ2V0Q291bnRVcmw6IGZ1bmN0aW9uKHNoYXJlKSB7XG4gICAgICB2YXIgY291bnRVcmwgPSBnZXRPckFwcGx5KHNoYXJlLmNvdW50VXJsLCBzaGFyZSk7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybWF0U2hhcmVVcmwoY291bnRVcmwsIHNoYXJlKTtcbiAgICB9LFxuXG4gICAgX2dldENvdW50VmFsdWU6IGZ1bmN0aW9uKHJlc3BvbnNlLCBzaGFyZSkge1xuICAgICAgdmFyIGNvdW50ID1cbiAgICAgICAgKCQuaXNGdW5jdGlvbihzaGFyZS5nZXRDb3VudCkgPyBzaGFyZS5nZXRDb3VudChyZXNwb25zZSkgOiByZXNwb25zZSkgfHxcbiAgICAgICAgMDtcbiAgICAgIHJldHVybiB0eXBlb2YgY291bnQgPT09ICdzdHJpbmcnID8gY291bnQgOiB0aGlzLl9mb3JtYXROdW1iZXIoY291bnQpO1xuICAgIH0sXG5cbiAgICBfZm9ybWF0TnVtYmVyOiBmdW5jdGlvbihudW1iZXIpIHtcbiAgICAgICQuZWFjaChNRUFTVVJFUywgZnVuY3Rpb24obGV0dGVyLCB2YWx1ZSkge1xuICAgICAgICBpZiAobnVtYmVyID49IHZhbHVlKSB7XG4gICAgICAgICAgbnVtYmVyID0gcGFyc2VGbG9hdCgobnVtYmVyIC8gdmFsdWUpLnRvRml4ZWQoMikpICsgbGV0dGVyO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBudW1iZXI7XG4gICAgfSxcblxuICAgIF9mb3JtYXRTaGFyZVVybDogZnVuY3Rpb24odXJsLCBzaGFyZSkge1xuICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKFVSTF9QQVJBTVNfUkVHRVgsIGZ1bmN0aW9uKG1hdGNoLCBrZXksIGZpZWxkKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNoYXJlW2ZpZWxkXSB8fCAnJztcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gKGtleSB8fCAnJykgKyB3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6ICcnO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9jbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVyKTtcbiAgICAgIHRoaXMuXyRlbGVtZW50LmVtcHR5KCk7XG4gICAgfSxcblxuICAgIF9wYXNzT3B0aW9uVG9TaGFyZXM6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBzaGFyZXMgPSB0aGlzLnNoYXJlcztcblxuICAgICAgJC5lYWNoKFsndXJsJywgJ3RleHQnXSwgZnVuY3Rpb24oXywgb3B0aW9uTmFtZSkge1xuICAgICAgICBpZiAob3B0aW9uTmFtZSAhPT0ga2V5KSByZXR1cm47XG5cbiAgICAgICAgJC5lYWNoKHNoYXJlcywgZnVuY3Rpb24oXywgc2hhcmUpIHtcbiAgICAgICAgICBzaGFyZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9ub3JtYWxpemVTaGFyZTogZnVuY3Rpb24oc2hhcmUpIHtcbiAgICAgIGlmICgkLmlzTnVtZXJpYyhzaGFyZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVzW3NoYXJlXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzaGFyZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuICQuZ3JlcCh0aGlzLnNoYXJlcywgZnVuY3Rpb24ocykge1xuICAgICAgICAgIHJldHVybiBzLnNoYXJlID09PSBzaGFyZTtcbiAgICAgICAgfSlbMF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaGFyZTtcbiAgICB9LFxuXG4gICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgdGhpcy5fZGV0YWNoV2luZG93UmVzaXplQ2FsbGJhY2soKTtcblxuICAgICAgdGhpcy5fJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudENsYXNzKVxuICAgICAgICAucmVtb3ZlRGF0YShKU1NPQ0lBTFNfREFUQV9LRVkpO1xuICAgIH0sXG5cbiAgICBvcHRpb246IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLl9wYXNzT3B0aW9uVG9TaGFyZXMoa2V5LCB2YWx1ZSk7XG5cbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH0sXG5cbiAgICBzaGFyZU9wdGlvbjogZnVuY3Rpb24oc2hhcmUsIGtleSwgdmFsdWUpIHtcbiAgICAgIHNoYXJlID0gdGhpcy5fbm9ybWFsaXplU2hhcmUoc2hhcmUpO1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICByZXR1cm4gc2hhcmVba2V5XTtcbiAgICAgIH1cblxuICAgICAgc2hhcmVba2V5XSA9IHZhbHVlO1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICB9O1xuXG4gICQuZm4uanNTb2NpYWxzID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgdmFyIGFyZ3MgPSAkLm1ha2VBcnJheShhcmd1bWVudHMpLFxuICAgICAgbWV0aG9kQXJncyA9IGFyZ3Muc2xpY2UoMSksXG4gICAgICByZXN1bHQgPSB0aGlzO1xuXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgaW5zdGFuY2UgPSAkZWxlbWVudC5kYXRhKEpTU09DSUFMU19EQVRBX0tFWSksXG4gICAgICAgIG1ldGhvZFJlc3VsdDtcblxuICAgICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG1ldGhvZFJlc3VsdCA9IGluc3RhbmNlW2NvbmZpZ10uYXBwbHkoaW5zdGFuY2UsIG1ldGhvZEFyZ3MpO1xuICAgICAgICAgIGlmIChtZXRob2RSZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBtZXRob2RSZXN1bHQgIT09IGluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBtZXRob2RSZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3RhbmNlLl9kZXRhY2hXaW5kb3dSZXNpemVDYWxsYmFjaygpO1xuICAgICAgICAgIGluc3RhbmNlLl9pbml0KGNvbmZpZyk7XG4gICAgICAgICAgaW5zdGFuY2UuX3JlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgU29jaWFscygkZWxlbWVudCwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIHNldERlZmF1bHRzID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgdmFyIGNvbXBvbmVudDtcblxuICAgIGlmICgkLmlzUGxhaW5PYmplY3QoY29uZmlnKSkge1xuICAgICAgY29tcG9uZW50ID0gU29jaWFscy5wcm90b3R5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudCA9IHNoYXJlc1tjb25maWddO1xuICAgICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIH1cblxuICAgICQuZXh0ZW5kKGNvbXBvbmVudCwgY29uZmlnKTtcbiAgfTtcblxuICB2YXIgc2hhcmVTdHJhdGVnaWVzID0ge1xuICAgIHBvcHVwOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICByZXR1cm4gJCgnPGE+JykuYXR0cignaHJlZicsICcjJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5vcGVuKFxuICAgICAgICAgIGFyZ3Muc2hhcmVVcmwsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICAnd2lkdGg9NjAwLCBoZWlnaHQ9NDAwLCBsb2NhdGlvbj0wLCBtZW51YmFyPTAsIHJlc2l6ZWFibGU9MCwgc2Nyb2xsYmFycz0wLCBzdGF0dXM9MCwgdGl0bGViYXI9MCwgdG9vbGJhcj0wJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgYmxhbms6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIHJldHVybiAkKCc8YT4nKS5hdHRyKHsgdGFyZ2V0OiAnX2JsYW5rJywgaHJlZjogYXJncy5zaGFyZVVybCB9KTtcbiAgICB9LFxuXG4gICAgc2VsZjogZnVuY3Rpb24oYXJncykge1xuICAgICAgcmV0dXJuICQoJzxhPicpLmF0dHIoeyB0YXJnZXQ6ICdfc2VsZicsIGhyZWY6IGFyZ3Muc2hhcmVVcmwgfSk7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5qc1NvY2lhbHMgPSB7XG4gICAgU29jaWFsczogU29jaWFscyxcbiAgICBzaGFyZXM6IHNoYXJlcyxcbiAgICBzaGFyZVN0cmF0ZWdpZXM6IHNoYXJlU3RyYXRlZ2llcyxcbiAgICBzZXREZWZhdWx0czogc2V0RGVmYXVsdHNcbiAgfTtcbn0pKHdpbmRvdywgalF1ZXJ5KTtcblxuKGZ1bmN0aW9uKHdpbmRvdywgJCwganNTb2NpYWxzLCB1bmRlZmluZWQpIHtcbiAgJC5leHRlbmQoanNTb2NpYWxzLnNoYXJlcywge1xuICAgIGVtYWlsOiB7XG4gICAgICBsYWJlbDogJ0UtbWFpbCcsXG4gICAgICBsb2dvOiAnZmEgZmEtYXQnLFxuICAgICAgc2hhcmVVcmw6ICdtYWlsdG86e3RvfT9zdWJqZWN0PXt0ZXh0fSZib2R5PXt1cmx9JyxcbiAgICAgIGNvdW50VXJsOiAnJyxcbiAgICAgIHNoYXJlSW46ICdzZWxmJ1xuICAgIH0sXG5cbiAgICB0d2l0dGVyOiB7XG4gICAgICBsYWJlbDogJ1R3ZWV0JyxcbiAgICAgIGxvZ286ICdmYSBmYS10d2l0dGVyJyxcbiAgICAgIHNoYXJlVXJsOlxuICAgICAgICAnaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT91cmw9e3VybH0mdGV4dD17dGV4dH0mdmlhPXt2aWF9Jmhhc2h0YWdzPXtoYXNodGFnc30nLFxuICAgICAgY291bnRVcmw6ICcnXG4gICAgfSxcblxuICAgIGZhY2Vib29rOiB7XG4gICAgICBsYWJlbDogJ0xpa2UnLFxuICAgICAgbG9nbzogJ2ZhIGZhLWZhY2Vib29rJyxcbiAgICAgIHNoYXJlVXJsOiAnaHR0cHM6Ly9mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT17dXJsfScsXG4gICAgICBjb3VudFVybDogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLz9pZD17dXJsfScsXG4gICAgICBnZXRDb3VudDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICByZXR1cm4gKGRhdGEuc2hhcmUgJiYgZGF0YS5zaGFyZS5zaGFyZV9jb3VudCkgfHwgMDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdmtvbnRha3RlOiB7XG4gICAgICBsYWJlbDogJ0xpa2UnLFxuICAgICAgbG9nbzogJ2ZhIGZhLXZrJyxcbiAgICAgIHNoYXJlVXJsOlxuICAgICAgICAnaHR0cHM6Ly92ay5jb20vc2hhcmUucGhwP3VybD17dXJsfSZ0aXRsZT17dGl0bGV9JmRlc2NyaXB0aW9uPXt0ZXh0fScsXG4gICAgICBjb3VudFVybDogJ2h0dHBzOi8vdmsuY29tL3NoYXJlLnBocD9hY3Q9Y291bnQmaW5kZXg9MSZ1cmw9e3VybH0nLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRhdGEuc2xpY2UoMTUsIC0yKS5zcGxpdCgnLCAnKVsxXSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdvb2dsZXBsdXM6IHtcbiAgICAgIGxhYmVsOiAnKzEnLFxuICAgICAgbG9nbzogJ2ZhIGZhLWdvb2dsZScsXG4gICAgICBzaGFyZVVybDogJ2h0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD17dXJsfScsXG4gICAgICBjb3VudFVybDogJydcbiAgICB9LFxuXG4gICAgbGlua2VkaW46IHtcbiAgICAgIGxhYmVsOiAnU2hhcmUnLFxuICAgICAgbG9nbzogJ2ZhIGZhLWxpbmtlZGluJyxcbiAgICAgIHNoYXJlVXJsOiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPXt1cmx9JyxcbiAgICAgIGNvdW50VXJsOlxuICAgICAgICAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvdW50c2Vydi9jb3VudC9zaGFyZT9mb3JtYXQ9anNvbnAmdXJsPXt1cmx9JmNhbGxiYWNrPT8nLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY291bnQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHBpbnRlcmVzdDoge1xuICAgICAgbGFiZWw6ICdQaW4gaXQnLFxuICAgICAgbG9nbzogJ2ZhIGZhLXBpbnRlcmVzdCcsXG4gICAgICBzaGFyZVVybDpcbiAgICAgICAgJ2h0dHBzOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2Jvb2ttYXJrbGV0Lz9tZWRpYT17bWVkaWF9JnVybD17dXJsfSZkZXNjcmlwdGlvbj17dGV4dH0nLFxuICAgICAgY291bnRVcmw6XG4gICAgICAgICdodHRwczovL2FwaS5waW50ZXJlc3QuY29tL3YxL3VybHMvY291bnQuanNvbj8mdXJsPXt1cmx9JmNhbGxiYWNrPT8nLFxuICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY291bnQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0dW1ibGV1cG9uOiB7XG4gICAgICBsYWJlbDogJ1NoYXJlJyxcbiAgICAgIGxvZ286ICdmYSBmYS1zdHVtYmxldXBvbicsXG4gICAgICBzaGFyZVVybDogJ2h0dHA6Ly93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9e3VybH0mdGl0bGU9e3RpdGxlfScsXG4gICAgICBjb3VudFVybDpcbiAgICAgICAgJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vd3d3LnN0dW1ibGV1cG9uLmNvbS9zZXJ2aWNlcy8xLjAxL2JhZGdlLmdldGluZm8/dXJsPXt1cmx9J1xuICAgICAgLy8gZ2V0Q291bnQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIC8vICAgcmV0dXJuIGRhdGEucmVzdWx0LnZpZXdzO1xuICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICB0ZWxlZ3JhbToge1xuICAgICAgbGFiZWw6ICdUZWxlZ3JhbScsXG4gICAgICBsb2dvOiAnZmEgZmEtcGFwZXItcGxhbmUnLFxuICAgICAgc2hhcmVVcmw6ICd0ZzovL21zZz90ZXh0PXt1cmx9IHt0ZXh0fScsXG4gICAgICBjb3VudFVybDogJycsXG4gICAgICBzaGFyZUluOiAnc2VsZidcbiAgICB9LFxuXG4gICAgd2hhdHNhcHA6IHtcbiAgICAgIGxhYmVsOiAnV2hhdHNBcHAnLFxuICAgICAgbG9nbzogJ2ZhIGZhLXdoYXRzYXBwJyxcbiAgICAgIHNoYXJlVXJsOiAnd2hhdHNhcHA6Ly9zZW5kP3RleHQ9e3VybH0ge3RleHR9JyxcbiAgICAgIGNvdW50VXJsOiAnJyxcbiAgICAgIHNoYXJlSW46ICdzZWxmJ1xuICAgIH0sXG5cbiAgICBsaW5lOiB7XG4gICAgICBsYWJlbDogJ0xJTkUnLFxuICAgICAgbG9nbzogJ2ZhIGZhLWNvbW1lbnQnLFxuICAgICAgc2hhcmVVcmw6ICdodHRwOi8vbGluZS5tZS9SL21zZy90ZXh0Lz97dGV4dH0ge3VybH0nLFxuICAgICAgY291bnRVcmw6ICcnXG4gICAgfSxcblxuICAgIHZpYmVyOiB7XG4gICAgICBsYWJlbDogJ1ZpYmVyJyxcbiAgICAgIGxvZ286ICdmYSBmYS12b2x1bWUtY29udHJvbC1waG9uZScsXG4gICAgICBzaGFyZVVybDogJ3ZpYmVyOi8vZm9yd2FyZD90ZXh0PXt1cmx9IHt0ZXh0fScsXG4gICAgICBjb3VudFVybDogJycsXG4gICAgICBzaGFyZUluOiAnc2VsZidcbiAgICB9LFxuXG4gICAgcG9ja2V0OiB7XG4gICAgICBsYWJlbDogJ1BvY2tldCcsXG4gICAgICBsb2dvOiAnZmEgZmEtZ2V0LXBvY2tldCcsXG4gICAgICBzaGFyZVVybDogJ2h0dHBzOi8vZ2V0cG9ja2V0LmNvbS9zYXZlP3VybD17dXJsfSZ0aXRsZT17dGl0bGV9JyxcbiAgICAgIGNvdW50VXJsOiAnJ1xuICAgIH0sXG5cbiAgICBtZXNzZW5nZXI6IHtcbiAgICAgIGxhYmVsOiAnU2hhcmUnLFxuICAgICAgbG9nbzogJ2ZhIGZhLWNvbW1lbnRpbmcnLFxuICAgICAgc2hhcmVVcmw6ICdmYi1tZXNzZW5nZXI6Ly9zaGFyZT9saW5rPXt1cmx9JyxcbiAgICAgIGNvdW50VXJsOiAnJyxcbiAgICAgIHNoYXJlSW46ICdzZWxmJ1xuICAgIH1cbiAgfSk7XG59KSh3aW5kb3csIGpRdWVyeSwgd2luZG93LmpzU29jaWFscyk7XG4iXX0=
