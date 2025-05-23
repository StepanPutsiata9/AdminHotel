import React from "react";

const STATUS_COLORS = {
  vacant: "#17CF96",
  occupied: "#FF5252",
  maintenance: "#FFCC00",
  cleaning: "#4B9FFF",
};

const STATUS_LABELS = {
  vacant: "Vacant",
  occupied: "Occupied",
  maintenance: "Maintenance",
  cleaning: "Cleaning",
};

export default function LayoutLegend() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        overflow: "hidden",
        background: "background",
        borderRadius: 12,
        padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        zIndex: 10,
        minWidth: 160,
      }}
    >
      <div style={{ fontWeight: 600, color: "#fff", marginBottom: 8, fontSize: 15 }}>
        Legend
      </div>
      {Object.entries(STATUS_COLORS).map(([status, color]) => (
        <div key={status} style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          <span
            style={{
              display: "inline-block",
              width: 20,
              height: 20,
              borderRadius: 4,
              background: color as string,
              marginRight: 10,
              border: "1px solid #fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          />
          <span style={{ color: "#fff", fontSize: 14 }}>{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</span>
        </div>
      ))}
    </div>
  );
} 