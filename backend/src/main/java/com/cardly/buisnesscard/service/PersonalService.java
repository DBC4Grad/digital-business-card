package com.cardly.buisnesscard.service;

import com.cardly.buisnesscard.entity.Personal;

public interface PersonalService {

    Personal createOrUpdatePersonalCard(Long userId, Personal personal);
    Personal getPersonalCardByUser(Long userId);
    Personal getPersonalCardByQrHash(String qrHash);
    void deletePersonalCard(Long userId);
}
