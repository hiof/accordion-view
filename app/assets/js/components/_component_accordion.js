(function(Hiof, undefined) {

  // Functions
  //accordionAppendData = function(data, settings) {
  //
  //};

  accordionAppendData = function(data, settings) {

    var lang = Hiof.options.language.toString();
    var i18n = Hiof.options.i18n;
    var filter = $('#accordion').attr('data-filter');


    if (typeof filter === 'undefined') {
      filter = false;
    }else{
      filter = true;
    }
    //var data = semesterStartLoadData(options);
    //debug('From itservicesAppendData:');
    //debug(lang);
    //debug(i18n.en.itservices.readmore);
    data.meta = settings;
    //debug(settings);


    $.each(data.children, function() {
      //debug(this);
      this.footer = settings.footer;
      //debug(this);
    });
    //debug(data.children);
    var templateSource, templateSourceFilter, markup, markupFilter;




    templateSource = Hiof.Templates['accordion/show'];

    markup = templateSource(data);


    $('#accordion').html(markup);

    if (filter) {
      var ln = $('html').attr('lang');
      var meta = {
          "en": {
            "placeholder": "Search for...",
            "emptysearch": "Reset search"
          },
          "nb": {
            "placeholder": "Søk etter...",
            "emptysearch": "Tøm søk"
          }
      };
      data.meta = meta[ln];
      templateSourceFilter = Hiof.Templates['accordion/filter'];
      markupFilter = templateSourceFilter(data);
      $('#accordion').prepend(markupFilter);
    }



    var scrollDestEl = "#content";
    Hiof.scrollToElement(scrollDestEl);
  };


  accordionLoadData = function(options) {
    var pageTreeID = $('#accordion').attr('data-page-tree-id'),
    enableFooter = $('#accordion').attr('data-footer'),
    server = $('#accordion').attr('data-server'),
    footer;

    if (enableFooter === 'false') {
      footer = false;
    } else {
      footer = true;
    }

    if (typeof server === 'undefined') {
      server = 'www2';
    }


    // Setup the query
    var settings = $.extend({
      id: pageTreeID,
      url: 'http://hiof.no/api/v1/page-relationship/',
      server: server,
      footer: footer
    }, options);
    //debug(settings);


    var contentType = "application/x-www-form-urlencoded; charset=utf-8";
    if (window.XDomainRequest) { //for IE8,IE9
      contentType = "text/plain";
    }
    $.ajax({
      url: settings.url,
      method: 'GET',
      async: true,
      dataType: 'json',
      data: settings,
      contentType: contentType,
      success: function(data) {
        //alert("Data from Server: "+JSON.stringify(data));
        //debug('Settings from success');
        //debug(settings);
        //debug('Data from success');
        //debug(data);
        //return data;
        accordionAppendData(data, settings);
        //Hiof.articleDisplayView(data, settings);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        //alert("You can not send Cross Domain AJAX requests: " + errorThrown);
      }

    });


  };

  // Routing
  Path.map("#/informasjon").to(function() {
    accordionLoadData();
  });
  Path.map("#/informasjon/").to(function() {
    accordionLoadData();
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
    //$(document).on('click', '#accordion a', function(e) {
    //    $(this).toggleClass('open');
    //    //e.preventDefault();
    //    //var url = $(this).attr('href');
    //    //if (url.substring(0, 2) == "#/") {
    //    //    //debug('String starts with #/');
    //    //} else if (url.substring(0, 1) == "#") {
    //    //    hash = url + "";
    //    //    e.preventDefault();
    //    //    setTimeout(function() {
    //    //        scrollToElement(hash);
    //    //    }, 200);
    //    //
    //    //}
    //});



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
  // Expose functions to the window
  window.Hiof.reloadAccordion = accordionLoadData;
})(window.Hiof = window.Hiof || {});
