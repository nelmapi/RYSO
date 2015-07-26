Template.menu.helpers({
    currentPageIs: function (pageName) {
        return Session.get('currentPage') == pageName;
    }
});