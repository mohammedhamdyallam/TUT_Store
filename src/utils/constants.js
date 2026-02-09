// Pagination settings
export const paginationItemPerPage = 8;

// Allowed user roles for certain actions
export const allowedRoles = ["owner", "admin"];

// Site URL
const PRODUCTION_URL = "https://tut-store.vercel.app/";
const DEVELOPMENT_URL = "http://localhost:3000/";
export const BASE_URL =
  process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;