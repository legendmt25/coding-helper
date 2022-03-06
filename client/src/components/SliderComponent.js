import { MoreVert } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';

export default function SliderComponent() {
  const refSlider = useRef(null);
  let isMouseDown = false;
  const matches = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    if (matches) {
      refSlider.current.previousSibling.style.width = '100%';
      refSlider.current.nextSibling.style.width = '100%';
    }
  }, [matches]);

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
          transition: 'all',
          transitionDuration: '300ms',
          flexShrink: 1,
          display: { md: 'flex', xs: 'none' },
          alignItems: 'center',
          cursor: 'move',
          overflow: 'hidden',
          ':hover': {
            backgroundColor: 'rgba(135,132,127,0.2)',
          },
          mb: 1,
          borderRadius: 0.5,
        };
      }}
    >
      <MoreVert fontSize={'1px'} />
    </Box>
  );
}
