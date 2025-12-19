
export enum AppTheme {
  PinkSoft = 'Pink Soft',
  BlueSky = 'Blue Sky',
  MidnightBlue = 'Midnight Blue',
  MaroonMahony = 'Maroon Mahony',
  ChocolateCaramel = 'Chocolate Caramel'
}

export enum AppLanguage {
  English = 'en',
  Indonesian = 'id',
  Malaysian = 'ms'
}

export enum SubjectType {
  ProductOnly = 'Product Only',
  Handheld = 'Handheld',
  FullModel = 'Full Model',
  POV = 'POV'
}

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export enum Style {
  Retro = 'Retro',
  SoftAesthetic = 'Soft Aesthetic',
  Fancy = 'Fancy'
}

export enum Resolution {
  HD = 'HD',
  Standard = 'Standard'
}

export interface GenerationConfig {
  productImage: string | null;
  backgroundImage: string | null;
  subjectType: SubjectType;
  gender: Gender | null;
  noModel: boolean;
  additionalPrompt: string;
  style: Style;
  quantity: number;
  ratio: string;
  resolution: Resolution;
  branding: string;
}
