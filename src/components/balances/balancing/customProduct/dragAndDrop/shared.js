export const normalizeOperation = (operation) => ({
  id: operation.id || null,
  operation: operation.operation || "",
  machine_name: operation.machine_name || "",
  sam: operation.sam || "",
  sam_seg: operation.sam_seg || "",
  operation_position: operation.operation_position || null,
});