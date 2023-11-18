import React from 'react'

const __layout = () => {
  return (
    <Stack>
        <Stack.Screen name = "signup" options = {{headerShown : false}} />
        <Stack.Screen name = "login" options = {{headerShown : false}} />
    </Stack>
  )
}

export default __layout
