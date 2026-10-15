// Reads a product catalog from a Google Sheet published as CSV
// (File > Share > Publish to web > CSV). Falls back to a local CSV so the
// site still builds when the sheet is not configured or unreachable.

export interface Product {
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

// Minimal RFC 4180 parser: handles quoted fields, escaped quotes and commas inside quotes.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

// Expected headers (Spanish, as the shop owner sees them in the sheet).
const COLUMNS = {
  name: 'nombre',
  brand: 'marca',
  category: 'categoria',
  price: 'precio',
  stock: 'stock',
  image: 'imagen',
  description: 'descripcion',
} as const;

const toNumber = (value: string) => {
  // Accepts "12.500", "12500" or "12500,50" as written by Argentine users.
  const normalized = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

export function toProducts(rows: string[][]): Product[] {
  const [header, ...body] = rows;
  if (!header) return [];
  const index = (column: string) =>
    header.findIndex((h) => h.trim().toLowerCase() === column);
  const cols = Object.fromEntries(
    Object.entries(COLUMNS).map(([key, column]) => [key, index(column)]),
  ) as Record<keyof typeof COLUMNS, number>;
  const cell = (row: string[], i: number) => (i >= 0 ? (row[i] ?? '').trim() : '');

  return body
    .map((row) => ({
      name: cell(row, cols.name),
      brand: cell(row, cols.brand),
      category: cell(row, cols.category) || 'Otros',
      price: toNumber(cell(row, cols.price)),
      stock: toNumber(cell(row, cols.stock)),
      image: cell(row, cols.image),
      description: cell(row, cols.description),
    }))
    .filter((product) => product.name !== '');
}

export async function loadCatalog(sheetUrl: string | undefined, fallbackCsv: string) {
  if (sheetUrl) {
    try {
      const response = await fetch(sheetUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return toProducts(parseCsv(await response.text()));
    } catch (error) {
      console.warn(`[sheet] Could not load ${sheetUrl}, using local fallback:`, error);
    }
  }
  return toProducts(parseCsv(fallbackCsv));
}
