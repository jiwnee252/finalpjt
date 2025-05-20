<template>
  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <p>글내용: {{ article.content }}</p>
    <p>작성일: {{ article.created_at }}</p>
    <p>좋아요: {{ article.likes }}</p>
    <button @click="likeArticle">좋아요버튼</button>
    <RouterLink :to="{ name: 'UpdateView', params: { id: article.id } }">
      <button>수정</button>
    </RouterLink>
    <button @click="deleteArticle">삭제</button>
    <RouterLink :to="{ name: 'ArticleView' }">[전체 글로 돌아가기]</RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useArticleStore } from '@/stores/articles'

const article = ref(null)
const route = useRoute()
const store = useArticleStore()
const router = useRouter()

const getArticle = () => {
  // 게시글 id 가져오기
  const id = route.params.id
  axios.get(`${store.API_URL}/${id}/`)
    .then(res => {
      // 가져온 게시글 저장
      article.value = res.data
    })
    .catch(err => {
      console.error('글 불러오기 실패:', err)
    })
}

// 좋아요누르기
const likeArticle = () => {
  const id = route.params.id
  axios.post(`${store.API_URL}/${id}/like/`)
    .then(res => {
      // 가져온 좋아요수 저장
      article.value.likes = res.data.likes
    })
    .catch(err => {
      console.error('좋아요 실패:', err)
    })
}

// 글 삭제
const deleteArticle = () => {
  const id = route.params.id
  axios.delete(`${store.API_URL}/${id}/`)
    .then(() => {
      router.push({ name: 'ArticleView' })  // 삭제후 전체글 목록으로 이동
    })
    .catch(err => {
      console.error('글 삭제 실패:', err)
    })
}


onMounted(() => {
  getArticle()
})
</script>
