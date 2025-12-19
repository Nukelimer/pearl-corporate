import * as migration_20251219_122250 from './20251219_122250';

export const migrations = [
  {
    up: migration_20251219_122250.up,
    down: migration_20251219_122250.down,
    name: '20251219_122250'
  },
];
