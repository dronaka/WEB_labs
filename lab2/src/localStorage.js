export const LOCAL_STORAGE_KEY = "cities";


export function getCitiesFromStorage(key = LOCAL_STORAGE_KEY) {
    const localStorageContent = JSON.parse(localStorage.getItem(key));
    let cities = [];
    if (localStorageContent !== null && Array.isArray(localStorageContent))
    cities = localStorageContent;
    return new Map(cities.map(cityName => [cityName, undefined]));
  }