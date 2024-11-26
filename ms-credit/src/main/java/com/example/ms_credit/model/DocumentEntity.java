package com.example.ms_credit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentEntity {
    private Long id;
    private String typeCreditDocument;
    private String documentName;
    private String documentType;
}
