package com.nhn.rookie8.girinticket.repository;

import com.nhn.rookie8.girinticket.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}