/** @format */

const generateId = (arr) => {
  const maxId = arr.length > 0 ? Math.max(...arr.map((a) => Number(a?.id))) : 0;

  return String(maxId === 0 ? 0 : maxId + 1);
};

module.exports = { generateId };
