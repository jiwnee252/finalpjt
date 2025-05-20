<template>
  <div v-if="article">
    <h1>글 수정</h1>
    <form @submit.prevent="submitUpdate">
      <label for="title">제목</label>
      <input type="text" id="title" v-model="title" required>

      <label for="content">내용</label>
      <textarea id="content" v-model="content" required></textarea>

      <button type="submit">수정 완료</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useArticleStore } from '@/stores/articles'

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const article = ref(null)
const title = ref('')
const content = ref('')

// 기존 게시글 불러오기
const getArticle = async () => {
  try {
    const id = route.params.id
    const res = await axios.get(`${store.API_URL}/${id}/`)
    article.value = res.data
    title.value = res.data.title
    content.value = res.data.content
  } catch (err) {
    console.error('글 불러오기 실패:', err)
  }
}

const submitUpdate = async () => {
  const id = route.params.id
  const updatedData = {
    title: title.value,
    content: content.value
  }

  const success = await store.updateArticle(id, updatedData)
  if (success) {
    router.push({ name: 'DetailView', params: { id } })
  }
}


onMounted(() => {
  getArticle()
})
</script>
