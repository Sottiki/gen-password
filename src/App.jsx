import { useState } from 'react'
import { Button, Card, Avatar, AbsoluteCenter } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AbsoluteCenter>
        <Card.Root width="320px" >
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="Nue Camp" />
              </Avatar.Root>
              <Card.Title mb="2">chakra sample</Card.Title>
              <Card.Description>
                Count is {count}
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette="red" variant="outline" onClick={() => setCount(0)}>reset</Button>
              <Button colorPalette="blue" variant="outline" onClick={() => setCount((count) => count + 1)}>Click me</Button>
            </Card.Footer>
          </Card.Root>
      </AbsoluteCenter>
    </>
  )
}

export default App
