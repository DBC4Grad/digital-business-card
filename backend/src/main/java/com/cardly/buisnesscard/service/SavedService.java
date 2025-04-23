package com.cardly.buisnesscard.service;

import com.cardly.buisnesscard.entity.Saved;

import java.util.List;

public interface SavedService {

    Saved saveCard(Long userId, Saved saved);
    List<Saved> getAllSavedCardsByUserId(Long userId);
    boolean existsBySourceQrHashAndUser(String qrHash, Long userId);
    void deleteSavedCard(Long savedId, Long userId);
}
