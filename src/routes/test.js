import React, { useRef } from 'react'
import { useSpring, a, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
const height = items.length * 60 + 80

export default function App() {
  const draggingRef = useRef(false)
  const [{ y }, set] = useSpring(() => ({ y: height }))
  let myPos = 0

  const open = ({ canceled }) => {
   
    set({ y: myPos, config: canceled ? config.wobbly : config.stiff })
  }
  const close = (velocity = 0) => {
    set({ y: height, config: { ...config.stiff, velocity } })
  }

  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (first) draggingRef.current = true
      
      else if (last) setTimeout(() => (draggingRef.current = false), 0)

      if (last) my > height * 0.5 || vy > 0.5 ? close(vy) : open(vy)
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else set({ y: my, immediate: false, config: config.stiff })
    },
    { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  )

  const display = y.to(py => (py < height ? 'block' : 'none'))

  const bgStyle = {
    transform: y.to([0, height], ['translateY(-8%) scale(1.16)', 'translateY(0px) scale(1)']),
    opacity: y.to([0, height], [0.4, 1], 'clamp')
    // touchAction: y.to(v => (v > 0 ? 'auto' : 'none'))
  }
  return (
    <>
      <a.div className="bg" onClick={() => close()} style={bgStyle}>
        <img src="https://images.pexels.com/photos/1657110/pexels-photo-1657110.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=650&w=940" alt="" />
      </a.div>
      <div className="action-btn" onClick={open} />
      <a.div className="sheet" {...bind()} style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}>
        {items.map(entry => (
          <div key={entry} onClick={() => !draggingRef.current && close()} children={entry} />
        ))}
      </a.div>
    </>
  )
}
