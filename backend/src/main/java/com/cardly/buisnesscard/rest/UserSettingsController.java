package com.cardly.buisnesscard.rest;

import com.cardly.buisnesscard.entity.User;
import com.cardly.buisnesscard.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserSettingsController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserSettingsController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 사용자 정보 업데이트
    @PostMapping("/update")
    public String updateUser(@RequestParam String username, Principal principal) {
        String currentUsername = principal.getName();
        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return "redirect:/home?tab=settings&success=updated";
    }

    // 비밀번호 변경
    @PostMapping("/password")
    public String changePassword(
            @RequestParam String currentPassword,
            @RequestParam String newPassword,
            @RequestParam String confirmPassword,
            Principal principal) {

        if (!newPassword.equals(confirmPassword)) {
            return "redirect:/home?tab=settings&error=password_mismatch";
        }

        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 현재 비밀번호 확인
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return "redirect:/home?tab=settings&error=wrong_password";
        }

        // 새 비밀번호 설정
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return "redirect:/home?tab=settings&success=password_changed";
    }
}
