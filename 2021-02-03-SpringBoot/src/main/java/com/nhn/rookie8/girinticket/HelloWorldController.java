package com.nhn.rookie8.girinticket;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
public class HelloWorldController {
    @Value("${application.message:Hello World}") // 프로퍼티에 정의한 내용 가져오기 (:default값)
    private String message = "Hello World";

    @GetMapping("/")
    public String welcome(Model model) {
        model.addAttribute("time", new Date());
        model.addAttribute("message", this.message);
        return "welcome";
    }

    @GetMapping("/helloworld")
    @ResponseBody   // 메소드에서 리턴되는 값 View를 통해서 출력되지 않고 HTTP Response Body에 직접 쓰여지게 됩니다.
                    // 이때 쓰여지기 전에 리턴되는 데이터 타입에 따라 MessageConverter에서 변환이 이뤄진 후 쓰여진다.
    public String helloworld() {
        return "Hello Rookie!";
    }
}
