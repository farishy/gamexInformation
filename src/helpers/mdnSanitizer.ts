/**
 * mdnFormatter
 * ---
 *
 * ---
 *
 * Convert phone numbers from '+62-856-2101-7923' to '6285621017923'.
 *
 * @param mdn
 * The phone number in string.
 */
export default function sanitizeMdn(mdn: string) {
  if (!mdn) {
    return mdn;
  }

  const _mdnNumberOnly = mdn.replace(/[+-]/g, '');
  const _allowedPrefixes = ['628', '08', '8'];
  let _sanitizedMdn = '';

  _allowedPrefixes.forEach((prefix) => {
    if (_mdnNumberOnly.indexOf(prefix) === 0) {
      _sanitizedMdn = _mdnNumberOnly.replace(prefix, '6288');
    }
  });

  return _sanitizedMdn;
}
