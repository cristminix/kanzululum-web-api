// JSON type for nested objects
export type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

// Interface untuk struktur data page
export interface Template {
  id?: number;
  slug?: string;
  kind?: string;
  data?: JSONValue;

  dateCreated?: string;
  dateUpdated?: string;
}
