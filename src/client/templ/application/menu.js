Template.menu.helpers({
    currentPageIs: function (pageName) {
        return Session.get('currentPage') == pageName;
    }
});

Template.menu.onRendered(function() {
    if (!Meteor.Device.isDesktop()) {
        $('.menuItem').on('click', function() {
            $('#toggleButton').click();
        });
    }
});