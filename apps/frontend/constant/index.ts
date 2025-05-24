let currentYear = new Date().getFullYear();
let years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => ({ value: `${currentYear - i}`, label: `${currentYear - i}` }));

export { years }