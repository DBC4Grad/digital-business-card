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
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/saved")
public class SavedController {

    private final SavedRepository savedRepository;
    private final UserRepository userRepository;
    private final PersonalRepository personalRepository;
    private final SavedService savedService;

    public SavedController(SavedRepository savedRepository,
                           UserRepository userRepository,
                           PersonalRepository personalRepository, SavedService savedService) {
        this.savedRepository = savedRepository;
        this.userRepository = userRepository;
        this.personalRepository = personalRepository;
        this.savedService = savedService;
    }

    // 사용자의 모든 타인 명함 조회
    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllSavedCards(@PathVariable Long userId) {
        List<Saved> savedCards = savedService.getAllSavedCardsByUserId(userId);
        return ResponseEntity.ok(savedCards);
    }

    // QR 코드로 타인 명함 추가
    @PostMapping("/{qrHash}")
    public ResponseEntity<?> createSavedCardByQRCode(@PathVariable String qrHash, Principal principal) {
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

    // username 으로 타인 명함 추가
    @PostMapping("/by-username")
    public ResponseEntity<?> createSavedCardByUsername(
            @RequestParam String username,
            Principal principal) {

        String currentUsername = principal.getName();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "로그인이 필요합니다"
                ));

        User targetUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 사용자입니다"
                ));

        Personal personalCard = personalRepository.findByUser(targetUser)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "해당 사용자는 명함을 등록하지 않았습니다"
                ));

        boolean exists = savedRepository.existsBySourceQrHashAndUserId(
                personalCard.getQrHash(),
                currentUser.getId()
        );
        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Saved saved = new Saved();
        saved.setUser(currentUser);
        saved.setFirstName(personalCard.getFirstName());
        saved.setLastName(personalCard.getLastName());
        saved.setCompany(personalCard.getCompany());
        saved.setPosition(personalCard.getPosition());
        saved.setEmail(personalCard.getEmail());
        saved.setPhoneContact(personalCard.getPhoneContact());
        saved.setOfficeContact(personalCard.getOfficeContact());
        saved.setProfileImage(personalCard.getProfileImage());
        saved.setSourceQrHash(personalCard.getQrHash());

        Saved savedEntity = savedRepository.save(saved);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 타인 명함 삭제
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
