import React from 'react'
import logInImg from 'assets/images/log-in.webp'
import { Box, Theme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const AuthLeftSide: React.FC = () => {
  const navigate = useNavigate()
  const isSmallerThanMd = useMediaQuery<Theme>(theme =>
    theme.breakpoints.down('md')
  )
  const img3D = React.useRef<HTMLImageElement>(null)
  const imgContainer = React.useRef<HTMLDivElement>(null)

  const [isMouseOver, setIsMouseOver] = React.useState(false)

  const transforms = React.useCallback(
    (x: number, y: number, el: HTMLDivElement) => {
      const constrain = 5
      const box = el.getBoundingClientRect()
      const calcX = (y - box.y - box.height / 2) / constrain
      const calcY = (x - box.x - box.width / 2) / constrain
      if (x + y === 0)
        return `perspective(10000px) rotateX(${x}deg) rotateY(${y}deg) scale(1)`
      return `perspective(10000px) rotateX(${calcX}deg) rotateY(${calcY}deg) scale(1.1)`
    },
    []
  )

  const transformElement = React.useCallback(
    (el: HTMLDivElement, x: number, y: number) => {
      el.style.transform = transforms(x, y, el)
    },
    [transforms]
  )

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e
      if (imgContainer.current) {
        transformElement(imgContainer.current, clientX, clientY)
      }
    },
    [transformElement]
  )

  const handleMouseEnter = React.useCallback(() => {
    setIsMouseOver(true)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setIsMouseOver(false)
  }, [])

  React.useLayoutEffect(() => {
    if (imgContainer.current) {
      imgContainer.current.addEventListener('mousemove', handleMouseMove)
      imgContainer.current.addEventListener('mouseenter', handleMouseEnter)
      imgContainer.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (imgContainer.current) {
        imgContainer.current.removeEventListener('mousemove', handleMouseMove)
        imgContainer.current.removeEventListener('mouseenter', handleMouseEnter)
        imgContainer.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  React.useLayoutEffect(() => {
    if (!isMouseOver && imgContainer.current)
      transformElement(imgContainer.current, 0, 0)
  }, [isMouseOver, transformElement])

  return (
    <Box
      ref={imgContainer}
      style={{
        flex: 1,
        alignSelf: 'center',
        transition: 'all 0.1s',
        display: isSmallerThanMd ? 'none' : 'block'
      }}
    >
      <img
        onClick={() => navigate('/home')}
        ref={img3D}
        style={{
          maxWidth: '100%'
        }}
        src={logInImg}
        alt="Login"
      />
    </Box>
  )
}
