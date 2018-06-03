'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildFusionUrl = buildFusionUrl;
function buildFusionUrl(options) {
    return options.baseUrl + '+' + options.selectedCols + '+FROM+' + options.fusionId + '+WHERE+' + options.where + '+' + options.matchType + '%27' + options.whereQuery + '%27+' + options.sortBy + '&key=' + options.key;
}