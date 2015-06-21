Session.setDefault('productToEdit', null);

Template.products.helpers({
    productList: function () {
        return Products.find();
    }
});

Template.productForm.helpers({
    newEditProduct: function () {
        return Products.findOne({_id: Session.get('productToEdit')});
    }
});

Template.productForm.events({
    'click .saveBtn': function (event, tmpl) {
        var prodName = tmpl.find('#nameInput').value;
        var prodType = tmpl.find('#typeInput').value;
        var prodDesc = tmpl.find('#descInput').value;
        var prodPrice = tmpl.find('#priceInput').value;
        if (AutoForm.validateForm('insertProductForm')) {
            var recordId = Session.get('productToEdit');
            if (recordId) {//editing
                Products.update(recordId,
                {
                    $set:{
                        name: prodName,
                        description: prodDesc,
                        type: prodType,
                        price: prodPrice
                    }
                });
            } else {//newRecord
                var productId = Counters.getNextSecuence('productId');
                Products.insert({
                    productId: productId,
                    name:prodName,
                    description: prodDesc,
                    type: prodType,
                    price: prodPrice
                });
            }

            tmpl.find('.cancelBtn').click();
        }
    },
    'click .cancelBtn' : function() {
        Session.set('productToEdit', null);
    },
    'click .showProductFormBtn' : function () {
        AutoForm.resetForm('insertProductForm');
    }
});

Template.productRow.events({
    'dblclick ': function (event, tmpl) {
        console.log('data: ', tmpl);
        Session.set('productToEdit', tmpl.data._id);
        $('.showProductFormBtn').click();
    }
});