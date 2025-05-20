import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useArticleStore = defineStore('articles', () => {
  const API_URL = 'http://localhost:8000/api/v1/community'
  // 게시글 배열
  const articles = ref([])

  const getArticles = async () => {
    try {
      // 게시글 데이터 받아오고
      const res = await axios.get(API_URL)
      // 받아온 게시글 articles에 할당
      articles.value = res.data
    } catch (err) {
      console.error('게시글 가져오기 실패:', err)
    }
  }

  // 게시글 정렬하기
  const sortArticles = (sortType) => {
    // 게시글 배열 복사 (원본유지)
    const sorted = [...articles.value]

    // id로 최신순정렬
    if (sortType === 'latest') {
      articles.value = sorted.sort((a, b) => b.id - a.id)
    // 좋아요로 정렬렬
    } else if (sortType === 'popular') {
      // 좋아요 없으면 0을 넣어준다.
      articles.value = sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0))
    // 오래된순으로 정렬
    } else if (sortType === 'oldest') {
      articles.value = sorted.sort((a, b) => a.id - b.id)
    }
  }

  // 게시글 수정하기
  const updateArticle = async(id, updatedData) => {
    try {
      await axios.patch(`${API_URL}/${id}/`, updatedData)
      console.log('글 수정 성공!')
      return true
    } catch (err) {
      console.error('글 수정 실패:', err)
      return false
    }
  }

  return { API_URL, articles, getArticles, sortArticles, updateArticle }
})
