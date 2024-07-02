import * as React from 'react'
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput'
import { styled } from '@mui/system'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  )
})

export default function NumInput() {
  return (
    <>
      <div
        style={{
          width: '123px',
          border: '1px solid black',
          borderRadius: '100px',
          marginLeft: '20px',
        }}
      >
        <NumberInput aria-label="Quantity Input" min={1} max={99} />{' '}
      </div>
    </>
  )
}

const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#D9D9D9',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
}

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  border-radius: 100px;
   box-shadow: 0px 2px 4px ${
     theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
   };
   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

    &:hover {
    border-color: ${grey[600]};
  }

  &:focus {
    border-color: ${grey[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? grey[700] : grey[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
)

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  margin: 0 4px;
  padding: 10px 8px;
  outline: none;
  border: none;
  min-width: 0;
  width: 120px;
  text-align: center;


`
)

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: none;
  border-radius: 999px;
  background:#fff;
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  margin:0 4px;
  padding:1px 6px;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[100] : grey[300]};
    border-color: ${theme.palette.mode === 'dark' ? grey[500] : grey[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
)