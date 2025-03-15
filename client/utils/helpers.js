export function formatPhone(input) {
  return input.replace(/\D/g, "").replace(/^1/g, "");
}
