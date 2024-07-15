import { createTheme } from '@mui/material/styles'

const borderColor = '#B99755'
const borderWidth = '2px'
const borderRadius = '8px'
const borderColorHover = '#B99755'
const borderColorFocus = '#B99755'
const boxShadowFocus = '#efede8'
const selectedBackgroundColor = ''
const selectedBackgroundColorHover = ''

const customTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '40px',
          width: '100%',
          color: '#757575',
          fontFamily: 'Noto Serif JP, serif',
          '& .MuiSelect-select': {
            padding: '8px 16px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: `${borderWidth} solid ${borderColor}`,
            lineHeight: 1,
            borderRadius: borderRadius,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColorHover,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColorFocus,
            boxShadow: `0 0 0 3px ${boxShadowFocus}`,
          },
          '& .MuiSelect-icon': {
            transition: '200ms',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `${borderWidth} solid ${borderColor}`,
          borderRadius: borderRadius,
          boxShadow: 'none',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          maxHeight: '300px',
          overflow: 'auto',
          color: 'black',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Noto Serif JP, serif',
          '&.Mui-selected': {
            backgroundColor: selectedBackgroundColor,
            color: 'black',
          },
          '&.Mui-selected:hover': {
            backgroundColor: selectedBackgroundColorHover,
            color: 'black',
          },
        },
      },
    },
  },
})

export default customTheme