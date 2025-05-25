let frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
let currentYear = new Date().getFullYear();
let years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => ({ value: `${currentYear - i}`, label: `${currentYear - i}` }));

export { years, frontendUrl }