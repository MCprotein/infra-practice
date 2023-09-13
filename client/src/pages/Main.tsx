import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

function TestPage() {
  const [posts, setPosts] = useState<Post[]>([])

  const serverHost = process.env.REACT_APP_SERVER_HOST as string
  console.log(serverHost)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/test')
        console.log(response)

        // const response = await fetch('api/test', {
        //   method: 'GET'
        // })

        // if (!response.ok) {
        //   throw new Error('Network response was not ok')
        // }

        // const data = await response.json()
        setPosts(response.data)
      } catch (error) {
        console.error((error as Error).message)
      }
    }

    fetchData()
  }, [serverHost])

  return (
    <Container>
      <h1>테스트페이지입니다만?</h1>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </PostItem>
        ))}
      </PostList>
    </Container>
  )
}

//styled-components 스타일링 작업
const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
`

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`

const PostItem = styled.li`
  margin-bottom: 20px;
`

export default TestPage
