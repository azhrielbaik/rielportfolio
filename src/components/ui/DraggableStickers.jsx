import { useState, useRef } from "react";
import "./DraggableStickers.css";

const STICKERS_DATA = [
  {
    id: "sticker-available",
    badge: "AVAILABLE FOR WORK",
    emoji: "🚀",
    subtext: "hire me!",
    color: "yellow",
    defaultTilt: -5,
    className: "sticker-pos-1"
  },
  {
    id: "sticker-devmode",
    badge: "DEV MODE: ON",
    emoji: "😎",
    subtext: "full-stack",
    color: "pink",
    defaultTilt: 6,
    className: "sticker-pos-2"
  },
  {
    id: "sticker-passion",
    badge: "100% PASSION",
    emoji: "⭐",
    subtext: "creative coder",
    color: "mint",
    defaultTilt: -8,
    className: "sticker-pos-3"
  },
  {
    id: "sticker-dragme",
    badge: "DRAG ME!",
    emoji: "📌",
    subtext: "geser aku 🖐️",
    color: "white",
    defaultTilt: 12,
    className: "sticker-pos-4"
  }
];

function StickerItem({ item, bringToFront }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(25);
  const dragRef = useRef({ startX: 0, startY: 0, origX: 0, origY: 0 });

  const handlePointerDown = (e) => {
    // Only primary button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y
    };
    setIsDragging(true);
    const newZ = bringToFront();
    setZIndex(newZ);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.origX + dx,
      y: dragRef.current.origY + dy
    });
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback if capture already lost
      }
      setIsDragging(false);
    }
  };

  // Double click resets position back to home
  const handleDoubleClick = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      className={`draggable-sticker sticker--${item.color} ${item.className} ${
        isDragging ? "is-dragging" : ""
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${
          isDragging ? 0 : item.defaultTilt
        }deg) scale(${isDragging ? 1.08 : 1})`,
        zIndex: isDragging ? 9999 : zIndex
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleDoubleClick();
        }
      }}
      aria-label={`Stiker ${item.badge}. Geser bebas di layar, atau klik 2 kali untuk reset.`}
      title="🖐️ Tahan & geser aku ke mana saja! (Klik 2x untuk reset posisi)"
    >
      {/* Semi-transparent Masking Tape Effect on top */}
      <span className="sticker__tape" aria-hidden="true" />

      <div className="sticker__inner">
        <span className="sticker__emoji" aria-hidden="true">
          {item.emoji}
        </span>
        <div className="sticker__text-wrap">
          <span className="sticker__badge mono-label">{item.badge}</span>
          <span className="sticker__subtext mono-label">{item.subtext}</span>
        </div>
      </div>

      {/* Floating mini grab indicator when hovered / dragging */}
      <span className="sticker__grab-pill mono-label" aria-hidden="true">
        {isDragging ? "LEPAS ✊" : "GESER 🖐️"}
      </span>
    </div>
  );
}

export function DraggableStickers() {
  const zCounter = useRef(30);

  const bringToFront = () => {
    zCounter.current += 1;
    return zCounter.current;
  };

  return (
    <div
      className="draggable-stickers-container"
      aria-label="Kanvas stiker interaktif"
    >
      {STICKERS_DATA.map((sticker) => (
        <StickerItem
          key={sticker.id}
          item={sticker}
          bringToFront={bringToFront}
        />
      ))}
    </div>
  );
}

