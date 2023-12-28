import { useState } from 'react';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';

interface ValueToDataMap {
  [key: number]: number;
}

const markValueToDataIndex: ValueToDataMap = {
  3: 0,
  11.72: 1,
  20.21: 2,
  30.06: 3,
  38.51: 4,
  50: 5,
};

const markValueToLabelValue: ValueToDataMap = {
  3: 3,
  11.72: 6,
  20.21: 9,
  30.06: 12,
  38.51: 15,
  50: 50,
};

const marks = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 11.72,
    label: '6',
  },
  {
    value: 20.21,
    label: '9',
  },
  {
    value: 30.06,
    label: '12',
  },
  {
    value: 38.51,
    label: '15',
  },
  {
    value: 50,
    label: '50',
  },
];

const StyledSlider = styled(Slider)<{ activeDataIndex: number }>`
  height: 8px;
  color: rgba(255, 255, 255, 0.3);
  padding: 8px 0px;

  .MuiSlider-track {
    background: linear-gradient(to right, #ff5c01, #ffd25f);
  }

  .MuiSlider-thumb {
    background: #ffd25f;

    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background: black;
      border-radius: 50%;
    }
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

  .MuiSlider-markLabel[data-index='0'] {
    transform: translateX(0%);
  }

  .MuiSlider-markLabel[data-index='5'] {
    transform: translateX(-100%);
  }

  ${(props: { activeDataIndex: number }) => `
    .MuiSlider-markLabelActive[data-index='${props.activeDataIndex}'] {
      color: white;
      opacity: 1;
    }
    
  `}
`;

interface CustomSliderProps {
  /* eslint-disable no-unused-vars */
  onChange: (newValue: number) => void;
}

function CustomSlider(props: CustomSliderProps) {
  const { onChange } = props;
  const [activeDataIndex, setActiveDataIndex] = useState<number>(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange(markValueToLabelValue[newValue[0]]);
      setActiveDataIndex(markValueToDataIndex[newValue[0]]);
    } else {
      onChange(markValueToLabelValue[newValue]);
      setActiveDataIndex(markValueToDataIndex[newValue]);
    }
  };

  return (
    <StyledSlider
      min={3}
      max={50}
      step={null}
      marks={marks}
      onChange={handleSliderChange}
      activeDataIndex={activeDataIndex}
    />
  );
}

export default CustomSlider;
