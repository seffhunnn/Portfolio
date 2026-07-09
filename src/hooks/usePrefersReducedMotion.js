import { useEffect, useState } from 'react'

export default function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)')
        if (!mql) return

        const onChange = () => setReduced(!!mql.matches)
        onChange()

        if (typeof mql.addEventListener === 'function') {
            mql.addEventListener('change', onChange)
            return () => mql.removeEventListener('change', onChange)
        }

        // Safari fallback
        mql.addListener(onChange)
        return () => mql.removeListener(onChange)
    }, [])

    return reduced
}

