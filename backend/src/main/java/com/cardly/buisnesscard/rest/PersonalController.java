package com.cardly.buisnesscard.rest;

import com.cardly.buisnesscard.entity.Personal;
import com.cardly.buisnesscard.entity.User;
import com.cardly.buisnesscard.repository.PersonalRepository;
import com.cardly.buisnesscard.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@Controller
@RequestMapping("/personal")
public class PersonalController {

    private final PersonalRepository personalRepository;
    private final UserRepository userRepository;

    public PersonalController(PersonalRepository personalRepository, UserRepository userRepository) {
        this.personalRepository = personalRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/create")
    public String createForm(Model model) {
        model.addAttribute("personal", new Personal());
        return "personal-form";
    }

    @PostMapping("/create")
    public String createPersonal(@ModelAttribute Personal personal, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // QR 해시 생성 (UUID 사용)
        personal.setQrHash(UUID.randomUUID().toString());
        personal.setUser(user);
        personalRepository.save(personal);

        return "redirect:/home";
    }

    @GetMapping("/edit")
    public String editForm(Model model, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Personal personal = personalRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Personal card not found"));

        model.addAttribute("personal", personal);
        return "personal-form";
    }

    @PostMapping("/edit")
    public String updatePersonal(@ModelAttribute Personal personal, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Personal existingPersonal = personalRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Personal card not found"));

        // 기존 데이터 유지
        personal.setId(existingPersonal.getId());
        personal.setQrHash(existingPersonal.getQrHash());
        personal.setUser(user);

        personalRepository.save(personal);
        return "redirect:/home";
    }

    @GetMapping("/qr")
    public String showQrCode(Model model, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Personal personal = personalRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Personal card not found"));

        model.addAttribute("personal", personal);
        return "qr-code";
    }
}

