function saveToLS(key, itemsToSave) {
  try {
    localStorage.setItem(key, JSON.stringify(itemsToSave));
  } catch (error) {
    throw new Error();
  }
}

function getFromLS(key) {
  try {
    const itemsFromLs = localStorage.getItem(key);
    return itemsFromLs ? JSON.parse(itemsFromLs) : null;
  } catch (error) {
    throw new Error();
  }
}
export { saveToLS, getFromLS };
