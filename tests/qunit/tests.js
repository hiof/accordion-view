$(function() {

    QUnit.test("Check if the page is loaded", function() {
        equal($('#qunit').is(':visible'), true);
    });


    QUnit.module('Test initial accordion view load');

    QUnit.test('Check if panel is loaded', function(assert) {
        var done = assert.async();
        setTimeout(function() {
            assert.ok($('.panel').length);
            done();
        }, 100);
    });

    QUnit.test('Check if first panel is open', function(assert) {
        var done = assert.async();
        //$('.panel a').first().trigger('click');
        setTimeout(function() {
            assert.equal($('.panel .collapse').first().is(':visible'), false);
            done();
        }, 500);
    });

    QUnit.test('Open first panel', function(assert) {
        var done = assert.async();
        $('.panel a').first().trigger('click');
        setTimeout(function() {
            assert.equal($('.panel .collapse').first().is(':visible'), true);
            done();
        }, 1000);
    });


    QUnit.module('Test view without footer');

    setTimeout(function() {
        $('#accordion').attr('data-footer', 'false');
        window.Hiof.reloadAccordion();
    }, 2000);
    QUnit.test('Panels does not have footer', function(assert) {
        var done = assert.async();

        setTimeout(function() {
            assert.equal($('.panel .panel-footer').length, false);
        }, 3000);
    });

});
