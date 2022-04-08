import { Spacer, useTheme,Text } from "@nextui-org/react"
import { FC } from "react"

export const Navbar:FC=()=> {

  const {theme} = useTheme();

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 20px',
        backgroundColor: theme?.colors.gray900.value
    }}>
        <Text color='white' h2>P</Text>
        <Text color='white' h3>okemon</Text>

        <Spacer css={{flex: 1}}/>
        <Text h3>Favoritos</Text>
    </div>
  )
}
