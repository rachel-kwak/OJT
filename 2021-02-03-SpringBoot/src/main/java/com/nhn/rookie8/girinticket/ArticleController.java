package com.nhn.rookie8.girinticket;

import com.nhn.rookie8.girinticket.model.Article;
import com.nhn.rookie8.girinticket.repository.ArticleRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping("/{seq}")
    public String detail(@PathVariable("seq") Long seq, Model model) {
        Article article = articleRepository.findById(seq)
                .orElseThrow(() -> new ArticleNotFoundException(seq));
        model.addAttribute("detail", article);
        return "article/detail";
    }
}