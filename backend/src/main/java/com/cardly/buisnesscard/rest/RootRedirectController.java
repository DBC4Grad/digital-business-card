package com.cardly.buisnesscard.rest;

import com.cardly.buisnesscard.entity.Personal;
import com.cardly.buisnesscard.entity.Saved;
import com.cardly.buisnesscard.entity.User;
import com.cardly.buisnesscard.repository.PersonalRepository;
import com.cardly.buisnesscard.repository.SavedRepository;
import com.cardly.buisnesscard.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Controller
public class RootRedirectController {

    private final PersonalRepository personalRepository;
    private final SavedRepository savedRepository;
    private final UserRepository userRepository;

    public RootRedirectController(PersonalRepository personalRepository,
                          SavedRepository savedRepository,
                          UserRepository userRepository) {
        this.personalRepository = personalRepository;
        this.savedRepository = savedRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String root() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login() {
        return "redirect:/login.html";
    }

    @GetMapping("/home")
    public String home(Model model, Principal principal) {

        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Personal> personalCard = personalRepository.findByUser(user);
        List<Saved> savedCards = savedRepository.findByUserId(user.getId());

        model.addAttribute("user", user);
        model.addAttribute("hasPersonalCard", personalCard.isPresent());
        if (personalCard.isPresent()) {
            model.addAttribute("personalCard", personalCard.get());
        }
        model.addAttribute("savedCards", savedCards);

        return "home";  // home.html 템플릿 반환
    }
}
