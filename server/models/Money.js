const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let MoneyModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const MoneySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  amount: {
    type: Number,
    min: 0,
    required: false,
    default: 0,
  },
  typeOfAccount: {
    type: String,
    required: true,
  },
  interest: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

MoneySchema.statics.toAPI = (doc) => ({
  name: doc.name,
  amount: doc.amount,
  typeOfAccount: doc.typeOfAccount,
  interest: doc.interest,
});

MoneySchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return MoneyModel.find(search).select('name amount typeOfAccount interest').exec(callback);
};

MoneyModel = mongoose.model('Money', MoneySchema);

module.exports.MoneyModel = MoneyModel;
module.exports.MoneySchema = MoneySchema;
