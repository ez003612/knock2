import { useEffect, useState } from 'react'
import Select, { selectClasses } from '@mui/joy/Select'
import { Option, Typography } from '@mui/joy'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

export default function Select01({
  name = '',
  defaultValue = '',
  placeholder = '',
  options = [
    {
      value: 0,
      text: '',
    },
  ],
  borderColor = '#d9d9d9',
  borderHoverColor = '#3399ff',
}) {
  const [optionsArray, setOptionsArray] = useState(false)

  useEffect(() => {
    if (!Array.isArray(options)) {
      console.error('提供的object不是陣列，請確認 >>', options)
      return
    }
    setOptionsArray(true)
  }, [options])

  return (
    <>
      {optionsArray ? (
        <Select
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          indicator={<KeyboardArrowDown />}
          sx={{
            height: 44,
            fontFamily: 'Noto Serif JP',
            borderRadius: '8px',
            border: '2px solid #d9d9d9',
            boxShadow: 'none',
            backgroundColor: '#ffffff',
            borderColor: borderColor,
            [`&:hover`]: {
              backgroundColor: '#ffffff',
              borderColor: borderHoverColor,
            },
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',
              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
          }}
          slotProps={{
            listbox: {
              sx: {
                fontFamily: 'Noto Serif JP',
                border: `2px solid ${borderColor}`,
                maxHeight: '200px',
                width: 1,
              },
            },
          }}
        >
          {options.map((v, i) => (
            <Option
              key={i}
              value={v.value}
              sx={{
                whiteSpace: 'normal',
                width: 1,
                maxWidth: {
                  xs: 350,
                  sm: 560,
                  md: 860,
                  lg: 1160,
                  xl: 1,
                },
              }}
            >
              <Typography
                sx={{
                  width: 1,
                  fontFamily: 'Noto Serif JP',
                  whiteSpace: 'normal',
                }}
              >
                {v.text}
              </Typography>
            </Option>
          ))}
        </Select>
      ) : (
        ''
      )}
    </>
  )
}
