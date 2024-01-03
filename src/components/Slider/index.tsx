import { useState } from 'react';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

interface ValueToDataMap {
  [key: number]: number;
}

const desktopMarkValueToDataIndex: ValueToDataMap = {
  3: 0,
  11.72: 1,
  20.21: 2,
  30.06: 3,
  38.51: 4,
  50: 5,
};

const mobileMarkValueToDataIndex: ValueToDataMap = {
  3: 0,
  11.44: 1,
  19.47: 2,
  28.15: 3,
  36.18: 4,
  50: 5,
};

const desktopMarkValueToLabelValue: ValueToDataMap = {
  3: 3,
  11.72: 6,
  20.21: 9,
  30.06: 12,
  38.51: 15,
  50: 50,
};

const mobileMarkValueToLabelValue: ValueToDataMap = {
  3: 3,
  11.44: 6,
  19.47: 9,
  28.15: 12,
  36.18: 15,
  50: 50,
};

const DesktopMarks = [
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

const mobileMarks = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 11.44,
    label: '6',
  },
  {
    value: 19.47,
    label: '9',
  },
  {
    value: 28.15,
    label: '12',
  },
  {
    value: 36.18,
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

  &.MuiSlider-root {
    padding: 0px 0px;
    margin-bottom: 0px;
  }

  .MuiSlider-track {
    background: linear-gradient(to right, #ff5c01, #ffd25f);
  }

  .MuiSlider-thumb {
    background: #ffd25f;
    width: 26px;
    height: 26px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 13px;
      height: 13px;
      background: black;
      border-radius: 50%;
    }
  }

  .MuiSlider-mark {
    display: none;
  }

  .MuiSlider-markLabel {
    top: 18px;
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
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange(
        isSmallScreen
          ? mobileMarkValueToLabelValue[newValue[0]]
          : desktopMarkValueToLabelValue[newValue[0]],
      );
      setActiveDataIndex(
        isSmallScreen
          ? mobileMarkValueToDataIndex[newValue[0]]
          : desktopMarkValueToDataIndex[newValue[0]],
      );
    } else {
      onChange(
        isSmallScreen
          ? mobileMarkValueToLabelValue[newValue]
          : desktopMarkValueToLabelValue[newValue],
      );
      setActiveDataIndex(
        isSmallScreen
          ? mobileMarkValueToDataIndex[newValue]
          : desktopMarkValueToDataIndex[newValue],
      );
    }
  };

  return (
    <StyledSlider
      min={3}
      max={50}
      step={null}
      marks={isSmallScreen ? mobileMarks : DesktopMarks}
      onChange={handleSliderChange}
      activeDataIndex={activeDataIndex}
    />
  );
}

export default CustomSlider;
