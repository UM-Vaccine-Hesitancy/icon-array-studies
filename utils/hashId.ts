import Hashids from "hashids";

export const hashids = new Hashids(
  "bcb594d80d2e53f73c3396910f36af39a6c2ec056003ea93711b2b242e18fe65", // Should store as environment variable for proper hashing purposes, which we don't need for this project
  6,
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
);

// Example Usage
const publicId = hashids.encode(42);
const internalId = hashids.decode(publicId);
