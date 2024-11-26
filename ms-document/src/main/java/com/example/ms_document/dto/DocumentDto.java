package com.example.ms_document.dto;

import com.example.ms_document.entities.DocumentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDto {
    private Long id;
    private String typeCreditDocument;
    private String documentName;
    private String documentType;
    private Long creditId;
}
