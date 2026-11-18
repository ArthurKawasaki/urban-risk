package br.com.fiap.urbanrisk.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
@Entity public class Evento {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @NotBlank public String tipo;
 @NotBlank public String bairro;
 @NotBlank public String descricao;
 @NotBlank public String origem;
 @Min(0) @Max(100) public int confianca;
 @Min(1) @Max(5) public int gravidade;
 public int prioridade;
 public LocalDateTime criadoEm;
 public Evento(){}
}
