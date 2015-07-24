Products = new Mongo.Collection('Products');
Products.attachSchema(new SimpleSchema({
    productId: {
        type: Number,
        optional: true
    },
    name: {
        type: String,
        label: 'Nombre',
        max:100
    },
    type:{
        type:String,
        label: 'Tipo',
        autoform: {
          type: "select",
          options: function () {
            return [
              {label: "Plato", value: 'Plato'},
              {label: "Bebida", value: 'Bebida'}
            ];
          }
        }
    },
    description: {
        type: String,
        label: 'Descripcion',
        max: 250
    },
    price: {
        type: Number,
        label: 'Precio',
        decimal: true,
        min: 0,
        max: 1000
    },
    available: {
        type: Boolean,
        label: 'Disponibilidad',
        defaultValue: true
    }
}));