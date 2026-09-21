.nabilai-chatbot {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9990;
}

.nabilai-toggle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nabilai-toggle:hover {
    transform: scale(1.08);
}

.nabilai-face {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid color-mix(in srgb, var(--accent-blue) 55%, transparent);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06);
    transition: transform 0.25s ease, filter 0.25s ease;
}

.nabilai-toggle.is-clicking .nabilai-face {
  transform: scale(0.82) rotate(-8deg) skewX(-6deg);
  filter: contrast(1.15) saturate(1.2) brightness(1.05);
}

.nabilai-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--accent-blue) 40%, transparent);
  animation: nabilaiPulse 2.4s ease-out infinite;
  pointer-events: none;
  opacity: 0;
}

.nabilai-toggle:not(.is-open) .nabilai-pulse {
  opacity: 1;
}

@keyframes nabilaiPulse {
  0% {
    transform: scale(0.92);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.25);
    opacity: 0;
  }
  100% {
    transform: scale(1.25);
    opacity: 0;
  }
}

.nabilai-toggle.is-open {
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.nabilai-panel {
  position: absolute;
  bottom: 78px;
  right: 0;
  width: min(360px, calc(100vw - 32px));
  height: min(520px, calc(100vh - 120px));
  background: rgba(14, 14, 16, 0.92);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 0 40px color-mix(in srgb, var(--accent) 18%, transparent);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
  transition:
    opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0.28s;
}

.nabilai-panel.hidden {
  opacity: 0;
  visibility: hidden;
  transform: scale(0.88) translateY(16px);
  pointer-events: none;
}

.nabilai-panel:not(.hidden) {
  opacity: 1;
  visibility: visible;
  transform: scale(1) translateY(0);
}

.nabilai-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--accent) 12%, transparent) 0%,
    transparent 100%
  );
  flex-shrink: 0;
}

.nabilai-header-left {
  display: flex;
  align-items: center;
  gap: 11px;
}

.nabilai-header-face {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid color-mix(in srgb, var(--accent-blue) 50%, transparent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 30%, transparent);
}

.nabilai-header-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.nabilai-name {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.2px;
  text-transform: lowercase;
}

.nabilai-status {
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.2px;
}

.nabilai-close {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.nabilai-close:hover {
  background: rgba(255, 255, 255, 0.09);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.16);
}

.nabilai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}

.nabilai-messages::-webkit-scrollbar {
  width: 5px;
}
.nabilai-messages::-webkit-scrollbar-track {
  background: transparent;
}
.nabilai-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}

.nabilai-msg {
  max-width: 92%;
  padding: 10px 13px;
  border-radius: 14px;
  font-size: 0.9rem;
  line-height: 1.5;
  animation: nabilaiMsgIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes nabilaiMsgIn {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.nabilai-msg.bot {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: var(--text-secondary);
  border-bottom-left-radius: 5px;
}

.nabilai-msg.user {
  align-self: flex-end;
  background: color-mix(in srgb, var(--accent) 22%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-blue) 35%, transparent);
  color: var(--text-primary);
  border-bottom-right-radius: 5px;
}

.nabilai-msg.bot strong {
  color: var(--accent-blue);
  font-weight: 500;
}

.nabilai-typing {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  border-bottom-left-radius: 5px;
  animation: nabilaiMsgIn 0.25s ease both;
}

.nabilai-typing-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

.nabilai-typing-gears {
  display: flex;
  gap: 3px;
}

.nabilai-typing-gears i {
  font-size: 0.7rem;
  color: var(--accent-blue);
  animation: nabilaiGearSpin 1.1s linear infinite;
}

.nabilai-typing-gears i:nth-child(2) {
  animation-delay: 0.15s;
  animation-direction: reverse;
}

.nabilai-typing-gears i:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes nabilaiGearSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.nabilai-options {
  padding: 10px 12px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: 210px;
  overflow-y: auto;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.15);
}

.nabilai-options::-webkit-scrollbar {
  width: 4px;
}
.nabilai-options::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.nabilai-opt-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.86rem;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: lowercase;
}

.nabilai-opt-btn:hover {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border-color: color-mix(in srgb, var(--accent-blue) 45%, transparent);
  color: var(--text-primary);
  transform: translateX(3px);
}

.nabilai-opt-btn:active {
  transform: translateX(1px) scale(0.99);
}

.nabilai-opt-btn:disabled {
  opacity: 0.45;
  pointer-events: none;
}

.nabilai-stage-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--accent-blue);
  margin-bottom: 2px;
  padding: 0 2px;
  opacity: 0.85;
}

.nabilai-restart {
  margin-top: 4px;
  text-align: center;
}

.nabilai-restart-btn {
  background: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.8rem;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.nabilai-restart-btn:hover {
  border-color: color-mix(in srgb, var(--accent-blue) 40%, transparent);
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
}

@media (max-width: 480px) {
  .nabilai-chatbot {
    bottom: 16px;
    right: 14px;
  }

  .nabilai-toggle {
    width: 56px;
    height: 56px;
  }

  .nabilai-panel {
    bottom: 70px;
    width: calc(100vw - 28px);
    height: min(480px, calc(100vh - 100px));
    border-radius: 16px;
  }

  .nabilai-msg {
    font-size: 0.86rem;
  }

  .nabilai-opt-btn {
    font-size: 0.84rem;
    padding: 9px 11px;
  }
}
