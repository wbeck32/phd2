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
$('form').on('submit', function(event) {
  var mailObject = {};
  mailObject = $('form').serializeArray();
  console.log(mailObject);
  // $('form').load('./js/mailgun-curl.js', function() {
  //   console.log('loaded!');
  // });

  // $('form');
  // event.preventDefault();
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
