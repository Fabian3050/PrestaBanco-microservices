package com.example.ms_user.modules;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Document {
    private Long id;
    private String typeCreditDocument;
    private String documentName;
    private String documentType;
}
