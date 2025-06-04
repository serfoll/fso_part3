/** @format */

const generateId = (arr) => {
  const currIds = arr.map((item) => item.id);
  let newId;
  do {
    newId = Date.now().toString(36) + Math.random().toString(36);
  } while (currIds.includes(newId));

  return newId;
};

module.exports = { generateId };
