.glossary-overlay-content {
    max-width: 900px;
}

.glossary-top-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.glossary-search-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
    max-width: 320px;
}

.glossary-search-wrap i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 0.85rem;
}

.glossary-search-wrap input {
    width: 100%;
    padding: 0.65rem 0.9rem 0.65rem 2.2rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 0.9rem;
}

.glossary-search-wrap input:focus {
    outline: none;
    border-color: var(--accent);
}

.glossary-filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

.glossary-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.glossary-filter-btn {
    padding: 0.4rem 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 20px;
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}

.glossary-filter-btn:hover,
.glossary-filter-btn.active {
    background: color-mix(in srgb, var(--accent) 18%, transparent);
    border-color: var(--accent-blue);
    color: var(--text-primary);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
}

.status-dot.used { background: #23a55a; }
.status-dot.studied { background: #f0b232; }
.status-dot.learning { background: #5865f2; }

.glossary-alphabet {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-bottom: 1rem;
}

.glossary-letter {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s ease;
}

.glossary-letter:hover,
.glossary-letter.active {
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--border);
    color: var(--text-primary);
}

.glossary-category-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 1.25rem;
}

.glossary-cat-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 20px;
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 0.78rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.glossary-cat-pill:hover,
.glossary-cat-pill.active {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-primary);
    border-color: var(--accent-blue);
}

.cat-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.glossary-result-meta {
    margin-bottom: 0.75rem;
    font-size: 0.85rem;
    color: var(--text-muted);
}

.glossary-term-list {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}

.glossary-term-card {
    width: 100%;
    text-align: left;
    padding: 1rem 1.15rem;
    background: rgba(20, 20, 22, 0.7);
    border: 1px solid var(--border);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.22s ease;
    font-family: inherit;
}

.glossary-term-card:hover {
    border-color: var(--accent-blue);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.term-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.35rem;
}

.term-name {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
}

.term-badges {
    display: flex;
    gap: 0.35rem;
    flex-shrink: 0;
}

.status-badge,
.level-badge {
    font-size: 0.68rem;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    text-transform: lowercase;
}

.status-badge.status-used { background: rgba(35, 165, 90, 0.2); color: #23a55a; }
.status-badge.status-studied { background: rgba(240, 178, 50, 0.2); color: #f0b232; }
.status-badge.status-learning { background: rgba(88, 101, 242, 0.2); color: #5865f2; }

.level-badge.level-foundational { background: rgba(255, 255, 255, 0.06); color: var(--text-muted); }
.level-badge.level-intermediate { background: rgba(145, 55, 0, 0.2); color: var(--accent); }
.level-badge.level-advanced { background: rgba(255, 230, 0, 0.15); color: var(--accent-blue); }

.term-short {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.45;
    margin-bottom: 0.5rem;
}

.term-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.mini-cat {
    font-size: 0.7rem;
    padding: 0.15rem 0.45rem;
    border-radius: 5px;
    background: color-mix(in srgb, var(--cat-color, #888) 15%, transparent);
    color: var(--cat-color, #aaa);
    border: 1px solid color-mix(in srgb, var(--cat-color, #888) 30%, transparent);
}

.glossary-empty {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-muted);
}

.glossary-back-list-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1.25rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 0.5rem 0.9rem;
    border-radius: 10px;
    font-family: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.glossary-back-list-btn:hover {
    background: var(--accent);
    border-color: var(--accent-blue);
    color: #fff;
}

.detail-header {
    margin-bottom: 1rem;
}

.detail-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.detail-meta {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
}

.detail-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.detail-cat {
    font-size: 0.75rem;
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    background: color-mix(in srgb, var(--cat-color) 18%, transparent);
    color: var(--cat-color);
    border: 1px solid color-mix(in srgb, var(--cat-color) 35%, transparent);
}

.detail-divider {
    border: 0;
    border-top: 1px solid var(--border);
    margin: 1.25rem 0;
}

.detail-section {
    margin-bottom: 1.5rem;
}

.detail-section h3 {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--accent-blue);
    margin-bottom: 0.45rem;
}

.detail-section p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

.eq-block {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.85rem 1rem;
    margin-bottom: 0.6rem;
}

.eq-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 0.3rem;
}

.eq-tex {
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    color: var(--accent-blue);
}

.eq-note {
    font-size: 0.88rem;
    color: var(--text-secondary);
}

.related-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
}

.related-term {
    padding: 0.4rem 0.75rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.related-term:hover {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    border-color: var(--accent-blue);
    color: var(--text-primary);
}

.related-missing {
    color: var(--text-muted);
    font-size: 0.85rem;
}

#glossary-list-view,
#glossary-detail-view {
    transition: opacity 0.28s ease;
}

#glossary-list-view.is-fading-out,
#glossary-detail-view.is-fading-out {
    opacity: 0;
}

#glossary-list-view.is-fading-in,
#glossary-detail-view.is-fading-in {
    opacity: 1;
}

#glossary-detail-view.hidden {
    display: none;
}
