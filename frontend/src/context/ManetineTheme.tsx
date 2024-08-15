import {  createTheme, MantineColorsTuple, MantineTheme } from '@mantine/core';

const myColor: MantineColorsTuple = [
    "#e5feee",
    "#d2f9e0",
    "#a8f1c0",
    "#7aea9f",
    "#53e383",
    "#3bdf70",
    "#2bdd66",
    "#1ac455",
    "#0caf49",
    "#00963c"
  ]
export const Mantinetheme:MantineTheme = createTheme({
    colorScheme: 'dark',
    colors: {
      dark: [
        '#d5d7e0', // Dark 0
        '#acaebf', // Dark 1
        '#8c8fa3', // Dark 2
        '#666980', // Dark 3
        '#4d4f66', // Dark 4
        '#34354a', // Dark 5
        '#2b2c3d', // Dark 6
        '#1d1e30', // Dark 7
        '#0c0d21', // Dark 8
        '#01010a', // Dark 9
      ],
      primary: ['#005B41',"#117c5c"],
      secondary: ['#008170' ]
    },
    components: {
      Skeleton: {
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colorScheme === 'dark' ? '#2c2c2c' : '#e0e0e0',
          },
        }),
      },
    },
    fontFamily: 'Arial, sans-serif',
    headings: {
      fontFamily: 'Georgia, serif',
      sizes: {
        h1: { fontSize: 30 },
      },
    },
    components: {
      Input: {
        styles: (theme) => ({
          input: {
            backgroundColor: theme.colors.dark[6],
            borderColor: theme.colors.secondary[0],
            color: theme.white,
            '&::placeholder': {
              color: theme.colors.gray[5],
            },
            '&:focus': {
              borderColor: theme.colors.primary[5],
            },
          },
        }),
      },
      TextInput: {
        styles: (theme) => ({
          input: {
            backgroundColor: theme.colors.dark[6],
            borderColor: theme.colors.primary[4],
            color: theme.white,
            '&::placeholder': {
              color: theme.colors.gray[5],
            },
            '&:focus': {
              borderColor: theme.colors.primary[5],
            },
          },
        }),
      },
      PasswordInput: {
        styles: (theme) => ({
          input: {
            backgroundColor: theme.colors.dark[6],
            borderColor: theme.colors.primary[0],
            color: theme.white,
            '&::placeholder': {
              color: theme.colors.gray[5],
            },
            '&:focus': {
              borderColor: theme.colors.primary[5],
            },
          },
        }),
      },
      Button: {
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.primary[0],
            color: theme.white,
            '&:hover': {
              backgroundColor: theme.colors.primary[1],
            },
          },
        }),
      },
      Text: {
        styles: (theme) => ({
          root: {
            color: theme.colors.primary[0],
          },
        }),
      },
    },
  }
);

