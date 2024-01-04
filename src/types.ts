import type { t } from 'i18next';

declare module "express" { // el mismo nombre que usarías cuando importas algo de ahí
  export interface Request {
    t: typeof t;
    user: any;
  }
}