import {Button} from "@nextui-org/react";

export const TagButton = ({ label, onClose }) => {
  return (
    <Button
      size="sm"
      flat
      auto
      css={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        background: "#f0f0f0", // Color de fondo para que se parezca a un tag
        color: "#333",
        borderRadius: "20px",
        padding: "5px 10px",
      }}
    >
      {label}
      <span
        onClick={onClose}
        style={{
          cursor: "pointer",
          marginLeft: "5px",
          color: "#999",
        }}
      >
        ✕
      </span>
    </Button>
  );
};