Session.setDefault('productToEdit', null);
Session.setDefault('productToDelete', null);

Template.products.helpers({
    productList: function () {
        return Products.find();
    }
});

Template.productForm.helpers({
    newEditProduct: function () {
        return Products.findOne({_id: Session.get('productToEdit')});
    },
    editing: function() {
        return (null != Session.get('productToEdit'));
    }
});

Template.productForm.events({
    'click .saveBtn': function (event, tmpl) {
        var prodName = tmpl.find('#nameInput').value;
        var prodType = tmpl.find('#typeInput').value;
        var prodDesc = tmpl.find('#descInput').value;
        var prodPrice_mesa = tmpl.find('#priceInput').value;
        var prodPrice_llevar = tmpl.find('#price2Input').value;
        if (AutoForm.validateForm('insertProductForm')) {
            var recordId = Session.get('productToEdit');
            if (recordId) {//editing
                Products.update(recordId,
                {
                    $set:{
                        name: prodName,
                        description: prodDesc,
                        type: prodType,
                        price_mesa: prodPrice_mesa,
                        price_llevar: prodPrice_llevar
                    }
                });
            } else {//newRecord
                var productId = Counters.getNextSecuence('productId');
                Products.insert({
                    productId: productId,
                    name:prodName,
                    description: prodDesc,
                    type: prodType,
                    price_mesa: prodPrice_mesa,
                    price_llevar: prodPrice_llevar
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
    'click .editBtn' : function(event, tmpl) {
        Session.set('productToEdit', tmpl.data._id);
        $('.showProductFormBtn').click();
    },
    'click .deleteBtn' : function (event, tmpl) {
        Session.set('productToDelete', tmpl.data._id);
        $('#productConfirmFormModal').modal('show');
    }
});

Template.confirmDeleteProduct.helpers({
    product : function() {
        return Products.findOne({_id: Session.get('productToDelete')});
    }
});

Template.confirmDeleteProduct.events({
     'click .deleteConfirmBtn' : function(event, tmpl) {
         Products.remove(Session.get('productToDelete'));
         $('#productConfirmFormModal').modal('hide');
     },
     'click .cancelConfirmBtn' : function() {
        Session.set('productToDelete', null);
     }
});