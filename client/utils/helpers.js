export function formatPhone(input) {
  return input.replace(/\D/g, "").replace(/^1/g, "");
}

export function validateInput(input) {
  const email = input;
  const phone = formatPhone(input);

  if (email.indexOf("@") > -1) {
    return JSON.stringify({ email });
  } else if (phone.length === 10) {
    return JSON.stringify({ phone });
  }
  return null;
}
