import { CONTENT_TIERS } from '../constants/tiers'
import { getAllowedTierIds, getStrictCapability } from '../utils/capability'
import { log } from '../utils/debug'

export default function ContentModeScreen({ onSelect }) {
  const allowedTierIds = getAllowedTierIds()
  const capability = getStrictCapability()
  const { reason } = capability
  log('ContentModeScreen: capability', { reason, maxTier: capability.maxTier, allowedTierIds })

  const handleSelect = (tierId) => {
    log('ContentModeScreen: tier selected', tierId)
    onSelect(tierId)
  }

  const tierBadge = {
    textOnly: '2G-friendly',
    textAndImages: '3G-friendly',
    full: '4G / Wi‑Fi',
  }

  return (
    <section className="content-mode-screen">
      <h2>Adaptive content</h2>
      <p className="content-mode-intro">We detected your connection. Only options that work for your network are shown below.</p>
      <p className="tier-capability">{reason}</p>
      <p className="tier-hint">Choose how much data to load.</p>
      <div className="tier-options">
        {allowedTierIds.map((tierId) => {
          const t = CONTENT_TIERS[tierId]
          const badge = tierBadge[tierId]
          return (
            <button
              key={tierId}
              type="button"
              className="tier-card"
              onClick={() => handleSelect(tierId)}
            >
              {badge && <span className="tier-badge">{badge}</span>}
              <span className="tier-label">{t.label}</span>
              <span className="tier-desc">{t.description}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
