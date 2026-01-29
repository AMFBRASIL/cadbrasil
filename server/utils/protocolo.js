/**
 * Gera protocolo no formato SICAF-XXXXXX-XXXX
 */
export function gerarProtocoloCadbrasil() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "SICAF-";
  // Primeira parte: 8 caracteres
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  result += "-";
  // Segunda parte: 4 dígitos
  for (let i = 0; i < 4; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}
