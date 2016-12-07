/*!
 * CepAutocomplete Jquery Plugin v1.0
 * https://github.com/andrehtissot/jquery-cep-autocomplete
 *
 * Requires jQuery Library
 * https://jquery.com/
 *
 * The API is maintained by a third party
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 *
 * Date: 2016-12-04
 */
(function($) {
  var fieldNames = ['address','neighborhood','city','state'];
  var responseTypeConvertion = [function(response){
    return response.tipoDeLogradouro+' '+response.logradouro; },
    function(response){ return response.bairro; },
    function(response){ return response.cidade; },
    function(response){ return response.estado; }];
  $.fn.cepAutocomplete = function(options){
    var options = options || {};
    $(this).on('focusout.cepAutocomplete', function(){
      var $this = $(this);
      var cep = $this.val().replace('-', '').replace('.', '').trim();
      if(cep.length != 8) { return; }
      var $fields = {};
      for (var i = fieldNames.length - 1; i >= 0; i--) {
        var fieldQuery = options[fieldNames[i]]
          || $this.data(fieldNames[i]) || null;
        if(fieldQuery == null) { continue; }
        var $fieldElem = $(fieldQuery);
        if($fieldElem.length !== 0)
          $fields[fieldNames[i]] = $fieldElem;
      };
      $.getJSON('http://correiosapi.apphb.com/cep/'+cep+'?callback=?')
        .done(function(response) {
        for (var i = fieldNames.length - 1; i >= 0; i--)
          if($fields[fieldNames[i]] || false)
            $fields[fieldNames[i]].val(responseTypeConvertion[i](response));
      });
    });
  };
})(jQuery);
