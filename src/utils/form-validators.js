export function required (value) {
  if (value) {
    return null;
  }
  return 'Must be required';
}

function maxLengthCreator (maxCharacters) {
  return function (value) {
    if (value && value.length > maxCharacters) {
      return `Must be ${maxCharacters} characters or less`;
    }
    return null;
  };
}

export function email (value) {
  const isEmail = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  if (value && isEmail) {
    return 'Invalid email address';
  }
  return null;
}
