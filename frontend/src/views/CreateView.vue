<template>
  <div>
    <h1>글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목</label>
      <input type="text" id="title" v-model="title" required>

      <label for="content">내용</label>
      <textarea id="content" v-model="content" required></textarea>

      <button type="submit">작성 완료</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/articles'

const title = ref('')
const content = ref('')
const store = useArticleStore()
const router = useRouter()

const createArticle = () => {
  axios.post(`${store.API_URL}/`, {
    title: title.value,
    content: content.value
  })
    .then(res => {
      const newId = res.data.id
      router.push({ name: 'DetailView', params: { id: newId } })
    })
    .catch(err => {
      console.error('글 작성 실패:', err)
    })
}

</script>
