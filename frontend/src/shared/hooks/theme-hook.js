import {useState, useEffect} from 'react'

const appThemes = {
    light: {
        mainColor: "#F1F3FF",
        mainColorOverlay: "rgba(241, 243, 255, 0.8)",
        secondaryColor: "rgb(226, 237, 255)",
        accentColor: "#4764E6",
        accentHover: "#657ce2",
        inputLabel: "#3a7575",
        borderColor: "#cbbcbc",
        danger: "#292929",
        dangerButton: "#292929",
        dangerHover: "#811717",
        disabled: "rgba(71, 100, 230, 0.75)",
        disabledText: "#fceded",
    
        neumorphicShadowBottom: "rgba(205, 207, 217, 0.6)",
        neumorphicShadowTop: "rgba(255, 255, 255, 0.6)",
        blueShadowBottom: "rgba(60, 85, 196, 0.25)",
        blueShadowTop: "rgba(82, 115, 255, 0.15)"
    },
    dark: {
        mainColor: "#15202B",
        mainColorOverlay: "rgba(21, 32, 43, 0.8)",
        secondaryColor: "#FFE0B8",
        accentColor: "#FFAD1F",
        accentHover: "#E69C1C",
        inputLabel: "#d7ede5",
        borderColor: "#d19fa0",
        danger: "#d6d6d6",
        dangerButton: "#292929",
        dangerHover: "#811717",
        disabled: "#8A6625",
        disabledText: "#fceded",
    
        neumorphicShadowBottom: "rgba(16, 24, 32, 0.6)",
        neumorphicShadowTop: "rgba(26, 40, 54, 0.6)",
        blueShadowBottom: "rgba(201, 137, 24, 0.25)",
        blueShadowTop: "rgba(255, 204, 42, 0.15)"
    }
}

export const useTheme = () => {
    const [theme, setTheme] = useState('light')
    let isDark = theme !== 'light'


    const setCSSVariables = theme => {
        for (const value in theme) {
          document.documentElement.style.setProperty(`--${value}`, theme[value]);
        }
    }

    const themeChanger = () => {
        if(!isDark){
            setTheme('dark')
            setCSSVariables(appThemes.dark)
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            setCSSVariables(appThemes.light)
            localStorage.setItem('theme', 'light')
        }
    }

    useEffect(() => {
        const appliedTheme = localStorage.getItem('theme')
        if(appliedTheme && appliedTheme === 'dark'){
            setTheme('dark')
            setCSSVariables(appThemes.dark)
        } else {
            setTheme('light')
            setCSSVariables(appThemes.light)
        }
    }, [])

    return {theme, isDark, themeChanger}
}