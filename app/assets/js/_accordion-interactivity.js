(function(Hiof, undefined) {
  // Routing
  Path.map("#/informasjon").to(function() {
    Hiof.reloadAccordion();
  });
  Path.map("#/informasjon/").to(function() {
    Hiof.reloadAccordion();
  });

  initatePathaccordion = function() {
    // Load root path if no path is active
    Path.root("#/informasjon");
  };


  // Run functions on load
  $(function() {
    //console.log("JS loaded");
    if ($('#accordion').length) {

      initatePathaccordion();
      Path.listen();

    }
    $('.collapse').collapse();

    $(document).on('change paste keyup','.filterinput',function() {
      //console.log('keyup...');
      var a = $(this).val();
      //console.log('value:');
      //console.log(a);
      if (a.length > 0) {
        children = ($("#accordion-list").children());

        var containing = children.filter(function() {
          var regex = new RegExp('' + a, 'i');
          //console.log(regex);
          return regex.test($('.panel-title, .panel-collapse', this).text());
        }).slideDown();
        children.not(containing).slideUp();
      } else {
        children.slideDown();
      }
      return false;
    });
    $(document).on('click','#accordion .btn',function(e) {
      e.preventDefault();
      $('#accordion .filterinput').val('').change();
    });

  });


})(window.Hiof = window.Hiof || {});
