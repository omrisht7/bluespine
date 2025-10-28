import { parse } from "csv-parse/sync";

export async function parseCSV<T>(buffer: Buffer): Promise<T[]> {
  return parse(buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}