package br.com.fiap.urbanrisk.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestControllerAdvice public class ApiExceptionHandler {
 @ExceptionHandler(MethodArgumentNotValidException.class) @ResponseStatus(HttpStatus.BAD_REQUEST)
 public Map<String,String> validacao(MethodArgumentNotValidException ex){return Map.of("erro","Dados invalidos: confira os campos obrigatorios e limites.");}
 @ExceptionHandler(RecursoNaoEncontradoException.class) @ResponseStatus(HttpStatus.NOT_FOUND)
 public Map<String,String> naoEncontrado(RecursoNaoEncontradoException ex){return Map.of("erro",ex.getMessage());}
 @ExceptionHandler(RecursoDuplicadoException.class) @ResponseStatus(HttpStatus.CONFLICT)
 public Map<String,String> duplicado(RecursoDuplicadoException ex){return Map.of("erro",ex.getMessage());}
 @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class) @ResponseStatus(HttpStatus.CONFLICT)
 public Map<String,String> conflito(org.springframework.dao.DataIntegrityViolationException ex){return Map.of("erro","Registro duplicado ou violacao de integridade.");}
 @ExceptionHandler(IllegalArgumentException.class) @ResponseStatus(HttpStatus.BAD_REQUEST)
 public Map<String,String> argumento(IllegalArgumentException ex){return Map.of("erro",ex.getMessage());}
}
