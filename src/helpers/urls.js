'use strict'

export function buildFusionUrl(options) {
    return `${options.baseUrl}+${options.selectedCols}+FROM+${options.fusionId}+WHERE+${options.where}+${options.matchType}%27${options.whereQuery}%27+${options.sortBy}&key=${options.key}`;

}
