package com.example.ms_document.services;

import com.example.ms_document.dto.DocumentDto;
import com.example.ms_document.entities.DocumentEntity;
import com.example.ms_document.models.Credit;
import com.example.ms_document.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;


@Service
public class DocumentService {
    @Autowired
    DocumentRepository documentRepository;
    private RestTemplate restTemplate = new RestTemplate();


    public DocumentEntity saveDocument(MultipartFile file, String typeCredit, Long credit_id) throws IOException {
        // Verificar que el archivo es un PDF antes de hacer cualquier otra cosa
        if (!file.getContentType().equals("application/pdf")) {
            throw new IllegalArgumentException("Solo se pueden subir archivos en formato pdf");
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Credit credit = restTemplate.getForObject("http://gateway-service:8080/credit/getById/" + credit_id, Credit.class);

        // Si el crédito no se encuentra, lanzar una excepción
        if (credit == null) {
            throw new RuntimeException("Credit not found with id: " + credit_id);
        }

        // Crear el documento y guardarlo si todo está en orden
        DocumentEntity document = new DocumentEntity();
        document.setDocumentName(fileName);
        document.setDocumentType(file.getContentType());
        document.setData(file.getBytes());
        document.setTypeCreditDocument(typeCredit);
        document.setCreditId(credit_id);

        return documentRepository.save(document);
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

    public List<DocumentDto> getAllDocumentsByCreditId(Long creditId) {
        Optional<List<DocumentEntity>> documents = documentRepository.findAllByCreditId(creditId);

        return documents.get().stream()
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
