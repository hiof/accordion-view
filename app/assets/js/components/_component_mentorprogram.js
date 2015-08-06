(function(Hiof, undefined) {

    // Functions
    mentorprogramAppendData = function(data, settings) {

    };

    //itservicesAppendData = function(data, settings) {
    //
    //    var lang = Hiof.options.language.toString();
    //    var i18n = Hiof.options.i18n;
    //    //var data = semesterStartLoadData(options);
    //    //debug('From itservicesAppendData:');
    //    //debug(lang);
    //    //debug(i18n.en.itservices.readmore);
    //    data.meta = settings;
    //    data.meta.type = 'itservices';
    //    if (lang == 'en') {
    //        //debug("lang is english");
    //        data.meta.readmore = i18n.en.itservices.readmore;
    //        if (settings.audience === 'employee') {
    //            data.meta.title = i18n.en.itservices.titleeployee;
    //        } else {
    //            data.meta.title = i18n.en.itservices.titlestudents;
    //        }
    //    } else {
    //        //debug("lang is norwegian");
    //        data.meta.readmore = i18n.nb.itservices.readmore;
    //        if (settings.audience === 'employee') {
    //            data.meta.title = i18n.nb.itservices.titleeployee;
    //        } else {
    //            data.meta.title = i18n.nb.itservices.titlestudents;
    //        }
    //    }
    //
    //
    //
    //    //debug(data);
    //    var templateSource, markup;
    //
    //    if (settings.template === 'single') {
    //        data.meta.pagetitle = data.page['0'].pagetitle;
    //        if (settings.audience === 'employee') {
    //            data.meta.support = [{
    //                "url": 'http://www2.hiof.no/nor/it_drift/ansatthjelp#/it-tjenester/24408',
    //                "name": 'FAQ'
    //            }, {
    //                "url": 'mailto:itvakt@hiof.no',
    //                "name": 'Epost'
    //            }];
    //        } else {
    //            data.meta.support = [{
    //                "url": 'http://www2.hiof.no/nor/it_drift/studenthjelp#/it-tjenester/23547',
    //                "name": 'FAQ'
    //            }, {
    //                "url": 'mailto:itvakt@hiof.no',
    //                "name": 'Epost'
    //            }];
    //        }
    //        templateSourceBreadcrumb = Hiof.Templates['itservices/breadcrumbs'];
    //        templateSource = Hiof.Templates['page/show'];
    //        templateSourceSupport = Hiof.Templates['itservices/support'];
    //        markup = templateSourceBreadcrumb(data) + templateSource(data) + templateSourceSupport(data) + templateSourceBreadcrumb(data);
    //    } else {
    //        templateSource = Hiof.Templates['itservices/list'];
    //
    //        markup = templateSource(data);
    //    }
    //
    //
    //    $('#itservices').html(markup);
    //    var scrollDestEl = "#content";
    //    Hiof.scrollToElement(scrollDestEl);
    //};


    mentorprogramLoadData = function(options) {



        // Setup the query
        var settings = $.extend({
            id: '24236',
            url: 'http://hiof.no/api/v1/itservices/'
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
                debug(data);
                //return data;
                mentorprogramAppendData(data, settings);
                //Hiof.articleDisplayView(data, settings);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //alert("You can not send Cross Domain AJAX requests: " + errorThrown);
            }

        });


    };

    // Routing
    Path.map("#/mentorprogram").to(function() {
        mentorprogramLoadData();
    });
    Path.map("#/mentorprogram/").to(function() {
        mentorprogramLoadData();
    });

    initatePathMentorprogram = function() {
        // Load root path if no path is active
        Path.root("#/mentorprogram");
    };


    // Run functions on load
    $(function() {
        if ($('#mentorprogram').length) {

            initatePathMentorprogram();
            Path.listen();

        }

        $(document).on('click', '#mentorprogram a', function(e) {

            $(this).toggleClass('open');

            //e.preventDefault();
            //var url = $(this).attr('href');
            //if (url.substring(0, 2) == "#/") {
            //    //debug('String starts with #/');
            //} else if (url.substring(0, 1) == "#") {
            //    hash = url + "";
            //    e.preventDefault();
            //    setTimeout(function() {
            //        scrollToElement(hash);
            //    }, 200);
            //
            //}
        });


    });
    // Expose functions to the window

})(window.Hiof = window.Hiof || {});
