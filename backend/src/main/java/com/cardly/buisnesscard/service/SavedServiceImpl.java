package com.cardly.buisnesscard.service;

import com.cardly.buisnesscard.entity.Saved;
import com.cardly.buisnesscard.entity.User;
import com.cardly.buisnesscard.repository.SavedRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedServiceImpl implements SavedService {

    private final SavedRepository savedRepository;
    private final UserService userService;

    public SavedServiceImpl(SavedRepository savedRepository, UserService userService) {
        this.savedRepository = savedRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public Saved saveCard(Long userId, Saved saved) {
        User user = userService.getUserById(userId);
        saved.setUser(user);
        return savedRepository.save(saved);
    }

    @Override
    public List<Saved> getAllSavedCardsByUserId(Long userId) {
        return savedRepository.findByUserId(userId);
    }

    @Override
    public boolean existsBySourceQrHashAndUser(String qrHash, Long userId) {
        return savedRepository.existsBySourceQrHashAndUserId(qrHash, userId);
    }

    @Override
    @Transactional
    public void deleteSavedCard(Long savedId, Long userId) {
        Saved saved = savedRepository.findById(savedId)
                .orElseThrow(() -> new IllegalArgumentException("Saved card not found"));
        if (!saved.getUser().getId().equals(userId)) {
            throw new SecurityException("You do not have permission to delete this card");
        }
        savedRepository.delete(saved);
    }
}
