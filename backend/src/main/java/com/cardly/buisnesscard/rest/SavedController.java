package com.cardly.buisnesscard.rest;

import com.cardly.buisnesscard.entity.Personal;
import com.cardly.buisnesscard.entity.Saved;
import com.cardly.buisnesscard.entity.User;
import com.cardly.buisnesscard.repository.PersonalRepository;
import com.cardly.buisnesscard.repository.SavedRepository;
import com.cardly.buisnesscard.repository.UserRepository;
import com.cardly.buisnesscard.service.SavedService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/saved")
public class SavedController {

    private final SavedRepository savedRepository;
    private final UserRepository userRepository;
    private final PersonalRepository personalRepository;

    public SavedController(SavedRepository savedRepository,
                           UserRepository userRepository,
                           PersonalRepository personalRepository) {
        this.savedRepository = savedRepository;
        this.userRepository = userRepository;
        this.personalRepository = personalRepository;
    }

    // QR 코드로 명함 추가
    @GetMapping("/scan/{qrHash}")
    public ResponseEntity<?> scanQrCode(@PathVariable String qrHash, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // QR 해시로 명함 찾기
        Personal personalCard = personalRepository.findByQrHash(qrHash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid QR code"));

        // 이미 저장된 명함인지 확인
        boolean exists = savedRepository.existsBySourceQrHashAndUserId(qrHash, user.getId());
        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // 새 저장 명함 생성
        Saved saved = new Saved();
        saved.setUser(user);
        saved.setFirstName(personalCard.getFirstName());
        saved.setLastName(personalCard.getLastName());
        saved.setCompany(personalCard.getCompany());
        saved.setPosition(personalCard.getPosition());
        saved.setEmail(personalCard.getEmail());
        saved.setPhoneContact(personalCard.getPhoneContact());
        saved.setOfficeContact(personalCard.getOfficeContact());
        saved.setProfileImage(personalCard.getProfileImage());
        saved.setSourceQrHash(qrHash);

        savedRepository.save(saved);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-by-hash")
    public ResponseEntity<?> addSavedCardByHash(@RequestParam String qrHash, Principal principal, RedirectAttributes redirectAttributes) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // QR 해시값으로 개인 명함 찾기
        Personal personalCard = personalRepository.findByQrHash(qrHash).orElse(null);
        if (personalCard == null) {
            redirectAttributes.addFlashAttribute("errorMessage", "유효하지 않은 QR 해시값입니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // 이미 저장된 명함인지 체크
        boolean exists = savedRepository.existsBySourceQrHashAndUserId(qrHash, user.getId());
        if (exists) {
            redirectAttributes.addFlashAttribute("errorMessage", "이미 저장된 명함입니다.");
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // 새 저장 명함 생성
        Saved saved = new Saved();
        saved.setUser(user);
        saved.setFirstName(personalCard.getFirstName());
        saved.setLastName(personalCard.getLastName());
        saved.setCompany(personalCard.getCompany());
        saved.setPosition(personalCard.getPosition());
        saved.setEmail(personalCard.getEmail());
        saved.setPhoneContact(personalCard.getPhoneContact());
        saved.setOfficeContact(personalCard.getOfficeContact());
        saved.setProfileImage(personalCard.getProfileImage());
        saved.setSourceQrHash(qrHash);

        savedRepository.save(saved);

        redirectAttributes.addFlashAttribute("successMessage", "명함이 성공적으로 저장되었습니다.");
        return ResponseEntity.ok().build();
    }

    // 저장된 명함 삭제
    @PostMapping("/delete/{savedId}")
    public ResponseEntity<?> deleteSavedCard(@PathVariable Long savedId, Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Saved saved = savedRepository.findById(savedId)
                .orElseThrow(() -> new IllegalArgumentException("Saved card not found"));

        // 권한 체크
        if (!saved.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        savedRepository.delete(saved);

        return ResponseEntity.ok().build();
    }
}
