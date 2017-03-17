class AccordionView {
  constructor(){
    this.view = new View();
    this.templateAccordionShow = Hiof.Templates['accordion/show'];
    this.templateSourceFilter = Hiof.Templates['accordion/filter'];
    this.filter =  $('#accordion').attr('data-filter');
    this.enableFooter = $('#accordion').attr('data-footer');
    this.server = $('#accordion').attr('data-server');
    this.pageTreeID = $('#accordion').attr('data-page-tree-id');

    if (typeof this.filter === 'undefined') {
      this.filter = false;
    }else{
      this.filter = true;
    }

    if (this.enableFooter === 'false') {
      this.footer = false;
    } else {
      this.footer = true;
    }
    if (typeof this.server === 'undefined') {
      this.server = 'www2';
    }

    this.defaults = {
      lang: this.view.ln,
      id: this.pageTreeID,
      url: '//www.hiof.no/api/v1/page-relationship/',
      server: this.server,
      footer: this.footer

    }
  };
  renderAccordion(options = {}){
    let settings = Object.assign(
      {},
      this.defaults

    );

    let that = this;
    this.view.getData(settings, that).success(function(data){

      data.meta = settings;

      $.each(data.children, function() {
        this.footer = settings.footer;
      });

      let markup = that.templateAccordionShow(data);

      $('#accordion').html(markup);

      if (that.filter) {
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
        //templateSourceFilter = Hiof.Templates['accordion/filter'];
        let markupFilter = that.templateSourceFilter(data);
        $('#accordion').prepend(markupFilter);
      }

      var scrollDestEl = "#content";
      Hiof.scrollToElement(scrollDestEl);

    });

  };
};
