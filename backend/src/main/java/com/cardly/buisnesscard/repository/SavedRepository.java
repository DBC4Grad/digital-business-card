package com.cardly.buisnesscard.repository;

import com.cardly.buisnesscard.entity.Saved;
import com.cardly.buisnesscard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedRepository extends JpaRepository<Saved, Long> {

    // retrieve all saved cards of specific user
    List<Saved> findByUserId(Long userId);

    // retrieve saved card by source QR hash
    List<Saved> findBySourceQrHash(String sourceQrHash);

    boolean existsBySourceQrHashAndUserId(String qrHash, Long userId);
}
