from django.urls import path
from . import views

urlpatterns = [
    path('', views.article_list),  # /api/v1/community/
    path('<int:article_pk>/', views.article_detail),  # /api/v1/community/1/
    path('<int:article_pk>/like/', views.article_like),
]
