package com.example.ms_credit.services;

import com.example.ms_credit.dto.DocumentDto;
import com.example.ms_credit.entities.CreditEntity;
import com.example.ms_credit.entities.DocumentEntity;
import com.example.ms_credit.repositories.CreditRepository;
import com.example.ms_credit.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentService {
    @Autowired
    DocumentRepository documentRepository;

    @Autowired
    CreditRepository creditRepository;


    public DocumentEntity saveDocument(MultipartFile file, String typeCredit, Long credit_id) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Optional<CreditEntity> creditOptional = creditRepository.findById(credit_id);

        if (creditOptional.isPresent()) {
            CreditEntity credit = creditOptional.get();
            DocumentEntity document = DocumentEntity.builder()
                    .documentName(fileName)
                    .documentType(file.getContentType())
                    .data(file.getBytes())
                    .typeCreditDocument(typeCredit)
                    .credit(credit)
                    .build();
            return documentRepository.save(document);
        }

        if (!file.getContentType().equals("application/pdf")) {
            throw new IllegalArgumentException("Solo se pueden subir archivos en formato pdf");
        }

        throw new RuntimeException("Credit not found with id: " + credit_id);
    }

    @Transactional
    public Optional<DocumentEntity> getFile(Long id) throws FileNotFoundException {
        Optional<DocumentEntity> file = documentRepository.findById(id);
        if(file.isPresent()){
            return file;
        }
        throw new FileNotFoundException();
    }

    public List<DocumentDto> getAllDocuments() {
        List<DocumentEntity> documents = documentRepository.findAll();
        return documents.stream()
                .map(this::convertDocumentToDTO)
                .collect(Collectors.toList());
    }

    public DocumentDto convertDocumentToDTO(DocumentEntity document) {
        DocumentDto dto = new DocumentDto();
        dto.setId(document.getId());
        dto.setDocumentName(document.getDocumentName());
        dto.setDocumentType(document.getDocumentType());
        dto.setTypeCreditDocument(document.getTypeCreditDocument());
        return dto;
    }
}
