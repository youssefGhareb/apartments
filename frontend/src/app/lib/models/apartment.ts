// Define a TypeScript interface to represent the structure of an Apartment object.
export interface Apartment {
    id?: number;
    // The unique identifier for an apartment.
    // Optional (`?`) because it is usually assigned by the backend after creation.

    name: string;
    // The name of the apartment. Example: "Luxury Suite".

    unitNumber: string;
    // The unit number of the apartment within its project or building. Example: "101".

    project: string;
    // The project or development where the apartment is located. Example: "Skyline Towers".

    price: number;
    // The price of the apartment, typically a numeric value representing currency.
  }