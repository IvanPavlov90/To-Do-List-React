let categoryCounter = 10;
let taskCounter = 7;

export function getCategoryID() {
  return categoryCounter++;
}

export function getTaskID() {
  return taskCounter++;
}

export function findCategoriesToRemain(category, idsToDelete, eventID) {
  if (category[eventID].parentID !== null) {
    category[category[eventID].parentID].subcategory.splice(
      category[category[eventID].parentID].subcategory.indexOf(eventID),
      1
    );
  }
  idsToDelete.forEach((id) => {
    delete category[id];
  });
  return category;
}