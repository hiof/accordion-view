(function(Hiof, undefined) {

  // Run functions on load
  $(function() {


    let accordion = new AccordionView();

    // Routing
    Path.map("#/informasjon").to(function() {
      accordion.renderAccordion();
    });
    Path.map("#/informasjon/").to(function() {
      accordion.renderAccordion();
    });

    initatePathaccordion = function() {
      // Load root path if no path is active
      Path.root("#/informasjon");
    };

    if ($('#accordion').length) {
      initatePathaccordion();
      Path.listen();
    }
    $('.collapse').collapse();

    $(document).on('change paste keyup','.filterinput',function() {

      var a = $(this).val();

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
