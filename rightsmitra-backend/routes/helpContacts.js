const fs = require('fs');
const path = require('path');

// Feature: Nearest Help Finder
const contactsPath = path.join(__dirname, '..', 'data', 'help_contacts.json');
const nationalFallback = {
  state: 'India',
  district_labor_office_name: 'National labour support: contact your local labour department',
  district_labor_office_phone: 'Verify national or state labour contact',
  legal_aid_authority_name: 'National Legal Services Authority (placeholder)',
  legal_aid_authority_phone: '15100',
  women_helpline: '181',
  notes: 'No state was matched. Verify current national and local contacts before calling.',
  verified: false,
};

function loadContacts() {
  try {
    return JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  } catch {
    return {};
  }
}

function getHelpContacts(req, res, body, query) {
  const requested = String(query.state || '').trim().toLowerCase();
  const contacts = loadContacts();
  const key = Object.keys(contacts).find((name) => requested && (name.includes(requested) || requested.includes(name)));
  const contact = key ? { ...contacts[key] } : { ...nationalFallback };
  if (!/^\+?[0-9]/.test(String(contact.legal_aid_authority_phone || ''))) {
    contact.legal_aid_authority_name = 'National Legal Services Authority helpline';
    contact.legal_aid_authority_phone = '15100';
  }
  res.status(200).json({ contact });
}

module.exports = { getHelpContacts };
