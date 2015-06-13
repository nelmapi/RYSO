Template.products.helpers({
    productList: function () {
        return Products.find();
    }
});

Template.productForm.events({
    'click .saveBtn': function (event, tmpl) {
        var prodName = tmpl.find('#nameInput').value;
        var prodType = tmpl.find('#typeInput').value;
        var prodDesc = tmpl.find('#descInput').value;
        var prodPrice = tmpl.find('#priceInput').value;
        var prodState = tmpl.find('#stateInput').value;
        if (prodName) {
            Products.insert({id: Counters.getNextSecuence('productId'),name:prodName, description: prodDesc, type: prodType, price: prodPrice, state: prodState});
            tmpl.find('.cancelBtn').click();
        } else {
            
        }
    }
});