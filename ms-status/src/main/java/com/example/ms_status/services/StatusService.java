package com.example.ms_status.services;

import com.example.ms_status.entities.StatusEntity;
import com.example.ms_status.models.CreditEntity;
import com.example.ms_status.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class StatusService {
    @Autowired
    StatusRepository statusRepository;

    private RestTemplate restTemplate = new RestTemplate();

    public StatusEntity saveStatus(StatusEntity status, Long creditId){
        CreditEntity credit = restTemplate.getForObject("http://ms-credit/credit/getById/" + creditId, CreditEntity.class);
        credit.setStatusId(status.getId());
        status.setCreditId(creditId);
        return statusRepository.save(status);
    }

    public StatusEntity getStatusById(Long id){
        return statusRepository.findById(id).get();
    }

    public Optional<StatusEntity> getStatusByCreditId(Long creditId) {
        return statusRepository.findAll().stream()
                .filter(s -> s.getCreditId() != null && s.getCreditId().equals(creditId))
                .findFirst();
    }


    public List<StatusEntity> getAllStatus(){
        return statusRepository.findAll();
    }

    public StatusEntity updateStatus(StatusEntity status, Long creditId){
        StatusEntity newStatus = statusRepository.findByCreditId(creditId).get();
        newStatus.setStatus(status.getStatus());
        return statusRepository.save(newStatus);
    }

    public boolean deleteStatus(Long id) throws Exception{
        try{
            statusRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
