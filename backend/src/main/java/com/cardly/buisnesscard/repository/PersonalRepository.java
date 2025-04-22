package com.cardly.buisnesscard.repository;

import com.cardly.buisnesscard.entity.Personal;
import com.cardly.buisnesscard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalRepository extends JpaRepository<Personal, Long> {

    // retrieve personal card by QR hash (for QR scanning)
    Optional<Personal> findByQrHash(String qrHash);

    // retrieve personal card by user
    Optional<Personal> findByUser(User user);
}
