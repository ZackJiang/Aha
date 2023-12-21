import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';

interface ValueToIndexMap {
  [key: number]: number;
}

const valueToIndex: ValueToIndexMap = {
  3: 0,
  6: 1,
  9: 2,
  12: 3,
  15: 4,
  50: 5,
};

const marks = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 12,
    label: '12',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 50,
    label: '50',
  },
];

const StyledSlider = styled(Slider)`
  height: 8px;
  color: rgba(255, 255, 255, 0.3);
  padding: 8px 0px;

  .MuiSlider-track {
    background: linear-gradient(to right, #ff5c01, #ffd25f);
  }

  .MuiSlider-thumb {
    background: #ffd25f;
  }

  .MuiSlider-mark {
    display: none;
  }

  .MuiSlider-markLabel {
    color: white;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.15px;
    opacity: 0.5;
  }

  .MuiSlider-markLabel[data-index='${(props) =>
      valueToIndex[Number(props['aria-valuenow'])!]}'] {
    // color: white;
    // opacity: 1;
  }
`;

interface CustomValueLabelProps {
  children: React.ReactNode;
  value: number;
  open: boolean;
}

function CustomValueLabel(props: CustomValueLabelProps) {
  const { children, open, value } = props;
  const index = valueToIndex[value];

  return (
    <Box
      component="span"
      sx={{
        left: `${index * 124}px`, // 124px 是相邻标记之间的距离
        position: 'absolute',
        transform: open ? 'translateY(-8px)' : 'translateY(0)',
        whiteSpace: 'nowrap',
        top: -22,
        fontSize: '0.8em',
        background: 'red',
      }}
    >
      {children}
    </Box>
  );
}

function CustomSlider() {
  return (
    <StyledSlider
      min={3}
      max={50}
      step={null}
      marks={marks}
      components={{
        ValueLabel: CustomValueLabel,
      }}
    />
  );
}

export default CustomSlider;
