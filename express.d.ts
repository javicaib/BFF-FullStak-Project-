import type { t } from 'i18next';
declare global {
  namespace Express {
    interface Request {
      t: typeof t;
    }
  }
}

export { };

