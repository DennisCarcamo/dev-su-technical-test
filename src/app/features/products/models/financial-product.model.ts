export interface FinancialProductDto {
  id: string; // p.ej. "trj-crd"
  name: string; // "Tarjetas de Crédito"
  description: string; // "Tarjeta de consumo bajo la modalidad de crédito"
  logo: string; // URL
  dateRelease: string; // "2023-02-01"
  dateRevision: string; // "2024-02-01"
}

/** Modelo de dominio para el front (fechas como Date) */
export interface FinancialProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  dateRelease: Date;
  dateRevision: Date;
}

/** Type guard rápido para validar formas básicas del DTO */
export function isFinancialProductDto(
  obj: unknown,
): obj is FinancialProductDto {
  if (!obj || typeof obj !== 'object') return false;
  const o: Record<string, unknown> = obj as Record<string, unknown>;
  return (
    typeof o['id'] === 'string' &&
    typeof o['name'] === 'string' &&
    typeof o['description'] === 'string' &&
    typeof o['logo'] === 'string' &&
    typeof o['date_release'] === 'string' &&
    typeof o['date_revision'] === 'string'
  );
}

/** Mapper: DTO (API) -> Modelo (Front) */
export function toFinancialProduct(dto: FinancialProductDto): FinancialProduct {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    logo: dto.logo,
    dateRelease: new Date(dto.dateRelease),
    dateRevision: new Date(dto.dateRevision),
  };
}

/** Mapper: Modelo (Front) -> DTO (API) */
export function toFinancialProductDto(
  model: FinancialProduct,
): FinancialProductDto {
  const iso: (d: Date) => string = (d: Date): string =>
    d.toISOString().slice(0, 10); // yyyy-mm-dd
  return {
    id: model.id,
    name: model.name,
    description: model.description,
    logo: model.logo,
    dateRelease: iso(model.dateRelease),
    dateRevision: iso(model.dateRevision),
  };
}

/** Factory con valores por defecto útiles para formularios */
export function createEmptyFinancialProduct(
  partial?: Partial<FinancialProduct>,
): FinancialProduct {
  const today: Date = new Date();
  const nextYear: Date = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);

  return {
    id: '',
    name: '',
    description: '',
    logo: '',
    dateRelease: today,
    dateRevision: nextYear,
    ...partial,
  };
}
