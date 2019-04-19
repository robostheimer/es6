"use strict";
export function flattenArrayOfObjects(arr, prop) {
    return arr.reduce((iterator, item) => {
        return iterator.concat(item[prop]);
    }, []);
}
export function removeItem(arr, item, prop) {
    return arr.filter(it => {
        return it[prop] !== item[prop];
    });
}
export function itemIsInArray(item, arr, prop) {
    const filteredArr = arr.filter(it => {
        return it[prop] === item[prop];
    });
    return filteredArr.length > 0;
}
// TODO: clean this up
export function sortObjDsc(arr, property, num_or_str, checkDupProperty) {
    return sortArrAsc(arr, property, num_or_str, checkDupProperty).reverse();
}
// TODO: clean this up
export function sortArrAsc(arr, property, num_or_str, checkDupProperty) {
    if (num_or_str == "str") {
        var sortable = [];
        arr.sort(function (a, b) {
            return parseInt(a[property]) > parseInt(b[property])
                ? 1
                : parseInt(b[property]) > parseInt(a[property])
                    ? -1
                    : 0;
        });
        return arr;
    }
    else {
        arr.sort(function (a, b) {
            var aprop = a[property];
            var bprop = b[property];
            return bprop - aprop;
        });
    }
    //arr=arr.removeDuplicatesArrObj(checkDupProperty, false);
    return arr;
}
export function removeDuplicatesArrObj(arr, property, checkmatch, checkequal) {
    var unique = { title: [], finalArr: [], notunique: [] };
    function isUnique(arr) {
        if (checkmatch == true) {
            arr.forEach(function (item) {
                if (!unique.title
                    .toString()
                    .replace(/\W/g, "")
                    .match(item[property].replace(/\W/g, ""))) {
                    unique.title.push(item[property]);
                    unique.finalArr.push(item);
                }
                else {
                    unique.notunique.push(item);
                }
            });
        }
        else {
            arr.forEach(function (item) {
                if (unique.title.indexOf(item[property]) < 0) {
                    unique.title.push(item[property]);
                    unique.finalArr.push(item);
                }
                else {
                    unique.notunique.push(item);
                }
            });
        }
        return unique.finalArr;
    }
    return isUnique(arr);
}
