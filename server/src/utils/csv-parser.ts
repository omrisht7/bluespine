import { parse } from "csv-parse/sync";

export async function parseCSV<T>(buffer: Buffer): Promise<T[]> {
  const results = parse(buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    cast: (value: string, context: any) => {
      const numericFields = ['transaction_value', 'charges_amount'];
      if (context && context.column && numericFields.includes(context.column)) {
        const n = Number(value);
        return Number(n.toFixed(2));
      }
      return value;
    },
    cast_date: false,
  }) as Record<string, any>[];

  return results as T[];
} 