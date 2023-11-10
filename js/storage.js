const STORAGE_TOKEN = "A5JW66W1VDE2UYOXK5HLZVWUEXNY01L5BKCO30LV";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * this function is used to store the items
 * @param {string} key name of the stored item
 * @param {any} value  value of the stored item
 * @returns
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * this function is used to get the stored items
 * @param {any} key  name of the stored item
 * @returns
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // Verbesserter code
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
