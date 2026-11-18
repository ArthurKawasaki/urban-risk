package br.com.fiap.urbanrisk.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="sensor", uniqueConstraints=@UniqueConstraint(name="uk_sensor_codigo",columnNames="codigo"))
public class Sensor {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @NotBlank @Column(nullable=false,unique=true) public String codigo;
 @NotBlank public String bairro;
 @NotBlank public String tipo;
 @NotNull public Boolean ativo;
 public Sensor(){}
}
