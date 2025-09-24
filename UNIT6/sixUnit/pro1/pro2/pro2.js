if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        const arr = Object(this);
        const len = arr.length >>> 0;
        if (len === 0) return -1;
        let start = Number(fromIndex) || 0;
        if (start < 0) {
            start = Math.max(len + start, 0);
        }
        for (let i = start; i < len; i++) {
            if (arr[i] === searchElement) {
                return i;
            }
        }
        return -1;
    };
}

const fruits = ['apple', 'banana', 'mango'];
console.log(fruits.indexOf('banana'));   
console.log(fruits.indexOf('grape'));   

