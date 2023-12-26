import { writable } from "svelte/store";

export const isLoading = writable(true);
export const filterBy = writable({
     regionId : "",
     countryId : "",
     types : ["isMsp", "isVar", "isVad"],
});
