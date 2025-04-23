package com.cardly.buisnesscard.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "saved")
public class Saved {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saved_id")
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "first_name", nullable = false, length = 45)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 45)
    private String lastName;

    @Column(name = "company", length = 100)
    private String company;

    @Column(name = "position", length = 100)
    private String position;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phone_contact", length = 20)
    private String phoneContact;

    @Column(name = "office_contact", length = 20)
    private String officeContact;

    @Column(name = "source_qr_hash", length = 255)
    private String sourceQrHash;

    @Column(name = "profile_image", length = 255)
    private String profileImage;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Saved() {}

    // Getters & Setters
    public Long getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneContact() { return phoneContact; }
    public void setPhoneContact(String phoneContact) { this.phoneContact = phoneContact; }
    public String getOfficeContact() { return officeContact; }
    public void setOfficeContact(String officeContact) { this.officeContact = officeContact; }
    public String getSourceQrHash() { return sourceQrHash; }
    public void setSourceQrHash(String sourceQrHash) { this.sourceQrHash = sourceQrHash; }
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
