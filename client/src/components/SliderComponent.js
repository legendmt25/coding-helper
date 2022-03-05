import { Box } from '@mui/system';
import { useRef } from 'react';

export default function SliderComponent() {
  const refSlider = useRef(null);
  let isMouseDown = false;

  const handleMouseMove = (event) => {
    if (!isMouseDown) {
      return;
    }
    const prev = refSlider.current.previousSibling;
    const next = refSlider.current.nextSibling;
    if (
      event.clientX < refSlider.current.offsetLeft &&
      event.clientX > prev.offsetLeft
    ) {
      next.style.width =
        next.offsetWidth + refSlider.current.offsetLeft - event.clientX + 'px';
      prev.style.width =
        prev.offsetWidth - refSlider.current.offsetLeft + event.clientX + 'px';
    }
    if (
      event.clientX >
        refSlider.current.offsetLeft + refSlider.current.offsetWidth &&
      event.clientX < next.offsetLeft + next.offsetWidth
    ) {
      prev.style.width =
        prev.offsetWidth +
        event.clientX -
        refSlider.current.offsetLeft -
        refSlider.current.offsetWidth +
        'px';
      next.style.width =
        next.offsetWidth -
        event.clientX +
        refSlider.current.offsetLeft +
        refSlider.current.offsetWidth +
        'px';
    }
  };

  return (
    <Box
      ref={refSlider}
      onMouseMove={handleMouseMove}
      onMouseUp={() => (isMouseDown = false)}
      onMouseDown={() => (isMouseDown = true)}
      sx={(theme) => {
        return {
          display: { md: 'flex', xs: 'none' },
          opacity: 1,
          borderRadius: 1,
          transitionProperty: 'all',
          transitionDuration: '100ms',
          justifyContent: 'center',
          px: 0.5,
          height: '100vh',
          cursor: 'move',
          width: '7px',
          overflow: 'hidden',
          ':hover': {
            backgroundColor: 'rgba(135,132,127,0.4)',
          },
        };
      }}
    >
      <Box
        sx={{
          borderColor: 'rgba(135,132,127,0.4)',
          borderStyle: 'outset',
          width: '2px',
          maxHeight: '100%',
          borderWidth: 1,
          borderTop: 0,
          borderBottom: 0,
        }}
      ></Box>
    </Box>
  );
}
