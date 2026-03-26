import { test, expect } from '@playwright/test'

/*Етап 2 — GET /posts/1 */
test('Отримання одного поста через GET', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')
  expect(response).toBeOK()
  const body = await response.json()
  expect(body).toMatchObject({
    id: 1,
    userId: 1
  })
  expect(typeof body.title).toBe('string')
})

/*Етап 3 — POST /posts */
test('Створення нового поста через POST', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Мій тестовий пост',
      body: 'Це зміст мого запиту',
      userId: 1
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  expect(response.status()).toBe(201)

  const body = await response.json()
  expect(body).toMatchObject({
    title: 'Мій тестовий пост',
    body: 'Це зміст мого запиту',
    userId: 1
  })
  expect(body).toHaveProperty('id')
})

/* Завдання 1 — GET /posts (масив)*/
test('Отримання списку всіх постів', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts')
  expect(response).toBeOK()
  const body = await response.json()
  expect(Array.isArray(body)).toBeTruthy()
  expect(body.length).toBeGreaterThan(0)
})

/*Завдання 2 — POST з повною перевіркою*/
test('Створення ресурсу з повною перевіркою полів', async ({ request }) => {
  const newPost = {
    title: 'Новий тестовий запис',
    body: 'Перевірка створення ресурсу',
    userId: 5
  }
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: newPost
  })
  expect(response.status()).toBe(201)
  const body = await response.json()
  expect(body).toMatchObject(newPost)
  expect(body).toHaveProperty('id')
})

/*Завдання 3 — Негативний тест (404) */
test('Отримання неіснуючого ресурсу', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999')
  expect(response.status()).toBe(404)
  expect(response.ok()).toBeFalsy()
})

/* Завдання 4 — DELETE + ідемпотентність */
test('Видалення ресурсу та перевірка ідемпотентності', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1')
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body).toEqual({})
  const secondResponse = await request.delete('https://jsonplaceholder.typicode.com/posts/1')
  expect(secondResponse.status()).toBe(200)
})