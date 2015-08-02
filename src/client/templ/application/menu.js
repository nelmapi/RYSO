Template.menu.helpers({
    currentPageIs: function (pageName) {
        return Session.get('currentPage') == pageName;
    }
});

Template.menu.onRendered(function() {
    $('.menuItem').on('click', function() {
        var toggleButton = $('#toggleButton');
        if(toggleButton.css('display') != 'none') {
            toggleButton.click();
        }
    });
});