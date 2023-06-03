import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ResponsiveGrid from 'wnderlvst-grid'

const App = () => {
  const [diameter, setDiameter] = useState(50)
  const maxDiameter = 200
  const minDiameter = 50
  const step = 2
  const delay = 20

  useEffect(() => {
    let intervalId

    const increaseDiameter = () => {
      setDiameter(prevDiameter => {
        if (prevDiameter + step <= maxDiameter) {
          return prevDiameter + step
        } else {
          clearInterval(intervalId)
          intervalId = setInterval(decreaseDiameter, delay)
          return prevDiameter
        }
      })
    }

    const decreaseDiameter = () => {
      setDiameter(prevDiameter => {
        if (prevDiameter - step >= minDiameter) {
          return prevDiameter - step
        } else {
          clearInterval(intervalId)
          intervalId = setInterval(increaseDiameter, delay)
          return prevDiameter
        }
      })
    }

    intervalId = setInterval(increaseDiameter, delay)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const { height } = document.querySelector('#root').getBoundingClientRect()
      window.parent.iframeUtils.resizeIframe(height + 16)
    })

    observer.observe(document.querySelector('#root'))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="row">
        <h1>React-App</h1>
        <div
          className="circle"
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            borderRadius: '50%',
            backgroundColor: 'red',
            transition: 'width 0.3s, height 0.3s'
          }} />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </div>
    </>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <ResponsiveGrid>
    <App />
  </ResponsiveGrid>
)
