"use strict";
import { createDOM, escapeTemplate } from "../helpers/create-dom";
import Modal from "./modal-create";
const modal = new Modal();
let position;
navigator.geolocation.getCurrentPosition(pos => {
    position = pos.coords;
});
//TODO: Need to add album and track class/components to support linking.
export default class Geolocation {
    getGeolocation() {
        // Checks if Geolocation is available;
        // If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
        var geolocation = () => {
            const loaderDom = escapeTemplate `
        <div class="loader" id="loader">
          LOADING...
        </div>`; //make this a dom component that can be added
            // modal.createModal();
            createDOM({ html: loaderDom, tag: "#container" });
            return new Promise((resolve, reject) => {
                resolve(position);
                reject({
                    position: { latitude: 51.506325, longitude: -0.127144 }
                });
            });
        };
        return geolocation();
    }
}
