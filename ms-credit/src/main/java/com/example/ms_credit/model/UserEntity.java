package com.example.ms_credit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    private Long id;
    private String name;
    private String secondName;
    private String lastName;
    private String secondLastName;
    private String rut;
    private int salary;
    private String address;
}
