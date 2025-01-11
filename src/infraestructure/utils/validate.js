export const validateProduct = (product) => {
  if (typeof product.name !== "string" || product.name.trim() === "") {
    return { valid: false, message: "El campo 'name' debe ser un string no vacío." };
  }

  if (typeof product.reference !== "string" || product.reference.trim() === "") {
    return { valid: false, message: "El campo 'reference' debe ser un string no vacío." };
  }

  if (typeof product.category_product_id !== "number" || product.category_product_id <= 0) {
    return { valid: false, message: "El campo 'category' debe ser un número mayor a 0." };
  }

  return { valid: true };
};