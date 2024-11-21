package com.example.ms_credit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "document")
public class DocumentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String typeCreditDocument;

    private String documentName;

    private String documentType;

    @Lob
    @Basic(fetch = FetchType.EAGER)
    @JsonIgnore
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "credit_id")
    private CreditEntity credit;
}
