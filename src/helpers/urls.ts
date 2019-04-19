"use strict";
import { genres } from "./genres";

const paramsMap = {
  years: {
    properties: [
      "albumReleaseData0",
      "albumReleaseData1",
      "albumReleaseData2",
      "albumReleaseData3",
      "albumReleaseData4",
      "albumReleaseData5",
      "albumReleaseData6",
      "albumReleaseData7",
      "albumReleaseData8",
      "albumReleaseData9"
    ],
    matchType: ["IN"],
    conjunction: "AND"
  },
  genres: {
    properties: ["genres"],
    matchType: ["CONTAINS IGNORING CASE"],
    conjunction: "AND"
  },

  city: {
    properties: ["City"],
    matchType: ["CONTAINS IGNORING CASE"],
    conjunction: "AND"
  },

  lat: {
    properties: ["Lat"],
    matchTypes: ["3E=", "3C="],
    conjunction: "AND"
  },

  lng: {
    properties: ["Lng"],
    matchTypes: ["3E=", "3C="],
    conjuction: "AND"
  },

  id: {
    properties: ["Sid"],
    matchTypes: ["="],
    conjunction: "AND"
  }
};
export function buildFusionUrl(options) {
  return `${options.baseUrl}+${options.selectedCols}+FROM+${
    options.fusionId
  }+WHERE+${options.where}+${options.matchType}%27${options.whereQuery}%27+${
    options.sortBy
  }+${options.limit ? `LIMIT+${options.limit}` : ""}&key=${options.key}`;
}

export function buildComplexFusionUrl(options) {
  return `${options.baseUrl}+${options.selectedCols}+FROM+${
    options.fusionId
  }+WHERE+${options.query}+${options.sortBy}+${
    options.limit ? `LIMIT+${options.limit}` : ""
  }&key=${options.key}`;
}

export function buildComplexQuery(options) {
  const queryConnector = options.conjunction || "AND";
  let arr = [];

  for (var key in options) {
    let properties = paramsMap[key]["properties"];

    for (var x = 0; x < properties.length; x++) {
      if (paramsMap[key]["matchType"].length === 1) {
        let subject = properties[x];
        let verb = paramsMap[key]["matchType"][0];
        let predicate =
          verb === "IN"
            ? `(${options[key].toString()})`
            : options[key].toString();

        arr.push(`${subject} ${verb} '${predicate}'`);
      }
    }
  }
  return arr.join(`+${queryConnector}+`);
}
