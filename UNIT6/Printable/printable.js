var MyDocument = /** @class */ (function () {
    function MyDocument() {
    }
    MyDocument.prototype.print = function () {
        console.log("Printing Document..");
    };
    return MyDocument;
}());
var Photo = /** @class */ (function () {
    function Photo() {
    }
    Photo.prototype.print = function () {
        console.log("Photo Priniting....");
    };
    return Photo;
}());
var d1 = new MyDocument();
var p1 = new Photo();
var items = [new MyDocument(), new Photo()];
for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
    var item = items_1[_i];
    item.print();
}
