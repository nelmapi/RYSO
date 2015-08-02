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
    price_mesa: {
        type: Number,
        label: 'Precio Mesa',
        decimal: true,
        min: 0,
        max: 1000
    },
    price_llevar: {
        type: Number,
        label: 'Precio Llevar',
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