.wiki-toggle {
    position: fixed;
    bottom: 24px;
    left: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9990;
    transition: all 0.25s ease;
    font-size: 1.15rem;
}

.wiki-toggle:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: scale(1.08);
    border-color: var(--accent-blue);
}

.wiki-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    z-index: 10050;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease, visibility 0.3s;
}

.wiki-modal-overlay.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.wiki-modal-content {
    position: relative;
    background: rgba(14, 14, 16, 0.95);
    border: 1px solid var(--border);
    border-radius: 18px;
    max-width: 90vw;
    max-height: 85vh;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
}

.wiki-close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    transition: all 0.2s ease;
}

.wiki-close-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
}

.wiki-image-container {
    max-height: 70vh;
    overflow: hidden;
}

.wiki-image-container img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
    transition: opacity 0.2s ease;
}

.wiki-refresh-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.9rem;
    background: rgba(255, 255, 255, 0.04);
    border: none;
    border-top: 1px solid var(--border);
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.wiki-refresh-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-primary);
}

.sim-modal-content {
    max-width: 720px;
}

.sim-video-container {
    background: #000;
}

.sim-video-container video {
    display: block;
    width: 100%;
    max-height: 60vh;
}

.sim-caption {
    padding: 1.25rem 1.5rem;
}

.sim-caption h3 {
    font-size: 1.15rem;
    margin-bottom: 0.4rem;
    color: var(--text-primary);
}

.sim-caption p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
}

.overview-modal-content {
    max-width: 640px;
    max-height: 80vh;
    overflow-y: auto;
}

.overview-header {
    padding: 1.25rem 1.5rem 0.5rem;
}

.overview-header h3 {
    font-size: 1.3rem;
    color: var(--text-primary);
}

.overview-body {
    padding: 0.5rem 1.5rem 1.75rem;
}

.overview-body h4 {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--accent-blue);
    margin: 1.1rem 0 0.4rem;
}

.overview-body p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.55;
}
