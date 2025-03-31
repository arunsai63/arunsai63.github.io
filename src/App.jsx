import React, { useEffect, useRef } from 'react'
import Resume from './components/Resume'
import Lenis from 'lenis'


const App = () => {
    const lenis = useRef(null)

    useEffect(() => {
        lenis.current = new Lenis({
            duration: 0.6, // Control the duration of the scroll
            easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
            smooth: true,
            smoothTouch: true, // Enable smooth scrolling on touch devices
        })

        const animate = (time) => {
            lenis.current.raf(time)
            requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)

        return () => {
            lenis.current.destroy()
        }
    }, [])

    return <>
        <Resume />
    </>
}

export default App