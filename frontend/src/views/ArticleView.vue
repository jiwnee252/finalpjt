<template>
  <div>
    <h1>전체 게시글</h1>
    <!-- 필터 -->
    <select v-model="sortOption" @change="sortArticles">
      <option value="latest">최신순</option>
      <option value="popular">인기순</option>
      <option value="oldest">오래된순</option>
    </select>

    <hr>
    <ul>
      <h3>글목록</h3>
      <li v-for="article in store.articles" :key="article.id">
        <RouterLink :to="{ name: 'DetailView', params: { id: article.id } }">
          {{ article.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
  <hr>
  <RouterLink :to="{ name: 'CreateView' }">[글 작성]</RouterLink>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useArticleStore } from '@/stores/articles.js'

  const store = useArticleStore()
  const sortOption = ref('latest')

  onMounted(async () => {
    // 일단 전체 게시글 가져오고
    await store.getArticles()
    // 정렬해준다
    sortArticles()
  })

  function sortArticles() {
    store.sortArticles(sortOption.value)
  }
</script>

<style>

</style>
