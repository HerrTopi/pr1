var express = require("express");
var router = express.Router();
var mongodb = require("mongodb");
var mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection(
  "mongodb://herrtopi:herrtopi@ds149711.mlab.com:49711/lufi"
);
Schema = mongoose.Schema;
autoIncrement.initialize(connection);

var excessSchema = new Schema({
  barcode: String,
  oldBarcode: String,
  factoryNumber: String,
  itemNumber: String,
  name: String,
  building: String,
  room: String,
  activationDate: String,
  classTag: String,
  status: Number,
  address: String,
  firm: String,
  sidenote: String,
  time: String,
  pair: Number,
  personalNumber: String,
  anotherSidenote: String
});

var deficitSchema = new Schema({
  FIELD1: String,
  FIELD2: String,
  FIELD3: String,
  FIELD4: String,
  FIELD5: String,
  FIELD6: String,
  FIELD7: String,
  FIELD8: String,
  FIELD9: String,
  FIELD10: String,
  FIELD11: String,
  FIELD12: String,
  FIELD13: String,
  FIELD14: String,
  FIELD15: String,
  FIELD16: String,
  FIELD17: String,
  FIELD18: String,
  FIELD19: String,
  FIELD20: String,
  FIELD21: String,
  FIELD22: String,
  FIELD23: String,
  FIELD24: String,
  FIELD25: String,
  FIELD26: String,
  FIELD27: String,
  FIELD28: String,
  FIELD29: String,
  pair: Number,
  status: Number
});

excessSchema.statics.findById = function(id, cb) {
  return this.find({ id: id }, cb);
};

excessSchema.plugin(autoIncrement.plugin, { model: "excess", field: "id" });
var excess = connection.model("excess", excessSchema);

deficitSchema.plugin(autoIncrement.plugin, { model: "deficit", field: "id" });
var deficit = connection.model("deficit", deficitSchema);

router.get("/test", function(req, res, next) {
  deficit.find({}, function(err, list) {
    res.json(list);
  });
});
//delete all deficit
router.get("/deficit/deleteall", function(req, res, next) {
  deficit.remove({}, function(err, list) {
    res.json(list);
  });
});
//list all deficit
router.get("/deficit/getall", function(req, res, next) {
  console.log("adsdasdasd");
  deficit.find({}, { __v: 0, _id: 0 }, function(err, list) {
    res.json(list);
  });
});

//list all excess
router.get("/excess/getall", function(req, res, next) {
  excess.find({}, { __v: 0, _id: 0 }, function(err, list) {
    if (err) {
      res.json(err);
    }
    res.json(list);
  });
});
//get one excess
router.get("/excess/get/:id", function(req, res, next) {
  excess.findById(req.params.id, { __v: 0, _id: 0 }, (err, foundExcess) => {
    res.json(foundExcess);
  });
});
//remove one excess
router.get("/excess/delete/:id", function(req, res, next) {
  excess.remove({ id: req.params.id }, (err, deletedExcess) => {
    res.json(deletedExcess);
  });
});

//delete all excess
router.get("/excess/deleteall", function(req, res, next) {
  excess.remove({}, function(err, list) {
    res.json(list);
  });
});
//update excess
router.post("/excess/update", function(req, res, next) {
  var data = req.body;
  excess.findOneAndUpdate({ id: data.id }, data, { upsert: true }, function(
    err,
    doc
  ) {
    res.json(doc);
  });
});
//save excess
router.post("/excess/new", function(req, res, next) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", req.body);
  var data = req.body;
  data.anotherSidenote = "";
  data.status = -1;
  data.pair = -1;
  data.time = 1111111111;
  let newElement = new excess(data);
  newElement.save((err, docs) => {
    res.json(docs);
  });
});
//save all excess at once
router.post("/excess/filldb", function(req, res, next) {
  var data = req.body;
  data.forEach(element => {
    let newElement = new excess(element);
    newElement.save((err, docs) => {});
  });
  res.json("ok?");
});
//save all excess at once
router.post("/deficit/filldb", function(req, res, next) {
  var data = req.body;
  data.forEach(element => {
    let newElement = new deficit(element);
    newElement.save((err, docs) => {});
  });
  res.json("ok?");
});
//set status
router.post("/setstatus", function(req, res, next) {
  var data = req.body;
  data.forEach(element => {
    deficit.findOneAndUpdate(
      { id: element.id },
      { status: element.status },
      { upsert: true },
      function(err, doc) {}
    );
  });
  res.json("ok?");
});
//save all excess at once
router.post("/setpair", function(req, res, next) {
  var data = req.body;
  excess.findOneAndUpdate(
    { id: data.excess },
    { pair: data.deficit },
    { upsert: true },
    function(err, doc) {}
  );
  deficit.findOneAndUpdate(
    { id: data.deficit },
    { pair: data.excess },
    { upsert: true },
    function(err, doc) {}
  );
  res.json("ookk");
});

router.post("/breakpair", function(req, res, next) {
  var data = req.body;
  excess.findOneAndUpdate(
    { id: data.excess },
    { pair: -1 },
    { upsert: true },
    function(err, doc) {}
  );
  deficit.findOneAndUpdate(
    { id: data.deficit },
    { pair: -1 },
    { upsert: true },
    function(err, doc) {}
  );
  res.json("ookk");
});

//counts all elements grouped by address for now, only 8221 address
router.get("/countaddress/:address", function(req, res, next) {
  excess.find({ address: req.params.address }, function(err, excessList) {
    deficit.find({ address: req.params.address }, function(err, deficitList) {
      res.json({
        [req.params.address]: deficitList.length - excessList.length
      });
    });
  });
});
//counts all elements grouped by address for now, only 8221 address
router.get("/pairedbyaddress/:address", function(req, res, next) {
  excess.find({ address: req.params.address, pair: { $gt: -1 } }, function(
    err,
    excessList
  ) {
    deficit.find({ address: req.params.address, pair: { $gt: -1 } }, function(
      err,
      deficitList
    ) {
      res.json({
        excessList: excessList,
        deficitList: deficitList
      });
    });
  });
});
module.exports = router;
