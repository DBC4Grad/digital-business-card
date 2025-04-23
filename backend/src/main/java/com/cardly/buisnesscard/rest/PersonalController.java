package com.cardly.buisnesscard.rest;

import com.cardly.buisnesscard.entity.Personal;
import com.cardly.buisnesscard.entity.User;
import com.cardly.buisnesscard.repository.PersonalRepository;
import com.cardly.buisnesscard.repository.UserRepository;
import com.cardly.buisnesscard.service.PersonalService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@Controller
@RequestMapping("/personal")
public class PersonalController {

    private final PersonalRepository personalRepository;
    private final UserRepository userRepository;
    private final PersonalService personalService;

    public PersonalController(PersonalRepository personalRepository, UserRepository userRepository, PersonalService personalService) {
        this.personalRepository = personalRepository;
        this.userRepository = userRepository;
        this.personalService = personalService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Personal> getPersonalCard(@PathVariable Long userId) {
        Personal personal = personalService.getPersonalCardByUserId(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Personal> createPersonalCard(@ModelAttribute Personal personal, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // QR 해시 생성 (UUID 사용)
        personal.setQrHash(UUID.randomUUID().toString());
        personal.setUser(user);
        personalRepository.save(personal);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/edit")
    public ResponseEntity<Personal> updatePersonalCard(@ModelAttribute Personal personal, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Personal existingPersonal = personalRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Personal card not found"));

        personal.setId(existingPersonal.getId());
        personal.setQrHash(existingPersonal.getQrHash());
        personal.setUser(user);

        personalRepository.save(personal);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deletePersonalCard(@PathVariable Long userId) {
        personalService.deletePersonalCard(userId);
        return ResponseEntity.ok().build();
    }
}

