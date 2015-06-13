Counters = new Mongo.Collection('Counters');
Counters.getNextSecuence = function (name) {
   var ret = this.findAndModify({
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
        });

   return ret.seq;
};