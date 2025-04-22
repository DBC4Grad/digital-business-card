package com.cardly.buisnesscard.service;

import com.cardly.buisnesscard.entity.Personal;
import com.cardly.buisnesscard.entity.User;
import com.cardly.buisnesscard.repository.PersonalRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PersonalServiceImpl implements PersonalService {

    private final PersonalRepository personalRepository;
    private final UserService userService;

    public PersonalServiceImpl(PersonalRepository personalRepository, UserService userServicel) {
        this.personalRepository = personalRepository;
        this.userService = userServicel;
    }

    @Override
    @Transactional
    public Personal createOrUpdatePersonalCard(Long userId, Personal personal) {
        User user = userService.getUserById(userId);
        personal.setUser(user);
        return personalRepository.save(personal);
    }

    @Override
    public Personal getPersonalCardByUser(Long userId) {
        User user = userService.getUserById(userId);
        return personalRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Personal card not found"));
    }

    @Override
    public Personal getPersonalCardByQrHash(String qrHash) {
        return personalRepository.findByQrHash(qrHash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid QR code"));
    }

    @Override
    @Transactional
    public void deletePersonalCard(Long userId) {
        User user = userService.getUserById(userId);
        Personal personal = personalRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Personal card not found"));
        personalRepository.delete(personal);
    }
}
