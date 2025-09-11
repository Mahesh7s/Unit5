var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Base Book class
var Book = /** @class */ (function () {
    function Book(title, price) {
        this.title = title;
        this.price = price;
    }
    Book.prototype.getCategory = function () {
        throw new Error("getCategory() must be implemented");
    };
    return Book;
}());
// PremiumBook subclass
var PremiumBook = /** @class */ (function (_super) {
    __extends(PremiumBook, _super);
    function PremiumBook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PremiumBook.prototype.getCategory = function () {
        return "Premium Book";
    };
    return PremiumBook;
}(Book));
// RegularBook subclass
var RegularBook = /** @class */ (function (_super) {
    __extends(RegularBook, _super);
    function RegularBook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegularBook.prototype.getCategory = function () {
        return "Regular Book";
    };
    return RegularBook;
}(Book));
// BookFactory
var BookFactory = /** @class */ (function () {
    function BookFactory() {
    }
    BookFactory.createBook = function (title, price) {
        if (price > 1000) {
            return new PremiumBook(title, price);
        }
        else {
            return new RegularBook(title, price);
        }
    };
    return BookFactory;
}());
var b1 = BookFactory.createBook("Design Patterns", 1500);
console.log(b1.getCategory()); // Premium Book
var b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory()); // Regular Book
