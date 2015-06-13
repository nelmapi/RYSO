Template.products.helpers({
    productList: function () {
        return Products.find();
    }
});

Template.productForm.events({
    'click .saveBtn': function (event, tmpl) {
        var prodName = tmpl.find('#nameInput').value;
        var prodDesc = tmpl.find('#descInput').value;
        if (prodName) {
            Products.insert({id: Counters.getNextSecuence('productId'),name:prodName, description: prodDesc});
            tmpl.find('.cancelBtn').click();
        } else {
            
        }
    }
});