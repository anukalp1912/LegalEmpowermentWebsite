// Minimal JSON-file datastore. No native deps, no compilation, works anywhere
// Node runs. Fine for hackathon scale; swap for Postgres/Mongo later if this
// project grows past a weekend.
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const FILES = {
  users: path.join(DATA_DIR, 'users.json'),
  otps: path.join(DATA_DIR, 'otps.json'),
  cases: path.join(DATA_DIR, 'cases.json'),
  contact_messages: path.join(DATA_DIR, 'contact_messages.json'),
};

function load(table) {
  const file = FILES[table];
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

function save(table, rows) {
  fs.writeFileSync(FILES[table], JSON.stringify(rows, null, 2));
}

module.exports = {
  all(table) {
    return load(table);
  },
  find(table, predicate) {
    return load(table).find(predicate) || null;
  },
  filter(table, predicate) {
    return load(table).filter(predicate);
  },
  insert(table, row) {
    const rows = load(table);
    rows.push(row);
    save(table, rows);
    return row;
  },
  upsert(table, predicate, row) {
    const rows = load(table);
    const idx = rows.findIndex(predicate);
    if (idx >= 0) rows[idx] = { ...rows[idx], ...row };
    else rows.push(row);
    save(table, rows);
  },
  update(table, predicate, updates) {
    const rows = load(table);
    let changed = 0;
    for (const row of rows) {
      if (predicate(row)) {
        Object.assign(row, updates);
        changed++;
      }
    }
    save(table, rows);
    return changed;
  },
  remove(table, predicate) {
    const rows = load(table);
    const kept = rows.filter((r) => !predicate(r));
    save(table, kept);
    return rows.length - kept.length;
  },
};
