import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface StairsProps {
  children: React.ReactNode;
  onTransitionComplete?: () => void;
}

const Stairs: React.FC<StairsProps> = (props) => {
    const currentPath = useLocation().pathname
    const stairParentRef = useRef<HTMLDivElement>(null)
    const pageRef = useRef<HTMLDivElement>(null)
    const stairsRef = useRef<NodeListOf<HTMLDivElement> | null>(null)
    const transitionCompleteRef = useRef(false)

    useGSAP(function () {
        // Clear any existing animations to prevent conflicts
        gsap.killTweensOf([stairParentRef.current, pageRef.current, '.stair'])
        
        // Reset transition complete flag
        transitionCompleteRef.current = false

        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            },
            onComplete: () => {
                // Mark transition as complete
                transitionCompleteRef.current = true
                // Call the callback if provided
                if (props.onTransitionComplete) {
                    props.onTransitionComplete()
                }
            }
        })

        // Initialize stairs position
        if (stairsRef.current) {
            stairsRef.current.forEach((stair) => {
                gsap.set(stair, { y: '0%' })
            })
        }

        // First phase: Stairs appear elegantly
        tl.to(stairParentRef.current, {
            display: 'block',
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
        })
        
        // Second phase: Stairs rise up - elegant pace
        tl.from('.stair', {
            height: 0,
            duration: 0.3,
            stagger: {
                amount: 0.2,
                from: "start",
                ease: "power2.out"
            },
            ease: "power2.out"
        })
        
        // Third phase: Stairs fall down - elegant pace
        tl.to('.stair', {
            y: '100%',
            duration: 0.4,
            stagger: {
                amount: 0.2,
                from: "start",
                ease: "power2.in"
            },
            ease: "power2.in"
        })
        
        // Fourth phase: Hide stairs container elegantly
        tl.to(stairParentRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        })
        
        tl.to(stairParentRef.current, {
            display: 'none',
            duration: 0.1
        })
        
        // Reset stairs position for next use
        tl.to('.stair', {
            y: '0%',
            duration: 0.1
        })

        // Animate in the new page content - smooth entrance
        // Content is already visible, no animation needed
        // tl.from(pageRef.current, {
        //     opacity: 0,
        //     scale: 0.95,
        //     duration: 0.6,
        //     ease: "power2.out"
        // }, "-=0.2") // Start slightly before stairs finish
    }, [currentPath])

    // Update stairs reference when component mounts or updates
    useGSAP(() => {
        if (stairParentRef.current) {
            stairsRef.current = stairParentRef.current.querySelectorAll('.stair') as NodeListOf<HTMLDivElement>
        }
    }, [])
    
    // Force the stair container to be fullscreen
    useEffect(() => {
        const handleResize = () => {
            if (stairParentRef.current) {
                stairParentRef.current.style.width = `${window.innerWidth}px`
                stairParentRef.current.style.height = `${window.innerHeight}px`
            }
        }
        
        // Set initial size
        handleResize()
        
        // Update on resize
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div>
            <div 
                ref={stairParentRef} 
                className='fixed z-[9999] top-0 left-0' 
                style={{
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    display: 'none',
                    opacity: 0
                }}
            >
                <div className='h-full w-full flex'>
                    <div className='stair h-full w-1/5 bg-gradient-to-br from-teal-300 via-teal-500 to-teal-700'></div>
                    <div className='stair h-full w-1/5 bg-gradient-to-bl from-emerald-400 via-teal-600 to-cyan-800'></div>
                    <div className='stair h-full w-1/5 bg-gradient-to-tr from-teal-400 via-emerald-600 to-teal-800'></div>
                    <div className='stair h-full w-1/5 bg-gradient-to-tl from-cyan-300 via-teal-500 to-emerald-700'></div>
                    <div className='stair h-full w-1/5 bg-gradient-to-b from-teal-200 via-teal-600 to-cyan-900'></div>
                </div>
            </div>
            <div ref={pageRef} className='w-full'>
                {props.children}
            </div>
        </div>
    )
}

export default Stairs